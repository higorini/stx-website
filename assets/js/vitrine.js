document.addEventListener("DOMContentLoaded", function () {
  const vitrineItems = document.querySelectorAll(".vitrine__init");

  function animateVitrine() {
    vitrineItems.forEach(function (item) {
      setTimeout(
        function () {
          item.classList.add("show");
        },
        parseInt(item.getAttribute("data-delay"))
      );
    });
  }

  animateVitrine();

  setInterval(
    function () {
      vitrineItems.forEach(function (item) {
        setTimeout(
          function () {
            item.classList.add("show");
            setTimeout(
              function () {
                item.classList.remove("show");
              },
              Math.random(2000, 4000)
            );
          },
          parseInt(item.getAttribute("data-delay"))
        );
      });
    },
    Math.max(
      ...Array.from(vitrineItems).map((item) =>
        parseInt(item.getAttribute("data-delay"))
      )
    ) *
      2 +
      100
  );
});
