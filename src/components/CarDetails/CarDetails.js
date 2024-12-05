// components/Dashboard/CarDetails.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import Speedometer from "./Speedometer";


function Model(props) {
  const { scene } = useGLTF("/car.glb");
  return <primitive object={scene} scale={0.01} {...props} />;
}

function CarDetails() {
  return (
    <div>
      <div style={styles.modelWrapper}>
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 30 }}>
          <ambientLight intensity={1.5} />
          <PresentationControls
            scale={0.3}
            speed={1.5}
            global
            zoom={1}
            polar={[0.2, Math.PI / 4]}
            azimuth={[12, Math.PI / 5]}
          >
            <Stage environment={null}>
              <Model scale={0.3} />
            </Stage>
          </PresentationControls>
        </Canvas> 
        <Speedometer />
      </div>
        <div>
         
        </div>
      
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    // height: "-5px",
    minHeight: "100px",
    maxHeight: "600px",
    padding: "10px",
    color: "white",
    borderRadius: "10px",
  },
  modelWrapper: {
    width: "100%",
    height: "300px", // Adjust height based on your model
    marginBottom: "10px", // Add space between model and text
    minHeight: "100px",
    maxHeight: "300px",
    // background: "linear-gradient(135deg, #333, #1a1a1a)"
  },
  details: {
    color: "white",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default CarDetails;
