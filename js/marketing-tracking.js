// Système de tracking marketing et reciblage
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la couche de données
    window.dataLayer = window.dataLayer || [];
    
    // Informations de base
    window.dataLayer.push({
        'siteName': 'Artzainak',
        'pageType': getPageType(),
        'userStatus': 'visitor'
    });
    
    // Fonction pour déterminer le type de page
    function getPageType() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/' || path === '') {
            return 'homepage';
        } else if (path.includes('reservation.html')) {
            return 'reservation';
        } else if (path.includes('location.html')) {
            return 'location';
        } else if (path.includes('contact.html')) {
            return 'contact';
        } else if (path.includes('ressources.html')) {
            return 'ressources';
        }
        return 'other';
    }
    
    // Fonction pour suivre les événements
    function trackEvent(eventName, eventCategory, eventAction, eventLabel, eventValue) {
        window.dataLayer.push({
            'event': eventName,
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': eventLabel,
            'eventValue': eventValue
        });
        
        console.log(`Event tracked: ${eventName} - ${eventCategory} - ${eventAction} - ${eventLabel}`);
    }
    
    // Suivi des clics sur les CTA
    const trackClicksOn = function(selector, category, action) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('click', function(e) {
                trackEvent(
                    'buttonClick',
                    category,
                    action,
                    this.textContent.trim(),
                    1
                );
            });
        });
    };
    
    // Suivre les clics sur les boutons de réservation
    trackClicksOn('a[href*="reservation.html"], a[href*="reserver"]', 'CTA', 'reservation');
    
    // Suivre les clics sur les boutons de location
    trackClicksOn('a[href*="location.html"], a[href*="louer"]', 'CTA', 'location');
    
    // Suivre les clics sur les boutons de contact
    trackClicksOn('a[href*="contact.html"], a[href*="tel:"], a[href*="mailto:"]', 'CTA', 'contact');
    
    // Suivre les soumissions de formulaire
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            let formType = 'unknown';
            if (this.id.includes('contact')) formType = 'contact';
            if (this.id.includes('booking')) formType = 'reservation';
            if (this.id.includes('rental')) formType = 'location';
            
            trackEvent(
                'formSubmission',
                'Form',
                formType,
                window.location.pathname,
                1
            );
        });
    });
    
    // Suivre les clics sur la galerie d'images
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const imageTitle = this.getAttribute('data-title') || 
                               this.querySelector('img')?.alt || 
                               'Image sans titre';
            
            trackEvent(
                'galleryClick',
                'Engagement',
                'gallery',
                imageTitle,
                1
            );
        });
    });
    
    // Suivre l'utilisation du calculateur d'écopâturage
    const calculateButton = document.getElementById('calculateBtn');
    if (calculateButton) {
        calculateButton.addEventListener('click', function(e) {
            const landSize = document.getElementById('landSize').value;
            const terrain = document.getElementById('terrain').value;
            
            trackEvent(
                'calculatorUse',
                'Tool',
                'ecopasture',
                `${landSize}m² - ${terrain}`,
                landSize
            );
        });
    }
    
    // Suivre la profondeur de défilement
    let scrollDepthTracked = {};
    window.addEventListener('scroll', function() {
        if (!document.body) return;
        
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);
        
        const depths = [25, 50, 75, 100];
        
        depths.forEach(depth => {
            if (scrollPercentage >= depth && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;
                
                trackEvent(
                    'scrollDepth',
                    'Engagement',
                    'scroll',
                    `${depth}%`,
                    depth
                );
            }
        });
    });
    
    // Suivre le temps passé sur la page
    const startTime = new Date();
    
    window.addEventListener('beforeunload', function() {
        const endTime = new Date();
        const timeSpent = Math.round((endTime - startTime) / 1000); // en secondes
        
        let timeCategory;
        if (timeSpent < 30) timeCategory = "<30s";
        else if (timeSpent < 60) timeCategory = "30s-1min";
        else if (timeSpent < 180) timeCategory = "1-3min";
        else if (timeSpent < 300) timeCategory = "3-5min";
        else timeCategory = ">5min";
        
        trackEvent(
            'timeOnPage',
            'Engagement',
            'duration',
            timeCategory,
            timeSpent
        );
    });
    
    // Système de lead scoring pour identifier les visiteurs intéressés
    initLeadScoring();
});

