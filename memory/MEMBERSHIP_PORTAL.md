# TVN Membership Portal — Living Project Doc

> **Purpose:** Single source of truth for the long-term project of migrating TVN's
> membership portal off Softr and into the native site at `thevanguard.network`.
> This is an intermittent build — kept here so any chat session can pick up context.

Last updated: 2026-02 (initial scope locked)

---

## Why we're building this

Current portal lives on Softr (`members.thevanguardnetwork.com`). Pain points:

- Sync errors with Airtable, frequent breakage
- Duplicate pages required to show member vs. public content
- Too many blocks/pages to manage
- User has no easy way to see where data on a page comes from (data source mapping)

**Goal:** Move the portal into the main React/FastAPI site for tighter integration,
cleaner navigation, faster interaction, and full transparency into data sources.

---

## Reference portals (the "blend" — LOCKED)

The final product borrows from four best-in-class executive membership portals,
wrapped in TVN's existing design system (navy → cyan gradient, existing fonts,
existing block system).

| Reference | What we borrow | Applied to |
|---|---|---|
| **Chief** (member area) | Feature set + member UX — warm editorial cards, directory filtered by cohort/city, "your events" tab, resources library | Overall functional model, member/directory cards |
| **World 50 / G100** | Visual tone — sparse dark cards, minimal chrome, prestige feel, network-siloed content | Aesthetic language across all portal pages |
| **Aspen Institute** | Resources hub layout — elegant PDF/video/playbook library with topic filtering | `/members/resources` page specifically |
| **YPO** | Information architecture — sidebar nav, directory search by industry, event RSVP + attendee lists | Portal navigation model & directory filters |

**Not** Circle.so / Mighty Networks aesthetic — too casual, off-brand.

---

## Data sources (source of truth)

- **Airtable base:** `appqyKMZnFfgSuJKt`
- **Signups table:** `tblFoAP3i8RJQLimp`

Fields already present in this table (verified from a sample record):
- `Name`, `Email`, `Bio Image` (attachment)
- `Position (from Members Vanguard)`, `Company (from Members Vanguard)`, `LastName (from Members Vanguard)`
- `Access Level (for user groups) (from Members Vanguard)` — e.g., "Full Access"
- `Membership level (Softr)` — e.g., "premium"
- `Forum/Event signed up (from Members Vanguard)` — array of event codes
- `Magic Link`, `Magic link created/changed` — Softr-generated (not reused; we'll issue fresh tokens)
- `password (from Members)` — Softr legacy, not used
- `Elsie Link` — Softr-only

New signups continue going through the existing application form → Airtable →
admin flips `Access Level` to Full Access → they can log in. No self-signup.

---

## Auth model

- **Magic-link login** — email in → link out → JWT session cookie
- Gated to Signups table (only whitelisted emails can log in)
- Email provider: **Resend** (tentative — user leaning this way)
- From address: `noreply@thevanguard.network` (SPF/DKIM to set up)
- 30-day rolling session, "log out everywhere" button
- No Google sign-in (user requirement — members may not have Google accounts)

---

## Page-by-page scope

| Route | What it does | Phase |
|---|---|---|
| `/login` | Email input → sends magic link | 1 |
| `/auth/verify?token=…` | Validates token, sets session, redirects | 1 |
| `/members` | Personalized dashboard: upcoming RSVP'd events, new members, curated resources, quick links | 1 |
| `/members/profile` | View + edit own profile (bio, headshot upload, position, company, LinkedIn, phone) — writes back to Airtable | 1 |
| `/members/directory` | Searchable/filterable member grid — filters by network, industry, city. Only shows members in the same network(s) as the viewer | 1 |
| `/members/directory/:memberSlug` | Public member profile (bio, credentials, headshot, upcoming events, LinkedIn) | 1 |
| `/members/events` | "My Events" — upcoming + past. Existing event detail pages now unlock attendee lists when logged in | 2 |
| `/members/resources` | Gated library — PDFs, videos, playbooks — filtered by Access Level. Reuses `Blocks.js` | 2 |
| `/members/ai` | Elsie replacement — chat UI powered by Claude Sonnet 5 + RAG on all Airtable/site content | 3 |
| `/admin` | Admin-only: view all members, edit any profile, resend magic link, revoke access | 3 |
| `/admin/data-map` | Admin-only: live map of every route → Airtable base/table/field. Fixes the "I can't see where data comes from" problem | 1 |
| `?debug=1` (all pages) | Admin-only overlay: shows Airtable record ID + field name feeding each block, with direct edit link | 1 |

---

## Phase plan

**Phase 1 — MVP (~1 week of build time)**
- Magic-link auth (Resend + JWT cookie)
- Dashboard, profile view+edit, directory (network filtering), member detail pages
- `/admin/data-map` + `?debug=1` inline data-source overlay
- *Deliverable: members can log in, browse network, edit profile. Data-source transparency is live.*

**Phase 2 — Events + Resources (~4-5 days)**
- RSVP flow, "My Events" page
- Attendee lists on past events (unlocked when logged in)
- Gated Resources library with per-network access

**Phase 3 — AI + Admin (~4-5 days)**
- Elsie replacement: Claude Sonnet 5 chat + RAG over Airtable/site content, streaming, cited sources
- Admin panel: bulk manage members, resend magic links, audit log

**Phase 4 — Messaging (later, when ready)**
- Direct messages between members

**After Phase 3 → retire Softr entirely.**

---

## Tech stack

| Layer | Choice |
|---|---|
| Auth | Resend (magic-link email) + JWT HTTP-only cookies + Airtable whitelist check |
| Storage | Airtable = source of truth. MongoDB only for session tokens + audit logs |
| Uploads | Emergent Object Storage → URL back to Airtable attachment field |
| AI | Claude Sonnet 5 (via Emergent LLM key) + OpenAI embeddings for RAG |
| Emails | Resend (`noreply@thevanguard.network`) |
| Frontend | Existing React + Tailwind + Framer Motion + `Blocks.js` |
| Backend | Existing FastAPI, new `/api/members/*` router |

---

## Data-source transparency (fixes the Softr complaint)

Three deliverables to make sure the user always knows where every piece of content comes from:

1. **`/admin/data-map` page** — every route lists its Airtable base/table/field mapping with clickable "view raw record" links.
2. **`?debug=1` inline overlay** — append `?debug=1` to any URL; every block gets a small badge with Airtable table + record ID + direct-edit link.
3. **`/app/memory/DATA_MAP.md`** — checked-in markdown reference, updated on every data-pull change, human-readable and git-diffable.

---

## Open questions (to confirm before Phase 1 kickoff)

- [ ] Domain: portal at `/members` (same domain) or `members.thevanguard.network` (subdomain)?
- [ ] Extra profile fields beyond current Airtable (LinkedIn URL? phone? city?)
- [ ] Resources library: do source files exist somewhere, or start fresh?
- [ ] AI assistant: members-only, or also available to logged-out visitors?
- [ ] Any members to hide from the directory (VIPs, board)?
- [ ] Email provider final decision (Resend confirmed?)

---

## Progress log

- **2026-02** — Scope locked (this doc). Reference blend chosen (Chief + World 50 + Aspen + YPO). Awaiting Phase 1 kickoff signal from user.
