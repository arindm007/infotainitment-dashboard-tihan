import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // For API calls
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CarDetails from "./components/CarDetails/CarDetails";
import MusicApp from "./components/MusicPlayer/MusicApp";
import Map from "./components/Map";
import AuthPage from "./components/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';
import VideoCallRoom from './components/VideoCall/VideoCall';
import Store from "./components/Store/Store";

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

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/auth/status/", {
          withCredentials: true, // Ensures cookies are sent for authentication
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
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
              <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />

              {/* Private Routes */}
              <Route
                path="/"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
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
                          <div style={styles.musicContainer}>
                            {/* <MusicApp /> */}
                          </div>
                          <div style={styles.musicContainer}>
                            {/* <MusicApp /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  // </PrivateRoute>
                }
              />
              <Route
                path="/store"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <div>
                     <Store />
                     </div>
                  // </PrivateRoute>
                }
              />
              <Route
                path="/car"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <>
                    </>
                  </PrivateRoute>
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
                path="/calender"
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated}>
                    <>
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
    height: "100vh",
    background: "#1a1a1a",
    overflow: "hidden",
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
