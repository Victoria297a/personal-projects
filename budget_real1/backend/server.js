const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const expensesRouter = require("./routes/expenses");
const budgetsRouter = require("./routes/budgets");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/budget_tracker";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Budget Tracker API is running" });
});

// API Routes
app.use("/api/expenses", expensesRouter);
app.use("/api/budgets", budgetsRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Budget Tracker API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
