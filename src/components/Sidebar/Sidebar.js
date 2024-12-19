import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCar, FaCalendarAlt, FaCog, FaAppStore, FaLightbulb } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#1a1a1a',
    height: '100vh',
    width: '80px',
    justifyContent: 'center',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    margin: '10px 0',
    borderRadius: '50%',
    backgroundColor: '#555555',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  icon: {
    color: '#fff',
    fontSize: '1.5rem',
  },
};

function Sidebar() {
  const location = useLocation();
  const [isVideoCallEnabled, setIsVideoCallEnabled] = useState(false);

  useEffect(() => {
    // Check if the video call feature is installed
    const isInstalled = localStorage.getItem('installedFeatures')?.includes('Video Call');
    setIsVideoCallEnabled(isInstalled);
  }, []);

  const routes = [
    { path: '/', icon: <FaHome /> },
    { path: '/calendar', icon: <FaCalendarAlt /> },
    { path: '/store', icon: <FaAppStore /> },
    { path: '/car', icon: <FaCar /> },
    // { path: '/ambientcolor', icon: <FaLightbulb />, external: true },
    { path: '/settings', icon: <FaCog />, external: true  },
  ];
  const handleNavigation = (route) => {
    if (route.external) {
      window.location.href = 'http://localhost:4000'; // Redirect to external URL
    }
  };

  // Conditionally add the Video Call route if enabled
  if (isVideoCallEnabled) {
    routes.splice(2, 0, { path: '/call', icon: <SiGooglemeet /> });
  }

  return (
    <nav style={styles.sidebar}>
      {routes.map((route, index) => (
        <Link to={route.path} key={index} style={{ textDecoration: 'none' }}>
          <div style={styles.iconWrapper}>
            {React.cloneElement(route.icon, { style: styles.icon })}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
