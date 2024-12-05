import React, { useState } from "react";
import "./Settings.css";

const CarDashboardSettings = () => {
  const [userProfile, setUserProfile] = useState("Default User");
  const [seatHeight, setSeatHeight] = useState(50);
  const [seatReclination, setSeatReclination] = useState(0);
  const [climateTemp, setClimateTemp] = useState(22);
  const [lighting, setLighting] = useState("Cool White");

  return (
    <div className="settings-container">
      {/* Header Section */}
      <div className="header">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/50"
            alt="User"
            className="user-avatar"
          />
          <div>
            <h2>{userProfile}</h2>
            <p>Car Dashboard Settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Recommended Settings */}
        <div className="section">
          <h3>Recommended Settings</h3>
          <div className="settings-options">
            <button>Seat Adjustment</button>
            <button>Climate Control</button>
            <button>Ambient Lighting</button>
          </div>
        </div>

        {/* Seat Adjustment Section */}
        <div className="section">
          <h3>Seat Adjustment</h3>
          <div className="control">
            <label>Seat Height: {seatHeight} cm</label>
            <input
              type="range"
              min="0"
              max="100"
              value={seatHeight}
              onChange={(e) => setSeatHeight(e.target.value)}
            />
          </div>
          <div className="control">
            <label>Reclination: {seatReclination}°</label>
            <input
              type="range"
              min="-10"
              max="30"
              value={seatReclination}
              onChange={(e) => setSeatReclination(e.target.value)}
            />
          </div>
        </div>

        {/* Climate Control Section */}
        <div className="section">
          <h3>Climate Control</h3>
          <div className="control">
            <label>Temperature: {climateTemp}°C</label>
            <input
              type="number"
              value={climateTemp}
              min="16"
              max="30"
              onChange={(e) => setClimateTemp(e.target.value)}
            />
          </div>
        </div>

        {/* Lighting Section */}
        <div className="section">
          <h3>Ambient Lighting</h3>
          <select
            value={lighting}
            onChange={(e) => setLighting(e.target.value)}
          >
            <option value="Cool White">Cool White</option>
            <option value="Warm White">Warm White</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarDashboardSettings;
