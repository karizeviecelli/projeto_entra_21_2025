// listar-servicos.js
document.addEventListener('DOMContentLoaded', () => {
  const listaServicos = document.getElementById('listaServicos');

  // Mantém a referência global para os serviços
  window.servicosData = window.servicosData || [];

  // Função para carregar serviços do backend
  async function carregarServicos() {
    try {
      const response = await fetch('http://localhost:8080/servicos');
      const servicos = await response.json();

      // Atualiza cache global
      window.servicosData = Array.isArray(servicos) ? servicos : [];

      // Renderiza usando a função do marketplace.js
      if (window.renderizarServicos) {
        window.renderizarServicos();
      }
    } catch (error) {
      listaServicos.innerHTML = '<p>Erro ao carregar serviços.</p>';
      console.error('Erro ao buscar serviços:', error);
    }
  }

  // Deixa global para outros scripts
  window.recarregarServicos = carregarServicos;

  // Carrega a lista na inicialização
  carregarServicos();
});
