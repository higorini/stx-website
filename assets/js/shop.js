function fillProductDetails(product) {
  // Query selectors
  let productNameElement = document.querySelector(".entry h1");
  let productGallery = document.querySelector(".wrap .swiper-wrapper");
  let productGallerySmall = document.querySelector(".small");
  let buttonColors = document.querySelector(".button__colors");
  let productDescriptionElement = document.querySelector(".description p");
  let productDetailsList = document.querySelector(".product__details");

  // Product info
  productNameElement.innerText = product.productName;

  let imageGallery = product.imageGallery;

  imageGallery.forEach((image) => {
    let swiperSlide = document.createElement("div");
    let actualImage = document.createElement("img");
    actualImage.src = image;
    actualImage.alt = "";
    swiperSlide.classList.add("item");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.appendChild(actualImage);
    productGallery.appendChild(swiperSlide);
  });

  imageGallery.forEach((image) => {
    let itemImage = document.createElement("div");
    let itemWrap = document.createElement("div");
    let actualImage = document.createElement("img");
    actualImage.src = image;
    actualImage.alt = "";
    itemImage.classList.add("item");
    itemImage.classList.add("swiper-slide");
    itemWrap.classList.add("thumb__wrap");
    itemWrap.appendChild(actualImage);
    itemImage.appendChild(itemWrap);
    productGallerySmall.appendChild(itemImage);
  });

  let colors = product.colors;

  colors.forEach((color, index) => {
    let button = document.createElement("button");
    button.classList.add("color__button");
    button.style.backgroundColor = `var(--${color})`;

    if (index == 0) {
      button.classList.add("selected");
    }

    buttonColors.appendChild(button);
  });

  let allButtonColors = document.querySelectorAll(".color__button");

  allButtonColors.forEach((button) => {
    button.addEventListener("click", () => {
      allButtonColors.forEach((button) => {
        button.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });

  createSizeButtons(product);

  productDescriptionElement.innerText = product.description;

  let productDetails = product.details;

  productDetails.forEach((detail) => {
    let unordenedList = document.createElement("li");

    unordenedList.innerText = detail;

    productDetailsList.appendChild(unordenedList);
  });

  const theadRow = document.querySelector("#tabela thead tr");
  const larguraRow = document.querySelector("#larguraRow");
  const alturaRow = document.querySelector("#alturaRow");
  let sizes = product.sizes;

  sizes.forEach((item) => {
    const { size } = item;
    const th = document.createElement("th");
    th.textContent = size;
    theadRow.appendChild(th);

    const larguraTd = document.createElement("td");
    larguraTd.textContent = item.width;
    larguraRow.appendChild(larguraTd);

    const alturaTd = document.createElement("td");
    alturaTd.textContent = item.height;
    alturaRow.appendChild(alturaTd);
  });

  disableMissingSizes(product);
}

function createSizeButtons(product) {
  const sizeContainer = document.querySelector(".buttons__size");
  sizeContainer.innerHTML = "";

  const sizePattern = {
    numeric: ["1-2", "3-4", "5-6", "7-8", "9-11", "12-14"],
    letter: ["U", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  };

  const isNumericSize = product.sizes.some((item) =>
    sizePattern.numeric.includes(item.size)
  );
  const sizes = isNumericSize ? sizePattern.numeric : sizePattern.letter;

  sizes.forEach((size) => {
    const button = document.createElement("button");
    button.classList.add("size__button");
    button.textContent = size;

    if (isNumericSize) {
      button.style.fontSize = "1.6rem";
    }

    sizeContainer.appendChild(button);
  });

  let allSizeButtons = document.querySelectorAll(".size__button");

  allSizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      allSizeButtons.forEach((button) => {
        button.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });
}

function disableMissingSizes(product) {
  const availableSizes = product.sizes.map((item) => item.size);
  const allSizeButtons = document.querySelectorAll(".size__button");

  allSizeButtons.forEach((button) => {
    const size = button.textContent;
    if (!availableSizes.includes(size)) {
      button.disabled = true;
    }
  });
}

function updateBreadcrumb(productName) {
  const breadcrumb = document.getElementById("breadcrumb");
  const breadcrumbLinks = breadcrumb.querySelectorAll("a");

  breadcrumb.innerHTML = "";

  breadcrumbLinks.forEach((link) => {
    breadcrumb.appendChild(link);
    breadcrumb.appendChild(document.createTextNode(" / "));
  });

  breadcrumb.appendChild(document.createTextNode(productName));
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let productId = getUrlParameter("id");

let product = products.data.find((product) => product.id == productId);

if (product) {
  fillProductDetails(product);
} else {
  window.location.href = "erro.html";
}

// Product Gallery

const thumbImage = new Swiper(".thumbnail__image", {
  loop: true,
  direction: "vertical",
  spaceBetween: 15,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
});

const mainImage = new Swiper(".main__image", {
  loop: true,
  autoHeight: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: thumbImage,
  },
});

// Content box

const tabs = document.querySelectorAll(".tab__btn");
const all_content = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");

    if (window.innerWidth >= 820) {
      let line = document.querySelector(".line");
      line.style.width = e.target.offsetWidth + "px";
      line.style.left = e.target.offsetLeft + "px";
    } else {
      let line = document.querySelector(".line");
      line.style.height = e.target.offsetHeight + "px";
      line.style.top = e.target.offsetTop + "px";
    }

    all_content.forEach((content) => {
      content.classList.remove("active");
    });

    all_content[index].classList.add("active");
  });
});

window.addEventListener("resize", () => {
  tabs.forEach((tab, index) => {
    if (tab.classList.contains("active")) {
      const line = document.querySelector(".line");
      if (window.innerWidth >= 820) {
        line.style.width = tab.offsetWidth + "px";
        line.style.left = tab.offsetLeft + "px";
      } else {
        line.style.height = tab.offsetHeight + "px";
        line.style.top = tab.offsetTop + "px";
      }
    }
  });
});
