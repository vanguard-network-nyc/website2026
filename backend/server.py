from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import requests
import json


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class AirtableEvent(BaseModel):
    id: str
    event_title: str
    date_time: Optional[str] = None
    start_date: Optional[str] = None
    listing_picture: Optional[str] = None
    registration_url: Optional[str] = None
    default_signup_url: Optional[str] = None
    more_details_url: Optional[str] = None
    speaker: Optional[str] = None
    session_leader_name: Optional[str] = None

# Airtable configuration
AIRTABLE_ACCESS_TOKEN = "patPmtrDlbr8OniTX.5a982a008e29d678bc0868d1139856f24f01f927004faedcfd6b756ca9bf62e1"
AIRTABLE_BASE_ID = "appm4C4MiNYVWwBaq"
AIRTABLE_TABLE_ID = "tbljv81RwwFDCb0eU"
AIRTABLE_VIEW_ID = "viwFw2XGGs3wTZvs6"

async def fetch_airtable_events():
    """Fetch events from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{AIRTABLE_TABLE_ID}"
        params = {
            "view": AIRTABLE_VIEW_ID,
            "maxRecords": 100
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        events = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Extract fields
            event_title = fields.get("Event Title", "")
            date_time = fields.get("Date & Time being/end", "")
            start_date = fields.get("Start Date", "")
            listing_picture = fields.get("Listing Picture", [])
            append_to_magic_link = fields.get("Append to magic link", "")
            default_signup_url = fields.get("Default Sign up URL (for NON-members)", "")
            more_details_url = fields.get("More Details URL", "")
            speaker = fields.get("Speaker", "")  # Keep for backward compatibility
            session_leader_raw = fields.get("Session Leader Name", "")
            
            # Handle Session Leader Name (can be a list or string)
            session_leader_name = ""
            if session_leader_raw:
                if isinstance(session_leader_raw, list):
                    # Join multiple session leaders with comma and space
                    session_leader_name = ", ".join(session_leader_raw)
                else:
                    session_leader_name = str(session_leader_raw)
            
            # Handle picture URL
            picture_url = None
            if listing_picture and isinstance(listing_picture, list) and len(listing_picture) > 0:
                picture_url = listing_picture[0].get("url", "")
            
            # Create registration URL (fallback if other URLs are not available)
            fallback_registration_url = f"https://members.thevanguardnetwork.com/events{append_to_magic_link}" if append_to_magic_link else "https://members.thevanguardnetwork.com/events"
            
            # Priority order: More Details URL -> Default Signup URL -> Fallback concatenated URL
            final_registration_url = more_details_url or default_signup_url or fallback_registration_url
            
            event = AirtableEvent(
                id=record.get("id", ""),
                event_title=event_title,
                date_time=date_time,
                start_date=start_date,
                listing_picture=picture_url,
                registration_url=final_registration_url,
                default_signup_url=default_signup_url,
                more_details_url=more_details_url,
                speaker=speaker,
                session_leader_name=session_leader_name
            )
            events.append(event)
        
        return events
        
    except Exception as e:
        logger.error(f"Error fetching Airtable events: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch events: {str(e)}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.get("/events", response_model=List[AirtableEvent])
async def get_upcoming_events():
    """Get upcoming events from Airtable"""
    try:
        events = await fetch_airtable_events()
        logger.info(f"Successfully fetched {len(events)} events from Airtable")
        return events
    except Exception as e:
        logger.error(f"Error in get_upcoming_events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch events")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
