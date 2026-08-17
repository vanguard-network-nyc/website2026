# The Vanguard Network — PRD

## Product
The Vanguard Network is an executive leadership organization site. The web app is a React SPA + FastAPI backend acting as a headless CMS driven by Airtable. Public visitors browse Programs, Networks, Events, and Content; qualified users apply via forms that route to Airtable/HubSpot.

## Core Architecture
- **Frontend**: React + Tailwind + Framer Motion. Route templates: `ProgramPage`, `NetworkPage`, `EventDetailsPage`. Shared UI blocks in `programs/Blocks.js`. Reusable modal forms in `signup-forms/`.
- **Backend**: FastAPI (`/api/*`) fetches Airtable (base `appqyKMZnFfgSuJKt`) and synthesizes structured payloads (11-block sections) for program/network pages, plus events endpoints.
- **CMS discipline**: Airtable is source of truth. Backend safely handles inconsistent field casing across tables.

## Key routes
- `/`, `/advisory`, `/networks`, `/networks/:slug`, `/programs`, `/programs/:slug`, `/upcoming-events`, `/past-events`, `/events/:recordId`, `/past-events/:recordId`, `/articles`, `/podcasts`, `/videos`, `/newsroom`, `/application`, `/team`, `/contact`, `/privacy`, `/terms`.

## Recent changes
### 2026-02 (current)
- **Event Detail bottom CTA**: Added a second "I would like to attend" CTA block at the bottom of `/events/:recordId` (mirrors the top CTA behavior — modal for series-mapped events, otherwise link to registration_url). Hidden on `/past-events/:recordId`. Event title is bolded inside the copy.
- **Favicon**: Added `<link rel="icon">` (192 + 512 + shortcut icon) to `public/index.html` so every SPA route shows the favicon. Bumped service worker cache to `v4` to bust stale caches.

### 2026-02 (earlier this session)
- Dynamic `/networks/:slug` pages auto-synthesizing 7 sections (Hero, Access, Partners, Chair, Advisors, Members, Bottom CTA) from Airtable (Programs, Networks, VG Contacts, Network Partners, Members Vanguard).
- Extracted `MembershipApplicationForm` with `compact` prop for modal-in-page usage.
- Breadcrumbs + dynamic SEO/Event/Breadcrumb schema JSON-LD across pages.
- Per-network overrides: hide Sabatino on Next Gen GC, hide Sevi on GC advisors, hide bottom CTA on Senior In-House.

## Backlog (P0 → P2)
- **P2** Refactor `/app/frontend/src/components.js` (3900+ lines) into per-component files.
- **P2** Move hardcoded network exclusions (`NETWORK_CHAIR_EXCLUDE`, `NETWORK_ADVISOR_EXCLUDE`, `NETWORK_HIDE_BOTTOM_CTA`) from `server.py` to Airtable fields for scalability.

## 3rd-party integrations
- Airtable (PAT), Google Analytics (G-KN752VTWEN), PostHog.

## Testing
- Latest test reports: `/app/test_reports/iteration_9.json` (bottom CTA bold event title verified). `iteration_8.json` (bottom CTA + favicon verified across 19 routes).
