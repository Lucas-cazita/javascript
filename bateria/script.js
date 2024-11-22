document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase())
})

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value

    song = song.split('')
    playComposion(song)
})

function playSound(sound) {
    let audio = document.querySelector(`#s_${sound}`)
    let key = document.querySelector(`div[data-key="${sound}"]`)

    if (audio) {
        audio.currentTime = 0
        audio.play()
    }

    if (key) {
        key.classList.add('active')

        setTimeout(() => {
            key.classList.remove('active')
        }, 300)
    }
}

function playComposion(music) {
    console.log(music)
    let wait = 0

    for (let songItem of music) {
        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait)

        wait += 200
    }
}