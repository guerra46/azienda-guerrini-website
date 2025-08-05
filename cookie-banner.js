document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const mapFrame = document.querySelector('iframe[data-src]');

    // Funzione per attivare Google Analytics
    const activateAnalytics = () => {
        // Controlla se la funzione gtag di Google è disponibile
        if (typeof gtag === 'function') {
            // Invia un comando a Google per aggiornare il consenso
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            console.log('Consenso a Google Analytics concesso e attivato.');
        }
    };

    // Funzione per caricare la mappa
    const loadMap = () => {
        if (mapFrame && mapFrame.dataset.src && !mapFrame.src) {
            mapFrame.src = mapFrame.dataset.src;
        }
    };

    // Controlla se il cookie di consenso esiste già
    if (document.cookie.includes('cookie_consent=true')) {
        loadMap(); // Se l'utente ha già accettato, carica la mappa
        activateAnalytics(); // E attiva anche Analytics
    } else if (banner) {
        banner.classList.add('show'); // Altrimenti, mostra il banner
    }

    // Quando l'utente clicca "Accetto"
    if (acceptBtn && banner) {
        acceptBtn.addEventListener('click', () => {
            // Imposta un cookie che scade tra 1 anno
            document.cookie = 'cookie_consent=true; max-age=31536000; path=/; SameSite=Lax';
            
            banner.classList.remove('show'); // Nasconde il banner
            loadMap(); // Carica la mappa
            activateAnalytics(); // E attiva anche Analytics
        });
    }
});