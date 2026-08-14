"""
Focused Playwright verification script for program detail section width/spacing bug.

Run inside an async Playwright context with an existing `page` object, or adapt into
the local test runner. This mirrors the browser-automation checks performed on the
preview environment at 1280x900.
"""

BASE_URL = "https://form-debug-8.preview.emergentagent.com"

async def run(page):
    await page.set_viewport_size({"width": 1280, "height": 900})

    await page.goto(f"{BASE_URL}/programs/next-generation-general-counsel", wait_until="networkidle", timeout=60000)
    await page.wait_for_timeout(1500)
    program_data = await page.evaluate("""() => {
        const section = document.querySelector('[data-testid="program-text-block"]');
        const testimonial = document.querySelector('[data-testid="program-testimonial"]');
        const sectionWrap = section ? section.querySelector(':scope > div') : null;
        const card = sectionWrap ? sectionWrap.querySelector(':scope > div') : null;
        const testimonialWrap = testimonial ? testimonial.querySelector(':scope > div') : null;
        const testimonialCard = testimonialWrap ? testimonialWrap.querySelector(':scope > div') : null;
        const rectObj = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            return {left: r.left, right: r.right, width: r.width, top: r.top, bottom: r.bottom, height: r.height,
                    className: el.className, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom,
                    paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight,
                    borderRadius: cs.borderRadius, boxShadow: cs.boxShadow, borderTopWidth: cs.borderTopWidth,
                    backgroundColor: cs.backgroundColor};
        };
        return {
            textWrapper: rectObj(sectionWrap),
            textCard: rectObj(card),
            testimonialWrapper: rectObj(testimonialWrap),
            testimonialCard: rectObj(testimonialCard)
        };
    }""")

    await page.goto(f"{BASE_URL}/networking", wait_until="networkidle", timeout=60000)
    await page.wait_for_timeout(1200)
    networking_data = await page.evaluate("""() => {
        const quote = Array.from(document.querySelectorAll('blockquote')).find(el => el.textContent.includes('What sets The Vanguard Network apart'));
        function closestByClassIncludes(el, text) {
          let cur = el;
          while (cur && cur !== document.body) {
            if (typeof cur.className === 'string' && cur.className.includes(text)) return cur;
            cur = cur.parentElement;
          }
          return null;
        }
        const testimonialCard = quote ? closestByClassIncludes(quote, 'rounded-xl') : null;
        const outer = testimonialCard ? closestByClassIncludes(testimonialCard, 'max-w-7xl') : null;
        const rectObj = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            return {left: r.left, right: r.right, width: r.width,
                    className: el.className, paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight,
                    borderRadius: cs.borderRadius, boxShadow: cs.boxShadow, borderTopWidth: cs.borderTopWidth,
                    backgroundColor: cs.backgroundColor};
        };
        return {outerWrapper: rectObj(outer), testimonialCard: rectObj(testimonialCard)};
    }""")

    print({"program": program_data, "networking": networking_data})
    return {"program": program_data, "networking": networking_data}