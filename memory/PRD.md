# The Vanguard Network - Product Requirements Document

## Overview
The Vanguard Network is an executive leadership platform serving C-suite executives with networking, advisory, and development services.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: Airtable (headless CMS)
- **Email**: Resend
- **Hosting**: Kubernetes-based deployment

---

## What's Been Implemented

### SEO Overhaul (Complete) - January 2025

#### Phase 1: Meta Tags ✅
- Integrated `react-helmet-async` for dynamic meta tags
- Created reusable `SEO.js` component
- Added unique titles, descriptions, Open Graph, and Twitter tags to all 24 pages

#### Phase 2: Technical SEO ✅
- Created `sitemap.xml` with all site URLs
- Created `robots.txt` with crawl instructions
- Added canonical URL support to SEO component

#### Phase 3: Performance ✅
- Implemented lazy loading for below-the-fold images (`OptimizedImage.js`)
- Added eager loading for hero images
- Resource hints (`preconnect`, `prefetch`)
- Core Web Vitals tracking (`web-vitals` package)
- CSS performance enhancements

#### Phase 4: Content & Structure ✅
- Verified H1 tags across all pages
- Improved image alt text
- Added "Related Resources" sections for internal linking

#### Phase 5: Indexing & Analytics ✅
- Google Search Console verification (ID: `tcX72XxRj5pAEP7CQWP1Fp7muOFN8K0j2na5sXI7vDI`)
- Google Analytics 4 integration (ID: `G-89EDHX7HBD`)

#### Phase 6: Advanced SEO - Schema Markup ✅
- Organization schema in `index.html`
- WebPage schema via `SEO.js` component
- Event schema support added to `SEO.js` and implemented on `/upcoming-events`
- FAQ schema support added to `SEO.js` and implemented on `/networking` and `/programs`

### PWA Support (Complete) - January 2025 ✅
- Created `manifest.json` with app metadata
- Created `service-worker.js` for offline caching
- Added PWA meta tags to `index.html`
- Service worker registration in `index.html`
- Created PWA icons: `logo192.png` and `logo512.png`

### Content Updates (Complete) - January 2025
- Updated GCL page CTA to link to: `https://members.thevanguardnetwork.com/network-details-general-counsel/general-counsel-network/r/recGzsDNANlxLtqIC`

---

## Current Architecture

```
/app/frontend/
├── public/
│   ├── index.html          # PWA meta tags, schema, analytics
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # PWA service worker
│   ├── logo192.png         # PWA icon (192x192)
│   ├── logo512.png         # PWA icon (512x512)
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # SEO robots
└── src/
    ├── components.js       # Main components file
    ├── SEO.js              # SEO component (Event/FAQ/Article schema)
    ├── NetworkingV2Page.js # Networking page with FAQ schema
    ├── ProgramsV2.js       # Programs page with FAQ schema
    ├── UpcomingEventsPage.js # Events page with Event schema
    ├── OptimizedImage.js   # Lazy-loading image component
    ├── webVitals.js        # Web Vitals reporting
    └── App.js              # Main routing
```

---

## Schema Implementation Details

### Event Schema (`/upcoming-events`)
Dynamically generates Event schema for the first upcoming event with:
- name, startDate, endDate
- location (virtual or physical)
- description
- organizer (The Vanguard Network)

### FAQ Schema (`/networking` and `/programs`)
**Networking Page FAQs:**
1. What is The Vanguard Network?
2. Who can join the peer networks?
3. What benefits do members receive?
4. How do the peer exchanges work?
5. Is membership confidential?

**Programs Page FAQs:**
1. What types of leadership programs are offered?
2. How long are the leadership programs?
3. Who leads the leadership programs?
4. Can programs be customized?
5. What is the format of the programs?

---

## Prioritized Backlog

### P1 - High Priority
- Extract page components from `components.js` to separate files (careful refactoring)

### P2 - Medium Priority
- Add Article schema to detail pages
- Fix ESLint warnings in components.js

### P3 - Low Priority / Future
- Implement push notifications for PWA
- Add offline fallback page
- Server-side rendering for better SEO schema visibility

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `/frontend/src/SEO.js` | SEO component with Event/FAQ/Article schema |
| `/frontend/src/NetworkingV2Page.js` | Networking page with FAQ schema |
| `/frontend/src/ProgramsV2.js` | Programs page with FAQ schema |
| `/frontend/src/UpcomingEventsPage.js` | Events page with Event schema |
| `/frontend/public/manifest.json` | PWA manifest |
| `/frontend/public/service-worker.js` | PWA service worker |
| `/frontend/public/logo192.png` | PWA icon 192x192 |
| `/frontend/public/logo512.png` | PWA icon 512x512 |

---

## Third-Party Integrations
- **Airtable**: Headless CMS for team, events, newsroom content
- **Resend**: Transactional email service
- **RSS2JSON API**: Substack RSS feed
- **SoundCloud**: Podcast embeds
- **Google Search Console**: Site verification & indexing
- **Google Analytics 4**: Traffic analytics
- **PostHog**: Product analytics

---

## Credentials
- Google Search Console: `tcX72XxRj5pAEP7CQWP1Fp7muOFN8K0j2na5sXI7vDI`
- Google Analytics 4: `G-89EDHX7HBD`
