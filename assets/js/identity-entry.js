/* Preserve the existing Netlify invite/recovery callback. Ordinary visitors
   do not need the third-party account widget to prepare an enquiry. */
(() => {
  "use strict";
  if (
    !/(?:^#|&)(?:invite_token|recovery_token|confirmation_token|access_token)=/.test(
      location.hash,
    )
  )
    return;
  const script = document.createElement("script");
  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.onload = () => {
    if (!window.netlifyIdentity) return;
    window.netlifyIdentity.on("login", () => {
      location.href = "/admin/";
    });
    // This script is loaded after DOM parsing; explicitly initialize the widget
    // rather than depending on its DOMContentLoaded auto-initialization.
    window.netlifyIdentity.init();
  };
  document.head.append(script);
})();
