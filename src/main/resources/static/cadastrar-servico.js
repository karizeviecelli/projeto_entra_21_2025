// cadastrar-servico.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalServico');
  const btnAbrir = document.getElementById('btnAbrirModal');
  const btnFechar = document.getElementById('btnFechar');

  // Abrir modal (apenas cadastro, não edição)
  btnAbrir?.addEventListener('click', () => {
    if (window.limparCampos) window.limparCampos();
    modal.classList.add('ativo');
  });

  // Fechar modal
  btnFechar?.addEventListener('click', () => {
    modal.classList.remove('ativo');
    if (window.limparCampos) window.limparCampos();
  });

  // Obs: não adicionamos mais o "btnSalvar" aqui,
  // porque o marketplace.js já cuida disso (decide entre criar/editar)
});
