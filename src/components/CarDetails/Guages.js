import React from "react";
import { useState } from "react";
import "./styles.css";
import ReactSpeedometer from "react-d3-speedometer";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BatteryGauge from "react-battery-gauge";

function Gauge() {
  const [value, setValue] = useState(0); // State for gauge value
  const [color, setColor] = useState("#008000"); // State for dynamic color

    const [charge, setCharge] = useState(60); // Initial battery level state
  
    const handleBatteryChange = (e) => {
      setCharge(Number(e.target.value));
    };

  const handleGaugeValueChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    // Dynamically change color based on value
    if (newValue < 40) {
      setColor("#008000"); // Green for low values
    } else if (newValue < 80) {
      setColor("#FFA500"); // Orange for medium values
    } else {
      setColor("#FF0000"); // Red for high values
    }
  };

  return (
    <div className="center">
      <Container className="p-3">
        <Row>
          <Col>
            <div className="speedometer">
              <ReactSpeedometer
                maxValue={120}
                ringWidth={0}
                customSegmentStops={[
                  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                ]}
                segmentColors={[
                  // color,
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  color, // Dynamic color
                  color, // Dynamic color
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                  "#FAFAFA",
                ]}
                needleTransitionDuration={5000}
                needleTransition="easeElastic"
                currentValueText="Km/h"
                value={value}
              />
            </div>
          </Col>
          {/* <Col>
            <form className="form-settings">
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label
                    className="label"
                    htmlFor="value"
                    style={{ color: "white" }}
                  >
                    Change Gauge Value:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="value"
                    id="value"
                    placeholder="0"
                    onChange={handleGaugeValueChange}
                    value={value}
                  />
                </div>
              </div>
            </form>
          </Col> */}
        </Row>
        {/* <Row>
        <div className="center">
        <BatteryGauge
        value={charge}
        orientation="horizontal" // Set to horizontal
        size={120} // Adjust the length for AAAA battery size
        customization={{
          batteryBody: {
            fill: "#FFFFFF", // Battery background color
            strokeWidth: 1.5, // Slightly bold border for visibility
            cornerRadius: 3,
            width: 12, // Thin gauge width to resemble AAAA size
            stroke: "gray", // Border color for the 3D effect
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))", // Add shadow for subtle 3D effect
          },
          batteryCap: {
            fill: "#FFFFFF",
            cornerRadius: 2,
            width: 5, // Smaller cap to match the AAAA size
            stroke: "gray", // Border for the cap
            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))", // 3D effect for the cap
          },
          batteryMeter: {
            fill: charge > 20 ? "#00FF00" : "#FF0000", // Green for good charge, red for low charge
            lowBatteryValue: 20, // Define the threshold for low battery
            gradient: {
              // Gradient fill for 3D look
              from: charge > 20 ? "#00FF00" : "#FF0000",
              to: charge > 20 ? "#008000" : "#FF0000",
            },
          },
          readingText: {
            style: {
              fill: "#000",
              fontSize: "10px",
              dominantBaseline: "middle",
              textAnchor: "middle",
            },
          },
        }}
      />
      </div>
        </Row> */}
      </Container>
    </div>
  );
};

export default Gauge;
