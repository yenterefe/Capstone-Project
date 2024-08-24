import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./App.css";
import Mission from "./Mission";
import Home from "./Home";
import Team from "./Team";

const API_KEY = import.meta.env.VITE_API_KEY; // Ensure API_KEY is securely managed
const containerStyle = {
  width: "950px",
  height: "950px",
};

const initialCoordinates = {
  lat: 39.9612,
  lng: -82.9988,
};

// Update markers for fresh green markets to load on map
const MARKET_MARKERS = [
  { id: 1, lat: 37.9612, lng: -81.9988 },
  { id: 2, lat: 36.9612, lng: -80.9988 },
];

const bounds = {
  north: 40.0,
  south: 39.9,
  east: -82.9,
  west: -83.1,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [inputValue, setInputValue] = useState("");
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState();

  const onLoad = useCallback((map) => {
    const boundsObj = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(bounds.south, bounds.west),
      new window.google.maps.LatLng(bounds.north, bounds.east)
    );
    map.fitBounds(boundsObj);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const [lat, lng] = inputValue.split(",").map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoordinates({ lat, lng });
      if (map) {
        map.panTo({ lat, lng });
      }
    } else {
      console.error("Invalid coordinates");
    }
  };

  const handleDirection = (event) => {
    const latLng = event.latLng;
    const destination = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };

    if (map) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: coordinates,
          destination,
          travelMode: "WALKING",
          provideRouteAlternatives: false,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            directionsRenderer.setDirections(result);

            // This will give the direction in miles
            const route = result.routes[0];

            setDistance(route.legs[0].distance.text);
          } else {
            console.error(`Error fetching directions: ${result}`);
          }
        }
      );
    }
  };

  return (
    <>
      <Link to="/Home">Home</Link>
      <Link to="/Mission">Mission</Link>
      <Link to="/Team">Team</Link>
      <div>
        <input
          type="text"
          placeholder="Add coordinates (lat,lng)"
          value={inputValue}
          onChange={handleInput}
        />
        <button onClick={handleClick}>🔍</button>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={coordinates} />
            {MARKET_MARKERS.map(({ id, lat, lng }) => (
              <Marker
                onClick={handleDirection}
                key={id}
                position={{ lat, lng }}
              />
            ))}

            {/* import from our API to create food desert polygon */}
            {/* Uncomment and adjust as needed */}
            {/* <Polygon
            paths={[
              { lat: 25.774, lng: -80.19 },
              { lat: 39.9612, lng: -82.9988 },
              { lat: 40.321, lng: -81.757 },
              { lat: 50.774, lng: -80.19 },
              { lat: 50.774, lng: -50.19 }
            ]}
          /> */}
          </GoogleMap>
        )}

        <div>The walking distance is: {distance}</div>
      </div>
    </>
  );
}

export default App;
