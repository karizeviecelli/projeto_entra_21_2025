// marketplace.js
lucide.createIcons();

// ===== Sidebar =====
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== Variáveis Globais =====
window.servicosData = [];
const listaServicos = document.getElementById("listaServicos");

const inputBuscar = document.getElementById("buscar");
const inputPreco = document.getElementById("preco");
const valorPreco = document.getElementById("valorPreco");

const btnAbrirModal = document.getElementById("btnAbrirModal");
const modal = document.getElementById("modalServico");
const btnFechar = document.getElementById("btnFechar");
const btnSalvar = document.getElementById("btnSalvar");

// Controle de edição
let servicoEditandoIndex = null;

// ===== Funções =====
function atualizarLabelPreco() {
  const valor = Number(inputPreco.value);
  valorPreco.textContent = valor >= 10000 ? "Sem limite" : `R$ ${valor.toLocaleString()}`;
}

function criarCardServico(servico, index) {
  const card = document.createElement("div");
  card.classList.add("servico");
  card.dataset.index = index;

  card.innerHTML = `
    <img src="${servico.imagem || 'https://blog.obramax.com.br/wp-content/uploads/2022/03/pedreiro-empreitada.jpg'}" 
         alt="${servico.titulo}" width="260">
    <h3>${servico.titulo}</h3>
    <p>${servico.descricao}</p>
    <p><strong>Preço:</strong> R$ ${Number(servico.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
    <p><strong>Cidade:</strong> ${servico.cidade}</p>
  `;

  card.addEventListener('click', () => abrirModalEditar(index));
  return card;
}

function renderizarServicos() {
  const termo = inputBuscar.value.toLowerCase();
  const precoMax = Number(inputPreco.value);

  listaServicos.innerHTML = "";

  if (!window.servicosData.length) {
    listaServicos.innerHTML = '<p>Nenhum serviço cadastrado ainda.</p>';
    return;
  }

  let encontrados = 0;

  window.servicosData.forEach((servico, index) => {
    const correspondeTexto =
      servico.titulo.toLowerCase().includes(termo) ||
      servico.descricao.toLowerCase().includes(termo);

    const correspondePreco = precoMax >= 10000 || Number(servico.preco) <= precoMax;

    if (correspondeTexto && correspondePreco) {
      listaServicos.appendChild(criarCardServico(servico, index));
      encontrados++;
    }
  });

  if (!encontrados) listaServicos.innerHTML = "<p>Nenhum serviço encontrado com esse filtro.</p>";
}

function abrirModalEditar(index) {
  const servico = window.servicosData[index];
  if (!servico) return;

  servicoEditandoIndex = index;

  document.getElementById("titulo").value = servico.titulo;
  document.getElementById("descricao").value = servico.descricao;
  document.getElementById("precoServico").value = servico.preco;
  document.getElementById("cidade").value = servico.cidade;

  modal.querySelector('h2').textContent = "Editar Serviço";
  modal.classList.add("ativo");
}

function limparCampos() {
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("precoServico").value = "";
  document.getElementById("cidade").value = "";
  servicoEditandoIndex = null;
  modal.querySelector('h2').textContent = "Cadastrar Serviço";
}

// ===== Função salvar serviço (POST/PUT) =====
async function salvarServico() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const preco = Number(document.getElementById("precoServico").value);
  const cidade = document.getElementById("cidade").value.trim();

  if (!titulo || !descricao || isNaN(preco) || preco <= 0 || !cidade) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  try {
    let servicoAtual = null;

    if (servicoEditandoIndex !== null) {
      // Edição
      const id = window.servicosData[servicoEditandoIndex].id;
      const response = await fetch(`http://localhost:8080/servicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, preco, cidade })
      });

      if (!response.ok) throw new Error("Erro ao editar serviço");

      servicoAtual = await response.json();
      window.servicosData[servicoEditandoIndex] = servicoAtual;

    } else {
      // Criação
      const response = await fetch('http://localhost:8080/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, preco, cidade })
      });

      if (!response.ok) throw new Error("Erro ao criar serviço");

      servicoAtual = await response.json();
      window.servicosData.push(servicoAtual);
    }

    modal.classList.remove("ativo");
    limparCampos();
    renderizarServicos();

  } catch (err) {
    console.error(err);
    alert(err.message || "Erro ao salvar serviço.");
  }
}

// ===== Eventos =====
btnAbrirModal.addEventListener("click", () => {
  limparCampos();
  modal.classList.add("ativo");
});

btnFechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
  limparCampos();
});

btnSalvar.addEventListener("click", salvarServico);

inputBuscar.addEventListener("input", renderizarServicos);
inputPreco.addEventListener("input", () => {
  atualizarLabelPreco();
  renderizarServicos();
});

// Inicialização
inputPreco.value = 10000;
atualizarLabelPreco();
renderizarServicos();

window.renderizarServicos = renderizarServicos;
