import pandas as pd
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta
import requests

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
df_hist = None

@app.on_event("startup")
def load_and_train():
    global model, df_hist
    print("Loading data...")
    df_hist = pd.read_csv("final_daily_data.csv")
    df_hist['date'] = pd.to_datetime(df_hist['date'])
    
    # Fill any missing weather with averages
    df_hist['temp_max'] = df_hist['temp_max'].fillna(df_hist['temp_max'].mean())
    df_hist['temp_min'] = df_hist['temp_min'].fillna(df_hist['temp_min'].mean())
    df_hist['precipitation'] = df_hist['precipitation'].fillna(0)
    
    # Features for model
    features = [
        'month', 'day_of_week', 'is_weekend', 'holiday_month', 
        'season_monsoon', 'season_summer', 'season_winter', 
        'festival_navratri_month', 'temp_max', 'temp_min', 'precipitation'
    ]
    
    X = df_hist[features]
    y = df_hist['visitors']
    
    print("Training model...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    print("Model trained successfully!")

@app.get("/predict")
def predict(date_str: str = None):
    if not date_str:
        # Default to tomorrow
        target_date = datetime.now() + timedelta(days=1)
    else:
        target_date = datetime.strptime(date_str, "%Y-%m-%d")
        
    # Get weather forecast for Katra
    weather_url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": 32.99,
        "longitude": 74.93,
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
        "timezone": "Asia/Kolkata",
        "start_date": target_date.strftime("%Y-%m-%d"),
        "end_date": target_date.strftime("%Y-%m-%d")
    }
    
    try:
        res = requests.get(weather_url, params=params)
        res.raise_for_status()
        data = res.json()
        temp_max = data['daily']['temperature_2m_max'][0]
        temp_min = data['daily']['temperature_2m_min'][0]
        precipitation = data['daily']['precipitation_sum'][0]
    except Exception as e:
        print("Weather fetch failed, using historical averages.", e)
        temp_max = df_hist[df_hist['month'] == target_date.month]['temp_max'].mean()
        temp_min = df_hist[df_hist['month'] == target_date.month]['temp_min'].mean()
        precipitation = df_hist[df_hist['month'] == target_date.month]['precipitation'].mean()

    # Determine festival/season flags based on month
    month = target_date.month
    season_monsoon = 1 if month in [7, 8] else 0
    season_summer = 1 if month in [3, 4, 5, 6] else 0
    season_winter = 1 if month in [11, 12, 1, 2] else 0
    festival_navratri_month = 1 if month in [4, 10] else 0 # Approx: Chaitra & Sharad Navratri
    holiday_month = 1 if month in [1, 5, 10, 11, 12] else 0 # Approx
    
    X_pred = pd.DataFrame([{
        'month': month,
        'day_of_week': target_date.weekday(),
        'is_weekend': 1 if target_date.weekday() >= 5 else 0,
        'holiday_month': holiday_month,
        'season_monsoon': season_monsoon,
        'season_summer': season_summer,
        'season_winter': season_winter,
        'festival_navratri_month': festival_navratri_month,
        'temp_max': temp_max,
        'temp_min': temp_min,
        'precipitation': precipitation
    }])
    
    prediction = model.predict(X_pred)[0]
    
    # Optional: fetch past week data for the chart
    # Converting timestamp to string to prevent json serialization issues
    past_week_df = df_hist.tail(7).copy()
    past_week_df['date'] = past_week_df['date'].dt.strftime('%Y-%m-%d')
    past_week = past_week_df[['date', 'visitors']].to_dict(orient='records')
    
    return {
        "date": target_date.strftime("%Y-%m-%d"),
        "predicted_visitors": int(prediction),
        "weather": {
            "temp_max": round(temp_max, 1),
            "temp_min": round(temp_min, 1),
            "precipitation": round(precipitation, 1)
        },
        "factors": {
            "is_weekend": bool(X_pred['is_weekend'][0]),
            "navratri": bool(festival_navratri_month)
        },
        "recent_history": past_week
    }
    
@app.get("/history")
def get_history(days: int = 30):
    df_tail = df_hist.tail(days).copy()
    df_tail['date'] = df_tail['date'].dt.strftime('%Y-%m-%d')
    return df_tail[['date', 'visitors']].to_dict(orient='records')

@app.get("/history_yearly")
def get_history_yearly():
    yearly_df = df_hist.groupby('year')['visitors'].sum().reset_index()
    # Return as list of dicts: [{'year': 1986, 'visitors': 2000000}, ...]
    return yearly_df.to_dict(orient='records')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
