function getDadosColaboradores() {
    return JSON.parse(localStorage.getItem('colaboradores')) || [];
}

function getDadosEquipes() {
    return JSON.parse(localStorage.getItem('equipes')) || [];
}

const ctx = document.getElementById('myChart').getContext('2d');
const emojisHumor = ['😢','😟','😐','🙂','😊','😄','😁','🤩','🥳','😍','😎'];

const labelsDias = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
const labelsMeses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function formatarEixoY(value) {
    const index = Math.max(0, Math.min(10, Math.round(value)));
    return `${value} ${emojisHumor[index]}`;
}

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelsDias,
        datasets: []
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
            y: {
                min: 0,
                max: 10,
                ticks: { stepSize: 1, callback: formatarEixoY }
            }
        }
    }
});

function atualizarGrafico(filtro, termo, mostrarMedia) {
    const colaboradores = getDadosColaboradores();
    const equipes = getDadosEquipes();
    let datasets = [];

    if (filtro === 'colaborador') {
        const filtrados = colaboradores.filter(c =>
            c.nome.toLowerCase().includes(termo) || c.email.toLowerCase().includes(termo)
        );
        if (mostrarMedia && filtrados.length > 0) {
            datasets.push(criarDataset('Média', calcularMedia(filtrados), 'orange'));
        } else {
            filtrados.forEach(c => {
                datasets.push(criarDataset(c.nome, c.humorMensal || gerarHumorFake(), gerarCor()));
            });
        }
    }

    if (filtro === 'equipe') {
        const filtradas = equipes.filter(e =>
            e.nome.toLowerCase().includes(termo)
        );
        if (mostrarMedia && filtradas.length > 0) {
            datasets.push(criarDataset('Média Equipe', calcularMedia(filtradas.flatMap(e => e.membros)), 'orange'));
        } else {
            filtradas.forEach(equipe => {
                datasets.push(criarDataset(equipe.nome, equipe.humorMensal || gerarHumorFake(), gerarCor()));
            });
        }
    }

    if (filtro === 'setor') {
        const setoresUnicos = [...new Set(colaboradores.map(c => c.setor))];
        const filtrados = setoresUnicos.filter(s =>
            s && s.toLowerCase().includes(termo)
        );
        if (mostrarMedia && filtrados.length > 0) {
            datasets.push(criarDataset('Média Setor', calcularMedia(colaboradores.filter(c => filtrados.includes(c.setor))), 'orange'));
        } else {
            filtrados.forEach(setor => {
                datasets.push(criarDataset(setor, calcularMedia(colaboradores.filter(c => c.setor === setor)), gerarCor()));
            });
        }
    }

    chart.data.datasets = datasets;
    chart.update();
}

function criarDataset(label, data, color) {
    return { label, data, borderColor: color, backgroundColor: color, fill: false, tension: 0.3 };
}

function calcularMedia(lista) {
    let media = Array(chart.data.labels.length).fill(0);
    lista.forEach(c => {
        const dados = c.humorMensal || gerarHumorFake();
        dados.forEach((v, i) => media[i] += v);
    });
    return media.map(v => parseFloat((v / lista.length).toFixed(1)));
}

function gerarCor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
}

function gerarHumorFake() {
    return Array(chart.data.labels.length).fill(0).map(() => Math.floor(Math.random() * 11));
}

// Eventos
document.getElementById('searchInput').addEventListener('input', () => {
    const filtro = document.querySelector('input[name="filtro"]:checked')?.value;
    if (!filtro) return;
    atualizarGrafico(filtro, document.getElementById('searchInput').value.toLowerCase(), document.getElementById('mostrarMedia').checked);
});

document.querySelectorAll('input[name="filtro"]').forEach(radio => {
    radio.addEventListener('change', () => {
        atualizarGrafico(radio.value, document.getElementById('searchInput').value.toLowerCase(), document.getElementById('mostrarMedia').checked);
    });
});

document.getElementById('mostrarMedia').addEventListener('change', () => {
    const filtro = document.querySelector('input[name="filtro"]:checked')?.value;
    if (!filtro) return;
    atualizarGrafico(filtro, document.getElementById('searchInput').value.toLowerCase(), document.getElementById('mostrarMedia').checked);
});

document.getElementById('mostrarMeses').addEventListener('change', (e) => {
    chart.data.labels = e.target.checked ? labelsMeses : labelsDias;
    const filtro = document.querySelector('input[name="filtro"]:checked')?.value;
    if (!filtro) return;
    atualizarGrafico(filtro, document.getElementById('searchInput').value.toLowerCase(), document.getElementById('mostrarMedia').checked);
});
