
const API_URL = 'http://localhost:50001/api';

// State
let currentMonth = new Date().toISOString().slice(0, 7);
let transactions = [];
let allTransactions = [];
let groupedViewType = 'category'; // 'category' or 'month'
let editingTransactionId = null;
let availableMonths = [];
// Default categories
const EXPENSE_CATEGORIES = [
    'food',
    'rent',
    'subscriptions',
    'fitness',
    'clothes',
    'skin care/makeup',
    'coffee',
    'other'
];

const INCOME_CATEGORIES = [
    'salary',
    'freelance',
    'investment',
    'bonus',
    'other'
];

// (state duplicated previously — cleaned up)

// DOM Elements
const monthInput = document.getElementById('monthInput');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const transactionForm = document.getElementById('transactionForm');
const transactionTypeSelect = document.getElementById('transactionType');
const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const transactionsList = document.getElementById('transactionsList');
const categoryList = document.getElementById('categoryList');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');

const balanceEl = document.getElementById('balance');
const groupedTransactionsEl = document.getElementById('groupedTransactions');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const monthSelect = document.getElementById('monthSelect');
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    monthInput.value = currentMonth;
    loadAvailableMonths();
    loadTransactions();

    // Event listeners
    prevMonthBtn.addEventListener('click', previousMonth);
    nextMonthBtn.addEventListener('click', nextMonth);
    monthInput.addEventListener('change', onMonthChange);
    transactionForm.addEventListener('submit', addTransaction);
    transactionTypeSelect.addEventListener('change', updateCategories);

    // Set today's date as default
    dateInput.valueAsDate = new Date();

    // Load all transactions for grouped view
    loadAllTransactions();

    // Toggle buttons for grouped view
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            groupedViewType = e.target.dataset.view;
            renderGroupedTransactions();
        });
    });

    // Search & sort
    if (searchInput) searchInput.addEventListener('input', renderTransactions);
    if (sortSelect) sortSelect.addEventListener('change', renderTransactions);
    if (monthSelect) monthSelect.addEventListener('change', onMonthSelectChange);
});

function setCurrentDate() {
    const today = new Date();
    dateInput.valueAsDate = today;
}

function updateCategories() {
    const type = transactionTypeSelect.value;
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });
}

function previousMonth() {
    if (availableMonths.length > 0) {
        const idx = availableMonths.indexOf(currentMonth);
        if (idx > 0) {
            currentMonth = availableMonths[idx - 1];
        }
    } else {
        const date = new Date(currentMonth + '-01');
        date.setMonth(date.getMonth() - 1);
        currentMonth = date.toISOString().slice(0, 7);
    }
    monthInput.value = currentMonth;
    if (monthSelect) monthSelect.value = currentMonth;
    loadTransactions();
}

function nextMonth() {
    if (availableMonths.length > 0) {
        const idx = availableMonths.indexOf(currentMonth);
        if (idx !== -1 && idx < availableMonths.length - 1) {
            currentMonth = availableMonths[idx + 1];
        }
    } else {
        const date = new Date(currentMonth + '-01');
        date.setMonth(date.getMonth() + 1);
        currentMonth = date.toISOString().slice(0, 7);
    }
    monthInput.value = currentMonth;
    if (monthSelect) monthSelect.value = currentMonth;
    loadTransactions();
}

function onMonthChange(e) {
    currentMonth = e.target.value;
    if (monthSelect && availableMonths.includes(currentMonth)) {
        monthSelect.value = currentMonth;
    }
    loadTransactions();
}

function onMonthSelectChange(e) {
    currentMonth = e.target.value;
    monthInput.value = currentMonth;
    loadTransactions();
}

