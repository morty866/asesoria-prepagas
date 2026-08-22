document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. MENÚ HAMBURGUESA RESPONSIVE
       ========================================== */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    /* ==========================================
       2. MODO OSCURO (DARK MODE - PREDETERMINADO)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Si no hay preferencia guardada o la preferencia es 'dark', se activa el modo oscuro
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || !savedTheme) {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Cambiar el ícono entre Sol y Luna
            themeToggleBtn.innerHTML = isDarkMode 
                ? '<i class="fa-solid fa-sun"></i>' 
                : '<i class="fa-solid fa-moon"></i>';
                
            // Guardar preferencia del usuario
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }


    /* ==========================================
       3. ANIMACIONES SCROLL CON EFECTO ESCALONADO
       ========================================== */
    const scrollElements = document.querySelectorAll('.js-scroll');

    const elementInView = (el, dividend = 1.25) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
        
        // Animación progresiva para tarjetas
        const cards = element.querySelectorAll('.card, .prepaga-badge, .process-card, .brand-card, .req-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Disparar una vez al cargar la página
    handleScrollAnimation();


    /* ==========================================
       4. PRUEBA SOCIAL (NOTIFICACIONES FLOTANTES)
       ========================================== */
    const socialProofData = [
        { name: "Lucas", location: "La Plata", plan: "Sancor Salud", time: "hace 3 min" },
        { name: "Marlene", location: "CABA", plan: "Swiss Medical", time: "hace 7 min" },
        { name: "Nicolás", location: "Córdoba", plan: "Galeno", time: "hace 12 min" },
        { name: "Carolina", location: "Rosario", plan: "Medifé", time: "hace 5 min" },
        { name: "Gonzalo", location: "Mendoza", plan: "Prevención Salud", time: "hace 18 min" },
        { name: "Valeria", location: "Quilmes", plan: "Avalian", time: "hace 2 min" }
    ];

    const toastContainer = document.createElement('div');
    toastContainer.className = 'social-toast';
    toastContainer.id = 'social-toast';
    toastContainer.innerHTML = `
        <div class="toast-icon"><i class="fa-solid fa-user-check"></i></div>
        <div class="toast-content">
            <p id="toast-text"><strong>Martín</strong> de CABA cotizó <strong>Sancor Salud</strong></p>
            <span id="toast-time" class="toast-time">hace 4 min</span>
        </div>
        <button class="toast-close" id="toast-close">&times;</button>
    `;
    document.body.appendChild(toastContainer);

    const toastText = document.getElementById('toast-text');
    const toastTime = document.getElementById('toast-time');
    const toastClose = document.getElementById('toast-close');

    let toastIndex = 0;

    function showNextToast() {
        const item = socialProofData[toastIndex];
        toastText.innerHTML = `<strong>${item.name}</strong> de ${item.location} cotizó <strong>${item.plan}</strong>`;
        toastTime.innerText = item.time;

        toastContainer.classList.add('show');

        setTimeout(() => {
            toastContainer.classList.remove('show');
        }, 5000);

        toastIndex = (toastIndex + 1) % socialProofData.length;
    }

    // Muestra la primera notificación a los 4s y luego cada 18s
    setTimeout(() => {
        showNextToast();
        setInterval(showNextToast, 18000);
    }, 4000);

    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toastContainer.classList.remove('show');
        });
    }


    /* ==========================================
       6. WHATSAPP DINÁMICO & GLOBO DE DIÁLOGO
       ========================================== */
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const phone = "5491137981939";

    if (whatsappBtn) {
        // Crear el globo flotante de diálogo
        const tooltip = document.createElement('div');
        tooltip.className = 'wa-tooltip';
        tooltip.id = 'wa-tooltip';
        tooltip.innerHTML = `
            <span>¿Buscás cotizar un plan? Te asesoramos sin cargo 💬</span>
            <button class="wa-tooltip-close">&times;</button>
        `;
        whatsappBtn.parentNode.insertBefore(tooltip, whatsappBtn);

        // Mostrar el globo tras 6 segundos
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 6000);

        // Cerrar el globo manualmente
        tooltip.querySelector('.wa-tooltip-close').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            tooltip.classList.remove('show');
        });
    }

    // Actualizar el enlace de WhatsApp según la prepaga interactuada
    function updateWhatsAppLink(prepagaName) {
        if (!whatsappBtn) return;
        const message = `Hola, quisiera recibir información y cotizar el plan de ${prepagaName}.`;
        const encodedMsg = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/${phone}?text=${encodedMsg}`;
    }

    // Detectar cuando el usuario despliega una prepaga en el catálogo
    const detailsElements = document.querySelectorAll('.brand-card details');
    detailsElements.forEach((detail) => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                const card = detail.closest('.brand-card');
                const brandName = card ? card.querySelector('h3').innerText : '';
                if (brandName) {
                    updateWhatsAppLink(brandName);
                }
            }
        });
    });

});