let origem = '';
let destino = '';
let bloco = '';
let mode = false;
let score = 0;
let choose = true;
let coluna0;
let coluna1;
let coluna2;

const container = document.getElementById('container');
const placar = document.getElementById('moves');
const reset = document.getElementById('reset');
reset.addEventListener('click', resetGame);

function generateColumns () {
    for (let i = 0; i < 3; i++) {
    const elemento = document.createElement('div');
    elemento.classList.add('colunas');
    container.appendChild(elemento);
    elemento.id = 'coluna' + `${i}`;
    }
    coluna0 = document.getElementById('coluna0');
    coluna1 = document.getElementById('coluna1');
    coluna2 = document.getElementById('coluna2');
}

generateColumns();

resetGame();

function resetGame() {
    origem = '';
    destino = '';
    bloco = '';
    mode = false;
    score = 0;
    placar.innerText = score;
    placar.className = '';

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
        if (origem === '' && choose) {            
            origem = event.currentTarget.id;
            bloco = event.currentTarget.lastElementChild;
            bloco.className = 'choosed shadow';                                 
        } else if (destino === '') {
            destino = event.currentTarget.id;
            mode = true; 
            choose = true;                       
        }
    }

    checkMove();   

    if (mode) {
        select(destino, bloco);
    }
}

function select(dest, bloco) {
    if (dest !== null && bloco !== null) {
        bloco.innerHTML = '';
        let selecao = document.getElementById(dest);
        selecao.appendChild(bloco);
        bloco.className = '';
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
    } else {
        score += 0;        
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

function checkMove () {
    if (bloco !== null && event.currentTarget.lastElementChild !== null) {
        if (bloco.clientWidth > event.currentTarget.lastElementChild.clientWidth) {
            bloco.innerHTML = 'movimento inválido'
            origem = '';
            destino = '';
            mode = false;
            choose = false;
        }
    }
}


