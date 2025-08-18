const overlayLogin = document.getElementById('modalLogin');
const overlayCadastro = document.getElementById('modalOverlay');
const overlayComoFunciona = document.getElementById('modalComoFunciona');
const overlayCategorias = document.getElementById('modalCategorias');
const overlaySuporte = document.getElementById('modalSuporte');

const btnAbrirLogin = document.getElementById('abrirLogin');
const btnAbrirCadastro = document.getElementById('abrirModal');
const btnAbrirCadastroViaBusca = document.getElementById('abrirModalBusca');

const btnAbrirComoFunciona = document.getElementById('abrirComoFunciona');
const btnAbrirCategorias = document.getElementById('abrirCategorias');
const btnAbrirSuporte = document.getElementById('abrirSuporte');

const btnFecharLogin = document.getElementById('fecharLogin');
const btnFecharCadastro = document.getElementById('fecharModal');
const btnFecharComoFunciona = document.getElementById('fecharComoFunciona');
const btnFecharCategorias = document.getElementById('fecharCategorias');
const btnFecharSuporte = document.getElementById('fecharSuporte');

function abrirOverlay(element) {
  element.classList.add('show');
  element.classList.remove('hide');
}

function fecharOverlay(element) {
  element.classList.remove('show');
  element.classList.add('hide');
  element.addEventListener('animationend', () => {
    element.classList.remove('hide');
  }, { once: true });
}

if (btnAbrirCadastroViaBusca) {
  btnAbrirCadastroViaBusca.addEventListener('click', () => {
    abrirOverlay(overlayCadastro);
  });
}

// Eventos abrir
btnAbrirLogin.addEventListener('click', () => abrirOverlay(overlayLogin));
btnAbrirCadastro.addEventListener('click', () => abrirOverlay(overlayCadastro));
btnAbrirComoFunciona.addEventListener('click', () => abrirOverlay(overlayComoFunciona));
btnAbrirCategorias.addEventListener('click', () => abrirOverlay(overlayCategorias));
btnAbrirSuporte.addEventListener('click', () => abrirOverlay(overlaySuporte));

// Eventos fechar
btnFecharLogin.addEventListener('click', () => fecharOverlay(overlayLogin));
btnFecharCadastro.addEventListener('click', () => fecharOverlay(overlayCadastro));
btnFecharComoFunciona.addEventListener('click', () => fecharOverlay(overlayComoFunciona));
btnFecharCategorias.addEventListener('click', () => fecharOverlay(overlayCategorias));
btnFecharSuporte.addEventListener('click', () => fecharOverlay(overlaySuporte));

// Fechar clicando fora do modal
[overlayLogin, overlayCadastro, overlayComoFunciona, overlayCategorias, overlaySuporte].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharOverlay(modal);
  });
});

const overlayEsqueciSenha = document.getElementById('modalEsqueciSenha');
const btnAbrirEsqueciSenha = document.getElementById('abrirEsqueciSenha');
const btnFecharEsqueciSenha = document.getElementById('fecharEsqueciSenha');

// Abrir
btnAbrirEsqueciSenha.addEventListener('click', (e) => {
  e.preventDefault(); // evita reload da página
  fecharOverlay(overlayLogin); // fecha o modal de login
  abrirOverlay(overlayEsqueciSenha); // abre o de esqueci senha
});


// Fechar
btnFecharEsqueciSenha.addEventListener('click', () => fecharOverlay(overlayEsqueciSenha));

// Fechar clicando fora
overlayEsqueciSenha.addEventListener('click', (e) => {
  if (e.target === overlayEsqueciSenha) fecharOverlay(overlayEsqueciSenha);
});

