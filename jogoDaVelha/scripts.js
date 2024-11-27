// Início
let board = {
    a1: '', b1: '', c1: '',
    a2: '', b2: '', c2: '',
    a3: '', b3: '', c3: ''
}

let turn = ''
let warning = ''
let playing = false

reset()

// Eventos
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', clicou)
})


// Funções
function reset() {
    for (let square in board) {
        board[square] = ''
    }

    turn = (Math.random() * 2) > 1 ? 'X' : 'O'
    playing = true
    warning = ''

    renderBoard()
    renderInfo()
}

function clicou(event) {
    let item = event.target.getAttribute('data-item')
    
    if (playing && board[item] === '') {
        board[item] = turn
        turn = turn === 'X' ? 'O' : 'X'
        checkGame()
        renderInfo()
        renderBoard()
    } else {
        return
        // impossible(item)
    }
}

function renderBoard() {
    for(let i in board) {
        document.querySelector(`[data-item="${i}"]`).innerHTML = board[i] !== '' ? board[i] : ''
    }
}

function renderInfo() {
    document.querySelector('.jogador span').innerHTML = turn
    document.querySelector('.vencedor span').innerHTML = warning
}

function checkGame() {
    if(checkWinnerfor('X')) {
        warning = 'X venceu!'
        playing = false
    } else if (checkWinnerfor('O')) {
        warning = 'O venceu!'
        playing = false
    } else if (isFull()) {
        warning = 'Deu empate!'
        playing = false
    }

    

}

function checkWinnerfor(player) {
    let pos = [
        'a1,b1,c1', 'a2,b2,c2', 'a3,b3,c3',  // Ganhou na horizontal
        'a1,a2,a3', 'b1,b2,b3', 'c1,c2,c3',  // Ganhou na vertical
        'a1,b2,c3', 'a3,b2,c1'  // Ganhou na diagonal
    ]

    for (let w in pos) {
        let pArray = pos[w].split(',')
        let hasWon = pArray.every(option => board[option] === player)
        if (hasWon) {
            return true
        }
    }

    return false
}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
            return false
        }
    }

    return true
}
