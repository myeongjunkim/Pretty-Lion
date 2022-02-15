let mainText=document.querySelector("h1")

window.addEventListener('scroll', function(){
    let value=window.scrollY
    console.log("scrollY", value);

    if(value>500){
        mainText.style.animation='slide-left--top 1s ease-out';
        mainText.style.animation='slide-left--bottom 1s ease-out';
        mainText.style.animation='slide-right 1s ease-out';

    }
});

