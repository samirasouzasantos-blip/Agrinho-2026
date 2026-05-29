// Atributos do jogador e da estufa
let jogo = {
    dia: 1,
    dinheiro: 150,
    ecoPontos: 100,
    crescimento: 0,
    agua: 60,
    temp: 25,
    nutrientes: 70,
    ativo: true,
    upgrades: { solar: false, sensor: false }
};

// Configurações do ecossistema do tomate
const IDEAL = { aguaMin: 40, aguaMax: 80, tempMin: 18, tempMax: 30, nutMin: 50 };

function atualizarTela() {
    // Atualiza textos básicos
    document.getElementById('display-dia').innerText = jogo.dia;
    document.getElementById('display-dinheiro').innerText = `R$ ${jogo.dinheiro}`;
    document.getElementById('display-eco').innerText = jogo.ecoPontos;
    document.getElementById('txt-water').innerText = `${jogo.agua}%`;
    document.getElementById('txt-temp').innerText = `${jogo.temp}°C`;
    document.getElementById('txt-nutrients').innerText = `${jogo.nutrientes}%`;

    // Atualiza as barras visuais
    document.getElementById('bar-growth').style.width = `${jogo.crescimento}%`;
    document.getElementById('bar-growth').innerText = `${jogo.crescimento}%`;
    document.getElementById('bar-water').style.width = `${jogo.agua}%`;
    document.getElementById('bar-nutrients').style.width = `${jogo.nutrientes}%`;
    
    // Mapeamento visual simples para temperatura (0 a 40°C)
    let tempPercent = (jogo.temp / 40) * 100;
    document.getElementById('bar-temp').style.width = `${Math.min(tempPercent, 100)}%`;

    // Atualiza ícone do tomate baseado no progresso
    const plant = document.getElementById('plant-stage');
    if (jogo.crescimento >= 100) plant.innerText = "🍅🧺";
    else if (jogo.crescimento >= 70) plant.innerText = "🍅";
    else if (jogo.crescimento >= 35) plant.innerText = "🌿";
    else if (jogo.crescimento > 0) plant.innerText = "🌱";
    else plant.innerText = "🥀";
}

function agir(acao) {
    if (!jogo.ativo) return;

    if (acao === 'regar' && jogo.dinheiro >= 10) {
        jogo.dinheiro -= 10;
        jogo.agua = Math.min(jogo.agua + 25, 100);
        escreverLog("💧 Você acionou a irrigação por gotejamento.");
    } else if (acao === 'clima' && jogo.dinheiro >= 15) {
        // Se tiver painel solar, o custo cai pela metade (Sustentabilidade!)
        let custo = jogo.upgrades.solar ? 7 : 15;
        if (jogo.dinheiro >= custo) {
            jogo.dinheiro -= custo;
            jogo.temp = 24; // Temperatura padrão climatizada
            escreverLog("🌡️ Climatizadores ativados para estabilizar a temperatura.");
        }
    } else if (acao === 'adubar' && jogo.dinheiro >= 20) {
        jogo.dinheiro -= 20;
        jogo.nutrientes = Math.min(jogo.nutrientes + 30, 100);
        jogo.ecoPontos += 5; // Biofertilizante gera pontos eco
        escreverLog("🧪 Biofertilizante orgânico injetado no solo.");
    } else {
        escreverLog("❌ Saldo insuficiente para realizar essa ação!");
    }
    atualizarTela();
}

function comprarUpgrade(tipo, custo) {
    if (jogo.dinheiro >= custo && !jogo.upgrades[tipo]) {
        jogo.dinheiro -= custo;
        jogo.upgrades[tipo] = true;
        document.getElementById(`btn-${tipo}`).disabled = true;
        document.getElementById(`btn-${tipo}`).innerText = `✅ Compra Realizada`;
        
        if (tipo === 'solar') {
            jogo.ecoPontos += 30;
            escreverLog("☀️ Painel Solar Instalado! Custos de energia reduzidos em 50%.");
        } else if (tipo === 'sensor') {
            escreverLog("🤖 Sensor Inteligente instalado! Ele otimizará gastos futuros.");
        }
        atualizarTela();
    }
}

function passarDia() {
    if (!jogo.ativo) return;

    // 1. Desgaste natural diário dos recursos
    jogo.agua -= jogo.upgrades.sensor ? 10 : 15; // Sensor economiza água
    jogo.nutrientes -= 12;
    
    // Mudança aleatória do clima externo do dia
    let variacaoClima = Math.floor(Math.random() * 11) - 5; // -5°C a +5°C
    jogo.temp += variacaoClima;

    // Garantir margens
    if (jogo.agua < 0) jogo.agua = 0;
    if (jogo.nutrientes < 0) nutrients = 0;

    // 2. Cálculo do crescimento baseado na saúde da estufa
    let emEquilibrio = (jogo.agua >= IDEAL.aguaMin && jogo.agua <= IDEAL.aguaMax &&
                        jogo.temp >= IDEAL.tempMin && jogo.temp <= IDEAL.tempMax &&
                        jogo.nutrientes >= IDEAL.nutMin);

    if (emEquilibrio) {
        jogo.crescimento += 15;
        jogo.ecoPontos += 10;
        escreverLog(`☀️ Dia ${jogo.dia}: Condições perfeitas! O tomateiro cresceu forte.`);
    } else {
        jogo.ecoPontos -= 15;
        escreverLog(`⚠️ Dia ${jogo.dia}: Estufa fora de equilíbrio. O crescimento estagnou.`);
    }

    // 3. Evento Climático Aleatório (Adiciona dinamismo)
    gerarEventoAleatorio();

    // 4. Progresso do tempo e validação de fim de jogo
    jogo.dia++;
    
    if (jogo.agua <= 0 || juego.agua >= 100 || jogo.temp <= 10 || jogo.temp >= 42) {
        finalizarJogo(false, "Sua plantação murchou devido a condições extremas sem monitoramento.");
        return;
    }

    if (jogo.dia > 10) {
        if (jogo.crescimento >= 80) {
            finalizarJogo(true, `Excelente! Colheita farta com ${jogo.ecoPontos} Eco-Pontos arrecadados!`);
        } else {
            finalizarJogo(false, "O prazo acabou e os tomates não cresceram o suficiente para o comércio.");
        }
    }

    atualizarTela();
}

function gerarEventoAleatorio() {
    let dados = Math.random();
    if (dados > 0.7) {
        // Onda de calor
        jogo.temp += 6;
        escreverLog("🔥 Alerta: Uma onda de calor atingiu a região! A temperatura subiu.");
    } else if (dados < 0.2) {
        // Chuva aproveitada pelo sistema de captação da estufa
        jogo.agua = Math.min(jogo.agua + 20, 100);
        jogo.ecoPontos += 15;
        escreverLog("🌧️ Sustentabilidade: Captação de água da chuva ativada! +20% umidade grátis.");
    }
}

function escreverLog(texto) {
    document.getElementById('log-text').innerText = texto;
}

function finalizarJogo(vitoria, motivo) {
    jogo.ativo = false;
    document.getElementById('next-day-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'inline-block';
    
    if (vitoria) {
        document.getElementById('plant-stage').innerText = "🏆🍅";
        escreverLog(`🎉 VITÓRIA! ${motivo}`);
    } else {
        document.getElementById('plant-stage').innerText = "🥀";
        escreverLog(`💔 FIM DE JOGO: ${motivo}`);
    }
}

function reiniciar() {
    location.reload(); // Recarrega a página para resetar tudo de forma limpa
}

// Inicialização
atualizarTela();