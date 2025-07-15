# SHOTkut.ai – Gemini AI Chat App

A modern, fully responsive React + Vite web app with animated shimmer loader, mobile-first UX, and Gemini/Cohere AI chat integration.

## Features
- Fast, beautiful UI built with React and Vite
- Fully responsive: desktop, tablet, and mobile
- Modern shimmer loader for AI response waiting
- Sidebar with hamburger menu on mobile
- Bottom navigation for mobile
- Cohere AI chat integration (API key required)
- Polished, production-ready CSS and UX

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Local development
```bash
npm run dev
```
App runs at http://localhost:5173 by default.

### 3. Build for production
```bash
npm run build
```
Build output goes to the `dist` folder.

### 4. Preview production build locally
```bash
npm run preview
```

### 5. Deploy to Netlify
- This project includes a `netlify.toml` for automatic build and deploy.
- Connect your repo/folder to Netlify and deploy.

## Environment Variables
- For Cohere AI, set your API key in `src/config/cohere.js` as `API_KEY`.
- **Never commit your real API key to a public repo!**

## Project Structure
- `src/Components/main` – Main UI, Sidebar, BottomNav
- `src/context/Context.jsx` – Global state and chat logic
- `src/config/cohere.js` – AI API integration
- `src/assets` – Icons and images

## License
MIT
