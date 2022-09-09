import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattles } from "../store/battle/battleThunks";
import { selectBattles } from "../store/battle/battleSelectors";
import { Icon } from "leaflet";
import { selectUser } from "../store/user/userSelectors";
import "./Atlas.css";
//leaflet imports and leaflet-related
import gunIcon from "../gun2.svg";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Atlas() {
  const dispatch = useDispatch();
  const battles = useSelector(selectBattles);
  const navigator = useNavigate();
  const user = useSelector(selectUser);

  console.log(user);

  console.log("state battles", battles);

  useEffect(
    function () {
      dispatch(fetchBattles());
    },
    [dispatch]
  );

  //starting coordinate
  const location = [52.0875, 13.421389];
  //latitude - increases up, decreases down
  //longitude - increases right, decreases down

  //leaflet stuff
  const jawgToken =
    "Mzk1PbCEZQl810DaXxA8HQZWQfi9bYRD7bEkFSoX36DMkyNdF73JeTKCznEesUUb";

  const myIcon = new Icon({
    iconUrl: gunIcon,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
  });

  return (
    <div className="atlas">
      <MapContainer
        className="leaflet-container"
        center={location}
        zoom={6}
        scrollWheelZoom={true}
        minZoom={6}
        maxZoom={8}
        zoomControl={false}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Mzk1PbCEZQl810DaXxA8HQZWQfi9bYRD7bEkFSoX36DMkyNdF73JeTKCznEesUUb"
        />
        {battles &&
          battles.map(function (item, index, arr) {
            return (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={myIcon}
                className="icon"
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                }}
              >
                <Popup offset={[20, -20]}>
                  <span
                    className="popup-text"
                    onClick={(e) => navigator(`/battles/${item.id}`)}
                  >
                    {item.name} - {item.year}
                  </span>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Atlas;
