import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = ({ setIsAuthenticated, setUserData }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleMode = () => setIsLogin(!isLogin);

  // const handleLogin = async () => {
  //   // Find user in the mock data
  //   try {
  //     const response = await fetch('data/user.json');
  //     const user = response.data.find(u => u.email === email && u.password === password);
  //     console.log("Fetched user data:", response.data);
  //     if (user) {
  //       setIsAuthenticated(true);
  //       setUserData(user);
  //       // Set ambient color according to user preference
  //       try {
  //         await axios.post("http://192.168.2.129:5000/set_color", {
  //           "color": user.preferredColor
  //         });
  //       } catch (error) {
  //         console.error("Error setting initial color:", error);
  //       }
  //       navigate("/");
  //     } else {
  //       alert("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Login failed");
  //   }
  // };

  const handleLogin = async () => {
    try {
      // Fetch user.json from public/data/
      const response = await fetch('/data/user.json');
  
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON data
      const data = await response.json();
      console.log("Fetched user data:", data);
  
      console.log("Email:", email, "Password:", password);

      // Find the user with matching credentials
      const user = data.find(
        (u) => {
          console.log("Checking user:", JSON.stringify(u));
          return u.email === email && u.password === password;
        }
      );
  
      if (user) {
        console.log("Matching user:", user);
  
        // Authenticate and save user data
        setIsAuthenticated(true);
        setUserData(user);
        localStorage.setItem('userData', JSON.stringify(user));
  
        // Send preferred color to the backend
        // await fetch("http://192.168.2.129:5000/set_color", {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ color: user.preferredColor }),
        // });
  
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRegister = () => {
    // Add register logic
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // Process the credential token on the backend for user authentication
    setIsAuthenticated(true); // Update state
    navigate("/"); // Redirect to home page
};

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "400px",
      padding: "24px",
      color: "white",
      backgroundColor: "#333",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    form: {
      width: "100%",
      color: "white",
    },
    button: {
      marginTop: "16px",
      color: "white",
    },
    divider: {
      margin: "24px 0",
      color: "white",
    },
    toggleText: {
      marginTop: "16px",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>
      <div style={styles.form}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{ style: { color: "white" } }}
        />
        {!isLogin && (
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
          />
        )}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          style={styles.button}
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        <Divider style={styles.divider}>Or</Divider>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
      <Typography style={styles.toggleText}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button onClick={toggleMode} variant="text" style={{ color: "white" }}>
          {isLogin ? "Register" : "Login"}
        </Button>
      </Typography>
    </div>
  );
};

export default AuthPage;
