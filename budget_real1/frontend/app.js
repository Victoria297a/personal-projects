// API Base URL
const API_URL = "http://localhost:5001/api";
const TOKEN_KEY = "auth_token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Category icons and colors
const categoryConfig = {
  Groceries: { icon: "🛒", color: "#8b5cf6" },
  Restaurants: { icon: "🍽️", color: "#ec4899" },
  Travel: { icon: "✈️", color: "#06b6d4" },
  Rent: { icon: "🏠", color: "#f97316" },
  Car: { icon: "🚗", color: "#6366f1" },
  Activities: { icon: "🎮", color: "#14b8a6" },
  Gym: { icon: "💪", color: "#65a30d" },
  Coffee: { icon: "☕", color: "#b45309" },
  Subscription: { icon: "📺", color: "#7c3aed" },
};

let expenses = [];
let chart = null;

// Auth guard: redirect to login if not authenticated
if (!getToken()) {
  window.location.href = "login.html";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing app");
  
  // Set today's date as default
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }
  
  // Event Listeners
  const expenseForm = document.getElementById("expense-form");
  if (expenseForm) {
    expenseForm.addEventListener("submit", addExpense);
    console.log("Expense form listener attached");
  } else {
    console.error("expense-form not found!");
  }
  
  const filterCategory = document.getElementById("filter-category");
  if (filterCategory) {
    filterCategory.addEventListener("change", filterExpenses);
  }
  
  const filterMonth = document.getElementById("filter-month");
  if (filterMonth) {
    filterMonth.addEventListener("change", filterExpenses);
  }
  
  const clearFiltersBtn = document.getElementById("clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
  }
  
  loadExpenses();
});

// Add Expense
async function addExpense(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  console.log("Adding expense:", { amount, category, description, date });

  if (!amount || !category || !date) {
    alert("Please fill in all required fields");
    return;
  }

  const newExpense = {
    amount,
    category,
    description,
    date,
  };

  try {
    const token = getToken();
    console.log("Token present:", !!token);

    if (token) {
      console.log("Sending to API:", `${API_URL}/expenses`);
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(newExpense),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to save to API");
      }

      const saved = await response.json();
      console.log("Expense saved:", saved);
      expenses.push(saved);
    } else {
      // Fallback to local storage when not logged in
      newExpense.id = Date.now();
      expenses.push(newExpense);
    }

    // Reset form
    document.getElementById("expense-form").reset();
    document.getElementById("date").valueAsDate = new Date();

    // Refresh UI
    updateUI();
    console.log("UI updated, total expenses:", expenses.length);
  } catch (error) {
    console.error("Error adding expense:", error);
    alert("Failed to add expense: " + error.message);
  }
}

// Load Expenses
async function loadExpenses() {
  try {
    const token = getToken();
    console.log("Loading expenses, token present:", !!token);

    if (token) {
      console.log("Fetching from API:", `${API_URL}/expenses`);
      const response = await fetch(`${API_URL}/expenses`, {
        headers: { ...getAuthHeaders() },
      });

      console.log("Load response status:", response.status);

      if (response.ok) {
        expenses = await response.json();
        console.log("Expenses loaded from API:", expenses.length);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to load expenses:", errorData);
        expenses = [];
      }
    } else {
      const stored = localStorage.getItem("expenses");
      expenses = stored ? JSON.parse(stored) : [];
      console.log("Expenses loaded from localStorage:", expenses.length);
    }

    updateUI();
  } catch (error) {
    console.error("Error loading expenses:", error);
    expenses = [];
    updateUI();
  }
}

// Update UI
function updateUI() {
  console.log("updateUI called with", expenses.length, "expenses");
  if (!getToken()) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  updateStats();
  updateChart();
  updateCategoryBreakdown();
  renderExpenses();
}

// Update Stats
function updateStats() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth));
  const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  document.getElementById("total-spent").textContent = `$${total.toFixed(2)}`;
  document.getElementById("month-spent").textContent = `$${monthTotal.toFixed(2)}`;
  document.getElementById("expense-count").textContent = expenses.length;
}

