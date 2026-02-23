const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    totalDisplay.textContent = total;
}

function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="expense-info">
                <strong>${expense.title}</strong>
                ₹ ${expense.amount}
            </div>
            <div class="buttons">
                <button class="edit" onclick="editExpense(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;

        expenseList.appendChild(li);
    });

    updateTotal();
}

function editExpense(index) {
    titleInput.value = expenses[index].title;
    amountInput.value = expenses[index].amount;
    editIndex = index;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = amountInput.value.trim();

    if (editIndex !== null) {
        expenses[editIndex] = { title, amount };
        editIndex = null;
    } else {
        expenses.push({ title, amount });
    }

    saveToLocalStorage();
    renderExpenses();

    titleInput.value = "";
    amountInput.value = "";
});

renderExpenses();