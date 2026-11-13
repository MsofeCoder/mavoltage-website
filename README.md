# Mavoltage Electrical Contractor Website

Official website for **Mavoltage Electrical Contractor**, an electrical engineering and contracting company based in Morogoro, Tanzania.

## Tech Stack

- HTML5
- CSS3 (modular files)
- Vanilla JavaScript (modular files)
- Google Fonts (Inter)
- Font Awesome 6

No frontend framework or JavaScript bundler. A small Python script packages only public files for deployment.

## File Structure

```
├── index.html              # Homepage
├── 404.html                # Error page
├── privacy-policy.html     # Privacy information
├── terms.html              # Terms of service
├── robots.txt              # Crawler rules
├── sitemap.xml             # Search engine sitemap
├── netlify.toml            # Netlify deployment config
├── assets/
│   ├── css/
│   │   ├── main.css        # Variables, reset, base typography
│   │   ├── components.css  # Buttons, nav, cards, forms, badges
│   │   ├── sections.css    # Hero, about, services, projects, etc.
│   │   └── responsive.css  # All @media rules
│   ├── js/
│   │   ├── main.js         # Init / wiring only
│   │   ├── nav.js          # Hamburger, scroll-spy, sticky header
│   │   ├── animations.js   # Scroll reveal, counters
│   │   └── form.js         # Contact form validation + submit
│   ├── images/
│   │   ├── hero.jpg        # Hero background photo
│   │   └── og-cover.jpg    # Open Graph share image
│   └── icons/
│       ├── logo.png        # Company logo
│       └── favicon.png     # Browser tab icon
└── docs/
    └── QA-CHECKLIST.md     # QA verification results
```

## How to Run Locally

This is a static site. Open `index.html` in a browser, or serve with any static server:

```bash
python tools/build_site.py
python tools/preview.py
```

Open http://127.0.0.1:8082. Local previews carry `noindex` headers. The `dist/` artifact excludes repository documents, the handoff package, and private workspace files. Admin files and existing assets are preserved.

The redesigned homepage defaults to Swahili, supports English, and prepares an enquiry for visitor review before opening WhatsApp. Phone is required; email is optional. It does not submit enquiries to Netlify Forms or save enquiry data.

Review evidence and limitations: [development review](docs/implementation/review-and-release.md). Regression instructions: [tests](tests/README.md).

## Deployment

Hosted on Netlify. The remote currently has `master` and `development`, with no `main`; older project records identify `master` as production. Confirm the actual Netlify mapping before any push or release. Production release was authorized on 13 November 2026; see docs/implementation/production-release.md for the verified deployment outcome. Netlify builds use `python3 tools/build_site.py` and publish `dist`; preview contexts get noindex while `CONTEXT=production` retains production indexing.
