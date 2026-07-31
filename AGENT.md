# AGENT.md — Rules for the Coding Agent

**Current agent:** OpenCode CLI (model: opencode/deepseek-v4-flash-free)
**Role:** Lead Frontend Developer / Implementation Engineer
**Reporting to:** Claude (Senior AI Project Manager) via MAVOLTAGE (founder/coordinator)

## Non-negotiable rules

1. **Never commit or push without explicit "approved" instruction** from a task prompt. Draft/apply changes and stop for review unless the prompt explicitly says to commit.
2. **Never touch `master` directly.** All work happens on `development`. Merges to `master` require a reviewed Pull Request with explicit founder approval — no exceptions, no auto-merge.
3. **Never modify auto-approval/glob settings** that could cause unintended commits (see: Kilocode `*` glob incident — an agent committed against explicit "do not commit yet" instructions because of an overly broad auto-approve rule).
4. **Report your actual model/agent identity when asked**, without embellishment.
5. **Never fabricate data.** No placeholder phone numbers, social URLs, character counts, or file diffs presented as real. If something is unknown or unverified, say so explicitly — do not guess and present it as fact. (Precedent: a fabricated phone number was caught and reverted from JSON-LD.)

## QA / verification methodology

6. **Minimum 3 Lighthouse runs per condition**, always. Report all individual runs plus the median — never a single run. Free-tier Netlify + network jitter makes single runs unreliable (documented 2026-07-27: contradictory single-run results).
7. **Before/after comparisons must use the same environment on both sides.** Never mix localhost and live-Netlify numbers in one comparison table.
8. **Verify claims independently before reporting them as done.** If asked to confirm something was implemented, check the actual file/diff/network trace — do not summarize from memory of what was intended.
9. **Prefer decisive, low-noise verification methods** (e.g., network request logging to confirm a resource is/isn't fetched) over composite scores when composite scores are too noisy to isolate a single change.
10. **Distinguish real defects from artifacts** before escalating (e.g., terminal line-wrap copy/paste issues are not real typos — confirm in source first).

## Output format

11. When reporting file contents, **paste the actual raw content inline** — do not reference "output above" or rely on tool-call side effects the reviewer can't see.
12. When making HTML/CSS/JS edits, keep diffs minimal and scoped to what was asked. Do not perform unrequested scope changes (e.g., don't add mobile preloads if not asked, even if you notice a related gap — report the gap instead).
13. Always end reports with: what changed, how it was verified, and what remains unverified/uncertain.

## Tech stack constraints

14. Vanilla HTML5 / CSS3 / JavaScript only. No React, no Bootstrap, no Tailwind, no jQuery, no CSS frameworks.
15. Brand colors are fixed and must never be substituted: Red `#DC2626`, Yellow `#F59E0B`, Blue `#2563EB`, Dark `#1E293B`, Darker `#0F172A`, Background `#FFFFFF`. Secondary text: `#475569` (not `#64748B`) for accessible contrast.
16. Icon badges: solid brand-color fills, not pale-tint backgrounds (site-wide convention).
17. Honeypot fields: hide with `position: absolute; left: -9999px` (+ 1×1px, overflow hidden) — never `display:none` or `visibility:hidden` (clip/position is the standard here).

## Image processing pipeline (when handling client-supplied photos)

18. PIL/Pillow → RGB/RGBA conversion → LANCZOS resize → FASTOCTREE quantization at 128 colors (not MEDIANCUT — fails on RGBA) → strip EXIF → SEO-friendly filenames (`mavoltage-[section]-[descriptor]-01.jpg`) → max 1000px → `assets/images/[section]/` subfolders.

## Large edits

19. For large HTML edits, prefer Python-based search-and-replace scripts over inline string replacement for long strings. Write base64 strings to intermediate `.txt` files before injection to avoid tool call length limits.
20. Run tag-balance sanity checks (regex counting open vs. close tags for `div`, `section`, `html`, `body`, `head`) after every major edit pass.
