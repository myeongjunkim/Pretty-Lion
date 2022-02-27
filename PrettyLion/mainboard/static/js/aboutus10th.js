
// orbiting aboutus 10th profiles
let canvas = {
    element: document.getElementById('canvas'),
    width: 1440,
    height: 240,
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
                ball.element.style.zIndex = "0";
            })
        }, interval)
    }
}

let interval = 10;
let angleVelocity = 0.03;
const carrierRadius = 120;
const ballRadius = 80;
const numOfMembers = 11;
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
            posx = initx * (circleLevel % 2 + 1);
            canvas.height += 207.84;
            document.getElementById('canvas').style.height = canvas.height + 'px';
        }
    }
}

const createMembers = (num) => {
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