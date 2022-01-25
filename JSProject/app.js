const ListInput = document.querySelector(".list-input");
const ListButton = document.querySelector(".list-button");
const GroceryList = document.querySelector(".grocery-list");
const FilterOption = document.querySelector(".filter-items");
const ClearButton = document.querySelector(".clear");

document.addEventListener("DOMContentLoaded", getItems);
ListButton.addEventListener("click", addItem);
GroceryList.addEventListener("click", CheckDelete);
FilterOption.addEventListener("click", filterItem);
ClearButton.addEventListener("click", clearAll);

function addItem(event) {
  event.preventDefault();
  let input = ListInput.value.trim();
  if (input == null || input == "") {
    Swal.fire({
      icon: "error",
      title: "Add an Item",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ff6f47",
    });
    ListInput.value = "";
  } else {
    const ListDiv = document.createElement("div");
    ListDiv.classList.add("list_item");
    ListDiv.classList.add("soft");

    const ListItem = document.createElement("li");
    ListItem.innerText = input;
    ListItem.classList.add("item");
    ListDiv.appendChild(ListItem);
    saveLocalList(input);

    const CheckButton = document.createElement("button");
    CheckButton.innerHTML = '<i class="fas fa-check-square"></i>';
    CheckButton.classList.add("check-btn");
    ListDiv.appendChild(CheckButton);

    const TrashButton = document.createElement("button");
    TrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    TrashButton.classList.add("trash-btn");
    ListDiv.appendChild(TrashButton);

    GroceryList.appendChild(ListDiv);
    Swal.fire({
      icon: "success",
      title: "Item Added",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ff6f47",
    });
    ListInput.value = "";
  }
}

function filterItem(e) {
  const items = GroceryList.childNodes;
  items.forEach(function (list_item) {
    switch (e.target.value) {
      case "all":
        list_item.style.display = "flex";
        break;
      case "completed":
        if (list_item.classList.contains("completed")) {
          list_item.style.display = "flex";
        } else {
          list_item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!list_item.classList.contains("completed")) {
          list_item.style.display = "flex";
        } else {
          list_item.style.display = "none";
        }
    }
  });
}

function saveLocalList(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}

function getItems() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  items.forEach(function (item) {
    const ListDiv = document.createElement("div");
    ListDiv.classList.add("list_item");
    ListDiv.classList.add("soft");

    const ListItem = document.createElement("li");
    ListItem.innerText = item;
    ListItem.classList.add("item");
    ListDiv.appendChild(ListItem);

    const CheckButton = document.createElement("button");
    CheckButton.innerHTML = '<i class="fas fa-check-square"></i>';
    CheckButton.classList.add("check-btn");
    ListDiv.appendChild(CheckButton);

    const TrashButton = document.createElement("button");
    TrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    TrashButton.classList.add("trash-btn");
    ListDiv.appendChild(TrashButton);

    GroceryList.appendChild(ListDiv);
  });
  Swal.fire({
    icon: "success",
    title: "List Restored",
    confirmButtonText: "Confirm",
    confirmButtonColor: "#ff6f47",
  });
}

function clearAll() {
  let items = [];
  localStorage.setItem("items", JSON.stringify(items));
  Swal.fire({
    icon: "success",
    title: "All Items Cleared",
    confirmButtonText: "Confirm",
    confirmButtonColor: "#ff6f47",
  });
  GroceryList.innerHTML = "";
}

function CheckDelete(event) {
  console.log(event.target);
  const item = event.target;
  if (item.classList[0] == "trash-btn") {
    const removeItem = item.parentElement;
    removeItem.classList.add("swipe");
    removeLocalItems(removeItem);
    removeItem.addEventListener("transitionend", function () {
      removeItem.remove();
    });
  }
  if (item.classList[0] == "check-btn") {
    const check = item.parentElement;
    check.classList.toggle("completed");
  }
}

function removeLocalItems(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  const itemIndex = item.children[0].innerText;
  items.splice(items.indexOf(itemIndex), 1);
  localStorage.setItem("items", JSON.stringify(items));
}
