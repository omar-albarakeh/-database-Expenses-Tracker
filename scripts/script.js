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

transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const notes = document.getElementById('notes').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = new Date().toLocaleDateString();

    if (!isNaN(amount) && notes.trim() !== '') {
        transactions.push({ date, notes, amount, type });
        updateLocalStorage();
        updateBudget();
        transactionForm.reset();
    }
});

displayTransactions();