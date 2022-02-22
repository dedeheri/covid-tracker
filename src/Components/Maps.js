import React, { useState } from "react";

// import ReactMapboxGl, { Feature, Layer, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import { XIcon } from "@heroicons/react/solid";
// ReactMapboxGl.workerClass = MapboxWorker;

const Maps = ({ coordinates }) => {
  const [popup, setPopup] = useState(false);
  const [popups, setPopups] = useState({});

  console.log(popup);

  const mapConfig = {
    longitude: 106.526,
    latitude: 0.026,
    zoom: 2,

    style: {
      width: "100%",
      height: "70vh",
    },
    key: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  };

  return (
    <Map
      initialViewState={{ ...mapConfig }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      style={mapConfig.style}
      mapboxAccessToken={mapConfig.key}
    >
      {Object.values(coordinates)?.map((c) => (
        <Marker
          key={c.cases}
          longitude={c.countrieInfo.long}
          latitude={c.countrieInfo.lat}
        >
          <button
            className="bg-blue-400  h-5 w-5 rounded-full brightness-50 opacity-50"
            onClick={() => setPopup(c)}
          />
        </Marker>
      ))}

      {popup ? (
        <Popup
          longitude={popup.countrieInfo.long}
          latitude={popup.countrieInfo.lat}
          closeButton={false}
          closeOnClick={false}
        >
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-md">{popup.countrieName}</h1>

              <button
                onClick={() => {
                  setPopup(false);
                }}
              >
                <XIcon className="w-4" />
              </button>
            </div>
            <div className="flex space-x-3 mt-4">
              <h1 className="font-semibold">Kasus</h1>
              <h1 className="font-semibold">{popup.cases.toLocaleString()}</h1>
            </div>

            <div className="flex space-x-3">
              <h1 className="font-semibold">Meninggal</h1>
              <h1 className="font-semibold">{popup.deaths.toLocaleString()}</h1>
            </div>

            <div className="flex space-x-3">
              <h1 className="font-semibold">Sembuh</h1>
              <h1 className="font-semibold">
                {popup.recovered.toLocaleString()}
              </h1>
            </div>
          </div>
        </Popup>
      ) : (
        false
      )}
    </Map>
  );
};

export default Maps;
