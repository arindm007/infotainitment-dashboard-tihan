import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // For API calls
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import CarDetails from "./components/CarDetails/CarDetails";
import MusicApp from "./components/MusicPlayer/MusicApp";
import Map from "./components/Map/Map";
import AuthPage from "./components/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';
import VideoCallRoom from './components/VideoCall/VideoCall';
import Store from "./components/Store/Store";
import Categories from "./components/Store/Categories";
import CalendarComponent from "./components/Calendar/Calendar";
import CalendarScheduler from "./components/Calendar/CalendarScheduler";
import Settings from "./components/Settings/Settings";
import { registerLicense } from '@syncfusion/ej2-base';
import NotificationsPane from "./components/Notification/Notification";
import Vehicle from "./components/Vehicle/vehicle";
registerLicense(process.env.REACT_APP_syncfusion_License_key);


// ---------google-oauth-----------
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Replace with your actual Client ID
console.log(CLIENT_ID);

// // --------video call--------
// const randomID = (len = 5) => {
//   const chars =
//     '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
//   return Array(len)
//     .fill(0)
//     .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
//     .join('');
// };


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("");
  // Check authentication status on mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  }, []);


  //------------video call----------------
  // const roomID = new URLSearchParams(window.location.search).get('roomID') || randomID();
  // const userID = randomID();
  // const userName = `user_${randomID()}`;

  return (
    
    <Router>
      <div style={styles.dashboard}>
        <Sidebar isAuthenticated={isAuthenticated} />
        <div style={styles.mainContent}>
          <Header />
          <div style={styles.contentContainer}>
            <Routes>
              {/* Public Route */}
              <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} setUserData={setUserData}/>} />

              {/* Private Routes */}
              <Route
                path="/"
                element={
                  //<PrivateRoute isAuthenticated={isAuthenticated}>
                    <div style={styles.homeContainer}>
                      <div style={styles.carContainer}>
                        <CarDetails />
                      </div>
                      <div style={styles.rightSection}>
                        <div style={styles.mapContainer}>
                          <Map />
                        </div>
                        <div style={styles.rightLowerSection}>
                          <div style={styles.musicContainer}>
                            <MusicApp />
                          </div>
                          <div>
                            {/* Calender Component here */}
                            <CalendarComponent />
                          </div>    
                          {/* <div style={styles.NotificationsPane}> */}
                            {/* notification componen here */}
                           <NotificationsPane />
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  //</PrivateRoute>
                }
              />
              <Route
                path="/store"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Categories />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/store/:category"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Store />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/car"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Vehicle />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/call"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <>
                     <VideoCallRoom />
                    </>
                  // </PrivateRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <>
                    <CalendarScheduler />
                    </>
                  // </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <>
                    <Settings />
                    </>
                  // </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  dashboard: {
    display: "flex",
    height: "100vh", // Full viewport height
    width: "100vw",  // Full viewport width
    background: "#1a1a1a",
    overflow: "auto", // Prevent scrolling
    flexDirection: "row",
  },
  details: {
    color: "white",
    textAlign: "center",
    marginBottom: "20px",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    gap: "10px",
    padding: "20px",
    flexWrap: "wrap",
    overflow:"auto"
  },
  homeContainer: {
    display: "flex",
    flex: 1,
    gap: "10px",
    flexWrap: "wrap",
  },
  carContainer: {
    flex: 0.4,
    minHeight: "200px",
    maxHeight: "800px",
    background: "#333",
    color: "white",
    border: "2px solid #444",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    minWidth: "300px",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    // overflow:"hidden",
    flex: 1,
    minWidth: "300px",
  },
  rightLowerSection: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flex: 1,
    minWidth: "300px",
  },
  musicContainer: {
    flex: 1,
    minHeight: "100px",
    maxHeight: "400px",
    minWidth: "300px",
    maxWidth: "600px",
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
  NotificationsPane: {
    flex: 1,
    // minHeight: "100px",
    maxHeight: "600px",
    maxWidth: "600px",
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
  mapContainer: {
    flex: 1,
    minHeight: "300px",
    maxHeight: "560px",
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
};

// export default App;

const Root = () => (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);

export default Root;
