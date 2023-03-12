import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import Loader from "../Loader";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
`;

const Icon = styled.img`
  object-fit: cover;
  width: 30px;
  height: 30px;
`;

function Map() {
  const { data, loading } = useContext(MainContext);

  if (loading || !data.lng || !data.lat) {
    return null;
  }

  return (
    <Wrapper>
      <MapContainer
        center={[data.lng, data.lat]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[data.lng, data.lat]}>
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
