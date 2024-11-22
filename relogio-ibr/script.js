// Relógio
let digitalElement = document.querySelector('.digital')

function setHour() {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    digitalElement.innerHTML = `${fixedZero(hour)}:${fixedZero(minutes)}:${fixedZero(seconds)}`

}

function fixedZero(time) {
    return time < 10 ? `0${time}` : time
}


setInterval(() => {
    setHour()
}, 1000);

setHour()

// Salvar Progamações
let allProgs;
function save() {
    let prog1 = document.querySelector('#prog1').value
    let prog2 = document.querySelector('#prog2').value
    let prog3 = document.querySelector('#prog3').value
    let prog4 = document.querySelector('#prog4').value
    let prog5 = document.querySelector('#prog5').value
    let prog6 = document.querySelector('#prog6').value
    let prog7 = document.querySelector('#prog7').value

    let progs = [prog1, prog2, prog3, prog4, prog5, prog6, prog7]

    let temp1 = document.querySelector('#temp1').value
    let temp2 = document.querySelector('#temp2').value
    let temp3 = document.querySelector('#temp3').value
    let temp4 = document.querySelector('#temp4').value
    let temp5 = document.querySelector('#temp5').value
    let temp6 = document.querySelector('#temp6').value
    let temp7 = document.querySelector('#temp7').value

    let temps = [temp1, temp2, temp3, temp4, temp5, temp6, temp7]

   allProgs = [progs, temps]
}

save()

// Programação Atual
function atualProg(prog) {
    document.querySelector('h1').innerHTML = allProgs[0][prog].toUpperCase()
    document.querySelector('.next').innerHTML = `/${allProgs[0][prog + 1]}`
}

// Inicia a Progamação
function start() {
    let progAtual = [allProgs[0][0], allProgs[1][0]]
    console.log()
    atualProg(progAtual[0])
}




// Evento abrir side menu
let btnSideMenu = document.querySelector('.side-btn')
btnSideMenu.addEventListener('click', openSideMenu)

let posSideMenu
function openSideMenu() {
    let sideMenu = document.querySelector('.side-menu')
    if (!posSideMenu) {
        sideMenu.style.left = 0
        posSideMenu = true
        btnSideMenu.textContent = '<'
    } else {
        sideMenu.style.left = '-100%'
        posSideMenu = false
        btnSideMenu.textContent = '>'
    }
}

// Evento de entrar em Tela Cheia
const btnResize = document.getElementById('fullscreen-btn')
const icon = document.getElementById('fullscreen-icon')
btnResize.addEventListener('click', () => {
    let fullScreen;
    if (!document.fullscreenElement) {
        // Entrar no modo tela cheia
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 9 21 9 21 3"></polyline>
          <polyline points="9 9 3 9 3 3"></polyline>
          <polyline points="15 15 21 15 21 21"></polyline>
          <polyline points="9 15 3 15 3 21"></polyline>
        </svg>`;

        fullScreen = true
    } else {
        // Sair do modo tela cheia
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 3 3 3 3 9"></polyline>
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <polyline points="15 21 21 21 21 15"></polyline>
        </svg>`

        fullScreen = false
    }
});