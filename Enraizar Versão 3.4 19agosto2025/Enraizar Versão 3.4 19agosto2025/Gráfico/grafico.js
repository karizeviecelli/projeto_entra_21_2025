

// Extrair datas e humores
const datas = Object.keys(dadosSalvos).sort();
const valoresHumor = datas.map(data => dadosSalvos[data].humor);

// Configuração do gráfico
const ctx = document.getElementById("graficoHumor").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: datas,
    datasets: [{
      label: "Nível de Humor",
      data: valoresHumor,
      borderColor: "#75B694",
      backgroundColor: "rgba(117, 182, 148, 0.2)",
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: "#75B694"
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            const emojis = ["😢","😐","🙂","😊","😄"];
            return emojis[value - 1];
          }
        },
        title: {
          display: true,
          text: "Humor"
        }
      },
      x: {
        title: {
          display: true,
          text: "Data"
        }
      }
    }
  }
});
