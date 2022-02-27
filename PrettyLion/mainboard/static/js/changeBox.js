let wbl=document.getElementById("whoweare-box--left");
let wbr=document.getElementById("whoweare-box--right");
let underline=document.getElementById("under-line");

function changetoRight(){
    wbl.style.display ="none";		
    wbr.style.display ="block";    

    underline.style.animation = "line-slide--right 1s";
    underline.style.marginLeft = "250px";

    console.log("change to right");
}

function changetoLeft(){
    wbl.style.display ="block";		
    wbr.style.display ="none";

    underline.style.animation = "line-slide--left 1s";
    underline.style.marginLeft = "0px";

    console.log("change to left");
}
