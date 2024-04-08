let slideIndex = 1;
let timer;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
  resetTimer();
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    plusSlides(1);
  }, 4000);
}

let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchDiff = touchStartX - touchEndX;
  if (touchDiff > 50) {
    plusSlides(1);
  } else if (touchDiff < -50) {
    plusSlides(-1);
  }
});

resetTimer();
