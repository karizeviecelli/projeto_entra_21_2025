document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formColaborador').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeColaborador').value;
    const email = document.getElementById('emailColaborador').value;
    const setor = document.getElementById('setorColaborador').value;
    const senha = document.getElementById('senhaColaborador').value;

    // Pega lista existente ou cria uma nova
    let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    // Adiciona novo colaborador com data de criação
    colaboradores.push({
      nome,
      email,
      setor,
      senha,
      dataCriacao: new Date().toISOString()
    });

    // Salva no localStorage
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));

    alert(`Colaborador criado: ${nome}`);
    window.location.href = '../Adm/adm.html';
  });
});
