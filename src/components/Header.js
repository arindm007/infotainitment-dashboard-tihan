import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

function Header({ isAuthenticated, user, onLogout, onGoogleLogin }) {
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
      <div style={styles.timeDateContainer}>
        <h1 className="text-2xl" style={styles.time}>{time}</h1>
        <p className="text-gray-400" style={styles.date}>{date}</p>
      </div>
      <div style={styles.rightContainer}>
        <div className="flex items-center space-x-4" style={styles.weatherContainer}>
          {error ? (
            <div>{error}</div>
          ) : weather.temp ? (
            <>
              <div className="text-white" style={styles.temp}>{weather.temp}°C</div>
              <div className="text-gray-400" style={styles.description}>{weather.description}</div>
              <div className="w-10 h-10 rounded-full" style={styles.icon}>
                <img
                  src={getWeatherIcon(weather.code)}
                  alt={weather.description}
                  style={styles.weatherIcon}
                />
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div style={styles.profileSection}>
          {isAuthenticated ? (
            <>
              <img
                src={user?.profilePicture || 'default-profile.png'}
                alt="Profile"
                style={styles.profilePic}
              />
              <div style={styles.userDetails}>
                <p style={styles.userName}>{user?.name || 'User'}</p>
                <p style={styles.userEmail}>{user?.email || 'No Email'}</p>
              </div>
              <button
                style={styles.button}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <FaUser
              style={{ ...styles.icon, ...styles.placeholderIcon }}
              onClick={onGoogleLogin} // Trigger Google Login on click
            />
          )}
        </div>
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
    61: 'Rain: Slight intensity',
    80: 'Rain showers: Slight',
  };
  return weatherCodes[code] || 'Unknown weather';
};

// Function to map weather codes to icons
const getWeatherIcon = (code) => {
  const weatherIcons = {
    0: '/WeatherImage/images/01d_t.png',
    1: '/WeatherImage/images/01d_t.png',
    2: '/WeatherImage/images/02d_t.png',
    3: '/WeatherImage/images/04d_t.png',
    45: '/WeatherImage/images/50d_t.png',
    61: '/WeatherImage/images/09d_t.png',
    80: '/WeatherImage/images/10d_t.png',
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
    background: '#1a1a1a',
  },
  timeDateContainer: {
    flex: 1,
  },
  time: {
    fontSize: '1.5rem',
    margin: 0,
  },
  date: {
    color: 'gray',
    margin: 0,
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '30px',
    height: '30px',
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
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '1rem',
    color: 'white',
  },
  userEmail: {
    fontSize: '0.8rem',
    color: 'gray',
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  button: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#555',
  },
  placeholderIcon: {
    fontSize: '1.5rem',
    cursor: 'pointer', // Make sure the icon is clickable
  },
};

export default Header;
