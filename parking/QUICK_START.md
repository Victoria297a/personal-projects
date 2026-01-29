# ParkPulse Sofia - Quick Start Guide

## 🚦 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Terminal 1 - Backend
cd parking/backend
npm install

# Terminal 2 - Frontend
cd parking/frontend
npm install
```

### Step 2: Start Development Servers

```bash
# Terminal 1 - Backend (port 5000)
cd parking/backend
npm start

# Terminal 2 - Frontend (port 3000)
cd parking/frontend
npm run dev
```

### Step 3: Open Your Browser

Navigate to `http://localhost:3000`

## 🎯 What You'll See

1. **Home Page** - Interactive map with parking heatmap
2. **Search** - Type "hospital" or "school" to see locations
3. **School Mode** - Toggle to see safety zones
4. **Events Page** - View upcoming events and parking impact
5. **About Page** - Platform overview and tech stack

## 📱 Demo Features to Showcase

### For Startup Pitch:

1. **Show the Heatmap** 
   - Green = High availability (Mladost)
   - Yellow = Medium (Lozenets)
   - Red = Low availability (Center)

2. **Search for Schools**
   - Click "Schools" chip
   - See all 4 schools on map
   - Notice safety zone markers

3. **Enable School Mode**
   - Toggle the switch in right panel
   - Emphasize child safety priority

4. **Check Event Alerts**
   - See "Levski vs CSKA" warning
   - 95% parking impact
   - Alternative parking suggestions

5. **Visit Events Page**
   - AI prediction banner
   - Detailed event list with recommendations

## 🐛 Troubleshooting

### Port Already in Use?

```bash
# Backend (change port in backend/.env)
PORT=5001

# Frontend (change port in frontend/vite.config.ts)
server: { port: 3001 }
```

### API Connection Issues?

Check `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Map Not Loading?

Ensure Leaflet CSS is loaded in `frontend/index.html`

## 🎤 Pitch Talking Points

1. **Problem**: 45 hours/year lost in Sofia traffic, 30% from parking search
2. **Solution**: Predictive AI parking platform
3. **Social Impact**: School Mode for child safety
4. **Tech**: React + TypeScript + Node.js + Leaflet
5. **Business**: B2G (municipality) + B2C (drivers)
6. **Future**: Autonomous vehicle data layer

## 📊 Mock Data Overview

- **5 Zones**: Realistic Sofia neighborhoods
- **5 Events**: Major venues (Stadium, NDK, Arena Sofia)
- **10+ Locations**: Offices, hospitals, schools
- **Real Coordinates**: Actual Sofia locations

## 🚀 Next Steps After Demo

1. Deploy to Vercel (frontend) + Render (backend)
2. Add real sensor data integration
3. Implement payment system
4. Mobile app development
5. Municipality partnership

---

Good luck with your pitch! 🎉
