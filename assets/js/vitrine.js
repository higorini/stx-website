const container = document.querySelector(".vitrine__main");

let path = "./assets/images/Vitrine/";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createImageDivs() {
  const groups = {};
  let numGroups = 0;

  vitrineHome.data.forEach((item) => {
    const group = parseInt(item.imageName.split("-")[0]);
    if (!groups[group]) {
      groups[group] = [];
      numGroups++;
    }
    groups[group].push(item);
  });

  const shuffledGroups = shuffleArray(Object.keys(groups));

  for (let i = 0; i < numGroups; i++) {
    const group = groups[shuffledGroups[i]];
    group.forEach((item) => {
      const figure = document.createElement("figure");
      figure.classList.add("vitrine__item");
      const imageName = parseInt(item.imageName.split("-")[0]);
      figure.classList.add(`vitrine__item--${imageName}`);

      const img = document.createElement("img");
      img.src = `${path}${item.imageName}`;
      img.alt = item.imageName.includes("-B") ? "Image B" : "Image A";
      img.classList.add("vitrine__img");
      figure.appendChild(img);
      container.appendChild(figure);

      if (!item.imageName.includes("-B")) {
        img.classList.add("ignore");
      }
    });
  }
}

function toggleImageClasses(group) {
  const images = group.querySelectorAll(".vitrine__img:not(.ignore)");
  images.forEach((image) => {
    image.classList.toggle("invisible");
  });
}

function alternateGroups() {
  const groups = document.querySelectorAll(".vitrine__item");
  let totalWaitTime = 0;

  groups.forEach((group, index) => {
    const images = group.querySelectorAll(".vitrine__img:not(.ignore)");
    const waitTime = index * 1200 + images.length * 200;

    setTimeout(() => {
      toggleImageClasses(group);
    }, waitTime);

    totalWaitTime = Math.max(waitTime, totalWaitTime);
  });

  setTimeout(
    () => {
      alternateGroups();
    },
    totalWaitTime + 2000 + Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000
  );
}

createImageDivs();
alternateGroups();
