function alternarOpacidade() {
  const imagens = document.querySelectorAll(".vitrine__init");

  imagens.forEach((imagem, index) => {
    let opacity = parseFloat(imagem.style.opacity || 0);
    let targetOpacity = opacity === 0 ? 1 : 0;
    let delay = parseInt(imagem.dataset.delay || 0);

    setTimeout(() => {
      const interval = setInterval(() => {
        if (opacity === targetOpacity) {
          clearInterval(interval);
        } else {
          opacity =
            opacity < targetOpacity
              ? Math.min(opacity + 0.1, targetOpacity)
              : Math.max(opacity - 0.1, targetOpacity);
          imagem.style.opacity = opacity.toString();
        }
      }, 100); // Alterado para 100ms para transição em 1 segundo
    }, delay);
  });
}

setInterval(alternarOpacidade, 4000);
