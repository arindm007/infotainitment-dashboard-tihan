import React from 'react';

const Map = () => {
  return (
    <div style={styles.container}>
      <iframe
        src="/map.html"
        style={styles.iframe}
        title="Realtime Location Tracker"
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    width: '85rem',
    height: '25rem',
    padding: '10px', 
    boxSizing: 'border-box',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '10px',
  },
};

export default Map;


// import React, { useRef, useState, useEffect } from "react";
// import * as atlas from "azure-maps-control";
// import axios from "axios";
// import { FaDirections } from "react-icons/fa";

// const MapWithRoutes = () => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [routeDetails, setRouteDetails] = useState(null);
//   const [liveMarker, setLiveMarker] = useState(null);
//   const [intervalId, setIntervalId] = useState(null);
//   const apiKey = process.env.REACT_APP_AZURE_MAPS_API_KEY;
//   const flaskApiUrl = "http://your-flask-api-url.com/live-location"; // replace with your Flask API URL

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const userLocation = [longitude, latitude];
//         setCurrentLocation(userLocation);

//         if (!mapInstance.current) {
//           mapInstance.current = new atlas.Map(mapRef.current, {
//             center: userLocation,
//             zoom: 12,
//             style: "night",
//             authOptions: {
//               authType: atlas.AuthenticationType.subscriptionKey,
//               subscriptionKey: apiKey,
//             },
//           });
//         }
//       },
//       (error) => {
//         console.error("Error fetching current location:", error);
//         alert("Unable to fetch location. Please enable geolocation.");
//       }
//     );
//   }, [apiKey]);

//   useEffect(() => {
//     const fetchLiveLocation = async () => {
//       try {
//         const response = await axios.get(flaskApiUrl);
//         const liveLocation = response.data;
//         const liveLocationCoordinates = [liveLocation.longitude, liveLocation.latitude];

//         if (liveMarker) {
//           liveMarker.setOptions({ position: liveLocationCoordinates });
//         } else {
//           const marker = new atlas.HtmlMarker({
//             position: liveLocationCoordinates,
//             color: "blue",
//           });
//           mapInstance.current.markers.add(marker);
//           setLiveMarker(marker);
//         }
//       } catch (error) {
//         console.error("Error fetching live location:", error);
//       }
//     };

//     const intervalId = setInterval(fetchLiveLocation, 5000); // fetch live location every 5 seconds
//     setIntervalId(intervalId);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [flaskApiUrl, liveMarker, mapInstance]);
//   const fetchSuggestions = async (searchQuery) => {
//     const url = "https://atlas.microsoft.com/search/address/json";
//     try {
//       const response = await axios.get(url, {
//         params: {
//           "api-version": "1.0",
//           typeahead: true,
//           query: searchQuery,
//           "subscription-key": apiKey,
//         },
//       });
//       setSuggestions(response.data.results);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.length > 2) {
//       fetchSuggestions(value);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionSelect = (suggestion) => {
//     const destinationCoordinates = [
//       suggestion.position.lon,
//       suggestion.position.lat,
//     ];
//     setQuery(suggestion.address.freeformAddress);
//     setSuggestions([]);
//     getRoute(currentLocation, destinationCoordinates);
//   };

//   const moveMarkerAlongRoute = (coordinates) => {
//     if (intervalId) {
//       clearInterval(intervalId);
//     }

//     // Remove existing marker if present
//     if (liveMarker) {
//       mapInstance.current.markers.remove(liveMarker);
//     }

//     const marker = new atlas.HtmlMarker({
//       position: coordinates[0],
//       color: "red",
//     });

//     // Ensure mapInstance.current is available before adding marker
//     if (mapInstance.current) {
//       mapInstance.current.markers.add(marker);
//       setLiveMarker(marker);
//     } else {
//       console.error("Map instance is not initialized.");
//       return;
//     }

//     let index = 0;
//     const speed = 1000; // Move every 1 second

