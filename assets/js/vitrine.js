const vitrineItems = document.querySelectorAll(".vitrine__init");

document.addEventListener("DOMContentLoaded", function () {
  animateVitrine();
});

function animateVitrine() {
  vitrineItems.forEach(function (item) {
    setTimeout(
      function () {
        item.classList.toggle("show");
      },
      parseInt(item.getAttribute("data-delay"))
    );
  });
}

setInterval(animateVitrine, 5000);
