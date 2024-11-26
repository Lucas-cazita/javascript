document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if (input) {
        clearInfo()
        showMessage('Carregando...')
        let encodeInput = encodeURI(input)

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeInput}&appid=933ea464eced1edd941d0214f7e3d386&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showMessage('Não encontramos essa localização.')
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showMessage()

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'

}

function showMessage(msg='') {
    document.querySelector('.aviso').innerHTML = `${msg}`
}

function clearInfo() {
    showMessage()
    document.querySelector('.resultado').style.display = 'none'
}