# Production release — 13 November 2026

The owner authorized autonomous preparation and publishing in the current chat. This supersedes the earlier approval-pending status in the 4 November review.

## Candidate

Swahili-first/English static contractor website with explicit review-before-WhatsApp enquiries. No unsupported testimonials, counters, or certification claims are displayed. Prepared enquiries are not sent or saved by the website. Customer sends inside WhatsApp. Phone and direct WhatsApp fallback remain available without JavaScript.

Public packaging excludes private signature files, documents, and the separate marketplace pilot. Global response headers prevent framing and MIME sniffing, restrict object embedding and base URLs, and disable unused device permissions. Preview builds are noindex; production builds remain indexable.

Legacy CMS files are retained and prominently identify their limitation: their JSON collections do not edit the bilingual homepage. The website does not depend on CMS authentication. Hosted Identity is not claimed as verified.

## Verification

- Public-build regression passed all four deployment contexts.
- Chrome: 40/40 acceptance checks passed against the packaged artifact, including bilingual validation, message encoding, stale-preview invalidation, copy fallback, no-JS contact, mobile widths and axe accessibility scans.
- Mobile screenshot visually inspected.
- Additional browser, performance and hosted checks are in progress; final outcomes will be appended before closeout.

## Deployment

Existing production HTML matches origin/master and preview HTML matches origin/development, except Netlify pretty-URL rewriting. The available Netlify account does not list this site. Existing Git deployment integration will be checked with a development push before production.

Rollback: the previous master source is 0d84df010e4a75e276b0a57a3fe234b57cab2042. Use a revert through the same deployment pipeline if the release fails; do not rewrite history.

## Limits

No real message is sent as part of automated QA. Real-device, screen-reader, mailbox delivery and business-account ownership checks are not claimed. No custom domain, payments, customer database or marketplace launch is included in this contractor-site release.
