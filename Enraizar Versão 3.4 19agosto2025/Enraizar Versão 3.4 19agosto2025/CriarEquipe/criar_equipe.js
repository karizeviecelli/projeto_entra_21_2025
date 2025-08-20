document.addEventListener('DOMContentLoaded', async () => {
  let selecionados = [];

  // busca colaboradores do backend
  const colResp = await fetch('http://localhost:8080/api/usuarios');
  const colaboradores = (await colResp.json()).filter(u => (u.tipoUsuario || '').toUpperCase() !== 'ADMIN');

  const listaColaboradores = document.getElementById('listaColaboradores');
  const listaSelecionados = document.getElementById('colaboradoresSelecionados');
  const searchInput = document.getElementById('searchColaborador');

  function renderLista(filtro = "") {
    listaColaboradores.innerHTML = "";
    colaboradores
      .filter(c => (c.nomeCompleto || '').toLowerCase().includes(filtro.toLowerCase()) && !selecionados.includes(c.id))
      .forEach(c => {
        const li = document.createElement("li");
        li.textContent = c.nomeCompleto;
        li.style.padding = "8px";
        li.style.cursor = "pointer";
        li.addEventListener("click", () => { selecionados.push(c.id); renderSelecionados(); renderLista(searchInput.value); });
        listaColaboradores.appendChild(li);
      });
  }

  function renderSelecionados() {
    listaSelecionados.innerHTML = "";
    colaboradores.filter(c => selecionados.includes(c.id)).forEach(c => {
      const li = document.createElement("li");
      li.textContent = c.nomeCompleto;
      li.style.padding = "8px";
      li.style.cursor = "pointer";
      li.addEventListener("click", () => { selecionados = selecionados.filter(id => id !== c.id); renderSelecionados(); renderLista(searchInput.value); });
      listaSelecionados.appendChild(li);
    });
  }

  searchInput.addEventListener("input", () => renderLista(searchInput.value));

  renderLista();
  renderSelecionados();

  document.getElementById('formEquipe').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nomeEquipe = document.getElementById('nomeEquipe').value;
    // setor opcional
    try{
      const resp = await fetch('http://localhost:8080/api/equipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeEquipe: nomeEquipe, membros: selecionados.map(id => ({ id })) })
      });
      if (!resp.ok) throw new Error(await resp.text());
      alert(`Equipe criada: ${nomeEquipe}`);
      window.location.href = '../Adm/adm.html';
    }catch(err){
      console.error(err);
      alert('Falha ao criar equipe: ' + err.message);
    }
  });
});
