function clicou() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
    })
}

function inseriu() {
    fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: {
                    title: 'Titulo de teste',
                    body: 'Conteudo de teste',
                    userId: '20'
                }
            })
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
        })

}

document.querySelector('#botao').addEventListener('click', clicou)
document.querySelector('#inserir').addEventListener('click', inseriu)
