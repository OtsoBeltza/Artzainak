// Script de correction pour l'affichage du calendrier Cal.com
document.addEventListener('DOMContentLoaded', function() {
    // Résolution du problème de chargement infini du calendrier
    
    // 1. Vérifier si les iframes de calendrier existent
    const calendarIframes = document.querySelectorAll('iframe[id^="cal-iframe-"]');
    const calendarLoaders = document.querySelectorAll('div[id^="loading-"]');
    
    // 2. Définir correctement la fonction hideLoading
    window.hideLoading = function(loaderId) {
        const loader = document.getElementById(loaderId);
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    };
    
    // 3. Forcer le masquage des loaders après un délai (fallback)
    calendarLoaders.forEach(loader => {
        // Masquer le loader après 8 secondes même si l'événement onload n'est pas déclenché
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 8000);
    });
    
    // 4. Ajouter manuellement les écouteurs d'événements onload aux iframes
    calendarIframes.forEach(iframe => {
        iframe.onload = function() {
            const iframeId = iframe.id;
            const loaderId = iframeId.replace('cal-iframe-', 'loading-');
            hideLoading(loaderId);
            console.log(`Iframe ${iframeId} chargé avec succès`);
        };
        
        // Retry mechanism - reload iframe if it fails to load after 10 seconds
        setTimeout(() => {
            if (document.getElementById(iframe.id.replace('cal-iframe-', 'loading-')).style.display !== 'none') {
                console.log(`Rechargement de l'iframe ${iframe.id}...`);
                const originalSrc = iframe.src;
                iframe.src = 'about:blank';
                setTimeout(() => {
                    iframe.src = originalSrc;
                }, 100);
            }
        }, 10000);
    });
    
    // 5. Vérifier que Cal.com est bien initialisé et réinitialiser si nécessaire
    if (typeof Cal === 'undefined') {
        console.warn("Cal.com n'est pas défini, chargement du script...");
        const script = document.createElement('script');
        script.src = "https://app.cal.com/embed/embed.js";
        script.onload = function() {
            console.log("Script Cal.com chargé, initialisation...");
            if (typeof Cal !== 'undefined') {
                initializeCalendar();
            }
        };
        document.head.appendChild(script);
    } else {
        console.log("Cal.com est déjà chargé");
    }
});
