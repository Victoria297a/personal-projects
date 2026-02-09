// Sample Expense Documents for MongoDB

// Example 1: Grocery expense
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 67.89,
  "category": "Groceries",
  "description": "Weekly grocery shopping at Whole Foods",
  "date": ISODate("2026-02-09T00:00:00Z"),
  "createdAt": ISODate("2026-02-09T14:32:10.123Z"),
  "updatedAt": ISODate("2026-02-09T14:32:10.123Z")
}

// Example 2: Restaurant expense
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 45.50,
  "category": "Restaurants",
  "description": "Dinner at local Italian restaurant",
  "date": ISODate("2026-02-08T00:00:00Z"),
  "createdAt": ISODate("2026-02-08T19:45:30.456Z"),
  "updatedAt": ISODate("2026-02-08T19:45:30.456Z")
}

// Example 3: Subscription
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 14.99,
  "category": "Subscription",
  "description": "Monthly streaming service",
  "date": ISODate("2026-02-01T00:00:00Z"),
  "createdAt": ISODate("2026-02-01T10:00:00.789Z"),
  "updatedAt": ISODate("2026-02-01T10:00:00.789Z")
}

// Example 4: Rent
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 1200.00,
  "category": "Rent",
  "description": "Monthly rent payment",
  "date": ISODate("2026-02-01T00:00:00Z"),
  "createdAt": ISODate("2026-02-01T08:00:00.123Z"),
  "updatedAt": ISODate("2026-02-01T08:00:00.123Z")
}

// Example 5: Travel
{
  "_id": ObjectId("507f1f77bcf86cd799439015"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 150.00,
  "category": "Travel",
  "description": "Uber ride to airport",
  "date": ISODate("2026-02-07T00:00:00Z"),
  "createdAt": ISODate("2026-02-07T15:20:45.234Z"),
  "updatedAt": ISODate("2026-02-07T15:20:45.234Z")
}

// Example 6: Gym
{
  "_id": ObjectId("507f1f77bcf86cd799439016"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 50.00,
  "category": "Gym",
  "description": "Monthly gym membership",
  "date": ISODate("2026-02-01T00:00:00Z"),
  "createdAt": ISODate("2026-02-01T09:15:00.567Z"),
  "updatedAt": ISODate("2026-02-01T09:15:00.567Z")
}

// Example 7: Coffee
{
  "_id": ObjectId("507f1f77bcf86cd799439017"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 5.75,
  "category": "Coffee",
  "description": "Latte at local café",
  "date": ISODate("2026-02-09T00:00:00Z"),
  "createdAt": ISODate("2026-02-09T08:30:00.890Z"),
  "updatedAt": ISODate("2026-02-09T08:30:00.890Z")
}

// Example 8: Car maintenance
{
  "_id": ObjectId("507f1f77bcf86cd799439018"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 120.00,
  "category": "Car",
  "description": "Oil change and tire rotation",
  "date": ISODate("2026-02-05T00:00:00Z"),
  "createdAt": ISODate("2026-02-05T16:45:20.345Z"),
  "updatedAt": ISODate("2026-02-05T16:45:20.345Z")
}

// Example 9: Activities
{
  "_id": ObjectId("507f1f77bcf86cd799439019"),
  "user": ObjectId("507f191e810c19729de860ea"),
  "amount": 35.00,
  "category": "Activities",
  "description": "Movie tickets (2)",
  "date": ISODate("2026-02-06T00:00:00Z"),
  "createdAt": ISODate("2026-02-06T19:00:10.678Z"),
  "updatedAt": ISODate("2026-02-06T19:00:10.678Z")
}

// ======================================
// MongoDB Queries

// Get all expenses
db.expenses.find()

// Get expenses for February 2026
db.expenses.find({
  date: {
    $gte: ISODate("2026-02-01"),
    $lt: ISODate("2026-03-01")
  }
})

// Get expenses by category
db.expenses.find({ category: "Groceries" })

// Get total spending
db.expenses.aggregate([
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }
])

// Get spending by category
db.expenses.aggregate([
  {
    $group: {
      _id: "$category",
      total: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } }
])

// Get monthly totals
db.expenses.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
      total: { $sum: "$amount" },
      expenses: { $sum: 1 }
    }
  },
  { $sort: { _id: -1 } }
])

// Get average expense amount
db.expenses.aggregate([
  {
    $group: {
      _id: "$category",
      average: { $avg: "$amount" }
    }
  }
])

// Delete old expenses (older than 1 year)
db.expenses.deleteMany({
  date: {
    $lt: ISODate("2025-01-01")
  }
})

// Update an expense
db.expenses.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439011") },
  { $set: { amount: 75.00, description: "Updated description" } }
)
