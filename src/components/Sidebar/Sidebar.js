import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCar, FaCalendarAlt, FaCog, FaAppStore } from 'react-icons/fa';
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
  iconWrapperActive: {
    backgroundColor: '#d6d6d6',
  },
  iconWrapperHover: {
    backgroundColor: '#777777',
  },
  icon: {
    color: '#fff',
    fontSize: '1.5rem',
  },
  iconActive: {
    color: '#1a1a1a',
  },
};

function Sidebar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const routes = [
    { path: '/', icon: <FaHome /> },
    { path: '/calendar', icon: <FaCalendarAlt /> },
    { path: '/call', icon: <SiGooglemeet /> },
    { path: '/store', icon: <FaAppStore /> },
    { path: '/car', icon: <FaCar /> },
    { path: '/settings', icon: <FaCog /> },
  ];

  return (
    <nav style={styles.sidebar}>
      {routes.map((route, index) => {
        const isActive = location.pathname === route.path;
        const isHovered = hoveredIndex === index;

        return (
          <Link
            to={route.path}
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                ...styles.iconWrapper,
                ...(isActive && styles.iconWrapperActive),
                ...(isHovered && !isActive && styles.iconWrapperHover), // Apply hover style only if not active
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {React.cloneElement(route.icon, {
                style: isActive
                  ? { ...styles.icon, ...styles.iconActive }
                  : styles.icon,
              })}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default Sidebar;
