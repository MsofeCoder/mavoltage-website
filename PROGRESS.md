# PROGRESS.md — Mavoltage Website Progress Log

> Update this file at the end of every work session. Newest entry at the top. Be factual and specific — no marketing language.

---

## 2026-07-31 — SEO metadata, sitemap, Netlify Forms, and accessibility polish

**Status:** Closed out the last session's SEO/accessibility/forms work on the `development` branch. Committed locally, not yet pushed (3 commits ahead of `origin/development` at time of writing).

**Done this session (verified against `git diff development~3 -- index.html` and `sitemap.xml`):**
- SEO metadata updates: shortened `title` and `meta name="description"`, expanded keywords, fixed canonical URL, Schema.org JSON-LD corrected to `LocalBusiness` with Morogoro locality and Netlify URL, cleaned Instagram `sameAs` URL
- `sitemap.xml` updates: entries regenerated to match current pages/URLs
- Netlify Forms configuration: `data-netlify="true"` + `name="contact"` on the contact form, hidden `form-name` field
- Accessibility attribute additions: `netlify-honeypot="bot-field"` plus the hidden bot-field label with `aria-hidden` and `tabindex="-1"`
- Meta tag length fixes: title/OG/Twitter descriptions shortened to fit search-engine and social-card length limits

**Decisions made (and why):**
- Real project/service photos and real testimonials are NOT logged here as complete — they are not part of this session's diff and remain client-blocked per PROJECT.md
- Social links stay `#` placeholders with `<!-- TODO: awaiting client-provided URL -->` markers until the client supplies URLs

**Blocked / Needs Input:**
- Real project photos, permissioned testimonials, Facebook/X/LinkedIn URLs — all client-side
- Confirm "15+ vs 10 years" in hero badge copy before final copy lock

**Next action:** Push `development` to `origin` so the Netlify branch-deploy preview picks up this session's changes; no content work until client input arrives.

---

## 2026-07-27 — Image directory structure aligned with PROJECT.md spec

**Status:** Reorganized `assets/images/` to match the content-type subfolder layout. No content images exist yet — directories are ready to receive Phase 2 client-supplied photos.

**Done this session:**
- Created `assets/images/services/`, `assets/images/about/`, `assets/images/construction/`
- Removed empty `assets/images/hero/` and `assets/images/team/` (not in the spec)
- Confirmed no HTML/CSS `src` paths broke (hero variants and og-cover.jpg stay at `assets/images/` root)

**Current image directory layout:**
```
assets/images/
├── projects/          # Phase 2 — project card photos (currently icon-only placeholders)
├── services/          # Phase 2 — service photos (currently Font Awesome icons)
├── about/             # Phase 2 — about section photo (currently <i class="fas fa-bolt">)
├── construction/      # Backlog — future gallery page
├── hero.jpg/.webp     # Hero background (live, optimized WebP + JPEG)
├── hero-768.jpg/.webp # Responsive hero (768px)
├── hero-320.jpg/.webp # Responsive hero (320px)
└── og-cover.jpg       # Social share card
```

**Blocked / Needs Input:** All content directories are empty — awaiting client-supplied project photos, service photos, and about photo before wiring them into the HTML.

---

## 2026-07-27 — Phase 3 audit pulled forward and closed (development branch)

**Status:** Full Lighthouse + manual accessibility audit run against the `development` branch preview, all findings fixed and verified. Closed before Phase 2 content work starts, so structural issues don't compound with real photos/testimonials later.

**Done this session:**
- Added `<main id="main-content">` landmark; skip-link now targets it
- Fixed heading order: service/project card titles changed `<h4>` → `<h3>` (no visual change, styling re-targeted)
- Fixed color contrast: footer copyright text raised to `rgba(255,255,255,0.6)`; active nav link uses `--red-dark`
- Footer legal links (Privacy Policy / Terms) now underlined, not distinguished by opacity alone
- Hero image converted to WebP with responsive breakpoints (320/768px) + JPEG fallback, recompressed
- Preload tag for hero image: tested both "after CSS, no fetchpriority" vs. "removed entirely" with 3 Lighthouse runs per condition — preload wins at the median (88 vs 82) and on worst-case (77 vs 69), so it stays
- Removed stray temp artifacts (`lh_warm_desktop.json`, `lh_warm_mobile.json`, `test_fetch.html`) that had been accidentally tracked in git

**Final verified scores (development branch, desktop, Lighthouse):**
| Category | Score |
|---|---|
| Accessibility | 100/100 |
| Performance | 88 (median of 3 runs) — up from 78 original baseline |
| Best Practices | 100/100 |
| SEO | 100/100 |

