import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import Decimal from "decimal.js"; // Import Decimal for precise calculations
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0); // Initial speed value
  const [gear, setGear] = useState("N"); // Initial gear
  const [steeringAngle, setSteeringAngle] = useState(0); // Steering angle
  const [emergencyBrakeStatus, setEmergencyBrakeStatus] = useState(0); // Emergency brake status
  const [networkStatus, setNetworkStatus] = useState("WiFi"); // Network status (starts with WiFi)
  const [downloadSpeed, setDownloadSpeed] = useState(new Decimal(0)); // Download speed
  const [obstacleDistance, setObstacleDistance] = useState(new Decimal(0)); // Obstacle distance

  // Placeholder values for other metrics
  const batteryPercentage = 90;
  const tireLifetime = 332; // Assuming this is still needed
  const tireTemperature = 75; // Assuming this is still needed

  // Function to toggle network status
  const toggleNetworkStatus = () => {
    let toggle = true;
    const toggleNetwork = () => {
      if (toggle) {
        setNetworkStatus("WiFi"); // Set network to WiFi
      } else {
        setNetworkStatus("5G"); // Set network to 5G
      }
      toggle = !toggle;
    };

    // Start by setting WiFi for 40 seconds, then switch to 5G for 2 minutes
    const intervalId = setInterval(() => {
      toggleNetwork();
    }, 40000); // Change every 40 seconds between WiFi and 5G
    setTimeout(() => {
      clearInterval(intervalId); // Clear the interval after 2 minutes
      setTimeout(toggleNetwork, 120000); // Switch to WiFi after 2 minutes (120000 ms)
    }, 120000); // Reset the cycle after 2 minutes
  };

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get("http://127.0.0.1:5001/api/speed"),
        axios.get("http://127.0.0.1:5001/api/steer"),
        axios.get("http://127.0.0.1:5001/api/emergency"),
        // axios.get("http://127.0.0.1:5023/speedtest"),
        axios.get("http://127.0.0.1:5001/api/dis")
      ]);

      // Handle Speed Response
      const speedValue = parseInt(responses[0].data.speed.split(":")[1].trim(), 10);
      if (!isNaN(speedValue)) {
        setSpeed(speedValue);
      }

      // Handle Steering Angle Response
      const steerValue = parseFloat(responses[1].data.steer.split(": ")[1]);
      setSteeringAngle(steerValue);

      // Handle Emergency Brake Status Response
      const brakeValue = parseFloat(responses[2].data.emergency_status.split(": ")[1]);
      setEmergencyBrakeStatus(brakeValue);

      // Handle Network Speed Response
      const downloadValue = parseFloat(responses[3].data.download_speed.split(' ')[0]);
      setDownloadSpeed(new Decimal(downloadValue));

      // Handle Obstacle Distance Response
      const distanceValue = parseFloat(responses[4].data.min_dis.split(": ")[1]);
      setObstacleDistance(new Decimal(distanceValue));

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Fetch speed and other metrics every 2 seconds
  useEffect(() => {
    // Start toggling the network status
    toggleNetworkStatus();

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every  1seconds
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run once on mount

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
          <h4>Obstacle Distance</h4>
          <p>{obstacleDistance.toFixed(2)} meters</p>
        </div>
        <div className="info-card">
          <h4>Steering Angle</h4>
          <p>{steeringAngle}°</p>
        </div>
        <div className="info-card">
          <h4>Emergency Brake</h4>
          <p>{emergencyBrakeStatus ? "Engaged" : "Released"}</p>
        </div>
        <div className="info-card">
          <h4>Network Status</h4>
          <p>{networkStatus}</p>
        </div>
      </div>

      {/* Gear Selector */}
      <div className="gear-selector">
        {["R", "N", "F"].map((g) => (
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
