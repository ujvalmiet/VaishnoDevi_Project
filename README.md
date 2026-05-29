# Vaishno Devi Footfall Predictor

This is a full-stack AI application built to predict the footfall at the Mata Vaishno Devi Shrine and provide intelligent travel planning.

## Prerequisites
Before running this project on a new computer, make sure you have installed:
1. **Python** (version 3.8 or higher)
2. **Node.js** (version 18 or higher)

---

## Step 1: Start the Backend (AI Model)
The backend uses Python and FastAPI to run the Random Forest ML Model.

1. Open a terminal inside the project folder.
2. Install the required Python libraries:
   ```bash
   pip install fastapi uvicorn pandas scikit-learn requests
   ```
3. Start the Python server:
   ```bash
   python -m uvicorn main:app --reload
   ```
4. The backend should now be running on `http://localhost:8000`.

---

## Step 2: Start the Frontend (React Website)
The frontend is built using React and Vite.

1. Open a **new** terminal inside the `frontend/` folder.
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. The terminal will give you a link (usually `http://localhost:5173/`). Open that link in your web browser to view the website!

---

### Key Features Included:
- **Travel Planner Form:** Dynamic suggestions for Battery Cars, Helicopters, and Ponies based on predicted crowd levels and group size.
- **AI Crowd Prediction:** Random Forest model trained on 40 years of interpolated historical data, adjusted for weekends, Navratri, and current weather.
- **Live Weather Integration:** Pulls real-time Katra weather from Open-Meteo.
- **Yatra Statistics:** Visual dashboards with Area and Bar charts displaying historical footfall growth.
- **Guidelines & Official Links:** Integrated resources directly guiding users to official Shrine Board rules.
