# Deployment Guide: Tiger Nsanzi Platform

This project is designed to be split into two parts: **Frontend (Vercel)** and **Backend (Render)**.

---

## 1. Backend Deployment (Render.com)

1. **Create a New Web Service** on Render.
2. **Connect your GitHub Repository**.
3. **Configure Build & Start Commands**:
   - **Environment**: `Node`
   - **Build Command**: `npm install && vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs`
   - **Start Command**: `node dist/server.cjs`
4. **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `FRONTEND_URL`: `https://your-app-name.vercel.app` (Full URL, no trailing slash).
   - `NODE_ENV`: `production`

---

## 2. Frontend Deployment (Vercel)

1. **Create a New Project** on Vercel.
2. **Connect your GitHub Repository**.
3. **Configure Project Settings**:
   - **Build Command**: `npm install && vite build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend-name.onrender.com/api` (End with `/api`).

---

## Technical Notes

- **CORS**: The backend (`server.ts`) is configured to allow requests from the `FRONTEND_URL` you specify on Render.
- **API Base URL**: The frontend uses `import.meta.env.VITE_API_URL` to determine where calling the AI Chat and Suggestions logic. If not provided, it defaults to a local path (useful for testing).
- **Persistence**: All user data like Watchlist and History are stored in the browser's `localStorage`, so they don't require a database but remain persistent for the user.

---

**Danger in the building! Stay alert!** 🐯
