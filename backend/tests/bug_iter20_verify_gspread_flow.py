#!/usr/bin/env python3
"""Focused bug verification for Iteration 20.

Verifies the reported ModuleNotFoundError: No module named 'gspread' no longer
breaks the nominate-decline submission flow, and checks the shared Google Sheet
writer regression path for LSCEO grant submissions.
"""

import base64
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from dotenv import load_dotenv


ROOT = Path("/app")
BACKEND = ROOT / "backend"
REPORT_PATH = ROOT / "test_reports" / "bug_iter20_runtime_results.json"
PREVIEW_BASE_URL = "https://program-network.preview.emergentagent.com/api"

DECLINES_SHEET_ID = "1AuA3nIfWuHdm8TpwiS-J4py8zQ3DsBBXI332VRPm2-4"
DECLINES_TAB = "DECLINES"
LSCEO_SHEET_ID = "1Ah_lT77AbuLxAorAUf4-AGMUXncK9OgXLDe_X4OI54Y"
LSCEO_TAB = "2026"


def assert_true(condition, message):
    if not condition:
        raise AssertionError(message)


def load_gspread_client():
    import gspread
    from google.oauth2.service_account import Credentials

    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON_B64", "")
    assert_true(bool(raw), "GOOGLE_SERVICE_ACCOUNT_JSON_B64 is not configured")
    info = json.loads(base64.b64decode(raw).decode("utf-8"))
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    return gspread.authorize(creds)


def requirement_version_ok(requirements_text, package_name, min_version_tuple=None):
    pattern = re.compile(rf"^{re.escape(package_name)}==([0-9]+(?:\.[0-9]+)*)$", re.MULTILINE)
    match = pattern.search(requirements_text)
    if not match:
        return False, None
    if min_version_tuple is None:
        return True, match.group(1)
    actual = tuple(int(part) for part in match.group(1).split("."))
    padded_actual = actual + (0,) * (len(min_version_tuple) - len(actual))
    return padded_actual >= min_version_tuple, match.group(1)


def values_to_records(values):
    assert_true(values, "worksheet returned no values")
    headers = values[0]
    records = []
    for row_number, row in enumerate(values[1:], start=2):
        record = {header: row[index] if index < len(row) else "" for index, header in enumerate(headers)}
        record["__row_number"] = row_number
        records.append(record)
    return headers, records


def wait_for_sheet_row(ws, matcher, timeout_seconds=30):
    deadline = time.time() + timeout_seconds
    last_headers = []
    while time.time() < deadline:
        values = ws.get_all_values()
        headers, records = values_to_records(values)
        matches = [record for record in records if matcher(record)]
        if matches:
            return headers, matches[-1]
        last_headers = headers
        time.sleep(2)
    raise AssertionError(f"matching row not found within {timeout_seconds}s; headers={last_headers}")


def post_json(path, payload):
    url = f"{PREVIEW_BASE_URL}{path}"
    response = requests.post(url, json=payload, timeout=45)
    try:
        body = response.json()
    except Exception:
        body = {"raw_text": response.text[:1000]}
    return response.status_code, body


