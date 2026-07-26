# IMPLEMENTATION_PLAN.md — Mavoltage Website

## Overview

| Phase | Scope | Target |
|---|---|---|
| **Phase 1** | Modularize prototype, deploy live on free Netlify hosting | **Today** |
| Phase 2 | Swap in real project photos, real testimonials, remaining social links, address | When founder supplies content |
| Phase 3 | Custom domain (`mavoltage.co.tz`), analytics, final Lighthouse/accessibility audit | After Phase 2 |
| Phase 4 | Future enhancements (blog, CMS, multilingual, etc. — see PROJECT.md) | Backlog, not scheduled |

This document only fully specifies **Phase 1**. Do not start Phase 2 work until Phase 1's acceptance criteria all pass and the founder has supplied Phase 2 content.

---

## Phase 1 — Full Scope (Complete Today)

### Goal
Take the existing single-file prototype and ship it as a **live, working, free-hosted website** at a Netlify URL, with the code properly modularized into the production file structure — not just a local preview.

### Task 1 — Port the prototype into the production file structure

Split the single-file `index.html` prototype into:

```
mavoltage-website/
├── index.html
├── 404.html
├── README.md
├── robots.txt
├── sitemap.xml
├── netlify.toml
├── AGENT.md
├── PROJECT.md
├── PROGRESS.md
├── IMPLEMENTATION_PLAN.md
├── assets/
│   ├── css/
│   │   ├── main.css          # variables, reset, base typography
│   │   ├── components.css    # buttons, nav, cards, forms, badges
│   │   ├── sections.css      # hero, about, services, projects, testimonials, contact, footer
│   │   └── responsive.css    # all @media rules
│   ├── js/
│   │   ├── main.js           # init / wiring only
│   │   ├── nav.js            # hamburger, scroll-spy, sticky header
│   │   ├── animations.js     # scroll reveal, counters
│   │   └── form.js           # contact form validation + submit
│   ├── images/
│   │   ├── hero.jpg          # extracted from the base64 embed, served as a real file
│   │   └── og-cover.jpg
│   └── icons/
│       ├── logo.png          # extracted from the base64 embed
│       └── favicon.png
└── docs/
    └── QA-CHECKLIST.md
```

**Rule:** the prototype currently embeds the hero photo and logo as base64 data URIs directly in the CSS/HTML. For production, extract them to real files in `assets/images/` and `assets/icons/` and reference them normally (`background-image: url('assets/images/hero.jpg')`, `<img src="assets/icons/logo.png">`). This cuts page weight dramatically and lets the browser cache them separately.

**Do not change any visual design, copy, brand colors, or behavior while doing this split** — it is a refactor, not a redesign. If something looks different after the split, that's a bug, not an improvement.

### Task 2 — Add the missing production files

- `404.html` — reuse the site's header/footer and nav; simple centered message ("Page not found") with a button back to home. Same brand styling as the main site.
- `robots.txt` — allow all, point to sitemap:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://mavoltage.netlify.app/sitemap.xml
  ```
  (Update the domain once the custom domain is live in Phase 3.)
- `sitemap.xml` — list `index.html` and `404.html` is not included; add other real pages as they're created.
- `README.md` — what this project is, how to run it locally (it's static — "open index.html" or serve with any static server), file structure explanation, deployment instructions.
- `netlify.toml`:
  ```toml
  [build]
    publish = "."

  [[redirects]]
    from = "/*"
    to = "/404.html"
    status = 404
  ```

### Task 3 — Deploy to Netlify (free tier)

1. Initialize a git repository in the project folder if one doesn't exist (`git init`).
2. Create a `.gitignore` (at minimum: `.DS_Store`, `node_modules/` even though unused, editor folders).
3. Commit everything and push to a new GitHub repository.
4. In Netlify: **Add new site → Import an existing project → connect the GitHub repo.**
5. Build settings: no build command needed (it's static). Publish directory: `.` (repo root).
6. Deploy. Netlify will assign a free subdomain like `mavoltage.netlify.app` (or similar — Netlify auto-generates unless you rename the site in **Site settings → Site details → Change site name**).
7. Confirm HTTPS is active (Netlify provisions this automatically and free of charge).
8. Rename the Netlify site to something recognizable, e.g. `mavoltage-electrical`, so the URL reads `mavoltage-electrical.netlify.app`.

### Task 4 — Verify the live site

Open the live Netlify URL and check:
- [ ] Loads with no console errors
- [ ] Hero photo and logo display correctly (not broken image icons — this is the most common regression after extracting base64 assets to files)
- [ ] Nav, hamburger menu, and scroll-spy work
- [ ] Stat counters animate on scroll
- [ ] Contact form shows the "sending → sent" state (it's front-end only for now — no backend, so it doesn't actually send email yet; that's fine for Phase 1, just don't claim otherwise to the founder)
- [ ] WhatsApp float button opens `wa.me/255766133747` correctly
- [ ] Site is usable at 320px width (use browser dev tools device toolbar)
- [ ] 404.html displays correctly when visiting a nonexistent path on the live URL

### Phase 1 Acceptance Criteria (all must pass before calling Phase 1 done)

- [ ] Live, working Netlify URL exists and has been shared back to the founder
- [ ] Code is modularized per the file structure above (no more single giant inline `<style>`/`<script>` block)
- [ ] No visual or behavioral regressions vs. the approved prototype
- [ ] `PROGRESS.md` updated with the live URL, the GitHub repo URL, and today's date
- [ ] `docs/QA-CHECKLIST.md` created and filled in with actual pass/fail results, not left as a template

---

## Phase 2 (Not Started — Blocked on Founder Content)

Swap placeholder content for real content once supplied:
- Real project photos + captions (location, client, year) — replace the 3 illustrative project cards
- Real, permissioned testimonials — replace the 3 illustrative testimonial cards
- Facebook / X / LinkedIn URLs
- Full street address / P.O. Box
- TBS certification number/badge, if applicable
- Resolve the "15+ years" vs "10 years" question

## Phase 3 (Not Started)

- Connect custom domain `mavoltage.co.tz` in Netlify DNS settings
- Add an analytics tool (discuss options with founder — e.g. Netlify Analytics is a paid add-on, Plausible/Umami are privacy-friendly alternatives, Google Analytics is free but less private)
- Full Lighthouse audit on the production URL (not localhost) for Performance/Accessibility/SEO/Best Practices ≥ 95
- Full manual accessibility pass with a screen reader (VoiceOver or NVDA)

## Phase 4 (Backlog)

See `PROJECT.md` / `CONTEXT.md` future enhancements list — blog, CMS, multilingual (Swahili version), online quotation system, etc. Not scheduled.
