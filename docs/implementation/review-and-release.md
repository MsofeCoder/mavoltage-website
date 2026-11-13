# Development review — 4 November 2026

## Review candidate

- Branch: `development`. Baseline and unchanged HEAD: `df9cc15be8ab532de6714de2ebaf4d956b102557`.
- Candidate: working-tree source recorded in `candidate-files.sha256`; this is not a new commit. All original staged changes remain byte-identical. Backup patch SHA256: `044fd433fa218c42ec9881b5577a40feb43fe9d5b64511622796656b36a1ed5c`.
- Local preview: http://127.0.0.1:8082. Restart with `python tools/build_site.py` then `python tools/preview.py`.
- Initial review: [current-state-review.md](current-state-review.md).
- No commit, push, PR, hosted preview or production deployment has been made. AGENT.md says: **“Never commit or push without explicit \"approved\" instruction from a task prompt. Draft/apply changes and stop for review unless the prompt explicitly says to commit.”** The direct user request asks for implementation; the handoff's suggested commit workflow is treated as attached implementation guidance, not as an override of that repository rule. Request approval to commit the concrete reviewed result after implementation.
- Hosting blocker: remote branches are `master` and `development`; no `main`. The handoff names main, historical project records name master. Actual Netlify branch mapping and protection settings are unavailable. Do not rename branches, push, or merge until verified. Production remains untouched.

## What changed

| Files | Purpose |
|---|---|
| index.html, assets/css/approved.css, assets/js/approved.js | Approved responsive hierarchy, SW-first/EN content, expandable service details, labelled application artwork, process, company information, FAQ, enquiry and footer. |
| assets/js/enhance.js | Establish enhanced navigation styles before first paint; eliminated the measured initial mobile layout shift. |
| assets/icons/approved-logo.png, approved-favicon.png | Exact bytes extracted from approved prototype. Logo SHA256 `228d86a3b0dbd84e2ae0c4130e1ed10d5d2116c5f2fdb57c5fdaa98319e15ef7`; 512×512. No redraw or distortion. |
| assets/images/approved-share.png | Local 1200×630 share asset made from supplied logo and brand palette; replaces unknown-provenance share photograph on homepage. |
| assets/js/identity-entry.js | Preserve invite/recovery/account callback and admin redirect; load widget only for account tokens, outside normal enquiry sessions. |
| privacy-policy.html, terms.html, assets/js/legal.js | Bilingual, real description of local preparation, explicit WhatsApp handoff, language preference, and direct agreement on work. Existing URLs retained. |
| 404.html | Bilingual error page, true-404 deployment behavior retained, root-relative assets/links work on nested paths, placeholder social links removed. |
| robots.txt, sitemap.xml | Confirmed existing Netlify domain, legal URLs, admin crawler exclusion. |
| tools/build_site.py, tools/preview.py, netlify.toml | Allowlisted public artifact, preserved admin/assets, isolated preview noindex, branded local 404s. No hosting account or branch changes. |
| tests/, .gitignore, README.md, PROGRESS.md, docs/implementation/ | Reproducible checks, evidence, local review instructions and release boundaries. |

## Intentional differences and preserved work

- Honor repository brand colors: red #DC2626, yellow #F59E0B, blue #2563EB. Approved navy/warm-white layout retained; service badges use repository-required solid fills. Link colors were darkened where necessary for contrast.
- Extract CSS/JS/logo into maintainable local files; remove prototype's stale inline CSP hashes and prototype-only noindex. Preview noindex is applied by build context/HTTP headers instead.
- Strengthen service allowlist, invalidate a previously prepared link on edits, and fix a prototype focus/change-event race that hid drafts prepared with Enter. Preserve plain-text message rendering, required readable phone, optional email, and explicit sending inside WhatsApp.
- Preserve all legacy CSS/JS/assets/data and staged admin files. Old homepage menu/form/content-loader scripts are no longer bound to the new DOM. There is one enquiry handler.
- **CMS limitation:** existing Decap collections still edit the retained legacy JSON. They are not connected to the new bilingual homepage; publishing those edits will not change its approved copy. A bilingual CMS mapping is a separate follow-up. Admin shell/auth boundaries are preserved; no new permissions or backend introduced.
- No unsupported testimonials, statistics, certification claims, new coverage areas or completed-project assertions added. Approved illustrations remain labelled examples.

## Verification evidence

Raw reproducible output is in ignored `test-results/` to keep generated browser reports out of source. Browser reports identify exact installed versions. The reviewed source manifest identifies the working-tree candidate in place of a new SHA.

