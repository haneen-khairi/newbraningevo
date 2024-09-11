import MapDrawer from "@/components/MapDrawer";
import GoogleMap from "../../../components/GoogleMap.jsx";
import { MarkerF, PolylineF } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import OvalsIcons from "@/assets/icons/Ovals.png";
import EventForm from "./form";
import { Button } from "antd";
import { CreateBusEvent, EditBusEvent } from "@/services/bus_events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import dayjs from "dayjs";
import {
  CreateVipEvent,
  UpdateVipEvent,
} from "../../../services/vip_events.js";
export default function CreateEvent({ isOpen, onClose }) {
  const { t } = useTranslation();
  const mode = isOpen && isOpen?.id ? "edit" : "create";
  const client = useQueryClient();

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const globalModal = useResultModal();

  const createMutation = CreateVipEvent({
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("eventCreatedSuccessfully"),
      });
      onClose();
      client.invalidateQueries({ queryKey: ["vipEvents"] });
    },
  });

  const editMutation = UpdateVipEvent({
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("eventUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipEvents"] });

      onClose();
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

  const onSubmit = (values, mode) => {
    const timeInMs = dayjs(values.eventTime);
    values.eventDate = dayjs(values.eventDate)
      .set("hour", timeInMs.hour())
      .set("minute", timeInMs.minute())
      .toISOString();
    values.toDate = dayjs(values.eventDate).add(1, "day").toISOString();
    const destinationCoordinated = values.destinationBuildingId.split(",");
    values.destinationLatitude = destinationCoordinated[0];
    values.destinationLongitude = destinationCoordinated[1];

    // console.log(values)
    if (mode == "edit") {
      values.id = isOpen.id;
      editMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={t("createEvent")}
      drawerContent={
        <EventForm
          onSubmit={onSubmit}
          initialValues={isOpen}
          mode={mode}
          currentCoordinates={currentCoordinates}
        />
      }
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          htmlType="submit"
          form="event-form"
          loading={createMutation.isPending || editMutation.isPending}
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