//     const id = setInterval(() => {
//       if (index < coordinates.length) {
//         marker.setOptions({ position: coordinates[index] });
//         index++;
//       } else {
//         clearInterval(id);
//       }
//     }, speed);

//     setIntervalId(id);
//   };

//   const getRoute = async (start, end) => {
//     const url = "https://atlas.microsoft.com/route/directions/json";
//     try {
//       const response = await axios.get(url, {
//         params: {
//           "api-version": "1.0",
//           query: `${start[1]},${start[0]}:${end[1]},${end[0]}`,
//           "subscription-key": apiKey,
//         },
//       });

//       if (response.data.routes && response.data.routes.length > 0) {
//         const route = response.data.routes[0];
//         setRouteDetails(route);

//         const coordinates = route.legs[0].points.map((point) => [
//           point.longitude,
//           point.latitude,
//         ]);

//         const dataSource = new atlas.source.DataSource();
//         const routeLine = new atlas.data.LineString(coordinates);
//         mapInstance.current.sources.add(dataSource);
//         dataSource.add(new atlas.data.Feature(routeLine));

//         const routeLayer = new atlas.layer.LineLayer(dataSource, null, {
//           strokeColor: "#2272B9",
//           strokeWidth: 5,
//         });

//         mapInstance.current.layers.add(routeLayer);
//         mapInstance.current.setCamera({
//           bounds: atlas.data.BoundingBox.fromData(routeLine),
//           padding: 50,
//         });

//         // Move marker along the route
//         moveMarkerAlongRoute(coordinates);
//       } else {
//         console.error("No routes found.");
//         alert("No routes found. Please check your input.");
//       }
//     } catch (error) {
//       console.error("Error fetching the route:", error);
//       alert("An error occurred while fetching the route.");
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, [intervalId]);

//   return (
//     <div style={styles.mapContainer}>
//       <div style={styles.searchContainer}>
//         <div style={styles.inputWrapper}>
//           <input
//             type="text"
//             placeholder="Enter destination"
//             value={query}
//             onChange={handleSearchChange}
//             style={styles.searchInput}
//           />
//           {suggestions.length > 0 && (
//             <ul style={styles.suggestionsList}>
//               {suggestions.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSuggestionSelect(suggestion)}
//                   style={styles.suggestionItem}
//                 >
//                   {suggestion.address.freeformAddress}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <button
//           onClick={() => handleSearchChange({ target: { value: query } })}
//           style={styles.getDirectionsButton}
//         >
//           <FaDirections />
//         </button>
//       </div>

//       <div ref={mapRef} style={styles.mapView}></div>
//     </div>
//   );
// };

// const styles = {
//   mapContainer: {
//     minHeight: "200px",
//     maxHeight: "400px",
//     width: "100%",
//     padding: "10px",
//     background: "#333",
//     color: "black",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     background: "linear-gradient(150deg, #333, #1a1a1a)",
//     boxSizing: "border-box",
//   },
//   '@media (max-width: 768px)': {
//     mapContainer: {
//       minHeight: '150px',
//     },
//   },

//   searchContainer: {
//     display: "flex",
//     justifyContent: "space-around",
//     padding: "10px",
//   },
//   inputWrapper: {
//     position: "relative",
//     width: "60%",
//   },
//   searchInput: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "16px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   suggestionsList: {
//     position: "absolute",
//     top: "100%",
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     zIndex: 1000,
//   },
//   suggestionItem: {
//     padding: "10px",
//     cursor: "pointer",
//     borderBottom: "1px solid #eee",
//   },
//   getDirectionsButton: {
//     padding: "10px 20px",
//     backgroundColor: "#555555",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     fontSize: "16px",
//     cursor: "pointer",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   mapView: {
//     width: "100%",
//     height: "300px",
//     borderRadius: "10px",
//     overflow: "hidden",
//   },
// };

// export default MapWithRoutes;
