const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Models
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  month: {
    type: String, // Format: "2026-01"
    required: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Categories (aligned with frontend + user request)
const EXPENSE_CATEGORIES = [
  'food', 'rent', 'subscriptions', 'fitness', 'clothes', 'skin care/makeup', 'skin care/make up', 'coffee', 'other'
];
const INCOME_CATEGORIES = ['salary', 'freelance', 'investment', 'bonus', 'other'];

// API Routes

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transactions by month
app.get('/api/transactions/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const transactions = await Transaction.find({ month }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get summary by category for a month
app.get('/api/summary/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const transactions = await Transaction.find({ month });
    
    const summary = {
      income: 0,
      expenses: {},
      total: 0
    };

    transactions.forEach(t => {
      if (t.type === 'income') {
        summary.income += t.amount;
      } else {
        summary.expenses[t.category] = (summary.expenses[t.category] || 0) + t.amount;
      }
    });

    summary.total = summary.income - Object.values(summary.expenses).reduce((a, b) => a + b, 0);
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get distinct months available
app.get('/api/months', async (req, res) => {
  try {
    const months = await Transaction.distinct('month');
    const sorted = months.sort((a, b) => b.localeCompare(a));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get supported categories
app.get('/api/categories', (req, res) => {
  res.json({ expenses: EXPENSE_CATEGORIES, income: INCOME_CATEGORIES });
});

// Add transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;
    
    if (!type || !category || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transactionDate = new Date(date || Date.now());
    const month = transactionDate.toISOString().slice(0, 7); // YYYY-MM format

    const transaction = new Transaction({
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: transactionDate,
      month
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction
app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, description, date } = req.body;

    const transactionDate = new Date(date || Date.now());
    const month = transactionDate.toISOString().slice(0, 7);

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        type,
        category,
        amount: parseFloat(amount),
        description,
        date: transactionDate,
        month
      },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
