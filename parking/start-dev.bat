@echo off
echo ========================================
echo   ParkPulse Sofia - Starting...
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed!
echo.

echo [2/3] Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed!
echo.

echo [3/3] Starting development servers...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

cd ..
start "ParkPulse Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
start "ParkPulse Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers are starting!
echo   Open http://localhost:3000 in browser
echo ========================================
pause
