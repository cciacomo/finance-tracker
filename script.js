// per lavorare con localStorage e gli oggetti devo
// usare JSON.stringify perché localStorage
// conserva solo stringhe, dopo posso usare JSON.parse

let recentExp = {};

const Home = () => {
  document.getElementById("menu-button").classList.add("onscreen");
  document.getElementById("menu").classList.add("remove");
  showBalance();

  //dati
  document.getElementById("balance-num").textContent =
    "€ " + localStorage.getItem("money");
  document.getElementById("goalNum").textContent =
    "€ " + localStorage.getItem("goal");
  document.getElementById("rimanente").textContent =
    "€ " +
    (Number(localStorage.getItem("goal")) -
      Number(localStorage.getItem("goalProgress")));
  document.getElementById("saved").textContent =
    "€ " + localStorage.getItem("goalProgress");
  if (
    Number(localStorage.getItem("goal")) <
    Number(localStorage.getItem("goalProgress"))
  ) {
    document.getElementById("rimanente").textContent = "€ 0";
    document.getElementById("percentage").textContent = "100%";
    document.getElementById("circle").style.strokeDashoffset = 0;
  } else {
    document.getElementById("percentage").textContent =
      Math.round(
        (Number(localStorage.getItem("goalProgress")) /
          Number(localStorage.getItem("goal"))) *
          100
      ) + " %";
    document.getElementById("circle").style.strokeDashoffset =
      550 -
      550 *
        (Number(localStorage.getItem("goalProgress")) /
          Number(localStorage.getItem("goal")));
  }
  const data = JSON.parse(localStorage.getItem("recExp"));
  const obj = Object.keys(JSON.parse(localStorage.getItem("recExp")));
  let keys = 0;
  if (Object.keys(JSON.parse(localStorage.getItem("recExp"))).length > 3) {
    keys = 3;
  } else {
    keys = Object.keys(JSON.parse(localStorage.getItem("recExp"))).length;
  }
  for (let i = 1; i <= keys; i++) {
    let str = "desc" + String(i);
    let num = "expense" + String(i);
    let id = obj[obj.length - i];
    document.getElementById(str).textContent = id;
    if (Number(data[id]) >= 0) {
      document
        .getElementById(num)
        .classList.remove(...document.getElementById(num).classList);
      document.getElementById(num).classList.add("higher");
    } else {
      document
        .getElementById(num)
        .classList.remove(...document.getElementById(num).classList);
      document.getElementById(num).classList.add("lower");
    }
    document.getElementById(num).textContent = data[id];
  }
};

const updateBalance = (amount, type) => {
  let multiplier = 0;
  let money = Number(localStorage.getItem("money"));
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
  localStorage.setItem("money", money);
  document.getElementById("balance-num").textContent =
    "€ " + localStorage.getItem("money");
  if (type == 2) {
    multiplier = -1;
  } else {
    multiplier = 1;
  }
  let recExp = JSON.parse(localStorage.getItem("recExp"));
  recExp[document.getElementById("description").value] = String(
    Number(document.getElementById("amount").value * multiplier)
  );
  localStorage.setItem("recExp", JSON.stringify(recExp));
  const data = JSON.parse(localStorage.getItem("recExp"));
  const obj = Object.keys(JSON.parse(localStorage.getItem("recExp")));
  let keys = 0;
  if (Object.keys(JSON.parse(localStorage.getItem("recExp"))).length > 3) {
    keys = 3;
  } else {
    keys = Object.keys(JSON.parse(localStorage.getItem("recExp"))).length;
  }
  for (let i = 1; i <= keys; i++) {
    let str = "desc" + String(i);
    let num = "expense" + String(i);
    let id = obj[obj.length - i];
    document.getElementById(str).textContent = id;
    if (Number(data[id]) >= 0) {
      document
        .getElementById(num)
        .classList.remove(...document.getElementById(num).classList);
      document.getElementById(num).classList.add("higher");
    } else {
      document
        .getElementById(num)
        .classList.remove(...document.getElementById(num).classList);
      document.getElementById(num).classList.add("lower");
    }
    document.getElementById(num).textContent = data[id];
  }
};

const plusBttn = () => {
  document.getElementById("display").classList.add("blur");
  document.getElementById("add-rem").classList.remove("remove");
  document.getElementById("add").classList.remove("remove");
  document.getElementById("remove").classList.add("remove");
};

const minusBttn = () => {
  document.getElementById("display").classList.add("blur");
  document.getElementById("add-rem").classList.remove("remove");
  document.getElementById("add").classList.add("remove");
  document.getElementById("remove").classList.remove("remove");
};

