for (let product of products.data) {
  let item = document.createElement("div");

  item.classList.add("item", product.type, product.category, "hide");

  let image = document.createElement("img");

  image.setAttribute("src", product.mainImage);
  image.setAttribute("alt", product.imageDescription);
  item.appendChild(image);

  item.addEventListener("click", function () {
    showProduct(product);
  });

  document.getElementById("montra__interna").appendChild(item);
}

function filterProduct(value) {
  let types = document.querySelectorAll(".type__value");

  types.forEach((type) => {
    if (value.toUpperCase() == type.innerText.toUpperCase()) {
      type.classList.add("activeType");
    } else {
      type.classList.remove("activeType");
    }
  });

  let elements = document.querySelectorAll(".item");

  elements.forEach((element) => {
    if (value == "todos") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });

  hideProduct();
}

function filterType(value) {
  let buttons = document.querySelectorAll(".button__value");

  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let elements = document.querySelectorAll(".item");

  elements.forEach((element) => {
    if (element.classList.contains(value)) {
      element.classList.remove("hideType");
    } else {
      element.classList.add("hideType");
    }
  });

  hideProduct();
}

function showProduct(product) {
  let montraAtual = document.querySelector(".montra__atual");
  let image = document.createElement("img");
  let productName = document.createElement("h1");
  let productDescription = document.createElement("p");
  let productButton = document.createElement("button");

  montraAtual.innerHTML = "";

  image.setAttribute("src", product.mainImage);
  image.setAttribute("alt", product.imageDescription);
  montraAtual.appendChild(image);

  productName.innerHTML = product.productName;
  montraAtual.appendChild(productName);

  productDescription.innerHTML = product.imageDescription;
  montraAtual.appendChild(productDescription);

  productButton.innerHTML = "Saiba mais";
  productButton.addEventListener("click", function () {
    window.location.href = `product.html?id=${product.id}`;
  });
  montraAtual.appendChild(productButton);

  moveMontraAtual();

  montraAtual.classList.remove("not");

  let position = montraAtual.getBoundingClientRect();

  window.scrollTo({
    top: window.pageYOffset + position.top - 150,
    behavior: "smooth",
  });
}

function moveMontraAtual() {
  let screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    let montraAtual = document.querySelector(".montra__atual");
    let divDestino = document.querySelector(".montra__wrapper");
    let firstChild = divDestino.firstElementChild;

    if (montraAtual && divDestino) {
      divDestino.insertBefore(montraAtual, firstChild);
    }
  } else {
    let montraAtual = document.querySelector(".montra__atual");
    let divOriginal = document.querySelector(".montra__interna");
    let firstChild = divOriginal.firstElementChild;

    if (montraAtual && divOriginal) {
      divOriginal.insertBefore(montraAtual, firstChild);
    }
  }
}

function hideProduct() {
  let montraAtual = document.querySelector(".montra__atual");

  montraAtual.innerHTML = "";

  montraAtual.classList.add("not");
}

window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let type = urlParams.get("type");

  if (!type || (type !== "mulher" && type !== "infantil")) {
    type = "homem";
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?type=${type}`
    );
  }

  filterType(type);
  filterProduct("todos");
};

window.addEventListener("resize", moveMontraAtual);
