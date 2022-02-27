// text slide when scroll

let mainTextLeftTop = document.getElementById("left-text--top");
let mainTextRight = document.getElementById("right-text");
let mainTextLeftBottom = document.getElementById("left-text--bottom");
mainTextLeftTop.style.opacity = 0;
mainTextRight.style.opacity = 0;
mainTextLeftBottom.style.opacity = 0;

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


// create triangle line function
const triangleLine = (elemA, elemB, elemC) => {
    let top = document.getElementById(elemA);
    let left = document.getElementById(elemB);
    let right = document.getElementById(elemC);
    let topRect = top.getBoundingClientRect();
    let leftRect = left.getBoundingClientRect();
    let rightRect = right.getBoundingClientRect();
    let textContainer = document.querySelector('.talent-text-box');
    let textBox = textContainer.getBoundingClientRect();

    topPosX = (topRect.left + topRect.right) / 2 - textBox.left;
    topPosY = (topRect.bottom + topRect.top) / 2 - textBox.top;

    leftPosX = (leftRect.right + leftRect.left) / 2 - textBox.left;
    leftPosY = (leftRect.top + leftRect.bottom) / 2 - textBox.top;

    rightPosX = (rightRect.left + rightRect.right) / 2 - textBox.left;
    rightPosY = (rightRect.top + rightRect.bottom) / 2 - textBox.top;

    let topleftLine = document.getElementById('line--left');
    let toprightLine = document.getElementById('line--right');
    let leftrightLine = document.getElementById('line--bottom');

    topleftLine.setAttribute('x1', `${leftPosX}`);
    topleftLine.setAttribute('x2', `${topPosX}`);
    topleftLine.setAttribute('y1', `${leftPosY}`);
    topleftLine.setAttribute('y2', `${topPosY}`);
    topleftLine.setAttribute('style', 'stroke:#0075BC;stroke-width:4');

    toprightLine.setAttribute('x1', `${rightPosX}`);
    toprightLine.setAttribute('x2', `${topPosX}`);
    toprightLine.setAttribute('y1', `${rightPosY}`);
    toprightLine.setAttribute('y2', `${topPosY}`);
    toprightLine.setAttribute('style', 'stroke:#0075BC;stroke-width:4');

    leftrightLine.setAttribute('x1', `${leftPosX}`);
    leftrightLine.setAttribute('x2', `${rightPosX}`);
    leftrightLine.setAttribute('y1', `${leftPosY}`);
    leftrightLine.setAttribute('y2', `${rightPosY}`);
    leftrightLine.setAttribute('style', 'stroke:#0075BC;stroke-width:4');
}


// text rotation part
let textTop = document.getElementById('talent-text--top');
let textLeft = document.getElementById('talent-text--left');
let textRight = document.getElementById('talent-text--right');

const initx = 29;
const inity = 12;

const radius1 = 5;
const radius2 = 10;
const radius3 = 15;

let vangle1 = 0;
let vangle2 = 0;
let vangle3 = 0;

let x1 = initx + radius1;
let y1 = inity;

let x2 = initx + radius2;
let y2 = inity;

let x3 = initx + radius3;
let y3 = inity;

const putPos = (x1, y1, x2, y2, x3, y3) => {
    textTop.style.left = x1 + 'vw';
    textTop.style.top = y1 + 'vw';
    textLeft.style.left = x2 + 'vw';
    textLeft.style.top = y2 + 'vw';
    textRight.style.left = x3 + 'vw';
    textRight.style.top = y3 + 'vw';
}

const rotate = (angle1, angle2, angle3) => {
    putPos(x1, y1, x2, y2, x3, y3);
    angle1 = (angle1 + 0.011) % 360;
    angle2 = (angle2 - 0.014) % 360;
    angle3 = (angle3 + 0.012) % 360;

    setTimeout(() => {
        x1 = initx + radius1 * Math.cos(angle1);
        y1 = inity + radius1 * Math.sin(angle1) * 0.8;

        x2 = initx + radius2 * Math.cos(angle2);
        y2 = inity + radius2 * Math.sin(angle2) * 0.8;

        x3 = initx + radius3 * Math.cos(angle3);
        y3 = inity + radius3 * Math.sin(angle3) * 0.8;

        rotate(angle1, angle2, angle3);
        triangleLine('talent-text--top', 'talent-text--left', 'talent-text--right')
    }, 15)
}
rotate(vangle1, vangle2, vangle3);

