import React from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";
import { Typography } from "@mui/material";
import '@syncfusion/ej2-react-schedule/styles/material-dark.css';
import '@syncfusion/ej2-base/styles/material-dark.css';
import '@syncfusion/ej2-buttons/styles/material-dark.css';
import '@syncfusion/ej2-calendars/styles/material-dark.css';
import '@syncfusion/ej2-dropdowns/styles/material-dark.css';
import '@syncfusion/ej2-inputs/styles/material-dark.css';
import '@syncfusion/ej2-lists/styles/material-dark.css';
import '@syncfusion/ej2-navigations/styles/material-dark.css';
import '@syncfusion/ej2-popups/styles/material-dark.css';
import '@syncfusion/ej2-splitbuttons/styles/material-dark.css';

const CalendarScheduler = () => {
    const eventData = [
      {
        Id: 1,
        Subject: "Team Meeting",
        StartTime: new Date(2024, 11, 5, 10, 0),
        EndTime: new Date(2024, 11, 5, 11, 0),
        IsAllDay: false,
      },
      {
        Id: 2,
        Subject: "Client Call",
        StartTime: new Date(2024, 11, 6, 15, 0),
        EndTime: new Date(2024, 11, 6, 16, 0),
        IsAllDay: false,
      },
    ];
  
    return (
      <div className="calendar-container">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Calendar
        </Typography>
        <ScheduleComponent
          height="850px"
          selectedDate={new Date()} // Set the selected date to today
          eventSettings={{ dataSource: eventData }}
          currentView="Week" // Set the default view
          showTimeIndicator={true} // Show the current time indicator
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  };
  
  export default CalendarScheduler;