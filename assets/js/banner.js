let bannerIndex = 1;
let banners = document.getElementsByClassName("banner__slide");
let dots = document.getElementsByClassName("dot");
showBanners(bannerIndex);

function plusBanners(n) {
  showBanners((bannerIndex += n));
}

function currentBanner(n) {
  showBanners((bannerIndex = n));
}

function showBanners(n) {
  let i;

  if (n > banners.length) {
    bannerIndex = 1;
  }

  if (n < 1) {
    bannerIndex = banners.length;
  }

  for (i = 0; i < banners.length; i++) {
    banners[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  banners[bannerIndex - 1].style.display = "block";
  dots[bannerIndex - 1].className += " active";
}

autoShowBanners();

function autoShowBanners() {
  let i;

  for (i = 0; i < banners.length; i++) {
    banners[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  bannerIndex++;

  if (bannerIndex > banners.length) {
    bannerIndex = 1;
  }

  banners[bannerIndex - 1].style.display = "block";
  dots[bannerIndex - 1].className += " active";
  setTimeout(autoShowBanners, 4000);
}
