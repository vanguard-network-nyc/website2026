"""
Backend tests for CORS fix and Membership Application endpoint
Tests the fix for: allow_credentials=True removed from CORSMiddleware
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://form-debug-8.preview.emergentagent.com').rstrip('/')


class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_returns_json_with_required_fields(self):
        """GET /api/health should return JSON with status, airtable_token_set, airtable, and mongodb fields"""
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "status" in data, "Response missing 'status' field"
        assert "airtable_token_set" in data, "Response missing 'airtable_token_set' field"
        assert "airtable" in data, "Response missing 'airtable' field"
        assert "mongodb" in data, "Response missing 'mongodb' field"
        
        # Verify values
        assert data["status"] == "ok", f"Expected status 'ok', got '{data['status']}'"
        assert data["airtable_token_set"] is True, "airtable_token_set should be True"
        assert data["airtable"] == "ok", f"Expected airtable 'ok', got '{data['airtable']}'"
        assert data["mongodb"] == "ok", f"Expected mongodb 'ok', got '{data['mongodb']}'"
        
        print(f"✓ Health check passed: {data}")


class TestCORSConfiguration:
    """CORS configuration tests - verifies fix for allow_credentials violation"""
    
    def test_cors_preflight_no_credentials_header(self):
        """OPTIONS preflight should NOT include Access-Control-Allow-Credentials header"""
        response = requests.options(
            f"{BASE_URL}/api/membership/application",
            headers={
                "Origin": "https://example.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            },
            timeout=10
        )
        
        # Should return 200 or 204 for preflight
        assert response.status_code in [200, 204], f"Preflight failed with status {response.status_code}"
        
        # Must have Access-Control-Allow-Origin
        assert "access-control-allow-origin" in response.headers, "Missing Access-Control-Allow-Origin header"
        assert response.headers["access-control-allow-origin"] == "*", \
            f"Expected Access-Control-Allow-Origin: *, got: {response.headers.get('access-control-allow-origin')}"
        
        # Must NOT have Access-Control-Allow-Credentials (this was the bug)
        credentials_header = response.headers.get("access-control-allow-credentials")
        assert credentials_header is None, \
            f"Access-Control-Allow-Credentials should NOT be present, but found: {credentials_header}"
        
        print("✓ CORS preflight check passed - no Access-Control-Allow-Credentials header")
    
    def test_cors_post_response_no_credentials_header(self):
        """POST response should NOT include Access-Control-Allow-Credentials header"""
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            headers={
                "Content-Type": "application/json",
                "Origin": "https://testcors.example.com"
            },
            json={
                "full_name": "TEST_CorsPostTest",
                "work_email": "corsposttest@example.com",
                "phone_number": "+12025551236",
                "company_name": "CORS Test Inc",
                "job_title": "Test Lead",
                "country": "United States",
                "network_interest": ["General Counsel Network"],
                "source_of_inquiry": "Main website"
            },
            timeout=10
        )
        
        assert response.status_code == 200, f"POST failed with status {response.status_code}: {response.text}"
        
        # Verify CORS headers on actual POST response
        assert "access-control-allow-origin" in response.headers, "Missing Access-Control-Allow-Origin in POST response"
        
        # Must NOT have Access-Control-Allow-Credentials
        credentials_header = response.headers.get("access-control-allow-credentials")
        assert credentials_header is None, \
            f"Access-Control-Allow-Credentials should NOT be present on POST response, but found: {credentials_header}"
        
        print("✓ POST response CORS check passed - no Access-Control-Allow-Credentials header")


class TestMembershipApplicationEndpoint:
    """Membership application endpoint tests"""
    
    def test_post_valid_application_returns_success(self):
        """POST /api/membership/application with valid data should return success with record_id"""
        payload = {
            "full_name": "TEST_ValidSubmission",
            "work_email": "valid@example.com",
            "phone_number": "+12025551237",
            "company_name": "Valid Corp",
            "job_title": "Director",
            "country": "Canada",
            "network_interest": ["Life Sciences CEO Network"],
            "source_of_inquiry": "Main website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=15
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("status") == "success", f"Expected status 'success', got: {data.get('status')}"
        assert "record_id" in data, f"Response missing 'record_id' field. Response: {data}"
        assert data["record_id"].startswith("rec"), f"record_id should start with 'rec', got: {data['record_id']}"
        
        print(f"✓ Valid application submitted, record_id: {data['record_id']}")
    
    def test_post_application_with_all_optional_fields(self):
        """POST with optional personal_email, recommended_by, and further_details"""
        payload = {
            "full_name": "TEST_AllFields",
            "work_email": "allfields@example.com",
            "personal_email": "personal@gmail.com",
            "phone_number": "+442071234567",
            "company_name": "Complete Data Ltd",
            "job_title": "VP Legal",
            "country": "United Kingdom",
            "network_interest": ["Risk Management Network", "Senior Leaders Network"],
            "recommended_by": "John Doe",
            "further_details": "I am very interested in joining the network. I heard about you at a conference.",
            "source_of_inquiry": "Main website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=15
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("status") == "success"
        assert "record_id" in data
        
        print(f"✓ Application with all optional fields submitted, record_id: {data['record_id']}")
    
    def test_post_application_with_multiple_network_interests(self):
        """POST with multiple network_interest selections (array)"""
        payload = {
            "full_name": "TEST_MultiNetwork",
            "work_email": "multinetwork@example.com",
            "phone_number": "+33123456789",
            "company_name": "Multi Interest SA",
            "job_title": "General Counsel",
            "country": "France",
            "network_interest": [
                "General Counsel Network",
                "Senior In-House Counsel Network",
                "Not sure"
            ],
            "source_of_inquiry": "Main website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=15
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("status") == "success"
        assert "record_id" in data
        
        print(f"✓ Application with multiple networks submitted, record_id: {data['record_id']}")
    
    def test_post_missing_required_field_returns_error(self):
        """POST with missing required field (work_email) should return 422 validation error"""
        payload = {
            "full_name": "TEST_MissingEmail",
            # Missing work_email
            "phone_number": "+12025551238",
            "company_name": "Error Test",
            "job_title": "Tester",
            "country": "USA",
            "network_interest": ["Not sure"],
            "source_of_inquiry": "Main website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=10
        )
        
        # FastAPI returns 422 for validation errors
        assert response.status_code == 422, f"Expected 422 for missing field, got {response.status_code}"
        
        print("✓ Missing required field correctly returns 422 validation error")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
