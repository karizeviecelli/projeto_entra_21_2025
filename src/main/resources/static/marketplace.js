lucide.createIcons();

// Sidebar - alternar item ativo
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });
});

// Mock de serviços (simulando o backend)
const servicosData = [
  { titulo: "Desenvolvimento de Website Responsivo", descricao: "Criado do zero com tecnologias modernas como React, Node.js e Tailwind.", preco: 1500, categoria: "Tecnologia" },
  { titulo: "Design de Logo e Identidade Visual", descricao: "Pacote completo de criação visual para sua marca.", preco: 800, categoria: "Design" },
  { titulo: "Limpeza Residencial Completa", descricao: "Equipe treinada para higienização profunda.", preco: 120, categoria: "Domésticos" },
  { titulo: "Consultoria de Marketing Digital", descricao: "Melhore sua presença online com estratégias eficientes.", preco: 2200, categoria: "Marketing" },
  { titulo: "Manutenção de Computadores", descricao: "Formatação, limpeza e otimização de desempenho.", preco: 300, categoria: "Tecnologia" },
  { titulo: "Curso de Fotografia Online", descricao: "Aprenda do básico ao avançado com aulas interativas.", preco: 950, categoria: "Educação" }
];

// Container de serviços
const listaServicos = document.getElementById("listaServicos");

// Inputs de filtro
const inputBuscar = document.getElementById("buscar");
const selectCategoria = document.getElementById("categoria");
const inputPreco = document.getElementById("preco");
const valorPreco = document.getElementById("valorPreco");

// Função para criar card
function criarCardServico(servico) {
  const card = document.createElement("div");
  card.classList.add("servico");
  card.innerHTML = `
    <h3>${servico.titulo}</h3>
    <p>${servico.descricao}</p>
    <span class="preco">R$ ${servico.preco.toLocaleString()}</span>
  `;
  return card;
}

// Função de renderização com filtros
function renderizarServicos() {
  const termo = inputBuscar.value.toLowerCase();
  const categoriaSelecionada = selectCategoria.value;
  const precoMax = Number(inputPreco.value);

  listaServicos.innerHTML = ""; // limpa antes de renderizar

  servicosData.forEach(servico => {
    // Verifica filtros
    const correspondeTexto = servico.titulo.toLowerCase().includes(termo) || servico.descricao.toLowerCase().includes(termo);
    const correspondeCategoria = categoriaSelecionada === "Todas as categorias" || servico.categoria === categoriaSelecionada;
    const correspondePreco = servico.preco <= precoMax;

    if (correspondeTexto && correspondeCategoria && correspondePreco) {
      listaServicos.appendChild(criarCardServico(servico));
    }
  });
}

// Eventos para filtros
inputBuscar.addEventListener("input", renderizarServicos);
selectCategoria.addEventListener("change", renderizarServicos);
inputPreco.addEventListener("input", () => {
  valorPreco.textContent = `R$ ${Number(inputPreco.value).toLocaleString()}`;
  renderizarServicos();
});

// Render inicial
renderizarServicos();
