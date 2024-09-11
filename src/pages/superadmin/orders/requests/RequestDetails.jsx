// import MapDrawer from "../../../components/MapDrawer.jsx";
import GoogleMapComponent from "@/components/GoogleMap";
import {
  DirectionsRenderer,
  DirectionsService,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import RequestDetailsContent from "./components/RequestDetailsContent";
import CustomButton from "../../../../components/Button.jsx";
import MarkerIcon from "@/assets/markerIcon.png";
import { RejectRequestVisits, AcceptRequestVisits } from "@/services/vip_trips.js";
import { useQueryClient } from "@tanstack/react-query";
import useResultModal from "../../../../hooks/useResultModal.js";
import MapDrawer from "../../../../components/MapDrawer.jsx";
import { GetAllAdminRequests } from "../../../../services/vip_trips.js";
import ReasonsOfCancelling from "./components/ReasonsOfCancelling.jsx";
import ReasonsOfCancellingModal from "./components/ReasonsOfCancelling.jsx";

export default function RequestDetails({
  isOpen,
  onClose,
  data,
  onAssignNewDriver,
  onOpenCancelModal = (id) => {}
}) {
  
  console.log("🚀 ~ data details:", data)
  const { t } = useTranslation();
  const [path, setPath] = useState(null);
  const client = useQueryClient();
  const globalModal = useResultModal();
  const pickupCoords = {
    lat: data?.pickupLatitude,
    lng: data?.pickupLongitude,
  };
  const dropOffCoords = {
    lat: data?.dropOffLatitude,
    lng: data?.dropOffLongitude,
  };
  function assignPath(path) {
    setPath(path);
  }
  const rejectRequest = RejectRequestVisits({
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("requestUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["adminRequests"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingRequest"));
    },
  });
  const acceptRequest = AcceptRequestVisits({
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("requestUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["adminRequests"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingRequest"));
    },
  });
  const hasCancelRequest = data?.status;
  function handleCancelRequest() {
    console.log("🚀 ~ handleCancelRequest ~ cancelObject:")
    onOpenCancelModal(data?.id)
    onClose()
    // const cancelObject = {
    //   "requestId": data?.id,
    //   "reasonId":  data?.visitReason?.id,
    //   "otherReason": data?.visitReason?.nameEn
    // }
    // //type = 2 for accept, 3 for reject
    // rejectRequest.mutate({
    //   ...cancelObject
    // });
  }
  function handleAcceptRequest() {
    const acceptObject = {
      "requestId": data?.id,
      "reasonId":  data?.visitReason?.id,
      "otherReason": data?.visitReason?.nameEn
    }
    console.log("🚀 ~ handleAcceptRequest ~ acceptObject:", acceptObject)
    //type = 2 for accept, 3 for reject
    acceptRequest.mutate({
      ...cancelObject
    });
  }
  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={t("visitDetails")}
      drawerContent={
        <RequestDetailsContent
          data={data}
          onAssignNewDriver={onAssignNewDriver}
        />
      }
      footer={
        hasCancelRequest && (
          <div className={"grid grid-cols-2 gap-3"}>
            <CustomButton
              disabled={true}

              variant="success"
              onClick={() => {
                handleAcceptRequest();

                onClose();
              }}
            >
              {t("accept")}
            </CustomButton>
            <CustomButton
              variant="error"
              onClick={() => {
                handleCancelRequest();

                // onClose();
              }}
            >
              {t("reject")}
            </CustomButton>
          </div>
        )
      }
    >

      <GoogleMapComponent center={pickupCoords} zoom={16}>
        {path && (
          <DirectionsRenderer
            directions={path}
            options={{
              suppressMarkers: true,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
        {!path && (
          <DirectionsService
            options={{
              origin: pickupCoords,
              destination: dropOffCoords,
              travelMode: "DRIVING",
            }}
            callback={assignPath}
          />
        )}
        <MarkerF
          position={pickupCoords}
          icon={{
            url: MarkerIcon,
            scaledSize: { width: 62, height: 32 },
          }}
          label={{
            text: data?.pickupName,
            color: "#fff",
          }}
        />
        <MarkerF
          position={dropOffCoords}
          icon={{
            url: MarkerIcon,
            scaledSize: { width: 122, height: 32 },
          }}
          label={{
            text: data?.dropOffName,
            color: "#fff",
          }}
        />
      </GoogleMapComponent>
    </MapDrawer>
  );
}
