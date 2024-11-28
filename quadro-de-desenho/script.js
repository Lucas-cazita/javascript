// Initial Datas
let currentColor = 'black';

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

let mouseX = 0;
let mouseY = 0;

let canDraw = false;
let drawning = false;
let isErasing = false;

// Events
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', itemClick);
})
document.querySelector('.color.erase').addEventListener('click', () => isErasing = true)
document.querySelector('.clear').addEventListener('click', clear)

screen.addEventListener('mousedown', mouseDownEvent);
document.body.addEventListener('mouseup', mouseUpEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseout', () => canDraw=false);
screen.addEventListener('mouseenter', () => canDraw=true);

// Functions
function itemClick(event) {
    let item = event.target.getAttribute(`data-color`);
    currentColor = item;

    document.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');

    isErasing = false
}

function mouseDownEvent(e) {
    canDraw = true;
    drawning = true;

    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
    console.log(mouseX, mouseY)

}

function mouseUpEvent() {
    canDraw = false;
    drawning = false;
}

function mouseMoveEvent(e) {
    if (canDraw && drawning) {
        draw(e.offsetX, e.offsetY);
    }
}

function draw(pointX, pointY) {

    console.log('point', pointX, pointY)

    
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    if (!isErasing) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 5;
    } else {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
    }
    
    ctx.stroke();
    ctx.closePath();

    mouseX = pointX;
    mouseY = pointY;
}

function clear() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}