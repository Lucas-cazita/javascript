const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
}

const createSorecer = (name) => {
    return  {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 3
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Mosnter',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

const createBigmonster = () => {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6
    }
}

const createStage = (fighter1, fighter2, fighter1El, fighter2El, log) => {
    return {
        fighter1,
        fighter2,
        fighter1El,
        fighter2El,
        log,

        start() {
            this.update()

            this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
            this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
        },

        update() {
            // Alterando nome e vida dos jogadores
            this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`
            this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`

            // Calculando a quantidade de vida de cada um (%)
            let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
            let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100

            // Atualizando a barra de vida
            this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
            this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
        },

        doAttack(attacking, attacked) {
            // Se um dos dois estiver morto não permite lutar
            if (attacking.life <= 0 || attacked.life <= 0) {
                this.log.addMesage('Atacando cachorro morto...')
                return
            }

            // Define o fator de ataque / defesa
            let factAttack = (Math.random() * 2).toFixed(2)
            let factDefense = (Math.random() * 2).toFixed(2)
            // Altera a pontuação de ataque
            let newAttack = attacking.attack * factAttack
            let newDefense = attacked.defense * factDefense
            let damage = newAttack - newDefense

            // Verifica se o ataque foi bem sucedido
            if (damage > 0) {
                attacked.life = attacked.life - damage > 0 ? attacked.life - damage : 0
                this.log.addMesage(`${attacking.name} causou ${damage.toFixed(2)} em ${attacked.name}`)
            } else {
                this.log.addMesage(`${attacked.name} conseguiu defender...`)
            }

            this.update()
        }

    }
}

const createLog = (listEl) => {
    return {
        list: [],
        listEl,

        addMesage(msg) {
            this.list.push(msg)
            this.render()
        },

        render() {
            this.listEl.innerHTML = ''

            for (let i in this.list) {
                this.listEl.innerHTML += `<li>${this.list[i]}</li>`
            }
        }
    }
}