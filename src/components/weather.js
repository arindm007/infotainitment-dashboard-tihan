import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState({ temp: '', description: '', code: null });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const data = await response.json();

          if (response.ok) {
            setWeather({
              temp: data.current_weather.temperature.toFixed(1),
              description: getWeatherDescription(data.current_weather.weathercode),
              code: data.current_weather.weathercode,
            });
          } else {
            setError(data.reason || 'Failed to fetch weather data');
          }
        });
      } catch (err) {
        setError('Unable to access geolocation');
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      61: 'Rain: Slight intensity',
      80: 'Rain showers: Slight',
    };
    return weatherCodes[code] || 'Unknown weather';
  };

  const getWeatherIcon = (code) => {
    const weatherIcons = {
      0: 'public\\WeatherImage\\images\\01d_w.png',
      1: 'public\\WeatherImage\\images\\01d_w.png',
      2: 'public\\WeatherImage\\images\\02d_w.png',
      3: 'public\\WeatherImage\\images\\04d_w.png',
      45: 'public\\WeatherImage\\images\\50d_w.png',
      61: 'public\\WeatherImage\\images\\09d_w.png',
      80: 'public\\WeatherImage\\images\\10d_w.png',
    };
    return weatherIcons[code] || 'https://path/to/default-weather-icon.png';
  };

  return (
    <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {error ? (
        <div>{error}</div>
      ) : weather.temp ? (
        <>
          <div className="text-white" style={{ fontSize: '1.2rem' }}>{weather.temp}°C</div>
          <div className="text-gray-400" style={{ color: 'gray' }}>{weather.description}</div>
          <div className="w-10 h-10 rounded-full" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <img 
              src={getWeatherIcon(weather.code)} 
              alt={weather.description} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Weather;
