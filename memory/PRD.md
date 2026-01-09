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
- Event schema support added to `SEO.js`
- FAQ schema support added to `SEO.js`

### PWA Support (Complete) - January 2025 ✅
- Created `manifest.json` with app metadata
- Created `service-worker.js` for offline caching
- Added PWA meta tags to `index.html`
- Service worker registration in `index.html`

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
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # SEO robots
└── src/
    ├── components.js       # Main components file
    ├── SEO.js              # Reusable SEO component (with Event/FAQ schema)
    ├── OptimizedImage.js   # Lazy-loading image component
    ├── webVitals.js        # Web Vitals reporting
    └── App.js              # Main routing
```

---

## Prioritized Backlog

### P1 - High Priority
- Extract page components from `components.js` to separate files:
  - `AdvisoryPage` → `/pages/AdvisoryPage.js`
  - `TeamPage` → `/pages/TeamPage.js`
  - `ContactPage` → `/pages/ContactPage.js`
  - `BookPage` → `/pages/BookPage.js`
- Extract homepage sections to `/components/home/`

### P2 - Medium Priority
- Fix ESLint warnings (unescaped entities) in components.js
- Add Article schema to detail pages (ArticleDetailPage, NewsroomDetailPage, etc.)

### P3 - Low Priority / Future
- Add more PWA icons (logo192.png, logo512.png)
- Implement push notifications
- Add offline page

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `/frontend/src/SEO.js` | Reusable SEO component with Event/FAQ schema |
| `/frontend/src/components.js` | Main components file |
| `/frontend/public/manifest.json` | PWA manifest |
| `/frontend/public/service-worker.js` | PWA service worker |
| `/frontend/public/sitemap.xml` | Site map for search engines |
| `/frontend/public/robots.txt` | Crawler instructions |
| `/frontend/public/index.html` | Base HTML with PWA, GA4, GSC, Organization schema |

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
