    const overlayLogin = document.getElementById('modalLogin');
    const overlayCadastro = document.getElementById('modalOverlay');

    const btnAbrirLogin = document.getElementById('abrirLogin');
    const btnAbrirCadastro = document.getElementById('abrirModal');

    const btnFecharLogin = document.getElementById('fecharLogin');
    const btnFecharCadastro = document.getElementById('fecharModal');

    const overlayElements = [overlayLogin, overlayCadastro];

    // Funções para abrir
    function abrirOverlay(element) {
      element.classList.add('show');
      element.classList.remove('hide');
    }

    // Funções para fechar
    function fecharOverlay(element) {
      element.classList.remove('show');
      element.classList.add('hide');

      // Remove a classe de hide após a animação
      element.addEventListener('animationend', () => {
        element.classList.remove('hide');
      }, { once: true });
    }

    // Eventos de abrir
    btnAbrirLogin.addEventListener('click', () => {
      abrirOverlay(overlayLogin);
    });
    btnAbrirCadastro.addEventListener('click', () => {
      abrirOverlay(overlayCadastro);
    });

    // Eventos de fechar
    btnFecharLogin.addEventListener('click', () => {
      fecharOverlay(overlayLogin);
    });
    btnFecharCadastro.addEventListener('click', () => {
      fecharOverlay(overlayCadastro);
    });

    // Clicar fora do modal também fecha
    overlayLogin.addEventListener('click', (e) => {
      if (e.target === overlayLogin) {
        fecharOverlay(overlayLogin);
      }
    });
    overlayCadastro.addEventListener('click', (e) => {
      if (e.target === overlayCadastro) {
        fecharOverlay(overlayCadastro);
      }
    });