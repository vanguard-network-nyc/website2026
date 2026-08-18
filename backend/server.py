from fastapi import FastAPI, APIRouter, HTTPException, Response
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
import httpx
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

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

class AirtablePodcast(BaseModel):
    id: str
    title: str
    thumbnail: Optional[str] = None
    featured_speaker: Optional[str] = None
    description: Optional[str] = None
    soundcloud_embed: Optional[str] = None
    keywords: Optional[List[str]] = None
    release_date: Optional[str] = None

class AirtableVideo(BaseModel):
    id: str
    video_description: str  # description
    vimeo_name: Optional[str] = None  # title for display
    featured_speakers: Optional[str] = None
    headshot: Optional[str] = None  # image from Featured Speakers
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    vanguard_vimeo_link: Optional[str] = None  # Direct Vimeo URL
    vimeo_long_description: Optional[str] = None  # Long description for video
    softr_order: Optional[int] = None  # sort order

class AirtableArticle(BaseModel):
    id: str
    blog_title: str  # title
    description_teaser: Optional[str] = None  # short description
    photo: Optional[str] = None  # article image
    featured_speaker_linkedin: Optional[str] = None  # featured speaker
    body_qa: Optional[str] = None  # legacy Q&A content
    body_of_blog: Optional[str] = None  # main blog article content
    tags: Optional[List[str]] = None
    published_to_web: Optional[str] = None  # date field for sorting
    type_content: Optional[str] = None  # type of detailed content
    keywords: Optional[List[str]] = None  # keywords from video for similarity matching

class AirtableInThePress(BaseModel):
    id: str
    article_title: str  # title
    author_names: Optional[str] = None  # author names
    short_description: Optional[str] = None  # short description
    photo: Optional[str] = None  # article preview image
    body_of_article: Optional[str] = None  # article text content
    authors_intro: Optional[str] = None  # description of authors

class AirtableNewsroom(BaseModel):
    id: str
    blog_title: str  # title
    description_teaser: Optional[str] = None  # short description
    photo: Optional[str] = None  # article image (for listing)
    newsroom_detail_image: Optional[str] = None  # rectangular image for detail page
    body_of_blog: Optional[str] = None  # main blog content
    publish_by: Optional[str] = None  # publish by date
    featured_speakers: Optional[str] = None  # speakers for the article
    type_of_news: Optional[str] = None  # type of news content

class AirtableGCMember(BaseModel):
    id: str
    whole_name: str  # full name
    headshot: Optional[str] = None  # member photo
    company: Optional[str] = None  # company name
    position: Optional[str] = None  # job title/position

class AirtableEvent(BaseModel):
    id: str
    event_title: str
    date_time: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    timezone: Optional[str] = None
    listing_picture: Optional[str] = None
    registration_url: Optional[str] = None
    default_signup_url: Optional[str] = None
    more_details_url: Optional[str] = None
    speaker: Optional[str] = None
    session_leader_name: Optional[str] = None
    lead_moderator_name: Optional[str] = None
    location: Optional[str] = None
    audience_network: Optional[str] = None
    series_code: Optional[str] = None  # e.g., 'CSC', 'GCF' — used by frontend to decide internal vs external link

class AirtableEventDetail(BaseModel):
    """Full event record for the /events/:recordId detail page."""
    id: str
    event_title: str
    short_description: Optional[str] = None
    long_description: Optional[str] = None  # 'Event Details' in Airtable
    date_time: Optional[str] = None  # Formatted 'Date & Time begin/end'
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    timezone: Optional[str] = None
    duration_minutes: Optional[int] = None
    location: Optional[str] = None
    venue_address: Optional[str] = None
    in_person_digital: Optional[str] = None
    graphic: Optional[str] = None  # Hero image URL (falls back to Listing Picture)
    co_chair_graphic: Optional[str] = None  # Preferred hero image for Forums
    listing_picture: Optional[str] = None
    session_leader_name: Optional[str] = None
    session_leader_position: Optional[str] = None
    session_leader_company: Optional[str] = None
    session_leader_headshot: Optional[str] = None
    session_leader_linkedin: Optional[str] = None
    lead_moderator_name: Optional[str] = None
    type_of_event: Optional[str] = None
    audience_network: Optional[str] = None
    series: Optional[str] = None
    series_code: Optional[str] = None  # Short series code, e.g. 'CSC', 'GCF' — drives signup form routing
    clean_event_code: Optional[str] = None  # Per-event code, e.g. 'CSC2026_0724'
    registration_closed: Optional[bool] = False
    fully_booked: Optional[bool] = False
    registration_url: Optional[str] = None
    default_signup_url_members: Optional[str] = None
    default_signup_url_non_members: Optional[str] = None
    more_details_url: Optional[str] = None
    append_to_magic_link: Optional[str] = None

class AirtableTeamMember(BaseModel):
    id: str
    name: str
    role: Optional[str] = None  # Title (External)
    bio: Optional[str] = None  # Job Description (Public)
    image: Optional[str] = None  # Emergent Headshot
    linkedin: Optional[str] = None  # Emergent LinkedIn
    section: Optional[str] = None  # Emergent Section

# Airtable configuration
AIRTABLE_ACCESS_TOKEN = os.environ.get('AIRTABLE_ACCESS_TOKEN')

# Events table configuration (original base)
EVENTS_BASE_ID = "appm4C4MiNYVWwBaq"
EVENTS_TABLE_ID = "tbljv81RwwFDCb0eU"
EVENTS_VIEW_ID = "viwmMNmGslj40hP3q"
EVENTS_PAST_VIEW_ID = "viwMo84nEgaR0Z3BD"

# -------- Signup form routing --------
# Series Code -> form key. Only mapped series' render the CTA modal; unmapped series
# fall back to the external members-site link (existing behavior).
SERIES_TO_FORM = {
    "CSC": "csc-form",
    "GCF": "gcf-form",
    "LSCEOF": "lsceof-form",
    "GCX": "gcx-form",
    "RMX": "rmx-form",
    "LSCEOX": "lsceox-form",
    # Other series codes will be added as their forms are built.
}

# Form key -> destination config. Each config specifies where to write the submission
# and how each incoming field maps to the destination.
FORM_CONFIGS = {
    "csc-form": {
        "adapter": "airtable",
        "base_id": "appm4C4MiNYVWwBaq",
        "table_id": "tblufk6pWG4ITwxRs",  # Event Inquiries
        # Payload key -> Airtable field name
        "field_map": {
            "self_qualification": "Self Qualification for membership",
            "full_name": "Name",
            "work_email": "Email Work",
            "personal_email": "Personal Email",
            "company": "Company Name",
            "title": "Title",
            "phone": "Phone Number",
            "company_size": "Company Size",
            "ea_email": "Executive Assistant Email",
            "recommended_by": "Recommended By",
            "message": "Message",
            "ok_trial": "OK with trial membership",
        },
        # Fixed field values always written for this form.
        "fixed_fields": {
            "Type of Inquiry": "guest-trial",
        },
        # If present, links to the event's Airtable record on this field.
        "event_link_field": "Event",
    },
    "gcf-form": {
        # GCF (General Counsel Forum) — same target table as CSC, no eligibility question,
        # plus an optional Promo Code field.
        "adapter": "airtable",
        "base_id": "appm4C4MiNYVWwBaq",
        "table_id": "tblufk6pWG4ITwxRs",  # Event Inquiries
        "field_map": {
            "full_name": "Name",
            "work_email": "Email Work",
            "personal_email": "Personal Email",
            "company": "Company Name",
            "title": "Title",
            "phone": "Phone Number",
            "company_size": "Company Size",
            "ea_email": "Executive Assistant Email",
            "recommended_by": "Recommended By",
            "message": "Message",
            "promo_code": "Promo Code",
            "ok_trial": "OK with trial membership",
        },
        "fixed_fields": {
            "Type of Inquiry": "guest-trial",
        },
        "event_link_field": "Event",
    },
    "lsceof-form": {
        # LSCEOF (Life Sciences CEO Forum) — same target table as GCF.
        # Uses "LSCEO Membership Type" (clinical stage) instead of Company Size,
        # plus a required "Number of Employees" field.
        "adapter": "airtable",
        "base_id": "appm4C4MiNYVWwBaq",
        "table_id": "tblufk6pWG4ITwxRs",  # Event Inquiries
        "field_map": {
            "full_name": "Name",
            "work_email": "Email Work",
            "personal_email": "Personal Email",
            "company": "Company Name",
            "title": "Title",
            "phone": "Phone Number",
            "company_status": "LSCEO Membership Type",
            "number_of_employees": "Number of Employees",
            "ea_email": "Executive Assistant Email",
            "recommended_by": "Recommended By",
            "message": "Message",
            "promo_code": "Promo Code",
            "ok_trial": "OK with trial membership",
        },
        "fixed_fields": {
            "Type of Inquiry": "guest-trial",
        },
        "event_link_field": "Event",
    },
    # --- Member-only network exchange forms (GCX, RMX, LSCEOX) ---
    # All three share the same target base/table and identical field mapping.
    # Only the modal title (set in EventDetailsPage FORM_VARIANTS) differs.
    "gcx-form": {
        "adapter": "airtable",
        "base_id": "appqyKMZnFfgSuJKt",
        "table_id": "tblk4T9C7zdRKlCKb",  # Membership Contact Inquiry Form (Softr)
        "field_map": {
            "full_name": "Name",
            "work_email": "Email (Work)",
            "personal_email": "Email (Personal)",
            "phone": "Phone Number",
            "company": "Company",
            "title": "Job Title",
            "networks": "Networks Interested In",  # multipleRecordLinks (typecast:true resolves names)
            "recommended_by": "Recommended By",
            "message": "Message",
        },
        "fixed_fields": {
            "Source of Inquiry": "Main website",
        },
        # This table's schema doesn't link back to the Events base, so no event link.
    },
    # Additional form variants will be added here.
}
# RMX and LSCEOX exchanges are identical to GCX (same base/table/fields);
# only the modal title differs, which is a frontend concern.
FORM_CONFIGS["rmx-form"] = FORM_CONFIGS["gcx-form"]
FORM_CONFIGS["lsceox-form"] = FORM_CONFIGS["gcx-form"]

FORM_CONFIGS["nggc-nomination-form"] = {
    "adapter": "google_sheets",
    "sheet_id": os.environ.get("SIGNUP_SHEET_ID"),
    "tab_name": "NOMINATIONS",
    # Payload key -> Sheet column header name
    "field_map": {
        "gc_full_name": "Full name of GC",
        "gc_email": "Email of GC",
        "participant_first_name": "First name of participant",
        "participant_last_name": "Last name of participant",
        "participant_email": "Email address of participant",
        "participant_title": "Current title of participant",
        "participant_company": "Current company of participant",
        "participant_phone": "Participant's phone number (best number to reach the participant on)",
        "additional_info": "Additional information to be considered",
    },
}
SERIES_TO_FORM["NGGC"] = "nggc-nomination-form"

def _write_signup_to_google_sheet(config: dict, values_by_col: dict) -> str:
    """Append a row to the configured Google Sheet tab.
    values_by_col: {header_name: value}. Missing columns are left blank.
    Returns 'row-{n}' as a synthetic id."""
    import base64 as _b64, json as _json
    import gspread
    from google.oauth2.service_account import Credentials
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON_B64", "")
    if not raw:
        raise HTTPException(status_code=500, detail="Google service account not configured")
    info = _json.loads(_b64.b64decode(raw).decode("utf-8"))
    scopes = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    gc = gspread.authorize(creds)
    sh = gc.open_by_key(config["sheet_id"])
    ws = sh.worksheet(config["tab_name"])
    headers = ws.row_values(1)
    # Build row aligned to sheet headers; auto-fill Timestamp if that column exists.
    from datetime import datetime, timezone
    now_iso = datetime.now(timezone.utc).isoformat()
    row = []
    for h in headers:
        if h == "Timestamp":
            row.append(now_iso)
        else:
            row.append(str(values_by_col.get(h, "")))
    ws.append_row(row, value_input_option="USER_ENTERED")
    return f"sheet-row-{len(ws.get_all_values())}"
# --------------------------------------

# Podcasts table configuration (different base)
PODCASTS_BASE_ID = "appcKcpx0rQ37ChAo"
PODCASTS_TABLE_ID = "tblZR8hfgG7ljk2dq"
PODCASTS_VIEW_ID = "viwWwHG12LkQIHkOw"