// Update Chart
function updateChart() {
  const categoryTotals = {};
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const colors = labels.map((cat) => categoryConfig[cat]?.color || "#gray");

  const ctx = document.getElementById("spending-chart");

  if (chart) {
    chart.destroy();
  }

  if (labels.length === 0) {
    ctx.style.display = "none";
    return;
  }

  ctx.style.display = "block";
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            font: { size: 13, weight: 500 },
            usePointStyle: true,
          },
        },
      },
    },
  });
}

// Update Category Breakdown
function updateCategoryBreakdown() {
  const categoryTotals = {};
  const categoryCounts = {};
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  });

  const list = document.getElementById("categories-list");
  list.innerHTML = "";

  if (Object.keys(categoryTotals).length === 0) {
    list.innerHTML =
      '<div class="empty-state"><p>No expenses yet. Add one to get started!</p></div>';
    return;
  }

  Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, amount]) => {
      const percentage = ((amount / total) * 100).toFixed(1);
      const count = categoryCounts[category];
      const color = categoryConfig[category]?.color || "#gray";

      const item = document.createElement("div");
      item.className = "category-item";
      item.innerHTML = `
        <div class="category-name">
          <div class="category-color" style="background-color: ${color}"></div>
          <div class="category-info">
            <div class="cat-title">${category}</div>
            <div class="cat-percentage">${percentage}% of total</div>
          </div>
        </div>
        <div class="category-amount">
          <div class="cat-value">$${amount.toFixed(2)}</div>
          <div class="cat-count">${count} ${count === 1 ? "expense" : "expenses"}</div>
        </div>
      `;
      list.appendChild(item);
    });
}

// Filter Expenses
function filterExpenses() {
  const selectedCategory = document.getElementById("filter-category").value;
  const selectedMonth = document.getElementById("filter-month").value;

  const filtered = expenses.filter((e) => {
    const categoryMatch = !selectedCategory || e.category === selectedCategory;
    const monthMatch = !selectedMonth || e.date.startsWith(selectedMonth);
    return categoryMatch && monthMatch;
  });

  renderExpenses(filtered);
}

// Clear Filters
function clearFilters() {
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-month").value = "";
  renderExpenses();
}

// Render Expenses
function renderExpenses(items = expenses) {
  console.log("Rendering expenses, count:", items.length);
  const container = document.getElementById("expenses-container");
  
  if (!container) {
    console.error("expenses-container element not found!");
    return;
  }
  
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML =
      '<div class="empty-state"><h3>No expenses found</h3><p>Your expenses will appear here</p></div>';
    return;
  }

  // Sort by date descending
  const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach((expense) => {
    const icon = categoryConfig[expense.category]?.icon || "💰";
    const expenseId = expense._id || expense.id;
    const date = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const item = document.createElement("div");
    item.className = "expense-item";
    item.setAttribute("data-category", expense.category);
    item.innerHTML = `
      <div class="expense-icon">${icon}</div>
      <div class="expense-details">
        <h4>${expense.category}</h4>
        <p>${expense.description || "No description"}</p>
      </div>
      <div class="expense-amount">
        <div class="expense-value">-$${expense.amount.toFixed(2)}</div>
        <div class="expense-date">${date}</div>
      </div>
      <div class="expense-actions">
        <button class="btn-delete" onclick="deleteExpense('${expenseId}')">Delete</button>
      </div>
    `;
    container.appendChild(item);
  });
  
  console.log("Rendered", sorted.length, "expense items");
}

// Delete Expense
function deleteExpense(id) {
  if (confirm("Are you sure you want to delete this expense?")) {
    const token = getToken();
    const match = expenses.find((e) => (e._id || e.id) === id);

    if (token && match?._id) {
      fetch(`${API_URL}/expenses/${match._id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      })
        .then(() => {
          expenses = expenses.filter((e) => (e._id || e.id) !== id);
          updateUI();
        })
        .catch(() => {
          alert("Failed to delete expense");
        });
      return;
    }

    expenses = expenses.filter((e) => (e._id || e.id) !== id);
    updateUI();
  }
}
