"""Focused regression checks for public packaging and preview isolation."""
import importlib.util
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("build_site", Path(__file__).resolve().parents[1] / "tools/build_site.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class PublicBuildTest(unittest.TestCase):
    def test_private_workspace_files_are_never_published_and_contexts_are_isolated(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            for name in builder.PUBLIC_FILES:
                (root / name).write_text("public", encoding="utf-8")
            for name in ("assets", "admin"):
                (root / name).mkdir()
                (root / name / "public.txt").write_text("preserved", encoding="utf-8")
            for name in ("SIGNATURE.jpeg", "D STAMP.jpeg", ".env", "handoff.html"):
                (root / name).write_text("private", encoding="utf-8")
            with patch.object(builder, "ROOT", root), patch.object(builder, "OUT", root / "dist"):
                for context in ("production", "branch-deploy", "deploy-preview", "dev"):
                    with self.subTest(context=context), patch.dict(os.environ, {"CONTEXT": context}):
                        builder.build()
                        out = root / "dist"
                        self.assertFalse(any((out / name).exists() for name in ("SIGNATURE.jpeg", "D STAMP.jpeg", ".env", "handoff.html")))
                        self.assertEqual((out / "admin/public.txt").read_text(), "preserved")
                        header = (out / "_headers").read_text().split("/admin/*")[0]
                        self.assertEqual("X-Robots-Tag: noindex" in header, context != "production")
                        self.assertEqual((out / "robots.txt").read_text(), "public" if context == "production" else "User-agent: *\nDisallow: /\n")


if __name__ == "__main__":
    unittest.main()
