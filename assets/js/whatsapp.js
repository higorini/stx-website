function sendWhatsApp() {
  let selectedProductName = document.querySelector(".title").innerHTML;
  let selectedCategoryName = document.querySelector(".product__sub").innerHTML;
  let selectedTypeName = document.querySelector(".product__category").innerHTML;
  let selectedColorVariable = document.querySelector(".color__button.selected");
  let selectedSizeVariable = document.querySelector(".size__button.selected");
  let phone = "+351914636204";
  let message = "";
  let url = "";

  if (
    selectedProductName &&
    selectedCategoryName &&
    selectedColorVariable &&
    selectedSizeVariable
  ) {
    selectedColorVariable =
      selectedColorVariable.getAttribute("data-color-name");
    selectedSizeVariable = selectedSizeVariable.getAttribute("data-size");
    url =
      "https://wa.me/" +
      phone +
      "?text=" +
      "Olá! Tenho interesse em adquirir o produto " +
      selectedProductName +
      " da categoria " +
      selectedCategoryName +
      ", do modelo " +
      selectedTypeName +
      ". A cor que eu gostei foi a " +
      selectedColorVariable +
      " de tamanho " +
      selectedSizeVariable +
      ". Poderia me ajudar?";

    window.open(url, "_blank").focus();
  } else {
    console.log("Por favor, selecione todas as opções antes de enviar.");
  }
}
