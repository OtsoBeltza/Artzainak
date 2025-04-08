// Optimisations pour mobile
document.addEventListener('DOMContentLoaded', function() {
    // Amélioration de la navigation mobile
    function enhanceMobileNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const mobileNav = document.getElementById('mobileNav');
        
        if (menuToggle && mobileNav) {
            // Ajouter des attributs ARIA pour l'accessibilité
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-controls', 'mobileNav');
            menuToggle.setAttribute('aria-label', 'Menu principal');
            
            menuToggle.addEventListener('click', () => {
                const isExpanded = mobileNav.classList.toggle('hidden');
                menuToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            });
            
            // Fermer le menu lors d'un clic à l'extérieur
            document.addEventListener('click', (e) => {
                if (!mobileNav.classList.contains('hidden') && 
                    !mobileNav.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    mobileNav.classList.add('hidden');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Améliorer les formulaires pour mobile
    function enhanceMobileFormExperience() {
        // Optimiser les formulaires pour éviter le zoom sur les champs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type !== 'checkbox' && input.type !== 'radio') {
                input.style.fontSize = '16px'; // Empêche le zoom auto sur iOS
            }
        });
        
        // Améliorer la validation des formulaires sur mobile
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    
                    // Trouver le premier champ invalide
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) {
                        // Scroll en douceur vers le champ
                        firstInvalid.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        
                        // Focus après le scroll
                        setTimeout(() => {
                            firstInvalid.focus();
                        }, 500);
                    }
                }
            });
        });
    }

    // Améliorer les performances de scroll sur mobile
    function enhanceMobileScrolling() {
        // Améliorer le défilement des pages longues
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Ne pas interférer avec les liens vides ou javascript:void(0)
                if (targetId === '#' || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Tenir compte du header fixe
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Optimiser les images pour le mobile
    function optimizeImagesForMobile() {
        // Vérifier si l'appareil est mobile
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        if (isMobile) {
            // Retarder le chargement des images hors écran
            const lazyLoadImages = document.querySelectorAll('img:not(.loaded)');
            
            if ('IntersectionObserver' in window) {
                const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                            }
                            
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                });
                
                lazyLoadImages.forEach(img => {
                    if (!img.classList.contains('loaded')) {
                        lazyLoadObserver.observe(img);
                    }
                });
            }
        }
    }

    // Appliquer toutes les optimisations
    enhanceMobileNavigation();
    enhanceMobileFormExperience();
    enhanceMobileScrolling();
    optimizeImagesForMobile();
    
    // Ajouter la classe CSS pour indiquer que le JS est actif
    document.body.classList.add('js-enabled');
});

// Ajouter des styles spécifiques pour mobile
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 640px) {
        /* Ajustements généraux pour les petits écrans */
        h1, h2 {
            font-size: 1.5rem;
        }
        
        /* Ajustement pour la galerie */
        .gallery-item {
            aspect-ratio: 1/1;
        }
        
        /* Optimisation des formulaires */
        input, select, textarea {
            font-size: 16px; /* Évite le zoom automatique sur iOS */
        }
        
        /* Meilleure réactivité pour les clics mobiles */
        a, button {
            transition: transform 0.2s ease;
        }
        
        a:active, button:active {
            transform: scale(0.97);
        }
    }
    
    /* Optimisations pour l'accessibilité sur mobile */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(mobileStyles);
