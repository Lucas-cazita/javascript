let totalSlides = document.querySelectorAll('.slider-item').length;
let currentSlide = 0;
let interval = {interval: null};

document.querySelector('.slider-width').style.width = 
    `calc(100vw * ${totalSlides})`;       
document.querySelector('.slider-controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`;


function goPrev() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides -1;
    };
    updateMargin(); 

    clearInterval(interval.interval)
    interval.interval = setInterval(goNext, 10000);

}

function goNext() {
    currentSlide++;
    if (currentSlide > (totalSlides-1)) {
        currentSlide = 0;
    }
    updateMargin();

    clearInterval(interval.interval)
    interval.interval = setInterval(goNext, 10000);
}

function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth;
    let newMargin =(currentSlide * sliderItemWidth);

    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
}

interval.interval = setInterval(goNext, 10000);