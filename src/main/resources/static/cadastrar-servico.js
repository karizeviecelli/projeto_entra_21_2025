document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalServico');
  const btnAbrir = document.getElementById('btnAbrirModal');
  const btnFechar = document.getElementById('btnFechar');
  const btnSalvar = document.getElementById('btnSalvar');

  // Abrir modal
  btnAbrir?.addEventListener('click', function () {
    modal.classList.add('ativo');
  });

  // Fechar modal
  btnFechar?.addEventListener('click', function () {
    modal.classList.remove('ativo');
    limparCampos();
  });

  // Salvar serviço
  btnSalvar?.addEventListener('click', async function (e) { console.log('clicou no salvar');
    e.preventDefault();

    const data = {
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value,
      preco: document.getElementById('precoServico').value,
      cidade: document.getElementById('cidade').value
    };

    // Validação simples
    if (!data.titulo || !data.descricao || !data.preco || !data.cidade) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Serviço cadastrado com sucesso!');
        modal.classList.remove('ativo');
        limparCampos();
        // Aqui você pode atualizar a lista de serviços, se desejar
      } else {
        const erro = await response.json();
        alert('Erro ao cadastrar serviço: ' + (erro.message || 'Tente novamente.'));
      }
    } catch (err) {
      alert('Erro de conexão. Tente novamente.');
    }
  });

  

  function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('precoServico').value = '';
    document.getElementById('cidade').value = '';
  }
});