@echo off
echo =========================================
echo FinMark Demo Setup Script
echo =========================================
echo.

echo Starting FinMark demonstration environment...
echo.

echo [1/4] Checking Node.js availability...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo [2/4] Installing dependencies...
call npm install

echo [3/4] Starting main server...
start "FinMark Main Server" cmd /k "npm start"

echo [4/4] Waiting for server startup...
timeout /t 5 /nobreak > nul

echo.
echo =========================================
echo Demo Environment Ready!
echo =========================================
echo.
echo Open these URLs in your browser:
echo - Main Dashboard: http://localhost:3000
echo - Network Monitor: http://localhost:3000/monitor
echo.
echo Available demo commands:
echo - npm run week8-challenge
echo - npm run week9-refinement  
echo - node tools/load-balancer.js
echo - node tools/idps-monitor.js
echo.
echo Press any key to open demo terminal...
pause > nul

start "FinMark Demo Terminal" cmd /k "cd /d %~dp0 && echo Ready for demo commands && echo Type 'npm run week8-challenge' to start"

echo Demo setup complete! Good luck with your presentation!
pause
