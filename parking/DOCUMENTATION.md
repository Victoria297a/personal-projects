# 🎓 ParkPulse Sofia - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Components](#components)
6. [Data Models](#data-models)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Overview

ParkPulse Sofia is a smart parking availability and congestion prediction platform designed for Sofia, Bulgaria. It helps drivers find parking efficiently and provides city planners with congestion insights.

### Key Features
- **Real-time Heatmap**: Visual representation of parking availability
- **Smart Search**: Find parking near offices, hospitals, schools
- **Event Alerts**: Advance warnings for parking demand spikes
- **School Mode**: Safety prioritization around schools
- **AI Recommendations**: Smart suggestions based on location

### Target Users
- **Drivers**: Find parking quickly
- **Parents**: Safe school drop-off zones
- **Event-goers**: Plan ahead for concerts/sports
- **City Planners**: Traffic pattern insights

---

## Installation

### Prerequisites
- Node.js 18+ 
- npm 9+
- Modern web browser

### Step 1: Clone/Navigate to Project
```bash
cd parking
```

### Step 2: Install Dependencies

**Option A: Install Everything at Once**
```bash
npm run install-all
```

**Option B: Install Separately**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 3: Set Up Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Usage

### Starting the Application

**Option 1: Automated Script (Windows)**
```bash
start-dev.bat
```

**Option 2: Automated Script (Linux/Mac)**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Option 3: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Parking Zones

**Get All Zones**
```http
GET /parking-zones
```

Response:
```json
{
  "zones": [
    {
      "id": "zone-1",
      "name": "Center",
      "neighborhood": "Center",
      "coordinates": [[42.6977, 23.3219], ...],
      "center": [42.7027, 23.3269],
      "availability": "low",
      "availabilityScore": 15,
      "totalSpots": 200,
      "occupiedSpots": 170,
      "averageFindingTime": 18,
      "peakHours": ["08:00-10:00", "17:00-19:00"],
      "pricePerHour": 2.5
    }
  ]
}
```

**Get Specific Zone**
```http
GET /parking-zones/:id
```

#### 2. Events

**Get All Events**
```http
GET /events
```

**Get Active Events (Next 48 hours)**
```http
GET /events/active
```

Response:
```json
{
  "events": [
    {
      "id": "event-1",
      "title": "Levski vs CSKA Derby",
      "type": "sports",
      "venue": "Vasil Levski National Stadium",
      "coordinates": [42.6886, 23.3377],
      "date": "2026-02-15",
      "startTime": "16:00",
      "endTime": "18:30",
      "expectedAttendance": 35000,
      "parkingImpact": "high",
      "impactScore": 95,
      "affectedZones": ["zone-1", "zone-2"],
      "recommendedParking": [...],
      "alert": "Heavy congestion predicted..."
    }
  ]
}
```

#### 3. Locations

**Get All Locations**
```http
GET /locations
```

**Filter by Type**
```http
GET /locations?type=school
GET /locations?type=hospital
GET /locations?type=office
```

Response:
```json
{
  "locations": [
    {
      "id": "school-1",
      "name": "91 German Language School",
      "type": "school",
      "coordinates": [42.6827, 23.3169],
      "address": "23 Frederic Joliot-Curie Blvd",
      "nearbyParking": [...],
      "safetyZone": true,
      "dropOffPeakHours": ["07:30-08:30"],
      "congestionWarning": "High traffic during drop-off"
    }
  ]
}
```

#### 4. Predictions

**Get Parking Recommendations**
```http
GET /predictions?lat=42.6977&lng=23.3219
```

Optional Parameters:
- `lat`: Latitude (required)
- `lng`: Longitude (required)
- `locationType`: Filter nearby locations (office/hospital/school)

Response:
```json
{
  "coordinates": {"lat": 42.6977, "lng": 23.3219},
  "recommendations": [
    {
      "id": "zone-3",
      "name": "Mladost",
      "distance": 3500,
      "distanceKm": "3.50",
      "recommendationScore": 87,
      "availabilityScore": 85
    }
  ],
  "bestOption": {...},
  "message": "Great news! Mladost has excellent availability...",
  "nearbyLocations": [...]
}
```

---

## Components

### Frontend Components

#### MapView
Interactive Leaflet map showing parking zones, locations, and events.

**Props:**
```typescript
interface MapViewProps {
  zones: ParkingZone[]
  locations?: Location[]
  events?: Event[]
  center?: [number, number]
  zoom?: number
  onZoneClick?: (zone: ParkingZone) => void
}
```

**Features:**
- Colored polygons for parking zones
- Custom markers for locations
- Event markers with impact indicators
- Interactive popups with details

#### SearchBar
Smart search with autocomplete and type filtering.

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (query: string, type?: 'office' | 'hospital' | 'school') => void
  locations: Location[]
  loading?: boolean
}
```

**Features:**
- Real-time autocomplete
- Filter chips for location types
- Suggestion dropdown

#### AlertsPanel
Displays surge alerts and school mode toggle.

**Props:**
```typescript
interface AlertsPanelProps {
  events: Event[]
  schoolMode: boolean
  onSchoolModeToggle: () => void
}
```

**Features:**
- Live event alerts
- Impact severity indicators
- Stats summary
- School mode toggle

---

## Data Models

### ParkingZone
```typescript
interface ParkingZone {
  id: string
  name: string
  neighborhood: string
  coordinates: [number, number][]
  center: [number, number]
  availability: 'low' | 'medium' | 'high'
  availabilityScore: number
  totalSpots: number
  occupiedSpots: number
  averageFindingTime: number
  peakHours: string[]
  pricePerHour: number
  notes?: string
}
```

### Event
```typescript
interface Event {
  id: string
  title: string
  type: string
  venue: string
  coordinates: [number, number]
  date: string
  startTime: string
  endTime: string
  expectedAttendance: number
  parkingImpact: 'low' | 'medium' | 'high'
  impactScore: number
  affectedZones: string[]
  recommendedParking: {
    name: string
    distance: string
    availabilityScore: number
  }[]
  alternativeTransport: string[]
  alert: string
}
```

### Location
```typescript
interface Location {
  id: string
  name: string
  type: 'office' | 'hospital' | 'school'
  coordinates: [number, number]
  address: string
  nearbyParking: {
    zoneId: string
    distance: string
    availabilityScore: number
    walkTime: number
  }[]
  safetyZone?: boolean
  dropOffPeakHours?: string[]
  congestionWarning?: string
  emergencyAccess?: boolean
}
```

---

## Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Import repository
- Select `frontend` folder as root

3. **Configure Build**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

4. **Environment Variables**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend Deployment (Render)

1. **Push to GitHub** (if not already done)

2. **Create Web Service on Render**
- Go to render.com
- New → Web Service
- Connect GitHub repository
- Select `backend` folder

3. **Configure Service**
- Name: `parkpulse-sofia-backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free

