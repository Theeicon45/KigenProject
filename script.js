const slides = document.querySelectorAll('input[name="slider"]');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].checked = false;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].checked = true;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds
