#!/usr/bin/env python3
"""
Backend API Testing for The Vanguard Network
Tests all backend endpoints for production readiness
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from environment
BACKEND_URL = "https://vanguard-podcasts.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = self.session.get(f"{self.backend_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Root Endpoint", True, "Returns correct Hello World message", data)
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}", data)
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Root Endpoint", False, f"Invalid JSON response: {str(e)}")
    
    def test_post_status_endpoint(self):
        """Test POST /api/status endpoint"""
        test_data = {
            "client_name": "Vanguard Test Client"
        }
        
        try:
            response = self.session.post(
                f"{self.backend_url}/status",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_fields = ["id", "client_name", "timestamp"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("POST Status", False, f"Missing fields: {missing_fields}", data)
                elif data["client_name"] != test_data["client_name"]:
                    self.log_test("POST Status", False, f"Client name mismatch: expected {test_data['client_name']}, got {data['client_name']}", data)
                else:
                    # Validate UUID format
                    try:
                        uuid.UUID(data["id"])
                        # Validate timestamp format
                        datetime.fromisoformat(data["timestamp"].replace('Z', '+00:00'))
                        self.log_test("POST Status", True, "Status check created successfully", data)
                        return data  # Return for use in GET test
                    except ValueError as e:
                        self.log_test("POST Status", False, f"Invalid UUID or timestamp format: {str(e)}", data)
            else:
                self.log_test("POST Status", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("POST Status", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("POST Status", False, f"Invalid JSON response: {str(e)}")
        
        return None
    
    def test_get_status_endpoint(self):
        """Test GET /api/status endpoint"""
        try:
            response = self.session.get(f"{self.backend_url}/status")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("GET Status", True, f"Retrieved {len(data)} status checks", {"count": len(data)})
                    
                    # If there are items, validate structure
                    if data:
                        first_item = data[0]
                        required_fields = ["id", "client_name", "timestamp"]
                        missing_fields = [field for field in required_fields if field not in first_item]
                        
                        if missing_fields:
                            self.log_test("GET Status Structure", False, f"Missing fields in response: {missing_fields}", first_item)
                        else:
                            self.log_test("GET Status Structure", True, "Response structure is valid", first_item)
                    
                else:
                    self.log_test("GET Status", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("GET Status", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("GET Status", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("GET Status", False, f"Invalid JSON response: {str(e)}")
    
    def test_cors_configuration(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            response = self.session.options(
                f"{self.backend_url}/status",
                headers={
                    "Origin": "https://example.com",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type"
                }
            )
            
            cors_headers = {
                "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
                "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
                "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers")
            }
            
            if cors_headers["Access-Control-Allow-Origin"] == "*":
                self.log_test("CORS Configuration", True, "CORS properly configured for all origins", cors_headers)
            else:
                self.log_test("CORS Configuration", False, "CORS not properly configured", cors_headers)
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"Connection error: {str(e)}")
    
    def test_mongodb_connection(self):
        """Test MongoDB connection by creating and retrieving data"""
        # Create a test status check
        test_client_name = f"MongoDB Test {datetime.now().isoformat()}"
        created_status = None
        
        try:
            # Create status check
            response = self.session.post(
                f"{self.backend_url}/status",
                json={"client_name": test_client_name},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                created_status = response.json()
                
                # Retrieve all status checks
                get_response = self.session.get(f"{self.backend_url}/status")
                
                if get_response.status_code == 200:
                    all_statuses = get_response.json()
                    
                    # Check if our created status is in the list
                    found = any(status["id"] == created_status["id"] for status in all_statuses)
                    
                    if found:
                        self.log_test("MongoDB Connection", True, "Data persistence working correctly", {"created_id": created_status["id"]})
                    else:
                        self.log_test("MongoDB Connection", False, "Created data not found in retrieval", {"created_id": created_status["id"]})
                else:
                    self.log_test("MongoDB Connection", False, f"Failed to retrieve data: HTTP {get_response.status_code}")
            else:
                self.log_test("MongoDB Connection", False, f"Failed to create data: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("MongoDB Connection", False, f"Connection error: {str(e)}")
    
    def test_airtable_events_endpoint(self):
        """Test GET /api/events endpoint (Airtable integration)"""
        try:
            response = self.session.get(f"{self.backend_url}/events", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Airtable Events", True, f"Retrieved {len(data)} events from Airtable", {"count": len(data)})
                    
                    # If there are events, validate structure
                    if data:
                        first_event = data[0]
                        required_fields = ["id", "event_title", "registration_url"]
                        missing_fields = [field for field in required_fields if field not in first_event]
                        
                        if missing_fields:
                            self.log_test("Airtable Events Structure", False, f"Missing fields in event: {missing_fields}", first_event)
                        else:
                            # Check if event has proper data
                            if first_event.get("event_title") and first_event.get("registration_url"):
                                self.log_test("Airtable Events Structure", True, "Event structure is valid with proper data", {
                                    "sample_title": first_event.get("event_title")[:50] + "..." if len(first_event.get("event_title", "")) > 50 else first_event.get("event_title"),
                                    "has_registration_url": bool(first_event.get("registration_url"))
                                })
                            else:
                                self.log_test("Airtable Events Structure", False, "Event missing essential data", first_event)
                    else:
                        self.log_test("Airtable Events", True, "No events returned (empty list is valid)", {"count": 0})
                        
                else:
                    self.log_test("Airtable Events", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Airtable Events", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Airtable Events", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Airtable Events", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Airtable Events", False, f"Invalid JSON response: {str(e)}")

    def test_airtable_podcasts_endpoint(self):
        """Test GET /api/podcasts endpoint (Airtable integration)"""
        try:
            response = self.session.get(f"{self.backend_url}/podcasts", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Airtable Podcasts", True, f"Retrieved {len(data)} podcasts from Airtable", {"count": len(data)})
                    
                    # If there are podcasts, validate structure
                    if data:
                        first_podcast = data[0]
                        required_fields = ["id", "title"]
                        optional_fields = ["thumbnail", "featured_speaker"]
                        
                        missing_required = [field for field in required_fields if field not in first_podcast]
                        
                        if missing_required:
                            self.log_test("Airtable Podcasts Structure", False, f"Missing required fields in podcast: {missing_required}", first_podcast)
                        else:
                            # Check if podcast has proper data
                            if first_podcast.get("title"):
                                # Validate optional fields are present (even if None/empty)
                                has_optional_fields = all(field in first_podcast for field in optional_fields)
                                
                                self.log_test("Airtable Podcasts Structure", True, "Podcast structure is valid with proper data", {
                                    "sample_title": first_podcast.get("title")[:50] + "..." if len(first_podcast.get("title", "")) > 50 else first_podcast.get("title"),
                                    "has_thumbnail": bool(first_podcast.get("thumbnail")),
                                    "has_featured_speaker": bool(first_podcast.get("featured_speaker")),
                                    "all_fields_present": has_optional_fields
                                })
                            else:
                                self.log_test("Airtable Podcasts Structure", False, "Podcast missing title data", first_podcast)
                    else:
                        self.log_test("Airtable Podcasts", True, "No podcasts returned (empty list is valid)", {"count": 0})
                        
                else:
                    self.log_test("Airtable Podcasts", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Airtable Podcasts", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Airtable Podcasts", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Airtable Podcasts", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Airtable Podcasts", False, f"Invalid JSON response: {str(e)}")

    def test_airtable_videos_endpoint(self):
        """Test GET /api/videos endpoint (NEW - Airtable integration)"""
        try:
            response = self.session.get(f"{self.backend_url}/videos", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Airtable Videos", True, f"Retrieved {len(data)} videos from Airtable", {"count": len(data)})
                    
                    # If there are videos, validate structure
                    if data:
                        first_video = data[0]
                        required_fields = ["id", "video_description"]
                        expected_fields = ["featured_speakers", "headshot", "category", "tags", "keywords", "vimeo_embedder"]
                        
                        missing_required = [field for field in required_fields if field not in first_video]
                        
                        if missing_required:
                            self.log_test("Airtable Videos Structure", False, f"Missing required fields in video: {missing_required}", first_video)
                        else:
                            # Check if video has proper data structure
                            if first_video.get("video_description"):
                                # Validate expected fields are present (even if None/empty)
                                has_expected_fields = all(field in first_video for field in expected_fields)
                                
                                self.log_test("Airtable Videos Structure", True, "Video structure is valid with proper data", {
                                    "sample_description": first_video.get("video_description")[:50] + "..." if len(first_video.get("video_description", "")) > 50 else first_video.get("video_description"),
                                    "has_featured_speakers": bool(first_video.get("featured_speakers")),
                                    "has_headshot": bool(first_video.get("headshot")),
                                    "has_category": bool(first_video.get("category")),
                                    "has_vimeo_embedder": bool(first_video.get("vimeo_embedder")),
                                    "all_fields_present": has_expected_fields
                                })
                            else:
                                self.log_test("Airtable Videos Structure", False, "Video missing description data", first_video)
                    else:
                        self.log_test("Airtable Videos", True, "No videos returned (empty list is valid)", {"count": 0})
                        
                else:
                    self.log_test("Airtable Videos", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Airtable Videos", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Airtable Videos", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Airtable Videos", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Airtable Videos", False, f"Invalid JSON response: {str(e)}")

    def test_single_video_endpoint(self):
        """Test GET /api/video/{video_id} endpoint (NEW)"""
        try:
            # First get all videos to get a valid video ID
            videos_response = self.session.get(f"{self.backend_url}/videos", timeout=15)
            
            if videos_response.status_code == 200:
                videos_data = videos_response.json()
                
                if isinstance(videos_data, list) and len(videos_data) > 0:
                    # Use the first video's ID
                    test_video_id = videos_data[0]["id"]
                    
                    # Test single video endpoint
                    response = self.session.get(f"{self.backend_url}/video/{test_video_id}", timeout=15)
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        # Validate it's a single video object
                        if isinstance(data, dict) and data.get("id") == test_video_id:
                            required_fields = ["id", "video_description"]
                            missing_fields = [field for field in required_fields if field not in data]
                            
                            if missing_fields:
                                self.log_test("Single Video Endpoint", False, f"Missing fields: {missing_fields}", data)
                            else:
                                self.log_test("Single Video Endpoint", True, f"Successfully retrieved video: {data.get('video_description', '')[:50]}...", {
                                    "video_id": test_video_id,
                                    "has_description": bool(data.get("video_description"))
                                })
                        else:
                            self.log_test("Single Video Endpoint", False, f"Invalid response structure or ID mismatch", data)
                    elif response.status_code == 404:
                        self.log_test("Single Video Endpoint", False, f"Video not found (404) for ID: {test_video_id}", response.text)
                    else:
                        self.log_test("Single Video Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                else:
                    self.log_test("Single Video Endpoint", False, "No videos available to test single video endpoint", {"videos_count": len(videos_data) if isinstance(videos_data, list) else 0})
            else:
                self.log_test("Single Video Endpoint", False, f"Cannot test single video - videos list failed: HTTP {videos_response.status_code}", videos_response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Single Video Endpoint", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Single Video Endpoint", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Single Video Endpoint", False, f"Invalid JSON response: {str(e)}")

    def test_similar_videos_endpoint(self):
        """Test GET /api/videos/similar/{video_id} endpoint (NEW)"""
        try:
            # First get all videos to get a valid video ID
            videos_response = self.session.get(f"{self.backend_url}/videos", timeout=15)
            
            if videos_response.status_code == 200:
                videos_data = videos_response.json()
                
                if isinstance(videos_data, list) and len(videos_data) > 0:
                    # Use the first video's ID
                    test_video_id = videos_data[0]["id"]
                    
                    # Test similar videos endpoint
                    response = self.session.get(f"{self.backend_url}/videos/similar/{test_video_id}", timeout=15)
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        # Validate it's a list of videos
                        if isinstance(data, list):
                            self.log_test("Similar Videos Endpoint", True, f"Retrieved {len(data)} similar videos", {
                                "similar_count": len(data),
                                "test_video_id": test_video_id
                            })
                            
                            # If there are similar videos, validate structure
                            if data:
                                first_similar = data[0]
                                required_fields = ["id", "video_description"]
                                missing_fields = [field for field in required_fields if field not in first_similar]
                                
                                if missing_fields:
                                    self.log_test("Similar Videos Structure", False, f"Missing fields in similar video: {missing_fields}", first_similar)
                                else:
                                    # Ensure it's not the same video
                                    if first_similar.get("id") != test_video_id:
                                        self.log_test("Similar Videos Structure", True, "Similar videos structure is valid", {
                                            "sample_description": first_similar.get("video_description", "")[:50] + "..." if len(first_similar.get("video_description", "")) > 50 else first_similar.get("video_description"),
                                            "different_from_original": True
                                        })
                                    else:
                                        self.log_test("Similar Videos Structure", False, "Similar video includes the original video", first_similar)
                        else:
                            self.log_test("Similar Videos Endpoint", False, f"Expected list, got {type(data)}", data)
                    else:
                        self.log_test("Similar Videos Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                else:
                    self.log_test("Similar Videos Endpoint", False, "No videos available to test similar videos endpoint", {"videos_count": len(videos_data) if isinstance(videos_data, list) else 0})
            else:
                self.log_test("Similar Videos Endpoint", False, f"Cannot test similar videos - videos list failed: HTTP {videos_response.status_code}", videos_response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Similar Videos Endpoint", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Similar Videos Endpoint", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Similar Videos Endpoint", False, f"Invalid JSON response: {str(e)}")

    def test_airtable_articles_endpoint(self):
        """Test GET /api/articles endpoint (NEW - Airtable integration)"""
        try:
            response = self.session.get(f"{self.backend_url}/articles", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Airtable Articles", True, f"Retrieved {len(data)} articles from Airtable", {"count": len(data)})
                    
                    # If there are articles, validate structure
                    if data:
                        first_article = data[0]
                        required_fields = ["id", "blog_title"]
                        expected_fields = ["description_teaser", "photo", "featured_speaker_linkedin", "body_qa", "tags", "published_to_web", "type_content"]
                        
                        missing_required = [field for field in required_fields if field not in first_article]
                        
                        if missing_required:
                            self.log_test("Airtable Articles Structure", False, f"Missing required fields in article: {missing_required}", first_article)
                        else:
                            # Check if article has proper data structure
                            if first_article.get("blog_title"):
                                # Validate expected fields are present (even if None/empty)
                                has_expected_fields = all(field in first_article for field in expected_fields)
                                
                                self.log_test("Airtable Articles Structure", True, "Article structure is valid with proper data", {
                                    "sample_title": first_article.get("blog_title")[:50] + "..." if len(first_article.get("blog_title", "")) > 50 else first_article.get("blog_title"),
                                    "has_description": bool(first_article.get("description_teaser")),
                                    "has_photo": bool(first_article.get("photo")),
                                    "has_featured_speaker": bool(first_article.get("featured_speaker_linkedin")),
                                    "has_published_date": bool(first_article.get("published_to_web")),
                                    "all_fields_present": has_expected_fields
                                })
                            else:
                                self.log_test("Airtable Articles Structure", False, "Article missing title data", first_article)
                    else:
                        self.log_test("Airtable Articles", True, "No articles returned (empty list is valid)", {"count": 0})
                        
                else:
                    self.log_test("Airtable Articles", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Airtable Articles", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Airtable Articles", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Airtable Articles", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Airtable Articles", False, f"Invalid JSON response: {str(e)}")

    def test_single_article_endpoint(self):
        """Test GET /api/article/{article_id} endpoint (NEW)"""
        try:
            # First get all articles to get a valid article ID
            articles_response = self.session.get(f"{self.backend_url}/articles", timeout=15)
            
            if articles_response.status_code == 200:
                articles_data = articles_response.json()
                
                if isinstance(articles_data, list) and len(articles_data) > 0:
                    # Use the first article's ID
                    test_article_id = articles_data[0]["id"]
                    
                    # Test single article endpoint
                    response = self.session.get(f"{self.backend_url}/article/{test_article_id}", timeout=15)
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        # Validate it's a single article object
                        if isinstance(data, dict) and data.get("id") == test_article_id:
                            required_fields = ["id", "blog_title"]
                            missing_fields = [field for field in required_fields if field not in data]
                            
                            if missing_fields:
                                self.log_test("Single Article Endpoint", False, f"Missing fields: {missing_fields}", data)
                            else:
                                self.log_test("Single Article Endpoint", True, f"Successfully retrieved article: {data.get('blog_title', '')[:50]}...", {
                                    "article_id": test_article_id,
                                    "has_title": bool(data.get("blog_title"))
                                })
                        else:
                            self.log_test("Single Article Endpoint", False, f"Invalid response structure or ID mismatch", data)
                    elif response.status_code == 404:
                        self.log_test("Single Article Endpoint", False, f"Article not found (404) for ID: {test_article_id}", response.text)
                    else:
                        self.log_test("Single Article Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                else:
                    self.log_test("Single Article Endpoint", False, "No articles available to test single article endpoint", {"articles_count": len(articles_data) if isinstance(articles_data, list) else 0})
            else:
                self.log_test("Single Article Endpoint", False, f"Cannot test single article - articles list failed: HTTP {articles_response.status_code}", articles_response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Single Article Endpoint", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Single Article Endpoint", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Single Article Endpoint", False, f"Invalid JSON response: {str(e)}")

    def test_single_podcast_endpoint(self):
        """Test GET /api/podcast/{podcast_id} endpoint (EXISTING - verify still works)"""
        try:
            # First get all podcasts to get a valid podcast ID
            podcasts_response = self.session.get(f"{self.backend_url}/podcasts", timeout=15)
            
            if podcasts_response.status_code == 200:
                podcasts_data = podcasts_response.json()
                
                if isinstance(podcasts_data, list) and len(podcasts_data) > 0:
                    # Use the first podcast's ID
                    test_podcast_id = podcasts_data[0]["id"]
                    
                    # Test single podcast endpoint
                    response = self.session.get(f"{self.backend_url}/podcast/{test_podcast_id}", timeout=15)
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        # Validate it's a single podcast object
                        if isinstance(data, dict) and data.get("id") == test_podcast_id:
                            required_fields = ["id", "title"]
                            missing_fields = [field for field in required_fields if field not in data]
                            
                            if missing_fields:
                                self.log_test("Single Podcast Endpoint", False, f"Missing fields: {missing_fields}", data)
                            else:
                                self.log_test("Single Podcast Endpoint", True, f"Successfully retrieved podcast: {data.get('title', '')[:50]}...", {
                                    "podcast_id": test_podcast_id,
                                    "has_title": bool(data.get("title"))
                                })
                        else:
                            self.log_test("Single Podcast Endpoint", False, f"Invalid response structure or ID mismatch", data)
                    elif response.status_code == 404:
                        self.log_test("Single Podcast Endpoint", False, f"Podcast not found (404) for ID: {test_podcast_id}", response.text)
                    else:
                        self.log_test("Single Podcast Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                else:
                    self.log_test("Single Podcast Endpoint", False, "No podcasts available to test single podcast endpoint", {"podcasts_count": len(podcasts_data) if isinstance(podcasts_data, list) else 0})
            else:
                self.log_test("Single Podcast Endpoint", False, f"Cannot test single podcast - podcasts list failed: HTTP {podcasts_response.status_code}", podcasts_response.text)
                
        except requests.exceptions.Timeout:
            self.log_test("Single Podcast Endpoint", False, "Request timed out (Airtable may be slow)")
        except requests.exceptions.RequestException as e:
            self.log_test("Single Podcast Endpoint", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Single Podcast Endpoint", False, f"Invalid JSON response: {str(e)}")

    def test_json_responses(self):
        """Test that all endpoints return proper JSON responses"""
        endpoints = [
            ("GET", "/"),
            ("GET", "/status"),
            ("GET", "/events"),
            ("GET", "/podcasts"),
            ("GET", "/videos"),
            ("GET", "/articles"),
            ("GET", "/in-the-press"),
        ]
        
        for method, endpoint in endpoints:
            try:
                if method == "GET":
                    response = self.session.get(f"{self.backend_url}{endpoint}")
                
                content_type = response.headers.get("content-type", "")
                
                if "application/json" in content_type:
                    try:
                        response.json()  # Try to parse JSON
                        self.log_test(f"JSON Response {method} {endpoint}", True, "Valid JSON response", {"content_type": content_type})
                    except json.JSONDecodeError:
                        self.log_test(f"JSON Response {method} {endpoint}", False, "Invalid JSON in response", {"content_type": content_type})
                else:
                    self.log_test(f"JSON Response {method} {endpoint}", False, f"Non-JSON content type: {content_type}", {"content_type": content_type})
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"JSON Response {method} {endpoint}", False, f"Connection error: {str(e)}")
    
    def test_backend_accessibility(self):
        """Test that backend is accessible via REACT_APP_BACKEND_URL"""
        try:
            response = self.session.get(f"{self.backend_url}/", timeout=10)
            
            if response.status_code == 200:
                self.log_test("Backend Accessibility", True, f"Backend accessible at {self.backend_url}", {"status_code": response.status_code})
            else:
                self.log_test("Backend Accessibility", False, f"Backend not accessible: HTTP {response.status_code}", {"status_code": response.status_code})
                
        except requests.exceptions.Timeout:
            self.log_test("Backend Accessibility", False, "Backend request timed out")
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Accessibility", False, f"Connection error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for The Vanguard Network")
        print(f"📍 Backend URL: {self.backend_url}")
        print("=" * 60)
        
        # Test backend accessibility first
        self.test_backend_accessibility()
        
        # Test core endpoints
        self.test_root_endpoint()
        self.test_post_status_endpoint()
        self.test_get_status_endpoint()
        
        # Test system features
        self.test_cors_configuration()
        self.test_mongodb_connection()
        
        # Test existing Airtable integrations
        self.test_airtable_events_endpoint()
        self.test_airtable_podcasts_endpoint()
        self.test_single_podcast_endpoint()
        
        # Test NEW video endpoints
        self.test_airtable_videos_endpoint()
        self.test_single_video_endpoint()
        self.test_similar_videos_endpoint()
        
        # Test NEW articles endpoints
        self.test_airtable_articles_endpoint()
        self.test_single_article_endpoint()
        
        # Test NEW In the Press endpoints
        self.test_airtable_in_the_press_endpoint()
        self.test_single_in_the_press_endpoint()
        
        # Test JSON responses
        self.test_json_responses()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("\n🎉 All tests passed! Backend is production-ready.")
            return True
        else:
            print(f"\n⚠️  {total - passed} test(s) failed. Review issues above.")
            return False

def main():
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()