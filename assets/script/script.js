let origem = '';
let destino = '';
let bloco = '';
let mode = false;
let score = 0;

const container = document.getElementById('container');
const placar = document.getElementById('moves');

for (let i = 0; i < 3; i++) {
    const elemento = document.createElement('div');
    elemento.className = 'colunas';
    container.appendChild(elemento);
    elemento.id = 'coluna' + `${i}`;
}

let coluna0 = document.getElementById('coluna0');
let coluna1 = document.getElementById('coluna1');
let coluna2 = document.getElementById('coluna2');



function resetGame() {
    origem = '';
    destino = '';
    bloco = '';
    mode = false;
    score = 0;
    placar.innerText = score;

    piecesGenerator();
    coluna0.addEventListener('click', handleClick);
    coluna1.addEventListener('click', handleClick);
    coluna2.addEventListener('click', handleClick);

}

function piecesGenerator() {

    const box1 = document.createElement('div');
    box1.id = 'box1';

    const box2 = document.createElement('div');
    box2.id = 'box2';

    const box3 = document.createElement('div');
    box3.id = 'box3';

    const box4 = document.createElement('div');
    box4.id = 'box4';

    coluna0.innerHTML = ''
    coluna1.innerHTML = ''
    coluna2.innerHTML = ''
    coluna0.append(box1, box2, box3, box4);
}


function handleClick(event) {
    if (!mode) {
        if (origem === '') {
            origem = event.currentTarget.id;
            bloco = event.currentTarget.lastElementChild;
            bloco.className = 'choosed';
            bloco.innerHTML = '';
        } else if (destino === '') {
            destino = event.currentTarget.id;
            mode = true;
        }
    }

    if (bloco !== null && event.currentTarget.lastElementChild !== null) {
        if (bloco.clientWidth > event.currentTarget.lastElementChild.clientWidth) {
            bloco.innerHTML = 'movimento inválido'
            origem = '';
            destino = '';
            mode = false;
        }
    }

    if (mode) {
        select(destino, bloco);
    }
}

function select(arg1, arg2) {
    if (arg1 !== null && arg2 !== null) {
        let selecao = document.getElementById(arg1);
        selecao.appendChild(arg2);
        arg2.className = '';
        gameScore();
        checkWinner();
        mode = false;
        origem = '';
        destino = '';
    } else {
        mode = false;
        origem = '';
        destino = '';
    }
}

function gameScore() {
    if (origem !== destino) {
        score += 1;
        placar.innerText = score;
    }
}

function checkWinner() {
    if (coluna2.childElementCount === 4 && score === 15) {
        placar.innerText = 'Parabéns!!';
        placar.className = 'winnerDisplay';
        coluna0.removeEventListener('click', handleClick);
        coluna1.removeEventListener('click', handleClick);
        coluna2.removeEventListener('click', handleClick);
    } else if (coluna2.childElementCount === 4 && score > 15) {
        placar.innerText = 'Tente de novo!!'
        coluna0.removeEventListener('click', handleClick);
        coluna1.removeEventListener('click', handleClick);
        coluna2.removeEventListener('click', handleClick);
    }
}
resetGame();
const reset = document.getElementById('reset');
reset.addEventListener('click', resetGame);