# Videos table configuration
VIDEOS_BASE_ID = "appqyKMZnFfgSuJKt"
VIDEOS_TABLE_ID = "tblkW6xwXkVpwPxwY"
VIDEOS_VIEW_ID = "viwqbhdTc6AmMM80u"

# Articles table configuration (same base as podcasts)
ARTICLES_BASE_ID = "appcKcpx0rQ37ChAo"
ARTICLES_TABLE_ID = "tblEKvdS9fXJn7cvc"
ARTICLES_VIEW_ID = "viwbNHk3p0ffFgcHm"

# In the Press table configuration (same base, different view)
IN_THE_PRESS_BASE_ID = "appcKcpx0rQ37ChAo"
IN_THE_PRESS_VIEW_ID = "viwsgPr3j6hbU2g6Z"

# Newsroom table configuration (same base as articles, different view)
NEWSROOM_BASE_ID = "appcKcpx0rQ37ChAo"
NEWSROOM_TABLE_ID = "tblEKvdS9fXJn7cvc"
NEWSROOM_VIEW_ID = "viw0GNJap8hrXC8w3"

# GC Exchange Members table configuration (same base, specific table and view)
GC_MEMBERS_BASE_ID = "appcKcpx0rQ37ChAo"
GC_MEMBERS_TABLE_ID = "tbliGbJTIk94Fpzhf"
GC_MEMBERS_VIEW_ID = "viwkLl46jwSJdt7Ol"

# Team Directory Configuration
TEAM_BASE_ID = "appcKcpx0rQ37ChAo"
TEAM_TABLE_ID = "tblSUfzhtyMYe2Tpj"
TEAM_VIEW_NAME = "Emergent Team Listing"

