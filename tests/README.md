# Verification

Run the packaging regression check with standard Python:

```powershell
python -m unittest discover -s tests -p 'test_*.py'
```

Browser tests use externally installed QA tools; the website has no npm runtime dependencies. Install Playwright and axe outside the repository:

```powershell
$qaFolder = Join-Path $env:TEMP 'mavoltage-qa'
npm install --prefix $qaFolder playwright @axe-core/playwright lighthouse --no-save
$env:NODE_PATH = Join-Path $qaFolder 'node_modules'
```

For source and bundled-reference comparison, start a loopback-only source server in a separate terminal:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Then run:

```powershell
node tests/browser.cjs
```

Chrome is selected from its standard Windows installation. Override `BROWSER_PATH` for another Chromium executable and `TEST_ENGINE` for the report label. To use Playwright Firefox, install it with `node <qaFolder>/node_modules/playwright/cli.js install firefox`, then set `TEST_ENGINE=firefox`. Results, axe reports and mobile/desktop screenshots go to ignored `test-results/`.

Tests cover form validation in SW/EN, exact WhatsApp encoding, plain-text injection handling, preview invalidation, Enter submission, language persistence, service actions, focus/menu/dialog behavior, no-JavaScript contact fallback, widths 320/390/768/1024/1440, reflow-equivalent widths, reduced motion and automated accessibility. No test opens WhatsApp or sends an enquiry.

The supplied prototype's CSP hashes no longer match its corrected script. Browser comparison removes only that CSP meta tag in the intercepted reference response; the original reference file is unchanged. Production uses extracted local CSS/JS rather than stale inline hashes.

Use `python tools/build_site.py` and `python tools/preview.py` for owner review of the safe public artifact at http://127.0.0.1:8082. This server applies preview noindex and serves the branded 404 with a true 404 response. Hosted Netlify authentication, deploy headers and branch mapping still need verification in the owner's hosting environment.
