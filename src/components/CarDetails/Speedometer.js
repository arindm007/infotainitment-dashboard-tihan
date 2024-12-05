import React, { useState } from "react";
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0); // Initial speed value
  const [gear, setGear] = useState("N"); // Initial gear

  // Placeholder values for other metrics
  const batteryPercentage = 90;
  const tirePressure = 35;
  const tireLifetime = 332;
  const tireTemperature = 75;

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

      {/* Speed Control */}
      <div className="speed-control">
        <button onClick={() => setSpeed((prev) => (prev < 140 ? prev + 10 : 140))}>
          Increase Speed
        </button>
        <button onClick={() => setSpeed((prev) => (prev > 0 ? prev - 10 : 0))}>
          Decrease Speed
        </button>
      </div>
    </div>
  );
};

export default Speedometer;
