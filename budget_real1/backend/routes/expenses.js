const express = require("express");
const router = express.Router();
const { Expense } = require("../models");

// Get all expenses for a user
router.get("/", async (req, res) => {
  try {
    // For now, get all expenses. In production, filter by user
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expenses by category
router.get("/category/:category", async (req, res) => {
  try {
    const expenses = await Expense.find({ category: req.params.category });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expenses by date range
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const expenses = await Expense.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new expense
router.post("/", async (req, res) => {
  try {
    const { amount, category, description, date, user } = req.body;

    // Validate required fields
    if (!amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // For demo purposes, use a default user ID if not provided
    const userId = user || "demo_user_id";

    const expense = new Expense({
      user: userId,
      amount,
      category,
      description,
      date: new Date(date),
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update expense
router.put("/:id", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, description, date },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get summary statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);

    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyTotal = await Expense.aggregate([
      {
        $match: {
          date: { $gte: currentMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const byCategory = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({
      totalSpent: total[0]?.total || 0,
      monthlySpent: monthlyTotal[0]?.total || 0,
      byCategory,
      expenseCount: await Expense.countDocuments(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
