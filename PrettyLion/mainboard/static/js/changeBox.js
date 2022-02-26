let wbl=document.getElementById("whoweare-box--left");
let wbr=document.getElementById("whoweare-box--right");
let underline=document.getElementById("under-line");

function changetoRight(){
    wbl.style.display ="none";		
    wbr.style.display ="block";
    wbl.style.opacity="0";
    wbr.style.opacity="1";

    underline.style.marginLeft="59%";

    console.log("change to right");
}

function changetoLeft(){
    wbl.style.display ="block";		
    wbr.style.display ="none";
    wbl.style.opacity="1";
    wbr.style.opacity="0";

    underline.style.marginLeft="27%";

    console.log("change to left");
}
// function delay(){
//     setTimeout(function () {
//         console.log("time!");
//     }, 3000);
// }
  
setInterval(function(){
    changetoRight();
    setTimeout(()=>{
        console.log("inside timeout");
    },3000);
    changetoLeft();
}, 5000 );