const updateMoney = (type) => {
  updateBalance(Number(document.getElementById("amount").value), type);
  document.getElementById("add-rem").classList.add("remove");
  document.getElementById("display").classList.remove("blur");
};

const menuInteraction = () => {
  if (document.getElementById("display").classList.contains("blur")) {
    document.getElementById("display").classList.remove("blur");
    document.getElementById("menu").classList.remove("onscreen");
    document.getElementById("menu").classList.add("remove");
    document.getElementById("menu-button").classList.add("onscreen");
    document.getElementById("menu-button").classList.remove("remove");
  } else {
    document.getElementById("display").classList.add("blur");
    document.getElementById("menu").classList.remove("remove");
    document.getElementById("menu").classList.add("onscreen");
    document.getElementById("menu-button").classList.add("remove");
    document.getElementById("menu-button").classList.remove("onscreen");
  }
};

const showBalance = () => {
  if (document.getElementById("balance-num").classList.contains("blur")) {
    document.getElementById("balance-num").classList.remove("blur");
  } else {
    document.getElementById("balance-num").classList.add("blur");
  }
};

//registrazione

const signUp = () => {
  if (
    document.getElementById("username").value == "" ||
    document.getElementById("e-mail").value == "" ||
    document.getElementById("pin").value == ""
  ) {
    console.error("ERROR");
  } else {
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("e-mail", document.getElementById("e-mail").value);
    localStorage.setItem("pin", document.getElementById("pin").value);
    window.open("index.html");
    localStorage.setItem("money", 0);
    localStorage.setItem("goal", 0);
    localStorage.setItem("goalProgress", 0);
    localStorage.setItem("recExp", JSON.stringify(recentExp));
  }
};

//login

const entra = () => {
  if (
    document.getElementById("e-mail").value == "" ||
    document.getElementById("pin").value == ""
  ) {
    console.error("ERROR");
  } else if (
    document.getElementById("e-mail").value == localStorage.getItem("e-mail") &&
    document.getElementById("pin").value == localStorage.getItem("pin")
  ) {
    window.open("home.html");
  } else {
    console.error("input not right");
  }
};

//account

const accountPage = () => {
  document.getElementById("account-name").textContent =
    localStorage.getItem("username");
  document.getElementById("e-mail").textContent =
    localStorage.getItem("e-mail");
};

const goalPopUp = () => {
  document.getElementById("display").classList.add("blur");
  document.getElementById("objective").classList.remove("remove");
};

const setGoal = () => {
  goal = document.getElementById("goal").value;
  document.getElementById("display").classList.remove("blur");
  document.getElementById("objective").classList.add("remove");
  document.getElementById("goalNum").textContent = "€ " + goal;
  localStorage.setItem("goal", goal);
  localStorage.setItem("goalProgress", 0);
  document.getElementById("rimanente").textContent =
    "€ " + localStorage.getItem("goal");
  document.getElementById("percentage").textContent = "0 %";
  document.getElementById("saved").textContent = "€ 0";
  document.getElementById("circle").style.strokeDashoffset = 550;
};

const modifyGoalPopUp = () => {
  document.getElementById("display").classList.add("blur");
  document.getElementById("modify").classList.remove("remove");
};

const modify = () => {
  let add = Number(document.getElementById("aggiunta").value);
  let temp = Number(localStorage.getItem("goalProgress")) + add;
  localStorage.setItem("goalProgress", temp);
  if (Number(localStorage.getItem("goalProgress")) < 0) {
    localStorage.setItem("goalProgress", 0);
  }
  document.getElementById("saved").textContent =
    "€ " + localStorage.getItem("goalProgress");
  document.getElementById("rimanente").textContent =
    "€ " +
    (Number(localStorage.getItem("goal")) -
      Number(localStorage.getItem("goalProgress")));
  document.getElementById("display").classList.remove("blur");
  document.getElementById("modify").classList.add("remove");
  if (
    Number(localStorage.getItem("goal")) <
    Number(localStorage.getItem("goalProgress"))
  ) {
    document.getElementById("rimanente").textContent = "€ 0";
    document.getElementById("percentage").textContent = "100%";
    document.getElementById("circle").style.strokeDashoffset = 0;
  } else {
    document.getElementById("percentage").textContent =
      Math.round(
        (Number(localStorage.getItem("goalProgress")) /
          Number(localStorage.getItem("goal"))) *
          100
      ) + " %";
    document.getElementById("circle").style.strokeDashoffset =
      550 -
      550 *
        (Number(localStorage.getItem("goalProgress")) /
          Number(localStorage.getItem("goal")));
  }
};

const changePin = () => {
  localStorage.setItem("pin", document.getElementById("pin").value);
  window.open("home.html");
};
