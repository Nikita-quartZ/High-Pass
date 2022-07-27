document.addEventListener("DOMContentLoaded", () => {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76455189529742, 37.611012057561865],
      zoom: 13
    });
    var myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [55.770648672299394, 37.63650377203941]
      }
    });

    var myPlacemark = new ymaps.Placemark([55.766331393185155, 37.63715217300325], {}, {
      iconLayout: 'default#image',
      iconImageHref: './images/Ellipse.svg',
      iconImageSize: [12, 12],
      iconImageOffeset: [-3, -42],
    })
    myMap.geoObjects.add(myPlacemark);
  };

  function validateName(email) {
    return /^[a-zA-Z\-]+$/.test(email);
  }

  function validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  document.querySelector(".about-us__btn").addEventListener("click", () => {
    if (!validateEmail(document.querySelector(".about-us__email-input").value)) {
      document.querySelector(".about-us__error-message").style.opacity = "1";
      document.querySelector(".about-us__email-input").classList.add("about-us__email-error");
    } else {
      document.querySelector(".about-us__email-input").value = "";
    }
  });

  document.querySelector(".about-us__email-input").addEventListener("input", () => {
    document.querySelector(".about-us__error-message").style.opacity = "0";
    document.querySelector(".about-us__email-input").classList.remove("about-us__email-error");
  })

  document.querySelector(".contacts__btn").addEventListener("click", () => {
    const result = {
      name: false,
      email: false,
    }

    if (!validateName(document.querySelector(".contacts__name").value)) {
      document.querySelector(".error-message-first").style.opacity = "1";
      document.querySelector(".contacts__name").classList.add("contacts__email-error");
    } else {
      result.name = true;
    }

    document.querySelector(".contacts__name").addEventListener("input", () => {
      document.querySelector(".error-message-first").style.opacity = "0";
      document.querySelector(".contacts__name").classList.remove("contacts__email-error");
    })

    if (!validateEmail(document.querySelector(".contacts__email").value)) {
      document.querySelector(".error-message-second").style.opacity = "1";
      document.querySelector(".contacts__email").classList.add("contacts__email-error");
    } else {
      result.email = true;
    }

    document.querySelector(".contacts__email").addEventListener("input", () => {
      document.querySelector(".error-message-second").style.opacity = "0";
      document.querySelector(".contacts__email").classList.remove("contacts__email-error");
    })

    if (result.name && result.email) {
      document.querySelector(".contacts__name").value = "";
      document.querySelector(".contacts__email").value = "";
    }
  });

  document.querySelector(".contacts__btn-close").addEventListener("click", () => {
    document.querySelector(".contacts__address-info").style.display = "none";
    document.querySelector(".contacts__btn-open").style.display = "block";
  });

  document.querySelector(".contacts__btn-open").addEventListener("click", () => {
    document.querySelector(".contacts__address-info").style.display = "block";
    document.querySelector(".contacts__btn-open").style.display = "none";
  });

  if (window.screen.width <= 1010) {
    document.querySelector(".header__search-btn").addEventListener("click", () => {
      document.querySelector(".header__search-input").style.display = "block";
      document.querySelector(".header__search-btn").style.display = "none";
      if (window.screen.width <= 740) {
        document.querySelector(".header__logo").style.display = "none";
      }
      document.querySelector(".header__search-btn-close").style.display = "block";
      document.querySelector(".header__search-btn-close").addEventListener("click", () => {
        if (window.screen.width <= 740) {
          document.querySelector(".header__logo").style.display = "block";
        }
        document.querySelector(".header__search-btn-close").style.display = "none";
        document.querySelector(".header__search-input").style.display = "none";
        document.querySelector(".header__search-btn").style.display = "block";
      });
    });
  } else {
    document.querySelector(".header__search-btn").addEventListener("click", () => {

      if (window.getComputedStyle(document.querySelector(".header__search-input"), null).display === "block" || document.querySelector(".header__search-input").value !== "") {
        document.querySelector(".header__search-input").style.display = "none";
        document.querySelector(".header__search-input").value = "";
      } else {
        document.querySelector(".header__search-input").style.display = "block";
      }
    });

    document.querySelector(".header__search-input").addEventListener("blur", () => {
      document.querySelector(".header__search-input").style.display = "none";
    });
  }

  document.querySelector(".header__mobile-menu-btn").addEventListener("click", () => {
    document.querySelector(".mobile-menu").classList.add("is-active");
    document.querySelector(".menu__search-btn-close").classList.add("is-active");
  });

  document.querySelector(".menu__search-btn-close").addEventListener("click", () => {
    document.querySelector(".mobile-menu").classList.remove("is-active");
    document.querySelector(".menu__search-btn-close").classList.remove("is-active");
  });
});
