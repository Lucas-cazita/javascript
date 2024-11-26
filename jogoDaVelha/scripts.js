let jogVez

function start () {
    const jog1 = 'X'
    const jog2 = 'O'

    jogVez = (Math.random() * 2) > 1 ? jog1 : jog2

    document.querySelector('.jogador span').innerHTML = `${jogVez}`
}

let jogadas = []

document.querySelector('.item').addEventListener('click', (event) => {
   
})

start()