import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img7 from "./images/img7.png";
import logo1 from "./images/logo1.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import "./App.css";
import Popup from "./Popup";
import PopupMarket from "./PopupMarket";
import UserPop from "./UserPop";

const API_KEY = import.meta.env.VITE_API_KEY;
const containerStyle = {
  width: "950px",
  height: "950px",
};

const initialCoordinates = {
  lat: 39.9612,
  lng: -82.9988,
};

const UserMarker = {
  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // URL to a custom marker icon
};

const FreshMarketMarkers = {
  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // URL to a custom marker icon
};

//stylizing map
const darkMode = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

const mapOption = {
  styles: darkMode,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

//stylize polygon
const redPolygonStyle = [
  {
    fillColor: "#FF0000", // Orange fill color
    fillOpacity: 0.35, // Adjust the fill opacity as needed
    strokeColor: "#FF0000", // Orange stroke color
    strokeOpacity: 0.8, // Adjust the stroke opacity as needed
    strokeWeight: 2, // Set the stroke weight
  },
];

// Update markers for fresh green markets to load on map
const MARKET_MARKERS = [
  {
    id: 1,
    name: "Fresh Market 1",
    lat: 37.9612,
    lng: -81.9988,
    address: "Columbus",
  },
  {
    id: 2,
    name: "Fresh Market 2",
    lat: 36.9612,
    lng: -80.9988,
    address: "Ohio",
  },
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
  const [marketPopup, setMarketPopup] = useState(false);
  const [directions, setDirections] = useState(null);
  const [distances, setDistances] = useState([]); // Changed to store multiple distances
  const [showMap, setShowMap] = useState(false);
  const [supermarketName, setSuperMarketName] = useState("");
  const [marketAddress, setMarketAddress] = useState("");
  const [showUser, setShowUser] = useState(false);

  const fetchCoordinates = async () => {
    const responses = await Promise.all([
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dc1"),
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dc5"),
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dc7"),
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dc3"),
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dc9"),
      axios.get("http://localhost:3000/coordinates/66d523810ba9bbb50d262dcb"),
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
      setShowMap(true);
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
    } catch (error) {
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

  function activateMarketPopup() {
    setMarketPopup(true);
  }

  function deactivateMarketPopup() {
    setMarketPopup(false);
  }

  function activateUserPopup() {
    setShowUser(true);
  }

  function deactivateUserPopup() {
    setShowUser(false);
  }

  return (
    <>
      {/* <Link className="px-2 " to="/Home">
        Home
      </Link> */}
      {/* <div className="flex flex-col items-center">
        <div>
          <Link className="px-2" to="/Mission">
            Mission
          </Link>
          <Link className="px-2" to="/Team">
            Team
          </Link>
          <Link className="px-2 " to="/">
            Home
          </Link>
        </div>

        <div className="avatar mt-4">
          <div className="w-10 rounded-full">
            <img src={img7} alt="avatar" />
          </div>
        </div>
      </div> */}

      <header className="absolute left-0 top-0 z-20 flex w-full items-center p-3">
        <div className="flex items-center w-full">
          <div className="ml-10">
            <a href="/SearchMap" className="block py-5">
              <img
                src={logo1}
                alt="logo"
                className="rounded"
                style={{ width: "352.01px", height: "47.74px" }} // Set exact dimensions
              />
            </a>
          </div>
          <div className="flex justify-start ml-20">
            <Link className="p-2 mr-8" to="/Mission">
              Mission
            </Link>
            <Link className="p-2 mr-8" to="/">
              Home
            </Link>
            <Link className="p-2 mr-8" to="/Team">
              Team
            </Link>
          </div>
        </div>
      </header>

      <div className=" mt-20">
        <p className="text-lg">Looking for fresh markets? We can help. </p>
        <input
          className="w-80 px-8 py-4 mr-2 mb-4 mt-7 rounded-lg border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-500 focus:outline-none transition-colors duration-250"
          type="text"
          placeholder="Search address"
          value={inputValue}
          onChange={handleInput}
        />
        <button
          className="px-6 py-3.5 mb-1 mt-1  border-2 border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-500 focus:outline-none transition-colors duration-250 text-md"
          onClick={handleClick}
        >
          🥕
        </button>
        {isLoaded && showMap && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOption}
          >
            <Marker
              onMouseOver={activateUserPopup}
              onMouseOut={deactivateUserPopup}
              icon={UserMarker}
              position={coordinates}
            />
            {MARKET_MARKERS.map(({ id, lat, lng, name, address }) => (
              <Marker
                onClick={handleDirection}
                onMouseOver={() => {
                  activateMarketPopup();
                  setSuperMarketName(name);
                  setMarketAddress(address);
                }}
                onMouseOut={deactivateMarketPopup}
                key={id}
                position={{ lat, lng }}
                icon={FreshMarketMarkers}
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
                  strokeWeight: redPolygonStyle[0].strokeWeight,
                }}
                paths={polygonPaths.flat()} // Flatten the array of polygons into a single array of coordinates
              />
            )}
          </GoogleMap>
        )}
      </div>
      {popup ? <Popup /> : null}
      {marketPopup ? (
        <PopupMarket marketName={supermarketName} address={marketAddress} />
      ) : null}
      {showUser && <UserPop />}

      <ul>
        {distances.map((distance, index) => (
          <li
            className="mb-4 mt-5 p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-full text-lg"
            key={index}
          >
            {MARKET_MARKERS[index].name} is a {distance} walk from your location
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
