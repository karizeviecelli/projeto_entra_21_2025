// cadastrar-servico.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalServico');
  const btnAbrir = document.getElementById('btnAbrirModal');
  const btnFechar = document.getElementById('btnFechar');

  // Lista de categorias
  const categorias = [
    'Construção e Reformas',
    'Serviços de Limpeza',
    'Beleza e Estética',
    'Assistência Técnica',
    'Aulas e Treinamentos',
    'Serviços Automotivos',
    'Eventos e Festas',
    'Saúde e Bem-estar',
    'Transporte e Mudanças',
    'Serviços Domésticos'
  ];

  // Preencher select de categoria dinamicamente
  const selectCategoria = document.getElementById('categoria');
  if (selectCategoria) {
    selectCategoria.innerHTML = ''; // limpa antes
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      selectCategoria.appendChild(option);
    });
  }

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
