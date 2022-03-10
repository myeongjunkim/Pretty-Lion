// text slide when scroll

let mainTextLeftTop = document.getElementById("left-text--top");
let mainTextRight = document.getElementById("right-text");
let mainTextLeftBottom = document.getElementById("left-text--bottom");
// mainTextLeftTop.style.opacity = 0;
// mainTextRight.style.opacity = 0;
// mainTextLeftBottom.style.opacity = 0;

window.addEventListener('scroll', function () {
    let value = window.scrollY
    if (value >= 100) {
        mainTextLeftTop.style.animation = 'slide-left--top 2s ease-out';
        mainTextLeftTop.style.opacity = 1;

    } else {
    }

    if (value >= 200) {
        mainTextRight.style.animation = 'slide-right 2s ease-out';
        mainTextRight.style.opacity = 1;

    } else {
    }

    if (value >= 300) {
        mainTextLeftBottom.style.animation = 'slide-left--bottom 2s ease-out';
        mainTextLeftBottom.style.opacity = 1;

    } else {
    }

});

