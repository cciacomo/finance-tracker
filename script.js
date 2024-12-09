const display = document.getElementById("display");
let menuButton = document.getElementById("menu-button");
let removeMenu = document.getElementById("menu");
let pin = document.getElementById("pin");
let balance = document.getElementById("balance-num");

let add = document.getElementById("+");
let rem = document.getElementById("-");

let money = 0;
const type = {
  ADD: 1,
  REMOVE: 2,
};

const updateBalance = (amount, type) => {
  console.log(typeof amount);
  if (type == 1) {
    money += amount;
  } else if (type == 2) {
    money -= amount;
  } else {
    console.log("Error");
  }
  if (money < 0) {
    money = 0;
  }
  money = Math.round(money * 100) / 100;
  balance.textContent = "€ " + money;
};

updateBalance();

function fetchJSONData() {
  fetch("./data.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Unable to fetch data:", error));
}

fetchJSONData();

const onLoad = () => {
  menuButton.classList.add("onscreen");
  removeMenu.classList.add("remove");
  showBalance();
};
window.onload = onLoad;

const plusBttn = () => {
  display.classList.add("blur");
  document.getElementById("add-rem").classList.remove("remove");
  document.getElementById("add").classList.remove("remove");
  document.getElementById("remove").classList.add("remove");
};

const minusBttn = () => {
  display.classList.add("blur");
  document.getElementById("add-rem").classList.remove("remove");
  document.getElementById("add").classList.add("remove");
  document.getElementById("remove").classList.remove("remove");
};

const updateMoney = (type) => {
  if (document.getElementById("amount").textContent != null) {
    updateBalance(Number(document.getElementById("amount").value), type);
  } else {
    console.log("ERROR");
  }
  document.getElementById("add-rem").classList.add("remove");
  display.classList.remove("blur");
};

const menuInteraction = () => {
  if (display.classList.contains("blur")) {
    display.classList.remove("blur");
    removeMenu.classList.remove("onscreen");
    removeMenu.classList.add("remove");
    menuButton.classList.add("onscreen");
    menuButton.classList.remove("remove");
  } else {
    display.classList.add("blur");
    removeMenu.classList.remove("remove");
    removeMenu.classList.add("onscreen");
    menuButton.classList.add("remove");
    menuButton.classList.remove("onscreen");
  }
};

const showBalance = () => {
  if (balance.classList.contains("blur")) {
    balance.classList.remove("blur");
  } else {
    balance.classList.add("blur");
  }
};

balance.onclick = showBalance;

function Enter() {
  if (pin.value == "0000") {
    window.open("home.html", "_self");
  }
}
