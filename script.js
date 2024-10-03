var display = document.getElementById("display");
var menuButton = document.getElementById("menu-button");
var removeMenu = document.getElementById("menu");

const onLoad = () => {
  menuButton.classList.add("onscreen");
  removeMenu.classList.add("remove");
};
window.onload = onLoad;

const openMenu = () => {
  display.classList.add("blur");
  removeMenu.classList.remove("remove");
  removeMenu.classList.add("onscreen");
  menuButton.classList.add("remove");
  menuButton.classList.remove("onscreen");
};

const closeMenu = () => {
  display.classList.remove("blur");
  removeMenu.classList.remove("onscreen");
  removeMenu.classList.add("remove");
  menuButton.classList.add("onscreen");
  menuButton.classList.remove("remove");
};
