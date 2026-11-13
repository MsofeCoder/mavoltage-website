# IMPLEMENTATION_PLAN.md — Mavoltage Electrical Contractor Website

**Repo:** github.com/MsofeCoder/mavoltage-website
**Production:** mavoltage.netlify.app (branch: `master`)
**Development preview:** development--mavoltage.netlify.app (branch: `development`)
**Target custom domain:** mavoltage.co.tz (currently unconfirmed/offline)

---

## Phase 1 — Core Site Build (COMPLETE)

Status: ✅ Deployed to production (`master`)

- Modular CSS/JS files (main/components/sections/responsive)
- Image extraction and asset pipeline
- 404.html, robots.txt, sitemap.xml, README.md, netlify.toml
- Git / GitHub / Netlify setup
- Full page sections: hero, stats, about, services, projects, testimonials, CTA, contact form, footer
- Netlify Forms with honeypot spam protection

**Verified Lighthouse (development branch, median of multiple runs):**
Accessibility 100 · Best Practices 100 · SEO 100 · Performance ~87–88

---

## Phase 3 — Accessibility Audit (COMPLETE)

Status: ✅ Resolved, pulled forward and closed 2026-07-27

Five issues resolved:
- Main landmark
- Heading order
- Color contrast (`#475569` standard adopted)
- Footer link distinguishability
- Misplaced preload tag

Plus (this cycle): SEO metadata shortened to length limits, sitemap.xml updated, Netlify Forms honeypot accessibility attributes added, meta tag length fixes.

**Perf fix (2026-07-31):** hero.webp preload scoped to desktop only (`media="(min-width: 769px)"`) — eliminates unnecessary 145KB download on mobile viewports, which already receive `hero-768.webp`/`hero-320.webp` via CSS background-image swap. Verified via network request logging, not Lighthouse score (score is flat within noise, as expected for a single-resource fix).

---

## Phase 2 — Client Content (BLOCKED — pending client-supplied assets)

Status: 🔶 Deferred, placeholder cards live on production as a deliberate logged decision

| Blocker | Notes |
|---|---|
| Hero photo | Legacy hero flagged as unlicensed provenance — needs replacement, not just a swap |
| OG cover photo | Needs correct 1200×630px ratio; legacy also unlicensed |
| Project 1 industrial photo | **Known technical constraint:** a prior attempt to wire in project photos was reverted — 64px icon-sized containers are too small for wide industrial shots. Layout/sizing must be addressed *when* the real photo lands, not assumed to be a drop-in fix. |
| Real business phone number | Placeholder in JSON-LD. A fabricated number was previously caught and reverted — do not accept an agent-supplied number without explicit client confirmation. |
| Social URLs (FB, LinkedIn, X, YouTube, TikTok) | Instagram is the only confirmed real profile, already wired |
| Permissioned testimonials | Current testimonials are placeholder; need real client quotes with permission on file |

**Nothing in this phase should be marked complete without a client-supplied asset landing first.** Do not let agent self-reports advance this phase's status.

---

## Outstanding / Next Up

- [ ] Custom domain (mavoltage.co.tz) confirmation and DNS setup
- [ ] Resolve Phase 2 blockers as client assets arrive (one at a time, QA'd individually)
- [ ] Final merge to `master` once all client-dependent blockers are resolved and full QA is complete
- [ ] Re-run full Lighthouse suite (3+ runs, same environment) after Phase 2 content lands, since real photos will change payload size/LCP behavior

---

## Merge-to-master readiness checklist

Do not open the master PR until all of the following are true:

- [ ] All Phase 2 blockers resolved with real, client-approved assets
- [ ] No placeholder content remains (`#` links, fabricated data, stock icon "photos")
- [ ] Lighthouse: Accessibility 95+, Best Practices 95+, SEO 95+, Performance 95+ (median of 3+ same-environment runs)
- [ ] No console errors or warnings
- [ ] All internal/external links verified (no silent 404s)
- [ ] Contact form + WhatsApp integration functional end-to-end
- [ ] PROGRESS.md fully up to date with accurate, independently-verified entries
- [ ] Explicit founder (MAVOLTAGE) sign-off
