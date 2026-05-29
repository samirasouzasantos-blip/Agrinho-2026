// Variáveis de estado do jogo
let water = 50;
let temperature = 22;
let growth = 0;
let harvested = 0;

// Capturando os elementos HTML
const waterBar = document.getElementById('water-bar');
const waterText = document.getElementById('water-text');
const tempText = document.getElementById('temp-text');
const growthBar = document.getElementById('growth-bar');
const growthText = document.getElementById('growth-text');
const scoreText = document.getElementById('score-text');
const message = document.getElementById('message');
const btnHarvest = document.getElementById('btn-harvest');

// Configuração dos botões
document.getElementById('btn-water').addEventListener('click', () => {
    water = Math.min(100, water + 15); // Irriga e não deixa passar de 100%
    updateDisplay();
});

document.getElementById('btn-temp-up').addEventListener('click', () => {
    temperature = Math.min(40, temperature + 2);
    updateDisplay();
});

document.getElementById('btn-temp-down').addEventListener('click', () => {
    temperature = Math.max(10, temperature - 2);
    updateDisplay();
});

btnHarvest.addEventListener('click', () => {
    if (growth >= 100) {
        harvested++;
        growth = 0; // Reseta o crescimento para plantar o próximo
        message.innerText = "Excelente! Tomate colhido e enviado para o mercado sustentável. 🍅";
        updateDisplay();
    }
});

// Loop principal do jogo (roda a cada 1 segundo)
setInterval(() => {
    // Simula a perda natural de água pelo calor
    water = Math.max(0, water - 2);
    
    // Simula flutuação do tempo/clima externo na temperatura
    temperature += Math.floor(Math.random() * 3) - 1; 
    temperature = Math.max(10, Math.min(40, temperature));

    // Validação das condições ideais (Sustentabilidade)
    const idealWater = water >= 40 && water <= 80;
    const idealTemp = temperature >= 20 && temperature <= 26;

    if (idealWater && idealTemp) {
        growth = Math.min(100, growth + 5); // Cresce rápido se estiver tudo perfeito
        message.innerText = "A estufa está equilibrada! O tomate está crescendo forte.";
    } else {
        // Alertas caso saia do ideal
        if (!idealWater && !idealTemp) {
            message.innerText = "Alerta Crítico: O solo e a temperatura estão ruins. O tomate parou de crescer!";
        } else if (!idealWater) {
            message.innerText = water < 40 ? "O solo está muito seco! Use a irrigação." : "Solo encharcado! Espere a água secar.";
        } else {
            message.innerText = "Temperatura fora do padrão ideal (20°C a 26°C). Ajuste o clima!";
        }
    }

    // Ativa ou desativa o botão de colheita
    if (growth >= 100) {
        btnHarvest.disabled = false;
        message.innerText = "O tomate está maduro e orgânico! Pronto para a colheita! 🍅🧺";
    } else {
        btnHarvest.disabled = true;
    }

    updateDisplay();
}, 1000);

// Função para atualizar os dados na tela
function updateDisplay() {
    waterBar.style.width = water + '%';
    waterText.innerText = water + '%';
    
    tempText.innerText = temperature + '°C';
    if (temperature >= 20 && temperature <= 26) {
        tempText.className = 'good';
    } else {
        tempText.className = 'warning';
    }

    growthBar.style.width = growth + '%';
    growthText.innerText = growth + '%';
    
    scoreText.innerText = harvested;
}