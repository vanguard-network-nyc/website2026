#!/usr/bin/env python3
import base64
import json
import os
import re
import sys
import time
from datetime import datetime, timezone

import gspread
import requests
from google.oauth2.service_account import Credentials


ENV_PATH = "/app/backend/.env"
API_URL = "https://program-network.preview.emergentagent.com/api/nominate-decline/submit"
SHEET_ID = "1AuA3nIfWuHdm8TpwiS-J4py8zQ3DsBBXI332VRPm2-4"
TAB_NAME = "DECLINES"


def load_env(path):
    env = {}
    with open(path, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            env[key] = value.strip().strip('"').strip("'")
    return env


def main():
    env = load_env(ENV_PATH)
    raw_creds = env.get("GOOGLE_SERVICE_ACCOUNT_JSON_B64") or os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON_B64")
    if not raw_creds:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON_B64 missing")

    ts = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    email = f"e2e-iter21-{ts}@test.local"
    payload = {
        "email": email,
        "comments": "requirements.txt cleanup verify",
        "eventCode": "NGGC2027_0201",
    }

    response = requests.post(API_URL, json=payload, timeout=30)
    result = {
        "request_payload": payload,
        "http_status": response.status_code,
        "response_text": response.text[:1000],
    }
    response.raise_for_status()
    body = response.json()
    result["response_json"] = body
    if body.get("ok") is not True:
        raise AssertionError(f"Expected ok true, got {body}")
    if not re.fullmatch(r"sheet-row-\d+", str(body.get("row_id", ""))):
        raise AssertionError(f"Expected row_id sheet-row-N, got {body.get('row_id')}")

    info = json.loads(base64.b64decode(raw_creds).decode("utf-8"))
    scopes = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    client = gspread.authorize(creds)
    worksheet = client.open_by_key(SHEET_ID).worksheet(TAB_NAME)

    # Give the append a moment to settle, then read back the target row.
    time.sleep(2)
    values = worksheet.get_all_values()
    headers = values[0]
    matches = []
    for idx, row in enumerate(values[1:], start=2):
        padded = row + [""] * max(0, len(headers) - len(row))
        record = dict(zip(headers, padded))
        if record.get("Your Work Email ") == email:
            matches.append({"row_number": idx, "record": record})

    result["matches_found"] = len(matches)
    result["matching_rows"] = matches[-3:]
    if not matches:
        raise AssertionError(f"No sheet row found for {email}")
    latest = matches[-1]["record"]
    expected = {
        "Your Work Email ": email,
        "Recommendations/further info:": payload["comments"],
        "Event Code (For admin)": payload["eventCode"],
    }
    for key, value in expected.items():
        if latest.get(key) != value:
            raise AssertionError(f"Sheet value mismatch for {key}: expected {value!r}, got {latest.get(key)!r}")

    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(json.dumps({"error": str(exc), "type": type(exc).__name__}, indent=2), file=sys.stderr)
        raise
