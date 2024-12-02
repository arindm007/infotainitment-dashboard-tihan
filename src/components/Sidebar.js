import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaHome, FaCar, FaPhone, FaCalendarAlt, FaCog, FaAppStore } from 'react-icons/fa';

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
  iconWrapperHover: {
    backgroundColor: '#d6d6d6',
  },
  icon: {
    color: '#fff',
    fontSize: '1.5rem',
  },
};

function Sidebar() {
  const routes = [
    { path: '/', icon: <FaHome /> },
    { path: '/car', icon: <FaCar /> },
    { path: '/phone', icon: <FaPhone /> },
    { path: '/calendar', icon: <FaCalendarAlt /> },
    { path: '/settings', icon: <FaCog /> },
    { path: '/store', icon: <FaAppStore /> },
  ];

  return (
    <nav style={styles.sidebar}>
      {routes.map((route, index) => (
        <Link
          to={route.path}
          key={index}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={styles.iconWrapper}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.iconWrapperHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.iconWrapper.backgroundColor)}
          >
            {React.cloneElement(route.icon, { style: styles.icon })}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
