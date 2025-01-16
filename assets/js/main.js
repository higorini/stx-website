const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const observerShow = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
const showElements = document.querySelectorAll(".show");

hiddenElements.forEach((el) => observer.observe(el));
showElements.forEach((el) => {
  el.classList.add("up");
  observerShow.observe(el);
});

const groups = new Map();

showElements.forEach((el) => {
  const groupId = el.dataset.group;
  if (groupId) {
    if (!groups.has(groupId)) {
      const delay = Math.random() * 0.3 + 0.3;
      groups.set(groupId, delay);
    }
    el.style.transitionDelay = `${groups.get(groupId)}s`;
  } else {
    const delay = Math.random() * 0.3 + 0.3;
    el.style.transitionDelay = `${delay}s`;
  }
});

let lastScrollPosition = window.pageYOffset;

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.pageYOffset;
  const header = document.querySelector(".header__wrapper");

  showElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      if (currentScrollPosition > lastScrollPosition) {
        el.classList.add("down");
        el.classList.remove("up");
      } else if (currentScrollPosition < lastScrollPosition) {
        el.classList.add("up");
        el.classList.remove("down");
      }
    }
  });

  lastScrollPosition = currentScrollPosition;

  if (currentScrollPosition > 0) {
    header.classList.add("on__scroll");
  } else {
    header.classList.remove("on__scroll");
  }
});

function redirectToPage(type) {
  window.location.href = "shop.html?type=" + type;
}
