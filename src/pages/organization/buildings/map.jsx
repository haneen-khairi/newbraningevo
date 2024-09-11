import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureGroup, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { useRef, forwardRef } from "react";

const MapComponent = (props, ref) => {
  const editRef = useRef(null);
  const onCreated = (e) => {
    const layer = e.layer;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          ref={ref}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              drawError: {
                color: "#e1e100", // Color the shape will turn when intersects
                message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
              },
              shapeOptions: {
                color: "#97009c",
              },
            },
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default forwardRef(MapComponent);
