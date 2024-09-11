import MapDrawer from "@/components/MapDrawer";
import GoogleMap from "@/components/GoogleMap";
import {DirectionsRenderer, DirectionsService, MarkerF, PolylineF} from "@react-google-maps/api";
import MarkerIcon from "@/assets/markerIcon.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Typography } from "antd";
import IconText from "@/components/IconText";
import CarInfo from "@/components/CarInfo";
import User from "@/assets/icons/user.svg?react";
import Clock from "@/assets/icons/clock.svg?react";
import { IconWithPrimaryText } from "@/components/IconWithPrimary";
import TripPath from "../../../components/TripPath";


export default function TripsDrawer({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [dirResponse, setDirResponse] = useState(null);
  const path = [
    {
      lat: isOpen?.originBuildingInfo?.center[0][0],
      lng: isOpen?.originBuildingInfo?.center[0][1],
      name: isOpen?.originBuildingInfo?.name,
    },
    {
      lat: isOpen?.destinationBuildingInfo?.center[0][0],
      lng: isOpen?.destinationBuildingInfo?.center[0][1],
      name: isOpen?.destinationBuildingInfo?.name,
    },
  ];
  function assignPath(path) {
    setDirResponse(path);
  }
  return (
    <>
      <MapDrawer
        open={isOpen}
        onClose={()=>{
            onClose();
            setDirResponse(null);
        }}
        title={t("details")}
        drawerContent={<DrawerContent data={isOpen} />}
      >
        <GoogleMap center={path[0]}>
          {path?.map((step, index) => (
            <MarkerF
              key={index}
              position={step}
              icon={{ url: MarkerIcon, scaledSize: { width: 62, height: 32 } }}
              label={{
                text: step.name,
                color: "#fff",
                fontSize: "16px",
              }}
            />
          ))}
            {
                !dirResponse && <DirectionsService options={{
                    origin: isOpen?.originBuildingInfo?.center[0][0] + "," + isOpen?.originBuildingInfo?.center[0][1],
                    destination: isOpen?.destinationBuildingInfo?.center[0][0] + "," + isOpen?.destinationBuildingInfo?.center[0][1],
                    travelMode: "DRIVING",
                  }} callback={assignPath} />
            }
            {
                dirResponse && <DirectionsRenderer directions={dirResponse} options={{
                    suppressMarkers: true,
                  }} />
            }
        </GoogleMap>
      </MapDrawer>
    </>
  );
}

function DrawerContent({ data }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <div
        className="p-3 rounded-xl bg-white flex flex-col gap-2"
        style={{
          boxShadow: "0px 4px 75px 0px #0000000D",
        }}
      >
        <div className="flex items-center gap-3">
          <Avatar
            size={72}
            shape="square"
            src="https://avatars.dicebear.com/api/human/adam.svg"
          />
          <div className="flex justify-between flex-col">
            <Typography className="text-lg">
              {data?.driverInfo?.name ?? t("driver")}
            </Typography>
            <IconText
              icon={
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7074 4.50033C12.5213 4.65913 13.2694 5.05721 13.8558 5.64361C14.4422 6.23 14.8403 6.97805 14.9991 7.79199M11.7074 1.16699C13.3985 1.35486 14.9754 2.11214 16.1793 3.3145C17.3831 4.51686 18.1424 6.09283 18.3324 7.78366M8.52155 11.0529C7.52023 10.0516 6.72958 8.91937 6.14958 7.71135C6.09969 7.60744 6.07475 7.55549 6.05558 7.48975C5.98748 7.25612 6.0364 6.96923 6.17807 6.77138C6.21794 6.7157 6.26557 6.66807 6.36083 6.57281C6.65217 6.28147 6.79784 6.1358 6.89308 5.98932C7.25224 5.43691 7.25224 4.72476 6.89308 4.17235C6.79784 4.02587 6.65217 3.8802 6.36083 3.58886L6.19844 3.42647C5.75557 2.9836 5.53414 2.76217 5.29632 2.64188C4.82335 2.40266 4.2648 2.40266 3.79183 2.64188C3.55401 2.76217 3.33258 2.9836 2.88971 3.42647L2.75835 3.55783C2.31699 3.99919 2.09632 4.21986 1.92778 4.51989C1.74076 4.85281 1.60629 5.36989 1.60743 5.75174C1.60845 6.09586 1.67521 6.33105 1.80871 6.80142C2.52619 9.32925 3.87992 11.7145 5.8699 13.7045C7.85988 15.6945 10.2452 17.0482 12.773 17.7657C13.2434 17.8992 13.4786 17.966 13.8227 17.967C14.2045 17.9681 14.7216 17.8337 15.0545 17.6467C15.3546 17.4781 15.5752 17.2574 16.0166 16.8161L16.148 16.6847C16.5908 16.2419 16.8123 16.0204 16.9325 15.7826C17.1718 15.3096 17.1718 14.7511 16.9325 14.2781C16.8123 14.0403 16.5908 13.8189 16.148 13.376L15.9856 13.2136C15.6942 12.9223 15.5486 12.7766 15.4021 12.6814C14.8497 12.3222 14.1375 12.3222 13.5851 12.6814C13.4386 12.7766 13.293 12.9223 13.0016 13.2136C12.9064 13.3089 12.8587 13.3565 12.8031 13.3964C12.6052 13.538 12.3183 13.587 12.0847 13.5189C12.0189 13.4997 11.967 13.4747 11.8631 13.4249C10.6551 12.8449 9.52286 12.0542 8.52155 11.0529Z"
                    stroke="#AFAFAF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              text={data?.driverInfo?.phoneNumber ?? t("phoneNumber")}
            ></IconText>
          </div>
        </div>
        <CarInfo
          type={data?.busInfo?.nameAr}
          number={data?.busInfo?.plateNumber}
        />
      </div>
      <div className="flex items-center justify-between border-b border-[#EFEFEF] border-solid my-4 pb-2 font-semibold ">
        <Typography className="text-lg">{t("tripDetails")}</Typography>
        <div className="flex gap-2 items-center">
          <Typography
            style={{
              color: "#767676",
            }}
          >
            {data?.id.split("-")[0]}
          </Typography>
          <div className="py-2 px-4 rounded-full bg-orange-100 text-orange-400 ">
            {t(data?.status)}
          </div>
        </div>
      </div>
      <IconWithPrimaryText
        icon={<User />}
        main={t("userEmail")}
        secondary={data?.driverInfo?.email ?? t("email")}
      />
      <IconWithPrimaryText
        icon={<Clock />}
        main={t("estimatedTime")}
        secondary={data?.estimateTime ?? t("email")}
      />
      <TripPath
        paths={[
          {
            name: t("start"),
            distance: data?.originBuildingInfo?.name,
          },
          {
            name: t("end"),
            distance: data?.destinationBuildingInfo?.name,
          },
        ]}
      />
    </div>
  );
}
