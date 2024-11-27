// Initial Datas
let currentColor = 'black';

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

let mouseX = 0;
let mouseY = 0;

let canDraw = false

// Events
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', itemClick);
})

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mouseup', mouseUpEvent);
screen.addEventListener('mousemove', mouseMoveEvent);

// Functions
function itemClick(event) {
    let item = event.target.getAttribute(`data-color`);
    currentColor = item;

    document.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true

    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseUpEvent() {
    canDraw = false
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY)
    }
}

function draw() {
    
}