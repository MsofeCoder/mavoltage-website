(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const nodes = [...document.querySelectorAll("[data-en]")].map((el) => ({
    el,
    sw: el.textContent,
    en: el.dataset.en,
  }));
  function setLanguage(language) {
    const english = language === "en";
    document.documentElement.lang = english ? "en-TZ" : "sw-TZ";
    nodes.forEach(({ el, sw, en }) => {
      el.textContent = english ? en : sw;
    });
    document.title = `${document.querySelector("h1").textContent} | MAVOLTAGE`;
    document.querySelector('meta[name="description"]').content =
      `${document.querySelector("h1").textContent} — MAVOLTAGE ELECTRICAL CONTRACTOR LIMITED`;
    document
      .getElementById("lang-sw")
      .setAttribute("aria-pressed", String(!english));
    document
      .getElementById("lang-en")
      .setAttribute("aria-pressed", String(english));
    try {
      localStorage.setItem("mavoltage-language", english ? "en" : "sw");
    } catch {
      /* Storage can be unavailable. */
    }
  }
  document
    .getElementById("lang-sw")
    .addEventListener("click", () => setLanguage("sw"));
  document
    .getElementById("lang-en")
    .addEventListener("click", () => setLanguage("en"));
  let initial = "sw";
  try {
    if (localStorage.getItem("mavoltage-language") === "en") initial = "en";
  } catch {
    /* Use Swahili. */
  }
  setLanguage(initial);
})();
