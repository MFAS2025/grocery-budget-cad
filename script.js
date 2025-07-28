let budget = 0;
let remaining = 0;

const itemList = document.getElementById('itemList');
const budgetDisplay = document.getElementById('budget');
const remainingDisplay = document.getElementById('remaining');

function updateDisplay() {
  budgetDisplay.textContent = formatCurrency(budget);
  remainingDisplay.textContent = formatCurrency(remaining);
}

function formatCurrency(amount) {
  return amount.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD"
  });
}

function addItem() {
  const name = document.getElementById('itemName').value;
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (name && !isNaN(price) && price >= 0) {
    const li = document.createElement('li');
    li.textContent = `${name} - ${formatCurrency(price)}`;
    itemList.appendChild(li);
    remaining -= price;
    updateDisplay();
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
  }
}

function exportData() {
  const items = Array.from(itemList.children).map(li => li.textContent);
  const blob = new Blob([items.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grocery-list.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  itemList.innerHTML = '';
  budget = 0;
  remaining = 0;
  updateDisplay();
}

function editBudget() {
  const newBudget = parseFloat(prompt("Enter new budget in CAD:"));

  if (!isNaN(newBudget) && newBudget >= 0) {
    const spent = getTotalSpent();
    if (newBudget < spent) {
      alert(`You already spent ${formatCurrency(spent)}. Budget must be at least this amount.`);
      return;
    }
    budget = newBudget;
    remaining = budget - spent;
    updateDisplay();
  } else {
    alert("Invalid budget input.");
  }
}

function getTotalSpent() {
  let spent = 0;
  Array.from(itemList.children).forEach(li => {
    const text = li.textContent;
    const match = text.match(/\$([\d,]+(?:\.\d{1,2})?)/); // match $10 or $10.50
    if (match) {
      spent += parseFloat(match[1].replace(/,/g, ''));
    }
  });
  return spent;
}


// Initial budget prompt on load
budget = parseFloat(prompt("Enter your budget in CAD:"));
if (!isNaN(budget) && budget >= 0) {
  remaining = budget;
  updateDisplay();
} else {
  alert("Invalid budget. Setting to $0.");
  budget = 0;
  remaining = 0;
  updateDisplay();
}
