# The Vanguard Network — PRD

## Product
The Vanguard Network is an executive leadership organization site. The web app is a React SPA + FastAPI backend acting as a headless CMS driven by Airtable, with real form integrations to Google Sheets. Public visitors browse Programs, Networks, Events, and Content; qualified users apply via forms that route to Airtable/HubSpot/Sheets.

## Core Architecture
- **Frontend**: React + Tailwind + Framer Motion. Route templates: `ProgramPage`, `NetworkPage`, `EventDetailsPage`, `LSCEOGrantPage`. Shared UI blocks in `programs/Blocks.js`. Reusable modal forms in `signup-forms/`.
- **Backend**: FastAPI (`/api/*`) fetches Airtable and synthesizes structured payloads (11-block sections) for program/network pages, plus events, form submissions, and Google Sheets writes.
- **CMS discipline**: Airtable is source of truth. Backend safely handles inconsistent field casing across tables.

## Key routes
- `/`, `/advisory`, `/networks`, `/networks/:slug`, `/programs`, `/programs/:slug`, `/upcoming-events`, `/past-events`, `/events/:recordId`, `/past-events/:recordId`, `/articles`, `/podcasts`, `/videos`, `/newsroom`, `/application`, `/team`, `/contact`, `/life-sciences-ceo`, `/life-sciences-ceo/grant`, `/privacy`, `/terms`.

## Recent changes (2026-02, current session)
- **LSCEO Grant landing page** at `/life-sciences-ceo/grant` — hero, subheading, sponsor logo strip, eligibility body, dual CTA (Apply modal + Recommend-a-colleague mailto).
- **LSCEO Grant application form** — two-branch conditional flow (Section 1 eligibility gate → Section 2 full form → success). Writes directly to Google Sheet `1Ah_lT77AbuLxAorAUf4-AGMUXncK9OgXLDe_X4OI54Y` tab `2026` via the shared service account. Bypasses Apps Script entirely to avoid Google Workspace domain restrictions.
- **Backend endpoint** `POST /api/lsceo-grant/submit` — maps payload keys → sheet columns, returns HTTP 200 with `{ok, error?}` for Cloudflare compatibility. Regression test at `/app/backend/tests/test_lsceo_grant.py`.
- **Event Detail page**: bottom "I would like to attend" CTA (bold event title), favicon fixes across all routes (multi-size ICO + PNGs + service-worker cache bump to v8), audience URL filter `/upcoming-events?audience=…`, styled See-More buttons.
- **GC Exchange participants override** — swapped People Gallery for Logo Gallery pulled from CRM base with deduped companies.
- **Favicon** regenerated from user-supplied TVN wordmark with circular mask.

## Recent changes (2026-02, earlier this session)
- Dynamic `/networks/:slug` pages auto-synthesizing sections from Airtable.
- Extracted `MembershipApplicationForm` with `compact` prop for modal usage.
- Breadcrumbs + dynamic SEO/Event/Breadcrumb JSON-LD.
- Per-network overrides (hide Sabatino/Sevi, hide bottom CTAs on Senior In-House).

## Backlog (P0 → P2)
- **P2** — Build LSCEO Grant Recipients (past cohort) page (`/life-sciences-ceo/grant-recipients`). Source TBD (Airtable or static).
- **P2** — Add server-side Pydantic validation to `/api/lsceo-grant/submit` payload.
- **P2** — Refactor `/app/frontend/src/components.js` (3900+ lines) into per-component files.
- **P2** — Move hardcoded network exclusions from `server.py` to Airtable fields.

## 3rd-party integrations
- Airtable (PAT).
- Google Sheets via service account (`vanguard-forms-writer@vanguard-forms-for-emergent.iam.gserviceaccount.com`) — sheets: `SIGNUP_SHEET_ID`, `LSCEO_GRANT_SHEET_ID`.
- Google Analytics (G-KN752VTWEN), PostHog.

## Testing
- Latest test report: `/app/test_reports/iteration_11.json` — LSCEO Grant submission passes 100% (backend + frontend end-to-end, incl. sheet read-back).
- Regression test file: `/app/backend/tests/test_lsceo_grant.py`.
