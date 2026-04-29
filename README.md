# 🛡️ SpamShield AI

**SpamShield AI** is a production-grade, full-stack web application for detecting spam messages with high precision. It features a modern, responsive frontend with 3D visualizations and a scalable, robust FastAPI backend.

## 🌍 Live Demo

- **Frontend Application** (Vercel): `https://spam-shield-classifier.vercel.app/`
- **Backend API Docs** (Hugging Face): `https://artasam-khan-spam-classifier-api.hf.space/docs`

The application uses a trained scikit-learn Naive Bayes model to classify messages as "Spam" or "Ham" (Not Spam) and provides a confidence score alongside its prediction.

## 🌟 Features

- **Blazing Fast API**: Powered by FastAPI and Python 3.13.
- **Modern UI/UX**: Built with React 19, Vite, Framer Motion, and Three.js 3D graphics.
- **Machine Learning**: Native integration with scikit-learn ML components (`model.pkl` & `Vectorizer.pkl`).
- **Dark/Light Mode**: First-class support for both themes with glassmorphism elements.
- **Local History**: Keep track of your recent predictions locally (no database required).
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.

## 🏗️ Architecture

- **Backend**: FastAPI structure segregated into routes, services, and models. Uses a Singleton pattern for lazy-loading the ML model to ensure fast startup times and efficient memory usage.
- **Frontend**: React application built with Vite, emphasizing a component-driven architecture (Atomic Design) with custom hooks (`usePredict`, `useTheme`, `useHistory`).

## 🚀 Quick Start (Local Development)

### 1. Backend Setup

Launch the FastAPI backend serving the ML model:

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at:
- API endpoint: `http://127.0.0.1:8000/api/predict`
- Health check: `http://127.0.0.1:8000/api/health`
- Swagger UI (Docs): `http://127.0.0.1:8000/docs`

### 2. Frontend Setup

In a new terminal, start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and automatically proxy API requests to the backend.

## 🌐 Deployment

The project is configured for split deployment:

- **Frontend** (Vercel): The app is ready to deploy natively on Vercel. 
  - Connect the repository to Vercel and set the Root Directory to the `frontend` folder.
  - Make sure to add `VITE_API_URL` in your Vercel Environment Variables and set it to your Hugging Face Space URL (e.g., `https://your-namespace-app-name.hf.space`).
- **Backend / API** (Hugging Face Spaces): The provided `backend/Dockerfile` targets Python 3.13-slim and is optimized for the free Hugging Face Spaces Docker environment. 

## 🧪 CI/CD

A GitHub Actions workflow is included in `.github/workflows/ci.yml` that automatically:
- Checks Python code quality using `flake8`.
- Builds the React frontend using `npm run build` to ensure no compile errors enter the main branch.

## 📜 License
MIT License
