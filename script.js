// Objeto que armazena todas as variáveis de estado do simulador
let simulador = {
    dia: 1,
    moedas: 120,
    racao: 4,
    // Status do Gado
    energia: 100,
    saude: 100,
    foiAlimentado: true,
    produziuLeite: false
};

// Atualiza as informações visuais na tela
function atualizarPainel() {
    document.getElementById('txt-dia').innerText = simulador.dia;
    document.getElementById('txt-moedas').innerText = simulador.moedas;
    document.getElementById('txt-ração').innerText = simulador.racao;
    
    document.getElementById('txt-energia').innerText = simulador.energia + "%";
    document.getElementById('txt-saude').innerText = simulador.saude + "%";
    
    // Controle da Ordenha
    const txtLeite = document.getElementById('txt-leite');
    const btnOrdenha = document.getElementById('btn-ordenha');
    
    if (simulador.produziuLeite) {
        txtLeite.innerText = "Disponível 🥛";
        txtLeite.style.color = "#2980b9";
        btnOrdenha.disabled = false;
    } else {
        txtLeite.innerText = "Pendente";
        txtLeite.style.color = "#7f8c8d";
        btnOrdenha.disabled = true;
    }
}

// Imprime mensagens no painel de relatórios
function emitirRelatorio(mensagem) {
    const box = document.getElementById('log-box');
    box.innerHTML = `> ${mensagem}`;
}

// Ação: Alimentar o Gado
function alimentarGado() {
    if (simulador.foiAlimentado) {
        emitirRelatorio("O rebanho já está saciado por hoje!");
        return;
    }

    if (simulador.racao > 0) {
        simulador.racao--;
        simulador.foiAlimentado = true;
        simulador.energia = Math.min(100, simulador.energia + 30);
        emitirRelatorio("O rebanho foi alimentado com sucesso. Energia recuperada.");
        atualizarPainel();
    } else {
        emitirRelatorio("Seu estoque de nutrição acabou! Compre mais na loja.");
    }
}

// Ação: Coletar Leite produzido
function coletarLeite() {
    if (simulador.produziuLeite) {
        simulador.produziuLeite = false;
        simulador.moedas += 45;
        emitirRelatorio("🥛 Leite coletado de tanques refrigerados! Faturamento de R$ 45 adicionado.");
        atualizarPainel();
    }
}

// Ação: Chamar cuidados veterinários
function chamarVeterinario() {
    if (simulador.moedas >= 30) {
        simulador.moedas -= 30;
        simulador.saude = 100;
        emitirRelatorio("🩺 Veterinário realizou o manejo sanitário. Saúde do gado restaurada.");
        atualizarPainel();
    } else {
        emitirRelatorio("Recursos financeiros insuficientes para contratar o serviço.");
    }
}

// Ação: Comprar Suprimentos (Silagem)
function comprarSuprimentos() {
    if (simulador.moedas >= 20) {
        simulador.moedas -= 20;
        simulador.racao += 3;
        emitirRelatorio("📦 Três unidades de suprimento nutricional estocadas no galpão.");
        atualizarPainel();
    } else {
        emitirRelatorio("Sem capital suficiente para comprar insumos.");
    }
}

// Mudança de Turno: Avançar o Dia
function avancarDia() {
    if (simulador.dia >= 15) {
        emitirRelatorio(`🏁 Fim da simulação! Balanço financeiro final: R$ ${simulador.moedas}`);
        document.getElementById('btn-next-day').disabled = true;
        return;
    }

    // Penalidade se o gado virou o dia com fome
    if (!simulador.foiAlimentado) {
        simulador.energia = Math.max(0, simulador.energia - 40);
        simulador.saude = Math.max(0, simulador.saude - 20);
        simulador.produziuLeite = false;
        emitirRelatorio("⚠️ Alerta! O gado passou a noite sem alimentação. Perda crítica de saúde.");
    } else {
        // Se foi alimentado e tem boa saúde, gera leite para o próximo dia
        if (simulador.saude >= 50) {
            simulador.produziuLeite = true;
        }
        simulador.energia = Math.max(20, simulador.energia - 15); // Desgaste natural diário
    }

    // Próximo ciclo
    simulador.foiAlimentado = false; // Exige nova alimentação no novo dia
    simulador.dia++;
    atualizarPainel();

    if (simulador.saude <= 0) {
        emitirRelatorio("❌ Simulação encerrada. O rebanho adoeceu severamente por falta de cuidados.");
        document.getElementById('btn-next-day').disabled = true;
    }
}

// Inicialização
atualizarPainel();