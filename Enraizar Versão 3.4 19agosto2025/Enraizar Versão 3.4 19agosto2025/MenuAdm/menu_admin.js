document.addEventListener('DOMContentLoaded', () => {
  const saudacao = document.getElementById('saudacao');
  const menuDropdown = document.getElementById('menuDropdown');
  const logoutBtn = document.getElementById('logout');
  const alterarSenhaBtn = document.getElementById('alterarSenha');

  // Exibe/oculta menu do usuário ao clicar na saudação
  if (saudacao && menuDropdown) {
    saudacao.addEventListener('click', (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle('show');
    });
  }

  // Fecha menu se clicar fora dele
  document.addEventListener('click', (e) => {
    if (menuDropdown && !menuDropdown.contains(e.target) && e.target !== saudacao) {
      menuDropdown.classList.remove('show');
    }
  });

  // Botão Alterar Senha
  if (alterarSenhaBtn) {
    alterarSenhaBtn.addEventListener('click', () => {
      window.location.href = 'alterar_senha.html';
    });
  }

  // Botão Sair (logout)
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // ⚠️ Antes limpava TUDO com localStorage.clear()
      // Agora, só limpamos sessionStorage para não perder dados salvos
      sessionStorage.clear();
      window.location.href = '../login/login.html';
    });
  }
});
