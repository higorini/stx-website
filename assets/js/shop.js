function fillProductDetails(product) {
  let productNameElement = document.querySelector(".product p");
  let productGalleryElement = document.querySelector(".product__gallery");
  let productDescriptionImageElement = document.querySelector(
    ".description__image"
  );
  let productDescriptionTextElement =
    document.querySelector(".description__text");
  let productBuyElement = document.querySelector(".product__buy");

  productNameElement.innerText = product.productName;

  let productImage = document.createElement("img");
  productImage.src = product.mainImage;
  productGalleryElement.appendChild(productImage);

  productDescriptionTextElement.innerText = product.imageDescription;

  let buyButton = document.createElement("button");
  buyButton.innerText = "Comprar";
  buyButton.addEventListener("click", function () {
    window.location.href = `shop?id=${product.id}`;
  });
  productBuyElement.appendChild(buyButton);

  updateBreadcrumb(product.productName);
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
