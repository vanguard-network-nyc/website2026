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
import httpx


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
    listing_picture: Optional[str] = None
    registration_url: Optional[str] = None
    default_signup_url: Optional[str] = None
    more_details_url: Optional[str] = None
    speaker: Optional[str] = None
    session_leader_name: Optional[str] = None
    lead_moderator_name: Optional[str] = None
    location: Optional[str] = None
    audience_network: Optional[str] = None

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
        
        # First try to fetch from the specific newsroom view
        url = f"https://api.airtable.com/v0/{NEWSROOM_BASE_ID}/{NEWSROOM_TABLE_ID}"
        params = {
            'view': NEWSROOM_VIEW_ID,
            'maxRecords': 100
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            logging.warning(f"Error fetching newsroom from view {NEWSROOM_VIEW_ID}: {response.status_code}")
            # Fall back to fetching all records without sorting
            params = {
                'maxRecords': 100
            }
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers, params=params)
        
        response.raise_for_status()
        data = response.json()
        newsroom_articles = []
        
        for record in data.get("records", []):
            fields = record.get("fields", {})
            
            # Extract fields
            blog_title = fields.get("Blog Title", "")
            description_teaser = fields.get("Description (teaser)", "")
            social_image_raw = fields.get("Social:Image", [])
            photo_raw = fields.get("Photo", [])
            newsroom_detail_image_raw = fields.get("Newsroom (Rectangular Image for details page)", [])
            body_of_blog = fields.get("Body of Blog", "")
            publish_by = fields.get("Publish By", "")  # Capital B
            featured_speakers_raw = fields.get("Featured Speakers", [])
            type_of_news_raw = fields.get("Type of News", [])
            
            # Handle featured speakers - can be a list or string
            featured_speakers = ""
            if featured_speakers_raw:
                if isinstance(featured_speakers_raw, list):
                    featured_speakers = ", ".join(featured_speakers_raw)
                else:
                    featured_speakers = str(featured_speakers_raw)
            
            # Handle type of news - can be a list or string
            type_of_news = ""
            if type_of_news_raw:
                if isinstance(type_of_news_raw, list):
                    type_of_news = ", ".join(type_of_news_raw)
                else:
                    type_of_news = str(type_of_news_raw)
            
            # Handle listing image - prioritize Social:Image, fallback to Photo
            photo_url = None
            
            # Try Social:Image first (note: single colon, not double)
            if social_image_raw and isinstance(social_image_raw, list) and len(social_image_raw) > 0:
                photo_url = social_image_raw[0].get("url", "")
            
            # Fallback to Photo field if Social:Image is not available
            elif photo_raw and isinstance(photo_raw, list) and len(photo_raw) > 0:
                photo_url = photo_raw[0].get("url", "")
            
            # Handle detail page rectangular image
            newsroom_detail_image = None
            if newsroom_detail_image_raw and isinstance(newsroom_detail_image_raw, list) and len(newsroom_detail_image_raw) > 0:
                newsroom_detail_image = newsroom_detail_image_raw[0].get("url", "")
            
            # Only include articles that have substantial content
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

async def fetch_airtable_events():
    """Fetch events from Airtable"""
    try:
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        url = f"https://api.airtable.com/v0/{EVENTS_BASE_ID}/{EVENTS_TABLE_ID}"
        params = {
            "view": EVENTS_VIEW_ID,
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
                session_leader_name=final_leader_name,  # Use the combined logic
                lead_moderator_name=lead_moderator_name,
                location=location,
                audience_network=audience_network
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
        raise HTTPException(status_code=500, detail="Failed to fetch similar podcasts")

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
        raise HTTPException(status_code=500, detail="Failed to fetch similar videos")

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
    source_of_inquiry: Optional[str] = "Website sign up"

@api_router.post("/membership/application")
async def submit_membership_application(application: MembershipApplicationSubmit):
    """Submit a new membership application to Airtable"""
    try:
        membership_base_id = os.environ.get('MEMBERSHIP_BASE_ID')
        membership_table_name = os.environ.get('MEMBERSHIP_TABLE_NAME')
        
        if not membership_base_id or not membership_table_name:
            raise HTTPException(
                status_code=500,
                detail="Membership Airtable configuration is missing"
            )
        
        headers = {
            "Authorization": f"Bearer {AIRTABLE_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # Map form fields to Airtable field names
        # Note: If a field causes "INVALID_VALUE_FOR_COLUMN" error, it might be a linked record
        # or multiple select field in Airtable. In that case, we store it as text in a compatible field.
        fields_dict = {
            "Name": application.full_name,
            "Work Email": application.work_email,
            "Phone Number": application.phone_number,
            "Company": application.company_name,
            "Position": application.job_title,
            "Country": application.country,
            "Source of Inquiry": application.source_of_inquiry  # Hidden field from form
        }
        
        # Add optional fields only if they have values
        if application.personal_email:
            fields_dict["Personal Email"] = application.personal_email
            
        if application.recommended_by:
            fields_dict["Recommended By"] = application.recommended_by
        
        # Try to add Network field - convert array to comma-separated string
        # Multiple selections are joined together
        if application.network_interest:
            fields_dict["Network"] = ", ".join(application.network_interest)
        
        airtable_data = {
            "records": [
                {
                    "fields": fields_dict
                }
            ],
            "typecast": True  # Let Airtable try to convert values to appropriate types
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
