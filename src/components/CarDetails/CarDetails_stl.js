// components/Dashboard/CarDetails.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';
import Gauge from './Guages';

function Model(props) {
  const geometry = useLoader(STLLoader, '/EV_Chassis_27Nov2024 v2.stl'); // Load the STL file

  return (
    <mesh geometry={geometry} scale={0.01} {...props}>
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function CarDetails() {
  return (
    <div style={styles.container}>
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
      </div>
      <div style={styles.details}>
        <h2>TiHAN - SOFTWARE DEFINED VEHICLE</h2>
        <h3>T-SIRIUS</h3>
        <p>Fuel: 43% | Battery: 8% | Range: 157km</p>
        <div style={{ width: '100%', height: '200px' }}>
          <Gauge />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '-5px',
    padding: '20px',
    background: '#333',
    color: 'white',
    borderRadius: '10px',
  },
  modelWrapper: {
    width: '100%',
    height: '300px', // Adjust height based on your model
    marginBottom: '20px', // Add space between model and text
  },
  details: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px',
  },
};

export default CarDetails;
