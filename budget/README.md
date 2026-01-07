# Budget Tracker App

A modern, minimalistic budget tracking application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

✨ **Clean, Modern Design** - Minimalistic and responsive UI
💰 **Income & Expense Tracking** - Track both income and expenses
📊 **Category Breakdown** - Visual breakdown of expenses by category
📅 **Monthly View** - Navigate through months to view historical data
📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices
💾 **MongoDB Backend** - Persistent data storage

## Categories

**Expense Categories:**
- Food
- Rent
- Subscriptions
- Fitness
- Clothes
- Skin Care/Makeup
- Coffee
- Other

**Income Categories:**
- Salary
- Freelance
- Investment
- Bonus
- Other

## Project Structure

```
budget/
├── backend/
│   ├── server.js           # Express server & API endpoints
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
└── frontend/
    ├── index.html          # HTML structure
    ├── styles.css          # Modern styling
    ├── app.js              # Frontend logic
    └── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
# macOS: brew services start mongodb-community
# Windows: net start MongoDB
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/.env`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create/update .env file
# MONGODB_URI=mongodb://localhost:27017/budget-tracker
# PORT=5000
# NODE_ENV=development

# Start the server
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Open in a browser
# Simply open index.html in your browser, or use a simple HTTP server:

# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then navigate to `http://localhost:8000` (or the port shown) in your browser.

## API Endpoints

### Transactions

**GET `/api/transactions`**
- Get all transactions

**GET `/api/transactions/:month`**
- Get transactions for a specific month
- Format: `2026-01`

**POST `/api/transactions`**
- Add a new transaction
- Body:
  ```json
  {
    "type": "income|expense",
    "category": "food|rent|etc",
    "amount": 50.00,
    "description": "Optional description",
    "date": "2026-01-07"
  }
  ```

**PUT `/api/transactions/:id`**
- Update a transaction

**DELETE `/api/transactions/:id`**
- Delete a transaction

**GET `/api/summary/:month`**
- Get summary for a month (total income, expenses by category, balance)

**GET `/api/health`**
- Health check endpoint

## Usage

1. **Add Transaction**: Fill in the form with transaction details and click "Add Transaction"
2. **Navigate Months**: Use the month selector or Previous/Next buttons to view different months
3. **View Summary**: See your income, expenses, and balance at the top
4. **Category Breakdown**: View expenses organized by category with percentage visualization
5. **Transaction History**: See all transactions for the selected month with options to delete

## Features Explained

### Summary Cards
- **Income**: Total income for the month
- **Expenses**: Total expenses for the month
- **Balance**: Income minus expenses (positive or negative)

### Category Breakdown
- Shows all expense categories with their total amounts
- Visual progress bar showing proportion of spending per category
- Sorted by highest spending first

### Transaction List
- Shows all transactions chronologically
- Color-coded: Green for income, Red for expenses
- Click × to delete transactions

## Development

### Adding New Categories

Edit `app.js` in the frontend:

```javascript
const EXPENSE_CATEGORIES = [
    'food',
    'rent',
    // Add your categories here
];
```

### Customizing Styles

Edit `styles.css` to change colors, spacing, and layout. Key CSS variables:

```css
:root {
    --primary-color: #2d2d2d;
    --secondary-color: #f5f5f5;
    --accent-color: #4a90e2;
    --success-color: #2ecc71;
    --danger-color: #e74c3c;
}
```

## Troubleshooting

**"Cannot connect to MongoDB"**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas: verify IP whitelist and connection string

**"Cannot fetch data from API"**
- Verify backend server is running on port 5000
- Check browser console for CORS errors
- Ensure frontend is making requests to correct API URL

**"Transactions not saving"**
- Check backend console for errors
- Verify MongoDB connection
- Check browser DevTools Network tab

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - feel free to use and modify!

## Future Enhancements

- 📊 Charts and analytics
- 💾 Data export (CSV, PDF)
- 🔐 User authentication
- 📱 Mobile app (React Native)
- 🔔 Budget alerts
- 📈 Recurring transactions
- 🏷️ Tags and custom categories
- 📊 Budget goals and tracking
