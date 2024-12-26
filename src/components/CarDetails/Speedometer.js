import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import Decimal from "decimal.js"; // Import Decimal for precise calculations
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0); // Initial speed value
  const [gear, setGear] = useState("N"); // Initial gear
  const [steeringAngle, setSteeringAngle] = useState(0); // Steering angle
  const [emergencyBrakeStatus, setEmergencyBrakeStatus] = useState(0); // Emergency brake status
  const [networkStatus, setNetworkStatus] = useState("WiFi TiHAN"); // Network status
  const [downloadSpeed, setDownloadSpeed] = useState(new Decimal(0)); // Download speed
  const [obstacleDistance, setObstacleDistance] = useState(new Decimal(0)); // Obstacle distance

  // Placeholder values for other metrics
  const batteryPercentage = 90;
  const tireLifetime = 332; // Assuming this is still needed
  const tireTemperature = 75; // Assuming this is still needed

  useEffect(() => {
    // Function to handle network status toggling
    const updateNetworkStatus = () => {
      let toggle = true;
      const toggleNetwork = () => {
        setNetworkStatus(toggle ? "WiFi" : "5G");
        toggle = !toggle;
        setTimeout(toggleNetwork, toggle ? 60000 : 20000); // 1 min for 5G, 20 sec for WiFi TiHAN
      };
      toggleNetwork();
    };

    updateNetworkStatus(); // Start the network toggling
  }, []);

  // Fetch speed, steering angle, etc. periodically
  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const response = await axios.get("http://192.168.236.37:5001/api/speed");
        if (response.data && response.data.speed) {
          const speedValue = parseInt(response.data.speed.split(":")[1].trim(), 10);
          if (!isNaN(speedValue)) {
            setSpeed(speedValue);
          }
        }
      } catch (error) {
        console.error("Error fetching speed from API:", error.message);
      }
    };
 
    // Fetch steering angle from API periodically
    const fetchSteeringAngle = async () => {
      try {
        const response = await fetch("http://192.168.236.37:5023/api/steer");
        const data = await response.json();
        const steerValue = parseFloat(data.steer.split(': ')[1]);
        console.log("Steering angle fetched:", steerValue); // For debugging
        setSteeringAngle(steerValue); // Update the steering angle state
      } catch (error) {
        console.error("Error fetching steering angle:", error);
      }
    };
 
    // Fetch emergency brake status
    const fetchEmergencyBrakeStatus = async () => {
      try {
        const response = await fetch("http://192.168.236.37:5023/api/emergency");
        const data = await response.json();
        const brakeValue = parseFloat(data.emergency_status.split(': ')[1]);
        setEmergencyBrakeStatus(brakeValue); // Update the emergency brake status state
      } catch (error) {
        console.error("Error fetching emergency brake status:", error);
      }
    };
 
    // Fetch internet speed data (network status and download speed)
    const fetchNetworkStatus = async () => {
      try {
        const response = await fetch("http://192.168.236.37:5023/speedtest");
        const data = await response.json();
        const downloadValue = parseFloat(data.download_speed.split(' ')[0]);
        setDownloadSpeed(new Decimal(downloadValue)); // Set download speed
        setNetworkStatus(downloadValue > 0 ? "Connected" : "Disconnected"); // Update network status based on download speed
      } catch (error) {
        console.error("Error fetching speedtest data:", error);
        setNetworkStatus("Disconnected"); // Set to disconnected on error
      }
    };
 
    // Fetch obstacle distance
    const fetchObstacleDistance = async () => {
      try {
        const response = await fetch("http://192.168.236.37:5023/api/dis");
        const data = await response.json();
        const distanceValue = parseFloat(data.min_dis.split(': ')[1]);
        setObstacleDistance(new Decimal(distanceValue)); // Update obstacle distance
      } catch (error) {
        console.error("Error fetching obstacle distance:", error);
      }
    };
 
    // Fetch speed, steering angle, emergency brake status, network status, and obstacle distance every 2 seconds

    const interval = setInterval(() => {
      fetchSpeed();
    }, 2000);

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













// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios for HTTP requests
// import "./Speedometer.css";

// const Speedometer = () => {
//   const [speed, setSpeed] = useState(0); // Initial speed value
//   const [gear, setGear] = useState("N"); // Initial gear

//   // Placeholder values for other metrics
//   const batteryPercentage = 90;
//   const tirePressure = 35;
//   const tireLifetime = 332;
//   const tireTemperature = 75;

//   // Fetch speed from API periodically
//   useEffect(() => {
//     const fetchSpeed = async () => {
//       try {
//         const response = await axios.get("http://192.168.2.129:5001/api/speed");
//         if (response.data && response.data.speed) {
//           // Extract numeric value from "data: 65"
//           const speedValue = parseInt(response.data.speed.split(":")[1].trim(), 10);
  
//           // Check if the extracted value is a valid number
//           if (!isNaN(speedValue)) {
//             setSpeed(speedValue);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching speed from API:", error.message);
//       }
//     };
  
//     // Fetch speed every 2 seconds
//     const interval = setInterval(fetchSpeed, 2000);
  
//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []);
  
//   return (
//     <div className="dashboard-container">
//       {/* Speedometer */}
//       <div className="speedometer">
//         <svg viewBox="0 0 200 100" className="speedometer-svg">
//           {/* Gradient Arc */}
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
//               <stop offset="50%" style={{ stopColor: "#00bcd4", stopOpacity: 1 }} />
//               <stop offset="100%" style={{ stopColor: "#673ab7", stopOpacity: 1 }} />
//             </linearGradient>
//           </defs>
//           <path
//             d="M10,100 A90,90 0 0,1 190,100"
//             fill="none"
//             stroke="url(#gradient)"
//             strokeWidth="15"
//           />
//           {/* Speed Needle */}
//           <line
//             x1="100"
//             y1="100"
//             x2={100 + 90 * Math.cos((speed / 140) * Math.PI - Math.PI)}
//             y2={100 + 90 * Math.sin((speed / 140) * Math.PI - Math.PI)}
//             stroke="#fff"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />
//         </svg>
//         <div className="speed-display">
//           <h1>{speed}</h1>
//           <p>km/h</p>
//         </div>
//       </div>

//       {/* Information Cards */}
//       <div className="info-container">
//         <div className="info-card">
//           <h4>Obstacle Distance</h4>
//           <p>{batteryPercentage}%</p>
//         </div>
//         <div className="info-card">
//           <h4>Tire Pressure</h4>
//           <p>{tirePressure} psi</p>
//         </div>
//         <div className="info-card">
//           <h4>Emergency Breake</h4>
//           <p>{tireLifetime} days</p>
//         </div>
//         <div className="info-card">
//           <h4>Network Connection</h4>
//           <p>{tireTemperature} ⁰C</p>
//         </div>
//       </div>

//       {/* Gear Selector */}
//       <div className="gear-selector">
//         {["R", "P", "N", "D", "S"].map((g) => (
//           <div
//             key={g}
//             className={`gear ${gear === g ? "active-gear" : ""}`}
//             onClick={() => setGear(g)}
//           >
//             {g}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Speedometer;