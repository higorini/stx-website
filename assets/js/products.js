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

  montraAtual.classList.remove("not");
}

window.onload = () => {
  filterType("homem");
  filterProduct("todos");
};
