import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import RequestStatus from "./RequestStatus";
// import FormButton from "../../../../components/forms/FormButton.jsx";
import { Button } from "antd";
import DriverInfo from "./DriverInfo.jsx";
// import LocationDot from "../../../../components/LocationDot.jsx";
// import { IconWithPrimaryText } from "../../../../components/IconWithPrimary.jsx";
//icons
import LocationIcon from "@/assets/icons/location.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import EmailIcon from "@/assets/icons/email.svg?react";
import PhoneIcon from "@/assets/icons/phone.svg?react";
import FileIcon from "@/assets/icons/file-edit.svg?react";
// import TripPath from "../../../../components/TripPath.jsx";
import dayjs from "dayjs";
// import DriverStatus from "../../MyTrips/components/DriverStatus.jsx";
import { IconWithPrimaryText } from "../../../../../components/IconWithPrimary.jsx";
import TripPath from "../../../../../components/TripPath.jsx";
import DriverStatus from "../../../../vip/MyTrips/components/DriverStatus.jsx";
import LocationDot from "../../../../../components/LocationDot.jsx";
import CompanyIcon from "../../../../../assets/icons/CompanyIcon.jsx";
import ListItemHelper from "./ListItemHelper.jsx";

export default function RequestDetailsContent({ data, onAssignNewDriver }) {
  const { t, i18n } = useTranslation();
  const hasReturn = data?.returnName && data?.returnLatitude;
  const paths = [
    {
      name: t("start"),
      distance: data?.pickupName,
    },
    {
      name: t("end"),
      distance: data?.dropOffName,
    },
  ];
  if (hasReturn) {
    paths.push({
      name: t("return"),
      distance: data?.returnName,
    });
  }
  const isNew = data?.tripStatus == 1;
  const accompanyingGuests = data?.accompanyingGuests;
  const accompanyingGuest = accompanyingGuests[0];
  return (
    <div className={"flex flex-col gap-3 h-full"}>
      <div className={"flex justify-between gap-2 items-center"}>
        {/* <p>#{data?.id?.split("-")[0]}</p> */}
        <h4 className="visit__header">
          {i18n.language === "ar"
            ? data?.visitReason?.nameAr
            : data?.visitReason?.nameEn}
        </h4>
        <RequestStatus status={String(data?.status)} />
      </div>
      {accompanyingGuests.length ?  <div className="p-[12px] border bg-[#F5F6F9] rounded-lg shadow-md w-full">
        {/* User Info */}
        <div className="flex justify-between items-center pb-4 border-b">
          <p className="visit__helper--title">{accompanyingGuest?.name || ""}</p>
          <p className="visit__helper--id">#{data?.requestNumber}</p>
        </div>
        <hr className="border-['#EBEBEB']" />

        {/* Contact Info */}
        <div className="pb-4 ">
          <div className="grid grid-cols-2 justify-between items-center">
            {/* <div className="flex items-center gap-[12px] space-x-2 rtl:space-x-reverse">
            <EmailIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">moha@gmail.com</p>
          </div> */}
              <ListItemHelper
                icon={<PhoneIcon className="w-5 h-5 text-gray-500" />}
                text={accompanyingGuest.phoneNumber || ""}
              />
            <ListItemHelper
              icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
              text={accompanyingGuest.identityId || ""}
            />
            {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="visit__helper--icon">
              <PhoneIcon className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-gray-600">+96645678765</p>
          </div> */}
          </div>
          <hr className="border-['#EBEBEB']" />
          <div className="grid grid-cols-2 justify-between items-center">
          <ListItemHelper
              icon={<EmailIcon className="w-5 h-5 text-gray-500" />}
              text={accompanyingGuest.email || ""}
            />
            <ListItemHelper
              icon={<LocationIcon className="w-5 h-5 text-gray-500" />}
              text={"المملكة العربية السعودية"}
            />
            
            {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <LocationIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">المملكة العربية السعودية</p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">98087777</p>
          </div> */}
          </div>
        </div>

        {/* Additional Info */}
        {accompanyingGuests.length > 1 ? <div className="pt-4 border-t">
          <button className="text-center text-gray-600 font-bold visit__helper--button">
            +{accompanyingGuests.length -1} مرافق
          </button>
        </div>: ""}
      </div> : ""}
      <div
        className={"flex justify-between items-center p-3 rounded-xl"}
        style={{
          background:
            "linear-gradient(180deg, #F8F8F8 0%, rgba(240, 240, 240, 0) 125.04%)",
        }}
      >
        <DriverStatus status={data?.tripStatus} />
        {isNew && (
          <Button
            className={"bg-[#F3F5F9]"}
            style={{
              border: "1px solid #C0CCE3",
              borderRadius: "11px",
            }}
            onClick={onAssignNewDriver}
          >
            {t("assignNewDriver")}
          </Button>
        )}
      </div>
      {/* <DriverInfo
        driver={{
          ...(data?.driverInfo ?? {}),
          carInfo: data?.carInfo,
        }}
      >
        <div className={"flex gap-2"}>
          <TripPath paths={paths} />
        </div>
      </DriverInfo> */}
      <div
        className={
          "flex flex-col gap-3 rounded-xl p-2 border-solid border border-[#EDEDED]"
        }
      >
        <IconWithPrimaryText
          icon={<CalendarIcon />}
          main={t("startDateAndTime")}
          secondary={dayjs(data?.validFrom).format("DD MMMM YYYY, hh:mm a")}
        />
        <div className={"border-t border-[#EFEFEF] border-solid"} />

        <IconWithPrimaryText
          icon={<UserIcon />}
          main={t("host")}
          secondary={data?.requester?.fullName || data?.requester?.firstName}
        />
        <div className={"border-t border-[#EFEFEF] border-solid"} />

        <IconWithPrimaryText
          icon={<CompanyIcon />}
          main={t("companyName")}
          secondary={
            i18n.language === "ar"
              ? data?.room?.company?.nameAr
              : data?.room?.company?.nameEn
          }
        />

        <div className={"border-t border-[#EFEFEF] border-solid"} />
        <IconWithPrimaryText
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2177_6553)">
                <path
                  d="M17 14C17 14.2652 16.8946 14.5196 16.7071 14.7071C16.5196 14.8947 16.2652 15 16 15H8C7.73478 15 7.48043 14.8947 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14C7 13.7348 7.10536 13.4805 7.29289 13.2929C7.48043 13.1054 7.73478 13 8 13H16C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4805 17 13.7348 17 14ZM13 17H8C7.73478 17 7.48043 17.1054 7.29289 17.2929C7.10536 17.4805 7 17.7348 7 18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8947 7.73478 19 8 19H13C13.2652 19 13.5196 18.8947 13.7071 18.7071C13.8946 18.5196 14 18.2652 14 18C14 17.7348 13.8946 17.4805 13.7071 17.2929C13.5196 17.1054 13.2652 17 13 17ZM22 10.485V19C21.9984 20.3256 21.4711 21.5965 20.5338 22.5338C19.5964 23.4711 18.3256 23.9984 17 24H7C5.67441 23.9984 4.40356 23.4711 3.46622 22.5338C2.52888 21.5965 2.00159 20.3256 2 19V5.00002C2.00159 3.67443 2.52888 2.40358 3.46622 1.46624C4.40356 0.528905 5.67441 0.00161091 7 2.30487e-05H11.515C12.4346 -0.00234388 13.3456 0.177611 14.1952 0.529482C15.0449 0.881354 15.8163 1.39816 16.465 2.05002L19.949 5.53602C20.6012 6.18426 21.1184 6.95548 21.4704 7.805C21.8225 8.65451 22.0025 9.56545 22 10.485ZM15.051 3.46402C14.7363 3.15918 14.3829 2.89695 14 2.68402V7.00002C14 7.26524 14.1054 7.51959 14.2929 7.70713C14.4804 7.89467 14.7348 8.00002 15 8.00002H19.316C19.103 7.61721 18.8404 7.26417 18.535 6.95002L15.051 3.46402ZM20 10.485C20 10.32 19.968 10.162 19.953 10H15C14.2044 10 13.4413 9.68395 12.8787 9.12134C12.3161 8.55873 12 7.79567 12 7.00002V2.04702C11.838 2.03202 11.679 2.00002 11.515 2.00002H7C6.20435 2.00002 5.44129 2.31609 4.87868 2.8787C4.31607 3.44131 4 4.20437 4 5.00002V19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44129 21.684 6.20435 22 7 22H17C17.7956 22 18.5587 21.684 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19V10.485Z"
                  fill="#767676"
                />
              </g>
              <defs>
                <clipPath id="clip0_2177_6553">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
          main={t("tripType")}
          secondary={"اجتماع"}
        />
      </div>
      <div
        className={
          "flex flex-col gap-3 rounded-xl p-2 border-solid border border-[#EDEDED]"
        }
      >
        <IconWithPrimaryText
          icon={<LocationIcon />}
          main={"مكان الاستضافة"}
          secondary={
            i18n.language === "ar"
              ? data?.room?.company?.building?.nameAr
              : data?.room?.company?.building?.nameEn
          }
        />
      </div>
      {data?.tripStatus == 12 && (
        <div
          className={
            "mt-auto py-4 px-3 bg-[#F5F5F5] rounded-xl flex flex-col gap-4"
          }
        >
          <p>{t("requestFromDriver")}</p>
        </div>
      )}
    </div>
  );
}