def main():
    load_dotenv(BACKEND / ".env")
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)

    results = {
        "started_at": datetime.now(timezone.utc).isoformat(),
        "preview_base_url": PREVIEW_BASE_URL,
        "checks": {},
        "created_test_data": {},
    }

    requirements_text = (BACKEND / "requirements.txt").read_text()
    gspread_ok, gspread_version = requirement_version_ok(requirements_text, "gspread", (6, 2, 1))
    google_auth_ok, google_auth_version = requirement_version_ok(requirements_text, "google-auth", None)
    google_auth_httplib2_ok, google_auth_httplib2_version = requirement_version_ok(requirements_text, "google-auth-httplib2", None)
    google_auth_oauthlib_ok, google_auth_oauthlib_version = requirement_version_ok(requirements_text, "google-auth-oauthlib", None)
    assert_true(gspread_ok, "requirements.txt does not include gspread==6.2.1 or newer")
    assert_true(google_auth_ok, "requirements.txt does not include google-auth")
    assert_true(google_auth_httplib2_ok, "requirements.txt does not include google-auth-httplib2")
    assert_true(google_auth_oauthlib_ok, "requirements.txt does not include google-auth-oauthlib")
    results["checks"]["requirements"] = {
        "passed": True,
        "gspread": gspread_version,
        "google-auth": google_auth_version,
        "google-auth-httplib2": google_auth_httplib2_version,
        "google-auth-oauthlib": google_auth_oauthlib_version,
    }

    gc = load_gspread_client()
    results["checks"]["gspread_import_and_auth"] = {"passed": True}

    timestamp = str(int(time.time()))

    decline_payload = {
        "email": f"e2e-iter20-{timestamp}@test.local",
        "comments": f"gspread verify iter20 {timestamp}",
        "eventCode": "NGGC2027_0201",
    }
    status_code, body = post_json("/nominate-decline/submit", decline_payload)
    assert_true(status_code == 200, f"nominate-decline returned HTTP {status_code}: {body}")
    assert_true(body.get("ok") is True, f"nominate-decline did not return ok:true: {body}")
    assert_true(re.match(r"^sheet-row-\d+$", body.get("row_id", "")), f"unexpected row_id: {body}")
    assert_true("ModuleNotFoundError" not in json.dumps(body), f"gspread ModuleNotFoundError still surfaced: {body}")

    declines_ws = gc.open_by_key(DECLINES_SHEET_ID).worksheet(DECLINES_TAB)
    decline_headers, decline_row = wait_for_sheet_row(
        declines_ws,
        lambda record: record.get("Your Work Email ") == decline_payload["email"]
        and record.get("Recommendations/further info:") == decline_payload["comments"]
        and record.get("Event Code (For admin)") == decline_payload["eventCode"],
    )
    for required_header in ["Timestamp", "Your Work Email ", "Recommendations/further info:", "Event Code (For admin)"]:
        assert_true(required_header in decline_headers, f"DECLINES missing required header: {required_header!r}")
    results["checks"]["nominate_decline"] = {
        "passed": True,
        "http_status": status_code,
        "response": body,
        "sheet_id": DECLINES_SHEET_ID,
        "tab": DECLINES_TAB,
        "matched_row_number": decline_row["__row_number"],
        "matched_values": {
            "Your Work Email ": decline_row.get("Your Work Email "),
            "Recommendations/further info:": decline_row.get("Recommendations/further info:"),
            "Event Code (For admin)": decline_row.get("Event Code (For admin)"),
            "Timestamp": decline_row.get("Timestamp"),
        },
    }
    results["created_test_data"]["declines"] = decline_payload

    lsceo_payload = {
        "fullName": f"TEST Iter20 Grant Applicant {timestamp}",
        "jobTitle": "QA Verification Lead",
        "companyName": f"TEST Iter20 Company {timestamp}",
        "companyWebsite": "https://example.test/iter20",
        "companyAddress": "123 Test Lane, Test City",
        "email": f"lsceo-iter20-{timestamp}@test.local",
        "phoneNumber": "",
        "incorporated": "Yes",
        "pipeline": "Yes",
        "preRevenue": "Yes",
        "employees4Plus": "No",
        "mission": f"TEST mission iter20 {timestamp}",
        "productPipeline": f"TEST pipeline iter20 {timestamp}",
        "teamRoles": f"TEST team iter20 {timestamp}",
        "networkContribution": f"TEST contribution iter20 {timestamp}",
        "signature": f"TEST Signature {timestamp}",
        "todayDate": "2026-07-01",
        "commitToParticipate": "Yes",
        "accurateApplication": "Yes",
    }
    status_code, body = post_json("/lsceo-grant/submit", lsceo_payload)
    assert_true(status_code == 200, f"lsceo-grant returned HTTP {status_code}: {body}")
    assert_true(body.get("ok") is True, f"lsceo-grant did not return ok:true: {body}")
    assert_true(re.match(r"^sheet-row-\d+$", body.get("row_id", "")), f"unexpected LSCEO row_id: {body}")
    assert_true("ModuleNotFoundError" not in json.dumps(body), f"gspread ModuleNotFoundError surfaced in LSCEO flow: {body}")

    lsceo_ws = gc.open_by_key(LSCEO_SHEET_ID).worksheet(LSCEO_TAB)
    expected_lsceo_values = {
        "Your full name": lsceo_payload["fullName"],
        "Your job title": lsceo_payload["jobTitle"],
        "Company name": lsceo_payload["companyName"],
        "Company website": lsceo_payload["companyWebsite"],
        "Company address": lsceo_payload["companyAddress"],
        "Your email": lsceo_payload["email"],
        "Phone number": "",
        "Company incorporated?": lsceo_payload["incorporated"],
        "Company pipeline?": lsceo_payload["pipeline"],
        "Pre-revenue stage?": lsceo_payload["preRevenue"],
        "More than 3 employees?": lsceo_payload["employees4Plus"],
        "Company mission": lsceo_payload["mission"],
        "Product pipeline": lsceo_payload["productPipeline"],
        "Team members/roles": lsceo_payload["teamRoles"],
        "Your network contribution": lsceo_payload["networkContribution"],
        "Signature": lsceo_payload["signature"],
        "Today's date": lsceo_payload["todayDate"],
        "Commit to participate?": lsceo_payload["commitToParticipate"],
        "Accurate application?": lsceo_payload["accurateApplication"],
    }
    lsceo_headers, lsceo_row = wait_for_sheet_row(
        lsceo_ws,
        lambda record: record.get("Your email") == lsceo_payload["email"]
        and record.get("Company name") == lsceo_payload["companyName"]
        and record.get("Signature") == lsceo_payload["signature"],
    )
    for header, expected in expected_lsceo_values.items():
        assert_true(header in lsceo_headers, f"LSCEO sheet missing required header: {header!r}")
        assert_true(lsceo_row.get(header, "") == expected, f"LSCEO column {header!r} expected {expected!r}, got {lsceo_row.get(header, '')!r}")
    results["checks"]["lsceo_grant"] = {
        "passed": True,
        "http_status": status_code,
        "response": body,
        "sheet_id": LSCEO_SHEET_ID,
        "tab": LSCEO_TAB,
        "matched_row_number": lsceo_row["__row_number"],
        "matched_values": {header: lsceo_row.get(header, "") for header in expected_lsceo_values},
    }
    results["created_test_data"]["lsceo_grant"] = lsceo_payload

    results["finished_at"] = datetime.now(timezone.utc).isoformat()
    results["passed"] = True
    REPORT_PATH.write_text(json.dumps(results, indent=2, sort_keys=True))
    print(json.dumps(results, indent=2, sort_keys=True))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        failure = {
            "passed": False,
            "error_type": type(exc).__name__,
            "error": str(exc),
            "finished_at": datetime.now(timezone.utc).isoformat(),
        }
        REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        REPORT_PATH.write_text(json.dumps(failure, indent=2, sort_keys=True))
        print(json.dumps(failure, indent=2, sort_keys=True), file=sys.stderr)
        raise