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
