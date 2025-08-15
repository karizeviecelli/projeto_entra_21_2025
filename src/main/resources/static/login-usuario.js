document.addEventListener('DOMContentLoaded', function () {
  const formLogin = document.querySelector('#modalLogin form');
  if (!formLogin) return;

  formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      email: document.getElementById('login-email').value,
      senha: document.getElementById('login-senha').value
    };

    try {
      const response = await fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
        formLogin.reset();
        // Aqui é o redirecionamento
        window.location.href = 'marketplace.html';
      } else {
        const erro = await response.text(); // teu backend retorna string
        alert('Erro ao fazer login: ' + erro);
      }
    } catch (err) {
      alert('Erro de conexão. Tente novamente.');
    }
  });
});
