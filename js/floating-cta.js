// Bouton CTA flottant
document.addEventListener('DOMContentLoaded', function() {
    // Créer l'élément HTML du CTA flottant
    const ctaElement = document.createElement('div');
    ctaElement.innerHTML = `
        <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
            <!-- Boutons d'action (cachés par défaut) -->
            <div id="floating-actions" class="flex flex-col items-end space-y-2 scale-0 opacity-0 transform origin-bottom-right transition-all duration-300">
                <a href="reservation.html" class="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg flex items-center transition-all duration-300 w-12 h-12 hover:w-auto group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="ml-2 mr-2 whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Réserver un cours</span>
                </a>
                
                <a href="location.html" class="bg-basque-green hover:bg-basque-green/80 text-white rounded-full p-3 shadow-lg flex items-center transition-all duration-300 w-12 h-12 hover:w-auto group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="ml-2 mr-2 whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Louer des brebis</span>
                </a>
                
                <a href="tel:+33608919431" class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg flex items-center transition-all duration-300 w-12 h-12 hover:w-auto group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="ml-2 mr-2 whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Appeler</span>
                </a>
            </div>
            
            <!-- Bouton principal qui active/désactive les autres boutons -->
            <button id="floating-toggle" class="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transition-all duration-300 focus:outline-none flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" id="toggle-icon-plus" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="toggle-icon-minus" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    
    // Ajouter à la page
    document.body.appendChild(ctaElement);
    
    // Logique pour le bouton flottant
    const floatingToggle = document.getElementById('floating-toggle');
    const floatingActions = document.getElementById('floating-actions');
    const toggleIconPlus = document.getElementById('toggle-icon-plus');
    const toggleIconMinus = document.getElementById('toggle-icon-minus');
    
    if (floatingToggle && floatingActions) {
        // État initial
        let isOpen = false;
        
        // Fonction pour basculer l'état du menu flottant
        function toggleFloatingMenu() {
            isOpen = !isOpen;
            
            if (isOpen) {
                // Ouvrir le menu
                floatingActions.classList.remove('scale-0', 'opacity-0');
                floatingActions.classList.add('scale-100', 'opacity-100');
                
                // Changer l'icône
                toggleIconPlus.classList.add('hidden');
                toggleIconMinus.classList.remove('hidden');
                
                // Animation de rotation
                floatingToggle.classList.add('rotate-45');
            } else {
                // Fermer le menu
                floatingActions.classList.add('scale-0', 'opacity-0');
                floatingActions.classList.remove('scale-100', 'opacity-100');
                
                // Changer l'icône
                toggleIconPlus.classList.remove('hidden');
                toggleIconMinus.classList.add('hidden');
                
                // Animation de rotation
                floatingToggle.classList.remove('rotate-45');
            }
        }
        
        // Ajouter l'écouteur d'événement au bouton
        floatingToggle.addEventListener('click', toggleFloatingMenu);
        
        // Fermer le menu si on clique ailleurs sur la page
        document.addEventListener('click', function(e) {
            if (isOpen && !floatingToggle.contains(e.target) && !floatingActions.contains(e.target)) {
                toggleFloatingMenu();
            }
        });
        
        // Afficher le menu flottant après 5 secondes sur la page
        const currentPath = window.location.pathname;
        if (!currentPath.includes('reservation.html') && !currentPath.includes('location.html') && !currentPath.includes('contact.html')) {
            setTimeout(() => {
                toggleFloatingMenu();
                
                // Le fermer automatiquement après 5 secondes
                setTimeout(() => {
                    if (isOpen) {
                        toggleFloatingMenu();
                    }
                }, 5000);
            }, 5000);
        }
    }
});
