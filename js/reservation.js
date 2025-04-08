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
            
            // Vérifier que les données essentielles sont présentes
            if (!bookingData.date || !bookingData.startTime) {
                throw new Error("Données de réservation incomplètes. Date ou heure manquante.");
            }
            
            // Déterminer le type de séance
            let sessionType;
            if (bookingData.eventSlug === 'seance-d-une-heure') {
                sessionType = 'Séance individuelle (1h)';
            } else if (bookingData.eventSlug === 'seance-de-groupe-3h') {
                sessionType = 'Séance en groupe (3h)';
            } else {
                sessionType = 'Séance non spécifiée';
            }
            
            const bookingDate = bookingData.date;
            const bookingTime = bookingData.startTime;
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
            
            // Afficher une confirmation avant de rediriger
            showBookingConfirmation(sessionType, bookingDate, bookingTime, bookingId);
            
        } catch (error) {
            console.error('Erreur lors du traitement des données de réservation:', error);
            alert("Nous n'avons pas pu récupérer toutes les informations de votre réservation. Veuillez réessayer ou utiliser le bouton d'accès manuel au formulaire.");
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

// Affiche une confirmation de la réservation avant redirection
function showBookingConfirmation(type, date, time, id) {
    // Construire l'URL de redirection à l'avance
    const params = new URLSearchParams();
    params.append('type', encodeURIComponent(type || ''));
    params.append('date', encodeURIComponent(date || ''));
    params.append('time', encodeURIComponent(time || ''));
    params.append('id', encodeURIComponent(id || ''));
    const redirectURL = `reservation-form.html?${params.toString()}`;
    
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    
    // Créer l'élément de confirmation
    const confirmationOverlay = document.createElement('div');
    confirmationOverlay.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70';
    
    confirmationOverlay.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div class="flex items-center justify-center text-basque-green mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-center">Réservation confirmée !</h3>
            <div class="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p><strong>Type de séance :</strong> ${type}</p>
                <p><strong>Date :</strong> ${formattedDate}</p>
                <p><strong>Heure :</strong> ${formattedTime}</p>
            </div>
            <p class="text-center mb-4">Veuillez compléter quelques informations supplémentaires pour finaliser votre réservation.</p>
            <a href="${redirectURL}" class="block w-full text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition duration-300">
                Continuer
            </a>
        </div>
    `;
    
    // Ajouter à la page
    document.body.appendChild(confirmationOverlay);
    
    // Redirection automatique après 8 secondes
    setTimeout(() => {
        window.location.href = redirectURL;
    }, 8000);
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
                Accéder au formulaire manuellement
            </button>
        `;
        
        // Ajouter le bouton au conteneur
        calendarSection.appendChild(helpDiv);
        
        // Ajouter l'écouteur d'événement
        document.getElementById('manual-redirect-btn').addEventListener('click', function() {
            // Demander la date et l'heure à l'utilisateur
            const manualEntryOverlay = document.createElement('div');
            manualEntryOverlay.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70';
            
            const activeTab = document.querySelector('.session-tab.active');
            const isIndividual = activeTab.id === 'tab-individual';
            const sessionType = isIndividual ? 'Séance individuelle (1h)' : 'Séance en groupe (3h)';
            
            // Obtenir la date d'aujourd'hui au format YYYY-MM-DD
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            
            manualEntryOverlay.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl">
                    <h3 class="text-xl font-bold mb-4 text-center">Saisir les détails de votre réservation</h3>
                    <form id="manual-booking-form" class="space-y-4">
                        <div>
                            <label for="manual-date" class="block mb-1 font-medium">Date de votre réservation</label>
                            <input type="date" id="manual-date" required value="${formattedToday}"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        </div>
                        <div>
                            <label for="manual-time" class="block mb-1 font-medium">Heure de votre réservation</label>
                            <input type="time" id="manual-time" required value="10:00"
                                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        </div>
                        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                            Continuer vers le formulaire
                        </button>
                        <button type="button" id="cancel-manual-entry" class="w-full mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-300">
                            Annuler
                        </button>
                    </form>
                </div>
            `;
            
            // Ajouter à la page
            document.body.appendChild(manualEntryOverlay);
            
            // Gérer l'annulation
            document.getElementById('cancel-manual-entry').addEventListener('click', function() {
                document.body.removeChild(manualEntryOverlay);
            });
            
            // Gérer la soumission
            document.getElementById('manual-booking-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const manualDate = document.getElementById('manual-date').value;
                const manualTime = document.getElementById('manual-time').value + ':00';
                const manualId = 'manual-booking-' + Date.now();
                
                // Sauvegarder ces données
                saveBookingData(sessionType, manualDate, manualTime, manualId);
                
                // Créer l'URL de redirection
                const params = new URLSearchParams();
                params.append('type', encodeURIComponent(sessionType || ''));
                params.append('date', encodeURIComponent(manualDate || ''));
                params.append('time', encodeURIComponent(manualTime || ''));
                params.append('id', encodeURIComponent(manualId || ''));
                const redirectURL = `reservation-form.html?${params.toString()}`;
                
                // Supprimer l'overlay
                document.body.removeChild(manualEntryOverlay);
                
                // Rediriger vers la page du formulaire
                window.location.href = redirectURL;
            });
        });
    }
}, 3000);
