// Gestionnaire principal pour les fonctionnalités de réservation
document.addEventListener('DOMContentLoaded', function() {
    // Force le mode sombre
    enableDarkMode();
    
    // Initialisation des écouteurs d'événements
    initializeEventListeners();
    
    // Configuration de Cal.com
    initializeCalendar();
});

// Active le mode sombre
function enableDarkMode() {
    document.documentElement.classList.add('dark');
    document.body.classList.add('force-dark');
}

// Initialise tous les écouteurs d'événements
function initializeEventListeners() {
    // Toggle menu pour mobile
    document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
    
    // Gestion des onglets de réservation
    document.getElementById('tab-individual').addEventListener('click', () => switchTab('individual'));
    document.getElementById('tab-group').addEventListener('click', () => switchTab('group'));
    
    // FAQ toggles
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', toggleFAQ);
    });
    
    // Gestion de la politique de confidentialité
    document.getElementById('privacy-link').addEventListener('click', showPrivacyModal);
    document.getElementById('close-privacy').addEventListener('click', hidePrivacyModal);
    document.getElementById('privacy-modal').addEventListener('click', handleModalOutsideClick);
}

// Fonctions de base pour l'interface utilisateur
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const expanded = mobileNav.classList.toggle('hidden') ? 'false' : 'true';
    this.setAttribute('aria-expanded', expanded);
}

function switchTab(tabId) {
    // Réinitialise tous les onglets
    document.getElementById('tab-individual').classList.remove('active');
    document.getElementById('tab-group').classList.remove('active');
    document.getElementById('tab-individual').setAttribute('aria-selected', 'false');
    document.getElementById('tab-group').setAttribute('aria-selected', 'false');
    document.getElementById('content-individual').classList.add('hidden');
    document.getElementById('content-group').classList.add('hidden');
    
    // Active l'onglet sélectionné
    document.getElementById(`tab-${tabId}`).classList.add('active');
    document.getElementById(`tab-${tabId}`).setAttribute('aria-selected', 'true');
    document.getElementById(`content-${tabId}`).classList.remove('hidden');
}

function toggleFAQ() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('svg');
    const expanded = content.classList.toggle('hidden') ? 'false' : 'true';
    this.setAttribute('aria-expanded', expanded);
    
    // Rotation de l'icône
    icon.classList.toggle('rotate-180', expanded === 'true');
}

// Gestion du modal de confidentialité
function showPrivacyModal(e) {
    e.preventDefault();
    document.getElementById('privacy-modal').classList.remove('hidden');
}

function hidePrivacyModal() {
    document.getElementById('privacy-modal').classList.add('hidden');
}

function handleModalOutsideClick(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
}

// Fonctions d'aide pour le formatage
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function formatTime(timeString) {
    // S'assurer que timeString est une chaîne valide
    if (!timeString || typeof timeString !== 'string') return '';
    return timeString.substring(0, 5).replace(':', 'h');
}

// Masque le loader de l'iframe
function hideLoading(loaderId) {
    const loader = document.getElementById(loaderId);
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
}

// Initialise la configuration de Cal.com
function initializeCalendar() {
    // Vérifiez si Cal est disponible
    if (typeof Cal !== 'undefined') {
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
    } else {
        console.warn('Cal.com n\'est pas chargé correctement');
    }
    
    // Écoute les événements de réservation de Cal.com
    window.addEventListener('message', handleCalendarEvents);
}

// Gère les événements de Cal.com
function handleCalendarEvents(e) {
    // Afficher tous les messages reçus pour le débogage
    console.log('Message reçu:', e.data);
    
    // Vérifie si l'événement provient de Cal.com et si c'est une réservation réussie
    if (e.data && e.data.type === 'CAL:BOOKING_SUCCESSFUL') {
        try {
            const bookingData = e.data.data;
            console.log('Réservation réussie:', bookingData);
            
            // Déterminer le type de séance
            let sessionType;
            if (bookingData.eventSlug === 'seance-d-une-heure') {
                sessionType = 'Séance individuelle (1h)';
            } else if (bookingData.eventSlug === 'seance-de-groupe-3h') {
                sessionType = 'Séance en groupe (3h)';
            } else {
                sessionType = 'Séance non spécifiée';
            }
            
            // Vérifiez si les propriétés nécessaires existent
            const bookingDate = bookingData.date || '';
            const bookingTime = bookingData.startTime || '';
            const bookingId = bookingData.uid || '';
            
            // Afficher les informations de débogage
            console.log('Données formatées:', {
                sessionType,
                bookingDate,
                bookingTime,
                bookingId
            });
            
            // Sauvegarder les données de réservation dans localStorage
            saveBookingData(sessionType, bookingDate, bookingTime, bookingId);
            
            // Rediriger vers la page du formulaire avec les paramètres dans l'URL
            redirectToFormPage(sessionType, bookingDate, bookingTime, bookingId);
            
        } catch (error) {
            console.error('Erreur lors du traitement des données de réservation:', error);
            // En cas d'erreur, rediriger quand même mais avec un message d'erreur
            window.location.href = 'reservation-form.html?error=true';
        }
    }
}

// Fonction pour sauvegarder les données de réservation
function saveBookingData(type, date, time, id) {
    const bookingData = {
        type: type,
        date: date,
        time: time,
        id: id,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('artzainak_booking_data', JSON.stringify(bookingData));
    console.log('Données de réservation sauvegardées:', bookingData);
}

// Fonction pour rediriger vers la page du formulaire
function redirectToFormPage(type, date, time, id) {
    // Encoder les paramètres pour l'URL
    const params = new URLSearchParams();
    params.append('type', encodeURIComponent(type));
    params.append('date', encodeURIComponent(date));
    params.append('time', encodeURIComponent(time));
    params.append('id', encodeURIComponent(id));
    
    // Rediriger vers la page du formulaire avec les paramètres
    window.location.href = `reservation-form.html?${params.toString()}`;
}

// Ajouter un bouton de secours après 3 secondes
setTimeout(function() {
    const calendarSection = document.getElementById('calendar-section');
    if (calendarSection) {
        // Créer un bouton d'aide
        const helpDiv = document.createElement('div');
        helpDiv.className = 'mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center';
        helpDiv.innerHTML = `
            <p class="mb-3">Vous avez déjà reçu une confirmation par email mais le formulaire ne s'affiche pas ?</p>
            <button id="manual-redirect-btn" class="bg-basque-green hover:bg-basque-green/80 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Accéder au formulaire de renseignements
            </button>
        `;
        
        // Ajouter le bouton au conteneur
        calendarSection.appendChild(helpDiv);
        
        // Ajouter l'écouteur d'événement
        document.getElementById('manual-redirect-btn').addEventListener('click', function() {
            window.location.href = 'reservation-form.html';
        });
    }
}, 3000);
