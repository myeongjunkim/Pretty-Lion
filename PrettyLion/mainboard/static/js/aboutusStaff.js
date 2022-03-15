
const convertPXToVW = (px) => {
	return px * (100 / document.documentElement.clientWidth);
}

const sideMarginVW = convertPXToVW(150);
const staffX = 44-sideMarginVW;
const staffY = 27;
const radius = 17;
const angleInt = Math.PI / 4;

let vInt = 0.005;
let lion = document.getElementById('aboutus-staff-transparent')
lion.style.left = staffX + 'vw';
lion.style.top = staffY + 'vw';

let staff1 = document.getElementById('aboutus-staff-1')
let staff2 = document.getElementById('aboutus-staff-2')
let staff3 = document.getElementById('aboutus-staff-3')
let staff4 = document.getElementById('aboutus-staff-4')
let staff5 = document.getElementById('aboutus-staff-5')
let staff6 = document.getElementById('aboutus-staff-6')
let staff7 = document.getElementById('aboutus-staff-7')
let staff8 = document.getElementById('aboutus-staff-8')


const putStaff = (v) => {
    staff1.style.left = staffX + radius * Math.cos(v) + 'vw';
    staff1.style.top = staffY + radius * Math.sin(v) + 'vw';
    staff2.style.left = staffX + radius * Math.cos(v + angleInt * 1) + 'vw';
    staff2.style.top = staffY + radius * Math.sin(v + angleInt * 1) + 'vw';
    staff3.style.left = staffX + radius * Math.cos(v + angleInt * 2) + 'vw';
    staff3.style.top = staffY + radius * Math.sin(v + angleInt * 2) + 'vw';
    staff4.style.left = staffX + radius * Math.cos(v + angleInt * 3) + 'vw';
    staff4.style.top = staffY + radius * Math.sin(v + angleInt * 3) + 'vw';
    staff5.style.left = staffX + radius * Math.cos(v + angleInt * 4) + 'vw';
    staff5.style.top = staffY + radius * Math.sin(v + angleInt * 4) + 'vw';
    staff6.style.left = staffX + radius * Math.cos(v + angleInt * 5) + 'vw';
    staff6.style.top = staffY + radius * Math.sin(v + angleInt * 5) + 'vw';
    staff7.style.left = staffX + radius * Math.cos(v + angleInt * 6) + 'vw';
    staff7.style.top = staffY + radius * Math.sin(v + angleInt * 6) + 'vw';
    staff8.style.left = staffX + radius * Math.cos(v + angleInt * 7) + 'vw';
    staff8.style.top = staffY + radius * Math.sin(v + angleInt * 7) + 'vw';
}

const rotateStaff = (v) => {
    putStaff(v);
    v = (v + vInt) % 360;
    setTimeout(()=>{
        rotateStaff(v);
    }, 20)
}

const isMouseOver = () => {
    document.querySelectorAll(".staff-detail").forEach(item=>{
        item.addEventListener('mouseover', ()=>{
            vInt = 0;
        })
    })
    document.querySelectorAll(".staff-detail").forEach(item=>{
        item.addEventListener('mouseout', ()=>{
            vInt = 0.005;
        })
    })
}

rotateStaff(vInt)
isMouseOver();