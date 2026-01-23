// Função para adicionar a classe 'visible' às seções quando elas aparecem na tela
function revealSections() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.8) { // Ajuste o valor 0.8 para controlar quando a animação começa
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealSections);
revealSections(); // Chama a função ao carregar a página