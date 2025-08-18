/**
 *  ✔️  script.js (Versione “pulita”)
 *
 *  1️⃣  IIFE + strict mode → blocca il polluting del global scope.
 *  2️⃣  Funzione `initCarousel()` → logica per il widget prenotazioni.
 *  3️⃣  Opzionali: sezione mezzene, form‑submit confirmation.
 *  4️⃣  `DOMContentLoaded` → avviamo tutto.
 */

(() => {
  "use strict";

  /* ------------------------------------------------------------------
   *  1️⃣  Utility: calcolo del gap di un container in pixel
   * ------------------------------------------------------------------ */
  const getGap = el => {
    if (!el) return 0;
    const gapValue = getComputedStyle(el).gap;
    return parseFloat(gapValue) || 0;
  }

  /* ------------------------------------------------------------------
   *  2️⃣  Carousel di prenotazioni
   * ------------------------------------------------------------------ */
  const initCarousel = () => {
    // MODIFICA: Selezioniamo il nuovo contenitore genitore "wrapper"
    const wrapper = document.querySelector(".prenotazioni-wrapper");
    if (!wrapper) return;

    const container = wrapper.querySelector(".prenotazioni-container");
    const prevBtn   = wrapper.querySelector(".scroll-arrow.prev");
    const nextBtn   = wrapper.querySelector(".scroll-arrow.next");

    if (!(container && prevBtn && nextBtn)) return;

    /* Quantità da scorrere = larghezza box + gap tra i box */
    const getScrollAmount = () => {
      const box = container.querySelector(".prenotazione-box");
      const gap = getGap(container);
      return box ? box.offsetWidth + gap : 0;
    };

    /* -------------------- Animazione al click --------------------- */
    const scroll = dir => {
        const amount = getScrollAmount();
        if (amount > 0) {
            container.scrollBy({
                left: amount * dir,
                behavior: "smooth"
            });
        }
    };

    prevBtn.addEventListener("click", () => scroll(-1));
    nextBtn.addEventListener("click", () => scroll(1));

    /* -------------------- Stato pulsanti (Opzionale ma utile) ----------------------- */
    const updateArrows = () => {
      // Tolleranza di 1px per evitare errori di arrotondamento
      const atStart = container.scrollLeft <= 0;
      const atEnd   = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

      prevBtn.disabled = atStart;
      nextBtn.disabled = atEnd;
      
      // Aggiungiamo uno stile per rendere visibile lo stato disabilitato
      prevBtn.style.opacity = atStart ? '0.5' : '1';
      nextBtn.style.opacity = atEnd ? '0.5' : '1';
    };

    container.addEventListener("scroll", updateArrows);
    // Chiamata iniziale per impostare lo stato corretto all'avvio
    // Usiamo un piccolo timeout per dare al browser il tempo di calcolare le dimensioni
    setTimeout(updateArrows, 100);
  };

  /* ------------------------------------------------------------------
   *  3️⃣  Sezione mezzene stagionale (opzionale, commentato)
   * ------------------------------------------------------------------ */
  /*  
  const sezioneMezzene = document.getElementById('sezione-mezzene-stagionale');
  if (sezioneMezzene) {
    const oggi   = new Date();
    const month  = oggi.getMonth();   // 0 = Gennaio
    if (month >= 10 || month <= 2) {
      sezioneMezzene.style.display = 'block';
    }
  }
  */

  /* ------------------------------------------------------------------
   *  4️⃣  Gestione submit / conferma (opzionale, commentato)
   * ------------------------------------------------------------------ */
  /*
  function handleFormSubmit(formId, confermaId) {
    const form = document.getElementById(formId);
    const conferma = document.getElementById(confermaId);
    if (!form || !conferma) return;

    form.addEventListener('submit', e => {
      e.preventDefault();                // evita l’invio default
      form.style.display   = 'none';
      conferma.style.display = 'block';
      // → qui potresti fare un fetch al tuo backend
    });
  }

  handleFormSubmit('form-mezzene', 'mezzene-conferma');
  handleFormSubmit('form-salumi', 'salumi-conferma');
  handleFormSubmit('form-contatti', 'contatti-conferma');
  */

  /* ------------------------------------------------------------------
   *  5️⃣  Avvio alla fine del DOM
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initCarousel();                // attiva il carousel
    // altre funzioni possono essere chiamate qui se necessarie
  });

})();   // Fin del IIFE