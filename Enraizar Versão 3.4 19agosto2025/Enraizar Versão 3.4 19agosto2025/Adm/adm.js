// --- Enraizar ADM gráfico (patch anti-loop) ---
document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://localhost:8080/api';

  async function getDadosColaboradores() {
    const r = await fetch(`${API}/usuarios`);
    const lista = await r.json();
    return lista.filter(u => (u.tipoUsuario || '').toUpperCase() !== 'ADMIN');
  }
  async function getDadosEquipes() {
    const r = await fetch(`${API}/equipes`);
    return r.json();
  }
  async function getHumorUsuario(id) {
    const r = await fetch(`${API}/humor/usuario/${id}`);
    return r.json();
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const emojisHumor = ['😢','😟','😐','🙂','😊','😄','😁','🤩','🥳','😍','😎'];
  const labelsDias = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const labelsMeses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  function formatarEixoY(value) {
    const idx = Math.max(0, Math.min(10, Math.round(value)));
    return emojisHumor[idx] || idx;
  }

  // Uma única instância
  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: labelsDias, datasets: [] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { y: { min: 0, max: 10, ticks: { stepSize: 1, callback: formatarEixoY } } }
    }
  });

  let updating = false;
  let debTimer = null;

  async function atualizarGrafico(filtro, termo, mostrarMedia) {
    if (updating) return;
    updating = true;
    try {
      const usarMeses = document.getElementById('mostrarMeses')?.checked;
      chart.data.labels = usarMeses ? labelsMeses : labelsDias;

      const colaboradores = await getDadosColaboradores();
      const termoLower = (termo || '').toLowerCase();
      const datasets = [];

      if (filtro === 'colaborador') {
        const alvo = colaboradores.find(c => (c.nomeCompleto || '').toLowerCase().includes(termoLower));
        if (alvo) {
          const lista = await getHumorUsuario(alvo.id);
          const valores = new Array(31).fill(null);
          lista.forEach(p => {
            const dd = Number(String(p.data).split('-')[2]);
            if (dd >= 1 && dd <=31) valores[dd-1] = p.humor;
          });
          datasets.push({ label: alvo.nomeCompleto, data: valores, borderWidth: 2, tension: 0.25 });
        } else {
          datasets.push({ label: 'Sem dados', data: new Array(31).fill(null), borderWidth: 2, tension: 0.25 });
        }
      }

      // Futuro: equipe/setor com endpoints de agregação

      chart.data.datasets = datasets;
      chart.update();
    } catch(e) {
      console.error(e);
    } finally {
      updating = false;
    }
  }

  function solicitarUpdate() {
    clearTimeout(debTimer);
    debTimer = setTimeout(() => {
      const filtro = document.querySelector('input[name="filtro"]:checked')?.value;
      if (!filtro) return;
      const termo = document.getElementById('searchInput')?.value || '';
      const mostrarMedia = document.getElementById('mostrarMedia')?.checked;
      atualizarGrafico(filtro, termo, mostrarMedia);
    }, 200);
  }

  // Garante listeners únicos
  document.querySelectorAll('input[name="filtro"]').forEach(r => r.addEventListener('change', solicitarUpdate));
  document.getElementById('searchInput')?.addEventListener('input', solicitarUpdate);
  document.getElementById('mostrarMedia')?.addEventListener('change', solicitarUpdate);
  document.getElementById('mostrarMeses')?.addEventListener('change', solicitarUpdate);
});
