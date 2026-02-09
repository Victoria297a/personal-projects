/**
 * SAMPLE_DATA.js
 * 
 * This file contains sample MongoDB documents and queries for the Budget Tracker.
 * Use this file with: mongosh < SAMPLE_DATA.js
 * 
 * MongoDB Shell Script - Valid for mongosh/mongo shell
 */

// Use the budget_tracker database
use("budget_tracker");

// Clear existing data (optional)
// db.expenses.deleteMany({});
// db.users.deleteMany({});

// Sample User Document
const userId = new ObjectId();
db.users.insertOne({
  _id: userId,
  name: "Vicky",
  email: "vicky@example.com",
  password: "hashed_password_here",
  currency: "USD",
  monthlyBudget: 3000,
  createdAt: new Date(),
  updatedAt: new Date()
});

console.log("✅ User created with ID:", userId);

// Sample Expense Documents
const expenses = [
  {
    user: userId,
    amount: 67.89,
    category: "Groceries",
    description: "Weekly grocery shopping at Whole Foods",
    date: new Date("2026-02-09"),
    createdAt: new Date("2026-02-09T14:32:10Z"),
    updatedAt: new Date("2026-02-09T14:32:10Z")
  },
  {
    user: userId,
    amount: 45.50,
    category: "Restaurants",
    description: "Dinner at local Italian restaurant",
    date: new Date("2026-02-08"),
    createdAt: new Date("2026-02-08T19:45:30Z"),
    updatedAt: new Date("2026-02-08T19:45:30Z")
  },
  {
    user: userId,
    amount: 14.99,
    category: "Subscription",
    description: "Monthly streaming service",
    date: new Date("2026-02-01"),
    createdAt: new Date("2026-02-01T10:00:00Z"),
    updatedAt: new Date("2026-02-01T10:00:00Z")
  },
  {
    user: userId,
    amount: 1200.00,
    category: "Rent",
    description: "Monthly rent payment",
    date: new Date("2026-02-01"),
    createdAt: new Date("2026-02-01T08:00:00Z"),
    updatedAt: new Date("2026-02-01T08:00:00Z")
  },
  {
    user: userId,
    amount: 150.00,
    category: "Travel",
    description: "Uber ride to airport",
    date: new Date("2026-02-07"),
    createdAt: new Date("2026-02-07T15:20:45Z"),
    updatedAt: new Date("2026-02-07T15:20:45Z")
  },
  {
    user: userId,
    amount: 50.00,
    category: "Gym",
    description: "Monthly gym membership",
    date: new Date("2026-02-01"),
    createdAt: new Date("2026-02-01T09:15:00Z"),
    updatedAt: new Date("2026-02-01T09:15:00Z")
  },
  {
    user: userId,
    amount: 5.75,
    category: "Coffee",
    description: "Latte at local café",
    date: new Date("2026-02-09"),
    createdAt: new Date("2026-02-09T08:30:00Z"),
    updatedAt: new Date("2026-02-09T08:30:00Z")
  },
  {
    user: userId,
    amount: 120.00,
    category: "Car",
    description: "Oil change and tire rotation",
    date: new Date("2026-02-05"),
    createdAt: new Date("2026-02-05T16:45:20Z"),
    updatedAt: new Date("2026-02-05T16:45:20Z")
  },
  {
    user: userId,
    amount: 35.00,
    category: "Activities",
    description: "Movie tickets (2)",
    date: new Date("2026-02-06"),
    createdAt: new Date("2026-02-06T19:00:10Z"),
    updatedAt: new Date("2026-02-06T19:00:10Z")
  }
];

// Insert all expenses
const result = db.expenses.insertMany(expenses);
console.log("✅ Inserted", result.insertedIds.length, "expenses");




// ======================================
// USEFUL QUERIES
// ======================================

// Get all expenses
console.log("\n📊 All expenses:");
db.expenses.find().pretty();

// Get total spending
console.log("\n💰 Total spending:");
db.expenses.aggregate([
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }
]).pretty();

// Get spending by category
console.log("\n📈 Spending by category:");
db.expenses.aggregate([
  {
    $group: {
      _id: "$category",
      total: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } }
]).pretty();

// Get monthly totals
console.log("\n📅 Monthly totals:");
db.expenses.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
      total: { $sum: "$amount" },
      expenses: { $sum: 1 }
    }
  },
  { $sort: { _id: -1 } }
]).pretty();

// Get average by category
console.log("\n📊 Average expense per category:");
db.expenses.aggregate([
  {
    $group: {
      _id: "$category",
      average: { $avg: "$amount" }
    }
  }
]).pretty();

// Get expenses for February 2026
console.log("\n📅 February 2026 expenses:");
db.expenses.find({
  date: {
    $gte: new Date("2026-02-01"),
    $lt: new Date("2026-03-01")
  }
}).pretty();

// Get expenses by category
console.log("\n🛒 Groceries only:");
db.expenses.find({ category: "Groceries" }).pretty();

// Delete old expenses (older than 1 year) - EXAMPLE ONLY
// db.expenses.deleteMany({
//   date: {
//     $lt: new Date("2025-01-01")
//   }
// });

// Update an expense - EXAMPLE ONLY
// db.expenses.updateOne(
//   { _id: ObjectId("507f1f77bcf86cd799439011") },
//   { $set: { amount: 75.00, description: "Updated description" } }
// );

console.log("\n✅ Sample data loaded successfully!");
