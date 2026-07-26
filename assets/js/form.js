// ===== FORM.JS — Contact form validation + submit =====

(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = this.querySelector('button[type="submit"]');
    var status = document.getElementById('cf-status');
    var original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    btn.disabled = true;
    if (status) status.textContent = 'Sending your message...';
    setTimeout(function () {
      btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message Sent!';
      btn.style.background = '#22C55E';
      if (status) status.textContent = 'Your message has been sent. We will reply within 24 hours.';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });
})();
