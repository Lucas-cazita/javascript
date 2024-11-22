function teclou(e) {
    if (e.key === 'Enter') {
        let newLi = document.createElement('li')
        newLi.innerHTML = input.value
        ul.appendChild(newLi)

        input.value = ""
    }
}

let ul = document.querySelector('ul')

let input = document.querySelector('input')
input.addEventListener('keyup', teclou)