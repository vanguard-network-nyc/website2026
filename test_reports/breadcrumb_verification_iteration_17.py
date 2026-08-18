"""Focused breadcrumb verification script for iteration 17.

This script body was run via the browser automation harness against
https://program-network.preview.emergentagent.com to verify the reported
breadcrumb labels for /upcoming-events, /past-events, and the /events detail
page regression.
"""

async def run(page):
    await page.set_viewport_size({"width": 1920, "height": 1080})
    base = "https://program-network.preview.emergentagent.com"
    cases = [
        {
            "path": "/upcoming-events",
            "expected_active": "Upcoming Events",
            "forbidden": ["Events", "upcoming-events"],
            "screenshot": "/app/test_reports/screenshots/iteration_17_upcoming_breadcrumb.jpg",
        },
        {
            "path": "/past-events",
            "expected_active": "Past Events",
            "forbidden": ["past-events", "Events"],
            "screenshot": "/app/test_reports/screenshots/iteration_17_past_breadcrumb.jpg",
        },
        {
            "path": "/events/rec4iwSZ76S0uHTVp",
            "expected_active": "Leading Through the Age of Disruption",
            "expected_parent": "Events",
            "forbidden": ["upcoming-events"],
            "screenshot": "/app/test_reports/screenshots/iteration_17_detail_breadcrumb.jpg",
        },
    ]

    async def extract_breadcrumb():
        return await page.evaluate("""() => {
            const nav = document.querySelector('nav[class*="space-x-2"][class*="text-sm"][class*="mb-6"]');
            if (!nav) return null;
            const active = nav.querySelector('span.font-semibold')?.textContent?.trim() || '';
            const linkTexts = Array.from(nav.querySelectorAll('a'))
                .map(a => a.textContent.trim())
                .filter(Boolean);
            const links = Array.from(nav.querySelectorAll('a'))
                .map(a => ({text: a.textContent.trim(), href: a.getAttribute('href')}))
                .filter(l => l.text);
            const text = nav.textContent.replace(/\s+/g, ' ').trim();
            return {active, linkTexts, links, text};
        }""")

    for case in cases:
        url = base + case["path"]
        print(f"Navigating to {url}")
        await page.goto(url, wait_until="domcontentloaded", timeout=45000)
        await page.evaluate("localStorage.clear(); sessionStorage.clear();")
        await page.reload(wait_until="domcontentloaded", timeout=45000)
        try:
            await page.wait_for_load_state("networkidle", timeout=12000)
        except Exception:
            print("Network idle timeout ignored; continuing after DOM load")
        await page.wait_for_selector('nav[class*="space-x-2"][class*="text-sm"][class*="mb-6"]', timeout=20000)
        if case["path"].startswith("/events/"):
            await page.wait_for_function(
                """() => document.querySelector('nav[class*="space-x-2"][class*="text-sm"][class*="mb-6"] span.font-semibold')?.textContent?.trim() === 'Leading Through the Age of Disruption'""",
                timeout=20000,
            )
        data = await extract_breadcrumb()
        print(f"Breadcrumb data for {case['path']}: {data}")
        assert data, f"No breadcrumb nav found for {case['path']}"
        assert data["active"] == case["expected_active"], f"Expected active breadcrumb {case['expected_active']!r}, got {data['active']!r}"
        if "expected_parent" in case:
            assert case["expected_parent"] in data["linkTexts"], f"Missing parent breadcrumb link {case['expected_parent']!r}; links={data['linkTexts']}"
            assert any(link["text"] == case["expected_parent"] and link["href"] == "/upcoming-events" for link in data["links"]), f"Events parent crumb did not link to /upcoming-events: {data['links']}"
        for forbidden in case["forbidden"]:
            if forbidden == "Events":
                assert data["active"] != forbidden, f"Active breadcrumb still shows forbidden label {forbidden!r}"
            else:
                assert forbidden not in data["active"], f"Active breadcrumb includes forbidden text {forbidden!r}"
        await page.screenshot(path=case["screenshot"], quality=40, full_page=False)
        print(f"PASS {case['path']}: active breadcrumb is {data['active']!r}")
