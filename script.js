// Dimensões do mundo estilo Minecraft 2D (Grade de 20x12)
const colunas = 20;
const linhas = 12;
const mundo = document.getElementById('mundo');

// Estado da ferramenta selecionada
let blocoSelecionado = 'grass';
let emojiSelecionado = '';

// Gera o terreno inicial em camadas quadradas
function construirMundoInicial() {
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {
            const bloco = document.createElement('div');
            bloco.classList.add('bloco');

            // Define o relevo baseado na altura (linhas)
            if (r < 8) {
                bloco.classList.add('sky'); // Ar / Céu aberto
            } else if (r === 8) {
                bloco.classList.add('grass'); // Superfície de pastagem
            } else {
                bloco.classList.add('dirt'); // Subsolo/Terra profunda
            }

            // Adiciona o evento de clique em cada bloco
            bloco.addEventListener('click', () => interagirComBloco(bloco));

            mundo.appendChild(bloco);
        }
    }
}

// Lógica de Construção e Quebra de blocos
function interagirComBloco(bloco) {
    // Se o bloco for céu (vazio), nós CONSTRUÍMOS o item da Hotbar
    if (bloco.classList.contains('sky')) {
        bloco.className = `bloco ${blocoSelecionado}`;
        bloco.innerText = emojiSelecionado;
    } 
    // Se o bloco já for outra coisa, nós DESTRUÍMOS (vira Céu / Vazio)
    else {
        bloco.className = 'bloco sky';
        bloco.innerText = '';
    }
}

// Alterna o item ativo na barra inferior
function selecionarItem(classeBloco, emoji, slotElemento) {
    blocoSelecionado = classeBloco;
    emojiSelecionado = emoji;

    // Remove o contorno amarelo ativo dos outros slots
    const slots = document.querySelectorAll('.slot');
    slots.forEach(s => s.classList.remove('ativo'));

    // Adiciona o contorno ao slot atual clicado
    slotElemento.classList.add('ativo');
}

// Inicia o jogo ao carregar a página
construirMundoInicial();