import OvalsIcons from "@/assets/icons/Ovals.png";
import GoogleMap from "@/components/GoogleMap";
import MapDrawer from "@/components/MapDrawer";
import useResultModal from "@/hooks/useResultModal";
import { MarkerF } from "@react-google-maps/api";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createEvent, updateEvent } from "../../../services/superadminEvents";
import EventForm from "./form";
export default function CreateEvent({ isOpen, onClose, refetch }) {
  const { t } = useTranslation();
  const mode = isOpen && isOpen?.id ? "edit" : "create";

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const globalModal = useResultModal();

  const Mutation = useMutation({
    mutationFn: (values) =>
      mode == "create" ? createEvent(values) : updateEvent(values),
    onSuccess: () => {
      onClose();
      refetch();
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create"
            ? t("eventCreatedSuccessfully")
            : t("eventUpdatedSuccessfully"),
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
  }, []);

  const onSubmit = (values, mode) => {
    values.branchId = 1;
    const eventDate = values.eventDate
      ? values.eventDate[0].format("YYYY-MM-DD")
      : null;
    const toDate = values.eventDate
      ? values.eventDate[1].format("YYYY-MM-DD")
      : null;
    const eventTime = values.eventTime
      ? values.eventTime.format("HH:mm:ss")
      : "00:00:00";
    const toTime = values.toTime
      ? values.toTime.format("HH:mm:ss")
      : "00:00:00";

    // Generate values object with formatted dates
    values.eventDate = eventDate
      ? dayjs(`${eventDate}T${eventTime}`).toISOString()
      : null;
    values.toDate = toDate ? dayjs(`${toDate}T${toTime}`).toISOString() : null;

      //get destinationLatitude and destinationLongitude

    if (values["originBuildingId-coordinates"]) {
      values.destinationLongitude = values["originBuildingId-coordinates"].lng;
      values.destinationLatitude = values["originBuildingId-coordinates"].lat;
      delete values["originBuildingId-coordinates"];
      delete values["destinationBuildingId"];
      delete values["originBuildingId-label"];
    }

    if (values.destinationBuildingId) {
      const coordinates = values.destinationBuildingId.split(",");
      values.destinationLatitude = coordinates[0];
      values.destinationLongitude = coordinates[1];
      delete values.destinationBuildingId;
    }

    //delete not necessary values
    delete values.eventTime;
    delete values.toTime;
    delete values["endpoint-name"];

    if (mode == "edit") {
      values.id = isOpen.id;
    }

    // console.log(values);
    Mutation.mutate(values);
  };

  const [currentCoordinates, setCurrentCoordinates] = useState(null);

  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={mode == "edit" ? t("edit") : t("addNewEvent")}
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
