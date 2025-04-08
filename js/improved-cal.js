// Amélioration de l'intégration Cal.com
document.addEventListener('DOMContentLoaded', function() {
    // Configuration améliorée de Cal.com
    if (typeof Cal !== 'undefined') {
        // Configuration de Cal avec des options plus robustes
        Cal('ui', {
            theme: 'dark',
            styles: {
                branding: {
                    brandColor: '#5D5CDE'
                }
            },
            hideEventTypeDetails: false,
            layout: 'month_view'
        });
        
        // Configuration explicite pour chaque iframe Cal.com
        if (document.getElementById('cal-iframe-individual')) {
            Cal('inline', {
                elementOrSelector: '#cal-iframe-individual',
                calLink: 'artzainak/seance-d-une-heure',
                config: {
                    theme: 'dark',
                    locale: 'fr'
                }
            });
        }
        
        if (document.getElementById('cal-iframe-group')) {
            Cal('inline', {
                elementOrSelector: '#cal-iframe-group',
                calLink: 'artzainak/seance-de-groupe-3h',
                config: {
                    theme: 'dark',
                    locale: 'fr'
                }
            });
        }
    }
    
    // Détection fiable des événements de réservation
    window.addEventListener('message', function(e) {
        // Traitement des différents formats de messages possibles
        if (e.data && typeof e.data === 'string') {
            try {
                // Certaines réponses de Cal.com sont des chaînes JSON
                const data = JSON.parse(e.data);
                if (data.type === 'BOOKING_CREATED' || data.type === 'CAL:BOOKING_SUCCESSFUL') {
                    processBookingData(data);
                }
            } catch (error) {
                // Ce n'est pas du JSON, ignorer
            }
        } else if (e.data && e.data.type) {
            // Traiter l'objet directement
            if (e.data.type === 'BOOKING_CREATED' || e.data.type === 'CAL:BOOKING_SUCCESSFUL') {
                processBookingData(e.data);
            }
        }
    });

    // Traitement unifié des données de réservation
    function processBookingData(data) {
        try {
            console.log('Traitement des données de réservation:', data);
            
            // Extraction des détails de la réservation
            let bookingData = data.data || data.detail || data;
            let bookingDetails = {
                type: getSessionType(bookingData),
                date: extractDate(bookingData),
                time: extractTime(bookingData),
                id: bookingData.uid || bookingData.id || Date.now().toString()
            };
            
            // Vérifier que nous avons les informations essentielles
            if (bookingDetails.date) {
                // Sauvegarder les données
                saveBookingData(bookingDetails.type, bookingDetails.date, bookingDetails.time, bookingDetails.id);
                
                // Afficher la confirmation et rediriger
                showBookingConfirmation(bookingDetails.type, bookingDetails.date, bookingDetails.time, bookingDetails.id);
            } else {
                console.error('Données de réservation incomplètes:', bookingData);
                showManualEntryForm();
            }
        } catch (error) {
            console.error('Erreur lors du traitement des données:', error);
            showManualEntryForm();
        }
    }
});
