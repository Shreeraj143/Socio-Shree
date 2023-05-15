// CONTAINER
const container = document.querySelector("main .container");
const searchBar = document.querySelector("#search-bar");
const btn = document.querySelectorAll(".btn");

// SIDEBAR
const menuItems = document.querySelectorAll(".menu-item");

// MESSAGES
const messagesNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

// THEME
const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
let root = document.querySelector(":root");
const colorPalette = document.querySelectorAll(".choose-color span");
const backgroundColors = document.querySelectorAll(".choose-bg > div");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");

// -----------------------------SIDEBAR----------------------------------

// remove active class from all menu-items
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notification-count"
      ).style.display = "none";
    }
  });
});

// -----------------------------MESSAGES----------------------------------

// Searches Chat
searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((chat) => {
    let name = chat.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};

// Search chat
messageSearch.addEventListener("keyup", searchMessage);

// Highlighting message box when messages is clicked
messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// -----------------------------THEME CUSTOMIZATION----------------------------------

// Opens Theme Modal
const openThemeModal = () => {
  themeModal.style.display = "grid";
};

// closes theme modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};

themeModal.addEventListener("click", closeThemeModal);
theme.addEventListener("click", openThemeModal);

// ------------------------- FONT SIZES --------------------------

const maxFontSizeProps = () => {
  container.style.width = "95%";
  container.gridTemplateColumns = "20vw auto 25vw";
  container.columnGap = "1rem";
  //   searchBar.style.setProperty("----search-padding", "0.3rem");
};

// Remove active class from spans or font size selectors
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.add("active");
    if (size.classList.contains("font-size-1")) {
      fontSize = "10px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "5.4rem");
      container.style.width = "80%";
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "13px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "-7rem");
      container.style.width = "80%";
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      root.style.setProperty("----sticky-top-left", "-2rem");
      root.style.setProperty("----sticky-top-right", "-17rem");
      container.style.width = "80%";
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "19px";
      root.style.setProperty("----sticky-top-left", "-5rem");
      root.style.setProperty("----sticky-top-right", "-25rem");
      container.style.width = "90%";
    } else if (size.classList.contains("font-size-5")) {
      fontSize = "21px";
      root.style.setProperty("----sticky-top-left", "-12rem");
      root.style.setProperty("----sticky-top-right", "-35rem");
      maxFontSizeProps();
    }

    // Change the font-size of the root html element
    document.querySelector("html").style.fontSize = fontSize;
    //   We used rem for all our fontsizes, that is why we are able to change all our fontsizes at once just by changing that of our html element
  });
});

// ------------------------- COLORS --------------------------

const removeColorSelector = () => {
  colorPalette.forEach((color) => {
    color.classList.remove("active");
  });
};

colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    removeColorSelector();
    let primaryColor;
    color.classList.add("active");
    if (color.classList.contains("color-1")) {
      primaryColor = "hsl(252, 75%, 60%)";
    } else if (color.classList.contains("color-2")) {
      primaryColor = "hsl(52, 75%, 60%)";
    } else if (color.classList.contains("color-3")) {
      primaryColor = "hsl(352, 75%, 60%)";
    } else if (color.classList.contains("color-4")) {
      primaryColor = "hsl(152, 75%, 60%)";
    } else if (color.classList.contains("color-5")) {
      primaryColor = "hsl(202, 75%, 60%)";
    }

    root.style.setProperty("--color-primary", primaryColor);
  });
});

// ------------------------- BACKGROUND --------------------------

// BG 2
bg2.addEventListener("click", () => {
  root.style.setProperty("--color-dark", "hsl(252, 15%, 95%)");
  root.style.setProperty("--color-white", "hsl(252, 15%, 20%)");
  root.style.setProperty("--color-light", "hsl(252, 15%, 15%)");

  //   add active class
  bg2.classList.add("active");

  //   remove active class from other classes
  bg1.classList.remove("active");
  bg3.classList.remove("active");
});

// BG 3
bg3.addEventListener("click", () => {
  root.style.setProperty("--color-dark", "hsl(252, 15%, 95%)");
  root.style.setProperty("--color-white", "hsl(252, 15%, 10%)");
  root.style.setProperty("--color-light", "hsl(252, 15%, 0%)");

  //   add active class
  bg3.classList.add("active");

  //   remove active class from other classes
  bg1.classList.remove("active");
  bg2.classList.remove("active");
});

// BG 1
bg1.addEventListener("click", () => {
  //   add active class
  bg1.classList.add("active");

  //   remove active class from other classes
  bg2.classList.remove("active");
  bg3.classList.remove("active");
  window.location.reload();
});

// const removeBackgroundSelector = () => {
//     backgroundColors.forEach((background) => {
//       background.classList.remove("active");
//     });
//   };

//   backgroundColors.forEach((background) => {
//     background.addEventListener("click", (e) => {
//       removeBackgroundSelector();
//       let bgColor;
//       let textColor;
//       if (background.classList.contains("bg-1")) {
//         bgColor = "white";
//         textColor = "black";
//       } else if (background.classList.contains("bg-2")) {
//         bgColor = "hsl(252, 30%, 20%)";
//         textColor = "white";
//       } else if (background.classList.contains("bg-2")) {
//         bgColor = "hsl(252, 30%, 10%)";
//         textColor = "white";
//       }
//     });
//   });
