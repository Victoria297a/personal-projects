const express = require("express");
const router = express.Router();
const { Expense } = require("../models");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.use(auth);

// Get all expenses for a user
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expenses by category
router.get("/category/:category", async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
      category: req.params.category,
    });
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
      user: req.user.id,
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
    const { amount, category, description, date } = req.body;

    // Validate required fields
    if (!amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const expense = new Expense({
      user: req.user.id,
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
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
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
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

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
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
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
          user: new mongoose.Types.ObjectId(req.user.id),
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
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
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
      expenseCount: await Expense.countDocuments({ user: req.user.id }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
