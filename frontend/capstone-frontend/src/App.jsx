import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polygon } from '@react-google-maps/api';
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const containerStyle = {
  width: '950px',
  height: '950px'
};

//This coordinate will take us to downtown columbus ohio
const initialCoordinates = {
  lat: 39.9612,
  lng: -82.9988
};

//Values to adjust on mount
const bounds = {
  north: 40.0, // Adjust these values as needed
  south: 39.9,
  east: -82.9,
  west: -83.1
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "fd8447407e7cf714",
    googleMapsApiKey: API_KEY
  });

  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [inputValue, setInputValue] = useState("");

  //To zoom out on mount
  const onLoad = useCallback(function callback(map) {
    const boundsObj = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(bounds.south, bounds.west),
      new window.google.maps.LatLng(bounds.north, bounds.east)
    );
    map.fitBounds(boundsObj);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const [lat, lng] = inputValue.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoordinates({ lat, lng });
      if (map) {
        map.panTo({ lat, lng });
      }
    }
  };

  return (
    <>
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
            {/* we can represent the affect by food desert in a polygon. update bounds later */}
            {/* < Polygon paths={
              [
                { lat: 25.774, lng: -80.19 },
                { lat: 39.9612, lng: -82.9988 },
                { lat: 40.321, lng: -81.757 },
                { lat: 50.774, lng: -80.19 },
                { lat: 50.774, lng: -50.19 }
              ]} /> */}
          </GoogleMap>
        )}
      </div>
    </>
  );
}

export default App;
