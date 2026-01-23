document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Abrir/Fechar menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Opcional: troca o ícone de barras por um X
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');

        // Trava o scroll do site quando o menu está aberto
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'initial';
        }
    });

    // Fechar menu ao clicar em um link (navegação interna)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.style.overflow = 'initial';
            
            // Volta o ícone para barras
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
});

// Efeito de Reveal nas seções ao rolar
function reveal() {
    const reveals = document.querySelectorAll('section');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) {
            reveal.style.opacity = "1";
            reveal.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener('scroll', reveal);