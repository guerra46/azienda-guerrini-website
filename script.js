// Attende che il contenuto della pagina sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {

    /* --- LOGICA PER LA SEZIONE STAGIONALE DELLE MEZZENE (DISATTIVATA) ---
       Questo blocco di codice è stato commentato per rendere la sezione
       delle mezzene visibile tutto l'anno, come da richiesta.
       La visibilità ora è gestita direttamente dall'HTML.
    
    const sezioneMezzene = document.getElementById('sezione-mezzene-stagionale');
    
    // Controlla se l'elemento esiste prima di procedere
    if (sezioneMezzene) {
        const oggi = new Date();
        const meseCorrente = oggi.getMonth(); // 0 = Gennaio, 10 = Novembre, 11 = Dicembre

        // La sezione è visibile da Novembre (mese 10) a Marzo (mese 2)
        // La condizione copre: Nov, Dic, Gen, Feb, Mar
        if (meseCorrente >= 10 || meseCorrente <= 2) {
            sezioneMezzene.style.display = 'block';
        }
    }
    */


    // --- GESTIONE INVIO MODULI ---
    // Funzione generica per gestire l'invio e mostrare la conferma
    function handleFormSubmit(formId, confermaId) {
        const form = document.getElementById(formId);
        const confermaMessaggio = document.getElementById(confermaId);

        if (form && confermaMessaggio) {
            form.addEventListener('submit', function(event) {
                // Previene l'invio standard del modulo
                event.preventDefault(); 
                
                // Nasconde il modulo e mostra il messaggio di conferma
                form.style.display = 'none';
                confermaMessaggio.style.display = 'block';

                // Qui, in un'applicazione reale, invieresti i dati a un server
                // Esempio: const formData = new FormData(form);
                // fetch('/api/prenotazione', { method: 'POST', body: formData });
            });
        }
    }

    // Associa la funzione ai vari moduli
    handleFormSubmit('form-mezzene', 'mezzene-conferma');
    handleFormSubmit('form-salumi', 'salumi-conferma');
    handleFormSubmit('form-contatti', 'contatti-conferma');

});