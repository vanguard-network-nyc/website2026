"""Focused UI verification for program detail card width parity.

Measures the first program Text Block card and program Testimonial card on
/programs/next-generation-general-counsel against the Ann Kappler testimonial
card on /networking at a 1280x900 viewport.
"""

import asyncio
import json
from playwright.async_api import async_playwright


PREVIEW = "https://form-debug-8.preview.emergentagent.com"


async def rect_for(page, selector):
    return await page.evaluate(
        """(selector) => {
            const el = document.querySelector(selector);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
                left: Math.round(r.left),
                right: Math.round(r.right),
                width: Math.round(r.width),
                top: Math.round(r.top),
                bottom: Math.round(r.bottom),
                className: el.className
            };
        }""",
        selector,
    )


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})

        await page.goto(f"{PREVIEW}/programs/next-generation-general-counsel", wait_until="domcontentloaded")
        await page.wait_for_timeout(1500)
        await page.locator("[data-testid='program-text-block'] > div > div").first.wait_for(state="visible", timeout=15000)

        program = {
            "textCard": await rect_for(page, "[data-testid='program-text-block'] > div > div"),
            "testimonialCard": await rect_for(page, "[data-testid='program-testimonial'] > div > div"),
        }

        await page.goto(f"{PREVIEW}/networking", wait_until="domcontentloaded")
        await page.wait_for_timeout(1500)
        await page.locator("text=Ann Kappler").first.wait_for(state="visible", timeout=15000)
        networking = await page.evaluate(
            """() => {
                const exact = Array.from(document.querySelectorAll('div'))
                    .find(el => el.childElementCount === 0 && el.textContent.trim() === 'Ann Kappler');
                const card = exact ? exact.closest('.shadow-lg') : null;
                if (!card) return null;
                const r = card.getBoundingClientRect();
                return {
                    left: Math.round(r.left),
                    right: Math.round(r.right),
                    width: Math.round(r.width),
                    top: Math.round(r.top),
                    bottom: Math.round(r.bottom),
                    className: card.className
                };
            }"""
        )

        result = {
            "viewport": {"width": 1280, "height": 900},
            "program": program,
            "networkingAnnKapplerCard": networking,
        }
        print(json.dumps(result, indent=2))

        assert program["textCard"] and program["testimonialCard"] and networking
        assert program["textCard"]["left"] == networking["left"]
        assert program["textCard"]["right"] == networking["right"]
        assert program["testimonialCard"]["left"] == networking["left"]
        assert program["testimonialCard"]["right"] == networking["right"]

        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())