// Système de lead scoring
function initLeadScoring() {
    const scoreKey = 'artzainak_lead_score';
    const interactionKey = 'artzainak_interactions';
    const visitsKey = 'artzainak_visits';
    
    let score = parseInt(localStorage.getItem(scoreKey) || '0');
    let interactions = JSON.parse(localStorage.getItem(interactionKey) || '[]');
    let visits = parseInt(localStorage.getItem(visitsKey) || '0');
    
    // Incrémenter le nombre de visites
    visits++;
    localStorage.setItem(visitsKey, visits.toString());
    
    // Ajouter des points pour les visites répétées
    if (visits > 1) {
        addPoints(10, 'repeat_visit');
    }
    
    // Fonction pour ajouter des points au score
    function addPoints(points, action) {
        score += points;
        
        // Enregistrer l'interaction
        interactions.push({
            action: action,
            points: points,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
        
        // Limiter l'historique des interactions à 20 entrées
        if (interactions.length > 20) {
            interactions = interactions.slice(-20);
        }
        
        // Sauvegarder le score et les interactions
        localStorage.setItem(scoreKey, score.toString());
        localStorage.setItem(interactionKey, JSON.stringify(interactions));
        
        // Suivre au niveau du dataLayer
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'lead_score_update',
                'leadScore': score,
                'leadAction': action,
                'leadPoints': points
            });
        }
        
        // Déclencher des actions basées sur le score
        checkLeadActions();
    }
    
    // Vérifier les actions à déclencher en fonction du score
    function checkLeadActions() {
        // Lead chaud (score élevé)
        if (score >= 50 && !interactions.some(i => i.action === 'hot_lead_popup')) {
            showHotLeadPopup();
        }
        
        // Lead intéressé (score moyen)
        if (score >= 30 && score < 50 && !interactions.some(i => i.action === 'warm_lead_highlight')) {
            highlightCTA();
        }
    }
    
    // Afficher une popup pour les leads chauds
    function showHotLeadPopup() {
        // Ne pas montrer immédiatement, attendre un peu
        setTimeout(() => {
            // Vérifier que l'élément n'existe pas déjà
            if (document.getElementById('hot-lead-popup')) return;
            
            // Créer la popup
            const popup = document.createElement('div');
            popup.id = 'hot-lead-popup';
            popup.className = 'fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-40 max-w-sm transform transition-all duration-300 translate-y-4 opacity-0';
            
            // Contenu de la popup
            popup.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-bold text-lg">Réservez votre séance</h3>
                    <button id="close-hot-lead-popup" class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <p class="mb-4 text-sm">Vous semblez intéressé par nos services. Bénéficiez de 10% de réduction sur votre première réservation avec le code <strong>BIENVENUE10</strong>.</p>
                <div class="flex space-x-2">
                    <a href="reservation.html" class="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-center rounded-lg transition-colors">
                        Réserver
                    </a>
                    <a href="contact.html" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-center rounded-lg transition-colors">
                        Contact
                    </a>
                </div>
            `;
            
            // Ajouter la popup au document
            document.body.appendChild(popup);
            
            // Afficher la popup avec une animation
            setTimeout(() => {
                popup.classList.remove('translate-y-4', 'opacity-0');
            }, 100);
            
            // Ajouter l'écouteur d'événement pour fermer
            document.getElementById('close-hot-lead-popup').addEventListener('click', () => {
                popup.classList.add('translate-y-4', 'opacity-0');
                setTimeout(() => {
                    popup.remove();
                }, 300);
            });
            
            // Enregistrer que la popup a été montrée
            addPoints(5, 'hot_lead_popup');
        }, 5000);
    }
    
    // Mettre en évidence les CTA pour les leads intéressés
    function highlightCTA() {
        // Mettre en évidence les boutons principaux
        const mainCTAs = document.querySelectorAll('a[href*="reservation.html"], a[href*="location.html"]');
        
        mainCTAs.forEach(cta => {
            // Ajouter une classe d'animation
            cta.classList.add('animate-pulse', 'ring-2', 'ring-primary', 'ring-offset-2');
            
            // Supprimer l'animation après 5 secondes
            setTimeout(() => {
                cta.classList.remove('animate-pulse');
            }, 5000);
        });
        
        // Enregistrer que les CTA ont été mis en évidence
        addPoints(3, 'warm_lead_highlight');
    }
    
    // Suivi des actions de l'utilisateur
    function trackUserActions() {
        // Suivi des clics sur les liens et boutons
        document.addEventListener('click', (e) => {
            // Clics sur les boutons de réservation
            if (e.target.closest('a[href*="reservation.html"]')) {
                addPoints(20, 'reservation_click');
            }
            
            // Clics sur les boutons de location
            if (e.target.closest('a[href*="location.html"]')) {
                addPoints(20, 'location_click');
            }
            
            // Clics sur les boutons de contact
            if (e.target.closest('a[href*="contact.html"]') || 
                e.target.closest('a[href^="tel:"]') || 
                e.target.closest('a[href^="mailto:"]')) {
                addPoints(15, 'contact_click');
            }
            
            // Clics sur les images de la galerie
            if (e.target.closest('.gallery-item')) {
                addPoints(5, 'gallery_view');
            }
            
            // Clics sur les cartes de service
            if (e.target.closest('.service-card')) {
                addPoints(10, 'service_interest');
            }
        });
        
        // Suivi des soumissions de formulaire
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                // Points plus élevés pour les soumissions de formulaire
                let formType = 'unknown_form';
                
                if (e.target.id.includes('contact')) {
                    formType = 'contact_form';
                    addPoints(30, formType);
                } else if (e.target.id.includes('booking')) {
                    formType = 'booking_form';
                    addPoints(50, formType);
                } else if (e.target.id.includes('rental')) {
                    formType = 'rental_form';
                    addPoints(50, formType);
                } else {
                    addPoints(25, formType);
                }
            }
        });
    }
    
    // Démarrer le suivi des actions
    trackUserActions();
}

// Ajout des balises pour Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX'); // Remplacer par votre ID GTM
