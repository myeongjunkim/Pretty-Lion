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


// orbiting aboutus 10th profiles
let canvas = {
    element: document.getElementById('canvas'),
    width: 1440,
    height: 1440,
    initialize: function () {
        canvas.element.style.width = canvas.width + 'px';
        canvas.element.style.height = canvas.height + 'px';
        document.body.appendChild(canvas.element);
    }
}

let ballCarrier = {
    createCarrier: function (x, y) {
        let carrier = Object.create(ballCarrier);
        carrier.x = x;
        carrier.y = y;
        carrier.radius = carrierRadius;
        carrier.element = document.createElement('div');
        carrier.element.style.backgroundColor = "#000000";
        carrier.element.style.width = 2 * carrierRadius + 'px';
        carrier.element.style.height = 2 * carrierRadius + 'px';
        carrier.element.className += 'carrier';
        canvas.element.appendChild(carrier.element);
        return carrier;
    },
    drawCarrier: function (x, y) {
        // 여기에 입력받는 x, y는 중심 기준
        this.element.style.left = x - carrierRadius + 'px';
        this.element.style.top = y - carrierRadius + 'px';
    },
    insertBall: function (ball) {
        this.element.appendChild(ball.element);
    }
}

let ball = {
    createBall: function () {
        let newBall = Object.create(ball);
        newBall.radius = ballRadius;
        newBall.angle = (Math.random() + 1) * 2 * Math.PI;
        newBall.x = carrierRadius + 40 * Math.cos(newBall.angle);
        newBall.y = carrierRadius + 40 * Math.sin(newBall.angle);
        newBall.contact = 0;
        newBall.angleVelocity = angleVelocity;
        // imgPath 설정 후 아래 이미지 넣는 부분 주석 해제하면 이미지 들어감
        newBall.imgPath = '';
        newBall.element = document.createElement('div');
        newBall.element.backgroundColor = '#f7f7f7';
        newBall.element.style.width = 2 * ballRadius + 'px';
        newBall.element.style.height = 2 * ballRadius + 'px';
        newBall.element.className += 'ball';

        // 내부 내용과 이미지 넣는 부분
        // newBall.element.innerHTML = `<img class="member_img" src=${newBall.imgPath}>` + '<p>따봉!</p>';
        return newBall;
    },
    moveTo: function (x, y) {
        this.element.style.left = x - ballRadius + 'px';
        this.element.style.top = y - ballRadius + 'px';
    },
    drawBall: function (x, y) {
        this.moveTo(x, y);

        let ball = this;
        setTimeout(() => {
            ball.angle += ball.angleVelocity;
            ball.x = carrierRadius + ellipseRadiusA * Math.cos(ball.angle);
            ball.y = carrierRadius + ellipseRadiusB * Math.sin(ball.angle);
            ball.drawBall(ball.x, ball.y);
            ball.element.addEventListener("mouseover", () => {
                ball.angleVelocity = 0;
                ball.element.style.width = 2 * 1.2 * ball.radius + 'px';
                ball.element.style.height = 2 * 1.2 * ball.radius + 'px';
                ball.element.style.zIndex = "100";
            })
            ball.element.addEventListener("mouseout", () => {
                ball.angleVelocity = 0.03;
                ball.element.style.width = 2 * ball.radius + 'px';
                ball.element.style.height = 2 * ball.radius + 'px'
            })
        }, interval)
    }
}

let interval = 10;
let angleVelocity = 0.03;
const carrierRadius = 120;
const ballRadius = 80;
const numOfMembers = 24;
const speed = 0.5;
const gravity = 0.1;
const friction = 0.012;
const ellipseRadiusA = 35;
const ellipseRadiusB = 25;

let carriers = [];
let members = [];

const createCarriers = (num) => {
    let initx = 120;
    let posx = 120;
    let posy = 120;
    let circleLevel = 0;
    for (let i = 0; i < num; i++) {
        carriers.push(ballCarrier.createCarrier(posx, posy));
        posx += 2 * initx;

        if (carriers[i].x + 2 * carrierRadius >= canvas.width) {
            circleLevel += 1;
            posy += 120 * Math.sqrt(3);
            posx = initx * (circleLevel % 2 + 1)
        }
    }
}

const createMembers = (num) => {
    let initx = 120;
    let posx = 120;
    let posy = 120;
    let circleLevel = 0;
    for (let i = 0; i < num; i++) {
        members.push(ball.createBall());
        carriers[i].insertBall(members[i]);
    }
}

const drawCarriers = () => {
    for (let i = 0; i < numOfMembers; i++) {
        carriers[i].drawCarrier(carriers[i].x, carriers[i].y);
    }
}

const drawMembers = () => {
    for (let i = 0; i < numOfMembers; i++) {
        members[i].drawBall(members[i].x, members[i].y);
    }
}

canvas.initialize();

createCarriers(numOfMembers);
createMembers(numOfMembers);
drawCarriers();
drawMembers();