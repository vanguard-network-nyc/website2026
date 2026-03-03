# The Vanguard Network - Product Requirements Document

## Original Problem Statement
Executive leadership network website built with React frontend and FastAPI backend, featuring content from Airtable CMS. Core requirements include professional design, smooth navigation, SEO optimization, and accessible content library (articles, podcasts, videos, newsroom).

## Architecture
- **Frontend:** React 18 with React Router, Framer Motion animations, Tailwind CSS
- **Backend:** FastAPI with Airtable integration
- **Data Source:** Airtable (headless CMS) for articles, podcasts, videos, events, team, newsroom
- **Routing:** SPA with client-side routing, PageWrapper for scroll management
- **Styling:** Custom CSS + Tailwind, ScrollLink component for navigation
- **Caching:** Service Worker (network-first), no-cache headers on all Airtable endpoints

## What's Been Implemented

### March 3, 2026 — Production Airtable Fix (Complete — needs deploy)
- **Root Cause:** Commit `70b4582` (Dec 29, 2025) deleted `backend/.env` and `frontend/.env` from git AND added `*.env` to `.gitignore`. Production backend had no `AIRTABLE_ACCESS_TOKEN`, causing all Airtable endpoints to return `[]`.
- **How found:** `thevanguardnetwork.com/api/articles` returned `[]` (empty); production bundle had `REACT_APP_BACKEND_URL: "https://thevanguardnetwork.com"` baked in; `git log -- backend/.env` revealed the deletion.
- **Fixes Applied:**
  - Added `!backend/.env` and `!frontend/.env` exceptions to `.gitignore` (at end of file to override all `*.env` patterns)
  - Force-added both `.env` files back to git tracking (`git add -f backend/.env frontend/.env`)
  - Files are now staged — they will be committed and deployed on next "Save to GitHub"
- **Deployment Note:** `REACT_APP_BACKEND_URL` is automatically overridden by Emergent platform to `https://thevanguardnetwork.com` during production build. `AIRTABLE_ACCESS_TOKEN` and other custom secrets come from committed `backend/.env`.
- **After deploy:** `thevanguardnetwork.com` backend will have `AIRTABLE_ACCESS_TOKEN` → all Airtable endpoints return real data → all pages load correctly on live domain

### January 28, 2026
- **External Link Behavior Fix (Complete):** Fixed all link behavior across the site
- **Page Scroll Fix:** Fixed gradual scroll-up animation when navigating via footer links

### Previous Sessions
- Internal link behavior fix (ReactMarkdown components)
- SSL certificate diagnosis for production
- Privacy Policy and Terms of Use pages
- Complete content library (Articles, Podcasts, Videos)
- Newsroom with Airtable integration
- Membership application form
- Advisory services with tabbed interface
- Mobile-responsive navigation
- React Bug Fix: Resolved "Minified React error #310" on PodcastDetailPage.js
- Caching Overhaul: Service worker + no-cache middleware
- Timezone Fix for UpcomingEventsPage
- Advisory Page: Executive Advisory Team horizontal cards, video section
- Homepage: Replay button, de-duplication for Real World Insights
- Programs Page: Updated CTA links
- Google Analytics: Updated Measurement ID to G-KN752VTWEN

## Prioritized Backlog

### P1 - High Priority
- Remove the temporary `Clear-Site-Data` meta tag from `/app/frontend/public/index.html` (was meant to be temporary, forces cache clear on every visit — should be removed now that caching is fixed)
- Verify Google Analytics tracking on production domain `thevanguardnetwork.com` after deployment

### P2 - Medium Priority
- Refactor `components.js` into individual component files (it's a 3800+ line monolith)
- Executive Advisory Team card alignment on `/advisory`
- Remove redundant scripts from `index.html`

### P3 - Low Priority
- Expand Schema Markup
- Enhance PWA functionality
- Fix ESLint warnings

## Key Files
- `/app/frontend/src/App.js` - Main router and PageWrapper
- `/app/frontend/src/App.css` - Global styles
- `/app/frontend/src/components.js` - MONOLITH: Header, Footer, AdvisoryPage, TeamPage, HomePage2, NewContentLibrarySection, NewsroomSliderSection, and many more
- `/app/frontend/src/ArticlesPage.js` - Articles listing page
- `/app/frontend/src/PodcastsPage.js` - Podcasts listing page
- `/app/frontend/src/VideosPage.js` - Videos listing page
- `/app/frontend/src/UpcomingEventsPage.js` - Events page with timezone support
- `/app/backend/server.py` - FastAPI with all Airtable endpoints + NoCacheMiddleware
- `/app/frontend/public/service-worker.js` - Network-first service worker (v3)
- `/app/frontend/public/index.html` - GA4, service worker registration, Clear-Site-Data tag

## Known Issues
- Production environment may have SSL certificate issues (external team manages)
- `components.js` is monolithic and needs refactoring
- `Clear-Site-Data` meta tag still present in index.html (should be removed, P1)

## Deployment
User clicks "Save to GitHub" → CI/CD pipeline deploys to production at thevanguardnetwork.com

## Key API Endpoints (All return Airtable data, all have no-cache headers)
- `/api/articles` → 70 articles
- `/api/podcasts` → 100 podcasts
- `/api/videos` → 194 videos
- `/api/events` → 35 events
- `/api/team` → 11 team members
- `/api/newsroom` → 96 newsroom articles
