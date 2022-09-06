import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattles } from "../store/battle/battleThunks";
import { selectBattles } from "../store/battle/battleSelectors";
import "./Atlas.css";
//leaflet imports
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Atlas() {
  const dispatch = useDispatch();
  const battles = useSelector(selectBattles);

  console.log("state battles", battles);

  useEffect(
    function () {
      dispatch(fetchBattles());
    },
    [dispatch]
  );

  //starting coordinate
  const location = [50.0875, 14.421389];

  //leaflet logic
  const jawgToken =
    "Mzk1PbCEZQl810DaXxA8HQZWQfi9bYRD7bEkFSoX36DMkyNdF73JeTKCznEesUUb";

  return (
    <div className="atlas">
      <MapContainer
        className="leaflet-container"
        center={location}
        zoom={5}
        scrollWheelZoom={false}
        minZoom={5}
        maxZoom={5}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Mzk1PbCEZQl810DaXxA8HQZWQfi9bYRD7bEkFSoX36DMkyNdF73JeTKCznEesUUb"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Atlas;
