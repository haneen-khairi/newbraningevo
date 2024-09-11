import { Avatar, Button } from "antd";
import Drawer from "@/components/Drawer";

import { useTranslation } from "react-i18next";
import FlatButton from "@/components/FlatButton";
import {IoClose, IoCloseOutline} from "react-icons/io5";
import FormButton from "@/components/forms/FormButton";
import { FaEye } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineBadge } from "react-icons/md";
import ComplexTable from "@/components/ComplexTable";
import StatusButton from "@/components/restaurant/StatusButton";
import IconText from "@/components/IconText";
import GoogleMap from "@/components/GoogleMap";
import { MarkerF, PolylineF } from "@react-google-maps/api";
import { useReducer, useState } from "react";
import Bus from "@/assets/icons/bus.png";
import BackArrow from "@/assets/icons/back-arrow.svg?react";
import { useQuery } from "@tanstack/react-query";
import { GetBusTrips } from "@/services/bus_trips";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusIndicator from "../TripStatusIndicator";
import dayjs from "dayjs";

export default function DriverDetailsDrawer({ isOpen, onClose, onEdit }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState("details"); //details, location
  return (
    <Drawer
      title="Driver Details"
      placement="left"
      closable={false}
      onClose={()=>{
          onClose()
          setMode('details')
      }}
      open={isOpen}
      width={"75%"}
      bodyStyle={{
        padding: mode == "location" ? "0px" : "16px",
      }}
      headerStyle={{ background: "#FAFAFA", borderBottom: "none" }}
      extra={
        <>
            {mode == 'details' && <FlatButton className={'rounded-full'}>
                <IoCloseOutline size={24} onClick={onClose} />
            </FlatButton>}
            {
                mode == 'location' && <FlatButton className={'rounded-xl'} onClick={
                    ()=>{
                        setMode('details')
                    }
                }>
                    {t('backToDetails')}
                </FlatButton>
            }
          </>

      }

    >
      {mode === "details" ? (
        <DriverDetails setMode={setMode} details={isOpen} onEdit={onEdit} />
      ) : (
        <DriverMap
          location={{
            lat: isOpen?.busInfo?.driverInfo?.geoLocation?.latitude,
            lng: isOpen?.busInfo?.driverInfo?.geoLocation?.longitude,
          }}
        />
      )}
    </Drawer>
  );
}

export function DriverMap({ location }) {
  return (
    <GoogleMap
      center={location}
      zoom={10}
      options={{
        disableDefaultUI: true,
      }}
    >
      <MarkerF
        position={location}
        icon={{
          url: Bus,
          scaledSize: { width: 32, height: 32 },
        }}
      />
    </GoogleMap>
  );
}

