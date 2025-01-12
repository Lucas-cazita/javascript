// Relógio
let digitalElement = document.querySelector('.digital')

function setHour() {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    let day = now.getDate()

    digitalElement.innerHTML = `${fixedZero(hour)}:${fixedZero(minutes)}:${fixedZero(seconds)}`

}

function fixedZero(time) {
    return time < 10 ? `0${time}` : time
}


setInterval(() => {
    setHour()
}, 1000);

setHour()



// Adiciona progamação a listagem
function add() {
    // Busca todos os checkboxes na página
    const checkboxes = document.querySelectorAll('.setProg input[type="checkbox"]');

    // Encontra o checkbox que está selecionado
    let selectedCheckbox = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedCheckbox.push(checkbox);
        }
    });

    // Verifica se algum checkbox foi selecionado
    if (selectedCheckbox.length === 0) {
        alert('Por favor, selecione um item antes de adicionar.');
        return;
    }

    selectSetProg('add', selectedCheckbox)

}
// Remove programação da listagem
function del() {
    // Busca todos os checkboxes na página
    const checkboxes = document.querySelectorAll('.setProg input[type="checkbox"]');

    // Encontra os checkboxs que estão selecionados
    let selectedCheckbox = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedCheckbox.push(checkbox);
        }
    });

    // Verifica se algum checkbox foi selecionado
    if (selectedCheckbox.length === 0) {
        alert('Por favor, selecione um item antes de remover.');
        return;
    }

    selectSetProg('del', selectedCheckbox)

}
// Seleciona as setProg que estão a baixo da setProg informada
function selectSetProg(action, selectedCheckbox) {
    let selectedsSetProg = []
    for (let i of selectedCheckbox) {
        selectedsSetProg.push(i.closest('.setProg'))
    } 
    for (let setProg of selectedsSetProg) {
        alterIndex(action, setProg)
        alterElementsList(action, setProg)
    }

}

function alterIndex(action, selectedSetProg) {
    // Seleciona todos os elementos `.setProg`
    const allSetProgs = document.querySelectorAll('.setProg');

    // Filtra aqueles que vêm depois da `selectedSetProg`
    let belowSetProgs = [];
    let found = false;

    allSetProgs.forEach(setProg => {
        if (setProg === selectedSetProg) {
            found = true; // Começa a coletar os próximos elementos
        } else if (found) {
            belowSetProgs.push(setProg);
        }
    });

    for (let setProgElement of belowSetProgs) {
        const inputs = setProgElement.querySelectorAll('input');
        let index = 0

        inputs.forEach(input => {
            // Verifica o tipo do input para personalizar o ID
            if (action === 'add') {
                if (input.type === 'checkbox') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `icheck${Number(index)+1}`;
                } else if (input.type === 'text') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `prog${Number(index)+1}`;
                } else if (input.type === 'number') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `temp${Number(index)+1}`;
                }
            } else if (action === 'del') {
                if (input.type === 'checkbox') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `icheck${Number(index)-1}`;
                } else if (input.type === 'text') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `prog${Number(index)-1}`;
                } else if (input.type === 'number') {
                    index = input.id.charAt(input.id.length -1)
                    input.id = `temp${Number(index)-1}`;
                }
            }
           
        })
    }
}

// Aletra a exibição das programações
function alterElementsList(action, setProg) {
    if (action === 'add') {
        let newIndex = Number(setProg.getElementsByTagName('input')[0].id.charAt(6)) + 1

        // Cria o novo elemento setProg com os IDs atualizados
        const newSetProg = document.createElement('div');
        newSetProg.classList.add('setProg');
        newSetProg.innerHTML = `
            <input type="checkbox" name="check${newIndex}" id="icheck${newIndex}">
            <input type="text" class="prog" id="prog${newIndex}" value="Nova Programação">
            <input type="number" class="temp" id="temp${newIndex}" value="15">
        `;

        // Insere o novo elemento logo após o elemento selecionado
        setProg.insertAdjacentElement('afterend', newSetProg);
    } else if (action === 'del') {
        setProg.remove()
    } else {
        console.log('Impossível identificar operação')
    }
}




// Salvar Progamações
let allProgs = [[], []];
function save() {
    let res = 0;
    const allSetProgs = document.getElementsByClassName('setProg')
    
    allProgs= [[], []]
    for (let prog of allSetProgs) {
        let newProg = prog.querySelector('.prog').value  
        let newTemp = prog.querySelector('.temp').value
        allProgs[0].push(newProg)
        allProgs[1].push(newTemp)
    } 

    for(let i=0; i<allProgs[1].length;i++) {
        res += parseInt(allProgs[1][i])
    }
    document.querySelector('.res span').innerHTML = res
    console.log('save() -> todas as programações: ', allProgs)
}

