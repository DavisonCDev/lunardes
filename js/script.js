document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const icon = menuToggle.querySelector('i');

    // --- LÓGICA DE ZOOM NA HERO (MOBILE) ---
    const heroContainer = document.querySelector('.hero-img-container');
    if (heroContainer) {
        heroContainer.addEventListener('click', () => {
            heroContainer.classList.toggle('hero-active-zoom');
        });
    }
    
    // --- LÓGICA DO MENU MOBILE ---
    const toggleMenu = (isOpen) => {
        navLinks.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        }
        body.style.overflow = isOpen ? 'hidden' : 'initial';
    };

    menuToggle.addEventListener('click', () => {
        const isOpening = !navLinks.classList.contains('active');
        toggleMenu(isOpening);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // --- LÓGICA DE REVEAL (Scroll) ---
    const reveal = () => {
        const reveals = document.querySelectorAll('section, .album-showcase, .tour-item');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // --- LÓGICA DO CURSOR PERSONALIZADO ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        const hoverElements = document.querySelectorAll('a, button, .tour-item, input');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // --- LÓGICA DO VÍDEO (Tocar 1x com som -> Loop mudo) ---
    const video = document.getElementById('video-lancamento');
    if (video) {
        video.volume = 1.0; 
        video.loop = false; // Começa sem loop

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Se o navegador bloquear o som, inicia mudo
                console.log("Autoplay com som bloqueado. Iniciando mudo.");
                video.muted = true;
                video.play();
            });
        }

        // Quando terminar a primeira vez...
        video.addEventListener('ended', () => {
            video.muted = true; // Fica mudo
            video.loop = true;  // Ativa o loop
            video.play();       // Toca de novo
        });
    }
});