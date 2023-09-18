let namee = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("number");
let div = document.getElementById("contacts");
let array = [];

if (localStorage.getItem("contact")) {
  array = JSON.parse(localStorage.getItem("contact"));
}

getdata();

function save() {
  if (namee.value !== "") {
    add(namee.value && phone.value && email.value);
    namee.value = "";
    email.value = "";
    phone.value = "";
  } 
  else {
    alert("Enter name");
  }
}

div.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deletewith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }})

function add() {
  const contact = {
    id: Date.now(),
    namee: namee.value,
    email: email.value,
    phone: phone.value,
  };
  array.push(contact);
  addelement(array);
  addDatalocal(array);
}
function addelement(array) {
  div.innerHTML = "";
  array.forEach((contact) => {
    let divv = document.createElement("div");
    let br = document.createElement("br");

    let nameee = document.createElement("td");
    let email = document.createElement("td");
    let phone = document.createElement("td");

    divv.setAttribute("data-id", contact.id);
    nameee.setAttribute("name", contact.namee)

    nameee.appendChild(document.createTextNode(contact.namee));
    phone.appendChild(document.createTextNode(contact.phone));
    email.appendChild(document.createTextNode(contact.email));

    let deletee_b = document.createElement("td");
    deletee_b.className = "del";
    deletee_b.appendChild(document.createTextNode("Delete"));

    let update_b = document.createElement("td");
    update_b.className = "upd";
    update_b.appendChild(document.createTextNode("Update"));

    divv.appendChild(nameee);
    divv.appendChild(phone);
    divv.appendChild(email);
    divv.appendChild(deletee_b);
    divv.appendChild(update_b);
    div.appendChild(divv);
    div.appendChild(br);
  });
}

function addDatalocal(array) {
  window.localStorage.setItem("contact", JSON.stringify(array));
}

function getdata() {
  let data = window.localStorage.getItem("contact");
  if (data) {
    let contact = JSON.parse(data);
    addelement(contact);
  }
}

function deletewith(contactid) {
  array = array.filter((contact) => contact.id != contactid);
  addDatalocal(array);
}
