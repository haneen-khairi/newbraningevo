import { useState } from "react";
import { useTranslation } from "react-i18next";
import GoogleMap from "../../../components/GoogleMap.jsx";
import MapDrawer from "../../../components/MapDrawer.jsx";
import LoadingProvider from "./components/LoadingContext.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import NewTripContent from "./NewTripContent.jsx";

export default function NewTripDrawer({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [center, setCenter] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });
  const [mode, setMode] = useState("meeting");
  const [selectedCoords, setSelectedCoords] = useState(null);
  return (
    <LoadingProvider>
      <MapDrawer
        open={isOpen}
        onClose={onClose}
        title={t("privateCar")}
        drawerContent={
          <NewTripContent
            onClose={onClose}
            setSelectedCoords={setSelectedCoords}
            selectedCoords={selectedCoords}
            selectedTab={mode}
            setSelectedTab={setMode}
          />
        }
        footer={<SubmitButton mode={mode} />}
      >
        <GoogleMap
          zoom={16}
          center={center}
          onClick={(e) =>
            setSelectedCoords({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            })
          }
        >
          
        </GoogleMap>
      </MapDrawer>
    </LoadingProvider>
  );
}
