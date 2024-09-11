import MapDrawer from "@/components/MapDrawer";
import GoogleMapComponent from "@/components/GoogleMap";
import {MarkerF, PolylineF, DirectionsRenderer, DirectionsService} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import DriverIcon from "@/assets/icons/driver.svg?react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LocationDot from "@/components/LocationDot";
import { Button } from "antd";
import MarkerIcon from "@/assets/markerIcon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelBusTrip } from "@/services/bus_trips";
import useResultModal from "@/hooks/useResultModal";
import { AxiosError } from "axios";
import {useState} from "react";

export default function DetailsDrawer({ isOpen, onClose, onEditPath }) {
  const { t, i18n } = useTranslation();
  const [path, setPath] = useState(null);
  const mapPosition = isOpen?.originBuildingInfo?.center?.[0] ?? [0, 0];
  const globalModal = useResultModal();
  const client = useQueryClient();
  const destinationPosition = isOpen?.destinationBuildingInfo?.center?.[0] ?? [
    0, 0,
  ];
  const originBuildingName =
    i18n.language == "ar"
      ? isOpen?.originBuildingInfo?.nameAr
      : isOpen?.originBuildingInfo?.nameEn;
  const destinationBuildingName =
    i18n.language == "ar"
      ? isOpen?.destinationBuildingInfo?.nameAr
      : isOpen?.destinationBuildingInfo?.nameEn;
  const isEvent = isOpen?.orderType == "Event";
  const isOngoing = isOpen?.status == "New" || isOpen?.status == "Pending";
  //   const { data: onlineDrivers } = useQuery({
  //     queryKey: ["onlineBusses"],
  //     queryFn: () => GetOnlineBusses(),
  //   });
  const cancelMutation = useMutation({
    mutationFn: (data) => CancelBusTrip(data),
    onSuccess: () => {
      onClose();
      globalModal.success({
        title: t("success"),
        subtitle: t("tripCancelledSuccessfully"),
      });
      client.invalidateQueries([
        {
          queryKey: ["myOrders"],
        },
      ]);
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.validationErrors
            ?.map((e) => e.errorMessage)
            .join(", ") ?? error.message;
      } else {
        errorMessage = error.message;
      }
      onClose();
      globalModal.error(t("error"), errorMessage);
    },
  });
  function assignPath(path) {
    setPath(path);
  }
  return (
    <MapDrawer
      open={isOpen}
      onClose={() => {
        onClose();
        setPath(null);
      }}
      title={t("details")}
      drawerContent={<DrawerContent data={isOpen} />}
      footer={
        <div className="grid grid-cols-2 gap-6 h-full">
          {!isEvent && isOngoing && (
            <Button
              className="border-none rounded-xl text-[#38ACB1] bg-[#F3F5FA] font-bold h-full"
              style={{
                border: "1px solid #C0CCE3",
              }}
              onClick={() => onEditPath(isOpen)}
            >
              {t("changePath")}
            </Button>
          )}
          {isOngoing && (
            <Button
              className="border-none rounded-xl text-[#F30000] bg-[#FFF5F5] active:bg-[#fee9e8] font-bold h-full"
              loading={cancelMutation.isPending}
              onClick={() => cancelMutation.mutate(isOpen?.tripInfo.id)}
            >
              {t("cancelTrip")}
            </Button>
          )}
        </div>
      }
    >
      <GoogleMapComponent
        center={{ lat: mapPosition?.[0], lng: mapPosition?.[1] }}
        zoom={16}
      >
        <MarkerF
          position={{ lat: mapPosition?.[0], lng: mapPosition?.[1] }}
          icon={{
            scaledSize: { width: 62, height: 32 },
            url: MarkerIcon,
          }}
          label={{
            text: originBuildingName,
            color: "#fff",
          }}
          className="text-blue-400"
        />
        <MarkerF
          position={{
            lat: destinationPosition?.[0],
            lng: destinationPosition?.[1],
          }}
          icon={{
            scaledSize: { width: 62, height: 32 },
            url: MarkerIcon,
          }}
          label={{
            text: destinationBuildingName,
            color: "#fff",
          }}
          className="text-blue-400"
        />
        {/*<PolylineF*/}
        {/*  path={[*/}
        {/*    { lat: mapPosition?.[0], lng: mapPosition?.[1] },*/}
        {/*    { lat: destinationPosition?.[0], lng: destinationPosition?.[1] },*/}
        {/*  ]}*/}
        {/*  options={{ strokeColor: "#617EF9" }}*/}
        {/*/>*/}
        {
          path && <DirectionsRenderer
              directions={path}
              options={{
                suppressMarkers: true,
              }}

          />
        }
        {
          !path && <DirectionsService options={{
              origin: mapPosition?.[0] + "," + mapPosition?.[1],
              destination: destinationPosition?.[0] + "," + destinationPosition?.[1],
              travelMode: "DRIVING",
            }} callback={assignPath} />
        }

      </GoogleMapComponent>
    </MapDrawer>
  );
}

