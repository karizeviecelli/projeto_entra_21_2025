document.addEventListener('DOMContentLoaded', () => {
  let selecionados = [];

  const colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
  const listaColaboradores = document.getElementById('listaColaboradores');
  const listaSelecionados = document.getElementById('colaboradoresSelecionados');
  const searchInput = document.getElementById('searchColaborador');

  function renderLista(filtro = "") {
    listaColaboradores.innerHTML = "";
    colaboradores
      .filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()) && !selecionados.includes(c.nome))
      .forEach(c => {
        const li = document.createElement("li");
        li.textContent = c.nome;
        li.style.padding = "8px";
        li.style.cursor = "pointer";
        li.title = "Clique para adicionar";
        li.addEventListener("click", () => adicionarColaborador(c.nome));
        listaColaboradores.appendChild(li);
      });
  }

  function adicionarColaborador(nome) {
    selecionados.push(nome);
    renderLista(searchInput.value);
    renderSelecionados();
  }

  function removerColaborador(nome) {
    selecionados = selecionados.filter(n => n !== nome);
    renderLista(searchInput.value);
    renderSelecionados();
  }

  function renderSelecionados() {
    listaSelecionados.innerHTML = "";
    selecionados.forEach(nome => {
      const li = document.createElement("li");
      li.textContent = nome;
      li.style.padding = "8px";
      li.style.cursor = "pointer";
      li.title = "Clique para remover";
      li.addEventListener("click", () => removerColaborador(nome));
      listaSelecionados.appendChild(li);
    });
  }

  searchInput.addEventListener("input", () => renderLista(searchInput.value));

  renderLista();
  renderSelecionados();

  document.getElementById('formEquipe').addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeEquipe = document.getElementById('nomeEquipe').value;
    const setorEquipe = document.getElementById('setorEquipe').value;

    let equipes = JSON.parse(localStorage.getItem('equipes')) || [];

    equipes.push({
      nome: nomeEquipe,
      setor: setorEquipe,
      membros: selecionados,
      dataCriacao: new Date().toISOString() // Salva data
    });

    localStorage.setItem('equipes', JSON.stringify(equipes));

    alert(`Equipe criada: ${nomeEquipe}`);
    window.location.href = '../Adm/adm.html';
  });
});
