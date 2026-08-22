document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENÚ HAMBURGUESA RESPONSIVE
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

    // 2. MODO OSCURO (DARK MODE)
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Cargar preferencia del localStorage al iniciar
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
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
                
            // Guardar en el almacenamiento del navegador
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // 3. ANIMACIONES SCROLL CON EFECTO ESCALONADO
    const scrollElements = document.querySelectorAll('.js-scroll');

    const elementInView = (el, dividend = 1.25) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
        
        // Animación progresiva para tarjetas
        const cards = element.querySelectorAll('.card, .prepaga-badge');
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
});