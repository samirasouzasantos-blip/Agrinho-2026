JavaScript


const colunas = 20;
const linhas = 12;
const gradeMundo = document.getElementById('grade-mundo');

let itemSelecionado = 'fence';
let emojiSelecionado = '🪵';
let vacinados = 0;
let tempo = 45;
let jogoAtivo = true;

// Inicializa o mapa com o chão de grama e subsolo de terra
function criarMapa() {
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

            bloco.addEventListener('click', () => interagir(bloco));
            gradeMundo.appendChild(bloco);
        }
    }
}

// Lógica ao clicar em qualquer bloco do mundo
function interagir(bloco) {
    if (!jogoAtivo) return;

    // Ação com a Vacina/Seringa selecionada
    if (itemSelecionado === 'syringe') {
        if (bloco.classList.contains('cow') && !bloco.classList.contains('cow-vacinada')) {
            bloco.classList.add('cow-vacinada');
            bloco.innerText = '✅'; // Indica que foi imunizado
            vacinados++;
            document.getElementById('qtd-vacinados').innerText = vacinados;
        }
        return;
    }

    // Construção de cercas ou spawn de vacas no espaço aéreo (sky)
    if (bloco.classList.contains('sky')) {
        bloco.className = `bloco ${itemSelecionado}`;
        bloco.innerText = emojiSelecionado;
    } 
    // Destruição (se clicar em algo construído, limpa e vira céu)
    else if (!bloco.classList.contains('grass') && !bloco.classList.contains('dirt')) {
        bloco.className = 'bloco sky';
        bloco.innerText = '';
    }
}

// Muda o item ativo da hotbar
function selecionarItem(item, emoji, elemento) {
    itemSelecionado = item;
    emojiSelecionado = emoji;

    const slots = document.querySelectorAll('.slot');
    slots.forEach(s => s.classList.remove('ativo'));
    elemento.classList.add('ativo');
}

// Contador de tempo regressivo do jogo
const temporizador = setInterval(() => {
    if (!jogoAtivo) return;
    
    tempo--;
    document.getElementById('tempo-restante').innerText = tempo;

    if (tempo <= 0) {
        clearInterval(temporizador);
        jogoAtivo = false;
        alert(`Fim do manejo! Você conseguiu vacinar ${vacinados} cabeças de gado.`);
    }
}, 1000);

// Inicia o mundo de blocos
criarMapa();