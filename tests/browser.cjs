/* Run with NODE_PATH pointing to an external installation of playwright and
   @axe-core/playwright. Test data is synthetic; no WhatsApp links are opened. */
const { chromium, firefox } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.TEST_URL || "http://127.0.0.1:8080";
const out = path.resolve("test-results");
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser =
    process.env.TEST_ENGINE === "firefox"
      ? await firefox.launch()
      : await chromium.launch({
          executablePath:
            process.env.BROWSER_PATH ||
            "C:/Program Files/Google/Chrome/Application/chrome.exe",
          headless: true,
        });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  const errors = [],
    failedRequests = [],
    transmissions = [],
    results = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  page.on("request", (request) => {
    if (request.method() !== "GET" || !request.url().startsWith(base))
      transmissions.push({ method: request.method(), url: request.url() });
  });
  async function check(id, fn) {
    try {
      await fn();
      results.push({ id, status: "PASS" });
    } catch (error) {
      results.push({ id, status: "FAIL", error: error.message });
    }
  }
  const visible = (id) => page.locator("#" + id).isVisible();
  async function prepare() {
    await page
      .locator("#enquiry-form")
      .evaluate((form) => form.requestSubmit());
  }
  async function fillValid() {
    await page.locator("#project-area").fill("");
    await page.locator("#client-name").fill("QA Example");
    await page.locator("#service").selectOption({ index: 1 });
    await page.locator("#reply-contact").fill("0766 133 747");
    await page.locator("#client-email").fill("");
    await page.locator("#project-message").fill("Synthetic project test only.");
  }
  await page.goto(base);
  await check("F01 fresh SW", async () =>
    assert.equal(await page.locator("html").getAttribute("lang"), "sw-TZ"),
  );
  for (const lang of ["sw", "en"]) {
    await page.locator("#lang-" + lang).click();
    await check(lang + " F03 empty/focus", async () => {
      await prepare();
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "client-name",
      );
      assert.equal(await visible("review-panel"), false);
    });
    await fillValid();
    await check(lang + " F04/F05/F07 required phone", async () => {
      await page.locator("#client-email").fill("qa@example.com");
      for (const phone of [
        "",
        "   ",
        "qa@example.com",
        "123456",
        "1234567890123456",
        "255+766133747",
        "abc1234567",
      ]) {
        await page.locator("#reply-contact").fill(phone);
        await prepare();
        assert.equal(await visible("review-panel"), false, phone);
        assert.equal(
          await page.locator("#reply-contact").getAttribute("aria-invalid"),
          "true",
        );
        assert.match(
          await page.locator("#contact-error").textContent(),
          lang === "en" ? /phone/ : /simu/,
        );
      }
    });
    await check(lang + " F06/F08 valid phones / blank email", async () => {
      for (const phone of [
        "0766 133 747",
        "+255 766 133 747",
        "(0766) 133-747",
        "1234567",
        "+123456789012345",
      ]) {
        await page.locator("#reply-contact").fill(phone);
        await page.locator("#client-email").fill(" ");
        await prepare();
        assert.equal(await visible("review-panel"), true, phone);
        const text = await page.locator("#message-preview").textContent();
        assert.ok(text.includes(phone));
        assert.ok(!text.includes("Email:") && !text.includes("Barua pepe:"));
      }
    });
    await check(lang + " F09/F10 optional malformed email", async () => {
      await page.locator("#client-email").fill("broken");
      await prepare();
      assert.equal(await visible("review-panel"), false);
      assert.equal(await visible("email-error"), true);
      await page.locator("#client-email").fill("qa@example.com");
      await prepare();
      assert.ok(
        (await page.locator("#message-preview").textContent()).includes(
          "qa@example.com",
        ),
      );
    });
    await check(lang + " F11 boundaries / tampered service", async () => {
      const tests = [
        ["client-name", "a"],
        ["client-name", "a".repeat(101)],
        ["project-message", "123456789"],
        ["project-message", "a".repeat(3001)],
        ["project-area", "a".repeat(121)],
      ];
      for (const [id, value] of tests) {
        await fillValid();
        await page.locator("#" + id).evaluate((el, value) => {
          el.value = value;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }, value);
        await prepare();
        assert.equal(await visible("review-panel"), false, id + value.length);
      }
      await fillValid();
      await page.locator("#service").evaluate((el) => {
        el.add(new Option("Injected", "unoffered"));
        el.value = "unoffered";
      });
      await prepare();
      assert.equal(await visible("review-panel"), false);
      await fillValid();
      await page.locator("#client-name").fill("AB");
      await page.locator("#project-message").fill("1234567890");
      await prepare();
      assert.equal(await visible("review-panel"), true);
      await page.locator("#client-name").fill("a".repeat(100));
      await page.locator("#project-message").fill("a".repeat(3000));
      await page.locator("#project-area").fill("a".repeat(120));
      await prepare();
      assert.equal(await visible("review-panel"), true);
      await page.locator("#project-area").fill("");
    });
    await check(lang + " F12/F13/F14 safe message composition", async () => {
      await fillValid();
      const message =
        "Umeme & taa + eneo\n<script>window.injected=true</script> — salama";
      await page.locator("#project-message").fill(message);
      await prepare();
      const text = await page.locator("#message-preview").textContent();
      const url = new URL(
        await page.locator("#whatsapp-handoff").getAttribute("href"),
      );
      assert.equal(url.host, "wa.me");
      assert.equal(url.pathname, "/255766133747");
      assert.equal(url.searchParams.get("text"), text);
      assert.ok(text.includes(message));
      assert.equal(await page.evaluate(() => window.injected), undefined);
    });
    await check(lang + " F15/F24 invalidate / Enter", async () => {
      await page.locator("#client-name").fill("QA Changed");
      assert.equal(await visible("review-panel"), false);
      assert.equal(
        await page.locator("#whatsapp-handoff").getAttribute("href"),
        "https://wa.me/255766133747",
      );
      await page.locator("#reply-contact").press("Enter");
      assert.equal(await visible("review-panel"), true);
      await page.locator("#edit-message").click();
      assert.equal(await visible("review-panel"), false);
      assert.equal(
        await page.locator("#client-name").inputValue(),
        "QA Changed",
      );
      await prepare();
    });
    await check(lang + " F17 manual copy fallback", async () => {
      await page.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: { writeText: () => Promise.reject(new Error("denied")) },
        }),
      );
      await page.locator("#copy-message").click();
      assert.equal(await visible("fallback-copy"), true);
      assert.equal(
        await page.locator("#fallback-copy").inputValue(),
        await page.locator("#message-preview").textContent(),
      );
    });
    await page.locator("#client-name").fill("");
    await page.locator("#service").selectOption("");
    await page.locator("#reply-contact").fill("");
    await page.locator("#project-message").fill("");
  }
  await fillValid();
  await prepare();
  await check(
    "F02/F16 language retains fields and translates draft/metadata",
    async () => {
      await page.locator("#lang-en").click();
      const english = await page.locator("#message-preview").textContent();
      await page.locator("#lang-sw").click();
      assert.notEqual(
        await page.locator("#message-preview").textContent(),
        english,
      );
      assert.equal(
        await page.locator("#client-name").inputValue(),
        "QA Example",
      );
      const url = new URL(
        await page.locator("#whatsapp-handoff").getAttribute("href"),
      );
      assert.equal(
        url.searchParams.get("text"),
        await page.locator("#message-preview").textContent(),
      );
      assert.equal(
        await page.title(),
        await page.locator('meta[property="og:title"]').getAttribute("content"),
      );
    },
  );
  await check("F18 service selection", async () => {
    const link = page.locator("a[data-service]").first();
    await link.evaluate((el) =>
      el.closest("details")?.setAttribute("open", ""),
    );
    const value = await link.getAttribute("data-service");
    await link.click();
    assert.equal(await page.locator("#service").inputValue(), value);
    assert.equal(await visible("review-panel"), false);
  });
  await check("F19 mobile menu / Escape / navigation focus", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#menu-toggle").click();
    assert.equal(
      await page.locator("#menu-toggle").getAttribute("aria-expanded"),
      "true",
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "menu-toggle",
    );
    await page.locator("#menu-toggle").click();
    await page.locator("#main-nav a").first().click();
    assert.equal(
      await page.locator("#menu-toggle").getAttribute("aria-expanded"),
      "false",
    );
  });
  await check("F20 dialog / focus restoration", async () => {
    const button = page.locator('[data-dialog="privacy-dialog"]').first();
    await button.click();
    assert.equal(
      await page.locator("#privacy-dialog").evaluate((el) => el.open),
      true,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    assert.equal(
      await button.evaluate((el) => el === document.activeElement),
      true,
    );
  });
  await check("F21 preference only", async () => {
    assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), [
      "mavoltage-language",
    ]);
    await page.reload();
    // Firefox may independently restore native form controls on reload. That
    // browser behavior is disclosed in the privacy text and is not site storage.
    assert.equal(await page.locator("#review-panel").isVisible(), false);
    assert.deepEqual(await page.evaluate(() => Object.keys(sessionStorage)), []);
    const fresh = await context.newPage();
    await fresh.goto(base);
    assert.equal(await fresh.locator("#client-name").inputValue(), "");
    await fresh.close();
  });
  for (const lang of ["sw", "en"]) {
    await page.locator("#lang-" + lang).click();
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await check(`V01 ${lang} ${width}`, async () =>
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "Horizontal overflow",
        ),
      );
      await page.evaluate(() => scrollTo(0, 0));
      if ([390, 1440].includes(width))
        await page.screenshot({
          path: path.join(out, `${lang}-${width}.png`),
          fullPage: true,
        });
    }
  }
  await check("V03 reflow at equivalent 200% / 400%", async () => {
    for (const width of [720, 360]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
  });
  await check("V04 skip link and keyboard focus", async () => {
    await page.goto(base);
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.classList.contains("skip"),
      ),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "main-content",
    );
  });
  for (const lang of ["sw", "en"]) {
    await page.locator("#lang-" + lang).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await check("V05/V06 axe " + lang, async () => {
      const report = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      fs.writeFileSync(
        path.join(out, `axe-${lang}.json`),
        JSON.stringify(report, null, 2),
      );
      assert.deepEqual(
        report.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
      );
    });
  }
  await check("V06 reduced motion", async () =>
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
      "auto",
    ),
  );
  await check("V07 no page errors / no form transmissions", async () => {
    assert.deepEqual(errors, []);
    assert.deepEqual(failedRequests, []);
    assert.deepEqual(transmissions, []);
  });
  await check("V08 legal routes and metadata", async () => {
    for (const route of ["/privacy-policy.html", "/terms.html"]) {
      await page.goto(base + route);
      await page.locator("#lang-en").click();
      assert.equal(await page.locator("html").getAttribute("lang"), "en-TZ");
      assert.equal(await page.locator("h1").count(), 1);
    }
  });
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const plain = await nojs.newPage();
  await plain.goto(base);
  await check("F22 no JavaScript contact fallback", async () => {
    assert.equal(await plain.locator("h1").isVisible(), true);
    assert.ok(
      await plain.locator('a[href="https://wa.me/255766133747"]').count(),
    );
    assert.equal(await plain.locator("#enquiry-form").isVisible(), false);
  });
  // Prototype CSP hashes are stale after its phone/email correction. Remove only
  // that meta tag in the test response to compare the intended enhanced layout.
  await page.route("**/MAVOLTAGE_Standalone_Prototype.html", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        /<meta http-equiv="Content-Security-Policy"[^>]*>/,
        "",
      ),
    });
  });
  // Capture reference at exactly the same viewports for visual comparison.
  for (const width of (process.env.TEST_REFERENCE === "1" ? [390, 1440] : [])) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(
      base +
        "/MAVOLTAGE_Implementation_Package/MAVOLTAGE_Implementation_Package/reference/MAVOLTAGE_Standalone_Prototype.html",
    );
    await page.locator("#lang-sw").click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: path.join(out, `reference-${width}.png`),
      fullPage: true,
    });
  }
  const report = {
    engine: process.env.TEST_ENGINE || "Chrome",
    version: browser.version(),
    base,
    results,
    errors,
    failedRequests,
    transmissions,
  };
  fs.writeFileSync(
    path.join(out, `browser-${report.engine}.json`),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        engine: report.engine,
        passed: results.filter((x) => x.status === "PASS").length,
        failed: results.filter((x) => x.status === "FAIL"),
      },
      null,
      2,
    ),
  );
  await browser.close();
  process.exitCode = results.some((x) => x.status === "FAIL") ? 1 : 0;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