4. **Environment Variables**
```
NODE_ENV=production
PORT=5000
```

5. **Deploy**
- Click "Create Web Service"
- Wait for deployment

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

#### API Connection Failed

1. Check backend is running: `http://localhost:5000/api/health`
2. Verify `frontend/.env` has correct `VITE_API_URL`
3. Check for CORS errors in browser console

#### Map Not Loading

1. Verify Leaflet CSS is loaded
2. Check browser console for errors
3. Ensure zone coordinates are valid

#### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Debug Mode

**Backend:**
```bash
# Add debug logging
DEBUG=* npm start
```

**Frontend:**
```bash
# Check Vite logs
npm run dev -- --debug
```

### Browser Console Commands

```javascript
// Test API from browser
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)

// Check environment variables
console.log(import.meta.env.VITE_API_URL)
```

---

## Performance Optimization

### Frontend
- Lazy load routes with React.lazy()
- Memoize expensive calculations with useMemo
- Optimize map markers with clustering
- Use production build for deployment

### Backend
- Add caching for frequent queries
- Implement request rate limiting
- Optimize JSON file reading
- Add compression middleware

---

## Security Best Practices

1. **Never commit .env files**
2. **Validate all API inputs**
3. **Use HTTPS in production**
4. **Implement API rate limiting**
5. **Sanitize user inputs**

---

## Support & Contact

For issues or questions:
- Check [QUICK_START.md](QUICK_START.md)
- Review [COMMANDS.md](COMMANDS.md)
- See [ARCHITECTURE.md](ARCHITECTURE.md)

---

## License

MIT License - Free to use for your startup pitch!

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready ✅
