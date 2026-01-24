document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const icon = menuToggle.querySelector('i');

    // --- LÓGICA DE ZOOM NA HERO (MOBILE) ---
    const heroContainer = document.querySelector('.hero-img-container');
    
    if (heroContainer) {
        heroContainer.addEventListener('click', () => {
            // Alterna a classe que dá o zoom
            heroContainer.classList.toggle('hero-active-zoom');
        });
    }
    
    // --- LÓGICA DO MENU MOBILE ---
    const toggleMenu = (isOpen) => {
        navLinks.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen); // Adiciona classe para girar o ícone se quiser
        
        // Troca o ícone (Bars / Times)
        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        }

        // Trava/Destrava o scroll
        body.style.overflow = isOpen ? 'hidden' : 'initial';
    };

    menuToggle.addEventListener('click', () => {
        const isOpening = !navLinks.classList.contains('active');
        toggleMenu(isOpening);
    });

    // Fechar ao clicar nos links
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
    reveal(); // Executa uma vez ao carregar para mostrar o que já está na tela

    
});