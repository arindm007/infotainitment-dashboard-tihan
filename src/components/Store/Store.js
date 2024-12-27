import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";

const Store = () => {
  const { category } = useParams();
  const [apps, setApps] = useState([]);
  const [installedFeatures, setInstalledFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFeature, setLoadingFeature] = useState("");
  const [loadingAction, setLoadingAction] = useState(""); // "Installing" or "Uninstalling"

  // Load installed features from localStorage on component mount
  useEffect(() => {
    const installed = JSON.parse(localStorage.getItem("installedFeatures")) || [];
    setInstalledFeatures(installed);
  }, []);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setApps(data))
      .catch((error) => console.error("Error fetching apps data:", error));
  }, []);

  // Handle Install with 10-second Loading
  const handleInstallFeature = (featureName) => {
    setIsLoading(true);
    setLoadingFeature(featureName);
    setLoadingAction("Installing");

    if (featureName === "Livox 2.0.0") {
      fetch('http://127.0.0.1:5000/install-livox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'install' })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const updatedInstalledFeatures = [...installedFeatures, featureName];
          setInstalledFeatures(updatedInstalledFeatures);
          localStorage.setItem("installedFeatures", JSON.stringify(updatedInstalledFeatures));
  
          // Wait for the process to finish, then show the alert after 10 seconds
          setTimeout(() => {
            // Hide loading screen
            setIsLoading(false);
            setLoadingFeature("");
            setLoadingAction("");
  
            // Show alert after 10 seconds
            alert(`${featureName} installed successfully! Script execution completed: ${data.message}`);
            window.location.reload(); // Reload to update the sidebar
          }, 10000); // Delay alert and reload for 10 seconds
        } else {
          alert(`Error during ${featureName} installation: ${data.error}`);
          setIsLoading(false); // Hide loading on error
        }
      })
      .catch(error => {
        alert(`Failed to execute installation script: ${error.message}`);
        setIsLoading(false); // Hide loading on error
      });
    } else {
      // Simulate a 10-second installation process for other features
      setTimeout(() => {
        const updatedInstalledFeatures = [...installedFeatures, featureName];
        setInstalledFeatures(updatedInstalledFeatures);
        localStorage.setItem("installedFeatures", JSON.stringify(updatedInstalledFeatures));
  
        // Wait for 10 seconds before showing the alert and reloading the page
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen
  
          // Show alert after 10 seconds
          alert(`${featureName} installed successfully!`);
          window.location.reload(); // Reload to update the sidebar
        }, 8000); // Delay alert and reload for 10 seconds
      }, 8000); // Initial delay for the installation simulation
    }

    // Simulate a 10-second installation process
    // setTimeout(() => {
    //   const updatedInstalledFeatures = [...installedFeatures, featureName];
    //   setInstalledFeatures(updatedInstalledFeatures);
    //   localStorage.setItem("installedFeatures", JSON.stringify(updatedInstalledFeatures));
    //   setIsLoading(false);
    //   setLoadingFeature("");
    //   setLoadingAction("");
    //   alert(`${featureName} installed successfully!`);
    //   window.location.reload(); // Reload to update the sidebar
    // }, 10000); // 10 seconds
  };

  // Handle Uninstall with 4-second Loading
  const handleUninstallFeature = (featureName) => {
    setIsLoading(true);
    setLoadingFeature(featureName);
    setLoadingAction("Uninstalling");

    // Simulate a 4-second uninstallation process
    setTimeout(() => {
      const updatedInstalledFeatures = installedFeatures.filter((name) => name !== featureName);
      setInstalledFeatures(updatedInstalledFeatures);
      localStorage.setItem("installedFeatures", JSON.stringify(updatedInstalledFeatures));
      setIsLoading(false);
      setLoadingFeature("");
      setLoadingAction("");
      alert(`${featureName} uninstalled successfully!`);
      window.location.reload(); // Reload to update the sidebar
    }, 4000); // 4 seconds
  };

  // Filter apps based on category
  const filteredApps = category
    ? apps.filter((app) => app.category === category)
    : apps;

  return (
    <div className="store">
      <h2>{category ? `Apps in ${category}` : "Our Recommendation for You"}</h2>
      <p>{category ? `Favourite ${category} in 2024` : "Favourite design apps in 2024"}</p>

      {/* Splash Screen / Loading Bar */}
      {isLoading && (
        <div className="loading-screen">
          <h3>{loadingAction} {loadingFeature}...</h3>
          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ animationDuration: loadingAction === "Installing" ? "10s" : "4s" }}
            ></div>
          </div>
        </div>
      )}

      <div className="store-grid">
        {filteredApps.map((app) => (
          <div className="store-card" key={app.id}>
            <h3>{app.name}</h3>
            <p className="category">{app.category}</p>
            <p className={`status ${app.status === "under development" ? "under-dev" : "available"}`}>
              {app.status === "under development" ? "Under Development" : "Available"}
            </p>
            {app.likes && <span className="badge">{app.likes}</span>}
            <p>
              <strong>Downloads:</strong> {app.downloads}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {app.rating}
            </p>
            <p className="description">{app.description}</p>

            {/* Show Install or Uninstall button based on installation status and app availability */}
            {app.status === "under development" ? (
              <button className="button disabled" disabled>
                Coming Soon
              </button>
            ) : installedFeatures.includes(app.name) ? (
              <button onClick={() => handleUninstallFeature(app.name)} className="button secondary">
                Uninstall
              </button>
            ) : (
              <button onClick={() => handleInstallFeature(app.name)} className="button">
                Install
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
