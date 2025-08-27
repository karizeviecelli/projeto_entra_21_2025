// cadastrar-servico.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalServico');
  const btnAbrir = document.getElementById('btnAbrirModal');
  const btnFechar = document.getElementById('btnFechar');
  const btnSalvar = document.getElementById('btnSalvar');

  // Dropdown de categorias
  const dropdown = modal.querySelector('.dropdown');
  const dropbtn = dropdown.querySelector('.dropbtn');
  const content = dropdown.querySelector('.dropdown-content');

  window.categoriaSelecionada = null;

  // Abrir modal
  btnAbrir?.addEventListener('click', () => {
    if (window.limparCampos) window.limparCampos();
    dropbtn.textContent = 'Selecione uma categoria';
    window.categoriaSelecionada = null;
    modal.classList.add('ativo');
  });

  // Fechar modal
  btnFechar?.addEventListener('click', () => {
    modal.classList.remove('ativo');
    if (window.limparCampos) window.limparCampos();
  });

  // Abrir/fechar dropdown
  dropbtn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  // Selecionar categoria
  content.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', e => {
      e.stopPropagation();
      dropbtn.textContent = option.textContent;
      dropdown.classList.remove('show');
      window.categoriaSelecionada = option.dataset.value;
    });
  });

  // Fecha dropdown se clicar fora
  window.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });

  // Atualiza dropdown quando editar
  window.atualizarCategoriaDropdown = categoria => {
    if (!categoria || categoria === 'todas') {
      dropbtn.textContent = 'Selecione uma categoria';
      window.categoriaSelecionada = null;
    } else {
      const opcao = content.querySelector(`div[data-value="${categoria}"]`);
      if (opcao) {
        dropbtn.textContent = opcao.textContent;
        window.categoriaSelecionada = categoria;
      } else {
        dropbtn.textContent = 'Selecione uma categoria';
        window.categoriaSelecionada = null;
      }
    }
  };

  // ===== EVENTO DO SALVAR =====
  btnSalvar?.addEventListener('click', () => {
    // chama a função salvar do marketplace.js
    if (typeof window.salvarServico === 'function') {
      window.salvarServico();
    } else {
      alert('Função salvarServico não encontrada!');
    }
  });
});
