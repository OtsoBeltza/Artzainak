/**
 * Optimisations de performance pour le site Artzainak
 */

// Encapsulation du code dans une IIFE pour éviter les variables globales
(function() {
    // Classe pour les optimisations de performance
    class PerformanceOptimizer {
        constructor() {
            this.initLazyLoading();
            this.initResourceHints();
            this.optimizeScripts();
            this.optimizeFonts();
            this.optimizeCSSRendering();
        }
        
        // Initialiser le chargement différé des images et iframes
        initLazyLoading() {
            // Utiliser l'API IntersectionObserver pour le chargement paresseux
            if ('IntersectionObserver' in window) {
                // Observer pour les images
                const imgObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            
                            if (src) {
                                img.src = src;
                                img.removeAttribute('data-src');
                                img.classList.add('loaded');
                            }
                            
                            observer.unobserve(img);
                        }
                    });
                });
                
                // Observer pour les iframes (Cal.com, etc.)
                const iframeObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const iframe = entry.target;
                            const src = iframe.getAttribute('data-src');
                            
                            if (src) {
                                iframe.src = src;
                                iframe.removeAttribute('data-src');
                            }
                            
                            observer.unobserve(iframe);
                        }
                    });
                });
                
                // Appliquer aux images
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imgObserver.observe(img);
                });
                
                // Appliquer aux iframes
                document.querySelectorAll('iframe[data-src]').forEach(iframe => {
                    iframeObserver.observe(iframe);
                });
                
                // Convertir les images normales en images lazy
                document.querySelectorAll('img:not([data-src])').forEach(img => {
                    // Ignorer les petites images et les icônes
                    if (img.width > 100 && img.height > 100 && !img.src.includes('icon') && !img.src.includes('logo')) {
                        const src = img.src;
                        img.setAttribute('data-src', src);
                        img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E';
                        imgObserver.observe(img);
                    }
                });
            } else {
                // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
                this.loadImagesImmediately();
            }
        }
        
        // Charger les images immédiatement (fallback)
        loadImagesImmediately() {
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
            
            document.querySelectorAll('iframe[data-src]').forEach(iframe => {
                iframe.src = iframe.getAttribute('data-src');
                iframe.removeAttribute('data-src');
            });
        }
        
        // Ajouter des indices de ressources pour améliorer le chargement
        initResourceHints() {
            const head = document.head;
            
            // Préconnexion aux domaines externes
            const connections = [
                'https://cdn.tailwindcss.com',
                'https://cdnjs.cloudflare.com',
                'https://app.cal.com',
                'https://fonts.googleapis.com'
            ];
            
            connections.forEach(url => {
                if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'preconnect';
                    link.href = url;
                    head.appendChild(link);
                    
                    // DNS-prefetch comme fallback
                    const dnsLink = document.createElement('link');
                    dnsLink.rel = 'dns-prefetch';
                    dnsLink.href = url;
                    head.appendChild(dnsLink);
                }
            });
        }
        
        // Optimiser le chargement des scripts
        optimizeScripts() {
            // Retarder le chargement des scripts non critiques
            document.querySelectorAll('script:not([async]):not([defer])').forEach(script => {
                if (!script.src || 
                    script.src.includes('tailwind') || 
                    script.src.includes('script.js')) {
                    return; // Ignorer les scripts essentiels
                }
                
                // Remplacer par un chargement différé
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                
                // Ajouter les attributs
                newScript.defer = true;
                
                // Remplacer le script
                script.parentNode.replaceChild(newScript, script);
            });
        }
        
        // Optimiser les polices
        optimizeFonts() {
            // Ajouter display swap pour les polices
            const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
            
            fontLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (!href.includes('&display=swap')) {
                    link.setAttribute('href', href + '&display=swap');
                }
            });
            
            // Utiliser font-display: swap dans le CSS
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-display: swap;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Optimiser le rendu CSS
        optimizeCSSRendering() {
            // Détecter les propriétés critiques
            const style = document.createElement('style');
            style.textContent = `
                /* Propriétés critiques pour éviter les changements de mise en page */
                img, iframe, .gallery-item, .service-card {
                    width: 100%;
                    height: auto;
                }
                
                /* Prévenir les shifts de contenu */
                main {
                    min-height: 400px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Exécuter après le chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        // Initialiser l'optimiseur de performance
        new PerformanceOptimizer();
    });
})(); // Fin de l'IIFE
