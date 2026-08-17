"""Focused Playwright verification for Logo Gallery centering and desktop logo size.

This script is intended to be run by the browser automation harness against:
https://program-network.preview.emergentagent.com/programs/next-generation-general-counsel
"""

try:
    await page.set_viewport_size({"width": 1280, "height": 900})
    await page.wait_for_load_state("domcontentloaded")
    await page.wait_for_timeout(1500)
    print("Page loaded at 1280x900")

    gallery = page.locator('[data-testid="program-logo-gallery"]').first
    await gallery.wait_for(state="visible", timeout=15000)
    await gallery.scroll_into_view_if_needed()
    await page.wait_for_timeout(500)
    print("Logo Gallery section visible")

    measurements = await page.evaluate("""() => {
        const section = document.querySelector('[data-testid="program-logo-gallery"]');
        if (!section) return {found: false, error: 'program-logo-gallery not found'};
        const imgs = Array.from(section.querySelectorAll('img'));
        const sectionRect = section.getBoundingClientRect();
        const imgRects = imgs.map((img, index) => {
            const r = img.getBoundingClientRect();
            return {
                index,
                alt: img.getAttribute('alt'),
                src: img.currentSrc || img.src,
                x: r.x,
                y: r.y,
                width: r.width,
                height: r.height,
                right: r.right,
                centerX: r.x + r.width / 2
            };
        }).sort((a, b) => a.x - b.x);
        const leftmost = imgRects[0] || null;
        const rightmost = imgRects[imgRects.length - 1] || null;
        const visualGroupCenter = leftmost && rightmost ? (leftmost.x + rightmost.right) / 2 : null;
        const sectionCenter = sectionRect.x + sectionRect.width / 2;
        return {
            found: true,
            section: {x: sectionRect.x, width: sectionRect.width, right: sectionRect.right, centerX: sectionCenter},
            imageCount: imgRects.length,
            images: imgRects,
            leftmost,
            rightmost,
            visualGroupCenter,
            centerDeltaPx: visualGroupCenter === null ? null : Math.abs(visualGroupCenter - sectionCenter),
            minImageHeight: imgRects.length ? Math.min(...imgRects.map(i => i.height)) : null,
            maxImageHeight: imgRects.length ? Math.max(...imgRects.map(i => i.height)) : null
        };
    }""")
    print(f"Measurements: {measurements}")

    if not measurements.get("found"):
        raise AssertionError(measurements.get("error"))
    if measurements.get("imageCount") != 3:
        raise AssertionError(f"Expected 3 logo images, found {measurements.get('imageCount')}")
    if measurements.get("centerDeltaPx") is None or measurements["centerDeltaPx"] > 20:
        raise AssertionError(f"Logo group not centered: center delta {measurements.get('centerDeltaPx')}px")
    if measurements.get("minImageHeight") is None or measurements["minImageHeight"] <= 80:
        raise AssertionError(f"Logo images not visibly larger enough: min height {measurements.get('minImageHeight')}px")

    print("PASS: Logo Gallery has 3 logos, group center is within ±20px, and all image heights are >80px")

except Exception as e:
    print(f"FAIL: {type(e).__name__}: {e}")
    raise