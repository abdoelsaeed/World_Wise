import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import Button from './Button'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useUrlPosition } from "./../hooks/useUrlPosition";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useGeolocation } from "./../hooks/useGeolocation";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useCities } from "../contexts/CitiesContext";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

//ماينفعش تحط ايموجي لازم زي كدا ودي بتاعت اللوكيشن بتاعك انت
const emojiIcon = L.divIcon({
  html: '<div class="location-dot"></div>',
  className: "emoji-marker",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});


function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { t } = useTranslation();
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const { isLoading, position, error, getPosition } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  const lat = mapLat ? parseFloat(mapLat) : 40;
  const lng = mapLng ? parseFloat(mapLng) : 0;
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(function () {
    if(position) setMapPosition([position.lat,position.lng]);
  }, [position]);
  return (
    <div className={styles.mapContainer}>
      <Button type={isLoading ? "loader" : "position"} onClick={getPosition}>
        {isLoading ? "" : t("MYLOCATION")}
      </Button>

      <MapContainer
        center={[lat, lng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {position && (
          <Marker position={[position.lat, position.lng]} icon={emojiIcon}>
            <Popup>
              <span>My Loacation ☝️</span>
            </Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//دي اللي بتخلي يعمل ريندر بمجرد ماتغير الposition
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

//دي بتخليني لما ادوس علي الخريطه يفتحلي الفورم
function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
