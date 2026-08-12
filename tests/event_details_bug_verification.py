"""
Focused Playwright bug verification for /events/:recordId event details page.

Executed manually via mcp_browser_automation in the preview environment.
Core assertions covered:
- no Duration label or Clock icon on Forum/Exchange event detail pages
- Airtable <u> tags render as actual underlined HTML elements, not visible raw code
- description paragraphs and markdown bullet lists render with visible spacing/markers
- hero image is sourced from Listing Picture and displays full-width without crop/letterbox
- Exchange event without long_description has a single description section
"""

import json
import re
import time


BASE_URL = "https://form-debug-8.preview.emergentagent.com"
FORUM_ID = "rec5Vr1VneQNZQ75N"
EXCHANGE_ID = "recayFKrBhjV8bjNx"


async def run(page):
    """Run inside an async Playwright context with a `page` object."""
    await page.set_viewport_size({"width": 1920, "height": 1080})

    async def load_event(record_id):
        await page.goto(f"{BASE_URL}/events/{record_id}?qa_ts={int(time.time()*1000)}", wait_until="networkidle")
        await page.locator('[data-testid="event-detail-title"]').wait_for(state="visible")
        return await page.evaluate(
            """async (recordId) => {
                const res = await fetch(`/api/events/${recordId}`, { cache: 'no-store' });
                return await res.json();
            }""",
            record_id,
        )

    forum_api = await load_event(FORUM_ID)
    body_text = await page.locator("body").inner_text()
    assert "DURATION" not in body_text.upper()
    assert await page.locator("svg.lucide-clock, .lucide-clock").count() == 0
    assert await page.locator('[data-testid="event-detail-date"]').is_visible()
    assert await page.locator('[data-testid="event-detail-location"]').is_visible()

    hero_info = await page.evaluate(
        """(listingPicture) => {
            const imgs = Array.from(document.querySelectorAll('img'));
            const img = imgs.find(i => i.currentSrc === listingPicture || i.src === listingPicture);
            const rect = img.getBoundingClientRect();
            const parent = img.parentElement.getBoundingClientRect();
            const card = img.closest('.bg-white.rounded-2xl').getBoundingClientRect();
            return {
                src: img.currentSrc || img.src,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                ratioDelta: Math.abs((img.naturalWidth / img.naturalHeight) - (rect.width / rect.height)),
                parentImageWidthDelta: Math.abs(parent.width - rect.width),
                parentImageHeightDelta: Math.abs(parent.height - rect.height),
                cardImageWidthDelta: Math.abs(card.width - rect.width)
            };
        }""",
        forum_api["listing_picture"],
    )
    assert hero_info["src"] == forum_api["listing_picture"]
    assert hero_info["naturalWidth"] > 1 and hero_info["naturalHeight"] > 1
    assert hero_info["parentImageWidthDelta"] <= 2 and hero_info["cardImageWidthDelta"] <= 2
    assert hero_info["parentImageHeightDelta"] <= 2 and hero_info["ratioDelta"] <= 0.03

    desc = page.locator('[data-testid="event-detail-description"]')
    desc_text = await desc.inner_text()
    assert "<u>" not in desc_text and "</u>" not in desc_text
    underline_info = await desc.evaluate(
        """(root) => {
            const want = ['CHAIR', 'CO-CHAIR', 'SESSION LEADERS', 'AGENDA'];
            const uEls = Array.from(root.querySelectorAll('u'));
            return {
                count: uEls.length,
                found: Object.fromEntries(want.map(w => [w, uEls.some(u => u.textContent.toUpperCase().includes(w))])),
                styles: uEls.map(u => getComputedStyle(u).textDecorationLine)
            };
        }"""
    )
    assert underline_info["count"] >= 4
    assert all(underline_info["found"].values())
    assert all("underline" in style for style in underline_info["styles"][:4])

    bullet_info = await desc.evaluate(
        """(root) => ({
            ulCount: root.querySelectorAll('ul').length,
            liCount: root.querySelectorAll('ul > li').length,
            listStyles: Array.from(root.querySelectorAll('ul')).map(ul => getComputedStyle(ul).listStyleType)
        })"""
    )
    assert bullet_info["ulCount"] >= 1 and bullet_info["liCount"] >= 3
    assert "disc" in bullet_info["listStyles"]

    paragraph_info = await desc.evaluate(
        """(root) => Array.from(root.querySelectorAll('p')).slice(0, 4).map(p => getComputedStyle(p).marginBottom)"""
    )
    assert len(paragraph_info) >= 4
    assert all(float(re.sub(r"px$", "", mb)) >= 14 for mb in paragraph_info)

    exchange_api = await load_event(EXCHANGE_ID)
    body_text = await page.locator("body").inner_text()
    assert "DURATION" not in body_text.upper()
    assert await page.locator("svg.lucide-clock, .lucide-clock").count() == 0
    assert await page.get_by_role("heading", name="About this event", exact=True).count() == 1
    assert await page.locator('[data-testid="event-detail-description"]').count() == 1
    assert not exchange_api.get("long_description")

    return {"forum_hero": hero_info, "forum_bullets": bullet_info, "forum_underlines": underline_info}
