const transactionForm = document.getElementById('transaction-form');
const list = document.getElementById('transactions-list');
const totalBudget = document.getElementById('total-budget');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}