# 📋 ParkPulse Sofia - Command Cheat Sheet

## 🚀 Quick Start Commands

### Install Everything
```bash
# From parking folder
npm run install-all
```

### Start Development (Separate Terminals)
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Start Development (Windows)
```bash
start-dev.bat
```

### Start Development (Linux/Mac)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

## 🔧 Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev

# Test API health
curl http://localhost:5000/api/health
```

## 🎨 Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🧪 Test API Endpoints

```bash
# Get all parking zones
curl http://localhost:5000/api/parking-zones

# Get active events
curl http://localhost:5000/api/events/active

# Get schools
curl http://localhost:5000/api/locations?type=school

# Get parking predictions
curl "http://localhost:5000/api/predictions?lat=42.6977&lng=23.3219"
```

## 📦 Useful npm Scripts

### Root Level (parking/)
```bash
npm run install-all      # Install backend + frontend
npm run dev             # Run both servers (with concurrently)
npm run dev:backend     # Run only backend
npm run dev:frontend    # Run only frontend
npm run build:frontend  # Build frontend for production
```

### Backend (backend/)
```bash
npm start               # Start Express server
npm run dev            # Start with nodemon (auto-reload)
```

### Frontend (frontend/)
```bash
npm run dev            # Start Vite dev server
npm run build          # Production build
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

## 🌐 URLs

- **Frontend Dev**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

## 📝 Environment Setup

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Port Already in Use

**Backend:**
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9
```

**Frontend:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

### Reset Everything
```bash
# Remove all node_modules and package-lock
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm run install-all
```

### Clear npm Cache
```bash
npm cache clean --force
```

## 📊 Project Structure Commands

```bash
# View project structure (Windows)
tree /F

# View project structure (Linux/Mac)
tree

# Count lines of code
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" | xargs wc -l
```

## 🚀 Deployment Commands

### Vercel (Frontend)
```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Render (Backend)
```bash
# Push to GitHub
git add .
git commit -m "Deploy backend"
git push

# Render will auto-deploy from GitHub
```

## 🔍 Debugging

```bash
# Check if ports are open
netstat -an | findstr "5000 3000"

# View backend logs
cd backend
npm start

# View frontend logs  
cd frontend
npm run dev

# Check Node version
node --version

# Check npm version
npm --version
```

## 📱 Testing on Mobile (Same Network)

1. Find your IP address:
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

2. Update frontend/.env:
```env
VITE_API_URL=http://YOUR_IP:5000/api
```

3. Access from mobile: `http://YOUR_IP:3000`

## 🎯 Production Build

```bash
# Build frontend
cd frontend
npm run build

# Output will be in frontend/dist/

# Test production build locally
npm run preview
```

---

**Quick Reference**: Keep this file handy during development! 📌
