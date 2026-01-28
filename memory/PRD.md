# The Vanguard Network - Product Requirements Document

## Original Problem Statement
Executive leadership network website built with React frontend and FastAPI backend, featuring content from Airtable CMS. Core requirements include professional design, smooth navigation, SEO optimization, and accessible content library (articles, podcasts, videos, newsroom).

## Architecture
- **Frontend:** React 18 with React Router, Framer Motion animations, Tailwind CSS
- **Backend:** FastAPI with Airtable integration
- **Routing:** SPA with client-side routing, PageWrapper for scroll management
- **Styling:** Custom CSS + Tailwind, ScrollLink component for navigation

## What's Been Implemented

### January 28, 2026
- **Page Scroll Fix:** Fixed gradual scroll-up animation when navigating via footer links
  - Changed `scroll-behavior: smooth` to `auto` in App.css
  - Pages now load instantly at top position

### Previous Sessions
- Internal link behavior fix (ReactMarkdown components)
- SSL certificate diagnosis for production
- Privacy Policy and Terms of Use pages
- Complete content library (Articles, Podcasts, Videos)
- Newsroom with Airtable integration
- Membership application form
- Advisory services with tabbed interface
- Mobile-responsive navigation

## Prioritized Backlog

### P0 - Critical
- ✅ Page scroll issue resolved

### P1 - High Priority
- Remove redundant script from `/app/frontend/public/index.html`
- Verify "Source of Inquiry" field fix
- Fix ESLint warnings (`npx eslint . --fix`)

### P2 - Medium Priority
- Refactor `components.js` into individual component files
- Executive Advisory Team card alignment on `/advisory`

### P3 - Low Priority
- Expand Schema Markup
- Enhance PWA functionality

## Key Files
- `/app/frontend/src/App.js` - Main router and PageWrapper
- `/app/frontend/src/App.css` - Global styles (scroll behavior fix here)
- `/app/frontend/src/components.js` - Header, Footer, ScrollLink, major components
- `/app/frontend/src/PrivacyPage.js` - Privacy Policy
- `/app/frontend/src/TermsPage.js` - Terms of Use

## Known Issues
- Production environment may have SSL certificate issues (external team manages)
- `components.js` is monolithic and needs refactoring

## Deployment
User clicks "Save to GitHub" → CI/CD pipeline deploys to production at thevanguardnetwork.com
