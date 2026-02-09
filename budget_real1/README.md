# Budget Tracker 💰

A modern, minimalist personal expense tracker with MongoDB backend.

## Features

✨ **Expense Management**
- Add expenses with amount, category, description, and date
- 9 predefined categories: Groceries, Restaurants, Travel, Rent, Car, Activities, Gym, Coffee, Subscription
- Edit and delete expenses
- Filter by category and date range

📊 **Analytics & Visualization**
- Doughnut chart showing spending distribution by category
- Category breakdown with percentages
- Total spent & monthly totals
- Expense count and statistics

🎨 **Modern Design**
- Clean, minimalist UI
- Responsive design (desktop, tablet, mobile)
- Color-coded categories
- Smooth animations and transitions

💾 **Data Persistence**
- MongoDB backend for reliable data storage
- LocalStorage fallback for offline use
- User profiles support (ready for auth)

## Project Structure

```
budget_real1/
├── frontend/
│   ├── index.html          # Main UI
│   ├── styles.css          # Modern styling
│   ├── app.js              # Client-side logic
│   ├── package.json        # Frontend dependencies
│   └── .env                # Environment config
│
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   ├── .env                # MongoDB connection
│   ├── models/
│   │   ├── expense.js      # Expense schema
│   │   ├── user.js         # User schema
│   │   ├── budget.js       # Budget limits schema
│   │   └── index.js        # Models export
│   ├── routes/
│   │   ├── expenses.js     # Expense API endpoints
│   │   └── budgets.js      # Budget API endpoints
│   └── data/               # Local data (optional)
│
└── README.md               # This file
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB connection in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/budget_tracker
PORT=5000
```

4. Start the server:
```bash
npm run dev    # With nodemon (development)
npm start      # Basic start
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Start a simple HTTP server:
```bash
python -m http.server 8000
```

Or use npm if you prefer:
```bash
npm run dev
```

3. Open in browser:
```
http://localhost:8000
```

## API Endpoints

### Expenses
```
GET    /api/expenses              # Get all expenses
POST   /api/expenses              # Create expense
PUT    /api/expenses/:id          # Update expense
DELETE /api/expenses/:id          # Delete expense
GET    /api/expenses/category/:category  # Filter by category
GET    /api/expenses/stats/summary       # Get statistics
```

### Budgets
```
GET    /api/budgets              # Get budgets
POST   /api/budgets              # Create budget
PUT    /api/budgets/:id          # Update budget
DELETE /api/budgets/:id          # Delete budget
```

## Usage

1. **Add Expense:**
   - Fill in amount, select category, add description (optional)
   - Set date or use today
   - Click "Add Expense"

2. **View Analytics:**
   - Doughnut chart updates automatically
   - See percentage breakdown by category
   - View total spent and monthly totals

3. **Filter Expenses:**
   - Use category dropdown to filter by type
   - Use month picker to filter by date
   - Click "Clear" to reset filters

4. **Delete Expense:**
   - Click "Delete" button on any expense
   - Confirm deletion

## Database Schema

### Expense
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  amount: Number,
  category: String (enum),
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  currency: String,
  monthlyBudget: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Budget
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  category: String,
  limit: Number,
  month: String (YYYY-MM),
  createdAt: Date,
  updatedAt: Date
}
```

## Color Scheme

Each category has a unique color for visual identification:
- 🛒 Groceries: Purple
- 🍽️ Restaurants: Pink
- ✈️ Travel: Cyan
- 🏠 Rent: Orange
- 🚗 Car: Indigo
- 🎮 Activities: Teal
- 💪 Gym: Lime
- ☕ Coffee: Amber
- 📺 Subscription: Violet

## Technologies

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Chart.js for visualizations
- LocalStorage API for offline data

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- CORS for cross-origin requests

## Future Enhancements

- 🔐 User authentication & authorization
- 💳 Budget limits per category
- 📈 Monthly reports and trends
- 📱 Mobile app (React Native)
- 🔔 Spending alerts
- 🌙 Dark mode
- 💱 Multi-currency support
- 📤 Export to CSV/PDF

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
