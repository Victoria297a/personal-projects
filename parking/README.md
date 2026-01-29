# ParkPulse Sofia - Smart Parking Platform

A comprehensive web application for smart parking availability and congestion prediction in Sofia, Bulgaria. Built for startup forum pitches with real-time heatmaps, event surge alerts, and AI-powered recommendations.

## 🚀 Features

- **Interactive Parking Heatmap** - Live parking availability across Sofia neighborhoods
- **Smart Location Search** - Find parking near offices, hospitals, and schools
- **Event Surge Alerts** - Predictive warnings for major events (concerts, sports, etc.)
- **School Safety Mode** - Prioritize safety zones during drop-off/pick-up times
- **AI Recommendations** - Intelligent parking suggestions based on location and time

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **TailwindCSS** for modern styling
- **Leaflet** for interactive maps
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **REST API** architecture
- **Mock JSON data** for demo purposes
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
parking/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MapView.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── AlertsPanel.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Events.tsx
│   │   │   └── About.tsx
│   │   ├── services/        # API services
│   │   │   └── api.ts
│   │   ├── types/           # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/
│   ├── routes/              # API routes
│   │   ├── parking.js
│   │   ├── events.js
│   │   ├── locations.js
│   │   └── predictions.js
│   ├── data/                # Mock data
│   │   ├── parking-zones.json
│   │   ├── events.json
│   │   └── locations.json
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🌐 API Endpoints

### Parking Zones
- `GET /api/parking-zones` - Get all parking zones
- `GET /api/parking-zones/:id` - Get specific zone

### Events
- `GET /api/events` - Get all events
- `GET /api/events/active` - Get active/upcoming events
- `GET /api/events/:id` - Get specific event

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations?type=hospital` - Filter by type (office/hospital/school)
- `GET /api/locations/:id` - Get specific location

### Predictions
- `GET /api/predictions?lat=42.6977&lng=23.3219` - Get parking predictions for coordinates

## 📊 Mock Data

The application includes comprehensive mock data for:
- **5 parking zones** (Center, Lozenets, Mladost, Studentski Grad, NDK Area)
- **5 major events** (Football matches, concerts, mall peaks, etc.)
- **10+ locations** (Offices, hospitals, schools across Sofia)

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<backend-url>`

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Set environment variables as needed

## 🎨 Sofia Neighborhoods Covered

- **Center** - Business district, high demand
- **Lozenets** - Residential/commercial mix
- **Mladost** - Large residential area, good availability
- **Studentski Grad** - University area, student-friendly pricing

## 🔮 Future Enhancements

- Real-time sensor integration
- Payment system integration
- Mobile app (React Native)
- Machine learning for better predictions
- Integration with Sofia municipality data

## 📝 License

MIT License - Feel free to use for your startup pitch!

## 👥 Team

Built for Sofia Smart City Initiative

---

**Status:** Demo-ready for startup forum pitch ✨