save()
let runCount = true
const timers = { interval: null }
const timeout = { interval: null }

// Inicia a Progamação
function start() {
    openSideMenu()
    resizeScreen()
    const h1 = document.querySelector('h1')
    const next = document.querySelector('.next')

    let index = 0
    runCount = true

    function atualizaProgramação () {
        if (!runCount) return console.log('runCount= ', runCount)

        if (index < allProgs[0].length) {
            h1.textContent = allProgs[0][index].toUpperCase()
            if (allProgs[0][index + 1]) {
                next.textContent = allProgs[0][index + 1]
            } else {
                next.textContent = 'FIM'
            }

            // const tempoAtual = 0.05 * 60
            const tempoAtual = allProgs[1][index] * 60  // converte minutos para segundos

            startContdown(tempoAtual)

            console.log('atualizaProgramacao= tempoAtual: ', tempoAtual, 'runCount: ', runCount)

            index++
            console.log('index++ de atualizaProgamacao: ', index)

            timeout.interval = setTimeout( () => {
                if (runCount) {
                    console.log('start setTimeout= tempoAtual: ', tempoAtual, ', runCount: ', runCount)
                    atualizaProgramação()
                }
            }, tempoAtual * 1000)
            console.log('atualizaProgramacao timeout= ', timeout.interval)
        } else {
            stop()
        }
    }
    
    console.log('start() timeout= ', timeout.interval)
    clearTimeout(timeout.interval)
    console.log('start().after timeout= ', timeout.interval)

    atualizaProgramação()

    document.getElementById('nextProg').onclick = atualizaProgramação();
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

            // Altera a estilização da progressBar e do countdown
            if (timeRemaining < 1) {  // Remove os efeitos
                progressBar.classList.remove('blink-bar');
                countdown.classList.remove('blink-text');
                countdown.style.color = 'white';

             } else if (timeRemaining <= 30) {  // Pisca a progresBar e o contdown
                progressBar.classList.add('blink-bar');
                countdown.classList.add('blink-text');
                
             } else if (timeRemaining <= 120) {
                countdown.style.color = 'red';  // Muda o texto do countdown para vermelho
            } 

            timeRemaining--;
            
        } else {
            console.log('timeRemaining: ', timeRemaining)
            console.log('runCount: ', runCount)
            console.log('timers: ', timers)
            countdown.textContent = '00:00'
            clearInterval(timers.interval)
            stop()
        }
    }

    clearInterval(timers.interval); // Garante que não haja múltiplos intervalos ativos
    timers.interval = setInterval(updateCountdown, 1000); // Cria um novo intervalo
    updateCountdown(); // Atualiza imediatamente a primeira vez
}

function stop() {
    console.log('stop()')
    console.log('timers: ', timers.interval, 'timeout: ', timeout.interval)

    clearInterval(timers.interval)  // Acessa o timer pelo objeto e encerra o intervalo
    clearTimeout(timeout.interval)  // Acessa o timeout pelo objeto e encerra a contagem


    const progressBar = document.querySelector('.progressBar')
    const h1 = document.querySelector('h1')
    const next = document.querySelector('.next')
    const countdown = document.querySelector('.contdown')
    
    h1.textContent = ''
    next.textContent = ''
    progressBar.style.width = 0
    countdown.textContent = '00:00'
    progressBar.classList.remove('blink-bar');
    countdown.classList.remove('blink-text');
    countdown.style.color = 'white';

    runCount = false

    save()
}

// Evento abrir side menu
let btnSideMenu = document.querySelector('.side-btn')
btnSideMenu.addEventListener('click', openSideMenu)

let posSideMenu
function openSideMenu(open=false) {
    let sideMenu = document.querySelector('.side-menu')
    if (!posSideMenu && open) {
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
const btnResize = document.getElementById('fullscreen-btn').addEventListener('click', resizeScreen);
const icon = document.getElementById('fullscreen-icon');
document.body.addEventListener('keyup', (event) => {
    if(event.code.toLowerCase() === 'esc') {
        updateFullscreen(false)
    }
})

function resizeScreen() {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        updateFullscreen(true);
    } else {
        document.exitFullscreen();
        updateFullscreen(false);
    }
}


function updateFullscreen(isFullscreen) {
    const start = document.querySelectorAll('.hide')
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
    start[0].style.display = isFullscreen ? 'none' : 'inline-block'
    start[1].style.display = isFullscreen ? 'none' : 'inline-block'
}


