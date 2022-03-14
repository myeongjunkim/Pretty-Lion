
// 여기서 members 선언함!!!!
const getData = () => {
    $.ajax({
        url: '../get-aboutus/',
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (response) {
            // 이게 aboutus 객체 가져오는거
            members = response;
            console.log(members)
        },
        error: function () {
            members = []
            console.log("error")
        }
    });

}


// orbiting aboutus 10th profiles
let canvas = {
    element: document.getElementById('canvas'),
    width: 80,
    height: 30,
    initialize: function () {
        canvas.element.style.width = canvas.width + 'vw';
        canvas.element.style.height = canvas.height + 'vw';
        canvas.element.style.minHeight = 30 + 'vw';
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
        carrier.element.style.width = 2 * carrierRadius + 'vw';
        carrier.element.style.height = 2 * carrierRadius + 'vw';
        carrier.element.className += 'carrier';
        canvas.element.appendChild(carrier.element);
        return carrier;
    },
    drawCarrier: function (x, y) {
        // 여기에 입력받는 x, y는 중심 기준
        this.element.style.left = x - carrierRadius + 'vw';
        this.element.style.top = y - carrierRadius + 'vw';
    },
    insertBall: function (ball) {
        this.element.appendChild(ball.element);
    }
}

let ball = {
    createBall: function (id, name, img, aboutu) {
        let newBall = Object.create(ball);
        newBall.radius = ballRadius;
        newBall.angle = (Math.random() + 1) * 2 * Math.PI;
        newBall.x = carrierRadius + 40 * Math.cos(newBall.angle);
        newBall.y = carrierRadius + 40 * Math.sin(newBall.angle);
        newBall.contact = 0;
        newBall.angleVelocity = angleVelocity;

        // 10th data
        newBall.id = id;
        newBall.name = name;
        newBall.aboutu = aboutu;
        // imgPath 설정 후 아래 이미지 넣는 부분 주석 해제하면 이미지 들어감
        newBall.imgPath = '/media/'+img;

        newBall.element = document.createElement('div');
        newBall.element.backgroundColor = '#f7f7f7';
        newBall.element.style.width = 2 * ballRadius + 'vw';
        newBall.element.style.height = 2 * ballRadius + 'vw';
        newBall.element.className += 'ball';

        // 내부 내용과 이미지 넣는 부분
        newBall.element.innerHTML = 
        `<img class="member_img" src=${newBall.imgPath}>` + 
        `<p class="member_name">${newBall.aboutu}</p>`;

        return newBall;
    },
    moveTo: function (x, y) {
        this.element.style.left = x - ballRadius + 'vw';
        this.element.style.top = y - ballRadius + 'vw';
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
                ball.element.style.width = 2 * 1.2 * ball.radius + 'vw';
                ball.element.style.height = 2 * 1.2 * ball.radius + 'vw';
                ball.element.style.zIndex = "100";
            })
            ball.element.addEventListener("mouseout", () => {
                ball.angleVelocity = 0.03;
                ball.element.style.width = 2 * ball.radius + 'vw';
                ball.element.style.height = 2 * ball.radius + 'vw'
                ball.element.style.zIndex = "0";
            })
        }, interval)
    },
    showDetail: function () {
        let ball = this;
        console.log("hello");
    }
}

let interval = 10;
let angleVelocity = 0.03;
const carrierRadius = 8;
const ballRadius = 6;
// const numOfMembers = 5;
const ellipseRadiusA = 1.6;
const ellipseRadiusB = 1.2;
let balls = [];
let carriers = [];

let members = []

const createCarriers = (num) => {
    let initx = 8;
    let posx = 8;
    let posy = 8;
    let circleLevel = 0;
    for (let i = 0; i < num; i++) {
        carriers.push(ballCarrier.createCarrier(posx, posy));
        posx += 2 * initx;

        if (carriers[i].x + 2 * carrierRadius >= canvas.width) {
            circleLevel += 1;
            posy += carrierRadius * Math.sqrt(3);
            posx = initx * (circleLevel % 2 + 1);
            canvas.height += 13.85;
            document.getElementById('canvas').style.height = canvas.height + 'vw';
        }
    }
}

const createMembers = (num) => {
    for (let i = 0; i < num; i++) {
        balls.push(ball.createBall(members[i].id, members[i].name, members[i].image, members[i].aboutu));
        carriers[i].insertBall(balls[i]);
    }
}

const drawCarriers = (num) => {
    for (let i = 0; i < num; i++) {
        carriers[i].drawCarrier(carriers[i].x, carriers[i].y);
    }
}

const drawMembers = (num) => {
    for (let i = 0; i < num; i++) {
        balls[i].drawBall(balls[i].x, balls[i].y);
    }
}

// modal part
const showModal = () => {
    canvas = document.getElementById('canvas')
    modal = document.getElementById('aboutus-10th-modal');
    input = document.getElementsByClassName('modal-input');
    modal.style.opacity = "1";
    modal.style.zIndex = '50';
    canvas.style.filter = 'blur(5px)';
    modal.style.animation = 'pop-modal 0.5s';
    setTimeout(() => {
        for (let i = 0; i < input.length; i++) {
            input[i].style.opacity = '1';
        }
    }, 250)
}

const closeModal = () => {
    canvas = document.getElementById('canvas')
    modal = document.getElementById('aboutus-10th-modal');
    input = document.getElementsByClassName('modal-input');
    modal.style.animation = 'close-modal 1s'
    modal.style.opacity = '0';
    modal.style.zIndex = '-1';
    canvas.style.filter = 'none';
    for (let i = 0; i < input.length; i++) {
        input[i].style.opacity = '0';
    }
}


canvas.initialize();
getData();
createCarriers(members.length);
createMembers(members.length);
drawCarriers(members.length);
drawMembers(members.length);

console.log(members);