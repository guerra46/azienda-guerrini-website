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


    /* --- GESTIONE INVIO MODULI (DISATTIVATA) ---
       Questa funzione è stata disattivata per permettere a FormSubmit di gestire
       l'invio dei moduli. Il comportamento standard del browser (attivato 
       dall'attributo "action" nel form) ora prenderà il sopravvento.
       
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
    */

    
    // --- MODIFICA: GESTIONE SCORRIMENTO PRENOTAZIONI CON FRECCE ---
    const container = document.querySelector('.prenotazioni-container');
    if (container) {
        const prevBtn = container.querySelector('.scroll-arrow.prev');
        const nextBtn = container.querySelector('.scroll-arrow.next');
        const box = container.querySelector('.prenotazione-box');

        if (prevBtn && nextBtn && box) {
            
            // Calcola di quanto scorrere (larghezza di un box + il gap tra di essi)
            // Assumiamo che il gap sia 2rem, che corrisponde a circa 32px
            const scrollAmount = box.offsetWidth + 32;

            nextBtn.addEventListener('click', () => {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    }

});