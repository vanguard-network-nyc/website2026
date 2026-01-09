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
- Article schema for detail pages:
  - `ArticleDetailPage.js`
  - `NewsroomDetailPage.js`
  - `PodcastDetailPage.js`
  - `VideoDetailPage.js`
- Custom `useArticleSchema.js` hook for dynamic JSON-LD injection

### Code Refactoring (In Progress) - January 2025

#### Layout Components Extracted ✅
- `GCLBanner.js` → `/components/layout/GCLBanner.js`
- `Header.js` → `/components/layout/Header.js`
- `Footer.js` → `/components/layout/Footer.js`
- Index file: `/components/layout/index.js`

---

## Current Architecture

```
/app/frontend/src/
├── components/
│   ├── layout/
│   │   ├── GCLBanner.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── index.js
│   └── ui/              # Shadcn components
├── pages/               # (Future: extracted page components)
├── components.js        # Monolithic file (partially refactored)
├── SEO.js              # Reusable SEO component
├── OptimizedImage.js   # Lazy-loading image component
├── useArticleSchema.js # Article schema hook
├── webVitals.js        # Web Vitals reporting
└── App.js              # Main routing
```

---

## Prioritized Backlog

### P0 - Critical
None - All critical SEO tasks complete

### P1 - High Priority
- Complete extraction of page components from `components.js`:
  - `AdvisoryPage` → `/pages/AdvisoryPage.js`
  - `TeamPage` → `/pages/TeamPage.js`
  - `ContactPage` → `/pages/ContactPage.js`
  - `BookPage` → `/pages/BookPage.js`
- Extract homepage sections to `/components/home/`:
  - `NewHero`
  - `NewStatsSection`
  - `NewWhatWeDoSection`
  - `NewAboutSection`
  - `NewContentLibrarySection`
  - `ImageSliderSection`
  - `NewsroomSliderSection`

### P2 - Medium Priority
- Fix ESLint warnings in `components.js` (unescaped entities)
- Move animation variants to shared utilities file
- Clean up unused imports

### P3 - Low Priority / Future
- Add more structured data types (Event, FAQ, etc.)
- Progressive Web App (PWA) support
- Image optimization with WebP format

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `/frontend/src/SEO.js` | Reusable SEO meta tags component |
| `/frontend/src/useArticleSchema.js` | Article JSON-LD schema hook |
| `/frontend/src/components.js` | Main components file (being refactored) |
| `/frontend/src/components/layout/` | Extracted layout components |
| `/frontend/public/sitemap.xml` | Site map for search engines |
| `/frontend/public/robots.txt` | Crawler instructions |
| `/frontend/public/index.html` | Base HTML with GA4, GSC, Organization schema |

---

## Third-Party Integrations
- **Airtable**: Headless CMS for team, events, newsroom content
- **Resend**: Transactional email service
- **RSS2JSON API**: Substack RSS feed
- **SoundCloud**: Podcast embeds
- **Google Search Console**: Site verification & indexing
- **Google Analytics 4**: Traffic analytics

---

## Credentials
- Google Search Console: `tcX72XxRj5pAEP7CQWP1Fp7muOFN8K0j2na5sXI7vDI`
- Google Analytics 4: `G-89EDHX7HBD`
