import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import Loader from "../Loader";

import iconMarker from "./icon-location.svg";
import iconRetina from "./icon-location.svg";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const Wrapper = styled.div`
  & > div {
    min-height: calc(100vh - 260px);
    width: 100%;
    z-index: 4;
  }
`;

const Icon = styled.img`
  object-fit: cover;
  width: 30px;
  height: 30px;
`;

function Map() {
  const { data, loading } = useContext(MainContext);

  if (loading || !data?.lng || !data?.lat) {
    return null;
  }

  return (
    <Wrapper>
      <MapContainer
        center={[data.lat, data.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[data.lat, data.lng]}>
          <Icon
            src={"/frontendmentor_9/icon-location.svg"}
            alt={"map location icon"}
          />
        </Marker>
      </MapContainer>
    </Wrapper>
  );
}

export default Map;
