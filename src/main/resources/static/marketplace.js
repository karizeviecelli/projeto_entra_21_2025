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
  { titulo: "Desenvolvimento de Website Responsivo", descricao: "Criado do zero com tecnologias modernas como React, Node.js e Tailwind.", preco: 1500, categoria: "Tecnologia", cidade: "São Paulo", tipoPreco: "serviço" },
  { titulo: "Design de Logo e Identidade Visual", descricao: "Pacote completo de criação visual para sua marca.", preco: 800, categoria: "Design", cidade: "Rio de Janeiro", tipoPreco: "serviço" },
  { titulo: "Limpeza Residencial Completa", descricao: "Equipe treinada para higienização profunda.", preco: 120, categoria: "Domésticos", cidade: "Curitiba", tipoPreco: "dia" },
  { titulo: "Consultoria de Marketing Digital", descricao: "Melhore sua presença online com estratégias eficientes.", preco: 2200, categoria: "Marketing", cidade: "Porto Alegre", tipoPreco: "serviço" },
  { titulo: "Manutenção de Computadores", descricao: "Formatação, limpeza e otimização de desempenho.", preco: 300, categoria: "Tecnologia", cidade: "Blumenau", tipoPreco: "serviço" },
  { titulo: "Curso de Fotografia Online", descricao: "Aprenda do básico ao avançado com aulas interativas.", preco: 950, categoria: "Educação", cidade: "Belo Horizonte", tipoPreco: "curso" }
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
    <p><strong>Preço:</strong> R$ ${servico.preco.toLocaleString()} <em>/ ${servico.tipoPreco}</em></p>
    <p><strong>Cidade:</strong> ${servico.cidade}</p>
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
    const correspondeTexto =
      servico.titulo.toLowerCase().includes(termo) ||
      servico.descricao.toLowerCase().includes(termo);
    const correspondeCategoria =
      categoriaSelecionada === "Todas as categorias" ||
      servico.categoria === categoriaSelecionada;
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

// ===== Modal =====
const btnAbrirModal = document.getElementById("btnAbrirModal");
const modal = document.getElementById("modalServico");
const btnFechar = document.getElementById("btnFechar");
const btnSalvar = document.getElementById("btnSalvar");

btnAbrirModal.addEventListener("click", () => {
  modal.classList.add("ativo");
});

btnFechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

btnSalvar.addEventListener("click", () => {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const preco = Number(document.getElementById("precoServico").value);
  const tipoPreco = document.getElementById("tipoPreco").value;
  const cidade = document.getElementById("cidade").value;

  if (!titulo || !descricao || !preco || !cidade) {
    alert("Preencha todos os campos!");
    return;
  }

  // Adiciona ao array (pra funcionar com filtros também)
  servicosData.push({ titulo, descricao, preco, categoria: "Outros", cidade, tipoPreco });

  renderizarServicos(); // atualiza lista
  modal.classList.remove("ativo");

  // Limpar campos
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("precoServico").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("tipoPreco").value = "hora";
});
