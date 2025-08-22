document.addEventListener('DOMContentLoaded', () => {
  const listaServicos = document.getElementById('listaServicos');

  // ===== Modal de Detalhes =====
  let modalDetalhes = document.getElementById('modalDetalhes');
  if (!modalDetalhes) {
    modalDetalhes = document.createElement('div');
    modalDetalhes.className = 'modal';
    modalDetalhes.id = 'modalDetalhes';
    modalDetalhes.innerHTML = `
      <div class="modal-conteudo">
        <h2 id="detalheTitulo"></h2>
        <img id="detalheImagem" src="" alt="" style="width:100%; border-radius:8px; margin-bottom:10px;">
        <p><strong>Descrição:</strong> <span id="detalheDescricao"></span></p>
        <p><strong>Preço:</strong> R$ <span id="detalhePreco"></span></p>
        <p><strong>Cidade:</strong> <span id="detalheCidade"></span></p>
        <hr>
        <p><strong>Email:</strong> <span id="detalheEmail"></span></p>
        <p><strong>Telefone:</strong> <span id="detalheTelefone"></span></p>
        <div style="margin-top:15px; display:flex; gap:10px; justify-content:center;">
          <button id="btnEditar" class="btn-salvar">Editar</button>
          <button id="btnExcluir" class="btn-fechar">Excluir</button>
          <button id="btnFecharDetalhes" class="btn-fechar">Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalDetalhes);
  }

  const $ = (id) => document.getElementById(id);
  const detalheTitulo = $('detalheTitulo');
  const detalheImagem = $('detalheImagem');
  const detalheDescricao = $('detalheDescricao');
  const detalhePreco = $('detalhePreco');
  const detalheCidade = $('detalheCidade');
  const detalheEmail = $('detalheEmail');
  const detalheTelefone = $('detalheTelefone');
  const btnFecharDetalhes = $('btnFecharDetalhes');
  const btnEditar = $('btnEditar');
  const btnExcluir = $('btnExcluir');

  let servicoAtualIndex = null;

  // ===== Abrir Modal de Detalhes =====
  function abrirDetalhesPorIndex(idx) {
    const data = Array.isArray(window.servicosData) ? window.servicosData : [];
    const s = data[idx];
    if (!s) return;

    servicoAtualIndex = idx;

    detalheTitulo.textContent = s.titulo || '';
    detalheImagem.src = s.imagem || 'https://via.placeholder.com/800x450?text=Servi%C3%A7o';
    detalheImagem.alt = s.titulo || 'Serviço';
    detalheDescricao.textContent = s.descricao || '';
    detalhePreco.textContent = Number(s.preco || 0).toFixed(2);
    detalheCidade.textContent = s.cidade || '';
    detalheEmail.textContent = s.email || 'Não informado';
    detalheTelefone.textContent = s.telefone || 'Não informado';

    // fecha modal de edição se estiver aberto
    const modalEdicao = document.getElementById('modalServico');
    modalEdicao?.classList.remove('ativo');

    modalDetalhes.classList.add('ativo');
  }

  // ===== Delegação de Evento nos Cards =====
  listaServicos.addEventListener('click', (e) => {
    const card = e.target.closest('.servico');
    if (!card) return;

    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) {
      abrirDetalhesPorIndex(idx);
      return;
    }

    const idAttr = card.dataset.id;
    if (idAttr && Array.isArray(window.servicosData)) {
      const i = window.servicosData.findIndex(s => String(s.id) === String(idAttr));
      if (i >= 0) abrirDetalhesPorIndex(i);
    }
  });

  listaServicos.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.servico');
    if (!card) return;
    e.preventDefault();
    const idx = Number(card.dataset.index);
    if (!Number.isNaN(idx)) abrirDetalhesPorIndex(idx);
  });

  // ===== Fechar Modal de Detalhes =====
  btnFecharDetalhes.addEventListener('click', () => modalDetalhes.classList.remove('ativo'));
  modalDetalhes.addEventListener('click', (e) => {
    if (e.target === modalDetalhes) modalDetalhes.classList.remove('ativo');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modalDetalhes.classList.remove('ativo');
  });

  // ===== Editar Serviço =====
  btnEditar.addEventListener('click', () => {
    if (servicoAtualIndex == null) return;
    const s = window.servicosData[servicoAtualIndex];
    if (!s) return;

    // Preenche modal de criação/edição
    const modalEdicao = document.getElementById('modalServico');
    if (!modalEdicao) return;

    document.getElementById('titulo').value = s.titulo || '';
    document.getElementById('descricao').value = s.descricao || '';
    document.getElementById('precoServico').value = s.preco || '';
    document.getElementById('cidade').value = s.cidade || '';

    window.edicaoServicoId = s.id ?? null;

    // Fecha modal de detalhes e abre modal de edição
    modalDetalhes.classList.remove('ativo');
    modalEdicao.classList.add('ativo');
  });

  // ===== Excluir Serviço =====
  btnExcluir.addEventListener('click', async () => {
    if (servicoAtualIndex == null) return;
    const s = window.servicosData[servicoAtualIndex];
    if (!s || s.id == null) {
      alert('Não foi possível identificar o ID do serviço para excluir.');
      return;
    }

    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      const resp = await fetch(`http://localhost:8080/servicos/${s.id}`, { method: 'DELETE' });
      if (!resp.ok) {
        alert('Erro ao excluir serviço.');
        return;
      }
      alert('Serviço excluído com sucesso!');
      modalDetalhes.classList.remove('ativo');
      if (window.recarregarServicos) window.recarregarServicos();
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao excluir.');
    }
  });

});
