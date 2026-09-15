# start_project.ps1
$ErrorActionPreference = "Stop"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   Starting Crumble VisionAI System          " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Start the FastAPI Backend
Write-Host "[1/2] Starting Backend service..." -ForegroundColor Yellow
$backendArgs = "-NoExit -Command `"cd .\backend; if (-Not (Test-Path venv)) { python -m venv venv }; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt; fastapi dev app/main.py --host 127.0.0.1 --port 8000`""
Start-Process powershell -ArgumentList $backendArgs

# 2. Start the Vite Frontend
Write-Host "[2/2] Starting Frontend service..." -ForegroundColor Yellow
$frontendArgs = "-NoExit -Command `"cd .\frontend; npm install; npm run dev`""
Start-Process powershell -ArgumentList $frontendArgs

Write-Host "=============================================" -ForegroundColor Green
Write-Host " Services launched in separate windows!      " -ForegroundColor Green
Write-Host " - Backend API: http://127.0.0.1:8000        " -ForegroundColor Green
Write-Host " - Frontend UI: usually http://localhost:5173" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
