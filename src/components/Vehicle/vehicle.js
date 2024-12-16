import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Divider,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { FaCircleInfo } from "react-icons/fa6";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

// Styled component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  color: theme.palette.text.primary,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

// Components
const SectionHeader = ({ icon: Icon, title }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Icon size={24} style={{ marginRight: "12px", color: "inherit" }} />
    <Typography variant="h6">{title}</Typography>
  </Box>
);

const RecentActivity = ({ activities }) => (
  <StyledPaper>
    <SectionHeader icon={FaCircleInfo} title="Vehicle Information" />
    <List>
      {activities.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              primary={activity.action}
              secondary={`${activity.data} | ${activity.location}`}
            />
            <ListItemSecondaryAction>
              <Typography
                color={activity.status === "Active" ? "success.main" : "error.main"}
              >
                {activity.status}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          {index < activities.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </StyledPaper>
);

const activities = [
  { action: "Vehicle class and category", data: "Battery Electric Vehicle (BEV)", status: "Active", location: "" },
  { action: "Pollution Under Control certificate", data: "2025-12-15", status: "Active", location: "Hyderabad, IN" },
  { action: "Road tax details", data: "2025-12-15", status: "Active", location: "Hyderabad, IN" },
  { action: "Vehicle details", data: "Pixkit-2", status: "Active", location: "Hyderabad, IN" },
  { action: "Insurance info", data: "210056000123", status: "Active", location: "Hyderabad, IN" },
  { action: "Vehicle registration number", data: "TIHAN IITH PIX 1", status: "Active", location: "Hyderabad, IN" },
  { action: "Make and model", data: "2024-12-15 | PIXKIT2.0 | pixmoving", status: "Active", location: "Hyderabad, IN" },
  { action: "Chassis number", data: "XXXX-XXXX-2197", status: "Active", location: "Hyderabad, IN" },
];

const VehicleDetails = () => {
  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "center",
        alignItems: "flex-start",
        width: "60vw", // Use viewport width
        minHeight: "100vh", // Full viewport height
        padding: "16px",
        boxSizing: "border-box", // Include padding in dimensions
        overflowX: "hidden", // Avoid horizontal scrolling
      }}
    >
      <RecentActivity activities={activities} />
    </Box>
  );
};

const Vehicle = () => (
  <ThemeProvider theme={theme}>
    <VehicleDetails />
  </ThemeProvider>
);

export default Vehicle;
