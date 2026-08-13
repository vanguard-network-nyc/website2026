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
- **2026-02-13** Signup deep-link URLs made consistent — modal now auto-opens on `?signup=1`, `?signup=1&formOverride=<key>`, OR `?formOverride=<key>` alone. Closing the modal strips both params so a reload of the clean URL no longer re-opens the modal. Fixes inconsistent "first visit opens, second visit doesn't" bug.
- **2026-02-13** Form keys renamed to hyphenated series-based ids: `csc-form`, `gcf-form`, `lsceof-form`, `gcx-form`, `rmx-form`, `lsceox-form`, `nggc-nomination-form`. Updated everywhere (`server.py` FORM_CONFIGS + SERIES_TO_FORM + phone validation list; all frontend form components; `EventDetailsPage.js` FORM_VARIANTS + SERIES_TO_FORM_KEY).
- **2026-02-13** NGGC "More details" link updated to `https://members.thevanguardnetwork.com/next-gen-gc`.
- **2026-02-13** NGGC nomination form — success view now says "Thank you! If you would like to nominate a second candidate please submit the form again." with a **Submit another nomination** button that resets the form to blank. Google Sheets write confirmed (append to `NOMINATIONS` tab).
- **2026-02-13** Signup form dispatcher (NGGC series → Google Sheets) confirmed working end-to-end. `GOOGLE_SERVICE_ACCOUNT_JSON_B64` + `SIGNUP_SHEET_ID` present in `/app/backend/.env`.
- **2026-02-13** NGGC events on `/upcoming-events` continue to link out externally via "More Details" (NGGC not in `INTERNAL_DETAILS_SERIES`). Pending future work: dedicated `/next-gen-gc-program` landing page that then links to the NGGC form.
- **2026-02-19** Homepage image-slider custom controls (prev / play-pause / next) — JS-driven RAF animation; supports manual shift and pause without losing position. Subtle pill-style buttons, fully accessible (aria-labels, data-testids).
- **Prior** Membership form CORS fix (`allow_credentials=False`).
- **Prior** `/api/newsroom` pagination (removed `maxRecords: 100`) + `httpx` timeout 5s→30s.
- **Prior** `/general-counsel-advisory` page built with full SEO (OG tags, VideoObject + Service schema, sitemap entry).
- **Prior** Homepage slider populated with 7 GC Forum 2026 images + SEO alt tags.
- **Prior** Tom Sabatino, Ken Banta, Tony Powe, Dick Mosher content updates.

## Roadmap / Backlog

### P1
- **[NEXT — tomorrow]** Build the dedicated Programs pages (starting with NGGC / Next Gen GC). Each program page will host program details and CTA into its associated signup form (e.g. NGGC → `nggc-nomination-form`). Requirements TBD from user.
- Build a dedicated `/next-gen-gc-program` landing page for the NGGC program; from there, link into the NGGC nomination form. (Until then, NGGC events on `/upcoming-events` keep external "More Details" URLs.)
- Add `/general-counsel-advisory` link to Advisory dropdown nav (waits for user go-live confirmation; currently hidden but routable).
- Remove temporary `Clear-Site-Data` meta tag from `/app/frontend/public/index.html`.

### Not needed / cancelled
- Additional form variants for DKL, NLP, NLX, SIHCX, SUSX — user confirmed these are outdated and not in use (2026-02-13).

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
