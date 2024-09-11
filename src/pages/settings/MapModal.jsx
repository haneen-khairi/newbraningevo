import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";

export default function MapModal({ value, onChange, isOpen, onClose }) {
  const mapRef = React.useRef();
  const center = [51.505, -0.09];
  const [currentMarker, setCurrentMarker] = useState(center);
  const zoom = 13;
  useEffect(() => {
    setCurrentMarker(Array.isArray(value) ? value : center);
  }, [value]);
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={"80vw"}>
      <MapContainer
        center={Array.isArray(value) ? value : center}
        zoom={zoom}
        style={{ height: "700px" }}
        ref={mapRef}
      >
        <FixMap
          isOpen={isOpen}
          onClick={(e) => {
            onChange(e);
            setCurrentMarker(e);
          }}
        />
        <Marker position={currentMarker} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Modal>
  );
}

function FixMap({ isOpen, onClick }) {
  const map = useMap();
  const mapEvents = useMapEvents({
    click: (e) => {
      onClick([e.latlng.lat, e.latlng.lng]);

      //open the location in google maps
      //   window.open(
      //     `https://www.google.com/maps/search/?api=1&query=${e.latlng.lat},${e.latlng.lng}`
      //   );
    },
  });
  useEffect(() => {
    map.invalidateSize();
  }, [isOpen]);
}
