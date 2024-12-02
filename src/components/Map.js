import React, { useRef, useState, useEffect } from "react";
import * as atlas from "azure-maps-control";
import axios from "axios";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { FaDirections } from 'react-icons/fa';
const MapWithRoutes = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [routeDetails, setRouteDetails] = useState(null);
  const apiKey = process.env.REACT_APP_AZURE_MAPS_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = [longitude, latitude];
        setCurrentLocation(userLocation);

        if (!mapInstance.current) {
          mapInstance.current = new atlas.Map(mapRef.current, {
            center: userLocation,
            zoom: 12,
            style: "night",
            authOptions: {
              authType: atlas.AuthenticationType.subscriptionKey,
              subscriptionKey: apiKey,
            },
            enableAccessibility: false,
            keyboardInteractionEnabled: false,
            showLogo: false,
            showFeedbackLink: false,
            attributionControl: {
              compact: true,
            },
          });
        }
      },
      (error) => {
        console.error("Error fetching current location:", error);
        alert("Unable to fetch location. Please enable geolocation.");
      }
    );
  }, [apiKey]);

  const fetchSuggestions = async (searchQuery) => {
    const url = "https://atlas.microsoft.com/search/address/json";
    try {
      const response = await axios.get(url, {
        params: {
          "api-version": "1.0",
          typeahead: true,
          query: searchQuery,
          "subscription-key": apiKey,
        },
      });
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const destinationCoordinates = [
      suggestion.position.lon,
      suggestion.position.lat,
    ];
    setQuery(suggestion.address.freeformAddress);
    setSuggestions([]);
    getRoute(currentLocation, destinationCoordinates);
  };

  const getRoute = async (start, end) => {
    const url = "https://atlas.microsoft.com/route/directions/json";
    try {
      const response = await axios.get(url, {
        params: {
          "api-version": "1.0",
          query: `${start[1]},${start[0]}:${end[1]},${end[0]}`,
          "subscription-key": apiKey,
        },
      });

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        setRouteDetails(route);

        const coordinates = route.legs[0].points.map((point) => [
          point.longitude,
          point.latitude,
        ]);

        const dataSource = new atlas.source.DataSource();
        const routeLine = new atlas.data.LineString(coordinates);
        mapInstance.current.sources.add(dataSource);
        dataSource.add(new atlas.data.Feature(routeLine));

        const routeLayer = new atlas.layer.LineLayer(dataSource, null, {
          strokeColor: "#2272B9",
          strokeWidth: 5,
        });

        mapInstance.current.layers.add(routeLayer);
        mapInstance.current.setCamera({
          bounds: atlas.data.BoundingBox.fromData(routeLine),
          padding: 50,
        });
      } else {
        console.error("No routes found.");
        alert("No routes found. Please check your input.");
      }
    } catch (error) {
      console.error("Error fetching the route:", error);
      alert("An error occurred while fetching the route.");
    }
  };

  return (
    <div style={styles.mapContainer}>
      <div style={styles.searchContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter destination"
            value={query}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
          {suggestions.length > 0 && (
            <ul style={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  style={styles.suggestionItem}
                >
                  {suggestion.address.freeformAddress}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => handleSearchChange({ target: { value: query } })}
          style={styles.getDirectionsButton}
        >
           <FaDirections />
        </button>
      </div>

      <div ref={mapRef} style={styles.mapView}></div>

      {/* {routeDetails && (
        <div style={styles.routeDetails}>
          <h3>Route Details</h3>
          <p>
            <strong>Distance:</strong> {(routeDetails.summary.lengthInMeters / 1000).toFixed(2)} km
          </p>
          <p>
            <strong>Estimated Time:</strong> {(routeDetails.summary.travelTimeInSeconds / 60).toFixed(2)} minutes
          </p>
        </div>
      )} */}
    </div>
  );
};

const styles = {
  mapContainer: {
    minHeight: "200px",
    maxHeight: "400px",
    width: '100%',
    padding: "10px",
    background: "#333",
    color: "black",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(150deg, #333, #333,, #1a1a1a)",
    boxsizing: "border-box",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
  },
  inputWrapper: {
    position: "relative",
    width: "60%",
  },
  searchInput: {
    width: "120%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    listStyle: "none",
    padding: 0,
    margin: 0,
    zIndex: 1000,
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  getDirectionsButton: {
    padding: "10px 20px",
    backgroundColor: "#555555",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  mapView: {
    width: "100%",
    height: "300px",
    // marginTop: "10px",
    borderRadius:"10px",
    overflow:"hidden"
    

  },
  routeDetails: {
    padding: "10px",
    backgroundColor: "#333333",
    border: "1px solid #ccc",
    color: "#FAFAFA",
  },
};

export default MapWithRoutes;