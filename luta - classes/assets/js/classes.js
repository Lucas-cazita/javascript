class Character {

    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor (name) {
        this.name = name
    }

    get life() {
        return this._life
    }

    set life(newLife) {
        this._life = newLife >= 0 ? newLife : 0
    }
}

class Kinight extends Character {
    constructor (name) {
        super(name)
        this.life = 100
        this.maxLife = this.life
        this.attack = 10
        this.defense = 8
    }
}

class Sorcerer extends Character {
    constructor (name) {
        super(name)
        this.life = 80
        this.maxLife = this.life
        this.attack = 15
        this.defense = 3
    }
}

class LittleMonster extends Character {
    constructor () {
        super('Little Monster')
        this.life = 40
        this.maxLife = this.life
        this.attack = 4
        this.defense = 4
    }
}

class BigMonster extends Character{
    constructor () {
        super('Big Monster')
        this.life = 120
        this.maxLife = this.life
        this.attack = 16
        this.defense = 6
    }
}

class Stage {
    constructor (fighter1, fighter2, fighterEl1, fighterEl2, logObject) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighterEl1 = fighterEl1
        this.fighterEl2 = fighterEl2
        this.log = logObject
    }

    start () {
        this.update()

        this.fighterEl1.querySelector('.attackButton').addEventListener('click', () => {this.doAttack(this.fighter1, this.fighter2)})
        this.fighterEl2.querySelector('.attackButton').addEventListener('click', () => {this.doAttack(this.fighter2, this.fighter1)})
    }

    update() {
        // Fighter 1
        this.fighterEl1.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        this.fighterEl1.querySelector('.bar').style.width = `${f1Pct}%`


        // Fighter 2
        this.fighterEl2.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        this.fighterEl2.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Atacando cachorro morto..')
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)
        let defenseFactor = (Math.random() * 2).toFixed(2)

        let newAttack = attacking.attack * attackFactor
        let newDefense = attacked.defense * defenseFactor

        if (newAttack > newDefense) {
            let damage = (newAttack - newDefense).toFixed(2)
            attacked.life -= damage
            this.log.addMessage(`${attacking.name} deu ${damage} de dano.` )
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender!`)
        }
        
        this.update()
    }
}

class Log {
    list = []

    constructor(listEl) {
        this.listEl = listEl
    }

    addMessage(msg) {
        this.list.push(msg)
        this.render()
    }

    render() {
        this.listEl.innerHTML = ''

        for (let i = 0; i < this.list.length; i++) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}