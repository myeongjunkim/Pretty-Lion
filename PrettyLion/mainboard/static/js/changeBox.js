let wbl=document.getElementById("whoweare-box--left");
let wbr=document.getElementById("whoweare-box--right");
let underline=document.getElementById("under-line");

function changetoRight(){
    wbl.style.display ="none";		
    wbr.style.display ="block";    

    underline.style.marginLeft="59%";

    console.log("change to right");
}

function changetoLeft(){
    wbl.style.display ="block";		
    wbr.style.display ="none";

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

