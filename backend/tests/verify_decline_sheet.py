"""Verify the last frontend-submitted decline row landed in the DECLINES tab."""
import os, base64, json, sys
from dotenv import load_dotenv
load_dotenv("/app/backend/.env")

import gspread
from google.oauth2.service_account import Credentials

SHEET_ID = "1AuA3nIfWuHdm8TpwiS-J4py8zQ3DsBBXI332VRPm2-4"
TAB = "DECLINES"

with open("/tmp/iter18_submit.txt") as f:
    test_email, test_comment, ts = [x.strip() for x in f.readlines()]

b64 = os.environ["GOOGLE_SERVICE_ACCOUNT_JSON_B64"]
info = json.loads(base64.b64decode(b64))
creds = Credentials.from_service_account_info(
    info, scopes=["https://www.googleapis.com/auth/spreadsheets"]
)
gc = gspread.authorize(creds)
ws = gc.open_by_key(SHEET_ID).worksheet(TAB)
rows = ws.get_all_values()
print(f"Total rows: {len(rows)}")
print(f"Header: {rows[0]}")
matches = [(i, r) for i, r in enumerate(rows, start=1) if test_email in r]
print(f"Matches for {test_email}: {matches}")
assert matches, f"no row contains {test_email}"
i, row = matches[-1]
print(f"Row {i}: {row}")
assert test_comment in row, "comment missing"
assert "NGGC2027_0201" in row, "event code missing"
print(f"PASS: new decline row {i} present with expected email, comment, event code")
