import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattles } from "../store/battle/battleThunks";
import { selectBattles } from "../store/battle/battleSelectors";
import { Icon } from "leaflet";
import { selectUser } from "../store/user/userSelectors";
import { selectProgress } from "../store/user/userSelectors";
import "./Atlas.css";
//leaflet imports and leaflet-related
import gunIcon from "../gun2.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Atlas() {
  const dispatch = useDispatch();
  const battles = useSelector(selectBattles);
  const navigator = useNavigate();
  const progress = useSelector(selectProgress);

  useEffect(
    function () {
      if (progress) {
        console.log("Fetching battles");
        dispatch(fetchBattles());
      }
    },
    // add progress as dependency, as when signup sets progress to 1
    // this will retrigger and get the data.
    //fetch battles also stores the current progress
    [progress]
  );

  const location = [52.0875, 13.421389];
 

  return (
    <div className="atlas">
      {battles && (
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
              const myIcon = new Icon({
                iconUrl: gunIcon,
                iconSize: [60, 60],
                iconAnchor: [12, 41],
                // if battle index batches last index, give animate class
                className: index === arr.length - 1 ? "recent" : "",
              });

              return (
                <Marker
                  key={item.id}
                  position={[item.latitude, item.longitude]}
                  icon={myIcon}
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
      )}
    </div>
  );
}

export default Atlas;
