"""Create a public-only deployment artifact; never publish the workspace root.

Local builds default to noindex previews. Netlify sets CONTEXT=production for
production builds. No credentials or branch mappings are changed here.
"""
from pathlib import Path
import os
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist"
PUBLIC_FILES = ("index.html", "404.html", "privacy-policy.html", "terms.html", "robots.txt", "sitemap.xml")


def build():
    # Restrict deletion to this fixed output folder, never a caller-supplied path.
    assert OUT.resolve().parent == ROOT.resolve() and OUT.name == "dist"
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for name in PUBLIC_FILES:
        shutil.copy2(ROOT / name, OUT / name)
    for name in ("assets", "admin"):
        if (ROOT / name).exists():
            shutil.copytree(ROOT / name, OUT / name)
    preview = os.environ.get("CONTEXT") != "production"
    headers = "/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'\n  Referrer-Policy: no-referrer\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n"
    if preview:
        headers += "  X-Robots-Tag: noindex, nofollow\n"
        (OUT / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")
    headers += "/admin/*\n  X-Robots-Tag: noindex, nofollow\n"
    (OUT / "_headers").write_text(headers, encoding="utf-8")
    print(f"Built {OUT} ({'preview/noindex' if preview else 'production/indexable'})")


if __name__ == "__main__":
    build()
