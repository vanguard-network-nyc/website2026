"""
Focused verification for event detail hero image priority.

User-reported bug/requirement:
Use Airtable 'Co-chair Graphic' as the /events/:recordId hero image when present;
otherwise fall back to 'Listing Picture'.

Run with:
  python /app/tests/event_image_priority_verification.py
"""

import asyncio
import json
import os
import time
from typing import Any, Dict

import requests
from playwright.async_api import async_playwright


BASE_URL = os.environ.get("PREVIEW_URL", "https://program-network.preview.emergentagent.com").rstrip("/")
FORUM_ID = "rec5Vr1VneQNZQ75N"
EXCHANGE_ID = "recayFKrBhjV8bjNx"


def _valid_url(value: Any) -> bool:
    return isinstance(value, str) and value.startswith(("https://", "http://"))


def fetch_event(record_id: str) -> Dict[str, Any]:
    response = requests.get(
        f"{BASE_URL}/api/events/{record_id}",
        headers={"Cache-Control": "no-cache"},
        params={"qa_ts": int(time.time() * 1000)},
        timeout=30,
    )
    return {
        "status_code": response.status_code,
        "json": response.json() if response.headers.get("content-type", "").startswith("application/json") else None,
    }


def verify_backend() -> Dict[str, Any]:
    forum = fetch_event(FORUM_ID)
    exchange = fetch_event(EXCHANGE_ID)

    assert forum["status_code"] == 200, f"Forum API returned {forum['status_code']}"
    assert exchange["status_code"] == 200, f"Exchange API returned {exchange['status_code']}"

    forum_data = forum["json"]
    exchange_data = exchange["json"]

    assert _valid_url(forum_data.get("co_chair_graphic")), "Forum co_chair_graphic is not a valid URL"
    assert _valid_url(forum_data.get("listing_picture")), "Forum listing_picture is not a valid URL"
    assert (
        forum_data["co_chair_graphic"] != forum_data["listing_picture"]
    ), "Forum co_chair_graphic should be a different URL than listing_picture for this verification record"

    assert not exchange_data.get("co_chair_graphic"), "Exchange co_chair_graphic should be null/missing/empty"
    assert _valid_url(exchange_data.get("listing_picture")), "Exchange listing_picture is not a valid URL"

    return {
        "forum": {
            "id": forum_data.get("id"),
            "title": forum_data.get("event_title"),
            "co_chair_graphic": forum_data.get("co_chair_graphic"),
            "listing_picture": forum_data.get("listing_picture"),
        },
        "exchange": {
            "id": exchange_data.get("id"),
            "title": exchange_data.get("event_title"),
            "co_chair_graphic": exchange_data.get("co_chair_graphic"),
            "listing_picture": exchange_data.get("listing_picture"),
        },
    }


async def _hero_info(page, record_id: str) -> Dict[str, Any]:
    await page.goto(f"{BASE_URL}/events/{record_id}?qa_ts={int(time.time() * 1000)}", wait_until="networkidle")
    await page.locator('[data-testid="event-detail-title"]').wait_for(state="visible", timeout=30000)
    return await page.evaluate(
        """() => {
            const img = document.querySelector('[data-testid="event-detail-page"] .bg-white.rounded-2xl img');
            const errors = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'))
                .map(el => el.textContent).join(', ');
            if (!img) return {found: false, errors};
            return {
                found: true,
                src: img.currentSrc || img.src,
                attrSrc: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                errors,
            };
        }"""
    )


async def verify_frontend(api_evidence: Dict[str, Any]) -> Dict[str, Any]:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})

        forum_hero = await _hero_info(page, FORUM_ID)
        expected_forum = api_evidence["forum"]["co_chair_graphic"]
        forbidden_forum = api_evidence["forum"]["listing_picture"]
        assert forum_hero["found"], f"Forum hero image not found; errors={forum_hero.get('errors')}"
        assert forum_hero["src"] == expected_forum, {
            "message": "Forum hero src did not use co_chair_graphic",
            "actual": forum_hero["src"],
            "expected": expected_forum,
        }
        assert forum_hero["src"] != forbidden_forum, "Forum hero incorrectly used listing_picture despite co_chair_graphic"
        assert forum_hero["naturalWidth"] > 1 and forum_hero["naturalHeight"] > 1, "Forum hero image did not load"

        exchange_hero = await _hero_info(page, EXCHANGE_ID)
        expected_exchange = api_evidence["exchange"]["listing_picture"]
        assert exchange_hero["found"], f"Exchange hero image not found; errors={exchange_hero.get('errors')}"
        assert exchange_hero["src"] == expected_exchange, {
            "message": "Exchange hero src did not fall back to listing_picture",
            "actual": exchange_hero["src"],
            "expected": expected_exchange,
        }
        assert exchange_hero["naturalWidth"] > 1 and exchange_hero["naturalHeight"] > 1, "Exchange hero image did not load"

        await browser.close()

    return {"forum_hero": forum_hero, "exchange_hero": exchange_hero}


async def main() -> None:
    result: Dict[str, Any] = {"base_url": BASE_URL}
    try:
        backend = verify_backend()
        result["backend"] = backend
        result["frontend"] = await verify_frontend(backend)
        result["verdict"] = "passed"
    except Exception as exc:  # noqa: BLE001 - test runner should print assertion context
        result["verdict"] = "failed"
        result["error"] = repr(exc)
        raise
    finally:
        print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    asyncio.run(main())