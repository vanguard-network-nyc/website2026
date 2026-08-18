import requests, time, json, sys

BASE = "https://program-network.preview.emergentagent.com"
ts = int(time.time())

results = {}

# 1) nominate-decline
payload = {
    "email": f"e2e-envcheck-{ts}@test.local",
    "comments": "preview still works verify",
    "eventCode": "NGGC2027_0201",
}
r = requests.post(f"{BASE}/api/nominate-decline/submit", json=payload, timeout=60)
results["decline"] = {"status": r.status_code, "body": r.text[:500]}

# 2) lsceo-grant
grant_payload = {
    "fullName": f"E2E Iter22 {ts}",
    "jobTitle": "CEO",
    "companyName": "E2E Test Co",
    "companyWebsite": "https://example.com",
    "companyAddress": "123 Test St",
    "email": f"e2e-grant-iter22-{ts}@test.local",
    "phoneNumber": "555-000-1111",
    "incorporated": "Yes",
    "pipeline": "Yes",
    "preRevenue": "Yes",
    "employees4Plus": "Yes",
    "mission": "Test mission statement.",
    "productPipeline": "Test product pipeline.",
    "teamRoles": "Test team roles.",
    "networkContribution": "Test contribution.",
    "signature": f"E2E Iter22 {ts}",
    "todayDate": "2026-01-15",
    "commitToParticipate": "Yes",
    "accurateApplication": "Yes",
}
r2 = requests.post(f"{BASE}/api/lsceo-grant/submit", json=grant_payload, timeout=60)
results["grant"] = {"status": r2.status_code, "body": r2.text[:500]}

print(json.dumps(results, indent=2))
