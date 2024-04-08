const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const observerVideo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
const videoElements = document.querySelectorAll(".shop__type-card");

hiddenElements.forEach((el) => observer.observe(el));
videoElements.forEach((el) => observerVideo.observe(el));

window.addEventListener("scroll", function () {
  var header = document.querySelector(".header__wrapper");
  if (window.scrollY > 0) {
    header.classList.add("on__scroll");
  } else {
    header.classList.remove("on__scroll");
  }
});
