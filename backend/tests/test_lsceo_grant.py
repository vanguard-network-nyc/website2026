"""Backend tests for the LSCEO Grant submission endpoint.
Verifies happy-path write to Google Sheets tab '2026' and read-back."""
import os
import base64
import json
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://program-network.preview.emergentagent.com").rstrip("/")
SHEET_ID = "1Ah_lT77AbuLxAorAUf4-AGMUXncK9OgXLDe_X4OI54Y"
TAB = "2026"

# Load service account creds from backend/.env (backend already has them loaded, but tests need them too)
def _load_backend_env():
    env_path = "/app/backend/.env"
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k, v)

_load_backend_env()


def _gspread_ws():
    import gspread
    from google.oauth2.service_account import Credentials
    raw = os.environ["GOOGLE_SERVICE_ACCOUNT_JSON_B64"]
    info = json.loads(base64.b64decode(raw).decode("utf-8"))
    scopes = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    gc = gspread.authorize(creds)
    return gc.open_by_key(SHEET_ID).worksheet(TAB)


UNIQUE = f"TEST_{int(time.time())}"


def _payload(**overrides):
    p = {
        "fullName": f"{UNIQUE} Backend Tester",
        "jobTitle": "CEO",
        "companyName": "TestCo Bio",
        "companyWebsite": "https://testco.example",
        "companyAddress": "1 Test Way, Cambridge MA",
        "email": f"{UNIQUE.lower()}@example.com",
        "phoneNumber": "+16175551234",
        "incorporated": "Yes",
        "pipeline": "Yes",
        "preRevenue": "Yes",
        "employees4Plus": "Yes",
        "mission": "Cure disease X.",
        "productPipeline": "Two lead candidates.",
        "teamRoles": "Alice - CTO; Bob - CSO.",
        "networkContribution": "Mentorship and intros.",
        "signature": f"{UNIQUE} Backend Tester",
        "todayDate": "2026-01-15",
        "commitToParticipate": "Yes",
        "accurateApplication": "Yes",
    }
    p.update(overrides)
    return p


def test_happy_path_writes_row_and_readback_matches():
    payload = _payload()
    r = requests.post(f"{BASE_URL}/api/lsceo-grant/submit", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body.get("ok") is True, body
    assert isinstance(body.get("row_id"), str) and body["row_id"].startswith("sheet-row-"), body

    # Read back via service account
    ws = _gspread_ws()
    headers = ws.row_values(1)
    all_rows = ws.get_all_values()
    # find our row by unique email
    found = None
    for row in all_rows:
        row_dict = dict(zip(headers, row))
        if row_dict.get("Your email") == payload["email"]:
            found = row_dict
            break
    assert found is not None, f"Row with email {payload['email']} not found in sheet"
    assert found["Your full name"] == payload["fullName"]
    assert found["Your job title"] == payload["jobTitle"]
    assert found["Company name"] == payload["companyName"]
    assert found["Company website"] == payload["companyWebsite"]
    assert found["Company address"] == payload["companyAddress"]
    # Phone must preserve leading +. The apostrophe prefix is stripped by Sheets when displaying.
    assert found["Phone number"] == payload["phoneNumber"], f"phone: {found['Phone number']!r}"
    assert found["Company incorporated?"] == "Yes"
    assert found["Company pipeline?"] == "Yes"
    assert found["Pre-revenue stage?"] == "Yes"
    assert found["More than 3 employees?"] == "Yes"
    assert found["Company mission"] == payload["mission"]
    assert found["Product pipeline"] == payload["productPipeline"]
    assert found["Team members/roles"] == payload["teamRoles"]
    assert found["Your network contribution"] == payload["networkContribution"]
    assert found["Signature"] == payload["signature"]
    assert found["Today's date"] == payload["todayDate"]
    assert found["Commit to participate?"] == "Yes"
    assert found["Accurate application?"] == "Yes"
    assert found.get("🔐 Softr Record ID", "") == ""
    # Timestamp column auto-filled
    assert found.get("Timestamp"), "Timestamp column not populated"


def test_endpoint_returns_ok_true_status_200():
    """Second sanity call to ensure endpoint is idempotent and stable."""
    r = requests.post(f"{BASE_URL}/api/lsceo-grant/submit", json=_payload(fullName=f"{UNIQUE} Second"), timeout=30)
    assert r.status_code == 200
    assert r.json().get("ok") is True
