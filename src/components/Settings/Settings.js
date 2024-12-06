import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Paper,
  Grid,
  Divider,
  FormControlLabel,
  Tooltip,
  Collapse,
  Alert,
  Slider
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { color, styled } from "@mui/system";
import { FiShield, FiActivity, FiBell, FiShare2, FiSettings, FiHexagon } from "react-icons/fi";


const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to 'dark'
    background: {
      paper: "#1e1e1e", // Define a color for paper background
    },
    text: {
      primary: "#ffffff", // Define primary text color
      secondary: "#aaaaaa", // Define secondary text color
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
    transform: "translateY(-2px)"
  }
}));

// Components
const SectionHeader = ({ icon: Icon, title }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Icon size={24} style={{ marginRight: "12px" ,color:"inherit"}} />
    <Typography variant="h6">{title}</Typography>
  </Box>
);

const SeatSettings = ({ reclination, setReclination }) => (
  <StyledPaper>
    <SectionHeader icon={FiSettings} title="Seat Settings" />
    <Box sx={{ mb: 2 }}>
      <Typography gutterBottom>Reclination</Typography>
      <Tooltip title={`${reclination}°`} arrow>
        <Slider
          value={reclination}
          onChange={(e, newValue) => setReclination(newValue)}
          min={0}
          max={90}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            color:(theme) => theme.palette.primary.main
          }}
        />
      </Tooltip>
      <Typography variant="body2" color="textSecondary">
        Adjust the reclination angle (0° to 90°).
      </Typography>
    </Box>
  </StyledPaper>
);

const AmbientColorSettings = ({ ambientColor, setAmbientColor }) => (
  <StyledPaper>
    <SectionHeader icon={FiHexagon} title="Ambient Color Settings" />
    <Box>
      <Typography gutterBottom>Ambient Color</Typography>
      <TextField
        type="color"
        value={ambientColor}
        onChange={(e) => setAmbientColor(e.target.value)}
        fullWidth
        size="small"
      />
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Set the ambient lighting color for your  car.
      </Typography>
    </Box>
  </StyledPaper>
);

const SecuritySettings = ({ twoFactorEnabled, setTwoFactorEnabled }) => (
  <StyledPaper>
    <SectionHeader icon={FiShield} title="Security Settings" />
    <FormControlLabel
      control={
        <Switch
          checked={twoFactorEnabled}
          onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          color="primary"
        />
      }
      label="Two-Factor Authentication"
    />
    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
      Enable two-factor authentication for enhanced account security.
    </Typography>
  </StyledPaper>
);

const RecentActivity = ({ activities }) => (
  <StyledPaper>
    <SectionHeader icon={FiActivity} title="Recent Activity" />
    <List>
      {activities.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              primary={activity.action}
              secondary={`${activity.date} | ${activity.location}`}
            />
            <ListItemSecondaryAction>
              <Typography color={activity.status === "Successful" ? "success.main" : "error.main"}>
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

const NotificationPreferences = ({ notifications, handleNotificationChange }) => (
  <StyledPaper>
    <SectionHeader icon={FiBell} title="Notification Preferences" />
    <List>
      {Object.entries(notifications).map(([key, value]) => (
        <ListItem key={key} sx={{ px: 0 }}>
          <ListItemText
            primary={key.charAt(0).toUpperCase() + key.slice(1)}
            secondary={`Receive ${key} notifications`}
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={value}
              onChange={() => handleNotificationChange(key)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </StyledPaper>
);

const DataSharingPreferences = ({ dataSharing, handleDataSharingChange }) => (
  <StyledPaper>
    <SectionHeader icon={FiShare2} title="Data Sharing Preferences" />
    <List>
      {Object.entries(dataSharing).map(([key, value]) => (
        <ListItem key={key} sx={{ px: 0 }}>
          <ListItemText
            primary={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            secondary={`Allow ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
          />
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              checked={value}
              onChange={() => handleDataSharingChange(key)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </StyledPaper>
);

const AccountSettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [dataSharing, setDataSharing] = useState({
    thirdParty: false,
    ads: true,
    profileVisibility: true
  });
  const [showAlert, setShowAlert] = useState(false);
  const [reclination, setReclination] = useState(45); // Default reclination angle
  const [ambientColor, setAmbientColor] = useState("#fff5b6"); // Default ambient color

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDataSharingChange = (type) => {
    setDataSharing((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const activities = [
    { action: "Login attempt", date: "2024-12-16", status: "Successful", location: "Hyderabad, IN" },
    { action: "Password changed", date: "2024-12-15", status: "Successful", location: "Hyderabad, IN" },
    { action: "Security settings modified", date: "2024-12-15", status: "Successful", location: "Hyderabad, IN" }
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Account Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SeatSettings reclination={reclination} setReclination={setReclination} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AmbientColorSettings ambientColor={ambientColor} setAmbientColor={setAmbientColor} />
        </Grid>
        <Grid item xs={12}>
          <SecuritySettings
            twoFactorEnabled={twoFactorEnabled}
            setTwoFactorEnabled={setTwoFactorEnabled}
          />
        </Grid>
        <Grid item xs={12}>
          <RecentActivity activities={activities} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NotificationPreferences
            notifications={notifications}
            handleNotificationChange={handleNotificationChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataSharingPreferences
            dataSharing={dataSharing}
            handleDataSharingChange={handleDataSharingChange}
          />
        </Grid>
      </Grid>

      <Collapse in={showAlert}>
        <Alert
          severity="success"
          sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
        >
          Settings updated successfully!
        </Alert>
      </Collapse>
    </Box>
  );
};

const Settings = () => (
  <ThemeProvider theme={theme}>
    <AccountSettings />
  </ThemeProvider>
);


export default Settings;
