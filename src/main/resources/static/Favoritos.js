lucide.createIcons();

const listaFavoritos = document.getElementById("listaFavoritos");
const inputBuscar = document.getElementById("buscarFavorito");
const selectCategoria = document.getElementById("categoriaFavorito");
const selectOrdenar = document.getElementById("ordenarFavorito");


// criar card
function criarCardFavorito(servico) {
  const card = document.createElement("div");
  card.classList.add("servico");
  card.innerHTML = `
    <h3>${servico.titulo}</h3>
    <p>${servico.descricao}</p>
    <p><strong>Preço:</strong> R$ ${servico.preco}</p>
    <p><strong>Categoria:</strong> ${servico.categoria}</p>
    <p><strong>Cidade:</strong> ${servico.cidade}</p>
    <button class="btn-remover" title="Remover dos favoritos">&times;</button>
  `;

  card.querySelector(".btn-remover").addEventListener("click", () => {
    favoritosData = favoritosData.filter(f => f.id !== servico.id);
    renderizarFavoritos();
  });

  return card;
}

// renderizar
function renderizarFavoritos() {
  let dados = [...favoritosData];
  const termo = inputBuscar.value.toLowerCase();

  // filtros
  if (termo) {
    dados = dados.filter(f => f.titulo.toLowerCase().includes(termo) || f.descricao.toLowerCase().includes(termo));
  }
  if (selectCategoria.value !== "Todas as categorias") {
    dados = dados.filter(f => f.categoria === selectCategoria.value);
  }

  // ordenar
  if (selectOrdenar.value === "Menor preço") dados.sort((a, b) => a.preco - b.preco);
  if (selectOrdenar.value === "Maior preço") dados.sort((a, b) => b.preco - a.preco);

  listaFavoritos.innerHTML = "";
  dados.forEach(s => listaFavoritos.appendChild(criarCardFavorito(s)));

  atualizarEstatisticas();
}

// eventos
inputBuscar.addEventListener("input", renderizarFavoritos);
selectCategoria.addEventListener("change", renderizarFavoritos);
selectOrdenar.addEventListener("change", renderizarFavoritos);

// inicial
renderizarFavoritos();
