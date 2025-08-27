document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ===== Sidebar =====
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ===== Variáveis =====
  const listaServicos = document.getElementById("listaServicos");
  const inputBuscar = document.getElementById("buscar");
  const inputPreco = document.getElementById("preco");
  const valorPreco = document.getElementById("valorPreco");
  const btnAbrirModal = document.getElementById("btnAbrirModal");
  const modal = document.getElementById("modalServico");
  const btnFechar = document.getElementById("btnFechar");
  const btnSalvar = document.getElementById("btnSalvar");

  const inputTitulo = document.getElementById("titulo");
  const inputDescricao = document.getElementById("descricao");
  const inputPrecoServico = document.getElementById("precoServico");
  const inputCidade = document.getElementById("cidade");
  const dropbtnCategoria = modal.querySelector(".dropbtn");

  // ===== Estado =====
  window.servicosData = [];
  let servicoEditandoIndex = null;
  window.categoriaFiltro = 'todas';
  window.categoriaSelecionada = null;

  // ===== Funções =====
  function atualizarLabelPreco() {
    const valor = Number(inputPreco.value);
    valorPreco.textContent = valor >= 10000 ? "Sem limite" : `R$ ${valor.toLocaleString()}`;
  }

  function limparCampos() {
    inputTitulo.value = "";
    inputDescricao.value = "";
    inputPrecoServico.value = "";
    inputCidade.value = "";
    dropbtnCategoria.textContent = "Selecione uma categoria";
    window.categoriaSelecionada = null;
    servicoEditandoIndex = null;
  }
  window.limparCampos = limparCampos;

  function criarCardServico(servico, index) {
    const card = document.createElement("div");
    card.classList.add("servico");
    card.dataset.index = index;

    const imagemSrc = servico.imagem || 'https://blog.obramax.com.br/wp-content/uploads/2022/03/pedreiro-empreitada.jpg';

    card.innerHTML = `
      <div class="imagem-container">
        <img src="${imagemSrc}" alt="${servico.titulo}">
      </div>
      <div class="conteudo-servico">
        <h3>${servico.titulo}</h3>
        <p>${servico.descricao}</p>
        <p class="preco">R$ ${Number(servico.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        <p><strong>Cidade:</strong> ${servico.cidade}</p>
        <p><strong>Categoria:</strong> ${servico.categoria || 'Não definido'}</p>
      </div>
    `;

    card.addEventListener('click', () => abrirModalEditar(index));
    return card;
  }

  function renderizarServicos() {
    const termo = inputBuscar.value.toLowerCase();
    const precoMax = Number(inputPreco.value);
    const categoriaSelecionada = window.categoriaFiltro || 'todas';

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
      const correspondeCategoria =
        categoriaSelecionada === 'todas' || servico.categoria === categoriaSelecionada;

      if (correspondeTexto && correspondePreco && correspondeCategoria) {
        listaServicos.appendChild(criarCardServico(servico, index));
        encontrados++;
      }
    });

    if (!encontrados) listaServicos.innerHTML = "<p>Nenhum serviço encontrado com esse filtro.</p>";
  }
  window.renderizarServicos = renderizarServicos;

  function abrirModalEditar(index) {
    servicoEditandoIndex = index;
    const s = window.servicosData[index];

    inputTitulo.value = s.titulo;
    inputDescricao.value = s.descricao;
    inputPrecoServico.value = s.preco;
    inputCidade.value = s.cidade;
    dropbtnCategoria.textContent = s.categoria || "Selecione uma categoria";
    window.categoriaSelecionada = s.categoria || null;

    modal.classList.add("ativo");
  }

  function salvarServico() {
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const preco = Number(inputPrecoServico.value);
    const cidade = inputCidade.value.trim();
    const categoria = window.categoriaSelecionada;

    if (!titulo || !descricao || !preco || !cidade || !categoria) {
      alert("Preencha todos os campos e selecione uma categoria!");
      return;
    }

    const servico = { titulo, descricao, preco, cidade, categoria, imagem: null };

    if (servicoEditandoIndex != null) {
      window.servicosData[servicoEditandoIndex] = { ...window.servicosData[servicoEditandoIndex], ...servico };
      alert("Serviço atualizado!");
    } else {
      window.servicosData.push(servico);
      alert("Serviço cadastrado!");
    }

    limparCampos();
    modal.classList.remove("ativo");
    renderizarServicos();
  }
  window.salvarServico = salvarServico;

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

  // ===== Dropdown Categoria =====
  const dropdowns = modal.querySelectorAll(".dropdown-content div");
  dropdowns.forEach(option => {
    option.addEventListener("click", () => {
      dropbtnCategoria.textContent = option.textContent;
      window.categoriaSelecionada = option.dataset.value;
    });
  });

  // ===== Dropdown Filtro =====
  const dropdownFiltro = document.getElementById('dropdownFiltro');
  const dropbtnFiltro = dropdownFiltro.querySelector('.dropbtn');
  const contentFiltro = dropdownFiltro.querySelector('.dropdown-content');

  dropbtnFiltro.addEventListener('click', e => {
    e.stopPropagation();
    dropdownFiltro.classList.toggle('show');
  });

  contentFiltro.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
      dropbtnFiltro.textContent = option.textContent;
      window.categoriaFiltro = option.dataset.value;
      dropdownFiltro.classList.remove('show');
      renderizarServicos();
    });
  });

  window.addEventListener('click', () => dropdownFiltro.classList.remove('show'));
});
