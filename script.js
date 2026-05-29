// Estados iniciais do jogo
let water = 50;
let temp = 24; // Temperatura em graus Celsius
let nutrients = 60;
let growth = 0;
let gameActive = true;
let gameInterval;

// Elementos da tela
const waterBar = document.getElementById('water-bar');
const waterText = document.getElementById('water-text');
const tempBar = document.getElementById('temp-bar');
const tempText = document.getElementById('temp-text');
const nutrientsBar = document.getElementById('nutrients-bar');
const nutrientsText = document.getElementById('nutrients-text');
const growthBar = document.getElementById('growth-bar');
const plantIcon = document.getElementById('plant-icon');
const gameMessage = document.getElementById('game-message');
const restartBtn = document.getElementById('restart-btn');

// Ciclo do jogo (roda a cada 1 segundo)
function gameLoop() {
    if (!gameActive) return;

    // Recursos diminuem ou oscilam com o tempo
    water -= 3;
    nutrients -= 2;
    
    // Temperatura oscila aleatoriamente simulando o clima externo
    temp += Math.floor(Math.random() * 5) - 2; 

    // Limitar valores entre as margens realistas
    if (water < 0) water = 0;
    if (nutrients < 0) nutrients = 0;

    // Atualiza a interface visual
    updateUI();

    // Verifica condições de derrota (extremo de falta ou excesso)
    if (water <= 0 || water >= 100 || nutrients <= 0 || temp <= 10 || temp >= 40) {
        endGame(false);
        return;
    }

    // Condição para a planta crescer (Status ideais para o Tomate)
    // Tomate gosta de água moderada (30-80), boa nutrição (>30) e temp estável (18°C a 30°C)
    if (water >= 30 && water <= 80 && nutrients >= 30 && temp >= 18 && temp <= 30) {
        growth += 4;
        if (growth > 100) growth = 100;
        gameMessage.innerText = "Condições ideais! Os tomates estão crescendo de forma sustentável 🌱";
        gameMessage.parentElement.style.borderColor = "#4caf50";
        gameMessage.style.color = "#1b5e20";
    } else {
        gameMessage.innerText = "Alerta! Ajuste os parâmetros, a estufa está fora do equilíbrio ideal.";
        gameMessage.parentElement.style.borderColor = "#ffb74d";
        gameMessage.style.color = "#e65100";
    }

    // Muda o ícone da planta baseado no crescimento
    if (growth >= 30 && growth < 70) {
        plantIcon.innerText = "🌿";
    } else if (growth >= 70 && growth < 100) {
        plantIcon.innerText = "🍅";
    } else if (growth >= 100) {
        endGame(true);
    }
}

// Atualiza as barras e textos na tela
function updateUI() {
    waterBar.style.width = water + '%';
    waterText.innerText = water + '%';

    // Mapear a temperatura de 0°C a 40°C para uma barra de 0 a 100%
    let tempPercentage = (temp / 40) * 100;
    tempBar.style.width = tempPercentage + '%';
    tempText.innerText = temp + '°C';

    nutrientsBar.style.width = nutrients + '%';
    nutrientsText.innerText = nutrients + '%';

    growthBar.style.width = growth + '%';
    growthBar.innerText = growth + '%';
}

// Ações dos botões
function regar() {
    if (!gameActive) return;
    water += 15;
    if (water > 100) water = 100;
    updateUI();
}

function ajustarClima() {
    if (!gameActive) return;
    temp = 23; // Climatizador joga para a temperatura ideal do tomate
    updateUI();
}

function adubar() {
    if (!gameActive) return;
    nutrients += 20;
    if (nutrients > 100) nutrients = 100;
    updateUI();
}

// Finalização do jogo (Vitória ou Derrota)
function endGame(isVictory) {
    gameActive = false;
    clearInterval(gameInterval);
    restartBtn.style.display = "inline-block";

    if (isVictory) {
        plantIcon.innerText = "🧺🍅";
        gameMessage.innerText = "Parabéns! Você colheu tomates orgânicos e sustentáveis perfeitos! O futuro do Agro agradece! 🚀";
        gameMessage.style.color = "#1b5e20";
    } else {
        plantIcon.innerText = "🥀";
        gameMessage.innerText = "A estufa perdeu o equilíbrio e a plantação não resistiu. Tente novamente monitorando de perto!";
        gameMessage.style.color = "#b71c1c";
    }
}

// Reiniciar o jogo
function reiniciarJogo() {
    water = 50;
    temp = 24;
    nutrients = 60;
    growth = 0;
    gameActive = true;
    plantIcon.innerText = "🌱";
    restartBtn.style.display = "none";
    gameInterval = setInterval(gameLoop, 1000);
}

// Inicia o loop assim que a página carrega
gameInterval = setInterval(gameLoop, 1000);