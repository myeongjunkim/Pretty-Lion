// text slide when scroll

let mainText=document.querySelector("p")

window.addEventListener('scroll', function(){
    let value=window.scrollY
    console.log("scrollY", value);

    if(value>500){
        mainText.style.animation='slide-left--top 1s ease-out';
        mainText.style.animation='slide-left--bottom 1s ease-out';
        mainText.style.animation='slide-right 1s ease-out';
    }
});


// triangle line function
const triangleLine = (elemA, elemB, elemC) => {
    let top = document.getElementById(elemA);
    let left = document.getElementById(elemB);
    let right = document.getElementById(elemC);
    let topRect = top.getBoundingClientRect();
    let leftRect = left.getBoundingClientRect();
    let rightRect = right.getBoundingClientRect();
    let textContainer = document.querySelector('.talent-text-box');
    let textBox = textContainer.getBoundingClientRect();

    topPosX = (topRect.left + topRect.right)/2 - textBox.left;
    topPosY = (topRect.bottom + topRect.top)/2 - textBox.top;
    
    leftPosX = (leftRect.right + leftRect.left)/2 - textBox.left ;
    leftPosY = (leftRect.top + leftRect.bottom)/2 - textBox.top;

    rightPosX = (rightRect.left + rightRect.right)/2 - textBox.left;
    rightPosY = (rightRect.top + rightRect.bottom)/2 - textBox.top;

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

triangleLine('talent-text--top', 'talent-text--left', 'talent-text--right')


// triangle rotation part
let rotationAngle = 0;
let mainSection = document.getElementById('triangle-section');
let textTop = document.getElementById('talent-text--top');
let textLeft = document.getElementById('talent-text--left');
let textRight = document.getElementById('talent-text--right');
console.log(mainSection, textTop)
const rotateTriangle = () => {
    rotationAngle += 0.2;
    mainSection.style.transform = `rotate(${rotationAngle}deg)`;
    textTop.style.transform = `rotate(${-rotationAngle}deg)`;
    textLeft.style.transform = `rotate(${-rotationAngle}deg)`;
    textRight.style.transform = `rotate(${-rotationAngle}deg)`;
    setTimeout(() => {
        rotateTriangle(rotationAngle);
    }, 1)
}

rotateTriangle();

mainSection.style.transform = `rotate)`;
textTop.style.transform = `rotate(45deg)`
textLeft.style.transform = `rotate(45deg)`
textRight.style.transform = `rotate(45deg)`