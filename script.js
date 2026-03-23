document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const addExpenseBtn = document.getElementById("addExpenseBtn");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  const expenseDateInput = document.getElementById("expense-date");
  const downloadBtn = document.getElementById("download-pdf");

  downloadBtn.addEventListener("click", generatePDF);

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();
  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    const date = expenseDateInput.value;

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: date,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
      // clear Input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
      expenseDateInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
  <div class="expense-top">
    <span>${expense.name}</span>
    <span>₹${expense.amount}</span>
  </div>
  <div class="expense-date">${expense.date}</div>
  <button data-id="${expense.id}">Delete</button>
`;

      expenseList.appendChild(li);
    });
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });

  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Expense Report", 20, 20);

    let y = 30;

    expenses.forEach((expense, index) => {
      const text =
        index +
        1 +
        ". " +
        expense.name +
        " - Rs " +
        expense.amount +
        " (" +
        (expense.date || "No Date") +
        ")";
      doc.text(text, 20, y);
      y += 10;
    });

    doc.text("Total: Rs " + totalAmount.toFixed(2), 20, y + 10);

    doc.save("expenses.pdf");
  }
});
