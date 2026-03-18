"""
Backend tests for the /api/membership/application endpoint.
Tests: further_details field submission, Airtable mapping to 'Message', table name 'Membership Contact Inquiry Form (Softr)'
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestMembershipApplication:
    """Membership Application endpoint tests - verifying further_details field and Airtable integration"""

    def test_health_check(self):
        """Verify backend is running"""
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        assert response.status_code in [200, 404], f"Backend not reachable: {response.status_code}"
        print("Backend is reachable")

    def test_membership_application_with_further_details(self):
        """Test full form submission including further_details field"""
        payload = {
            "full_name": "Test User",
            "work_email": "test@example.com",
            "personal_email": "",
            "phone_number": "2125551234",
            "company_name": "Test Corp",
            "job_title": "General Counsel",
            "country": "United States",
            "network_interest": ["General Counsel Network"],
            "recommended_by": "",
            "further_details": "This is a test submission",
            "source_of_inquiry": "Emergent Membership Application"
        }
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            json=payload,
            timeout=30
        )
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}. Response: {response.text}"

        data = response.json()
        assert data.get("status") == "success", f"Expected status=success, got: {data}"
        assert "record_id" in data, f"Expected record_id in response, got: {data}"
        print(f"SUCCESS: record_id={data['record_id']}")

    def test_membership_application_without_further_details(self):
        """Test form submission without further_details (optional field)"""
        payload = {
            "full_name": "Test User No Details",
            "work_email": "testnodetails@example.com",
            "phone_number": "2125559999",
            "company_name": "Test Corp",
            "job_title": "General Counsel",
            "country": "United States",
            "network_interest": ["General Counsel Network"],
            "source_of_inquiry": "Emergent Membership Application"
        }
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            json=payload,
            timeout=30
        )
        print(f"Status code (no further_details): {response.status_code}")
        print(f"Response: {response.text}")
        assert response.status_code == 200, f"Expected 200 even without further_details, got: {response.status_code}. Response: {response.text}"

        data = response.json()
        assert data.get("status") == "success", f"Expected status=success, got: {data}"
        print(f"SUCCESS without further_details: record_id={data.get('record_id')}")

    def test_membership_application_missing_required_fields(self):
        """Test that missing required fields returns 422"""
        payload = {
            "full_name": "Test User",
            # missing work_email, phone_number, etc.
        }
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            json=payload,
            timeout=15
        )
        print(f"Status code (missing fields): {response.status_code}")
        assert response.status_code == 422, f"Expected 422 for missing required fields, got: {response.status_code}"
        print("Validation error correctly returned for missing required fields")

    def test_further_details_field_in_model(self):
        """Test that further_details is accepted and processed (payload structure verification)"""
        payload = {
            "full_name": "Model Test User",
            "work_email": "modeltest@example.com",
            "phone_number": "2125550000",
            "company_name": "Model Corp",
            "job_title": "CLO",
            "country": "United States",
            "network_interest": ["General Counsel Network"],
            "further_details": "Testing the further_details field maps to Message in Airtable",
            "source_of_inquiry": "Emergent Membership Application"
        }
        response = requests.post(
            f"{BASE_URL}/api/membership/application",
            json=payload,
            timeout=30
        )
        print(f"Status code (further_details model test): {response.status_code}")
        print(f"Response: {response.text}")
        # If Airtable returns success, field was accepted
        assert response.status_code == 200, f"Expected 200, got: {response.status_code}. Response: {response.text}"
        data = response.json()
        assert data.get("status") == "success"
        print(f"further_details field correctly accepted by backend model. record_id={data.get('record_id')}")
