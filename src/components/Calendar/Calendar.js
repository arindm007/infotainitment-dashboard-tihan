import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styling
import "./CalendarCustom.css"; // Optional: for custom styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log("Selected date:", selectedDate); // Log the selected date for testing
  };

  return (
    <div style={styles.calendarContainer}>
      <Calendar onChange={onDateChange} value={date} />
      {/* <div style={styles.selectedDate}> */}
        {/* <strong>Selected Date: </strong> {date.toDateString()} */}
      {/* </div> */}
    </div>
  );
};

const styles = {
  calendarContainer: {
    flex: 1,
    minHeight: "100px",
    maxHeight: "400px",
    maxWidth: "300px",
    background: "#2a2a2a",
    color: "white",
    border: "2px solid #444",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  '@media (max-width: 768px)': {
    calendarContainer: {
      maxHeight: '300px',
    },
  },
  title: {
    marginBottom: "10px",
  },
  selectedDate: {
    marginTop: "10px",
    color: "white",
  },
};


export default CalendarComponent;
