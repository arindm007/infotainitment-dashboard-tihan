import React, { useState, useEffect } from 'react';

function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState({ temp: '', description: '', code: null });
  const [error, setError] = useState('');

  useEffect(() => {
    // Update time and date dynamically
    const updateDateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const dateString = now.toLocaleDateString(undefined, dateOptions);

      setTime(timeString);
      setDate(dateString);
    };

    const interval = setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch weather data based on user's location
    const fetchWeather = async () => {
      try {
        // Get user's geolocation
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch weather data from Open-Meteo API
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

  return (
    <header style={styles.header}>
      <div>
        <h1 className="text-2xl" style={styles.time}>{time}</h1>
        <p className="text-gray-400" style={styles.date}>{date}</p>
      </div>
      <div className="flex items-center space-x-4" style={styles.weatherContainer}>
        {error ? (
          <div>{error}</div>
        ) : weather.temp ? (
          <>
            <div className="text-white" style={styles.temp}>{weather.temp}°C</div>
            <div style={styles.weatherDetails}>
              <div className="w-10 h-10 rounded-full" style={styles.icon}>
                <img 
                  src={getWeatherIcon(weather.code)} 
                  alt={weather.description} 
                  style={styles.weatherIcon} 
                />
              </div>
            <div className="text-gray-400" style={styles.description}>{weather.description}</div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </header>
  );
}

// Function to map weather codes to descriptions and corresponding icons
const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    // 48: 'Depositing rime fog',
    // 51: 'Drizzle: Light intensity',
    // 53: 'Drizzle: Moderate intensity',
    // 55: 'Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    // 63: 'Rain: Moderate intensity',
    // 65: 'Rain: Heavy intensity',
    80: 'Rain showers: Slight',
    // 81: 'Rain showers: Moderate',
    // 82: 'Rain showers: Violent',
    // Add more mappings as needed
  };
  return weatherCodes[code] || 'Unknown weather';
};

// Function to map weather codes to icons
const getWeatherIcon = (code) => {
  const weatherIcons = {
    0: '/WeatherImage/images/01d_t.png', // Clear sky
    1: '/WeatherImage/images/01d_t.png', // Mainly clear
    2: '/WeatherImage/images/02d_t.png', // Partly cloudy
    3: '/WeatherImage/images/04d_t.png', // Overcast
    45:'/WeatherImage/images/50d_t.png', // Fog
    61:'/WeatherImage/images/09d_t.png', // Rain showers
    80:'/WeatherImage/images/10d_t.png', // Slight rain showers
    // Add additional mappings as needed.
  };
  return weatherIcons[code] || '/WeatherImage/images/02d_t.png';
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    color: 'white',
    background: '#1c1c1c',
  },
  time: {
    fontSize: '1.5rem',
    margin: 0,
  },
  date: {
    color: 'gray',
    margin: 0,
  },
  weatherContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  temp: {
    fontSize: '1.2rem',
  },
  description: {
    color: 'gray',
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  weatherDetails: {
    display: 'flex',
    flexDirection: 'column', // Align the icon and description vertically
    alignItems: 'center', // Center the elements horizontally
  },
};

export default Header;