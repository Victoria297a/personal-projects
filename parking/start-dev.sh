#!/bin/bash

echo "========================================"
echo "  ParkPulse Sofia - Starting..."
echo "========================================"
echo ""

echo "[1/3] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi
echo "Backend dependencies installed!"
echo ""

echo "[2/3] Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi
echo "Frontend dependencies installed!"
echo ""

echo "[3/3] Starting development servers..."
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

cd ..

# Start backend in background
cd backend && npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend in background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Servers are running!"
echo "  Open http://localhost:3000 in browser"
echo "========================================"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
