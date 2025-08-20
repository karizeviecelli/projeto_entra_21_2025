// Inicialização de variáveis
let chart;
let currentDate = null;
let selectedEmoji = null;
let selectedHumor = null;
let savedData = JSON.parse(localStorage.getItem('humorData')) || {};
let calendar;

// ------- Utilidades -------
function resetEmojiSelection() {
  document.querySelectorAll('.emoji-options span').forEach(span => {
    span.classList.remove('selected');
  });
  selectedEmoji = null;
  selectedHumor = null;
}

// ------- Gráfico (Chart.js) -------
function createChart() {
  const labels = Object.keys(savedData).sort((a, b) => new Date(a) - new Date(b));
  const valores = labels.map(d => savedData[d]?.humor ?? null);

  const canvas = document.getElementById('myChart');
  if (!canvas) {
    console.warn('Canvas #myChart não encontrado. Pulando criação do gráfico.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Humor',
        data: valores,
        borderColor: '#75B694',
        backgroundColor: 'rgba(117, 182, 148, 0.2)',
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#73B593',
        pointBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const dia = context.label;
              const info = savedData[dia];
              if (!info) return "Sem dados";
              return `${info.emoji} Humor: ${info.humor}${info.motivo ? " | " + info.motivo : ""}`;
            }
          }
        }
      },
      scales: {
        y: { min: 1, max: 7, ticks: { stepSize: 1 } }
      }
    }
  });
}

// ------- Calendário  -------
function refreshCalendarEvents() {
  if (!calendar) return;
  calendar.removeAllEvents();
  Object.keys(savedData).forEach(date => {
    const { emoji, motivo } = savedData[date];
    calendar.addEvent({
      title: motivo ? `${emoji} - ${motivo}` : emoji,
      date
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // --- Menu (opcional) – só adiciona listeners se os elementos existirem ---
  const saudacao = document.getElementById('saudacao');
  const menuDropdown = document.getElementById('menuDropdown');
  const logoutBtn = document.getElementById('logout');
  const alterarSenhaBtn = document.getElementById('alterarSenha');

  if (saudacao && menuDropdown) {
    saudacao.addEventListener('click', function (e) {
      e.stopPropagation();
      menuDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!menuDropdown.contains(e.target) && e.target !== saudacao) {
        menuDropdown.classList.remove('show');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '../login/login.html';
    });
  }

  if (alterarSenhaBtn) {
    alterarSenhaBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'alterar_senha.html';
    });
  }

  // --- FullCalendar ---
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) {
    console.error('ERRO: elemento #calendar não encontrado no HTML.');
    return;
  }

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br', // requer locales-all (veja nota abaixo)
    events: Object.keys(savedData).map(date => {
      const { emoji, motivo } = savedData[date];
      return { title: motivo ? `${emoji} - ${motivo}` : emoji, date };
    }),
    dateClick: function (info) {
      currentDate = info.dateStr;
      resetEmojiSelection();
      const motivoInput = document.getElementById('motivoInput');
      if (motivoInput) motivoInput.value = '';
      const modal = document.getElementById('emojiModal');
      if (modal) modal.style.display = 'flex';
    }
  });

  calendar.render();

  // Seleção de emojis
  document.querySelectorAll('.emoji-options span').forEach(span => {
    span.addEventListener('click', () => {
      resetEmojiSelection();
      span.classList.add('selected');
      selectedEmoji = span.textContent.trim();
      selectedHumor = parseInt(span.dataset.humor, 10);
    });
  });

  // Botão salvar humor
  const salvarHumorBtn = document.getElementById('salvarHumor');
  if (salvarHumorBtn) {
    salvarHumorBtn.addEventListener('click', () => {
      if (!currentDate) {
        alert("Erro: Nenhuma data selecionada.");
        return;
      }
      if (selectedHumor == null) {
        alert("Escolha uma carinha");
        return;
      }

      const motivo = (document.getElementById('motivoInput')?.value || '').trim();

      savedData[currentDate] = { emoji: selectedEmoji, humor: selectedHumor, motivo };
      localStorage.setItem('humorData', JSON.stringify(savedData));

      createChart();
      refreshCalendarEvents();

      const modal = document.getElementById('emojiModal');
      if (modal) modal.style.display = 'none';
      resetEmojiSelection();
      const motivoInput = document.getElementById('motivoInput');
      if (motivoInput) motivoInput.value = '';
      currentDate = null;
    });
  }

  // Fechar modal clicando fora
  window.addEventListener('click', function (e) {
    const modal = document.getElementById('emojiModal');
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Render inicial do gráfico
  createChart();
});
