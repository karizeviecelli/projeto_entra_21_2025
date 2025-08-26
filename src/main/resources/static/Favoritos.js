lucide.createIcons();

const listaFavoritos = document.getElementById("listaFavoritos");
const inputBuscar = document.getElementById("buscarFavorito");
const selectCategoria = document.getElementById("categoriaFavorito");
const selectOrdenar = document.getElementById("ordenarFavorito");

// dados simulados  
let favoritosData = [
  { id: 1, titulo: "Desenvolvimento de Website Responsivo", descricao: "Criação moderna usando React e Tailwind.", preco: 1500, categoria: "Tecnologia", nota: 4.8, cidade: "São Paulo" },
  { id: 2, titulo: "Design de Logo e Identidade Visual", descricao: "Criação de identidade visual completa.", preco: 800, categoria: "Design", nota: 4.9, cidade: "Curitiba" },
  { id: 3, titulo: "Consultoria em Marketing Digital", descricao: "Aumente suas vendas com estratégias digitais.", preco: 600, categoria: "Marketing", nota: 4.7, cidade: "Porto Alegre" }
];

// estatísticas
function atualizarEstatisticas() {
  document.getElementById("qtdFavoritos").textContent = favoritosData.length;
  const media = favoritosData.length ? 
    (favoritosData.reduce((acc, s) => acc + s.nota, 0) / favoritosData.length).toFixed(1) : 0;
  document.getElementById("notaMedia").textContent = media;
  document.getElementById("visualizacoes").textContent = (favoritosData.length * 4); // simulação
}

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