function DriverDetails({ details, setMode, onEdit }) {
  const { t, i18n } = useTranslation();
  const driverId = details?.id;
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data: driverOrders, isPending } = useQuery({
    queryKey: ["busDriverOrders", driverId, filterOptions],
    queryFn: () => GetBusTrips({ id: driverId, ...filterOptions }),
    enabled: Boolean(driverId),
  });
  const orders = driverOrders?.data?.items ?? [];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <StatusButton
          count={details?.eventCount ?? 0}
          color={"#FE8800"}
          text={t("eventTrips")}
          icon={
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9971 24H4.00205C3.42377 23.9997 2.85238 23.8744 2.327 23.6328C1.80161 23.3912 1.33464 23.0389 0.958054 22.6C0.586765 22.1707 0.312604 21.6663 0.154335 21.1212C-0.00393474 20.5762 -0.0425767 20.0034 0.0410535 19.442C0.577965 16.5175 2.13802 13.8795 4.44205 12C2.13799 10.1199 0.578259 7.48109 0.0420537 4.556C-0.0414128 3.99502 -0.0027817 3.42262 0.155307 2.87794C0.313396 2.33326 0.587216 1.82913 0.958054 1.4C1.33464 0.961146 1.80161 0.608844 2.327 0.36721C2.85238 0.125575 3.42377 0.000313842 4.00205 0L13.9971 0C14.5753 0.000512143 15.1466 0.125862 15.672 0.367483C16.1973 0.609104 16.6643 0.9613 17.0411 1.4C17.4119 1.82895 17.6859 2.33285 17.8444 2.87732C18.0028 3.42179 18.0419 3.99403 17.9591 4.555C17.4174 7.48095 15.8541 10.1194 13.5481 12C15.8528 13.8822 17.4143 16.5217 17.9541 19.448C18.037 20.0091 17.9979 20.5815 17.8395 21.1262C17.6811 21.6708 17.407 22.1749 17.0361 22.604C16.6595 23.0413 16.1932 23.3924 15.6687 23.6333C15.1443 23.8742 14.5742 23.9993 13.9971 24ZM13.9971 2H4.00205C3.71199 1.99982 3.4253 2.06227 3.16159 2.18308C2.89787 2.30389 2.66335 2.48022 2.47405 2.7C2.28921 2.91043 2.15261 3.15874 2.07384 3.42753C1.99507 3.69632 1.97603 3.97908 2.01805 4.256C2.39405 6.756 3.94205 9.096 6.61805 11.213C6.7363 11.3066 6.83183 11.4258 6.8975 11.5615C6.96318 11.6973 6.99729 11.8462 6.99729 11.997C6.99729 12.1478 6.96318 12.2967 6.8975 12.4325C6.83183 12.5682 6.7363 12.6874 6.61805 12.781C3.94205 14.9 2.39705 17.242 2.01805 19.741C1.97558 20.0184 1.99439 20.3017 2.07317 20.5711C2.15195 20.8404 2.28879 21.0892 2.47405 21.3C2.66335 21.5198 2.89787 21.6961 3.16159 21.8169C3.4253 21.9377 3.71199 22.0002 4.00205 22H13.9971C14.2871 22.0002 14.5738 21.9378 14.8376 21.817C15.1013 21.6962 15.3358 21.5198 15.5251 21.3C15.7099 21.0899 15.8464 20.842 15.9252 20.5735C16.004 20.3051 16.0231 20.0226 15.9811 19.746C15.6081 17.259 14.0611 14.917 11.3811 12.784C11.2635 12.6903 11.1686 12.5714 11.1034 12.436C11.0382 12.3006 11.0043 12.1523 11.0043 12.002C11.0043 11.8517 11.0382 11.7034 11.1034 11.568C11.1686 11.4326 11.2635 11.3137 11.3811 11.22C14.0621 9.087 15.6091 6.745 15.9811 4.257C16.0229 3.97955 16.0033 3.69629 15.9237 3.42725C15.844 3.1582 15.7062 2.90994 15.5201 2.7C15.3313 2.4808 15.0976 2.30482 14.8348 2.18403C14.572 2.06324 14.2863 2.00047 13.9971 2ZM12.6781 20H5.31505C5.15143 19.9999 4.99033 19.9597 4.84587 19.8829C4.70141 19.806 4.57802 19.6949 4.48651 19.5593C4.395 19.4236 4.33817 19.2676 4.321 19.1049C4.30383 18.9422 4.32686 18.7777 4.38805 18.626C5.17113 16.9351 6.36426 15.4666 7.85905 14.354L8.37705 13.942C8.55401 13.8012 8.77344 13.7246 8.99955 13.7246C9.22566 13.7246 9.4451 13.8012 9.62205 13.942L10.1311 14.348C11.6237 15.465 12.8169 16.934 13.6041 18.624C13.6656 18.7758 13.689 18.9403 13.6721 19.1033C13.6552 19.2662 13.5985 19.4224 13.5071 19.5583C13.4156 19.6942 13.2922 19.8055 13.1476 19.8826C13.0031 19.9596 12.8418 19.9999 12.6781 20ZM7.03105 18H10.9591C10.3885 17.2563 9.72965 16.5847 8.99705 16C8.26121 16.5824 7.6008 17.2543 7.03105 18Z"
                fill="#FE8800"
              />
            </svg>
          }
        />
        <StatusButton
          count={details?.tripCount ?? 0}
          color={"#219653"}
          text={t("trips")}
          icon={
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 2H18.5V1C18.5 0.448 18.053 0 17.5 0C16.947 0 16.5 0.448 16.5 1V2H8.5V1C8.5 0.448 8.053 0 7.5 0C6.947 0 6.5 0.448 6.5 1V2H5.5C2.743 2 0.5 4.243 0.5 7V19C0.5 21.757 2.743 24 5.5 24H19.5C22.257 24 24.5 21.757 24.5 19V7C24.5 4.243 22.257 2 19.5 2ZM5.5 4H19.5C21.154 4 22.5 5.346 22.5 7V8H2.5V7C2.5 5.346 3.846 4 5.5 4ZM19.5 22H5.5C3.846 22 2.5 20.654 2.5 19V10H22.5V19C22.5 20.654 21.154 22 19.5 22ZM19.5 14C19.5 14.552 19.053 15 18.5 15H6.5C5.947 15 5.5 14.552 5.5 14C5.5 13.448 5.947 13 6.5 13H18.5C19.053 13 19.5 13.448 19.5 14ZM12.5 18C12.5 18.552 12.053 19 11.5 19H6.5C5.947 19 5.5 18.552 5.5 18C5.5 17.448 5.947 17 6.5 17H11.5C12.053 17 12.5 17.448 12.5 18Z"
                fill="#219653"
              />
            </svg>
          }
        />
      </div>
      <section
        id="driver-details"
        className="p-4 rounded-xl "
        style={{
          boxShadow: "0px 4px 75px 0px #0000000D",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Avatar shape="square" size={62} />
            <div className="flex flex-col justify-between">
              <div className="text-lg ">{details?.userInfo?.name}</div>
              <div className="text-sm">{details?.userInfo?.email}</div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <FormButton
              className="text-black flex items-center gap-2"
              onClick={() => setMode("location")}
            >
              <FaEye />
              {t("displayLocation")}
            </FormButton>
            <FormButton
              className=" flex items-center gap-2"
              onClick={() => onEdit(details)}
            >
              <LuFileEdit />
              {t("edit")}
            </FormButton>
          </div>
        </div>
        <div
          className="my-4 p-4 rounded-xl flex gap-3"
          id="car-details"
          style={{
            background:
              "linear-gradient(180deg, #F8F8F8 0%, rgba(240, 240, 240, 0) 125.04%)",
          }}
        >
          <img
            className="w-24 h-12 object-contain"
            src="https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png"
          ></img>
          <div className="flex flex-col gap-2">
            <div className="text-md">
              {i18n.language == "ar"
                ? details?.busInfo?.nameAr
                : details?.busInfo?.nameEn}
            </div>
            <div className="text-xs">
              {i18n.language == "ar"
                ? details?.busInfo?.nameAr
                : details?.busInfo?.nameEn}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center" id="join-date">
          <FlatButton shape="circle" className="text-[#AFAFAF]">
            <LuCalendarDays size={20} />
          </FlatButton>
          <span className="text-sm text-gray-400">{t("joinDate")}</span>
          <span className="font-semibold">
            {new Date(details?.userInfo?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="h-1 w-full border-t border-[#EFEFEF] border-solid my-2"></div>
        <div className="flex justify-between">
          <IconText
            icon={<BiPhoneCall size={20} />}
            text={details?.userInfo?.phoneNumber}
          />
          <IconText
            icon={<MdOutlineEmail size={20} />}
            text={details?.userInfo?.email}
          />
          <IconText
            icon={<MdOutlineBadge size={20} />}
            text={details?.userInfo?.identityId}
          />
        </div>
      </section>
      <div className=" border border-[#EFEFEF] border-solid my-4 rounded-xl py-2 px-3 ">
        <ComplexTable
          hasAdd={false}
          tableTitle={t("trips")}
          data={orders}
          loading={isPending}
          columns={[
            {
              title: t("orderDate"),
              dataIndex: "createdAt",
              key: "createdAt",
              render: (value) => dayjs(value).format("DD MMMM YYYY"),
            },
            {
              title: t("orderNumber"),
              dataIndex: "id",
              key: "id",
              render: (value) => value.split("-")[0],
            },
            {
              title: t("clientName"),
              dataIndex: ["userInfo", "name"],
              key: "userInfo",
            },
            {
              title: t("startPoint"),
              dataIndex: ["originBuildingInfo", "name"],
              key: "originBuildingInfo",
            },
            {
              title: t("endPoint"),
              dataIndex: ["destinationBuildingInfo", "name"],
              key: "destinationBuildingInfo",
            },
            {
              title: t("status"),
              dataIndex: "status",
              key: "status",
              render: (value) => <StatusIndicator v={value} />,
            },
          ]}
          searchFunction={(e) => {
            dispatch({ type: "search", payload: e.target.value });
          }}
          onChange={(pagination, filter, sorter, { action }) => {
            if (action == "paginate") {
              dispatch({ type: "paginate", payload: pagination });
            }
            if (action == "sort") {
              dispatch({ type: "sort", payload: sorter });
            }
          }}
          paginationConfig={{
            current: filterOptions.page,
            pageSize: filterOptions.pageSize,
            total: driverOrders?.data?.totalCount ?? 0,
          }}
        />
      </div>
    </>
  );
}
