// Script commun pour toutes les pages

// Detect dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('hidden');
    }
    
    // Add fade-in animation to page elements
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // Initialize lightbox if available
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Image %1 sur %2"
        });
    }
});

// Handle form validation styling
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add validation styling on blur
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required')) {
                    if (this.value.trim() === '') {
                        this.classList.add('border-basque-red');
                    } else {
                        this.classList.remove('border-basque-red');
                        this.classList.add('border-basque-green');
                    }
                }
            });
            
            // Reset validation styling on focus
            input.addEventListener('focus', function() {
                this.classList.remove('border-basque-red');
                this.classList.remove('border-basque-green');
            });
        });
    });
});
// Filtrage de la galerie
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Activer le bouton cliqué et désactiver les autres
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700');
            });
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrer les éléments
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Animation d'apparition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Fonctionnalité "Voir plus"
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        let visibleItems = 8; // Nombre initial d'éléments visibles
        
        // Cacher les éléments supplémentaires au chargement
        galleryItems.forEach((item, index) => {
            if (index >= visibleItems) {
                item.classList.add('hidden');
            }
        });
        
        loadMoreBtn.addEventListener('click', function() {
            // Afficher les 4 éléments suivants
            for (let i = visibleItems; i < visibleItems + 4; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].classList.remove('hidden');
                    // Animation d'apparition
                    galleryItems[i].style.opacity = '0';
                    galleryItems[i].style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        galleryItems[i].style.opacity = '1';
                        galleryItems[i].style.transform = 'scale(1)';
                    }, 50 * (i - visibleItems));
                }
            }
            
            visibleItems += 4;
            
            // Cacher le bouton s'il n'y a plus d'éléments à afficher
            if (visibleItems >= galleryItems.length) {
                loadMoreBtn.classList.add('hidden');
            }
        });
    }
}
