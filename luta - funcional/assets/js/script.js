let log = createLog(document.querySelector('.log'))

let char = createKnight('Lucas')
let monster = createLittleMonster()


let stage = createStage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

stage.start()