async def fetch_airtable_gc_members():
    """Fetch GC Exchange members from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # Use the specific GC Members table ID with the GC Members view
        url = f"https://api.airtable.com/v0/{GC_MEMBERS_BASE_ID}/{GC_MEMBERS_TABLE_ID}"
        
        # First, try without the view to see what fields actually exist
        params = {
            "maxRecords": 10  # Just get a few to check structure
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        gc_members = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Extract fields for GC Members - try different field name variations
            whole_name = fields.get("WholeName", "") or fields.get("Whole Name", "") or fields.get("Name", "") or fields.get("Full Name", "")
            headshot_raw = fields.get("Headshot", []) or fields.get("Photo", []) or fields.get("Picture", [])
            company = fields.get("Company", "") or fields.get("Organization", "")
            position = fields.get("Position", "") or fields.get("Title", "") or fields.get("Job Title", "")
            
            # Handle headshot - get first one if multiple
            headshot_url = None
            if headshot_raw and isinstance(headshot_raw, list) and len(headshot_raw) > 0:
                headshot_url = headshot_raw[0].get("url", "")
            
            # Only include records that have a name and appear to be member records
            # Look for records that have company/position info to identify GC members
            if whole_name and (company or position):
                gc_member = AirtableGCMember(
                    id=record.get("id", ""),
                    whole_name=whole_name,
                    headshot=headshot_url,
                    company=company,
                    position=position
                )
                gc_members.append(gc_member)
        
        # If we have some potential GC members, try to apply the view filter for future requests
        if gc_members:
            # Now try with the specific view to get the filtered results
            try:
                params_with_view = {
                    "view": GC_MEMBERS_VIEW_ID,
                    "maxRecords": 100
                }
                
                response_with_view = requests.get(url, headers=headers, params=params_with_view)
                if response_with_view.status_code == 200:
                    # If view works, use the view results
                    view_data = response_with_view.json()
                    gc_members = []  # Reset and use view results
                    
                    for record in view_data.get("records", []):
                        fields = record.get("fields", {})
                        
                        whole_name = fields.get("WholeName", "") or fields.get("Whole Name", "") or fields.get("Name", "") or fields.get("Full Name", "")
                        headshot_raw = fields.get("Headshot", []) or fields.get("Photo", []) or fields.get("Picture", [])
                        company = fields.get("Company", "") or fields.get("Organization", "")
                        position = fields.get("Position", "") or fields.get("Title", "") or fields.get("Job Title", "")
                        
                        headshot_url = None
                        if headshot_raw and isinstance(headshot_raw, list) and len(headshot_raw) > 0:
                            headshot_url = headshot_raw[0].get("url", "")
                        
                        if whole_name:  # Less strict filtering for view results
                            gc_member = AirtableGCMember(
                                id=record.get("id", ""),
                                whole_name=whole_name,
                                headshot=headshot_url,
                                company=company,
                                position=position
                            )
                            gc_members.append(gc_member)
                else:
                    # View doesn't work, stick with filtered results from initial call
                    logging.warning(f"GC Members view {GC_MEMBERS_VIEW_ID} not accessible, using filtered table results")
            except Exception as view_error:
                logging.warning(f"Could not access GC Members view: {str(view_error)}, using filtered table results")
        
        return gc_members
        
    except Exception as e:
        logging.error(f"Error fetching Airtable GC members: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching GC members: {str(e)}")

async def fetch_airtable_in_the_press():
    """Fetch In the Press articles from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # First, let's try without the view to see what fields actually exist
        # Using the same table ID as articles since they might be using existing article fields
        url = f"https://api.airtable.com/v0/{IN_THE_PRESS_BASE_ID}/{ARTICLES_TABLE_ID}"
        params = {
            "maxRecords": 5  # Just get a few to check structure
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        press_articles = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Map the actual fields from the articles table to In the Press fields
            # Based on the structure that exists in the table
            article_title = fields.get("Blog Title", "")  # Use existing Blog Title field
            author_names_raw = fields.get("Featured Speaker for Linked In", "")  # Use existing speaker field as author
            short_description = fields.get("Description (teaser)", "")  # Use existing description field
            photo_raw = fields.get("Photo", [])
            body_of_article = fields.get("Body of Q&A", "")  # Use existing body field
            authors_intro_raw = fields.get("Featured Speaker for Linked In", "")  # Same as author for now
            
            # Handle author names - can be a list or string
            author_names = ""
            if author_names_raw:
                if isinstance(author_names_raw, list):
                    author_names = ", ".join(author_names_raw)
                else:
                    author_names = str(author_names_raw)
            
            # Handle authors intro - can be a list or string
            authors_intro = ""
            if authors_intro_raw:
                if isinstance(authors_intro_raw, list):
                    authors_intro = ", ".join(authors_intro_raw)
                else:
                    authors_intro = str(authors_intro_raw)
            
            # Handle photo - get first one if multiple
            photo_url = None
            if photo_raw and isinstance(photo_raw, list) and len(photo_raw) > 0:
                photo_url = photo_raw[0].get("url", "")
            
            # Only include records that have substantial content (likely press articles)
            if article_title and body_of_article:
                press_article = AirtableInThePress(
                    id=record.get("id", ""),
                    article_title=article_title,
                    author_names=author_names,
                    short_description=short_description,
                    photo=photo_url,
                    body_of_article=body_of_article,
                    authors_intro=authors_intro
                )
                press_articles.append(press_article)
        
        # If we have records, try to apply the view filter for future requests
        if press_articles:
            # Now try with the specific view to get the filtered results
            try:
                params_with_view = {
                    "view": IN_THE_PRESS_VIEW_ID,
                    "maxRecords": 100
                }
                
                response_with_view = requests.get(url, headers=headers, params=params_with_view)
                if response_with_view.status_code == 200:
                    # If view works, use the view results
                    view_data = response_with_view.json()
                    press_articles = []  # Reset and use view results
                    
                    for record in view_data.get("records", []):
                        fields = record.get("fields", {})
                        
                        article_title = fields.get("Blog Title", "")
                        author_names_raw = fields.get("Featured Speaker for Linked In", "")
                        short_description = fields.get("Description (teaser)", "")
                        photo_raw = fields.get("Photo", [])
                        body_of_article = fields.get("Body of Q&A", "")
                        authors_intro_raw = fields.get("Featured Speaker for Linked In", "")
                        
                        # Handle author names - can be a list or string
                        author_names = ""
                        if author_names_raw:
                            if isinstance(author_names_raw, list):
                                author_names = ", ".join(author_names_raw)
                            else:
                                author_names = str(author_names_raw)
                        
                        # Handle authors intro - can be a list or string
                        authors_intro = ""
                        if authors_intro_raw:
                            if isinstance(authors_intro_raw, list):
                                authors_intro = ", ".join(authors_intro_raw)
                            else:
                                authors_intro = str(authors_intro_raw)
                        
                        photo_url = None
                        if photo_raw and isinstance(photo_raw, list) and len(photo_raw) > 0:
                            photo_url = photo_raw[0].get("url", "")
                        
                        if article_title:  # Less strict filtering for view results
                            press_article = AirtableInThePress(
                                id=record.get("id", ""),
                                article_title=article_title,
                                author_names=author_names,
                                short_description=short_description,
                                photo=photo_url,
                                body_of_article=body_of_article,
                                authors_intro=authors_intro
                            )
                            press_articles.append(press_article)
                else:
                    # View doesn't work, stick with filtered results from initial call
                    logging.warning(f"In the Press view {IN_THE_PRESS_VIEW_ID} not accessible, using filtered table results")
            except Exception as view_error:
                logging.warning(f"Could not access In the Press view: {str(view_error)}, using filtered table results")
        
        return press_articles
        
    except Exception as e:
        logging.error(f"Error fetching Airtable In the Press articles: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching In the Press articles: {str(e)}")

async def fetch_airtable_newsroom():
    """Fetch newsroom articles from Airtable"""
    try:
        airtable_token = os.environ.get('AIRTABLE_ACCESS_TOKEN')
        if not airtable_token:
            raise ValueError("AIRTABLE_ACCESS_TOKEN environment variable not set")
        
        headers = {
            'Authorization': f'Bearer {airtable_token}',
            'Content-Type': 'application/json'
        }
        
        url = f"https://api.airtable.com/v0/{NEWSROOM_BASE_ID}/{NEWSROOM_TABLE_ID}"
        newsroom_articles = []
        offset = None
        
        async with httpx.AsyncClient(timeout=30) as http_client:
            while True:
                params = {
                    'view': NEWSROOM_VIEW_ID,
                }
                if offset:
                    params['offset'] = offset
                
                response = await http_client.get(url, headers=headers, params=params)
                
                if response.status_code != 200:
                    logging.warning(f"Error fetching newsroom from view {NEWSROOM_VIEW_ID}: {response.status_code}")
                    break
                
                data = response.json()
                
                for record in data.get("records", []):
                    fields = record.get("fields", {})
                    
                    blog_title = fields.get("Blog Title", "")
                    description_teaser = fields.get("Description (teaser)", "")
                    social_image_raw = fields.get("Social:Image", [])
                    photo_raw = fields.get("Photo", [])
                    newsroom_detail_image_raw = fields.get("Newsroom (Rectangular Image for details page)", [])
                    body_of_blog = fields.get("Body of Blog", "")
                    publish_by = fields.get("Publish By", "")
                    featured_speakers_raw = fields.get("Featured Speakers", [])
                    type_of_news_raw = fields.get("Type of News", [])
                    
                    featured_speakers = ""
                    if featured_speakers_raw:
                        if isinstance(featured_speakers_raw, list):
                            featured_speakers = ", ".join(featured_speakers_raw)
                        else:
                            featured_speakers = str(featured_speakers_raw)
                    
                    type_of_news = ""
                    if type_of_news_raw:
                        if isinstance(type_of_news_raw, list):
                            type_of_news = ", ".join(type_of_news_raw)
                        else:
                            type_of_news = str(type_of_news_raw)
                    
                    photo_url = None
                    if social_image_raw and isinstance(social_image_raw, list) and len(social_image_raw) > 0:
                        photo_url = social_image_raw[0].get("url", "")
                    elif photo_raw and isinstance(photo_raw, list) and len(photo_raw) > 0:
                        photo_url = photo_raw[0].get("url", "")
                    
                    newsroom_detail_image = None
                    if newsroom_detail_image_raw and isinstance(newsroom_detail_image_raw, list) and len(newsroom_detail_image_raw) > 0:
                        newsroom_detail_image = newsroom_detail_image_raw[0].get("url", "")
                    
                    if blog_title and description_teaser:
                        article = AirtableNewsroom(
                            id=record.get("id", ""),
                            blog_title=blog_title,
                            description_teaser=description_teaser,
                            photo=photo_url,
                            newsroom_detail_image=newsroom_detail_image,
                            body_of_blog=body_of_blog,
                            publish_by=publish_by,
                            featured_speakers=featured_speakers,
                            type_of_news=type_of_news
                        )
                        newsroom_articles.append(article)
                
                offset = data.get("offset")
                if not offset:
                    break
        
        return newsroom_articles
        
    except Exception as e:
        logging.error(f"Error fetching Airtable newsroom articles: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching newsroom articles: {str(e)}")

async def fetch_airtable_articles():
    """Fetch articles from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{ARTICLES_BASE_ID}/{ARTICLES_TABLE_ID}"
        params = {
            "view": ARTICLES_VIEW_ID,
            "maxRecords": 100
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        articles = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Extract fields
            blog_title = fields.get("Blog Title", "")
            description_teaser = fields.get("Description (teaser)", "")
            photo_raw = fields.get("Photo", [])
            featured_speaker_linkedin_raw = fields.get("Featured Speaker for Linked In", "")
            body_qa = fields.get("Body of Q&A", "")
            body_of_blog = fields.get("Body of Blog", "")
            tags_raw = fields.get("tags", [])
            published_to_web = fields.get("Published to Web", "")
            type_content_raw = fields.get("Type of detailed content", "")
            keywords_raw = fields.get("Keywords (From video)", [])
            
            # Handle type_content - can be a list or string
            type_content = ""
            if type_content_raw:
                if isinstance(type_content_raw, list):
                    type_content = ", ".join(type_content_raw)
                else:
                    type_content = str(type_content_raw)
            
            # Handle featured speaker - can be a list or string
            featured_speaker_linkedin = ""
            if featured_speaker_linkedin_raw:
                if isinstance(featured_speaker_linkedin_raw, list):
                    featured_speaker_linkedin = ", ".join(featured_speaker_linkedin_raw)
                else:
                    featured_speaker_linkedin = str(featured_speaker_linkedin_raw)
            
            # Handle tags - can be a list or string
            tags = []
            if tags_raw:
                if isinstance(tags_raw, list):
                    tags = tags_raw
                elif isinstance(tags_raw, str):
                    tags = [tags_raw]
            
            # Handle keywords - can be a list or string
            keywords = []
            if keywords_raw:
                if isinstance(keywords_raw, list):
                    keywords = keywords_raw
                elif isinstance(keywords_raw, str):
                    keywords = [keywords_raw]
            
            # Handle photo - get first one if multiple
            photo_url = None
            if photo_raw and isinstance(photo_raw, list) and len(photo_raw) > 0:
                photo_url = photo_raw[0].get("url", "")
            
            article = AirtableArticle(
                id=record.get("id", ""),
                blog_title=blog_title,
                description_teaser=description_teaser,
                photo=photo_url,
                featured_speaker_linkedin=featured_speaker_linkedin,
                body_qa=body_qa,
                body_of_blog=body_of_blog,
                tags=tags,
                published_to_web=published_to_web,
                type_content=type_content,
                keywords=keywords
            )
            articles.append(article)
        
        return articles
        
    except Exception as e:
        logging.error(f"Error fetching Airtable articles: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching articles: {str(e)}")

async def fetch_airtable_videos():
    """Fetch videos from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{VIDEOS_BASE_ID}/{VIDEOS_TABLE_ID}"
        params = {
            "view": VIDEOS_VIEW_ID
        }
        
        videos = []
        offset = None
        
        # Fetch all records with pagination
        while True:
            if offset:
                params["offset"] = offset
            
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            data = response.json()
            records = data.get("records", [])
            
            for record in records:
                fields = record.get("fields", {})
                
                # Extract fields
                video_description = fields.get("Video Description", "")
                vimeo_name = fields.get("Vimeo Name", "")
                featured_speakers_raw = fields.get("Featured Speakers", "")
                headshot_raw = fields.get("Headshot (from Featured Speakers)", [])
                category = fields.get("Category", "")
                tags_raw = fields.get("Tags", [])
                keywords_raw = fields.get("Keywords", [])
                vanguard_vimeo_link = fields.get("Vanguard Vimeo Link", "")
                vimeo_long_description = fields.get("Vimeo - long description", "")
                softr_order = fields.get("Softr Order (Videos Members Page)", 0)
                
                # Handle featured speakers - can be a list or string
                featured_speakers = ""
                if featured_speakers_raw:
                    if isinstance(featured_speakers_raw, list):
                        featured_speakers = ", ".join(featured_speakers_raw)
                    else:
                        featured_speakers = str(featured_speakers_raw)
                
                # Handle tags - can be a list or string
                tags = []
                if tags_raw:
                    if isinstance(tags_raw, list):
                        tags = tags_raw
                    elif isinstance(tags_raw, str):
                        tags = [tags_raw]
                
                # Handle keywords - can be a list or string, split by commas
                keywords = []
                if keywords_raw:
                    if isinstance(keywords_raw, list):
                        # If list, each item might be comma-separated
                        for item in keywords_raw:
                            if isinstance(item, str) and ',' in item:
                                # Split comma-separated values and strip whitespace
                                keywords.extend([k.strip() for k in item.split(',') if k.strip()])
                            else:
                                keywords.append(item)
                    elif isinstance(keywords_raw, str):
                        if ',' in keywords_raw:
                            keywords = [k.strip() for k in keywords_raw.split(',') if k.strip()]
                        else:
                            keywords = [keywords_raw]
                
                # Handle headshot - get first one if multiple
                headshot_url = None
                if headshot_raw and isinstance(headshot_raw, list) and len(headshot_raw) > 0:
                    headshot_url = headshot_raw[0].get("url", "")
                
                video = AirtableVideo(
                    id=record.get("id", ""),
                    video_description=video_description,
                    vimeo_name=vimeo_name,
                    featured_speakers=featured_speakers,
                    headshot=headshot_url,
                    category=category,
                    tags=tags,
                    keywords=keywords,
                    vanguard_vimeo_link=vanguard_vimeo_link,
                    vimeo_long_description=vimeo_long_description,
                    softr_order=softr_order
                )
                videos.append(video)
            
            # Check if there are more records to fetch
            offset = data.get("offset")
            if not offset:
                break
        
        # Sort by softr_order in descending order (highest number first)
        videos.sort(key=lambda x: x.softr_order or 0, reverse=True)
        
        return videos
        
    except Exception as e:
        logging.error(f"Error fetching Airtable videos: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching videos: {str(e)}")

async def fetch_airtable_podcasts():
    """Fetch podcasts from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{PODCASTS_BASE_ID}/{PODCASTS_TABLE_ID}"
        params = {
            "view": PODCASTS_VIEW_ID,
            "maxRecords": 100
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        podcasts = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Extract fields
            title = fields.get("Title", "")
            thumbnail_raw = fields.get("Thumbnail", [])
            featured_speaker_raw = fields.get("Featured Speaker for Linked In", "")
            description = fields.get("Description", "")
            soundcloud_embed = fields.get("Soundcloud Embed code (medium)", "")
            keywords_raw = fields.get("Keywords", [])
            release_date = fields.get("Release date", "")
            
            # Handle featured speaker - can be a list or string
            featured_speaker = ""
            if featured_speaker_raw:
                if isinstance(featured_speaker_raw, list):
                    # Join multiple speakers with comma and space
                    featured_speaker = ", ".join(featured_speaker_raw)
                else:
                    featured_speaker = str(featured_speaker_raw)
            
            # Handle keywords - can be a list or string
            keywords = []
            if keywords_raw:
                if isinstance(keywords_raw, list):
                    keywords = keywords_raw
                elif isinstance(keywords_raw, str):
                    keywords = [keywords_raw]
            
            # Handle thumbnail - get first one if multiple
            thumbnail_url = None
            if thumbnail_raw and isinstance(thumbnail_raw, list) and len(thumbnail_raw) > 0:
                thumbnail_url = thumbnail_raw[0].get("url", "")
            
            podcast = AirtablePodcast(
                id=record.get("id", ""),
                title=title,
                thumbnail=thumbnail_url,
                featured_speaker=featured_speaker,
                description=description,
                soundcloud_embed=soundcloud_embed,
                keywords=keywords,
                release_date=release_date
            )
            podcasts.append(podcast)
        
        return podcasts
        
    except Exception as e:
        logger.error(f"Error fetching Airtable podcasts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch podcasts: {str(e)}")

async def fetch_airtable_events(view_id: str = None):
    """Fetch events from Airtable. Defaults to the upcoming-events view."""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{EVENTS_BASE_ID}/{EVENTS_TABLE_ID}"
        params = {
            "view": view_id or EVENTS_VIEW_ID,
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
            end_date = fields.get("End Date", "")
            timezone = fields.get("Timezone", "") or fields.get("Time Zone", "") or fields.get("TZ", "") or "ET"
            listing_picture = fields.get("Listing Picture", [])
            append_to_magic_link = fields.get("Append to magic link", "")
            default_signup_url = fields.get("Default Sign up URL (for NON-members)", "")
            more_details_url = fields.get("More Details URL", "")
            speaker = fields.get("Speaker", "")  # Keep for backward compatibility
            session_leader_raw = fields.get("Session Leader Name", "")
            lead_moderator_raw = fields.get("Lead Moderator Name", "")
            location = fields.get("Location", "")
            audience_network_raw = fields.get("Audience (Network)", "")
            
            # Handle Session Leader Name (can be a list or string)
            session_leader_name = ""
            if session_leader_raw:
                if isinstance(session_leader_raw, list):
                    # Join multiple session leaders with comma and space
                    session_leader_name = ", ".join(session_leader_raw)
                else:
                    session_leader_name = str(session_leader_raw)
            
            # Handle Lead Moderator Name (can be a list or string)
            lead_moderator_name = ""
            if lead_moderator_raw:
                if isinstance(lead_moderator_raw, list):
                    # Join multiple lead moderators with comma and space
                    lead_moderator_name = ", ".join(lead_moderator_raw)
                else:
                    lead_moderator_name = str(lead_moderator_raw)
            
            # Handle Audience (Network) field (can be a list or string)
            audience_network = ""
            if audience_network_raw:
                if isinstance(audience_network_raw, list):
                    # Join multiple audiences with comma and space
                    audience_network = ", ".join(audience_network_raw)
                else:
                    audience_network = str(audience_network_raw)
            
            # Final display name priority: Session Leader -> Lead Moderator -> None
            final_leader_name = session_leader_name or lead_moderator_name
            
            # Handle picture URL
            picture_url = None
            if listing_picture and isinstance(listing_picture, list) and len(listing_picture) > 0:
                picture_url = listing_picture[0].get("url", "")
            
            # Create registration URL (fallback if other URLs are not available)
            fallback_registration_url = f"https://members.thevanguardnetwork.com/events{append_to_magic_link}" if append_to_magic_link else "https://members.thevanguardnetwork.com/events"
            
            # Priority order: More Details URL -> Default Signup URL -> Fallback concatenated URL
            final_registration_url = more_details_url or default_signup_url or fallback_registration_url
            
            # Series code (e.g. 'CSC', 'GCF') — used by frontend to decide link routing
            series_code_raw = fields.get("Series Code Text") or fields.get("Series Code")
            if isinstance(series_code_raw, list):
                series_code_val = ", ".join(str(x) for x in series_code_raw if x) or None
            elif series_code_raw:
                series_code_val = str(series_code_raw).strip() or None
            else:
                series_code_val = None

            event = AirtableEvent(
                id=record.get("id", ""),
                event_title=event_title,
                date_time=date_time,
                start_date=start_date,
                end_date=end_date,
                timezone=timezone,
                listing_picture=picture_url,
                registration_url=final_registration_url,
                default_signup_url=default_signup_url,
                more_details_url=more_details_url,
                speaker=speaker,
                session_leader_name=final_leader_name,  # Use the combined logic
                lead_moderator_name=lead_moderator_name,
                location=location,
                audience_network=audience_network,
                series_code=series_code_val,
            )
            events.append(event)
        
        return events
        
    except Exception as e:
        logger.error(f"Error fetching Airtable events: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch events: {str(e)}")


async def fetch_airtable_team():
    """Fetch team members from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        team_members = []
        offset = None
        
        while True:
            params = {
                "view": TEAM_VIEW_NAME
            }
            if offset:
                params["offset"] = offset
            
            url = f"https://api.airtable.com/v0/{TEAM_BASE_ID}/{TEAM_TABLE_ID}"
            
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            for record in data.get("records", []):
                fields = record.get("fields", {})
                
                # Get image URL from attachment field
                image_url = None
                emergent_headshot = fields.get("Emergent Headshot", [])
                if emergent_headshot and isinstance(emergent_headshot, list) and len(emergent_headshot) > 0:
                    image_url = emergent_headshot[0].get("url", "")
                
                team_member = {
                    "id": record["id"],
                    "name": fields.get("Name", ""),
                    "role": fields.get("Title (External)", ""),
                    "bio": fields.get("Job Description (Public)", ""),
                    "image": image_url,
                    "linkedin": fields.get("Emergent LinkedIn", ""),
                    "section": fields.get("Emergent Section", "")
                }
                
                team_members.append(team_member)
            
            offset = data.get("offset")
            if not offset:
                break
        
        logger.info(f"Successfully fetched {len(team_members)} team members from Airtable")
        return team_members
        
    except Exception as e:
        logger.error(f"Error fetching Airtable team members: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch team members: {str(e)}")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint — returns status of all critical integrations."""
    status = {
        "status": "ok",
        "airtable_token_set": bool(AIRTABLE_ACCESS_TOKEN),
        "airtable": "unknown",
        "mongodb": "unknown",
    }

    # Test Airtable connectivity with a minimal 1-record fetch
    try:
        if not AIRTABLE_ACCESS_TOKEN:
            status["airtable"] = "error: AIRTABLE_ACCESS_TOKEN not set"
            status["status"] = "degraded"
        else:
            resp = requests.get(
                f"https://api.airtable.com/v0/{ARTICLES_BASE_ID}/{ARTICLES_TABLE_ID}",
                headers={"Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}"},
                params={"maxRecords": 1, "view": ARTICLES_VIEW_ID},
                timeout=5,
            )
            if resp.status_code == 200:
                status["airtable"] = "ok"
            else:
                status["airtable"] = f"error: HTTP {resp.status_code} — {resp.json().get('error', {}).get('type', 'unknown')}"
                status["status"] = "degraded"
    except Exception as e:
        status["airtable"] = f"error: {str(e)}"
        status["status"] = "degraded"

    # Test MongoDB connectivity
    try:
        await db.command("ping")
        status["mongodb"] = "ok"
    except Exception as e:
        status["mongodb"] = f"error: {str(e)}"
        status["status"] = "degraded"

    return status

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).limit(100).to_list(100)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/lsceo-grant/submit")
async def submit_lsceo_grant(payload: dict):
    """Write an LSCEO Grant application directly into the 'LSCEO Membership
    Grant' Google Sheet, tab '2026', via the shared service-account writer.
    Always responds HTTP 200 with {ok, error?} so Cloudflare passes the body
    through unchanged."""
    sheet_id = os.environ.get("LSCEO_GRANT_SHEET_ID")
    if not sheet_id:
        return {"ok": False, "error": "LSCEO_GRANT_SHEET_ID not configured on the server."}

    # Map incoming JSON keys -> exact column headers in row 1 of the '2026' tab.
    values_by_col = {
        "Your full name": payload.get("fullName", ""),
        "Your job title": payload.get("jobTitle", ""),
        "Company name": payload.get("companyName", ""),
        "Company website": payload.get("companyWebsite", ""),
        "Company address": payload.get("companyAddress", ""),
        "Your email": payload.get("email", ""),
        # Prefix with ' so Sheets keeps the leading + as text instead of coercing to number.
        "Phone number": ("'" + payload["phoneNumber"]) if payload.get("phoneNumber") else "",
        "Company incorporated?": payload.get("incorporated", ""),
        "Company pipeline?": payload.get("pipeline", ""),
        "Pre-revenue stage?": payload.get("preRevenue", ""),
        "More than 3 employees?": payload.get("employees4Plus", ""),
        "Company mission": payload.get("mission", ""),
        "Product pipeline": payload.get("productPipeline", ""),
        "Team members/roles": payload.get("teamRoles", ""),
        "Your network contribution": payload.get("networkContribution", ""),
        "Signature": payload.get("signature", ""),
        "Today's date": payload.get("todayDate", ""),
        "Commit to participate?": payload.get("commitToParticipate", ""),
        "Accurate application?": payload.get("accurateApplication", ""),
        "🔐 Softr Record ID": "",
    }

    try:
        row_id = _write_signup_to_google_sheet(
            {"sheet_id": sheet_id, "tab_name": "2026"},
            values_by_col,
        )
    except Exception as e:
        logger.error(f"LSCEO grant submit failed: {e}")
        return {"ok": False, "error": "Could not write the application to Google Sheets."}
    return {"ok": True, "row_id": row_id}


# --- LSCEO Grant Recipients (Berkley Circle of Fellows) ---
LSCEO_RECIPIENTS_BASE_ID = "appcKcpx0rQ37ChAo"
LSCEO_RECIPIENTS_TABLE_ID = "tbliGbJTIk94Fpzhf"
LSCEO_RECIPIENTS_COHORTS = [
    "Berkley Pre Clinical 2025",
    "Berkley In Clinical 2025",
    "Berkley Pre Clinical 2026",
    "Berkley In Clinical 2026",
]


@api_router.get("/lsceo-grant/recipients")
async def get_lsceo_grant_recipients():
    """Return past Life Sciences CEO Network grant recipients — anyone whose
    `Grant Candidate` field contains one of the LSCEO_RECIPIENTS_COHORTS values."""
    # Multi-select filter: OR over FIND(<cohort>, ARRAYJOIN({Grant Candidate}, ',')) > 0
    conds = ",".join(
        f'FIND("{c}", ARRAYJOIN({{Grant Candidate}}, ","))>0'
        for c in LSCEO_RECIPIENTS_COHORTS
    )
    formula = f"OR({conds})"
    try:
        records = await _airtable_get_all(
            LSCEO_RECIPIENTS_BASE_ID, LSCEO_RECIPIENTS_TABLE_ID,
            {"filterByFormula": formula, "pageSize": 100,
             "fields[]": ["WholeName", "Name", "Position", "Company", "Headshot",
                          "LinkedIn Profile", "Grant Candidate"]},
        )
    except Exception as e:
        logger.error(f"LSCEO recipients fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Could not load recipients.")

    people = []
    seen = set()
    for r in records:
        person = _map_person(r)
        # Skip anyone without a headshot or name (looks broken in gallery)
        if not person["name"] or person["id"] in seen:
            continue
        seen.add(person["id"])
        people.append(person)
    people.sort(key=lambda p: (p["name"].split()[-1] if p["name"] else "").lower())
    return people


# --- Event Registered Participants (GCF / LSCEOF forums) ---
FORUM_REGISTRANTS_MIN = 10
FORUM_REGISTRANTS_SERIES = {"GCF", "LSCEOF"}
FORUM_REGISTRANTS_ROLE_EXCLUDES = [
    "Vanguard Team",
    "Cancelled",
    "Declined",
    "Reception",
    "Session Leader (guest)",
]


@api_router.get("/events/{record_id}/registrants")
async def get_event_registrants(record_id: str):
    """Return the Registered Participants people gallery for GCF / LSCEOF
    forum events, but ONLY when there are >= FORUM_REGISTRANTS_MIN qualifying
    people. Otherwise returns an empty list (frontend hides the section)."""
    # 1) Load the event to grab its series_code + clean_event_code
    try:
        headers = {"Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}"}
        url = f"https://api.airtable.com/v0/{EVENTS_BASE_ID}/{EVENTS_TABLE_ID}/{record_id}"
        async with httpx.AsyncClient(timeout=20.0) as client:
            r = await client.get(url, headers=headers)
            if r.status_code == 404:
                raise HTTPException(status_code=404, detail="Event not found")
            r.raise_for_status()
            ev = r.json().get("fields", {})
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Event registrants — event fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Could not load event.")

    series_code = _first_str(ev.get("Series Code")) or _first_str(ev.get("series_code"))
    event_code = _first_str(ev.get("Clean Event Code")) or _first_str(ev.get("New Event Code"))
    if not series_code or series_code.upper() not in FORUM_REGISTRANTS_SERIES or not event_code:
        return []

    # 2) Query the contacts table with the multi-select filter formula
    conds = [f'FIND("{event_code}", ARRAYJOIN({{Forum/Event - signed up}}, ","))>0']
    for role in FORUM_REGISTRANTS_ROLE_EXCLUDES:
        conds.append(f'NOT(FIND("{role}", ARRAYJOIN({{Role - upcoming event}}, ","))>0)')
    formula = "AND(" + ",".join(conds) + ")"

    try:
        records = await _airtable_get_all(
            LSCEO_RECIPIENTS_BASE_ID, LSCEO_RECIPIENTS_TABLE_ID,
            {"filterByFormula": formula, "pageSize": 100,
             "fields[]": ["WholeName", "Name", "Position", "Company", "Headshot",
                          "LinkedIn Profile"]},
        )
    except Exception as e:
        logger.error(f"Event registrants fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Could not load registrants.")

    people = []
    seen = set()
    for r in records:
        person = _map_person(r)
        if not person["name"] or person["id"] in seen:
            continue
        seen.add(person["id"])
        people.append(person)

    if len(people) < FORUM_REGISTRANTS_MIN:
        return []

    people.sort(key=lambda p: (p["name"].split()[-1] if p["name"] else "").lower())
    return people


@api_router.get("/podcasts/similar/{podcast_id}")
async def get_similar_podcasts(podcast_id: str):
    """Get similar podcasts based on keywords"""
    try:
        # Get all podcasts
        all_podcasts = await fetch_airtable_podcasts()
        
        # Find the target podcast
        target_podcast = None
        for podcast in all_podcasts:
            if podcast.id == podcast_id:
                target_podcast = podcast
                break
        
        if not target_podcast or not target_podcast.keywords:
            return []
        
        # Find similar podcasts based on keyword overlap
        similar_podcasts = []
        target_keywords = set(target_podcast.keywords)
        
        for podcast in all_podcasts:
            if podcast.id == podcast_id:  # Skip the same podcast
                continue
                
            if podcast.keywords:
                podcast_keywords = set(podcast.keywords)
                overlap = len(target_keywords.intersection(podcast_keywords))
                
                if overlap > 0:  # Has at least one keyword in common
                    similar_podcasts.append({
                        "podcast": podcast,
                        "similarity_score": overlap
                    })
        
        # Sort by similarity score and return top 3
        similar_podcasts.sort(key=lambda x: x["similarity_score"], reverse=True)
        return [item["podcast"] for item in similar_podcasts[:3]]
        
    except Exception as e:
        logger.error(f"Error in get_similar_podcasts: {str(e)}")
        return []

@api_router.get("/podcasts", response_model=List[AirtablePodcast])
async def get_podcasts():
    """Get podcasts from Airtable"""
    try:
        podcasts = await fetch_airtable_podcasts()
        logger.info(f"Successfully fetched {len(podcasts)} podcasts from Airtable")
        return podcasts
    except Exception as e:
        logger.error(f"Error in get_podcasts: {str(e)}")
        return []

@api_router.get("/podcast/{podcast_id}")
async def get_podcast(podcast_id: str):
    """Get a single podcast by ID from Airtable"""
    try:
        podcasts = await fetch_airtable_podcasts()
        for podcast in podcasts:
            if podcast.id == podcast_id:
                return podcast
        raise HTTPException(status_code=404, detail="Podcast not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in get_podcast: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch podcast")

@api_router.get("/videos", response_model=List[AirtableVideo])
async def get_videos():
    """Get videos from Airtable"""
    try:
        videos = await fetch_airtable_videos()
        logger.info(f"Successfully fetched {len(videos)} videos from Airtable")
        return videos
    except Exception as e:
        logger.error(f"Error in get_videos: {str(e)}")
        return []

@api_router.get("/video/{video_id}")
async def get_video(video_id: str):
    """Get a single video by ID from Airtable"""
    try:
        videos = await fetch_airtable_videos()
        for video in videos:
            if video.id == video_id:
                return video
        raise HTTPException(status_code=404, detail="Video not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in get_video: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch video")

@api_router.get("/videos/similar/{video_id}")
async def get_similar_videos(video_id: str):
    """Get similar videos based on keywords"""
    try:
        # Get all videos
        all_videos = await fetch_airtable_videos()
        
        # Find the target video
        target_video = None
        for video in all_videos:
            if video.id == video_id:
                target_video = video
                break
        
        if not target_video or not target_video.keywords:
            return []
        
        # Find similar videos based on keyword overlap
        similar_videos = []
        target_keywords = set(target_video.keywords)
        
        for video in all_videos:
            if video.id == video_id:  # Skip the same video
                continue
                
            if video.keywords:
                video_keywords = set(video.keywords)
                overlap = len(target_keywords.intersection(video_keywords))
                
                if overlap > 0:  # Has at least one keyword in common
                    similar_videos.append({
                        "video": video,
                        "similarity_score": overlap
                    })
        
        # Sort by similarity score and return top 3
        similar_videos.sort(key=lambda x: x["similarity_score"], reverse=True)
        return [item["video"] for item in similar_videos[:3]]
        
    except Exception as e:
        logger.error(f"Error in get_similar_videos: {str(e)}")
        return []

@api_router.get("/articles", response_model=List[AirtableArticle])
async def get_articles():
    """Get articles from Airtable (sorted according to AirTable view configuration)"""
    try:
        articles = await fetch_airtable_articles()
        logger.info(f"Successfully fetched {len(articles)} articles from Airtable")
        return articles
    except Exception as e:
        logger.error(f"Error in get_articles: {str(e)}")
        return []

@api_router.get("/article/{article_id}")
async def get_article(article_id: str):
    """Get a single article by ID from Airtable"""
    try:
        articles = await fetch_airtable_articles()
        for article in articles:
            if article.id == article_id:
                return article
        raise HTTPException(status_code=404, detail="Article not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in get_article: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch article")

@api_router.get("/articles/similar/{article_id}", response_model=List[AirtableArticle])
async def get_similar_articles(article_id: str):
    """Get similar articles based on keyword matching"""
    try:
        all_articles = await fetch_airtable_articles()
        
        # Find the target article
        target_article = None
        for article in all_articles:
            if article.id == article_id:
                target_article = article
                break
        
        if not target_article:
            return []
        
        # If no keywords, return empty list
        if not target_article.keywords or len(target_article.keywords) == 0:
            return []
        
        # Calculate similarity scores
        similar_articles = []
        target_keywords = set(target_article.keywords)
        
        for article in all_articles:
            # Skip the article itself
            if article.id == article_id:
                continue
            
            # Skip articles without keywords
            if not article.keywords or len(article.keywords) == 0:
                continue
            
            # Calculate similarity (number of matching keywords)
            article_keywords = set(article.keywords)
            common_keywords = target_keywords.intersection(article_keywords)
            similarity_score = len(common_keywords)
            
            # Only include articles with at least 1 matching keyword
            if similarity_score > 0:
                similar_articles.append({
                    'article': article,
                    'score': similarity_score
                })
        
        # Sort by similarity score (descending) and return top 3
        similar_articles.sort(key=lambda x: x['score'], reverse=True)
        top_similar = [item['article'] for item in similar_articles[:3]]
        
        logger.info(f"Found {len(top_similar)} similar articles for article {article_id}")
        return top_similar
        
    except Exception as e:
        logger.error(f"Error in get_similar_articles: {str(e)}")
        return []

@api_router.get("/newsroom", response_model=List[AirtableNewsroom])
async def get_newsroom():
    """Get newsroom articles from Airtable"""
    try:
        newsroom_articles = await fetch_airtable_newsroom()
        logger.info(f"Successfully fetched {len(newsroom_articles)} newsroom articles from Airtable")
        return newsroom_articles
    except Exception as e:
        logger.error(f"Error in get_newsroom: {str(e)}")
        return []

@api_router.get("/newsroom/{article_id}")
async def get_newsroom_article(article_id: str):
    """Get a single newsroom article by ID from Airtable"""
    try:
        newsroom_articles = await fetch_airtable_newsroom()
        
        # Find the specific article
        article = next((art for art in newsroom_articles if art.id == article_id), None)
        if not article:
            raise HTTPException(status_code=404, detail="Newsroom article not found")
        
        return article
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in get_newsroom_article: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch newsroom article")

@api_router.get("/in-the-press", response_model=List[AirtableInThePress])
async def get_in_the_press():
    """Get In the Press articles from Airtable"""
    try:
        press_articles = await fetch_airtable_in_the_press()
        logger.info(f"Successfully fetched {len(press_articles)} In the Press articles from Airtable")
        return press_articles
    except Exception as e:
        logger.error(f"Error in get_in_the_press: {str(e)}")
        return []

@api_router.get("/in-the-press/{press_id}")
async def get_in_the_press_article(press_id: str):
    """Get a single In the Press article by ID from Airtable"""
    try:
        press_articles = await fetch_airtable_in_the_press()
        for press_article in press_articles:
            if press_article.id == press_id:
                return press_article
        raise HTTPException(status_code=404, detail="In the Press article not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in get_in_the_press_article: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch In the Press article")

@api_router.get("/gc-members", response_model=List[AirtableGCMember])
async def get_gc_members():
    """Get GC Exchange members from Airtable"""
    try:
        gc_members = await fetch_airtable_gc_members()
        logger.info(f"Successfully fetched {len(gc_members)} GC members from Airtable")
        return gc_members
    except Exception as e:
        logger.error(f"Error in get_gc_members: {str(e)}")
        return []

@api_router.get("/events", response_model=List[AirtableEvent])
async def get_upcoming_events():
    """Get upcoming events from Airtable"""
    try:
        events = await fetch_airtable_events()
        logger.info(f"Successfully fetched {len(events)} events from Airtable")
        return events
    except Exception as e:
        logger.error(f"Error in get_upcoming_events: {str(e)}")
        return []

@api_router.get("/past-events", response_model=List[AirtableEvent])
async def get_past_events():
    """Get past events from Airtable (dedicated view)."""
    try:
        events = await fetch_airtable_events(view_id=EVENTS_PAST_VIEW_ID)
        logger.info(f"Successfully fetched {len(events)} past events from Airtable")
        return events
    except Exception as e:
        logger.error(f"Error in get_past_events: {str(e)}")
        return []


# =====================================================================
# PROGRAMS (CMS-driven program pages in base appqyKMZnFfgSuJKt)
# =====================================================================
import asyncio  # noqa: E402

PROGRAMS_BASE_ID = "appqyKMZnFfgSuJKt"
PROGRAMS_TABLE_ID = "tblWast1uLPpqyQKr"
PROGRAMS_VIEW_ID = "viwJOg5PFfyhVOyDN"
PROGRAM_SECTIONS_TABLE_ID = "tblnw1njqiNMOEXV4"
PROGRAM_SECTIONS_VIEW_ID = "viwaaPZ7BMwEjUFOq"
PROGRAMS_PEOPLE_TABLE_ID = "tblLZC1ebQd9FfnCF"
PROGRAMS_PEOPLE_VIEW_ID = "viwOV8LK4EWLCOQRo"
PROGRAMS_COMPANIES_TABLE_ID = "tblDB1mGkJI1VtEfB"
PROGRAMS_COMPANIES_VIEW_ID = "viwM2C2Yok6tIxkW9"

# --- GC Exchange participants override -------------------------------------
# For /programs/general-counsel-exchange, the "People Gallery" section is
# replaced with deduped company logos of active participants pulled from the
# CRM base (not the Programs base).
GCX_PARTICIPANTS_BASE_ID = "appcKcpx0rQ37ChAo"
GCX_PARTICIPANTS_TABLE_ID = "tbliGbJTIk94Fpzhf"
GCX_PARTICIPANTS_VIEW_ID = "viwvkf5gbM1J529St"
GCX_PARTICIPANTS_HEADING = "Participants Have Included Leaders From These Organizations"
PROGRAMS_FEATURE_ITEMS_TABLE_ID = "tbl8V8nJEoY8eqv84"
PROGRAMS_FEATURE_ITEMS_VIEW_ID = "viwS3VnFPYaikjxWh"

# Networks (linked from a Programs row where Page Type = 'network')
NETWORKS_TABLE_ID = "tbl0fz3lDtO8hUo5Z"
NETWORKS_VIEW_ID = "viw7ZprMk32iLYkcO"
# Network Partners: rows link to Networks; each row has a company logo attachment/lookup
NETWORK_PARTNERS_TABLE_ID = "tbldlzSYoU3PGtJyn"
# Membership records (one row per member) linked from Networks.Members Vanguard
NETWORK_MEMBERS_TABLE_ID = "tblzhqX81e1myqL8B"

# Fallback map: slug -> board tag stored on VG Contacts "board advisor/guest" field.
# Used when the Networks row does not have an explicit `advisor_board_tag` field set.
NETWORK_BOARD_TAGS = {
    "general-counsel-network": "gc advisory board",
    "next-gen-gc-network": "nggc 2025 advisory board",
    "life-sciences-ceo-network": "lsceo advisory board",
    "risk-management-network": "risk management advisory board",
}

# Per-network name exclusions for the Advisors gallery (case-insensitive).
# Use to hide specific people without removing them from the underlying board list.
NETWORK_ADVISOR_EXCLUDE = {
    "general-counsel-network": {"michael sevi"},
}

# Per-network name exclusions for the Chair gallery (case-insensitive).
NETWORK_CHAIR_EXCLUDE = {
    "next-gen-gc-network": {"tom sabatino"},
}

# Networks that should NOT render the bottom CTA banner.
NETWORK_HIDE_BOTTOM_CTA = {"senior-in-house-counsel-network"}


async def _airtable_get(base_id: str, table_id: str, params: dict = None):
    headers = {"Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}"}
    url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.get(url, headers=headers, params=params or {})
        r.raise_for_status()
        return r.json().get("records", [])


async def _airtable_get_all(base_id: str, table_id: str, params: dict = None):
    """Same as _airtable_get but follows Airtable's `offset` pagination."""
    headers = {"Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}"}
    url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
    records = []
    offset = None
    async with httpx.AsyncClient(timeout=30.0) as client:
        while True:
            p = dict(params or {})
            if offset:
                p["offset"] = offset
            r = await client.get(url, headers=headers, params=p)
            r.raise_for_status()
            data = r.json()
            records.extend(data.get("records", []))
            offset = data.get("offset")
            if not offset:
                break
    return records


async def _fetch_gcx_participant_company_logos():
    """Pull participants for the GC Exchange program, dedupe by company name,
    and return a list of {id, name, logo} suitable for the Logo Gallery block."""
    records = await _airtable_get_all(
        GCX_PARTICIPANTS_BASE_ID, GCX_PARTICIPANTS_TABLE_ID,
        {"view": GCX_PARTICIPANTS_VIEW_ID, "pageSize": 100,
         "fields[]": ["Company", "Company Logo"]}
    )
    seen = set()
    logos = []
    for rec in records:
        f = rec.get("fields", {})
        name = (f.get("Company") or "").strip()
        logo = _first_attachment_url(f.get("Company Logo"))
        if not name or not logo:
            continue
        key = name.lower()
        if key in seen:
            continue
        seen.add(key)
        logos.append({"id": rec["id"], "name": name, "logo": logo})
    logos.sort(key=lambda c: c["name"].lower())
    return logos


def _pick(fields: dict, *keys):
    """Return the first non-empty value from a list of possible field names."""
    for k in keys:
        v = fields.get(k)
        if v not in (None, "", [], {}):
            return v
    return None


def _map_person(record):
    f = record.get("fields", {})
    return {
        "id": record.get("id"),
        "name": _pick(f, "WholeName", "Name") or "",
        "title": _pick(f, "Position", "Title") or "",
        "company": _pick(f, "Company") or "",
        "headshot": _first_attachment_url(_pick(f, "Headshot", "Photo")),
        "linkedin_url": _pick(f, "LinkedIn Profle", "LinkedIn Profile", "LinkedIn") or "",
    }


def _map_company(record):
    f = record.get("fields", {})
    return {
        "id": record.get("id"),
        "name": _pick(f, "Company Name", "Name") or "",
        "logo": _first_attachment_url(_pick(f, "Logo")),
    }


def _map_network(record):
    """Map a row from the Networks table."""
    f = record.get("fields", {})
    return {
        "id": record.get("id"),
        "name": _pick(f, "Network Name", "network name", "Name") or "",
        "description_short": _pick(f, "Description short", "description short", "Description Short", "Short Description") or "",
        "description_long": _pick(f, "Description long", "description long", "Description Long", "Long Description") or "",
        # Optional override — text that appears in VG Contacts "board advisor/guest" field.
        "advisor_board_tag": _pick(f, "advisor_board_tag", "Advisor Board Tag", "Board Tag") or "",
        # Linked VG Contacts that are members of this network.
        "member_contact_ids": _pick(f, "Members Vanguard", "members vanguard", "Members") or [],
    }


def _extract_partner_company_logos(record):
    """From one Partners row, return the individual company logos (for the
    "Thanks To Our Network Partners" gallery). Does NOT include the row-level Graphic."""
    f = record.get("fields", {})
    logos = _pick(f, "Logo (from Network Partners)", "logo (from network partners)") or []
    names = _pick(f, "Company Name (from Network Partners)", "company name (from network partners)") or []
    company_ids = _pick(f, "Network Partners", "network partners") or []
    results = []
    if isinstance(logos, list):
        for i, logo in enumerate(logos):
            if isinstance(logo, dict) and logo.get("url"):
                results.append({
                    "id": company_ids[i] if isinstance(company_ids, list) and i < len(company_ids) else f"{record.get('id')}-{i}",
                    "name": names[i] if isinstance(names, list) and i < len(names) else "",
                    "logo": logo["url"],
                })
    return results


def _extract_partner_access_item(record):
    """From one Partners row, return the row-level graphic (for the
    "Membership Provides Access To" gallery). One item per row max."""
    f = record.get("fields", {})
    graphic = _first_attachment_url(_pick(f, "Graphic", "graphic"))
    if not graphic:
        return None
    return {
        "id": record.get("id"),
        "name": _pick(f, "Description", "description") or "",
        "logo": graphic,
    }


def _map_feature_item(record):
    f = record.get("fields", {})
    return {
        "id": record.get("id"),
        "title": _pick(f, "title", "Title") or "",
        "body": _pick(f, "body", "Body") or "",
        "icon": _pick(f, "icon", "Icon") or "",
        "display_order": _pick(f, "display_order", "Display Order") or 0,
    }


def _map_program(record):
    f = record.get("fields", {})
    return {
        "id": record.get("id"),
        "slug": _pick(f, "Slug", "slug") or "",
        "name": _pick(f, "Program Name", "name", "Name") or "",
        "tagline": _pick(f, "Tag Line", "tagline", "Tagline") or "",
        "summary": _pick(f, "Summary", "summary") or "",
        "hero_image": _first_attachment_url(_pick(f, "Hero Image", "hero_image")),
        "hero_cta_label": _pick(f, "Hero CTA Label", "hero_cta_label") or "",
        "hero_cta_url": _pick(f, "Hero CTA url", "Hero CTA URL", "Hero CTA Url", "hero_cta_url") or "",
        "series_code": _pick(f, "Series Code", "series_code") or "",
        "status": _pick(f, "Status", "status") or "",
        "display_order": _pick(f, "Display Order", "display_order") or 0,
        "seo_title": _pick(f, "SEO Title", "seo_title") or "",
        "seo_description": _pick(f, "SEO Description", "seo_description") or "",
        # Which detail page this row drives: "program" (default) or "network"
        "page_type": (_pick(f, "Page Type", "page_type") or "program").strip().lower(),
    }


def _map_section(record, people_by_id, companies_by_id, feature_items_by_id):
    f = record.get("fields", {})
    people_ids = _pick(f, "People", "people") or []
    company_ids = _pick(f, "Company Logos", "companies", "logo_attachments") or []
    feature_ids = _pick(f, "Feature Items", "feature_items") or []
    return {
        "id": record.get("id"),
        "order": _pick(f, "order", "Order") or 0,
        "type": _pick(f, "type", "Type") or "Text Block",
        "heading": _pick(f, "heading", "Heading") or "",
        "subheading": _pick(f, "subheading", "Subheading") or "",
        "body": _pick(f, "body", "Body") or "",
        "image": _first_attachment_url(_pick(f, "image", "Image")),
        "image_side": _pick(f, "image_side", "Image Side") or "right",
        "video_url": _pick(f, "video_url", "Video URL", "Video Url", "Video url") or "",
        "cta_label": _pick(f, "cta_label", "CTA Label") or "",
        "cta_url": _pick(f, "cta_url", "CTA URL", "CTA Url", "CTA url") or "",
        "background": _pick(f, "background", "Background") or "white",
        "series_code_override": _pick(f, "series_code_override", "Series Code Override") or "",
        "max_items": _pick(f, "max_items", "Max Items") or 0,
        "columns": _pick(f, "columns", "Columns", "grid_columns", "Grid Columns") or "",
        "people": [people_by_id[rid] for rid in people_ids if rid in people_by_id],
        "companies": [companies_by_id[rid] for rid in company_ids if rid in companies_by_id],
        "feature_items": sorted(
            [feature_items_by_id[rid] for rid in feature_ids if rid in feature_items_by_id],
            key=lambda x: x.get("display_order") or 0
        ),
    }


@api_router.get("/programs")
async def list_programs():
    try:
        records = await _airtable_get(
            PROGRAMS_BASE_ID, PROGRAMS_TABLE_ID,
            {"view": PROGRAMS_VIEW_ID, "maxRecords": 100}
        )
        programs = [_map_program(r) for r in records]
        programs = [p for p in programs if p["slug"] and p["status"] == "Published" and p["page_type"] == "program"]
        programs.sort(key=lambda p: p["display_order"] or 999)
        return programs
    except Exception as e:
        logger.error(f"Error listing programs: {e}")
        return []


@api_router.get("/networks")
async def list_networks():
    try:
        records = await _airtable_get(
            PROGRAMS_BASE_ID, PROGRAMS_TABLE_ID,
            {"view": PROGRAMS_VIEW_ID, "maxRecords": 100}
        )
        networks = [_map_program(r) for r in records]
        networks = [n for n in networks if n["slug"] and n["status"] == "Published" and n["page_type"] == "network"]
        networks.sort(key=lambda n: n["display_order"] or 999)
        return networks
    except Exception as e:
        logger.error(f"Error listing networks: {e}")
        return []


async def _fetch_page_with_sections(slug: str, expected_type: str):
    """Shared loader for a Programs-table row (program or network) + its sections + linked records."""
    program_records = await _airtable_get(
        PROGRAMS_BASE_ID, PROGRAMS_TABLE_ID,
        {"view": PROGRAMS_VIEW_ID, "maxRecords": 100}
    )
    program_record = next(
        (r for r in program_records
         if _pick(r.get("fields", {}), "Slug", "slug") == slug),
        None
    )
    if not program_record:
        raise HTTPException(status_code=404, detail=f"'{slug}' not found")
    program = _map_program(program_record)
    if program["page_type"] != expected_type:
        raise HTTPException(status_code=404, detail=f"'{slug}' not found")

    section_records_all = await _airtable_get(
        PROGRAMS_BASE_ID, PROGRAM_SECTIONS_TABLE_ID,
        {"view": PROGRAM_SECTIONS_VIEW_ID, "maxRecords": 500}
    )
    def _linked_to(f, pid):
        for k in ("program", "Program"):
            v = f.get(k)
            if isinstance(v, list) and pid in v:
                return True
        return False
    def _is_published(f):
        v = _pick(f, "published", "Published")
        if "published" not in f and "Published" not in f:
            return True
        return bool(v)
    section_records = [r for r in section_records_all if _linked_to(r.get("fields", {}), program["id"]) and _is_published(r.get("fields", {}))]

    people_ids, company_ids, feature_ids = set(), set(), set()
    for r in section_records:
        f = r.get("fields", {})
        for rid in (_pick(f, "People", "people") or []): people_ids.add(rid)
        for rid in (_pick(f, "Company Logos", "companies", "logo_attachments") or []): company_ids.add(rid)
        for rid in (_pick(f, "Feature Items", "feature_items") or []): feature_ids.add(rid)

    async def fetch_linked(table_id, view_id, ids, mapper):
        if not ids:
            return {}
        ids_list = list(ids)
        formula_parts = [f"RECORD_ID()='{rid}'" for rid in ids_list]
        formula = "OR(" + ",".join(formula_parts) + ")" if len(formula_parts) > 1 else formula_parts[0]
        records = await _airtable_get(
            PROGRAMS_BASE_ID, table_id,
            {"filterByFormula": formula, "maxRecords": len(ids_list)}
        )
        return {r["id"]: mapper(r) for r in records}

    people_by_id, companies_by_id, feature_items_by_id = await asyncio.gather(
        fetch_linked(PROGRAMS_PEOPLE_TABLE_ID, PROGRAMS_PEOPLE_VIEW_ID, people_ids, _map_person),
        fetch_linked(PROGRAMS_COMPANIES_TABLE_ID, PROGRAMS_COMPANIES_VIEW_ID, company_ids, _map_company),
        fetch_linked(PROGRAMS_FEATURE_ITEMS_TABLE_ID, PROGRAMS_FEATURE_ITEMS_VIEW_ID, feature_ids, _map_feature_item),
    )

    sections = [
        _map_section(r, people_by_id, companies_by_id, feature_items_by_id)
        for r in section_records
    ]
    sections.sort(key=lambda s: s["order"] or 999)

    # --- Override: GC Exchange participants section --------------------------
    # Replace the People Gallery with a deduped company-logo grid drawn from
    # the CRM base (not the Programs base).
    if program["slug"] == "general-counsel-exchange":
        try:
            gcx_logos = await _fetch_gcx_participant_company_logos()
            if gcx_logos:
                for s in sections:
                    if (s.get("type") or "").strip().lower() == "people gallery":
                        s["type"] = "Logo Gallery"
                        s["heading"] = GCX_PARTICIPANTS_HEADING
                        s["companies"] = gcx_logos
                        s["people"] = []
                        s["columns"] = "dense"
                        s["background"] = "plain"
                        break
        except Exception as gcx_err:
            logger.error(f"GC Exchange logo override failed: {gcx_err}")

    return {"program": program, "sections": sections}


@api_router.get("/programs/{slug}")
async def get_program(slug: str):
    try:
        return await _fetch_page_with_sections(slug, expected_type="program")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching program '{slug}': {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/networks/{slug}")
async def get_network(slug: str):
    try:
        data = await _fetch_page_with_sections(slug, expected_type="network")
        program = data["program"]

        # 1) Find the linked Networks row from the Programs row's linked field.
        program_records = await _airtable_get(
            PROGRAMS_BASE_ID, PROGRAMS_TABLE_ID,
            {"view": PROGRAMS_VIEW_ID, "maxRecords": 100}
        )
        program_record = next((r for r in program_records if r.get("id") == program["id"]), None)
        network_ids = []
        if program_record:
            pf = program_record.get("fields", {})
            network_ids = _pick(pf, "Network", "network", "Networks") or []

        network_row = None
        if network_ids:
            nid = network_ids[0]
            nrecs = await _airtable_get(
                PROGRAMS_BASE_ID, NETWORKS_TABLE_ID,
                {"filterByFormula": f"RECORD_ID()='{nid}'", "maxRecords": 1}
            )
            if nrecs:
                network_row = _map_network(nrecs[0])

        # Fall back gracefully if the Programs row doesn't have Network linked yet
        # (page will still render with just the hero from Programs fields).
        network_info = network_row or {
            "id": None,
            "name": program.get("name") or "",
            "description_short": program.get("tagline") or "",
            "description_long": program.get("summary") or "",
            "advisor_board_tag": "",
        }

        # 2) Determine the board tag used to filter VG Contacts.
        board_tag = (network_info.get("advisor_board_tag") or NETWORK_BOARD_TAGS.get(slug, "")).strip()

        # 3) Fetch chair(s) and advisors from VG Contacts filtered by board tag.
        chairs, advisors = [], []
        if board_tag:
            # Airtable formula: FIND is case-sensitive; wrap both sides in LOWER() for safety.
            # "board advisor/guest" is typically a multi-select or comma-joined text; FIND on ARRAYJOIN works.
            safe_tag = board_tag.replace("'", "\\'")
            formula = (
                f"AND("
                f"FIND(LOWER('{safe_tag}'), LOWER(ARRAYJOIN({{board advisor/guest}}, ',')))>0"
                f")"
            )
            try:
                contact_records = await _airtable_get(
                    PROGRAMS_BASE_ID, PROGRAMS_PEOPLE_TABLE_ID,
                    {"filterByFormula": formula, "maxRecords": 200}
                )
            except Exception as ce:
                logger.warning(f"Contact filter failed for '{board_tag}': {ce}")
                contact_records = []

            for cr in contact_records:
                cf = cr.get("fields", {})
                chair_flag = _pick(cf, "network chair", "Network Chair")
                is_chair = False
                if isinstance(chair_flag, bool):
                    is_chair = chair_flag
                elif isinstance(chair_flag, str):
                    is_chair = chair_flag.strip().lower() in ("yes", "true", "1", "y")
                elif isinstance(chair_flag, list):
                    is_chair = any(str(v).strip().lower() in ("yes", "true", "1", "y") for v in chair_flag)
                mapped = _map_person(cr)
                (chairs if is_chair else advisors).append(mapped)

        # Per-network advisor exclusions (hide specific people by name, case-insensitive).
        exclude_advisors = NETWORK_ADVISOR_EXCLUDE.get(slug, set())
        if exclude_advisors:
            advisors = [a for a in advisors if a.get("name", "").strip().lower() not in exclude_advisors]
        exclude_chairs = NETWORK_CHAIR_EXCLUDE.get(slug, set())
        if exclude_chairs:
            chairs = [c for c in chairs if c.get("name", "").strip().lower() not in exclude_chairs]

        # 4) Fetch partners linked to this Networks row, then split into two sections:
        #    - "Thanks To Our Network Partners" (individual company logos from lookup)
        #    - "Membership Provides Access To" (row-level graphics)
        # Note: Airtable formulas on linked fields return display names, not record IDs,
        # so we fetch all partner rows and filter in Python by the linked record ID.
        partner_logos = []
        access_items = []
        if network_info.get("id"):
            nid = network_info["id"]
            try:
                partner_records = await _airtable_get(
                    PROGRAMS_BASE_ID, NETWORK_PARTNERS_TABLE_ID,
                    {"maxRecords": 500}
                )
            except Exception as pe:
                logger.warning(f"Partner fetch failed for network '{slug}': {pe}")
                partner_records = []
            for pr in partner_records:
                pf = pr.get("fields", {})
                links = _pick(pf, "Networks", "networks") or []
                if not (isinstance(links, list) and nid in links):
                    continue
                partner_logos.extend(_extract_partner_company_logos(pr))
                access_item = _extract_partner_access_item(pr)
                if access_item:
                    access_items.append(access_item)
            partner_logos = [p for p in partner_logos if p.get("logo")]

        # 4b) Fetch network members from the Members Vanguard table.
        # Each row already carries Company name + Logo attachment; dedupe by company name.
        member_companies = []
        member_ids = network_info.get("member_contact_ids") or []
        if member_ids:
            id_chunks = [member_ids[i:i+50] for i in range(0, len(member_ids), 50)]
            seen_companies = {}  # lowercased name -> {id, name, logo}
            for chunk in id_chunks:
                formula = "OR(" + ",".join([f"RECORD_ID()='{mid}'" for mid in chunk]) + ")"
                try:
                    member_recs = await _airtable_get(
                        PROGRAMS_BASE_ID, NETWORK_MEMBERS_TABLE_ID,
                        {"filterByFormula": formula, "maxRecords": len(chunk)}
                    )
                except Exception as me:
                    logger.warning(f"Member fetch batch failed for '{slug}': {me}")
                    member_recs = []
                for mr in member_recs:
                    mf = mr.get("fields", {})
                    cname = (_pick(mf, "Company", "Company (from VG Contacts)") or "").strip()
                    logo = _first_attachment_url(
                        _pick(mf, "Logo (from Company copy)", "Logo", "Company Logo")
                    )
                    if not cname or not logo:
                        continue
                    key = cname.lower()
                    if key in seen_companies:
                        continue
                    seen_companies[key] = {
                        "id": mr.get("id"),
                        "name": cname,
                        "logo": logo,
                    }
            member_companies = list(seen_companies.values())
            member_companies.sort(key=lambda c: c["name"].lower())

        # 5) Synthesize virtual sections at the start of the page (auto-render).
        virtual_sections = []
        # Hero CTA -> opens modal (uniform per network); frontend registers 'network-membership-form'.
        hero_cta_label = program.get("hero_cta_label") or f"Join The {network_info['name'] or program['name']}"
        virtual_sections.append({
            "id": f"vsec-hero-{program['id']}",
            "order": 0,
            "type": "Hero",
            "heading": network_info["name"] or program["name"],
            "subheading": network_info["description_short"] or program.get("tagline") or "",
            "body": network_info["description_long"] or program.get("summary") or "",
            "image": program.get("hero_image") or "",
            "image_side": "right",
            "video_url": "",
            "cta_label": hero_cta_label,
            "cta_url": "#form:membership-application",
            "background": "dark-box",
            "series_code_override": "",
            "max_items": 0,
            "columns": "",
            "people": [],
            "companies": [],
            "feature_items": [],
        })

        def _base_section(order, kind, block_type, heading, background, people=None, companies=None, subheading=""):
            return {
                "id": f"vsec-{kind}-{program['id']}",
                "order": order,
                "type": block_type,
                "heading": heading,
                "subheading": subheading,
                "body": "",
                "image": "",
                "image_side": "right",
                "video_url": "",
                "cta_label": "",
                "cta_url": "",
                "background": background,
                "series_code_override": "",
                "max_items": 0,
                "columns": "",
                "people": people or [],
                "companies": companies or [],
                "feature_items": [],
            }

        if access_items:
            sec = _base_section(10, "access", "Logo Gallery", "Membership Provides Access To", "light-blue-strip", companies=access_items)
            sec["columns"] = "large"
            virtual_sections.append(sec)

        if partner_logos:
            virtual_sections.append(_base_section(20, "partners", "Logo Gallery", "Thanks To Our Network Partners", "white", companies=partner_logos))

        if chairs:
            heading = "Network Chair" if len(chairs) == 1 else "Network Chairs"
            virtual_sections.append(_base_section(30, "chair", "People Gallery", heading, "plain", people=chairs))

        if advisors:
            sec = _base_section(40, "advisors", "People Gallery", "Network Advisors", "light-blue-box", people=advisors)
            sec["columns"] = "all"
            virtual_sections.append(sec)

        if member_companies:
            sec = _base_section(50, "members", "Logo Gallery", "Our Network Has Included Leaders From These Organizations", "light-blue-strip", companies=member_companies)
            sec["columns"] = "dense"
            virtual_sections.append(sec)

        # Bottom CTA Banner — same button as the hero, dark background
        if slug not in NETWORK_HIDE_BOTTOM_CTA:
            virtual_sections.append({
                "id": f"vsec-cta-{program['id']}",
                "order": 90,
                "type": "CTA Banner",
                "heading": f"Ready to Join the {network_info['name'] or program['name']}?",
                "subheading": "",
                "body": network_info["description_short"] or "",
                "image": "",
                "image_side": "right",
                "video_url": "",
                "cta_label": hero_cta_label,
                "cta_url": "#form:membership-application",
                "background": "dark-box",
                "series_code_override": "",
                "max_items": 0,
                "columns": "",
                "people": [],
                "companies": [],
                "feature_items": [],
            })

        # Append any manually authored Program Sections rows *after* the virtual ones.
        # (Their `order` field is preserved; they'll appear below the auto-rendered blocks.)
        all_sections = virtual_sections + [
            {**s, "order": (s.get("order") or 0) + 100} for s in data["sections"]
        ]
        all_sections.sort(key=lambda s: s["order"] if s.get("order") is not None else 999)

        return {
            "network": {**program, **network_info, "slug": program["slug"], "id": program["id"]},
            "program": program,
            "sections": all_sections,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching network '{slug}': {e}")
        raise HTTPException(status_code=500, detail=str(e))


def _first_attachment_url(field_value):
    """Return the URL of the first Airtable attachment, else None."""
    if isinstance(field_value, list) and field_value:
        return field_value[0].get("url") or None
    return None

def _first_str(field_value):
    """Return joined string for list-type Airtable fields, or the value itself as str."""
    if field_value is None:
        return None
    # Airtable button/URL fields come back as {label, url}
    if isinstance(field_value, dict):
        return field_value.get("url") or field_value.get("label") or None
    if isinstance(field_value, list):
        return ", ".join(str(v) for v in field_value if v) or None
    return str(field_value) or None

def _long_text(field_value):
    """Return plain text for a long-text/rich-text/url-with-label Airtable field."""
    if field_value is None:
        return None
    if isinstance(field_value, dict):
        # URL/button field: prefer the URL so the page can render it as a link
        return field_value.get("url") or field_value.get("label") or None
    return str(field_value) or None

@api_router.get("/events/{record_id}", response_model=AirtableEventDetail)
async def get_event_by_id(record_id: str):
    """Get a single event's full details from Airtable by record ID."""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json",
        }
        url = f"https://api.airtable.com/v0/{EVENTS_BASE_ID}/{EVENTS_TABLE_ID}/{record_id}"
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Event not found")
        response.raise_for_status()
        record = response.json()
        fields = record.get("fields", {})

        # Session leader / moderator names (can be list or string)
        session_leader_name = _first_str(fields.get("Session Leader Name"))
        lead_moderator_name = _first_str(fields.get("Lead Moderator Name"))

        # Position and company can also be lookup lists
        session_leader_position = _first_str(fields.get("Position (from Session Leader(s))"))
        session_leader_company = _first_str(fields.get("Company (Session Leader)"))
        session_leader_linkedin = _first_str(fields.get("Session Leader linked IN URL")) \
            or _first_str(fields.get("Linked In Profile (session leader)"))

        # Images
        listing_picture_url = _first_attachment_url(fields.get("Listing Picture"))
        co_chair_graphic_url = _first_attachment_url(fields.get("Co-chair Graphic"))
        session_leader_headshot = _first_attachment_url(fields.get("Headshot"))

        # Registration URLs
        default_signup_members = fields.get("Default Sign up URL (for members)") or None
        default_signup_non_members = fields.get("Default Sign up URL (for NON-members)") or None
        more_details_url = fields.get("More Details URL") or None
        append_to_magic_link = fields.get("Append to magic link") or ""
        fallback_url = (
            f"https://members.thevanguardnetwork.com/events{append_to_magic_link}"
            if append_to_magic_link
            else "https://members.thevanguardnetwork.com/events"
        )
        final_registration_url = more_details_url or default_signup_non_members or default_signup_members or fallback_url

        detail = AirtableEventDetail(
            id=record.get("id", record_id),
            event_title=(fields.get("Event Title") or "").strip(),
            short_description=_long_text(fields.get("Short Description")),
            long_description=_long_text(fields.get("Long Description")),
            date_time=fields.get("Date & Time begin/end") or None,
            start_date=fields.get("Start Date") or None,
            end_date=fields.get("End Date") or None,
            start_time=fields.get("Start Time") or None,
            end_time=fields.get("End Time") or fields.get("Ending Time") or None,
            timezone=fields.get("Time Zone") or fields.get("Timezone") or None,
            duration_minutes=fields.get("Duration in Minutes") or None,
            location=fields.get("Location") or None,
            venue_address=fields.get("Venue Address for automation") or None,
            in_person_digital=fields.get("In Person/Digital") or None,
            graphic=None,
            co_chair_graphic=co_chair_graphic_url,
            listing_picture=listing_picture_url,
            session_leader_name=session_leader_name,
            session_leader_position=session_leader_position,
            session_leader_company=session_leader_company,
            session_leader_headshot=session_leader_headshot,
            session_leader_linkedin=session_leader_linkedin,
            lead_moderator_name=lead_moderator_name,
            type_of_event=_first_str(fields.get("Type of Event")),
            audience_network=_first_str(fields.get("Audience (Network)")),
            series=_first_str(fields.get("Series")) or fields.get("Series Code Text") or None,
            series_code=_first_str(fields.get("Series Code Text")) or _first_str(fields.get("Series Code")),
            clean_event_code=_first_str(fields.get("Clean Event Code")) or _first_str(fields.get("New Event Code")),
            registration_closed=bool(fields.get("Registration Closed")),
            fully_booked=bool(fields.get("Fully Booked")),
            registration_url=final_registration_url,
            default_signup_url_members=default_signup_members,
            default_signup_url_non_members=default_signup_non_members,
            more_details_url=more_details_url,
            append_to_magic_link=append_to_magic_link or None,
        )
        return detail
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching event {record_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch event: {str(e)}")

# ---------- Event signup form submission ----------

class EventSignupSubmit(BaseModel):
    """Generic signup payload. `form_key` selects the destination config.

    All specific field values live in `fields` as key -> value pairs.
    The keys must match those defined in FORM_CONFIGS[form_key]['field_map'].
    """
    form_key: str
    event_record_id: Optional[str] = None
    series_code: Optional[str] = None
    clean_event_code: Optional[str] = None
    fields: dict = {}
    website: Optional[str] = ""  # Honeypot

def _write_signup_to_airtable(config: dict, air_fields: dict) -> str:
    """POST a record to Airtable. Returns the created record id."""
    url = f"https://api.airtable.com/v0/{config['base_id']}/{config['table_id']}"
    headers = {
        "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    body = {"fields": air_fields, "typecast": True}
    resp = requests.post(url, headers=headers, json=body, timeout=20)
    if resp.status_code >= 400:
        logger.error(f"Airtable signup write failed [{resp.status_code}]: {resp.text}")
        raise HTTPException(status_code=502, detail=f"Failed to save submission: {resp.text}")
    return resp.json().get("id", "")

@api_router.post("/events/signup")
async def submit_event_signup(payload: EventSignupSubmit):
    """Submit an event sign-up. Dispatches to the right destination based on form_key."""
    # Honeypot — bots typically fill every field
    if payload.website and payload.website.strip():
        logger.warning(f"Blocked honeypot signup for form_key={payload.form_key}")
        return {"status": "success", "message": "Signup received"}

    # Optional email blocklist reuse (checks any field that looks like an email)
    for v in payload.fields.values():
        if isinstance(v, str) and "@" in v and is_email_blocked(v):
            logger.warning(f"Blocked spam signup email={v} form_key={payload.form_key}")
            return {"status": "success", "message": "Signup received"}

    config = FORM_CONFIGS.get(payload.form_key)
    if not config:
        raise HTTPException(status_code=400, detail=f"Unknown form_key: {payload.form_key}")

    # Per-form server-side validation (defense in depth; frontend also validates).
    if payload.form_key in ("csc-form", "gcf-form", "lsceof-form", "gcx-form", "rmx-form", "lsceox-form", "nggc-nomination-form"):
        phone_field_key = "participant_phone" if payload.form_key == "nggc-nomination-form" else "phone"
        phone = str(payload.fields.get(phone_field_key) or "").strip()
        # Frontend sends E.164 (e.g. '+15551234567'). Require '+' + 8-15 digits.
        digits = "".join(ch for ch in phone if ch.isdigit())
        if not phone.startswith("+") or not (8 <= len(digits) <= 15):
            raise HTTPException(status_code=400, detail="Invalid phone number.")

    # Build Airtable field payload from the incoming generic fields
    field_map = config.get("field_map", {})
    air_fields: dict = {}
    for payload_key, air_field_name in field_map.items():
        val = payload.fields.get(payload_key)
        if val is None or val == "":
            continue
        air_fields[air_field_name] = val

    # Fixed fields (constants written on every submission)
    for k, v in (config.get("fixed_fields") or {}).items():
        air_fields[k] = v

    # Link to the event's Airtable record via a linked-record field
    link_field = config.get("event_link_field")
    if link_field and payload.event_record_id:
        air_fields[link_field] = [payload.event_record_id]

    adapter = config.get("adapter")
    if adapter == "airtable":
        record_id = _write_signup_to_airtable(config, air_fields)
        logger.info(f"Signup saved [{payload.form_key}] record={record_id} event={payload.event_record_id}")
        return {"status": "success", "message": "Signup received", "record_id": record_id}

    if adapter == "google_sheets":
        # For sheets we skip fixed_fields/event_link logic — build column-based map instead.
        values_by_col = {}
        for payload_key, col_name in config.get("field_map", {}).items():
            v = payload.fields.get(payload_key)
            if v is None or v == "":
                continue
            values_by_col[col_name] = v
        row_id = _write_signup_to_google_sheet(config, values_by_col)
        logger.info(f"Signup saved [{payload.form_key}] {row_id} event={payload.event_record_id}")
        return {"status": "success", "message": "Signup received", "record_id": row_id}

    raise HTTPException(status_code=500, detail=f"Adapter '{adapter}' not implemented")

@api_router.get("/events/signup/form-key/{series_code}")
async def get_signup_form_key(series_code: str):
    """Return the form_key mapped to a given series_code, or null if unmapped."""
    return {"form_key": SERIES_TO_FORM.get(series_code)}
# ---------------------------------------------------

@api_router.get("/team", response_model=List[AirtableTeamMember])
async def get_team_members():
    """Get team members from Airtable"""
    try:
        team_members = await fetch_airtable_team()
        logger.info(f"Successfully fetched {len(team_members)} team members from Airtable")
        return team_members
    except Exception as e:
        logger.error(f"Error in get_team_members: {str(e)}")
        return []

# Membership Application Models
class MembershipApplicationSubmit(BaseModel):
    full_name: str
    work_email: str
    personal_email: Optional[str] = None
    phone_number: str
    company_name: str
    job_title: str
    country: str
    network_interest: list  # Changed to list for multiple selections
    recommended_by: Optional[str] = None
    further_details: Optional[str] = None
    source_of_inquiry: Optional[str] = "Main website"
    website: Optional[str] = ""  # Honeypot: must be empty; bots typically fill all inputs

class ContactFormSubmit(BaseModel):
    fullName: str
    email: str
    company: Optional[str] = None
    interestArea: Optional[str] = None
    message: str
    source: str
    website: Optional[str] = ""  # Honeypot: must be empty; bots typically fill all inputs

# ---------- Anti-spam: email blocklist with Gmail-style normalization ----------
# Add spammer emails here (any format). Gmail dot/plus variations are auto-normalized.
BLOCKED_EMAILS_RAW = [
    "axubi.xaro.8.7.6@gmail.com",
]

def _normalize_email(email: str) -> str:
    """Normalize email for blocklist comparison.

    - Lowercases.
    - For gmail/googlemail: strips dots from the local part and drops '+alias' suffix
      (Gmail treats these as the same address).
    """
    if not email or "@" not in email:
        return (email or "").strip().lower()
    local, _, domain = email.strip().lower().rpartition("@")
    if domain in ("gmail.com", "googlemail.com"):
        local = local.split("+", 1)[0].replace(".", "")
        domain = "gmail.com"
    return f"{local}@{domain}"

BLOCKED_EMAILS = {_normalize_email(e) for e in BLOCKED_EMAILS_RAW}

def is_email_blocked(email: str) -> bool:
    return _normalize_email(email) in BLOCKED_EMAILS
# ------------------------------------------------------------------------------

@api_router.post("/contact/submit")
async def submit_contact_form(form_data: ContactFormSubmit):
    """Send contact form submission via email using Resend"""
    # Honeypot: real users can't see or fill the 'website' field. If it's non-empty, it's a bot.
    if form_data.website and form_data.website.strip():
        logger.warning(f"Blocked honeypot submission from {form_data.email} (source={form_data.source})")
        return {"status": "success", "message": "Contact form submitted successfully"}
    # Silently drop spam submissions from blocked emails (return generic success
    # so bots can't tell they've been filtered).
    if is_email_blocked(form_data.email):
        logger.warning(f"Blocked spam submission from {form_data.email} (source={form_data.source})")
        return {"status": "success", "message": "Contact form submitted successfully"}
    try:
        # Configure Resend API
        resend.api_key = os.environ.get('RESEND_API_KEY')
        
        # Email body
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #045184;">New Contact Form Submission</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{form_data.fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{form_data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{form_data.company or 'Not provided'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Interest Area:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{form_data.interestArea or 'Not provided'}</td>
                </tr>
            </table>
            <h3 style="color: #045184; margin-top: 20px;">Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #045184;">{form_data.message}</p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">
                <strong>Source:</strong> {form_data.source}<br>
                <strong>Timestamp:</strong> {datetime.utcnow().isoformat()}
            </p>
        </body>
        </html>
        """
        
        # Send email via Resend (using onboarding domain)
        params = {
            "from": "The Vanguard Network <onboarding@resend.dev>",
            "to": ["rrafila@vanguardgroup.nyc"],
            "subject": f"New Contact Form Submission - {form_data.source}",
            "html": html_body,
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Contact form email sent successfully via Resend: {email}")
        
        return {
            "status": "success",
            "message": "Contact form submitted successfully"
        }
        
    except Exception as e:
        logger.error(f"Error sending contact form via Resend: {str(e)}")
        # Still return success to user
        return {
            "status": "success",
            "message": "Contact form submitted successfully"
        }

@api_router.post("/membership/application")
async def submit_membership_application(application: MembershipApplicationSubmit):
    """Submit a new membership application to Airtable"""
    # Honeypot: real users can't see or fill the 'website' field. If it's non-empty, it's a bot.
    if application.website and application.website.strip():
        logger.warning(f"Blocked honeypot submission from {application.work_email} (membership)")
        return {"status": "success", "message": "Application submitted successfully", "record_id": None}
    # Silently drop spam submissions from blocked emails.
    if is_email_blocked(application.work_email) or (application.personal_email and is_email_blocked(application.personal_email)):
        logger.warning(f"Blocked spam submission from {application.work_email} (membership)")
        return {"status": "success", "message": "Application submitted successfully", "record_id": None}
    try:
        membership_base_id = os.environ.get('MEMBERSHIP_BASE_ID', 'appqyKMZnFfgSuJKt')
        membership_table_name = "Membership Contact Inquiry Form (Softr)"
        
        if not membership_base_id:
            raise HTTPException(
                status_code=500,
                detail="Membership Airtable configuration is missing"
            )
        
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # Map form fields to Airtable field names for 'Membership Contact Inquiry Form (Softr)' table
        fields_dict = {
            "Name": application.full_name,
            "Email (Work)": application.work_email,
            "Phone Number": application.phone_number,
            "Company": application.company_name,
            "Job Title": application.job_title,
            "Country": application.country,
            "Source of Inquiry": application.source_of_inquiry,
        }

        if application.personal_email:
            fields_dict["Email (Personal)"] = application.personal_email

        if application.recommended_by:
            fields_dict["Recommended By"] = application.recommended_by

        if application.further_details:
            fields_dict["Message"] = application.further_details

        if application.network_interest:
            fields_dict["Networks Interested In"] = application.network_interest

        airtable_data = {
            "records": [{"fields": fields_dict}],
            "typecast": True
        }
        
        url = f"https://api.airtable.com/v0/{membership_base_id}/{membership_table_name}"
        
        response = requests.post(url, json=airtable_data, headers=headers, timeout=10)
        response.raise_for_status()
        
        result = response.json()
        record_id = result["records"][0]["id"]
        
        logger.info(f"Successfully created membership application record: {record_id}")
        
        return {
            "status": "success",
            "message": "Membership application submitted successfully",
            "record_id": record_id
        }
        
    except requests.exceptions.HTTPError as e:
        logger.error(f"Airtable API error: {e.response.text}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit application: {e.response.text}"
        )
    except Exception as e:
        logger.error(f"Error submitting membership application: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit application: {str(e)}"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to add no-cache headers for Airtable content endpoints
# This ensures fresh Airtable attachment URLs are always fetched
from starlette.middleware.base import BaseHTTPMiddleware

class NoCacheMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        # Add no-cache headers for endpoints that return Airtable data with attachment URLs
        airtable_endpoints = [
            '/api/articles', '/api/article/',
            '/api/podcasts', '/api/podcast/',
            '/api/videos', '/api/video/',
            '/api/newsroom', '/api/newsroom/',
            '/api/events', '/api/team',
            '/api/gc-members', '/api/in-the-press'
        ]
        if any(request.url.path.startswith(ep) for ep in airtable_endpoints):
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        return response

app.add_middleware(NoCacheMiddleware)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
