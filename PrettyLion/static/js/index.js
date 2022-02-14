function changeImg(event,Img) {
    var reader = new FileReader();

    reader.onload = function (event) {
        // get loaded data and render thumbnail.
        document.getElementById(Img).src = event.target.result;
    };
    console.log(event)
    // read the image file as a data URL.
    reader.readAsDataURL(event.target.files[0]);
};