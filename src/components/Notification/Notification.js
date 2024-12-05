import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notification.css";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const NotificationsPane = () => {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false); // Controls "Show All" functionality

  // Fetch notifications from local JSON file
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("data/notifications.json");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  // Toggle showing all notifications
  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className={`notification-pane ${showAll ? "expanded" : ""}`}>
      {/* Header */}
      <div className="notification-header">
        <h6>Notifications</h6>
        <button className="button secondary" onClick={handleMarkAllAsRead}>
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification-item ${notification.read ? "read" : ""}`}
          >
            <div className="notification-icon">
              {notification.type === "maintenance" && <HomeIcon color="primary" />}
              {notification.type === "payment" && <AttachMoneyIcon color="success" />}
              {notification.type === "lease" && <AccessTimeIcon color="warning" />}
            </div>
            <div>
              <h6>{notification.title}</h6>
              <p>{notification.description}</p>
              <small>{notification.timestamp}</small>
            </div>
          </div>
        ))
      ) : (
        <p className="no-notifications">No notifications available.</p>
      )}

      {/* Show All Notifications */}
      <div className="view-all">
        <button className="button" onClick={handleShowAll}>
          {showAll ? "Show Less Notifications" : "Show All Notifications"}
        </button>
      </div>
    </div>
  );
};

export default NotificationsPane;
