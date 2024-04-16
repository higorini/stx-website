function alternarOpacidade() {
  const imagens = document.querySelectorAll(".vitrine__init");

  imagens.forEach((imagem, index) => {
    if (imagem.style.opacity === "1") {
      imagem.style.opacity = "0";
    } else {
      imagem.style.opacity = "1";
    }
  });
}

setInterval(alternarOpacidade, 4000);
