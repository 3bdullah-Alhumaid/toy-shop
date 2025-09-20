const slidesContainer = document.querySelector("#swapper .slides");
const images = document.querySelectorAll("#swapper .previo");
const totalImg = images.length;

let index = 0;

function showSlides(i) {
    index = (i + totalImg) % totalImg;  // wrap around
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    showSlides(index + 1);
}

function prevSlide() {
    showSlides(index - 1);
}

// optional: initialize
showSlides(0);

setInterval(nextSlide, 5000);

document.addEventListener("keydown", function(e){
   if (e.key === "ArrowRight") {
    nextSlide();
}
    else if(e.key === "ArrowLeft"){
        prevSlide();
    }

})


    function search(){
    var input, filter, div, i, nameDiv, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("product-container");

    for (i = 0; i < div.length; i++) {
      nameDiv = div[i].getElementsByClassName("productName")[0];
      if (nameDiv) {
        txtValue = nameDiv.textContent || nameDiv.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          div[i].style.display = "";
        } else {
          div[i].style.display = "none";
        }
      }
    }
  };