let log = new Log(document.querySelector('.log'))

let char = new Kinight('Lucas')
let monster = new BigMonster()

const stage = new Stage (
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

stage.start()