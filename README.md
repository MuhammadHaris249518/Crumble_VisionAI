# Crumble_VisionAI

A full stack Computer Vision powered web app for Cookies Defect Detection.

This is an integrated platform containing a GUI frontend, FastAPI backend, and Synthetic AI generation pipeline for defect detection on cookies.

## Project Structure
- `backend/`: FastAPI application handling image processing, inference and APIs.
- `frontend/`: Vite + React web interface for the Studio Page.
- `synthetic_ai/`: Tools for generating synthetic defect datasets and training YOLO models.

## How to Run Locally

### Windows (Quick Start)
To launch both the frontend and the backend automatically:
1. Open PowerShell in this root directory.
2. Run `.\start_project.ps1`

### Manual Start
**Backend:**
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
fastapi dev app/main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker-compose up --build
```
>>>>>>> feature/haider
