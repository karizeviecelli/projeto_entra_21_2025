document.addEventListener('DOMContentLoaded', () => {
  const listaServicos = document.getElementById('listaServicos');

  fetch('http://localhost:8080/servicos')
    .then(response => response.json())
    .then(servicos => {
      listaServicos.innerHTML = '';
      servicos.forEach(servico => {
        const div = document.createElement('div');
        div.className = 'servico';
        div.innerHTML = `
        <img src="https://blog.obramax.com.br/wp-content/uploads/2022/03/pedreiro-empreitada.jpg" alt="${servico.titulo}" width="260px" />
          <h3>${servico.titulo}</h3>
          <p><strong>Descrição:</strong> ${servico.descricao || ''}</p>
          <p><strong>Preço:</strong> R$ ${servico.preco.toFixed(2)}</p>
          <p><strong>Cidade:</strong> ${servico.cidade}</p>
        `;
        listaServicos.appendChild(div);
      });
    })
    .catch(error => {
      listaServicos.innerHTML = '<p>Erro ao carregar serviços.</p>';
      console.error(error);
    });
});