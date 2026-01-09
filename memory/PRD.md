# The Vanguard Network - Product Requirements Document

## Original Problem Statement
Executive leadership network website with SEO optimization, content management via Airtable, and professional UI/UX.

## Current State
- **Frontend**: React with Framer Motion, Tailwind CSS, react-router-dom
- **Backend**: FastAPI
- **CMS**: Airtable (headless)
- **Integrations**: Resend (email), RSS2JSON (Substack), SoundCloud (podcasts), Google Analytics 4, Google Search Console

## Completed Features
- ✅ Advanced SEO with react-helmet-async
- ✅ JSON-LD Schema (Article, Event, FAQ) on relevant pages
- ✅ sitemap.xml and robots.txt
- ✅ PWA foundation (manifest.json, service-worker.js, icons)
- ✅ Google Analytics 4 integration
- ✅ GCL CTA link update on GlobalCounselLeadersPage

## Known Issues

### P0 - Page Transition Scroll Bug (UNRESOLVED - DO NOT WORK ON)
- **Description**: When navigating between pages after scrolling down, pages load at old scroll position then visibly jump to top
- **Status**: Multiple fix attempts failed. User requested to stop working on this.
- **Attempted fixes**:
  1. useLayoutEffect in ScrollToTop component
  2. Centralizing scroll logic in App.js
  3. Custom ScrollLink component
  4. Removing AnimatePresence (broke design, reverted)
  5. PageWrapper component with useLayoutEffect (latest attempt - inconsistent results)
- **Test Results**: Only 2/6 pages pass scroll test consistently

### P2 - Executive Advisory Team Card Alignment (DEPRIORITIZED)
- **Description**: Card alignment issue on /advisory page
- **Status**: User deprioritized this issue

## Future Tasks (Backlog)
1. Fix ESLint warnings (`npx eslint . --fix`)
2. Refactor monolithic components.js into individual page components
3. Expand Schema Markup (FAQ schema on more pages)
4. Enhance PWA (offline fallback page)

## Architecture
```
/app/frontend/src/
├── App.js              # Main routing, PageWrapper (scroll fix attempt)
├── components.js       # Monolithic file with multiple pages (needs refactor)
├── SEO.js              # Meta tags and schema support
├── useArticleSchema.js # Custom hook for Article schema
├── index.css           # Global styles, scroll-behavior: auto
└── [Page Components]   # Individual page files
```

## Third-Party Integrations
- Airtable (CMS)
- Resend (transactional email)
- RSS2JSON API (Substack feed)
- SoundCloud (podcast embedding)
- Google Search Console & GA4

---
Last Updated: December 2025
