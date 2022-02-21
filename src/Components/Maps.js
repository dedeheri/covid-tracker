import React, { useState } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { XIcon } from "@heroicons/react/solid";

const Maps = ({ coordinates }) => {
  const [popup, setPopup] = useState(null);

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });
  return (
    <Map
      center={
        !popup
          ? [106.526, 0.026]
          : [popup.countrieInfo.long, popup.countrieInfo.lat]
      }
      zoom={[1]}
      style="mapbox://styles/munnirr/ckzra7gfo000e14nskual5f1w"
      containerStyle={{
        height: "50vh",
        width: "100%",
      }}
    >
      {Object.values(coordinates)?.map((c) => (
        <Marker
          key={c.cases}
          coordinates={[c.countrieInfo.long, c.countrieInfo.lat]}
        >
          <button
            className="bg-red-300  h-5 w-5 rounded-full brightness-50 opacity-50"
            onClick={(e) => {
              e.preventDefault();
              setPopup(c);
            }}
          ></button>
        </Marker>
      ))}

      {popup ? (
        <Popup coordinates={[popup.countrieInfo.long, popup.countrieInfo.lat]}>
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-md">{popup.countrieName}</h1>

              <button
                onClick={() => {
                  setPopup(null);
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
      ) : null}
    </Map>
  );
};

export default Maps;
