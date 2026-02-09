const express = require("express");
const router = express.Router();
const { Budget } = require("../models");
const auth = require("../middleware/auth");

router.use(auth);

// Get budgets for a user and month
router.get("/", async (req, res) => {
  try {
    const { month } = req.query; // Format: YYYY-MM
    const budgets = await Budget.find({ month, user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create budget limit
router.post("/", async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    if (!category || limit === undefined || !month) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const budget = new Budget({
      user: req.user.id,
      category,
      limit,
      month,
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update budget limit
router.put("/:id", async (req, res) => {
  try {
    const { limit } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { limit },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete budget
router.delete("/:id", async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
