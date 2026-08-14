"""
Focused visual verification script for Program Sections light-blue-box bug.

This is the exact Playwright logic used via the browser automation harness for
the 1280x900 preview check on:
https://form-debug-8.preview.emergentagent.com/programs/next-generation-general-counsel
"""

async def run(page):
    import io
    from PIL import Image

    await page.set_viewport_size({"width": 1280, "height": 900})
    await page.goto(
        "https://form-debug-8.preview.emergentagent.com/programs/next-generation-general-counsel",
        wait_until="networkidle",
        timeout=60000,
    )
    await page.wait_for_selector('[data-testid="program-page"]', timeout=30000)
    await page.wait_for_selector('text=Eligibility Requirements', timeout=30000)

    section_summary = await page.evaluate("""() => {
      const textBlocks = Array.from(document.querySelectorAll('[data-testid="program-text-block"]'));
      return textBlocks.map((sec, index) => {
        const h = sec.querySelector('h2');
        const card = sec.querySelector(':scope > div > div');
        const cs = card ? getComputedStyle(card) : null;
        return {
          index,
          heading: h ? h.textContent.trim() : '',
          cardClass: card ? card.className : null,
          backgroundImage: cs ? cs.backgroundImage : null,
          backgroundColor: cs ? cs.backgroundColor : null,
          borderColor: cs ? cs.borderColor : null
        };
      });
    }""")

    await page.evaluate("""() => {
      const sec = Array.from(document.querySelectorAll('[data-testid="program-text-block"]'))
        .find(el => el.innerText.includes('Eligibility Requirements'));
      const card = sec.querySelector(':scope > div > div');
      card.scrollIntoView({block: 'center', inline: 'nearest'});
    }""")
    await page.wait_for_timeout(800)

    rect_info = await page.evaluate("""() => {
      const sec = Array.from(document.querySelectorAll('[data-testid="program-text-block"]'))
        .find(el => el.innerText.includes('Eligibility Requirements'));
      const card = sec.querySelector(':scope > div > div');
      const r = card.getBoundingClientRect();
      const cs = getComputedStyle(card);
      return {
        cardClass: card.className,
        rect: {x:r.x, y:r.y, width:r.width, height:r.height},
        computedBackgroundImage: cs.backgroundImage,
        computedBackgroundColor: cs.backgroundColor,
        computedBorderColor: cs.borderColor
      };
    }""")

    png_bytes = await page.screenshot(type="png", full_page=False)
    img = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    width, height = img.size
    r = rect_info["rect"]

    def clamp(v, lo, hi):
        return max(lo, min(hi, int(round(v))))

    def avg_patch(cx, cy, radius=3):
        cx = clamp(cx, 0, width - 1)
        cy = clamp(cy, 0, height - 1)
        vals = []
        for yy in range(max(0, cy - radius), min(height, cy + radius + 1)):
            for xx in range(max(0, cx - radius), min(width, cx + radius + 1)):
                vals.append(img.getpixel((xx, yy)))
        return tuple(round(sum(v[i] for v in vals) / len(vals), 2) for i in range(3))

    samples = {
        "card_center": avg_patch(r["x"] + r["width"] / 2, r["y"] + r["height"] / 2),
        "card_padding": avg_patch(r["x"] + r["width"] - 80, r["y"] + 80),
        "page_above": avg_patch(r["x"] + r["width"] / 2, r["y"] - 14),
        "page_below": avg_patch(r["x"] + r["width"] / 2, r["y"] + r["height"] + 14),
    }
    return {"sections": section_summary, "eligibility": rect_info, "samples": samples}