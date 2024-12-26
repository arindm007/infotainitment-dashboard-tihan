// components/Dashboard/CarDetails.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { FaSyncAlt } from "react-icons/fa"; // Import the refresh icon
import Speedometer from "./Speedometer";

function Model(props) {
  const { scene } = useGLTF("/car.glb");
  return <primitive object={scene} scale={0.01} {...props} />;
}

function CarDetails() {
  const handleRefresh = () => {
    // Refresh functionality (if needed)
    console.log("Refreshing...");
  };

  return (
    <div>
      <div style={styles.modelWrapper}>
        <div style={styles.titleWrapper}>
          <h1 style={styles.title}>T-SIRIUS: TiHAN SOFTWARE DEFINED VEHICLE</h1>
          {/* <FaSyncAlt style={styles.refreshIcon} onClick={handleRefresh} /> */}
        </div>
        <Speedometer />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100px",
    maxHeight: "900px",
    padding: "5px",
    color: "white",
    borderRadius: "10px",
  },
  modelWrapper: {
    width: "100%",
    height: "900px", // Adjust height based on your model
    marginBottom: "10px", // Add space between model and text
    minHeight: "100px",
    maxHeight: "700px",
    position: "relative", // Added for absolute positioning of refresh icon
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px", // Space between title and icon
    color: "white",
    marginBottom: "20px",
   
    position: "relative",
  },
  title: {
    fontSize: "23px",
    fontWeight: "bold",
    textAlign: "center"
  },
  refreshIcon: {
    fontSize: "20px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    position: "absolute",
    right: "1px", // Push the icon to the right corner
    top: "50%", // Center vertically
    transform: "translateY(-50%)", // Adjust for vertical alignment
  },
};

export default CarDetails;
