# Mavoltage Electrical Contractor Website

Official website for **Mavoltage Electrical Contractor**, an electrical engineering and contracting company based in Morogoro, Tanzania.

## Tech Stack

- HTML5
- CSS3 (modular files)
- Vanilla JavaScript (modular files)
- Google Fonts (Inter)
- Font Awesome 6

No build tools, no frameworks — static site.

## File Structure

```
├── index.html              # Homepage
├── 404.html                # Error page
├── privacy-policy.html     # Privacy policy (placeholder)
├── terms.html              # Terms of service (placeholder)
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
# Using Python
python -m http.server 8080

# Using Node.js (with serve)
npx serve .
```

## Deployment

Deployed on Netlify free tier. Push to the `main` branch of the GitHub repo and Netlify auto-deploys.

[![Netlify Status](https://api.netlify.com/api/v1/badges/PLACEHOLDER/deploy-status)](https://app.netlify.com)
