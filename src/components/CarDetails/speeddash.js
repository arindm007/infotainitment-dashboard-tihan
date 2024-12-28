import React, { useState, useEffect } from "react";
import axios from "axios";
import Decimal from "decimal.js";
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState("N");
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [emergencyBrakeStatus, setEmergencyBrakeStatus] = useState(0);
  const [networkStatus, setNetworkStatus] = useState("WiFi");
  const [downloadSpeed, setDownloadSpeed] = useState(new Decimal(0));
  const [obstacleDistance, setObstacleDistance] = useState(new Decimal(0));

  // Fallback values for state
  const FALLBACK_VALUES = {
    speed: 0,
    steeringAngle: 0,
    emergencyBrakeStatus: 0,
    downloadSpeed: new Decimal(0),
    obstacleDistance: new Decimal(0),
  };

  // Retry mechanism for API calls
  const fetchWithRetry = async (url, fallbackValue, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.warn(`Retrying... (${i + 1}/${retries})`);
        if (i === retries - 1) {
          console.error(`Failed to fetch data from ${url}:`, error.message);
          return fallbackValue;
        }
      }
    }
  };

  // Fetch data periodically
  useEffect(() => {
    const fetchData = async () => {
      // Fetch speed
      const speedData = await fetchWithRetry(
        "http://127.0.0.1:5001/api/speed",
        FALLBACK_VALUES.speed
      );
      if (speedData && speedData.speed) {
        const speedValue = parseInt(speedData.speed.split(":")[1].trim(), 10);
        if (!isNaN(speedValue)) setSpeed(speedValue);
      }

      // Fetch steering angle
      if (gear === "F") {
        const randomSteer = (Math.random() * 14) - 6; // Random between -6 and +8
        setSteeringAngle(randomSteer.toFixed(2));
      } else {
        const steerData = await fetchWithRetry(
          "http://127.0.0.1:5001/api/steer",
          FALLBACK_VALUES.steeringAngle
        );
        if (steerData && steerData.steer) {
          const steerValue = parseFloat(steerData.steer.split(": ")[1]);
          setSteeringAngle(steerValue);
        }
      }

      // Fetch emergency brake status
      const brakeData = await fetchWithRetry(
        "http://127.0.0.1:5001/api/emergency",
        FALLBACK_VALUES.emergencyBrakeStatus
      );
      if (brakeData && brakeData.emergency_status) {
        const brakeValue = parseFloat(brakeData.emergency_status.split(": ")[1]);
        setEmergencyBrakeStatus(brakeValue);
      }

      // Fetch network status
      const networkData = await fetchWithRetry(
        "http://127.0.0.1:5023/speedtest",
        FALLBACK_VALUES.downloadSpeed
      );
      if (networkData && networkData.download_speed) {
        const downloadValue = parseFloat(
          networkData.download_speed.split(" ")[0]
        );
        setDownloadSpeed(new Decimal(downloadValue));
      }

      // Fetch obstacle distance
      if (gear === "F") {
        const randomDistance = (Math.random() * 14) + 1; // Random between 1 and 15
        setObstacleDistance(new Decimal(randomDistance.toFixed(2)));
      } else {
        const distanceData = await fetchWithRetry(
          "http://127.0.0.1:5001/api/dis",
          FALLBACK_VALUES.obstacleDistance
        );
        if (distanceData && distanceData.min_dis) {
          const distanceValue = parseFloat(distanceData.min_dis.split(": ")[1]);
          setObstacleDistance(new Decimal(distanceValue));
        }
      }
    };

    // Fetch data every 2 seconds
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [gear]);

  // Handle stop condition when obstacle is within 5 meters
  useEffect(() => {
    if (obstacleDistance <= 5) {
      setSpeed(0);
      setEmergencyBrakeStatus(1); // Engage emergency brake
      console.warn("Vehicle stopped due to obstacle within 5 meters.");
    }
  }, [obstacleDistance]);

  // Toggle network status
  useEffect(() => {
    const toggleNetworkStatus = () => {
      let toggle = true;
      const toggleNetwork = () => {
        setNetworkStatus(toggle ? "WiFi" : "5G");
        toggle = !toggle;
      };

      const intervalId = setInterval(toggleNetwork, 40000);
      setTimeout(() => {
        clearInterval(intervalId);
        setTimeout(toggleNetwork, 120000);
      }, 120000);
    };

    toggleNetworkStatus();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Speedometer */}
      <div className="speedometer">
        <svg viewBox="0 0 200 100" className="speedometer-svg">
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
