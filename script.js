const colunas = 20;
const linhas = 12;
const rancho = document.getElementById('rancho');

let ferramentaSelecionada = 'grass';
let emojiSelecionado = '';

// Gera o mapa inicial em camadas
function inicializarRancho() {
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {
            const bloco = document.createElement('div');
            bloco.classList.add('bloco');

            if (r < 8) {
                bloco.classList.add('sky');
            } else if (r === 8) {
                bloco.classList.add('grass');
            } else {
                bloco.classList.add('dirt');
            }

            bloco.addEventListener('click', () => cliqueNoBloco(bloco));
            rancho.appendChild(bloco);
        }
    }
}

// Coloca ou remove itens do cenário
function cliqueNoBloco(bloco) {
    if (bloco.classList.contains('sky')) {
        bloco.className = `bloco ${ferramentaSelecionada}`;
        bloco.innerText = emojiSelecionado;
    } else {
        bloco.className = 'bloco sky';
        bloco.innerText = '';
    }
}

// Controla a seleção do menu inferior
function mudarFerramenta(classeBloco, emoji, elementoClicado) {
    ferramentaSelecionada = classeBloco;
    emojiSelecionado = emoji;

    const slots = document.querySelectorAll('.slot');
    slots.forEach(s => s.classList.remove('ativo'));

    elementoClicado.classList.add('ativo');
}

// Executa a criação do mundo
inicializarRancho();