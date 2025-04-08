/**
 * Système de notifications par email pour Artzainak
 * Utilisant EmailJS pour l'envoi des emails côté client
 */

// Configuration EmailJS
const EMAIL_CONFIG = {
    SERVICE_ID: 'service_ucp821f',
    BOOKING_TEMPLATE_ID: 'template_mfsiq3i',
    REMINDER_TEMPLATE_ID: 'template_reminder',  // À créer dans EmailJS
    PUBLIC_KEY: 'gXAUQo9QLLKuoIzGC'  // Votre clé publique déjà fournie
};

// Classe pour gérer les notifications par email
class EmailNotificationSystem {
    constructor(config) {
        this.serviceId = config.SERVICE_ID;
        this.bookingTemplateId = config.BOOKING_TEMPLATE_ID;
        this.reminderTemplateId = config.REMINDER_TEMPLATE_ID;
        this.publicKey = config.PUBLIC_KEY;
        
        // Initialiser EmailJS
        this.initEmailJS();
    }
    
    // Initialiser EmailJS avec la clé publique
    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS not loaded');
        }
    }
    
    // Envoyer une confirmation de réservation
    sendBookingConfirmation(bookingData) {
        return new Promise((resolve, reject) => {
            // Vérifier que EmailJS est chargé
            if (typeof emailjs === 'undefined') {
                reject('EmailJS not loaded');
                return;
            }
            
            // Préparer les données pour le template
            const templateParams = {
                to_name: bookingData.ownerName,
                to_email: bookingData.ownerEmail,
                booking_type: bookingData.bookingType,
                booking_date: this.formatDate(bookingData.bookingDate),
                booking_time: this.formatTime(bookingData.bookingTime),
                dog_name: bookingData.dogName || '',
                location: 'Arbonne, Pays Basque',
                booking_id: bookingData.bookingId
            };
            
            // Envoyer l'email de confirmation
            emailjs.send(this.serviceId, this.bookingTemplateId, templateParams)
                .then((response) => {
                    console.log('Confirmation email sent successfully!', response);
                    
                    // Sauvegarder la réservation dans le localStorage pour les rappels
                    this.saveBookingForReminders(bookingData);
                    
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Failed to send confirmation email:', error);
                    reject(error);
                });
        });
    }
    
    // Envoyer un rappel de rendez-vous (24h avant)
    sendReminderEmail(bookingData) {
        return new Promise((resolve, reject) => {
            // Vérifier que EmailJS est chargé
            if (typeof emailjs === 'undefined') {
                reject('EmailJS not loaded');
                return;
            }
            
            // Préparer les données pour le template
            const templateParams = {
                to_name: bookingData.ownerName,
                to_email: bookingData.ownerEmail,
                booking_type: bookingData.bookingType,
                booking_date: this.formatDate(bookingData.bookingDate),
                booking_time: this.formatTime(bookingData.bookingTime),
                dog_name: bookingData.dogName || '',
                location: 'Arbonne, Pays Basque',
                booking_id: bookingData.bookingId
            };
            
            // Envoyer l'email de rappel
            emailjs.send(this.serviceId, this.reminderTemplateId, templateParams)
                .then((response) => {
                    console.log('Reminder email sent successfully!', response);
                    
                    // Marquer le rappel comme envoyé
                    this.markReminderAsSent(bookingData.bookingId);
                    
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Failed to send reminder email:', error);
                    reject(error);
                });
        });
    }
    
    // Sauvegarder la réservation pour les rappels futurs
    saveBookingForReminders(bookingData) {
        // Récupérer les réservations existantes
        let bookings = JSON.parse(localStorage.getItem('artzainak_bookings') || '[]');
        
        // Ajouter des informations sur les notifications
        const bookingWithNotifications = {
            ...bookingData,
            confirmationSent: true,
            reminderSent: false,
            bookingTimestamp: new Date().toISOString()
        };
        
        // Ajouter la nouvelle réservation
        bookings.push(bookingWithNotifications);
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('artzainak_bookings', JSON.stringify(bookings));
        
        // Planifier la vérification des rappels
        this.scheduleReminderCheck();
    }
    
    // Marquer un rappel comme envoyé
    markReminderAsSent(bookingId) {
        // Récupérer les réservations existantes
        let bookings = JSON.parse(localStorage.getItem('artzainak_bookings') || '[]');
        
        // Trouver la réservation correspondante
        const updatedBookings = bookings.map(booking => {
            if (booking.bookingId === bookingId) {
                return { ...booking, reminderSent: true };
            }
            return booking;
        });
        
        // Sauvegarder les réservations mises à jour
        localStorage.setItem('artzainak_bookings', JSON.stringify(updatedBookings));
    }
    
    // Planifier la vérification des rappels
    scheduleReminderCheck() {
        // Vérifier toutes les heures si des rappels doivent être envoyés
        if (!window.reminderCheckInterval) {
            window.reminderCheckInterval = setInterval(() => {
                this.checkForReminders();
            }, 3600000); // 1 heure en millisecondes
            
            // Vérifier immédiatement
            this.checkForReminders();
        }
    }
    
    // Vérifier si des rappels doivent être envoyés
    checkForReminders() {
        // Récupérer les réservations
        const bookings = JSON.parse(localStorage.getItem('artzainak_bookings') || '[]');
        const now = new Date();
        
        bookings.forEach(booking => {
            // Si le rappel n'a pas encore été envoyé
            if (!booking.reminderSent) {
                const bookingDate = new Date(booking.bookingDate);
                
                // Calculer la différence en heures
                const hoursDifference = (bookingDate - now) / (1000 * 60 * 60);
                
                // Si le rendez-vous est dans 24 heures (entre 23 et 25 heures)
                if (hoursDifference >= 23 && hoursDifference <= 25) {
                    // Envoyer le rappel
                    this.sendReminderEmail(booking);
                }
            }
        });
    }
    
    // Formater une date pour affichage
    formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    // Formater une heure pour affichage
    formatTime(timeString) {
        if (!timeString) return '';
        
        // Extraire les heures et minutes
        const [hours, minutes] = timeString.split(':');
        return `${hours}h${minutes}`;
    }
}