async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions/${currentMonth}`);
        transactions = await response.json();
        renderTransactions();
        updateSummary();
        updateCategoryBreakdown();
    } catch (error) {
        console.error('Error loading transactions:', error);
        showNotification('Error loading transactions', 'error');
    }
}

async function loadAvailableMonths() {
    try {
        const response = await fetch(`${API_URL}/months`);
        availableMonths = await response.json();
        populateMonthSelect();
        syncCurrentMonthWithAvailable();
    } catch (error) {
        console.error('Error loading months:', error);
    }
}

function populateMonthSelect() {
    if (!monthSelect) return;
    monthSelect.innerHTML = availableMonths.map(m => `
        <option value="${m}">${formatMonthYear(m)}</option>
    `).join('');
    if (availableMonths.length > 0) {
        monthSelect.value = currentMonth;
    }
}

function syncCurrentMonthWithAvailable() {
    if (availableMonths.length > 0 && !availableMonths.includes(currentMonth)) {
        currentMonth = availableMonths[0]; // API returns latest first
        monthInput.value = currentMonth;
        if (monthSelect) monthSelect.value = currentMonth;
    }
}

async function addTransaction(e) {
    e.preventDefault();

    if (!transactionTypeSelect.value || !categorySelect.value || !amountInput.value) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const payload = {
        type: transactionTypeSelect.value,
        category: categorySelect.value,
        amount: parseFloat(amountInput.value),
        description: descriptionInput.value,
        date: dateInput.value
    };

    try {
        let response;
        if (editingTransactionId) {
            response = await fetch(`${API_URL}/transactions/${editingTransactionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(`${API_URL}/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            showNotification(editingTransactionId ? 'Transaction updated!' : 'Transaction added successfully!', 'success');
            transactionForm.reset();
            setCurrentDate();
            editingTransactionId = null;
            loadTransactions();
        } else {
            showNotification('Error adding transaction', 'error');
        }
    } catch (error) {
        console.error('Error adding transaction:', error);
        showNotification('Error adding transaction', 'error');
    }
}

// Begin edit by pre-filling the form
window.startEditTransaction = function(id) {
    const t = transactions.find(x => x._id === id);
    if (!t) return;
    editingTransactionId = id;
    transactionTypeSelect.value = t.type;
    updateCategories();
    categorySelect.value = t.category;
    amountInput.value = t.amount;
    descriptionInput.value = t.description || '';
    dateInput.value = new Date(t.date).toISOString().slice(0,10);
    showNotification('Editing transaction…', 'info');
}

async function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        try {
            await fetch(`${API_URL}/transactions/${id}`, {
                method: 'DELETE'
            });
            showNotification('Transaction deleted', 'success');
            loadTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            showNotification('Error deleting transaction', 'error');
        }
    }
}

function renderTransactions() {
    let list = [...transactions];

    // Filter by search query
    const query = (searchInput && searchInput.value ? searchInput.value : '').toLowerCase();
    if (query) {
        list = list.filter(t =>
            (t.description || '').toLowerCase().includes(query) ||
            (t.category || '').toLowerCase().includes(query)
        );
    }

    // Sort
    const sort = sortSelect ? sortSelect.value : 'date_desc';
    switch (sort) {
        case 'date_asc':
            list.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount_desc':
            list.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount_asc':
            list.sort((a, b) => a.amount - b.amount);
            break;
        case 'type':
            list.sort((a, b) => a.type.localeCompare(b.type));
            break;
        default:
            list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (list.length === 0) {
        transactionsList.innerHTML = '<div class="empty-state"><p>No transactions yet. Add one to get started!</p></div>';
        return;
    }

    transactionsList.innerHTML = list.map(t => `
        <div class="transaction-item ${t.type}">
            <div class="transaction-info">
                <div class="transaction-category">${capitalizeFirst(t.category)}</div>
                ${t.description ? `<div class="transaction-description">${t.description}</div>` : ''}
                <div class="transaction-date">${formatDate(t.date)}</div>
            </div>
            <div class="transaction-amount ${t.type}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </div>
            <div class="transaction-actions">
                <button class="btn-edit" title="Edit" onclick="startEditTransaction('${t._id}')">✎</button>
                <button class="btn-delete" title="Delete" onclick="deleteTransaction('${t._id}')">×</button>
            </div>
        </div>
    `).join('');
}

function updateCategoryBreakdown() {
    const expenses = {};
    transactions.forEach(t => {
        if (t.type === 'expense') {
            expenses[t.category] = (expenses[t.category] || 0) + t.amount;
        }
    });

    if (Object.keys(expenses).length === 0) {
        categoryList.innerHTML = '<div class="empty-state"><p>No expenses yet</p></div>';
        return;
    }

    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    
    categoryList.innerHTML = Object.entries(expenses)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
            const percentage = (amount / totalExpenses) * 100;
            return `
                <div class="category-item">
                    <div>
                        <div class="category-name">${capitalizeFirst(category)}</div>
                        <div class="category-bar">
                            <div class="category-progress" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                    <div class="category-amount">${formatCurrency(amount)}</div>
                </div>
            `;
        })
        .join('');
}

function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    totalIncomeEl.textContent = formatCurrency(income);
    totalExpenseEl.textContent = formatCurrency(expenses);
    balanceEl.textContent = formatCurrency(balance);
    balanceEl.style.color = balance >= 0 ? '#2ecc71' : '#e74c3c';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function capitalizeFirst(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#4a90e2'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

async function loadAllTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        allTransactions = await response.json();
        renderGroupedTransactions();
    } catch (error) {
        console.error('Error loading all transactions:', error);
    }
}

function renderGroupedTransactions() {
    if (allTransactions.length === 0) {
        groupedTransactionsEl.innerHTML = '<div class="empty-state"><p>No transactions yet</p></div>';
        return;
    }

    if (groupedViewType === 'category') {
        renderByCategory();
    } else {
        renderByMonth();
    }
}

function renderByCategory() {
    const grouped = {};

    allTransactions.forEach(t => {
        const category = t.category;
        if (!grouped[category]) {
            grouped[category] = { income: [], expenses: [] };
        }
        if (t.type === 'income') {
            grouped[category].income.push(t);
        } else {
            grouped[category].expenses.push(t);
        }
    });

    const html = Object.entries(grouped)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([category, data]) => {
            const totalIncome = data.income.reduce((sum, t) => sum + t.amount, 0);
            const totalExpense = data.expenses.reduce((sum, t) => sum + t.amount, 0);

            return `
                <div class="group-section">
                    <div class="group-header">
                        <h3>${capitalizeFirst(category)}</h3>
                        <div class="group-totals">
                            ${totalIncome > 0 ? `<span class="income-total">+${formatCurrency(totalIncome)}</span>` : ''}
                            ${totalExpense > 0 ? `<span class="expense-total">-${formatCurrency(totalExpense)}</span>` : ''}
                        </div>
                    </div>
                    <div class="group-transactions">
                        ${data.income.map(t => `
                            <div class="grouped-item income">
                                <div class="grouped-item-info">
                                    <div class="grouped-month">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                    <div class="grouped-description">${t.description || 'Income'}</div>
                                </div>
                                <div class="grouped-amount income">+${formatCurrency(t.amount)}</div>
                            </div>
                        `).join('')}
                        ${data.expenses.map(t => `
                            <div class="grouped-item expense">
                                <div class="grouped-item-info">
                                    <div class="grouped-month">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                    <div class="grouped-description">${t.description || 'Expense'}</div>
                                </div>
                                <div class="grouped-amount expense">-${formatCurrency(t.amount)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        })
        .join('');

    groupedTransactionsEl.innerHTML = html;
}

function renderByMonth() {
    const grouped = {};

    allTransactions.forEach(t => {
        const month = t.month;
        if (!grouped[month]) {
            grouped[month] = {};
        }
        const category = t.category;
        if (!grouped[month][category]) {
            grouped[month][category] = { income: [], expenses: [] };
        }
        if (t.type === 'income') {
            grouped[month][category].income.push(t);
        } else {
            grouped[month][category].expenses.push(t);
        }
    });

    const html = Object.entries(grouped)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([month, categories]) => {
            let monthTotal = { income: 0, expenses: 0 };
            const monthHtml = Object.entries(categories)
                .map(([category, data]) => {
                    const totalIncome = data.income.reduce((sum, t) => sum + t.amount, 0);
                    const totalExpense = data.expenses.reduce((sum, t) => sum + t.amount, 0);
                    monthTotal.income += totalIncome;
                    monthTotal.expenses += totalExpense;

                    return `
                        <div class="category-group">
                            <div class="category-header">
                                <span>${capitalizeFirst(category)}</span>
                                <div class="category-totals">
                                    ${totalIncome > 0 ? `<span class="income-total">+${formatCurrency(totalIncome)}</span>` : ''}
                                    ${totalExpense > 0 ? `<span class="expense-total">-${formatCurrency(totalExpense)}</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                })
                .join('');

            return `
                <div class="month-section">
                    <div class="month-header">
                        <h3>${formatMonthYear(month)}</h3>
                        <div class="month-totals">
                            <span class="income-total">Income: +${formatCurrency(monthTotal.income)}</span>
                            <span class="expense-total">Expenses: -${formatCurrency(monthTotal.expenses)}</span>
                        </div>
                    </div>
                    <div class="categories-in-month">
                        ${monthHtml}
                    </div>
                </div>
            `;
        })
        .join('');

    groupedTransactionsEl.innerHTML = html;
}

function formatMonthYear(monthStr) {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatCurrency(value) {
    try {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(value);
    } catch (e) {
        return `€${Number(value || 0).toFixed(2)}`;
    }
}
