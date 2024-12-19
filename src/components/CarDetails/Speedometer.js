import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0); // Initial speed value
  const [gear, setGear] = useState("N"); // Initial gear

  // Placeholder values for other metrics
  const batteryPercentage = 90;
  const tirePressure = 35;
  const tireLifetime = 332;
  const tireTemperature = 75;

  // Fetch speed from API periodically
  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const response = await axios.get("http://192.168.2.129:5001/api/speed");
        if (response.data && response.data.speed) {
          // Extract numeric value from "data: 65"
          const speedValue = parseInt(response.data.speed.split(":")[1].trim(), 10);
  
          // Check if the extracted value is a valid number
          if (!isNaN(speedValue)) {
            setSpeed(speedValue);
          }
        }
      } catch (error) {
        console.error("Error fetching speed from API:", error.message);
      }
    };
  
    // Fetch speed every 2 seconds
    const interval = setInterval(fetchSpeed, 2000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="dashboard-container">
      {/* Speedometer */}
      <div className="speedometer">
        <svg viewBox="0 0 200 100" className="speedometer-svg">
          {/* Gradient Arc */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#00bcd4", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#673ab7", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M10,100 A90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="15"
          />
          {/* Speed Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos((speed / 140) * Math.PI - Math.PI)}
            y2={100 + 90 * Math.sin((speed / 140) * Math.PI - Math.PI)}
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="speed-display">
          <h1>{speed}</h1>
          <p>km/h</p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="info-container">
        <div className="info-card">
          <h4>Battery Percentage</h4>
          <p>{batteryPercentage}%</p>
        </div>
        <div className="info-card">
          <h4>Tire Pressure</h4>
          <p>{tirePressure} psi</p>
        </div>
        <div className="info-card">
          <h4>Tyre Total Lifetime</h4>
          <p>{tireLifetime} days</p>
        </div>
        <div className="info-card">
          <h4>Tire Temperature</h4>
          <p>{tireTemperature} ⁰C</p>
        </div>
      </div>

      {/* Gear Selector */}
      <div className="gear-selector">
        {["R", "P", "N", "D", "S"].map((g) => (
          <div
            key={g}
            className={`gear ${gear === g ? "active-gear" : ""}`}
            onClick={() => setGear(g)}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speedometer;
