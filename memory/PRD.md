# The Vanguard Network — PRD

## Original Problem Statement
Maintain and extend the production marketing website for The Vanguard Network. The site is a React + FastAPI + Airtable-backed app serving advisory services, executive networks, programs, events, content, and newsroom content.

## Architecture
- **Frontend:** React, Tailwind, Framer Motion, react-helmet-async, react-slick (used in newsroom slider)
- **Backend:** FastAPI, httpx → Airtable CMS
- **Routing:** All API routes prefixed `/api`
- **Key files:**
  - `/app/frontend/src/components.js` (monolithic >3800 lines — HomePage, Header, BookPage, ImageSliderSection, etc.)
  - `/app/frontend/src/GeneralCounselAdvisoryPage.js`
  - `/app/frontend/src/SEO.js`
  - `/app/frontend/public/sitemap.xml`
  - `/app/backend/server.py`

## Implemented
- **2026-02-19** Homepage image-slider custom controls (prev / play-pause / next) — JS-driven RAF animation; supports manual shift and pause without losing position. Subtle pill-style buttons, fully accessible (aria-labels, data-testids).
- **Prior** Membership form CORS fix (`allow_credentials=False`).
- **Prior** `/api/newsroom` pagination (removed `maxRecords: 100`) + `httpx` timeout 5s→30s.
- **Prior** `/general-counsel-advisory` page built with full SEO (OG tags, VideoObject + Service schema, sitemap entry).
- **Prior** Homepage slider populated with 7 GC Forum 2026 images + SEO alt tags.
- **Prior** Tom Sabatino, Ken Banta, Tony Powe, Dick Mosher content updates.

## Roadmap / Backlog

### P1
- Add `/general-counsel-advisory` link to Advisory dropdown nav (waits for user go-live confirmation; currently hidden but routable).
- Remove temporary `Clear-Site-Data` meta tag from `/app/frontend/public/index.html`.

### P2
- Verify `/api/health` endpoint resolves on live production domain (thevanguardnetwork.com).
- Confirm Google Analytics tracking on production.

### Refactor (P2)
- Break `/app/frontend/src/components.js` (>3800 lines) into per-component files.

## 3rd-Party Integrations
- Airtable (CMS) — keys in `/app/backend/.env`

## Notes
- Production uses non-www domain with strict CORS (no `allow_credentials`).
- Nginx caches aggressively — allow propagation time for live deploys.
- `react-slick` used only by NewsroomSliderSection; the homepage image marquee is custom CSS+RAF (not react-slick).
