(() => {
  "use strict";
  const BUSINESS = Object.freeze({
    name: "MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED",
    whatsapp: "255766133747",
    phone: "+255 766 133 747",
    email: "info@mavoltage.co.tz",
  });
  const $ = (id) => document.getElementById(id);
  let language = "sw";
  let prepared = false;
  let preparedValues = "";
  let currentMessage = "";
  let lastDialogTrigger = null;
  let attempted = false;
  const tr = (sw, en) => (language === "en" ? en : sw);
  const textNodes = [...document.querySelectorAll("[data-en]")].map((el) => ({
    el,
    sw: el.textContent,
    en: el.dataset.en,
  }));
  const attributeNodes = [
    ...document.querySelectorAll(
      "[data-en-placeholder],[data-en-aria],[data-en-alt]",
    ),
  ].flatMap((el) =>
    [
      ["placeholder", "enPlaceholder"],
      ["aria-label", "enAria"],
      ["alt", "enAlt"],
    ]
      .filter(([, key]) => el.dataset[key] !== undefined)
      .map(([attr, key]) => ({
        el,
        attr,
        sw: el.getAttribute(attr),
        en: el.dataset[key],
      })),
  );
  const form = $("enquiry-form"),
    nav = $("main-nav"),
    menu = $("menu-toggle");
  function closeMenu(returnFocus = false) {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", tr("Fungua menyu", "Open menu"));
    menu.querySelector("use").setAttribute("href", "#i-menu");
    if (returnFocus) menu.focus();
  }
  function applyLanguage(next, announce = true) {
    language = next === "en" ? "en" : "sw";
    document.documentElement.lang = language === "sw" ? "sw-TZ" : "en-TZ";
    textNodes.forEach(
      ({ el, sw, en }) => (el.textContent = language === "en" ? en : sw),
    );
    attributeNodes.forEach(({ el, attr, sw, en }) =>
      el.setAttribute(attr, language === "en" ? en : sw),
    );
    $("lang-sw").setAttribute("aria-pressed", String(language === "sw"));
    $("lang-en").setAttribute("aria-pressed", String(language === "en"));
    document.title = tr(
      "MAVOLTAGE | Umeme salama. Maisha bora.",
      "MAVOLTAGE | Safer power. Better living.",
    );
    document.querySelector('meta[name="description"]').content = tr(
      "MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED — huduma za ufungaji umeme, matengenezo na mifumo ya nishati. Andaa ombi lako kupitia WhatsApp.",
      "MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED — electrical installation, maintenance and energy solutions. Prepare your project enquiry for WhatsApp.",
    );
    document.querySelector('meta[property="og:title"]').content =
      document.title;
    document.querySelector('meta[property="og:description"]').content =
      document.querySelector('meta[name="description"]').content;
    document.querySelector('meta[property="og:locale"]').content =
      language === "en" ? "en_TZ" : "sw_TZ";
    document.querySelector('meta[property="og:image:alt"]').content = tr(
      "Nembo ya MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED",
      "MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED logo",
    );
    menu.setAttribute(
      "aria-label",
      nav.classList.contains("is-open")
        ? tr("Funga menyu", "Close menu")
        : tr("Fungua menyu", "Open menu"),
    );
    if (attempted) validate(false);
    if (prepared) updateMessage();
    try {
      localStorage.setItem("mavoltage-language", language);
    } catch {}
    if (announce)
      $("language-status").textContent = tr(
        "Lugha imebadilishwa kuwa Kiswahili.",
        "Language changed to English.",
      );
  }
  $("lang-sw").addEventListener("click", () => applyLanguage("sw"));
  $("lang-en").addEventListener("click", () => applyLanguage("en"));
  menu.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? tr("Funga menyu", "Close menu") : tr("Fungua menyu", "Open menu"),
    );
    menu
      .querySelector("use")
      .setAttribute("href", open ? "#i-close" : "#i-menu");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu(true);
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !e.target.closest(".nav-row"))
      closeMenu();
  });
  const desktop = matchMedia("(min-width:901px)");
  if (desktop.addEventListener)
    desktop.addEventListener("change", () => closeMenu());
  document.querySelectorAll('a[href^="#"]').forEach((link) =>
    link.addEventListener("click", (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
        return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      let target;
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      closeMenu();
      if (link.dataset.service) {
        const option = [...$("service").options].some(
          (o) => o.value === link.dataset.service,
        );
        if (option) $("service").value = link.dataset.service;
        invalidatePreview();
      }
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    }),
  );
  function updateCurrent() {
    const ids = ["services", "projects", "about", "faq"];
    let active = "";
    const line = 130;
    for (const id of ids) {
      const el = $(id);
      if (el.getBoundingClientRect().top <= line) active = id;
    }
    if ($("contact").getBoundingClientRect().top <= line) active = "";
    nav.querySelectorAll("a").forEach((a) => {
      if (a.hash === "#" + active) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  let scrollQueued = false;
  addEventListener(
    "scroll",
    () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(() => {
          updateCurrent();
          scrollQueued = false;
        });
      }
    },
    { passive: true },
  );
  updateCurrent();
  function openDialog(id, trigger) {
    const dialog = $(id);
    if (!dialog) return;
    lastDialogTrigger = trigger;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      dialog.querySelector("[data-close]").focus();
    } else {
      alert(
        tr(
          "Maelezo haya yanapatikana katika kivinjari cha kisasa. Unaweza kuwasiliana nasi kwa barua pepe.",
          "Please use a modern browser to read this information, or contact us by email.",
        ),
      );
    }
  }
  document
    .querySelectorAll("[data-dialog]")
    .forEach((btn) =>
      btn.addEventListener("click", () => openDialog(btn.dataset.dialog, btn)),
    );
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog
      .querySelector("[data-close]")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      if (lastDialogTrigger) lastDialogTrigger.focus();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog.close();
      }
    });
  });
  const offeredServices = Object.freeze([
    "residential",
    "industrial",
    "maintenance",
    "solar",
    "consultation",
  ]);
  const fields = [
    { id: "client-name", error: "name-error" },
    { id: "service", error: "service-error" },
    { id: "reply-contact", error: "contact-error" },
    { id: "client-email", error: "email-error" },
    { id: "project-area", error: "area-error" },
    { id: "project-message", error: "message-error" },
  ];
  function getError(id) {
    const val = $(id).value.trim();
    switch (id) {
      case "client-name":
        return val.length < 2
          ? tr(
              "Weka jina lenye angalau herufi 2.",
              "Enter a name with at least 2 characters.",
            )
          : val.length > 100
            ? tr(
                "Jina lisizidi herufi 100.",
                "Use no more than 100 characters.",
              )
            : "";
      case "service":
        return !offeredServices.includes(val)
          ? tr("Chagua huduma au ushauri.", "Choose a service or consultation.")
          : "";
      case "reply-contact": {
        if (!val)
          return tr("Weka namba yako ya simu.", "Enter your phone number.");
        const digits = val.replace(/\D/g, "");
        return /^\+?[\d\s().-]+$/.test(val) &&
          digits.length >= 7 &&
          digits.length <= 15
          ? ""
          : tr(
              "Weka namba sahihi ya simu yenye tarakimu 7–15.",
              "Enter a valid phone number with 7–15 digits.",
            );
      }
      case "client-email":
        return !val ||
          (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && val.length <= 254)
          ? ""
          : tr(
              "Weka barua pepe sahihi au acha sehemu hii wazi.",
              "Enter a valid email address or leave this field blank.",
            );
      case "project-area":
        return val.length > 120
          ? tr(
              "Eneo lisizidi herufi 120.",
              "Use no more than 120 characters for the area.",
            )
          : "";
      case "project-message":
        return val.length < 10
          ? tr(
              "Eleza kazi kwa angalau herufi 10.",
              "Describe the work using at least 10 characters.",
            )
          : val.length > 3000
            ? tr(
                "Maelezo yasizidi herufi 3000.",
                "Use no more than 3000 characters.",
              )
            : "";
      default:
        return "";
    }
  }
  function validate(moveFocus = true) {
    let first = null;
    let count = 0;
    for (const { id, error } of fields) {
      const message = getError(id),
        el = $(id),
        err = $(error);
      err.textContent = message;
      err.hidden = !message;
      el.setAttribute("aria-invalid", String(Boolean(message)));
      if (message) {
        count++;
        if (!first) first = el;
      }
    }
    const summary = $("error-summary");
    summary.hidden = !count;
    summary.textContent = count
      ? tr(
          "Tafadhali rekebisha sehemu zilizoainishwa kabla ya kuandaa ujumbe.",
          "Please correct the highlighted fields before preparing your message.",
        )
      : "";
    if (first && moveFocus) first.focus();
    return !count;
  }
  function invalidatePreview() {
    if (prepared) {
      prepared = false;
      currentMessage = "";
      $("review-panel").hidden = true;
      $("message-preview").textContent = "";
      $("whatsapp-handoff").href = "https://wa.me/" + BUSINESS.whatsapp;
      $("fallback-copy").value = "";
      $("handoff-status").textContent = "";
    }
  }
  function updateMessage() {
    const name = $("client-name").value.trim(),
      contact = $("reply-contact").value.trim(),
      email = $("client-email").value.trim(),
      area = $("project-area").value.trim(),
      message = $("project-message").value.trim(),
      service = $("service").selectedOptions[0].textContent;
    const lines = [
      tr(
        "Habari MAVOLTAGE, nina ombi la mradi.",
        "Hello MAVOLTAGE, I have a project enquiry.",
      ),
      "",
      tr("Jina: ", "Name: ") + name,
      tr("Huduma: ", "Service: ") + service,
      tr("Simu: ", "Phone: ") + contact,
    ];
    if (email) lines.push(tr("Barua pepe: ", "Email: ") + email);
    if (area) lines.push(tr("Eneo: ", "Project area: ") + area);
    lines.push("", tr("Maelezo ya mradi:", "Project details:"), message);
    currentMessage = lines.join("\n");
    $("message-preview").textContent = currentMessage;
    $("whatsapp-handoff").href =
      "https://wa.me/" +
      BUSINESS.whatsapp +
      "?text=" +
      encodeURIComponent(currentMessage);
    $("fallback-copy").value = currentMessage;
    $("handoff-status").textContent = tr(
      "Ujumbe umeandaliwa. Bado haujatumwa.",
      "Message prepared. It has not been sent.",
    );
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    attempted = true;
    if (!validate()) {
      invalidatePreview();
      return;
    }
    prepared = true;
    preparedValues = JSON.stringify(fields.map(({ id }) => $(id).value));
    updateMessage();
    $("review-panel").hidden = false;
    $("fallback-copy").hidden = true;
    $("fallback-label").hidden = true;
    $("review-title").focus({ preventScroll: true });
    $("review-panel").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
    });
  });
  form.addEventListener("input", () => {
    invalidatePreview();
    $("message-count").textContent =
      $("project-message").value.length + " / 3000";
    if (attempted) validate(false);
  });
  form.addEventListener("change", () => {
    if (
      prepared &&
      JSON.stringify(fields.map(({ id }) => $(id).value)) !== preparedValues
    )
      invalidatePreview();
    if (attempted) validate(false);
  });
  $("edit-message").addEventListener("click", () => {
    invalidatePreview();
    $("project-message").focus();
  });
  $("copy-message").addEventListener("click", async () => {
    if (!currentMessage) return;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(currentMessage);
      $("handoff-status").textContent = tr(
        "Ujumbe umenakiliwa. Unaweza kuubandika kwenye WhatsApp.",
        "Message copied. You can paste it into WhatsApp.",
      );
    } catch {
      $("fallback-label").hidden = false;
      $("fallback-copy").hidden = false;
      $("fallback-copy").value = currentMessage;
      $("fallback-copy").focus();
      $("fallback-copy").select();
      $("handoff-status").textContent = tr(
        "Kunakili kiotomatiki hakupatikani. Nakili maandishi yaliyochaguliwa mwenyewe.",
        "Automatic copying is unavailable. Copy the selected text manually.",
      );
    }
  });
  $("whatsapp-handoff").addEventListener("click", () => {
    $("handoff-status").textContent = tr(
      "Endelea ndani ya WhatsApp na ubonyeze Tuma. Ukurasa huu hauwezi kuthibitisha ujumbe umefika.",
      "Continue in WhatsApp and press Send. This page cannot confirm delivery.",
    );
  });
  let stored = "sw";
  try {
    const value = localStorage.getItem("mavoltage-language");
    if (value === "en") stored = "en";
  } catch {}
  applyLanguage(stored, false);
  try {
    const wanted = new URLSearchParams(location.search).get("service");
    if (wanted && [...$("service").options].some((o) => o.value === wanted))
      $("service").value = wanted;
  } catch {}
  $("copyright-year").textContent = String(new Date().getFullYear());
  form.noValidate = true;
  form.hidden = false;
  document.documentElement.classList.add("js");
})();
