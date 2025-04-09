/**
 * Script de redimensionnement dynamique pour les iframes Cal.com
 * Ce script écoute les messages de Cal.com et ajuste la hauteur de l'iframe
 * pour éviter les barres de défilement internes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ajuster la taille des iframes Cal.com
    const adjustCalHeight = () => {
        const containers = document.querySelectorAll('.cal-iframe-container');
        const iframes = document.querySelectorAll('iframe[id^="cal-iframe-"]');
        
        // Définir une hauteur initiale confortable
        containers.forEach(container => {
            container.style.height = '750px';
        });
        
        iframes.forEach(iframe => {
            iframe.style.height = '100%';
            
            // Si on détecte un calendrier mensuel, on augmente encore la hauteur
            if (iframe.src.includes('month_view') || iframe.src.includes('event_types')) {
                iframe.parentElement.style.height = '900px';
            }
        });
    };
    
    // Appliquer l'ajustement initial après un court délai
    setTimeout(adjustCalHeight, 1000);
    
    // Fonction pour écouter les messages envoyés par Cal.com
    const setupCalendarResizing = () => {
        window.addEventListener('message', (e) => {
            // Vérifier que le message provient bien de Cal.com
            if (e.data && typeof e.data === 'object') {
                // Messages de l'API Cal.com pour la hauteur
                if (e.data.height) {
                    console.log('Cal.com a envoyé un message de hauteur:', e.data.height);
                    
                    // Trouver l'iframe concernée
                    const iframes = document.querySelectorAll('iframe[id^="cal-iframe-"]');
                    iframes.forEach(iframe => {
                        if (iframe.contentWindow === e.source) {
                            // Ajuster la hauteur avec un peu d'espace supplémentaire
                            const newHeight = parseInt(e.data.height) + 50;
                            iframe.parentElement.style.height = `${newHeight}px`;
                            console.log(`Hauteur ajustée à ${newHeight}px`);
                        }
                    });
                }
                
                // Détecter les changements d'étape dans le processus de réservation
                if (e.data.type && (
                    e.data.type.includes('BOOKING') || 
                    e.data.type.includes('CALENDAR') || 
                    e.data.type.includes('STEP')
                )) {
                    console.log('Cal.com a changé d\'étape:', e.data.type);
                    
                    // Redimensionner après un court délai pour permettre le rendu complet
                    setTimeout(() => {
                        adjustCalHeight();
                        
                        // Pour les étapes finales, augmenter davantage la hauteur
                        if (e.data.type.includes('CONFIRM') || e.data.type.includes('FORM')) {
                            const iframes = document.querySelectorAll('iframe[id^="cal-iframe-"]');
                            iframes.forEach(iframe => {
                                if (iframe.contentWindow === e.source) {
                                    iframe.parentElement.style.height = '950px';
                                }
                            });
                        }
                    }, 300);
                }
            }
        });
    };
    
    // Mettre en place l'écouteur de redimensionnement
    setupCalendarResizing();
    
    // Ajuster la hauteur lorsque l'utilisateur change d'onglet
    const originalSwitchTab = window.switchTab;
    if (typeof originalSwitchTab === 'function') {
        window.switchTab = function(tabId) {
            // Appeler la fonction originale
            originalSwitchTab(tabId);
            
            // Ajuster la hauteur après le changement d'onglet
            setTimeout(adjustCalHeight, 500);
        };
    }
    
    // Observer les changements de visibilité des conteneurs de calendrier
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!mutation.target.classList.contains('hidden')) {
                    // Le conteneur vient d'être affiché, ajuster la hauteur
                    setTimeout(adjustCalHeight, 500);
                }
            }
        });
    });
    
    // Observer les conteneurs d'onglets
    const tabContents = document.querySelectorAll('[id^="content-"]');
    tabContents.forEach(content => {
        observer.observe(content, { attributes: true });
    });
    
    // Au redimensionnement de la fenêtre, ajuster également
    window.addEventListener('resize', () => {
        setTimeout(adjustCalHeight, 300);
    });
});