// Initialiser le système de notifications
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter le script EmailJS s'il n'est pas déjà chargé
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        script.onload = initNotificationSystem;
        document.head.appendChild(script);
    } else {
        initNotificationSystem();
    }
    
    function initNotificationSystem() {
        // Initialiser le système
        window.emailNotifications = new EmailNotificationSystem(EMAIL_CONFIG);
        
        // Rechercher les formulaires de réservation
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            // Ajouter un écouteur d'événement pour l'envoi du formulaire
            bookingForm.addEventListener('submit', function(e) {
                // Collecter les données du formulaire
                const bookingData = {
                    ownerName: document.getElementById('ownerName').value,
                    ownerEmail: document.getElementById('ownerEmail').value,
                    bookingType: document.getElementById('booking_type').value || 'Réservation de service',
                    bookingDate: document.getElementById('booking_date').value,
                    bookingTime: document.getElementById('booking_time').value,
                    bookingId: document.getElementById('booking_id').value || `booking-${Date.now()}`,
                    dogName: document.getElementById('dogName') ? document.getElementById('dogName').value : ''
                };
                
                // Envoyer l'email de confirmation après la soumission réussie
                const originalSubmit = bookingForm.onsubmit;
                bookingForm.onsubmit = function(e) {
                    // Appeler le gestionnaire d'origine s'il existe
                    if (originalSubmit) {
                        const result = originalSubmit.call(this, e);
                        if (result === false) return false;
                    }
                    
                    window.emailNotifications.sendBookingConfirmation(bookingData)
                        .catch(error => {
                            console.error('Error sending confirmation email:', error);
                        });
                    
                    return true;
                };
            });
        }
    }
});

// Nettoyer les anciennes réservations pour éviter de surcharger le localStorage
function cleanupOldBookings() {
    // Récupérer les réservations existantes
    let bookings = JSON.parse(localStorage.getItem('artzainak_bookings') || '[]');
    const now = new Date();
    
    // Filtrer les réservations de plus de 30 jours
    const recentBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        const daysDifference = (now - bookingDate) / (1000 * 60 * 60 * 24);
        return daysDifference <= 30;
    });
    
    // Sauvegarder les réservations récentes
    localStorage.setItem('artzainak_bookings', JSON.stringify(recentBookings));
}

// Nettoyer régulièrement les vieilles réservations
window.addEventListener('load', cleanupOldBookings);
