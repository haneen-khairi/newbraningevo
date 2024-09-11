import OvalsIcons from "@/assets/icons/Ovals.png";
import GoogleMap from "@/components/GoogleMap";
import MapDrawer from "@/components/MapDrawer";
import useResultModal from "@/hooks/useResultModal";
import { EditBusEvent } from "@/services/bus_events";
import { MarkerF } from "@react-google-maps/api";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EventForm from "./form";
import dayjs from "dayjs";
export default function CreateEvent({ isOpen, onClose ,refetch }) {
  const { t } = useTranslation();
  const mode =  "edit" ;

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const globalModal = useResultModal();

  const Mutation = useMutation({
    mutationFn: (values) =>
      EditBusEvent(values),
    onSuccess: () => {
      onClose();
      refetch();
      globalModal.success({
        title:
            t("updatedSuccessfully"),
        subtitle:
            t("eventUpdatedSuccessfully"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  //get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    values.eventTime =dayjs(values.eventTime).format("HH:mm");
    values.OriginBuildingId =values["originBuildingId-coordinates"][0]?.lng
    delete values["originBuildingId-coordinates"];
    delete values["originBuildingId-label"];
    delete values.eventTime;
    values.id =isOpen.id;

    Mutation.mutate(values);
  };

  const [currentCoordinates, setCurrentCoordinates] = useState(null);

  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={t("edit")}
      drawerContent={
        <EventForm
          currentCoordinates={currentCoordinates}
          onSubmit={onSubmit}
          initialValues={isOpen}
          mode={mode}
        />
      }
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          htmlType="submit"
          form="event-form"
          loading={Mutation.isPending}
        >
          {t("save")}
        </Button>
      }
    >
      <GoogleMap
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setCurrentCoordinates(`${lat},${lng}`);
        }}
        center={currentLocation}
        zoom={12}
      >
        <MarkerF
          position={currentLocation}
          icon={{
            url: OvalsIcons,
            scaledSize: {
              width: 32,
              height: 32,
            },
          }}
        />
      </GoogleMap>
    </MapDrawer>
  );
}
