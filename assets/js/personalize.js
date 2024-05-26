let path = "./assets/images/Vitrine/";

const groupedImages = vitrineHome.data.reduce((acc, image) => {
  const baseName = image.imageName.split("-")[0];
  if (!acc[baseName]) {
    acc[baseName] = [];
  }
  acc[baseName].push(image.imageName);
  return acc;
}, {});

const container = document.querySelector(".vitrine__main");

let count = 0;

Object.keys(groupedImages).forEach((baseName) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  figure.classList.add("vitrine__item", `vitrine__item--${baseName}`);

  img.classList.add("vitrine__img");
  img.setAttribute(
    "src",
    path + groupedImages[baseName].find((name) => name.includes("-A"))
  );

  figure.appendChild(img);
  container.appendChild(figure);

  startIndividualAlternation(img, baseName, count);
  count++;
});

function toggleImage(img, imgBaseName) {
  const imgName = img.getAttribute("src").split("/").pop();

  const hasA = groupedImages[imgBaseName].includes(`${imgBaseName}-A.jpg`);
  const hasB = groupedImages[imgBaseName].includes(`${imgBaseName}-B.jpg`);

  if (hasA && hasB) {
    img.classList.add("invisible");

    img.addEventListener("transitionend", function onTransitionEnd() {
      img.removeEventListener("transitionend", onTransitionEnd);

      if (imgName.includes("-A")) {
        img.setAttribute("src", path + imgName.replace("-A", "-B"));
      } else if (imgName.includes("-B")) {
        img.setAttribute("src", path + imgName.replace("-B", "-A"));
      }

      setTimeout(() => {
        img.classList.remove("invisible");
        startIndividualAlternation(img, imgBaseName, img.dataset.groupIndex);
      }, 2000);
    });
  }
}

function startIndividualAlternation(img, imgBaseName, groupIndex) {
  const visibleInterval =
    5500 +
    groupIndex * 500 -
    Math.floor(Math.random() * (4000 - 2000 + 1)) +
    2000;

  setTimeout(() => {
    toggleImage(img, imgBaseName);
  }, visibleInterval);
}

document.querySelectorAll("img.vitrine__img").forEach((img, index) => {
  const imgBaseName = img.getAttribute("src").split("/").pop().split("-")[0];
  img.dataset.groupIndex = index;
  startIndividualAlternation(img, imgBaseName, index);
});
