/**
 * Know Motion Media — UI bootstrap (nav, social, mail)
 */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    renderSocial();
    wireMail();
    mobileNav();
  });

  function renderSocial() {
    const root = document.getElementById("footer-social");
    const social = (window.KMM && window.KMM.content && window.KMM.content.social) || [];
    if (!root) return;

    root.innerHTML = social
      .map((item) => {
        if (item.href) {
          return `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.name}</a>`;
        }
        return `<span class="is-placeholder" title="Official URL not supplied yet">${item.name}</span>`;
      })
      .join("");
  }

  function wireMail() {
    const email =
      (window.KMM && window.KMM.content && window.KMM.content.contactEmail) ||
      "toreycsim@gmail.com";
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.href = `mailto:${email}`;
      if (a.classList.contains("connect__mail") || a.textContent.includes("@")) {
        a.textContent = email;
      }
    });
  }

  function mobileNav() {
    const btn = document.querySelector(".nav__menu");
    const drawer = document.getElementById("mobile-drawer");
    if (!btn || !drawer) return;

    const close = () => {
      drawer.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    };

    const open = () => {
      drawer.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
    };

    btn.addEventListener("click", () => {
      if (drawer.hidden) open();
      else close();
    });

    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }
})();
