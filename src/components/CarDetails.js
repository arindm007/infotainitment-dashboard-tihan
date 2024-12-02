// components/Dashboard/CarDetails.js
import React from 'react';

function CarDetails() {
  return (
    <div style={styles.container}>
      <h2>Genesis G80 Hybrid</h2>
      <p>Fuel: 43% | Battery: 8% | Range: 157km</p>
      <div>Speed: 66 km/h</div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    background: '#333',
    color: 'white',
    borderRadius: '10px',
  },
};

export default CarDetails;
