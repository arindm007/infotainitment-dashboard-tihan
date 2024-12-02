import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const toggleMode = () => setIsLogin(!isLogin);

  const handleLogin = () => {
    // Add login logic
  };

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
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
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
