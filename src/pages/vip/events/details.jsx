import CalendarIcon from "@/assets/icons/calendar.svg?react";
import FileEditIcon from "@/assets/icons/file-edit.svg?react";
import CarInfo from "@/components/CarInfo";
import ComplexTable from "@/components/ComplexTable";
import Drawer from "@/components/Drawer";
import { IconWithPrimaryText } from "@/components/IconWithPrimary";
import TripPath from "@/components/TripPath";
import { Avatar, Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StatusIndicator from "./StatusIndicator";
export default function EventDetails({ isOpen, onClose, data, onEdit }) {
  const { t, i18n } = useTranslation();
  const [label, setLabel] = useState(null);

  const destinationLocation =
    data?.destinationLatitude + " , " + data?.destinationLongitude;

  useEffect(() => {
    if (!destinationLocation) return;
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat: Number(data?.destinationLatitude),
          lng: Number(data?.destinationLongitude),
        },
        language: i18n.language == "ar" ? "ar" : "en",
      },
      (result) => {
        const seperator = i18n.language == "ar" ? "،" : ",";
        const needed_result = result.find(
          (route) =>
            route.types.includes("route") ||
            route.types.includes("sublocality_level_1")
        );
        if (needed_result) {
          setLabel(needed_result.formatted_address.split(seperator).at(0));
        }
      }
    );
  }, [destinationLocation]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={t("details")}
      width="60vw"
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          onClick={() => onClose()}
        >
          {t("close")}
        </Button>
      }
    >
      <div
        className="p-2 rounded-xl"
        style={{
          boxShadow: "0px 4px 75px 0px #0000000D",
        }}
      >
        <div className="flex justify-between items-center font-su">
          <p>{data?.name}</p>
          <div className="flex items-center gap-2">
            <StatusIndicator v={data?.status} />

            <Button
              className="h-full flex items-center justify-center gap-2 rounded-lg font-bold font-su"
              onClick={() => onEdit(data)}
              style={{
                borderColor: "#C0CCE3",
              }}
            >
              <FileEditIcon width={16} height={16} fill="#000" />
              {t("edit")}
            </Button>
          </div>
        </div>
        <div className="border-t border-solid border-[#efefef] my-4"></div>
        <IconWithPrimaryText
          icon={<CalendarIcon />}
          main={t("date")}
          secondary={dayjs(data?.eventDate).format("DD MMMM YYYY")}
        />
        <div className="my-2" />
        <TripPath
          paths={[
            {
              name: t("endPoint"),
              distance: label,
            },
          ]}
        />
      </div>
      {data?.drivers?.map((driver) => {
        return (
          <div
            className="p-2 rounded-lg bg-white mt-3"
            style={{
              boxShadow: "0px 4px 75px 0px #0000000D",
            }}
          >
            <div className="flex gap-2">
              <Avatar shape="square" size={62} />
              <div className="flex flex-col justify-between pt-3">
                <div className="text-normal ">
                  {driver?.userInfo?.name ?? driver?.userInfo.userName}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#25262F",
                  }}
                >
                  {driver?.userInfo.isActive ? t("active") : t("inActive")}
                </div>
              </div>
            </div>
            <CarInfo
              number={driver?.busInfo.plateNumber}
              type={
                i18n.language == "ar"
                  ? driver?.busInfo?.nameAr
                  : driver?.busInfo?.nameEn
              }
              name={
                i18n.language == "ar"
                  ? driver?.busInfo?.nameAr
                  : driver?.busInfo?.nameEn
              }
            />
          </div>
        );
      })}
      <div className="mt-3 rounded-xl border border-solid border-[#EFEFEF] p-2">
        <ComplexTable
          tableTitle={t("members")}
          hasStatusFilter={false}
          data={data?.riders ?? []}
          hasFilter={false}
          hasAdd={false}
          hasSearch={false}
          columns={[
            { title: t("name"), dataIndex: [0, "fullName"], key: "fullName" },
            { title: t("email"), dataIndex: [0, "email"], key: "email" },
            {
              title: t("phoneNumber"),
              dataIndex: [0, "phoneNumber"],
              key: "phoneNumber",
            },
            {
              title: t("bookingDate"),
              dataIndex: [0, "bookingDate"],
              key: "createdAt",
              render: (value) => dayjs(value).format("DD MMMM YYYY"),
            },
          ]}
        />
      </div>
    </Drawer>
  );
}
