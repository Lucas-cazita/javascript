let digitalElement = document.querySelector('.digital')
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function setHour() {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    digitalElement.innerHTML = `${fixedZero(hour)}:${fixedZero(minutes)}:${fixedZero(seconds)}`

    let sDeg = ((360 / 60) * seconds) - 90 
    let mDeg = ((360 / 60) * minutes) - 90
    let hDeg = ((360 / 12) * hour) - 90

    sElement.style.transform = `rotate(${sDeg}deg)`
    mElement.style.transform = `rotate(${mDeg}deg)`
    hElement.style,transform = `rotate(${hDeg}deg)`
}

function fixedZero(time) {
    return time < 10 ? `0${time}` : time
}


setInterval(() => {
    setHour()
}, 1000);

setHour()