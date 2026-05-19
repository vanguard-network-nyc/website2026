# The Vanguard Network — PRD

## Original Problem Statement
Corporate website for The Vanguard Network using React frontend + FastAPI backend + Airtable as headless CMS. The site serves 2,000+ senior executives with content pages, advisory services, membership applications, and event information.

## Architecture
- **Frontend**: React, Tailwind CSS, Framer Motion, react-helmet-async
- **Backend**: FastAPI (Python), httpx for Airtable API calls
- **Data Source**: Airtable (headless CMS)
- **Deployment**: Emergent Platform → thevanguardnetwork.com

## What's Been Implemented

### May 19, 2026 — Homepage Slider Images
- Added 7 new GC Forum May 2026 photos to homepage image slider
- Photos spaced randomly among 20 existing images (27 total)
- Each image has unique descriptive SEO alt text

### May 18, 2026 — GC Advisory Page Content Updates
- 12 content/copy changes applied (title, subtitle, section headings, advisor bios)
- Advisor order changed to: Sabatino, Robinson, Banta, Gauster, González, Mosher, Szmagala, Watras
- Dick Mosher added as 8th advisor with headshot and LinkedIn

### May 13, 2026 — New General Counsel Advisory Page
- Created `/general-counsel-advisory` page matching `/advisory` design
- 8 advisor cards with headshots, LinkedIn links, credentials
- Video embed with thumbnail and replay overlay
- Full SEO: page title, description, VideoObject + Service schemas, sitemap entry, breadcrumbs
- Responsive on desktop, tablet, and mobile
- Hidden from navigation (to be added to Advisory dropdown when ready)

### April 10, 2026 — Newsroom Pagination Fix
- Removed `maxRecords: 100` cap from Airtable fetch
- Added pagination loop with 30s httpx timeout
- All 120+ newsroom items now load correctly

### March 30, 2026 — Headshot Replacements
- Ken Banta: new 2026 headshot on advisory, book, LawAssociates pages
- Tony Powe: new 2026 headshot (team page pulls from Airtable)
- Tom Sabatino: title updated to "Interim General Counsel, Tractor Supply Company"

### March 18, 2026 — CORS Fix
- Removed `allow_credentials=True` from CORSMiddleware
- Fixed spec violation causing "Failed to fetch" on live site cross-origin requests

### March 3, 2026 — Production Airtable Fix
- Re-added .env files to git tracking
- All content pages restored on live domain

## Known Issues
- Production `www` subdomain does NOT proxy `/api/*` to backend (nginx serves static React files)
- `Clear-Site-Data` meta tag still in index.html (P1 — should be removed)
- `components.js` is monolithic (~3800 lines) and needs refactoring

## Backlog
- P1: Add `/general-counsel-advisory` to Advisory dropdown navigation
- P1: Remove `Clear-Site-Data` meta tag from index.html
- P1: Verify membership form + health endpoint on live after deploy
- P2: Verify Google Analytics tracking on production
- P2: Refactor monolithic `components.js` into individual component files

## Key Files
- `/app/frontend/src/GeneralCounselAdvisoryPage.js` — New GC Advisory page
- `/app/frontend/src/components.js` — Homepage, Advisory, Book, Header, slider
- `/app/frontend/src/MembershipApplicationPage.js` — Membership form
- `/app/backend/server.py` — All API endpoints, Airtable logic, CORS config
- `/app/frontend/public/sitemap.xml` — Includes all pages
