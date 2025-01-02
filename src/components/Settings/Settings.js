import React, { useState, useEffect } from "react";
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
  Slider,
  MenuItem,
  Select,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { color, styled } from "@mui/system";
import { FiShield, FiActivity, FiBell, FiShare2, FiSettings } from "react-icons/fi";
import { PiSeat } from "react-icons/pi";
import { RiSteering2Fill } from "react-icons/ri";
import { IoColorWandSharp } from "react-icons/io5";
import axios from "axios"; // Import Axios
import { colornames } from "color-name-list"; // Import color-name-list for hex to name conversion

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

const SeatSettings = ({ 
  seatBackAngle, 
  setSeatBackAngle, 
  slidingDistance, 
  setSlidingDistance, 
}) => (
  <StyledPaper>
    <SectionHeader icon={PiSeat} title="Seat Settings" />
    <Box sx={{ mb: 2 }}>
      {/* <Typography gutterBottom>Seat Adjustments</Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Seat Back Angle</Typography> */}
          <TextField
            type="number"
            label="Seat Back Angle"
            value={seatBackAngle}
            onChange={(e) => setSeatBackAngle(e.target.value)}
            inputProps={{
              min: 60,
              max: 170,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={110} // default value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Sliding Distance</Typography> */}
          <TextField
            type="number"
            label="Sliding Distance"
            value={slidingDistance}
            onChange={(e) => setSlidingDistance(e.target.value)}
            inputProps={{
              min: 0,
              max: 160,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={50} // default value
          />
        </Grid>
      </Grid>
    </Box>
  </StyledPaper>
);

const AmbientColorSettings = ({ ambientColor, setAmbientColor, userData }) => {
  
  useEffect(() => {
    if (userData?.preferredColor) {
      setAmbientColor(userData.preferredColor);
    }
  }, [userData, setAmbientColor]);

const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setAmbientColor(newColor);

      // Function to convert hex to color name
const getColorName = (hex) => {
    const closestColor = colornames.find(
      (color) => color.hex.toLowerCase() === hex.toLowerCase()
    );
    return closestColor ? closestColor.name : "Unknown Color";
  };
  // Convert hex to color name
  const colorName = getColorName(newColor);
  console.log(colorName);
  
    try {
      await axios.post("http://192.168.2.129:5000/set_color", {
        "color": colorName,
      });
      console.log(`Color set successfully: ${newColor}`);
    } catch (error) {
      console.error(`Error setting color: ${error}`);
    }
  };

  return (
    <StyledPaper>
      <SectionHeader icon={IoColorWandSharp} title="Ambient Color Settings" />
      <Box>
        <Typography gutterBottom>Ambient Color</Typography>
        <TextField
          type="color"
          value={ambientColor}
          onChange={handleColorChange}
          fullWidth
          size="small"
        />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Set the ambient lighting color for your car.
        </Typography>
      </Box>
    </StyledPaper>
  );
};

const SteeringSettings = ({  //Steering Settings
  steeringHeight, 
  setSteeringHeight, 
  slidingsteeringDistance, 
  setSteeringSlidingDistance 
}) => (
  <StyledPaper>
    <SectionHeader icon={RiSteering2Fill} title="Steering Settings" />
    <Box sx={{ mb: 2 }}>
      {/* <Typography gutterBottom>Steering Adjustments</Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Steering Height</Typography> */}
          <TextField
            type="number"
            label="Steering Height"
            value={steeringHeight}
            onChange={(e) => setSteeringHeight(e.target.value)}
            inputProps={{
              min: 50,
              max: 150,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={10} // default value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Sliding Distance</Typography> */}
          <TextField
            type="number"
            label="Sliding Distance"
            value={slidingsteeringDistance}
            onChange={(e) => setSteeringSlidingDistance(e.target.value)}
            inputProps={{
              min: 0,
              max: 160,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={6} // default value
          />
        </Grid>
      </Grid>
    </Box>
  </StyledPaper>
);


const MirrorSettings = ({ 
  azimuth, 
  setAzimuth, 
  polarAngle, 
  setPolarAngle 
}) => (
  <StyledPaper>
    <SectionHeader icon={FiSettings} title="Mirror Settings" />
    <Box sx={{ mb: 2 }}>
      {/* <Typography gutterBottom>Mirror Adjustments</Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Azimuth</Typography> */}
          <TextField
            type="number"
            label="Azimuth Angle"
            value={azimuth}
            onChange={(e) => setAzimuth(e.target.value)}
            inputProps={{
              min: 0,
              max: 360,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={0} // default value
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="body1">Polar Angle</Typography> */}
          <TextField
            type="number"
            label="Polar Angle"
            value={polarAngle}
            onChange={(e) => setPolarAngle(e.target.value)}
            inputProps={{
              min: -90,
              max: 90,
              step: 1,
            }}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
            }}
            defaultValue={0} // default value
          />
        </Grid>
      </Grid>
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
          <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
          <ListItemSecondaryAction>
            <Switch edge="end" checked={value} onChange={() => handleNotificationChange(key)} />
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
          <ListItemText primary={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} />
          <ListItemSecondaryAction>
            <Checkbox edge="end" checked={value} onChange={() => handleDataSharingChange(key)} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </StyledPaper>
);

const AccountSettings = (userData) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [dataSharing, setDataSharing] = useState({ thirdParty: false, ads: true, profileVisibility: true });
  const [showAlert, setShowAlert] = useState(false);
  const [reclination, setReclination] = useState(45);
  //const [ambientColor, setAmbientColor] = useState("#fff5b6");
  const [seatBackAngle, setSeatBackAngle] = useState('');
  const [slidingDistance, setSlidingDistance] = useState('');
  const [azimuthAngle, setAzimuthAngle] = useState('');
  const [polarAngle, setPolarAngle] = useState('');
  const [ambientColor, setAmbientColor] = useState('');
  const [steeringHeight, setSteeringHeight] = useState('');
  const [slidingsteeringDistance, setSteeringSlidingDistance] = useState('');

  console.log("AccountSettings - userData:", userData);

  // useEffect(() => {
  //   //const userData = localStorage.getItem('userData');
  //   //if (userData) {

  //       console.log("AccountSettings - setting values from userData:", userData);

  //     // Set seat settings
  //     setSeatBackAngle(userData.seatSettings?.seatbackAngle || '');
  //     setSlidingDistance(userData.seatSettings?.slidingDistance || '');
      
  //     // Set mirror settings
  //     setAzimuthAngle(userData.mirrorSettings?.azimuthAngle || '');
  //     setPolarAngle(userData.mirrorSettings?.polarAngle || '');
      
  //     // Set steering settings
  //     setSteeringHeight(userData.steeringSettings?.steeringheight || '');
  //     setSteeringSlidingDistance(userData.steeringSettings?.slidingDistance || '');
      
  //     // Set ambient color
  //     setAmbientColor(userData.preferredColor || '');
  //   //}
  // }, [userData]);

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDataSharingChange = (type) => {
    setDataSharing((prev) => ({ ...prev, [type]: !prev[type] }));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const activities = [
    { action: "Login attempt", date: "2024-12-16", status: "Successful", location: "Hyderabad, IN" },
    { action: "Password changed", date: "2024-12-15", status: "Successful", location: "Hyderabad, IN" },
    { action: "Security settings modified", date: "2024-12-15", status: "Successful", location: "Hyderabad, IN" },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Account Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SeatSettings seatBackAngle={140} setSeatBackAngle={setSeatBackAngle} slidingDistance={21} setSlidingDistance={setSlidingDistance}  userData={userData}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <AmbientColorSettings ambientColor={"#572aa3"} setAmbientColor={setAmbientColor} userData={userData}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <SteeringSettings   steeringHeight={6} setSteeringHeight={setSteeringHeight} slidingsteeringDistance={2} setSteeringSlidingDistance={setSteeringSlidingDistance} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MirrorSettings   azimuth={53} setAzimuth={setAzimuthAngle} polarAngle={31} setPolarAngle={setPolarAngle} />
        </Grid>
        <Grid item xs={12}>
          <SecuritySettings twoFactorEnabled={twoFactorEnabled} setTwoFactorEnabled={setTwoFactorEnabled} />
        </Grid>
        <Grid item xs={12}>
          <RecentActivity activities={activities} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NotificationPreferences notifications={notifications} handleNotificationChange={handleNotificationChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataSharingPreferences dataSharing={dataSharing} handleDataSharingChange={handleDataSharingChange} />
        </Grid>
      </Grid>

      <Collapse in={showAlert}>
        <Alert severity="success" sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
          Settings updated successfully!
        </Alert>
      </Collapse>
    </Box>
  );
};

// const Settings = () => {
//   // Add userData to Settings component
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data when component mounts
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('data/user.json');
//         const userData = response.data;
//         setUserData(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <AccountSettings userData={userData} />
//     </ThemeProvider>
//   );
// };

// const Settings = () => (
//   <ThemeProvider theme={theme}>
//     <AccountSettings />
//   </ThemeProvider>
// );



const Settings = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      // Get user data from localStorage and parse it
      const storedUserData = localStorage.getItem('userData');
      console.log("Raw stored data:", storedUserData);
      
      if (storedUserData) {
        // Parse the stored JSON string
        const parsedData = JSON.parse(storedUserData);
        console.log("Parsed user data:", parsedData);
        
        // Verify the data structure before setting state
        if (parsedData && typeof parsedData === 'object') {
          setUserData(parsedData);
        } else {
          console.error("Invalid user data structure:", parsedData);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Add data structure verification before rendering
  console.log("About to render AccountSettings with userData:", userData);

  return (
    <ThemeProvider theme={theme}>
      <AccountSettings userData={userData} />
    </ThemeProvider>
  );
};




export default Settings;
