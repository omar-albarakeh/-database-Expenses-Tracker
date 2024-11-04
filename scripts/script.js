const transactionForm = document.getElementById('transaction-form');
const list = document.getElementById('transactions-list');
const totalBudget = document.getElementById('total-budget');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateBudget() {
   let total = 0;

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];

        if (transaction.type === 'income') {
            total += transaction.amount;
        } else if (transaction.type === 'expense') {
            total -= transaction.amount;
        }
    }

    totalBudget.innerText = total.toFixed(2);
    totalBudget.classList.remove('positive', 'negative', 'neutral');
    if (total > 0) {
        totalBudget.classList.add('positive');
    } else if (total < 0) {
        totalBudget.classList.add('negative');
    } else {
        totalBudget.classList.add('neutral');
    }
}
function displayTransactions(filteredTransactions = transactions) {
    list.innerHTML = '';
    filteredTransactions.forEach((transaction, index) => {
        const transactionDiv = document.createElement('div');
        transactionDiv.innerHTML = `
            <p>${transaction.date}</p>
            <p>${transaction.notes}</p>
            <p>$${transaction.amount} </p>
            <p>${transaction.type})</p>
            <button class="edit-button" onclick="editTransaction(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTransaction(${index})">Delete</button> `;
        list.appendChild(transactionDiv);
    });
    updateBudget();
}

function addTransaction(e) {
    e.preventDefault();
    const notes = document.getElementById('notes').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = new Date().toISOString().split('T')[0];

    if (!isNaN(amount) && notes.trim() !== '') {
        transactions.push({ date, notes, amount, type });
        updateLocalStorage();
        displayTransactions();
        transactionForm.reset();
    }
}
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    displayTransactions();
}

function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById('notes').value = transaction.notes;
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('type').value = transaction.type;
    deleteTransaction(index);
}
transactionForm.addEventListener('submit', addTransaction);