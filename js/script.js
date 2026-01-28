document.addEventListener('DOMContentLoaded', () => {
    /* Seleciona os elementos principais da navegação e do corpo da página */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const icon = menuToggle.querySelector('i');

    /* =========================================
       1. LÓGICA DE ZOOM NA HERO (MOBILE)
       ========================================= */
    const heroContainer = document.querySelector('.hero-img-container');
    if (heroContainer) {
        /* Adiciona ou remove a classe de zoom ao clicar na imagem da banda */
        heroContainer.addEventListener('click', () => {
            heroContainer.classList.toggle('hero-active-zoom');
        });
    }
    
    /* =========================================
       2. LÓGICA DO MENU MOBILE (HAMBÚRGUER)
       ========================================= */
    const toggleMenu = (isOpen) => {
        /* Alterna a visibilidade da lista de links e o estado do botão */
        navLinks.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        
        /* Troca o ícone de barras (fa-bars) pelo ícone de fechar (fa-times) */
        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        }
        
        /* Trava a rolagem da página quando o menu estiver aberto para evitar bugs visuais */
        body.style.overflow = isOpen ? 'hidden' : 'initial';
    };

    /* Evento de clique no botão do menu */
    menuToggle.addEventListener('click', () => {
        const isOpening = !navLinks.classList.contains('active');
        toggleMenu(isOpening);
    });

    /* Fecha o menu automaticamente ao clicar em qualquer link interno */
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    /* =========================================
       3. LÓGICA DE REVEAL (ANIMAÇÃO AO ROLAR)
       ========================================= */
    const reveal = () => {
        const reveals = document.querySelectorAll('section, .album-showcase, .tour-item');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top; /* Posição do elemento em relação ao topo da janela */
            const revealPoint = 150; /* Distância da borda inferior para ativar a animação */
            
            /* Se o elemento entrar na área visível, adiciona a classe 'visible' */
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };
    
    /* Executa a verificação sempre que o usuário rolar a página */
    window.addEventListener('scroll', reveal);
    reveal(); // Executa uma vez ao carregar para mostrar elementos já visíveis

    /* =========================================
       4. LÓGICA DO CURSOR PERSONALIZADO
       ========================================= */
    const cursor = document.querySelector('.custom-cursor');
    
    /* Verifica se o dispositivo suporta hover (tem mouse) antes de ativar o cursor */
    if (cursor && window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            /* Atualiza as coordenadas do cursor baseado na posição do mouse na janela */
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        /* Aplica o efeito de expansão (classe .hovered do CSS) em elementos interativos */
        const hoverElements = document.querySelectorAll('a, button, .tour-item, input');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    /* =========================================
       5. LÓGICA DO VÍDEO (LUNARDES EXPERIENCE)
       ========================================= */
    const video = document.getElementById('video-lancamento');
    if (video) {
        video.volume = 1.0; 
        video.loop = false; // Desativa o loop inicial para detectar o fim da 1ª execução

        const playPromise = video.play();

        /* Trata a política de segurança de navegadores que bloqueiam som automático */
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                /* Se houver erro (bloqueio), inicia o vídeo no mudo para garantir o autoplay */
                console.log("Autoplay com som bloqueado pelo navegador. Iniciando mudo.");
                video.muted = true;
                video.play();
            });
        }

        /* Configura o comportamento após a primeira exibição completa do vídeo */
        video.addEventListener('ended', () => {
            video.muted = true; // Retira o som para não incomodar na repetição infinita
            video.loop = true;  // Ativa o loop nativo
            video.play();       // Reinicia o vídeo
        });
    }
});