**Decisions made (and why):**
- Kept `fetchpriority="high"`-free preload positioned after CSS in `<head>` rather than removing it — A/B tested with 3 runs per condition rather than trusting a single run, since free-tier Netlify + network jitter produces enough noise that single runs aren't reliable (this was caught mid-session when an early single-run comparison contradicted itself).

**Blocked / Needs Input:** none — this work item is fully closed.

**Next action:** No further work until Phase 2 content (real photos, testimonials, remaining social URLs) arrives from the client. This branch is a clean baseline to build Phase 2 on top of.

---

## 2026-07-27 — Phase 2 content deferred, placeholders stay live

**Status:** Decision made to keep the current placeholder project cards and testimonials live on production (`master`) as-is until the client supplies real photos, testimonials, and social links. This is intentional, not a bug — flagging it here so it doesn't get treated as "final" content by mistake later.

**Decisions made (and why):**
- Placeholder project cards (Morogoro Industrial Park / Dar es Salaam Office Tower / Mikocheni Luxury Homes) and placeholder testimonials (James Mwangi / Aisha Kombo / Salim Hassan) remain live on `mavoltage.netlify.app` — better to have a complete-looking site now than empty sections while waiting on the client.
- No further Phase 2 work (content swap) starts until the client actually hands over real photos, testimonials, and remaining social URLs.

**Blocked / Needs Input:**
- Real project photos (location, client, year) — client-side
- Permissioned testimonials (name, company, quote) — client-side
- Facebook / X / LinkedIn URLs, if/when available — client-side

**Next action:** Nothing content-dependent to do right now. Reasonable use of agent time in the meantime: pull the Phase 3 Lighthouse/accessibility audit forward and run it against the `development` branch preview — it needs no client content and surfaces real issues early.

---

## 2026-07-26 — Branching workflow established

**Status:** Phase 1 confirmed live and closed. Before starting Phase 2, a `development` branch was created so real-content changes (photos, testimonials, social links) can be built and previewed without touching the live production site.

**Done this session:**
- Created `development` branch from `master`, pushed to GitHub
- Configured Netlify branch deploys so `development` gets its own preview URL, separate from `mavoltage.netlify.app` (which stays pinned to `master`)
- Added a Git Workflow rule to `AGENT.md`: no direct commits/pushes to `master`; all Phase 2+ work happens on `development`; merges to `master` require a reviewed Pull Request and explicit founder approval

**Decisions made (and why):**
- Chose branch-deploy previews over a separate Netlify site so there's only one project to manage, and the preview URL disappears automatically if the branch is ever deleted

**Blocked / Needs Input:** none for this step.

**Next action:** Resume Phase 2 on the `development` branch once real project photos, testimonials, and remaining social URLs are supplied.

---

## 2026-07-26 — Phase 1 kickoff (carried in from prior chat-based work)

**Status:** Visual prototype exists as a single-file `index.html` (built in a prior Claude session, not yet in this repo). This session is scaffolding the repo structure so DeepSeek-V4 can take over inside opencode.

**Done already (in the prototype, needs to be ported into this repo's file structure):**
- Full homepage: hero, stats counter, about, services grid, projects grid, testimonials, CTA banner, contact form, footer
- Real brand colors, Inter font, Font Awesome icons
- Real hero background photo and real transparent-background logo embedded
- Real phone number (`+255 766 133 747`) and real Instagram link wired everywhere
- Contact form has accessible labels, `aria-live` status region
- Meta description, Open Graph, Twitter Card tags, Schema.org `ElectricalContractor` JSON-LD
- Skip-to-content link, visible focus states, `prefers-reduced-motion` support
- Solid-fill icon badges (not pale tints) for stronger contrast — this is now the standing convention for all icon badges

**Known open items (see PROJECT.md for full list):**
- Confirm "15+ years" vs "10 years" in hero badge copy
- Placeholder testimonials and project cards are illustrative only, not real client content
- Facebook / X / LinkedIn are placeholder `#` links
- Full street address not yet provided

**Blocked / Needs Input:**
- Nothing blocking Phase 1 (frontend + free Netlify hosting) — all Phase 1 tasks can proceed with current information.
- Phase 2+ (real photos, real testimonials, custom domain) is blocked on founder-supplied content.

**Next action:** Execute `IMPLEMENTATION_PLAN.md` Phase 1 today — modularize the prototype into the proper file structure, push to GitHub, deploy to Netlify on the free tier, confirm the live URL works on mobile and desktop.

---

## Template for future entries

```
## YYYY-MM-DD — [short title]

**Status:** [one line]

**Done this session:**
- 

**Decisions made (and why):**
- 

**Blocked / Needs Input:**
- 

**Next action:**
- 
```
