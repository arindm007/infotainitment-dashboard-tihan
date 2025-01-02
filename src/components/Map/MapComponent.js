import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapComponent = () => {
  useEffect(() => {
    // Map initialization
    var map = L.map('map').setView([14.0860746, 100.608406], 6);

    // OSM layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    // Satellite layer
    var satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
    });

    document.getElementById('satelliteViewBtn').addEventListener('click', function () {
      if (map.hasLayer(osm)) {
        map.removeLayer(osm);
        map.addLayer(satellite);
      } else {
        map.removeLayer(satellite);
        map.addLayer(osm);
      }
    });

    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
      var watchID = navigator.geolocation.watchPosition(updatePosition, showError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    }

    var marker, circle, secondMarker, routeControl, pathLine;
    var pathCoordinates = [];

    function updatePosition(position) {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var accuracy = position.coords.accuracy

      if (marker) {
        marker.setLatLng([lat, long]);
      } else {
        marker = L.marker([lat, long]).addTo(map);
      }

      if (circle) {
        circle.setLatLng([lat, long]).setRadius(40);
      } else {
        circle = L.circle([lat, long], { radius: 40 }).addTo(map);
        circle.on('click', function() {
          map.setView([lat, long], 18);
        });
      }

      // Update path coordinates and polyline
      pathCoordinates.push([lat, long]);
      if (pathLine) {
        pathLine.setLatLngs(pathCoordinates);
      } else {
        pathLine = L.polyline(pathCoordinates, { color: 'red' }).addTo(map);
      }

      var featureGroup = L.featureGroup([marker, circle]).addTo(map)

      map.setView([lat, long], 18); // Set the map view to the current location with a zoom level of 18

      console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.")
          break;
      }
    }

    document.getElementById('addMarkerBtn').addEventListener('click', function () {
      map.once('click', function (e) {
        if (secondMarker) {
          map.removeLayer(secondMarker);
        }
        secondMarker = L.marker(e.latlng).addTo(map);
      });
    });

    document.getElementById('routeBtn').addEventListener('click', function () {
      if (marker && secondMarker) {
        if (routeControl) {
          map.removeControl(routeControl);
        }
        routeControl = L.Routing.control({
          waypoints: [
            marker.getLatLng(),
            secondMarker.getLatLng()
          ],
          routeWhileDragging: true
        }).addTo(map);
      } else {
        alert('Please add a second marker first.');
      }
    });

    document.getElementById('zoomToCurrentLocationBtn').addEventListener('click', function () {
      if (marker) {
        map.setView(marker.getLatLng(), 18);
      } else {
        alert('Current location not available.');
      }
    });

  }, []);

  return (
    <div>
      <div id="controls">
        <button id="addMarkerBtn">Add Marker</button>
        <button id="routeBtn">Create Route</button>
        <button id="satelliteViewBtn">Satellite View</button>
        <button id="zoomToCurrentLocationBtn">Zoom to Current Location</button>
      </div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MapComponent;