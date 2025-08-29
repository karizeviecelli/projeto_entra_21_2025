document.addEventListener('DOMContentLoaded', function () {
  const modalCadastro = document.querySelector('#modalOverlay form');
  if (!modalCadastro) return;

  modalCadastro.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value,
      cpf: document.getElementById('cpf').value,
      telefone: document.getElementById('telefone').value
      
    };

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        modalCadastro.reset();
      } else {
        const erro = await response.json();
        alert('Erro ao cadastrar: ' + (erro.message || 'Tente novamente.'));
      }
    } catch (err) {
      alert('Erro de conexão. Tente novamente.');
    }
  });
});
