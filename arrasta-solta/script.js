// Initial Data
let areas = {
    a: null,
    b: null,
    c: null
}

// Events
    // Items
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})

    // Areas
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);

})

    // Neutral Areas
document.querySelectorAll('.neutralArea').forEach(neutralArea => {
    neutralArea.addEventListener('dragover', dragOverNeutral);
    neutralArea.addEventListener('dragleave', dragLeaveNeutal);
    neutralArea.addEventListener('drop', dropNeutral);
})


// Functions Item
function dragStart(e) {
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

// Functions Area
function dragOver(e) {
    if (e.target.innerHTML === '') {
        e.preventDefault()
        e.target.classList.add('hover');
    }
}

function dragLeave(e) {
    e.target.classList.remove('hover');

}

function drop(e) {
    e.target.classList.remove('hover');

    if (e.target.innerHTML === '') {
        let dragItem = document.querySelector('.item.dragging');
        e.target.appendChild(dragItem) 
        checkItems() 
    }

}

// Functions Neutral Area
function dragOverNeutral(e) {
    e.preventDefault();
    document.querySelector('.neutralArea').classList.add('hover');
}

function dragLeaveNeutal(e) {
    document.querySelector('.neutralArea').classList.remove('hover');
}

function dropNeutral(e) {
    document.querySelector('.neutralArea').classList.remove('hover');

    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem)

    checkItems()
}

// Logic Funcions 
function checkItems() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name')

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    if (areas['a'] === '1' && areas['b'] === '2' && areas['c'] === '3') {
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }

    console.log(areas)
}