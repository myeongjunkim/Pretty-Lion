function mouseDownCard(obj){
    const cards = document.querySelectorAll('.form__card')
    for(let i=0; i<cards.length; i++){
        cards[i].style.backgroundColor="white";
        cards[i].querySelector('.card-choice').style.color="black";
    }
    obj.style.backgroundColor="#F39927";
    obj.querySelector('.card-choice').style.color="white";
}
