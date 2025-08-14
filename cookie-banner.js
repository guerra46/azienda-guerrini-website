/**
 *  ✔️  cookie‑banner.js ( versione “pulita” )
 *
 *  •  IIFE + strict mode: niente polluting globals
 *  •  Funzioni di supporto per cookie + consent
 *  •  Gestione della mappa e di Google Analytics
 *  •  Accessibilità: animazione di “show”/“hide” con `transition`
 *  •  Se il cookie è già presente, tutto avviene in automatico
 */

(() => {
  "use strict";

  /* --------------------------------------------------------------
   *  1️⃣  Configuration
   * -------------------------------------------------------------- */
  const CONSENT_COOKIE  = "cookie_consent";
  const CONSENT_VALUE   = "true";
  const CONSENT_DAYS    = 365;            // 1 anno
  const COOKIE_SAMESITE = "Lax";          // “None/Strict” se vuoi HTTPS

  /* --------------------------------------------------------------
   *  2️⃣  Helper:  Cookie set / get
   * -------------------------------------------------------------- */
  const setCookie = (name, value, days, sameSite = "Lax") => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=${sameSite}`;
  };

  const getCookie = name =>
    document.cookie
      .split("; ")
      .find(row => row.startsWith(`${name}=`))
      ?.split("=")[1] ?? null;

  const hasConsented = () => getCookie(CONSENT_COOKIE) === CONSENT_VALUE;

  /* --------------------------------------------------------------
   *  3️⃣  Cookie‑banner & controls
   * -------------------------------------------------------------- */
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept-btn");

  /* show / hide helper (uses the `.show` class defined in CSS) */
  const showBanner = () => banner?.classList.add("show");
  const hideBanner = () => banner?.classList.remove("show");

  /* --------------------------------------------------------------
   *  4️⃣  Analytics + Map
   * -------------------------------------------------------------- */
  const activateAnalytics = () => {
    if (typeof gtag === "function") {
      gtag("consent", "update", { analytics_storage: "granted" });
      console.debug("✅  Consenso GA attivato");
    }
  };

  const loadMap = () => {
    const iframe = document.querySelector("iframe[data-src]");
    if (iframe && iframe.dataset.src && !iframe.src) {
      iframe.src = iframe.dataset.src;
    }
  };

  /* --------------------------------------------------------------
   *  5️⃣  Event handlers
   * -------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    /* 5.1  Se l’utente ha già accettato → subito tutto */
    if (hasConsented()) {
      loadMap();
      activateAnalytics();
      return; // nessun banner
    }

    /* 5.2  Mostra banner se non è stato accettato */
    showBanner();

    /* 5.3  Accetta → salva cookie, nascondi banner, carica mappa & GA */
    acceptBtn?.addEventListener("click", () => {
      setCookie(CONSENT_COOKIE, CONSENT_VALUE, CONSENT_DAYS, COOKIE_SAMESITE);
      hideBanner();
      loadMap();
      activateAnalytics();
    });
  });
})();
