import pandas as pd
import requests
import calendar
import numpy as np
from datetime import datetime, timedelta

print("Loading monthly data...")
df_month = pd.read_csv('data.csv')

# Ensure date is datetime
df_month['date'] = pd.to_datetime(df_month['date'])

# We will create a list of dictionaries for the daily data
daily_records = []

# Weights for days of week (0=Monday, 6=Sunday)
# Assume weekends (Saturday=5, Sunday=6) have 1.5x more visitors
dow_weights = {0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0, 4: 1.2, 5: 1.5, 6: 1.5}

print("Expanding monthly data to daily data...")
for _, row in df_month.iterrows():
    year = int(row['year'])
    month = int(row['month'])
    visitors = int(row['visitors'])
    
    _, num_days = calendar.monthrange(year, month)
    
    # Calculate weights for this specific month to distribute visitors
    day_weights = []
    for day in range(1, num_days + 1):
        dt = datetime(year, month, day)
        day_weights.append(dow_weights[dt.weekday()])
        
    total_weight = sum(day_weights)
    
    for day in range(1, num_days + 1):
        dt = datetime(year, month, day)
        weight = dow_weights[dt.weekday()]
        
        # Proportional visitors for this day
        if total_weight > 0:
            daily_visitors = int((weight / total_weight) * visitors)
        else:
            daily_visitors = 0
            
        record = {
            'date': dt.strftime('%Y-%m-%d'),
            'year': year,
            'month': month,
            'day': day,
            'day_of_week': dt.weekday(),
            'is_weekend': 1 if dt.weekday() >= 5 else 0,
            'visitors': daily_visitors,
            'holiday_month': row['holiday'],
            'season_monsoon': row['season_monsoon'],
            'season_summer': row['season_summer'],
            'season_winter': row['season_winter'],
            'festival_navratri_month': row['festival_navratri']
        }
        daily_records.append(record)

df_daily = pd.DataFrame(daily_records)
print(f"Created {len(df_daily)} daily records.")

print("Fetching historical weather data for Katra from Open-Meteo...")
# Katra: 32.99°N, 74.93°E
weather_url = "https://archive-api.open-meteo.com/v1/archive"
params = {
    "latitude": 32.99,
    "longitude": 74.93,
    "start_date": "1986-01-01",
    "end_date": "2025-12-31",
    "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
    "timezone": "Asia/Kolkata"
}

try:
    response = requests.get(weather_url, params=params)
    response.raise_for_status()
    weather_data = response.json()
    
    daily_weather = weather_data['daily']
    df_weather = pd.DataFrame({
        'date': daily_weather['time'],
        'temp_max': daily_weather['temperature_2m_max'],
        'temp_min': daily_weather['temperature_2m_min'],
        'precipitation': daily_weather['precipitation_sum']
    })
    
    print("Merging weather data with daily footfall data...")
    df_merged = pd.merge(df_daily, df_weather, on='date', how='left')
    
    df_merged.to_csv('final_daily_data.csv', index=False)
    print("Successfully saved final_daily_data.csv")
    
except Exception as e:
    print(f"Failed to fetch weather data: {e}")
    df_daily.to_csv('final_daily_data_no_weather.csv', index=False)
