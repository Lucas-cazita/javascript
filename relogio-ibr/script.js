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
let runCount = true
const timers = { interval: null };
// Inicia a Progamação
function start() {
    const h1 = document.querySelector('h1')
    const next = document.querySelector('.next')

    let index = 0
    runCount = true

    function atualizaProgramação () {
        if (!runCount) return

        if (index < allProgs[0].length) {
            h1.textContent = allProgs[0][index].toUpperCase()
            if (allProgs[0][index + 1]) {
                next.textContent = allProgs[0][index + 1]
            } else {
                next.textContent = 'FIM'
            }

            const tempoAtual = allProgs[1][index] * 60

            startContdown(tempoAtual)

            index++
            setTimeout( () => {
                if (runCount) atualizaProgramação()
            }, tempoAtual * 1000)
        } else {
            stop()
        }
    }

    atualizaProgramação()
}

// Inicia o Timer
function startContdown(durationInSeconds) {
    const countdown = document.querySelector('.contdown')
    const progressBar = document.querySelector('.progressBar')
    let timeRemaining = durationInSeconds

    const totalDuration = durationInSeconds


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function updateCountdown() {
        if (timeRemaining >= 0 && runCount) {
            countdown.textContent = formatTime(timeRemaining);

            // Calcula a porcentagem de tempo restante
            const percentage = ((totalDuration - timeRemaining) / totalDuration) * 100;

            // Atualiza a largura da barra de progresso
            progressBar.style.width = `${percentage}%`;
            progressBar.style.height = `100%`;


            // Calcula a cor (verde -> vermelho)
            const red = Math.min(255, Math.floor((1 - timeRemaining / totalDuration) * 255));
            const green = Math.min(255, Math.floor((timeRemaining / totalDuration) * 255));
            progressBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

             // Quando o tempo for menor ou igual a 2 minutos, piscar a barra e os números
            if (timeRemaining <= 120) {
                progressBar.classList.add('blink-bar');
                countdown.classList.add('blink-text');
            }

            timeRemaining--;
        } else {
            countdown.textContent = '00:00'
            progressBar.classList.remove('blink-bar');
            countdown.classList.remove('blink-text');
            clearInterval(timers.interval)
            stop()
        }
    }

    clearInterval(timers.interval); // Garante que não haja múltiplos intervalos ativos
    timers.interval = setInterval(updateCountdown, 1000); // Armazena no objeto
    updateCountdown(); // Atualiza imediatamente a primeira vez
}

function stop() {
    clearInterval(timers.interval); // Acessa o timer pelo objeto
    const progressBar = document.querySelector('.progressBar')
    const h1 = document.querySelector('h1')
    const next = document.querySelector('.next')
    const countdown = document.querySelector('.contdown')
    
    h1.textContent = '...'
    next.textContent = '...'
    progressBar.style.width = 0
    countdown.textContent = '00:00'


    runCount = false
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
const btnResize = document.getElementById('fullscreen-btn');
const icon = document.getElementById('fullscreen-icon');

btnResize.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        updateFullscreen(true);
    } else {
        document.exitFullscreen();
        updateFullscreen(false);
    }
});


function updateFullscreen(isFullscreen) {
    const controlers = document.querySelector('.controls')
    icon.innerHTML = isFullscreen
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="15 9 21 9 21 3"></polyline>
             <polyline points="9 9 3 9 3 3"></polyline>
             <polyline points="15 15 21 15 21 21"></polyline>
             <polyline points="9 15 3 15 3 21"></polyline>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="9 3 3 3 3 9"></polyline>
             <polyline points="15 3 21 3 21 9"></polyline>
             <polyline points="9 21 3 21 3 15"></polyline>
             <polyline points="15 21 21 21 21 15"></polyline>
           </svg>`;

    btnSideMenu.style.display = isFullscreen ? 'none' : 'block'
    
    if (isFullscreen) {
        controlers.classList.add('hidden');
        console.log('Entrou em tela cheia');
    } else {
        controlers.classList.remove('hidden');
        console.log('Saiu de tela cheia');
    }
}
