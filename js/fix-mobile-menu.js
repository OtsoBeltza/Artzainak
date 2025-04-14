// Script pour corriger le menu mobile sur toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments du menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle && mobileNav) {
        // Supprimer tous les écouteurs d'événements existants (si possible)
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Ajouter un nouvel écouteur d'événements
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Basculer la classe 'hidden' pour afficher/masquer le menu
            mobileNav.classList.toggle('hidden');
            
            // Mettre à jour l'attribut aria-expanded pour l'accessibilité
            const isExpanded = !mobileNav.classList.contains('hidden');
            this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            
            console.log('Menu mobile toggled:', isExpanded);
        });
        
        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(e) {
            if (!mobileNav.classList.contains('hidden') && 
                !mobileNav.contains(e.target) && 
                !newMenuToggle.contains(e.target)) {
                mobileNav.classList.add('hidden');
                newMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        console.log('Menu mobile script initialized');
    } else {
        console.error('Menu mobile elements not found');
    }
});
