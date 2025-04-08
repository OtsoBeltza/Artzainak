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
    
    // Gestion du formulaire
    document.getElementById('preBookingForm').addEventListener('submit', handleFormSubmit);
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
            const bookingDate = bookingData.date ? formatDate(bookingData.date) : 'Date non spécifiée';
            const bookingTimeRaw = bookingData.startTime || '';
            const bookingTime = formatTime(bookingTimeRaw);
            
            // Afficher un débogage
            console.log('Données formatées:', {
                sessionType,
                bookingDate,
                bookingTime,
                uid: bookingData.uid || ''
            });
            
            // Remplir les champs du formulaire
            updateBookingFormFields(sessionType, bookingData.date || '', bookingTimeRaw, bookingData.uid || '');
            
            // Mettre à jour le récapitulatif visible
            updateBookingSummary(sessionType, bookingDate, bookingTime);
            
            // Afficher le formulaire et la notification
            showBookingForm();
            showBookingNotification(sessionType, bookingDate, bookingTime);
        } catch (error) {
            console.error('Erreur lors du traitement des données de réservation:', error);
        }
    }
}

// Met à jour les champs cachés du formulaire
function updateBookingFormFields(type, date, time, uid) {
    document.getElementById('booking_type').value = type;
    document.getElementById('booking_date').value = date;
    document.getElementById('booking_time').value = time;
    document.getElementById('booking_id').value = uid;
}

// Met à jour le récapitulatif visible
function updateBookingSummary(type, date, time) {
    document.getElementById('summary_type').textContent = type;
    document.getElementById('summary_date').textContent = date;
    document.getElementById('summary_time').textContent = time;
}

// Affiche le formulaire de réservation
function showBookingForm() {
    const formSection = document.getElementById('booking-form-section');
    formSection.classList.remove('hidden');
    formSection.scrollIntoView({ behavior: 'smooth' });
}

// Affiche la notification de réservation
function showBookingNotification(type, date, time) {
    const notification = document.getElementById('booking-notification');
    const details = document.getElementById('booking-details');
    
    details.textContent = `${type} réservée le ${date} à ${time}. Veuillez compléter votre réservation ci-dessous.`;
    notification.classList.add('show');
    
    // Masquer après 6 secondes
    setTimeout(() => {
        notification.classList.remove('show');
    }, 6000);
}

// Gère la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Récupération du bouton
    const submitButton = document.getElementById('submitFormBtn');
    const originalText = submitButton.innerHTML;
    
    // Affiche le loader
    submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Traitement en cours...';
    submitButton.disabled = true;
    
    // Sauvegarde des données dans localStorage
    saveFormDataToLocalStorage();
    
    // Construction des données à envoyer
    const formData = new FormData(this);
    
    // Envoi des données à Formspree
    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors' // Assure que les requêtes cross-origin sont bien gérées
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Succès:', data);
        showFormConfirmation();
    })
    .catch(error => {
        console.error('Erreur:', error);
        
        // Si Formspree échoue, tentative avec l'approche no-cors
        return fetchWithNoCors(this.action, formData)
            .then(() => {
                showFormConfirmation();
            })
            .catch(fallbackError => {
                console.error('Erreur avec approche de secours:', fallbackError);
                alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer ou nous contacter directement.');
                
                // Réinitialiser le bouton
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
}

// Sauvegarde les données du formulaire dans localStorage
function saveFormDataToLocalStorage() {
    const formData = {
        ownerName: document.getElementById('ownerName').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        ownerPhone: document.getElementById('ownerPhone').value,
        dogName: document.getElementById('dogName').value,
        dogBreed: document.getElementById('dogBreed').value,
        dogAge: document.getElementById('dogAge').value,
        experience: document.getElementById('experience').value,
        problems: document.getElementById('problems').value,
        objectives: document.getElementById('objectives').value,
        bookingType: document.getElementById('booking_type').value,
        bookingDate: document.getElementById('booking_date').value,
        bookingTime: document.getElementById('booking_time').value,
        bookingId: document.getElementById('booking_id').value
    };
    
    localStorage.setItem('artzainak_booking', JSON.stringify(formData));
    console.log('Informations sauvegardées localement:', formData);
}

// Tente d'envoyer avec l'approche no-cors comme solution de secours
function fetchWithNoCors(url, formData) {
    // Convertir FormData en URLSearchParams
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        params.append(key, value);
    }
    
    return fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Important pour les requêtes cross-origin sans CORS
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    });
}

// Affiche la confirmation après soumission du formulaire
function showFormConfirmation() {
    // Cacher le formulaire
    document.getElementById('preBookingForm').style.display = 'none';
    
    // Montrer la confirmation
    document.getElementById('formConfirmation').classList.remove('hidden');
    
    // Réinitialiser le formulaire en arrière-plan
    document.getElementById('preBookingForm').reset();
}