function DrawerContent({ data }) {
  dayjs.extend(customParseFormat);
  const { t, i18n } = useTranslation();
  const busName =
    i18n.language == "ar" ? data?.busInfo?.nameAr : data?.busInfo?.nameEn;
  const plateNumber =
    i18n.language == "ar"
      ? data?.busInfo?.plateNumber
      : data?.busInfo?.plateNumberEn;
  const driverName =
    i18n.language == "ar"
      ? data?.driverInfo?.fullName
      : data?.driverInfo?.fullNameEn;
  const timeNow = dayjs().format("HH:mm a");
  const estimatedArrival = dayjs()
    .add(dayjs(data?.estimateTime, "HH:mm:ss").minute(), "minute")
    .format("HH:mm a");
  const startPoint =
    i18n.language == "ar"
      ? data?.originBuildingInfo?.nameAr
      : data?.originBuildingInfo?.nameEn;
  const endPoint =
    i18n.language == "ar"
      ? data?.destinationBuildingInfo?.nameAr
      : data?.destinationBuildingInfo?.nameEn;

  return (
    <div
      className="flex flex-col gap-3 p-3 rounded-xl"
      style={{
        boxShadow: "0px 4px 75px 0px #0000000D",
      }}
    >
      {data?.id?.split("-")[0]}
      <div className="rounded-xl p-4 border border-slate-100 border-solid">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <DriverIcon />
            <div className="flex flex-col gap-2">
              <p>{driverName}</p>
              <p className="text-[#767676]">
                {t("remainingTime")}: {data?.estimateTime}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>{busName}</p>
            <p className="text-[#767676]">{plateNumber}</p>
          </div>
        </div>
        <div className="flex w-full items-center mt-6">
          <div className="flex flex-col gap-2 items-center">
            <LocationDot isActive={false} />
            <p>{startPoint}</p>
          </div>
          <div className="border-t border-solid border-[#EFEFEF] w-full mb-6"></div>
          <div className="flex flex-col gap-2 items-center">
            <LocationDot isActive={true} />
            <p>{endPoint}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl p-4 items-center border border-slate-100 border-solid flex gap-2">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_658_809)">
            <path
              d="M8 0.5C6.41775 0.5 4.87104 0.969192 3.55544 1.84824C2.23985 2.72729 1.21447 3.97672 0.608967 5.43853C0.00346629 6.90034 -0.15496 8.50887 0.153721 10.0607C0.462403 11.6126 1.22433 13.038 2.34315 14.1569C3.46197 15.2757 4.88743 16.0376 6.43928 16.3463C7.99113 16.655 9.59966 16.4965 11.0615 15.891C12.5233 15.2855 13.7727 14.2602 14.6518 12.9446C15.5308 11.629 16 10.0823 16 8.5C15.9977 6.37897 15.1541 4.34547 13.6543 2.84568C12.1545 1.34589 10.121 0.502294 8 0.5ZM8 15.1667C6.68146 15.1667 5.39253 14.7757 4.2962 14.0431C3.19987 13.3106 2.34539 12.2694 1.84081 11.0512C1.33622 9.83305 1.2042 8.49261 1.46144 7.1994C1.71867 5.90619 2.35361 4.71831 3.28596 3.78596C4.21831 2.85361 5.4062 2.21867 6.6994 1.96143C7.99261 1.7042 9.33305 1.83622 10.5512 2.3408C11.7694 2.84539 12.8106 3.69987 13.5431 4.7962C14.2757 5.89253 14.6667 7.18146 14.6667 8.5C14.6647 10.2675 13.9617 11.9621 12.7119 13.2119C11.4621 14.4617 9.76752 15.1647 8 15.1667Z"
              fill="#767676"
            />
            <path
              d="M7.99964 4.5C7.82283 4.5 7.65326 4.57024 7.52823 4.69526C7.40321 4.82029 7.33297 4.98986 7.33297 5.16667V8.05L5.08564 9.458C4.93535 9.55189 4.82851 9.70163 4.78863 9.87429C4.74875 10.0469 4.77909 10.2284 4.87297 10.3787C4.96686 10.529 5.1166 10.6358 5.28926 10.6757C5.46192 10.7156 5.64335 10.6852 5.79364 10.5913L8.35364 8.99133C8.45036 8.93073 8.52991 8.84631 8.58465 8.74616C8.6394 8.646 8.66751 8.53347 8.66631 8.41933V5.16667C8.66631 4.98986 8.59607 4.82029 8.47104 4.69526C8.34602 4.57024 8.17645 4.5 7.99964 4.5Z"
              fill="#767676"
            />
          </g>
          <defs>
            <clipPath id="clip0_658_809">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="flex flex-col gap-2">
          <p className="text-[#767676] text-sm">{t("estimatedArrival")}</p>
          <p>
            {timeNow} - {estimatedArrival}
          </p>
        </div>
      </div>
    </div>
  );
}
