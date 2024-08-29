import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon
} from "@react-google-maps/api";
import "./App.css";
import Popup from "./Popup";

const API_KEY = import.meta.env.VITE_API_KEY;
const containerStyle = {
  width: "950px",
  height: "950px",
};

const initialCoordinates = {
  lat: 39.9612,
  lng: -82.9988,
};

//stylizing map
const darkMode = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

//stylize polygon
const redPolygonStyle = [
  {
    "fillColor": "#FFA500", // Red fill color
    "fillOpacity": 0.35, // Adjust the fill opacity as needed
    "strokeColor": "#FFA500", // Red stroke color
    "strokeOpacity": 0.8, // Adjust the stroke opacity as needed
    "strokeWeight": 2 // Set the stroke weight
  }
];



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
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [inputValue, setInputValue] = useState("");
  const [polygonPaths, setPolygonPaths] = useState([]);
  const [popup, setPopup] = useState(false);
  const [directions, setDirections] = useState(null);
  const [distances, setDistances] = useState([]); // Changed to store multiple distances

  const fetchCoordinates = async () => {
    const responses = await Promise.all([
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c7823"),
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c7825"),
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c7827"),
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c7829"),
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c782b"),
      axios.get("http://localhost:3000/coordinates/66cd365183da7cccc39c782d"),
    ]);

    const paths = responses.map((response) => response.data);
    setPolygonPaths(paths);
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "fd8447407e7cf714",
    googleMapsApiKey: API_KEY,
  });

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

  const handleClick = async () => {
    const encodedAddress = encodeURIComponent(inputValue);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        if (map) {
          map.panTo({ lat, lng });
        }
      } else {
        console.error("Invalid coordinates");
      }
    }
    catch (error) {
      console.error("Error fetching geocode:", error);
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

            // Store multiple distances
            const route = result.routes[0];
            setDistances((prevDistances) => [
              ...prevDistances,
              route.legs[0].distance.text,
            ]);
          } else {
            console.error(`Error fetching directions: ${result}`);
          }
        }
      );
    }
  };

  function activatePopup() {
    setPopup(true);
  }

  function deactivatePopup() {
    setPopup(false);
  }

  return (
    <>
      <Link to="/Home">Home</Link>
      <Link to="/Mission">Mission</Link>
      <Link to="/Team">Team</Link>
      <div>
        <input
          type="text"
          placeholder="Search address"
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
            options={{ styles: darkMode }}
          >
            <Marker position={coordinates} />
            {MARKET_MARKERS.map(({ id, lat, lng }) => (
              <Marker
                onClick={handleDirection}
                key={id}
                position={{ lat, lng }}
              />
            ))}

            {polygonPaths.length > 0 && (
              <Polygon
                onMouseOver={activatePopup}
                onMouseOut={deactivatePopup}
                options={{
                  fillColor: redPolygonStyle[0].fillColor,
                  fillOpacity: redPolygonStyle[0].fillOpacity,
                  strokeColor: redPolygonStyle[0].strokeColor,
                  strokeOpacity: redPolygonStyle[0].strokeOpacity,
                  strokeWeight: redPolygonStyle[0].strokeWeight
                }}
                paths={polygonPaths.flat()} // Flatten the array of polygons into a single array of coordinates
              />
            )}
          </GoogleMap>
        )}
      </div >
      {popup ? <Popup /> : null
      }

      <ul>
        {distances.map((distance, index) => (
          <li key={index}>Walking distance: {distance}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