| IDs | Result | Evidence / limits |
|---|---|---|
| F01–F19, F21–F22, F24 | PASS in automated browser scenarios | 40 named checks each in Chrome, Edge and Firefox (120 successful checks across Chromium and Gecko engines). Covers empty/invalid input, bilingual messages, phone boundaries/separators, optional email, lengths/service tampering, plain-text script-like input, exact encoded destination, review/edit state, Enter, clipboard rejection, retained fields, storage, menu Escape, service selection, no-JS fallback. No real enquiry sent. |
| F20 | PASS locally | Dialog Escape/focus restoration; legal routes render and translate. Hosting rewrites separately unverified. |
| F23 | BLOCKED for hosted auth; local preservation PASS | Admin/config and legacy data copies byte-identical. Mocked recovery-token widget initialization and login redirect passed. Real Netlify Identity/Git Gateway access cannot be tested without hosting/session access. |
| V01 | PASS automated widths; visual review at 390/1440 | SW/EN at 320, 390, 768, 1024, 1440: no document overflow. Mobile and desktop full-page captures; inspected hero comparisons and enquiry/footer crops. |
| V02 | PASS visual comparison | Matching 390/1440 reference/integrated screenshots; exact logo extracted. Original reference's stale CSP meta removed only in test response to render intended JavaScript enhancement; source reference unmodified. Brand adaptations listed above. |
| V03 | PASS reflow-equivalent widths; BLOCKED actual UI zoom | 720/360 CSS-pixel widths exercise representative 200%/400% reflow. Physical browser zoom and real-device checks not claimed. |
| V04–V05 | PASS covered keyboard/semantic checks | Skip-to-main, first-invalid focus, menu Escape, dialogs, labels, required/optional association; axe WCAG A/AA scans in SW/EN report zero violations. Screen-reader audit/full WCAG conformance not claimed. |
| V06 | PASS | Reduced-motion scroll becomes auto; key measured contrast ratios below; axe reports zero contrast violations. |
| V07 | PASS homepage | No page errors, failed requests, external requests or form transmissions during ordinary enquiry tests. Identity uses separate token-triggered integration. |
| V08 | PASS local | Canonical/OG/schema, robots/sitemap, legal routes, nested 404 and local root-relative assets. Netlify deployed behavior awaits a safe hosted preview. |
| V09 | PASS local measurements | Three runs per condition with the same localhost/Windows/Chrome/mobile simulated-throttling setup. All runs and medians below. Production field performance not measured. |
| V10 | PASS local build/syntax/scope checks | Python packaging regression checks all four contexts; JS syntax; HTML balance; no duplicate old handlers; staged patch checksum preserved. No new runtime framework dependencies. |
| V11 | PASS local artifact isolation; BLOCKED host mapping | Preview HTTP noindex and disallow robots verified. Production-context build retains indexability. No push because actual host branch mapping is unverified. |
| V12 | PASS working-tree scope; no production diff applied | Only intended public source/tools/tests/docs changes; private files remain untracked outside artifact. No commit or main/master changes. |

Screenshots: [SW desktop](../../test-results/sw-1440.png), [SW mobile](../../test-results/sw-390.png), [EN desktop](../../test-results/en-1440.png), [EN mobile](../../test-results/en-390.png), [mobile comparison](../../test-results/compare-390.png), [desktop comparison](../../test-results/compare-1440.png). In comparisons, reference is on the left. Latest browser source screenshots are regenerated by tests; comparison composites capture the layout review before the final small footer polish.

Firefox can restore native form controls on reload independently of site storage. F21 verifies that the site stores only language, sessionStorage is empty, the prepared draft does not survive reload, and a fresh tab starts with blank fields. Browser autofill/history behavior is separately disclosed in the privacy copy. No site persistence of personal input was introduced.

### Measured performance and contrast

Lighthouse mobile emulation: 412×823, simulated throttling, 4× CPU slowdown, Chrome 156 on this Windows machine. Local baseline is archived committed HEAD, not the older deployed site. Baseline used port 8081; redesigned source used 8080. Baseline still loads external fonts/icons; those network timings and background QA can introduce noise. These are local diagnostic measurements, not a controlled benchmark or production promise. Full settings and results: [performance-results.json](performance-results.json).

| Metric | Baseline runs (median) | Integrated runs (median) |
|---|---|---|
| Performance | 89 / 58 / 76 (**76**) | 100 / 100 / 100 (**100**) |
| Accessibility | 100 / 100 / 100 (**100**) | 100 / 100 / 100 (**100**) |
| Best practices | 96 / 92 / 96 (**96**) | 100 / 100 / 100 (**100**) |
| SEO | 100 / 100 / 100 (**100**) | 100 / 100 / 100 (**100**) |
| LCP ms | 2949 / 7119 / 5463 (**5463**) | 1250 / 1291 / 1271 (**1271**) |
| CLS | .00661 / .00661 / .00661 | 0 / 0 / 0 |

WCAG relative-luminance contrast calculations: white on brand red 4.83:1; ink/white 16.10:1; muted/white 6.29:1; muted/warm-white 5.92:1; gold/navy 7.84:1; dark-blue links/white 8.04:1. Automated scans supplement visual/keyboard checks and do not certify full conformance.

## Release and approval

Manual PR title: **Implement approved MAVOLTAGE bilingual website redesign**.

Suggested PR body: “Implement the approved SW-first/English static redesign and review-before-WhatsApp enquiry flow. Phone is required; email optional. Preserve admin/auth source and assets, reconcile legal/404/SEO routes, and package only public files with context-specific preview noindex. See docs/implementation for baseline review, test evidence, CMS limitation and local performance. No real enquiry was sent. Host mapping, real auth and owner review are required before production.”

Head: development. Base: resolve the handoff's main versus actual master before creating any PR; do not invent a main branch. Draft PR creation is deferred with push until host mapping is verified. Current previous production source ref is origin/master `0d84df010e4a75e276b0a57a3fe234b57cab2042`; actual deployed SHA/deploy ID remains unknown.

After explicit approval to commit, preserve the original staged work, commit only the reviewed intended changes using a reviewed staging plan, and show the resulting SHA. Verify production mapping before pushing development. Any production merge/deploy still needs separate approval of the exact reviewed commit. For an eventual failed release, restore the prior verified deployment when authorized and reconcile with a revert PR; never force-push or erase history.
