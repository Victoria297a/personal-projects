# Quick Start Guide

## 🚀 Start Here

### Step 1: Install Backend Dependencies
```bash
cd budget_real1/backend
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Docker (easiest):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 3: Start Backend Server
```bash
cd budget_real1/backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 4: Start Frontend
Open a new terminal:
```bash
cd budget_real1/frontend
python -m http.server 8000
```

### Step 5: Open in Browser
Navigate to: `http://localhost:8000`

---

## 📝 Test It Out

1. **Add an Expense:**
   - Amount: 45.50
   - Category: Groceries
   - Description: Weekly shopping
   - Date: Today
   - Click "Add Expense"

2. **See the Chart:**
   - The doughnut chart shows your spending breakdown
   - The category breakdown shows percentages

3. **Add More Expenses:**
   - Add from different categories to see the chart update
   - The stats cards update automatically

4. **Filter & Delete:**
   - Filter by category or month
   - Delete expenses with the delete button

---

## 🔧 Configuration

### MongoDB Connection
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/budget_tracker
PORT=5000
```

### API Base URL
Edit `frontend/app.js` line 3 if API is on different port:
```javascript
const API_URL = "http://localhost:5000/api";
```

---

## 💾 Data Persistence

- **With MongoDB**: All data is saved to database
- **Without MongoDB**: Data is saved to browser's LocalStorage
- **Mixed**: Frontend has fallback to work offline

---

## 🐛 Troubleshooting

**"Cannot GET /api/expenses"**
- Make sure backend is running on port 5000
- Check MongoDB connection in `.env`

**MongoDB connection error**
- Install MongoDB or use Docker
- Check MONGODB_URI in `.env`

**Chart not showing**
- Make sure Chart.js CDN is available (needs internet)
- Check browser console for errors (F12)

**Expenses not saving**
- Check browser console for API errors
- MongoDB connection might be down
- Try localStorage (works without backend)

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 Next Steps

1. Add more expense categories
2. Implement user authentication
3. Add budget limits per category
4. Create monthly reports
5. Add data export (CSV/PDF)

See README.md for more information!
