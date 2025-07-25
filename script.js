let budget = 0;
let remaining = 0;
let items = [];

window.onload = () => {
  budget = parseFloat(prompt("Enter your total budget: ₱")) || 0;
  remaining = budget;
  document.getElementById("budget").innerText = budget.toLocaleString();
  document.getElementById("remaining").innerText = remaining.toLocaleString();
};

function addItem() {
  const name = document.getElementById("itemName").value;
  const price = parseFloat(document.getElementById("itemPrice").value);

  if (!name || isNaN(price)) return;

  const item = { name, price, quantity: 1 };
  items.push(item);
  updateList();
}

function updateList() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = "";
  let spent = 0;

  items.forEach((item, index) => {
    spent += item.price * item.quantity;
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₱${item.price.toLocaleString()} 
      <div class="qty-controls">
        <button onclick="changeQty(${index}, -1)">−</button>
        ${item.quantity}
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
    `;
    ul.appendChild(li);
  });

  remaining = budget - spent;
  document.getElementById("remaining").innerText = remaining.toLocaleString();
}

function changeQty(index, delta) {
  items[index].quantity += delta;
  if (items[index].quantity < 1) items[index].quantity = 1;
  updateList();
}

function exportData() {
  const data = items.map(item => `${item.name} x${item.quantity} - ₱${item.price * item.quantity}`).join("\n");
  alert("Export:\n" + data);
}

function clearAll() {
  items = [];
  updateList();
}
