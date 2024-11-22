async function readPosts() {
    let postArea = document.querySelector('.posts')
    postArea.innerHTML = 'Carregando...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    let json = await response.json()
    
    if (json.length > 0) {
        postArea.innerHTML = ''
        for (let i in json) {
            let postHtml = `<div><h2>${json[i].title}</h2><p>${json[i].body}</p><hr/></div>`

            postArea.innerHTML += postHtml
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir'
    }
   
}

function inseriu() {
    let title = document.querySelector('#titleField').value
    let body = document.querySelector('#ibodyField').value

    if (title && body) {
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos!')
    }
}

async function addNewPost(title, body) {
    let response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        })
        
        let json = await response.json()
        
        console.log(json)

    console.log(`Esse é o titulo ${title} e o body ${body}`)

    document.querySelector('#titleField').value = ''
    document.querySelector('#ibodyField').value = ''

    readPosts()
}

document.querySelector('#insertButton').addEventListener('click', inseriu)

readPosts()
