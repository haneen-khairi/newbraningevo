import GoogleMap from "@/components/GoogleMap";
import {
  DirectionsRenderer,
  DirectionsService,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import MapDrawer from "../../../components/MapDrawer.jsx";
import TripPath from "@/components/TripPath";
import { IconWithPrimaryText } from "../../../components/IconWithPrimary.jsx";
import { IoColorPalette } from "react-icons/io5";
import CustomButton from "../../../components/Button.jsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import MarkerIcon from "@/assets/markerIcon.png";
import DriverStatus from "./components/DriverStatus.jsx";
import CancelTripModal from "./components/CancelTripModal.jsx";

export default function TripDetails({ isOpen, onClose, details, onCancel }) {
  const { t } = useTranslation();
  const [center, setCenter] = useState([13.3986, 52.5185]);
  const [path, setPath] = useState(null);
  const [cancelTripId, setCancelTripId] = useState(null);
  const isAwaitingDriver = details?.tripStatus == 8 || 1;
  useEffect(() => {
    if (!details) return;
    setCenter([details?.pickupLatitude, details?.pickupLongitude]);
  }, [details]);
  const pickupCoords = {
    lat: details?.pickupLatitude,
    lng: details?.pickupLongitude,
  };
  const dropOffCoords = {
    lat: details?.dropOffLatitude,
    lng: details?.dropOffLongitude,
  };

  function assignPath(path) {
    setPath(path);
  }
  return (
    <MapDrawer
      drawerContent={<TripDetailsContent data={details} />}
      open={isOpen}
      onClose={() => {
        onClose();
        setPath(null);
      }}
      title={t("orderDetails")}
      footer={
        isAwaitingDriver && (
          <div className={"grid grid-cols-2 gap-3"}>
            <CustomButton
              className={"w-full"}
              style={{
                border: "1px solid #C0CCE3",
                backgroundColor: "#F3F5FA",
                borderRadius: "15px",
              }}
            >
              {t("callSupport")}
            </CustomButton>

            <CustomButton
              variant="error"
              className={"w-full"}
              onClick={() => onCancel(details?.id)}
            >
              {t("cancelOrder")}
            </CustomButton>
          </div>
        )
      }
    >
      <GoogleMap
        center={{
          lat: center[0],
          lng: center[1],
        }}
        zoom={13}
      >
        <MarkerF
          position={pickupCoords}
          icon={{
            url: MarkerIcon,
            scaledSize: { width: 62, height: 32 },
          }}
          label={{
            text: details?.pickupName,
            color: "#fff",
          }}
        />
        <MarkerF
          position={dropOffCoords}
          icon={{
            url: MarkerIcon,
            scaledSize: { width: 120, height: 32 },
          }}
          label={{
            text: details?.dropOffName,
            color: "#fff",
          }}
        />
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
      </GoogleMap>
    </MapDrawer>
  );
}

function TripDetailsContent({ data }) {
  const { t } = useTranslation();
  const startPoint = data?.pickupName;
  const endPoint = data?.dropOffName;
  const returnPoint = data?.returnName;
  const pathObject = [
    {
      name: t("start"),
      distance: startPoint,
    },
    {
      name: t("end"),
      distance: endPoint,
    },
  ];
  if (returnPoint) {
    pathObject.push({
      name: t("return"),
      distance: returnPoint,
    });
  }
  const startTime = data?.tripRequestTime;
  const timeArrival = calculateEstimatedArrival(startTime, data?.estimateTime);
  return (
    <>
      <DriverStatus status={data?.tripStatus} />
      <div
        className={"flex flex-col gap-2 p-3 rounded-xl"}
        style={{
          boxShadow: "0px 4px 75px 0px #0000000D",
        }}
      >
        <div className={"flex justify-between"}>
          <svg
            width="105"
            height="42"
            viewBox="0 0 105 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2235_28381)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.945 1.92888C49.6752 2.98734 54.4053 4.04321 59.1354 5.10167C55.7154 7.60266 52.2953 10.1011 48.8753 12.6021C36.9426 13.7537 28.4487 13.0938 26.0894 9.20755C27.0351 8.71453 27.9833 8.22406 28.9289 7.73105C14.6144 7.14349 10.6633 11.1745 6.79281 15.243C9.77122 13.5653 13.1017 12.4117 16.7472 11.7334C11.0377 13.5864 4.71619 16.4335 1.6784 19.569C5.39246 24.795 9.68333 28.764 16.8788 28.2176C16.3097 29.9549 16.433 30.0718 15.8639 31.8091C8.42555 32.6848 3.27084 31.0933 0.869686 26.5283C2.10784 35.9322 17.2509 36.2973 30.885 37.6448C30.7361 29.1328 30.2094 18.816 42.1969 18.3429C51.7259 17.9658 50.9121 26.5475 49.8593 33.5908C62.7588 31.6564 76.7305 29.7076 89.63 27.7732C90.1063 22.1651 91.7702 13.4226 97.7065 12.9894C104.549 12.4848 103.698 21.4752 101.744 25.3426C105.182 21.0717 105.345 15.4402 103.269 8.87579C98.0124 8.03756 92.7534 7.19679 87.4971 6.35857C73.742 1.97244 59.7772 -0.98439 44.945 1.92888ZM51.8593 13.5412C57.7573 5.37169 74.4865 1.34314 85.0927 6.93172C87.5789 8.24304 86.3109 8.45188 84.6758 8.81383C83.0433 9.17574 62.7981 11.9637 51.8593 13.5386L51.8593 13.5412Z"
                fill="url(#paint0_linear_2235_28381)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.3606 14.1977C39.589 12.6496 32.9721 17.3871 30.5837 24.7746C28.19 32.1622 30.9338 39.4083 36.7002 40.9565C42.4718 42.5046 49.0888 37.7697 51.4772 30.3822C53.8708 22.9946 51.127 15.7459 45.3606 14.1977ZM45.6697 21.09C48.828 21.9385 50.3308 25.9108 49.0208 29.959C47.7134 34.0072 44.0881 36.6019 40.9246 35.7535C37.7663 34.905 36.2636 30.9353 37.5736 26.8871C38.8836 22.8388 42.5089 20.2442 45.6698 21.0926L45.6697 21.09Z"
                fill="url(#paint1_linear_2235_28381)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M97.4514 8.27078C92.5024 6.94199 86.8257 11.0057 84.7796 17.3416C82.7283 23.6749 85.0784 29.8914 90.0247 31.2176C94.9736 32.5464 100.648 28.4853 102.697 22.1494C104.748 15.8161 102.398 9.59702 97.4514 8.27078ZM97.7164 14.1796C100.426 14.9061 101.713 18.3135 100.59 21.7853C99.4671 25.257 96.3579 27.4818 93.6459 26.7528C90.9366 26.0262 89.647 22.6189 90.7724 19.1497C91.8953 15.6779 95.0045 13.4531 97.7164 14.1796Z"
                fill="url(#paint2_linear_2235_28381)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_2235_28381"
                x1="52.4158"
                y1="0.831027"
                x2="53.1444"
                y2="46.4217"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D8D8D8" />
                <stop offset="1" stop-color="#D8D8D8" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2235_28381"
                x1="40.8125"
                y1="13.9402"
                x2="41.3575"
                y2="48.0439"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D8D8D8" />
                <stop offset="1" stop-color="#D8D8D8" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2235_28381"
                x1="93.5512"
                y1="8.04959"
                x2="94.0185"
                y2="37.296"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D8D8D8" />
                <stop offset="1" stop-color="#D8D8D8" stop-opacity="0" />
              </linearGradient>
              <clipPath id="clip0_2235_28381">
                <rect
                  width="103.903"
                  height="40.2006"
                  fill="white"
                  transform="matrix(-0.999872 0.0159778 0.0159778 0.999872 104.359 0)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className={"flex flex-col items-end"}>
            <p className={"text-[#767676]"}>#{data?.id?.split("-")[0]}</p>
            <p className={"mt-2"}>
              {data?.isReturn ? t("twoWay") : t("oneWay")}
            </p>
          </div>
        </div>
        <div
          className={"border border-solid border-slate-100 rounded-xl p-2 mb-2"}
        >
          <TripPath paths={pathObject} />
        </div>
        <div
          className={"border border-solid border-slate-100 rounded-xl p-2 mb-2"}
        >
          <IconWithPrimaryText
            icon={<IoColorPalette />}
            main={t("estimatedArrival")}
            secondary={timeArrival}
          />
        </div>
      </div>
    </>
  );
}

function calculateEstimatedArrival(startTime, minutesRemaining) {
  const startDate = dayjs(startTime);
  const endDate = dayjs(minutesRemaining, "HH:mm:ss");
  const finalTime = startDate.add(endDate.minute(), "minutes");
  return finalTime.format("HH:mm a");
}
