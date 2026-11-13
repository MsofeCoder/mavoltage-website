# Current-state review — 4 November 2026

Review timezone: Africa/Dar_es_Salaam. Completed before redesign edits.

## Environment and baseline

- Root: `D:/ATZ/MC/FULL STUCK/MAVOLTAGE`; origin: https://github.com/MsofeCoder/mavoltage-website.git.
- Instructions: AGENT.md, PROJECT.md, IMPLEMENTATION_PLAN.md, README.md, PROGRESS.md; supplied handoff and historical audit. Vanilla static architecture retained.
- Branch: development, HEAD `df9cc15be8ab532de6714de2ebaf4d956b102557`; origin/development `9e81958d50092c2c8c57639fbdfed916a9897849`. Fetch succeeded. One unpublished CMS groundwork commit.
- No main exists locally or remotely. Local/remote master: `0d84df010e4a75e276b0a57a3fe234b57cab2042`. Do not rename master or invent main. Existing implementation plan identifies master as production; README and new handoff disagree. Actual host settings unavailable. Remote push and release blocked pending verification.
- Staged user changes: admin/index.html, admin/config.yml, three data JSON files, content-loader.js, homepage Identity integration. Untracked private signature/stamp files and handoff package. Preserve all. Staged patch and original homepage backed up outside repository in `C:/Users/HomePC/.codex/tmp/mavoltage-qa/`. Baseline archived there for isolated testing.
- No repository build/test dependencies. Python 3.14 and Node available; Chrome/Edge installed. Static serving and browser regression tests will be used.
- Public homepage HTTP request returned 200 / 27,826 bytes; browser observation follows in test evidence. Production deployment SHA not exposed. Do not equate local master with the active deployment.
- Follow-up read-only live browser observation confirmed the older English homepage and its four legacy scripts; no page errors on initial load. Delivered live form.js still uses timers/reset without fetch or XMLHttpRequest, unlike the newer local source. No form was submitted on production. See live-observation.json and local test-results/live-desktop.png. This observation was completed during verification, not backdated to the initial review.

## Inventory and verified findings

| Surface | Evidence | Finding / disposition |
|---|---|---|
| Homepage | index.html:11, 166, 261 | Existing canonical uses mavoltage.netlify.app; real local photos already integrated, unlike historical audit. Keep assets; use approved labelled application artwork for this release. |
| Form | assets/js/form.js:11–38; index.html:423 | Current local code really POSTs to Netlify, unlike historical timer-only audit. However it does not check response.ok, announces delivery on an HTTP error, and clears data. Replace with approved review/WhatsApp flow. |
| Navigation | assets/js/nav.js:48 | querySelector on literal # can throw. Replace active bindings, keep valid anchors. |
| Languages | index.html | English only; replace with SW-first complete EN switch. |
| CMS | admin/config.yml:1; index.html:539 | Staged Decap/git-gateway config targets development. Preserve files/auth integration. Data loader targets old DOM and uses innerHTML for testimonial text; do not run it against new bilingual content. CMS content editing needs a separately scoped bilingual schema migration. |
| Privacy / terms | privacy-policy.html:32; terms.html:32 | Placeholder wording and old form assumptions. Adapt to actual local preparation/explicit WhatsApp sharing. Preserve external routes. |
| 404 | 404.html:8–11 | Relative asset paths break at nested unknown URLs. Adapt to root-relative paths; preserve true 404 redirect. |
| Crawl / host | robots.txt, sitemap.xml, netlify.toml:2 | Existing public domain confirmed by live request and canonical. Publish='.' could expose untracked private files and handoff if uploaded indiscriminately. Add allowlisted output; never copy workspace root wholesale. Preview noindex must be context-specific. |
| Assets / claims | PROJECT.md; assets/images | Photos and CMS groundwork already exist. Statistics/testimonials and historical certifications are not independently substantiated for this release. Approved reference omits those claims. Keep source assets/data without presenting unsupported claims. |

## Migration mapping

| Existing element | Approved counterpart | Decision / risk |
|---|---|---|
| Header, hero, services | Approved header, artwork, expandable service details | Replace presentation, exact embedded logo extracted unchanged; no framework. |
| Projects/testimonials/stats | Labelled application illustrations | Adapt; avoid invented customer evidence. Original data/assets retained. |
| Netlify POST form | Prepare → review → explicit WhatsApp handoff | Replace only homepage handlers. Required phone, optional email, no network form submission. |
| Admin/Identity | Existing admin and recovery flow | Preserve staged work and auth callback; test local shell, hosted credentials unavailable. |
| Four CSS modules / legacy JS | Dedicated approved design stylesheet + page controller | Retain legacy files for other routes, avoid duplicate homepage bindings. |
| Legal/404/SEO | Existing URLs, truthful bilingual content | Adapt; legal copy describes behavior, no certification claim. |
| Production/preview | Isolated local preview | Defer push/PR until branch mapping can be verified. No production changes. |

## Implementation sequence and boundaries

Extract approved CSS/JS/logo; integrate metadata and Identity callback; strengthen service allowlist and draft invalidation; reconcile legal routes and 404; add safe packaging; exercise browser acceptance and performance; write release evidence. Leave user index staging intact until an explicit commit instruction under AGENT.md. Package instructions are implementation requirements, not an instruction to overwrite repository governance. No main/master merge, production deployment, or real enquiry is authorized.
