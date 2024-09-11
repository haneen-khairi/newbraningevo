import { Avatar, Button, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import FlatButton from "@/components/FlatButton";
import { IoClose } from "react-icons/io5";
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
import {useState} from "react";
import {DriverMap} from "../../busses/drivers/detailsDrawer.jsx";
import dayjs from "dayjs";
import {GetVipTrips} from "../../../services/vip_trips.js";
export default function DriverDetailsDrawer({ isOpen, onClose, onEdit }) {
  const { t ,i18n} = useTranslation();
  const [mode, setMode] = useState("details");
  const {data: driverTrips} = GetVipTrips({
      DriverId: isOpen?.id,
  })
  return (
    <Drawer
      title="Driver Details"
      placement="left"
      closable={false}
      onClose={onClose}
      open={isOpen}
      width={"75%"}
      styles={{
        body: {
          padding: mode == 'map' ? "0px" : "16px",
        },
      }}
      headerStyle={{ background: "#FAFAFA", borderBottom: "none" }}
      extra={
        <FlatButton shape="circle" onClick={()=>{
          mode == 'details' ? onClose() : setMode("details")
        }}>
          {
            mode == 'details' ? <IoClose size={20}/> : <Button className={'rounded-xl'} size={20}>
              {t("backToDetails")}
            </Button>
          }
        </FlatButton>
      }
    >
      {
        mode === "details" ? (
            <DriverDetails driver={isOpen} onChangeMode={setMode} onEdit={onEdit} driverTrips={driverTrips}/>
        ) : (
            <DriverMap  />
        )
      }
    </Drawer>
  );
}

function DriverDetails({driver, onChangeMode, onEdit, driverTrips}){
  const { t,i18n } = useTranslation();
  return (
      <>
        <div className="grid grid-cols-2 gap-2 mb-3">

          <StatusButton
              count={driver?.tripCount ?? 0}
              color={"#0A0F1A"}
              text={t("trips")}
              icon={
                <svg
                    width="23"
                    height="28"
                    viewBox="0 0 23 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.7692 27.4111C10.2101 27.3822 8.64961 27.4585 7.09183 27.3732C4.10714 27.2097 1.47328 24.9199 1.01788 22.1139C0.447796 18.6007 2.73893 15.4709 6.39626 14.7694C6.80442 14.6912 7.21731 14.6649 7.63358 14.6655C10.4044 14.6674 13.1759 14.661 15.9467 14.6681C19.9549 14.679 23.0063 17.9018 22.6204 21.7061C22.3135 24.7295 19.6351 27.2001 16.446 27.3752C14.8882 27.4604 13.3277 27.3829 11.7686 27.4117L11.7692 27.4111ZM11.7881 25.3297C13.2913 25.3297 14.7978 25.3867 16.2975 25.3168C18.7216 25.204 20.5661 23.2149 20.4899 20.8943C20.4143 18.5782 18.4436 16.7315 16.0122 16.7219C13.1961 16.711 10.3794 16.711 7.56341 16.7219C5.13262 16.7315 3.16127 18.5789 3.08571 20.8943C3.01015 23.2143 4.85534 25.2027 7.27871 25.3162C8.77847 25.3861 10.2843 25.329 11.7881 25.329V25.3297Z"
                      fill="#4F4F4F"
                  />
                  <path
                      d="M5.53129 5.81599C5.54232 2.59664 8.11598 -0.00469342 11.2853 6.35824e-06C14.4697 0.00470614 17.0422 2.62483 17.0312 5.85358C17.0202 9.08586 14.4407 11.6784 11.2482 11.6666C8.08115 11.6549 5.52025 9.03416 5.53129 5.81599ZM11.2888 1.88227C9.14359 1.87639 7.40014 3.62883 7.38737 5.80482C7.37401 7.99845 9.10527 9.77849 11.2592 9.78495C13.4247 9.792 15.1682 8.04016 15.1757 5.84947C15.1833 3.6582 13.4491 1.88814 11.2894 1.88227H11.2888Z"
                      fill="#4F4F4F"
                  />
                </svg>
              }
          />
          <StatusButton
              count={driver?.eventCount ?? 0}
              color={"#0A0F1A"}
              text={t("events")}
              icon={
                <svg
                    width="23"
                    height="28"
                    viewBox="0 0 23 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.7692 27.4111C10.2101 27.3822 8.64961 27.4585 7.09183 27.3732C4.10714 27.2097 1.47328 24.9199 1.01788 22.1139C0.447796 18.6007 2.73893 15.4709 6.39626 14.7694C6.80442 14.6912 7.21731 14.6649 7.63358 14.6655C10.4044 14.6674 13.1759 14.661 15.9467 14.6681C19.9549 14.679 23.0063 17.9018 22.6204 21.7061C22.3135 24.7295 19.6351 27.2001 16.446 27.3752C14.8882 27.4604 13.3277 27.3829 11.7686 27.4117L11.7692 27.4111ZM11.7881 25.3297C13.2913 25.3297 14.7978 25.3867 16.2975 25.3168C18.7216 25.204 20.5661 23.2149 20.4899 20.8943C20.4143 18.5782 18.4436 16.7315 16.0122 16.7219C13.1961 16.711 10.3794 16.711 7.56341 16.7219C5.13262 16.7315 3.16127 18.5789 3.08571 20.8943C3.01015 23.2143 4.85534 25.2027 7.27871 25.3162C8.77847 25.3861 10.2843 25.329 11.7881 25.329V25.3297Z"
                      fill="#4F4F4F"
                  />
                  <path
                      d="M5.53129 5.81599C5.54232 2.59664 8.11598 -0.00469342 11.2853 6.35824e-06C14.4697 0.00470614 17.0422 2.62483 17.0312 5.85358C17.0202 9.08586 14.4407 11.6784 11.2482 11.6666C8.08115 11.6549 5.52025 9.03416 5.53129 5.81599ZM11.2888 1.88227C9.14359 1.87639 7.40014 3.62883 7.38737 5.80482C7.37401 7.99845 9.10527 9.77849 11.2592 9.78495C13.4247 9.792 15.1682 8.04016 15.1757 5.84947C15.1833 3.6582 13.4491 1.88814 11.2894 1.88227H11.2888Z"
                      fill="#4F4F4F"
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
              <Avatar shape="square" size={62} src={driver?.userInfo?.picture}/>
              <div className="flex flex-col justify-between">
                <div className="text-lg ">{driver?.userInfo?.name}</div>
                <div className="text-sm">{driver?.userInfo?.email}</div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <FormButton className="text-black flex items-center gap-2" onClick={() => onChangeMode("map")}>
                <FaEye/>
                {t("displayLocation")}
              </FormButton>
              <FormButton className=" flex items-center gap-2" onClick={() => onEdit(driver)}>
                <LuFileEdit/>
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
              <div className="text-md">{i18n.language == "ar" ? driver?.carInfo?.nameAr : driver?.carInfo?.nameEn}</div>
              <div className="text-xs">{i18n.language == "ar" ? driver?.carInfo?.plateNumber : driver?.carInfo?.plateNumberEn}</div>
            </div>
          </div>
          <div className="flex gap-3 items-center" id="join-date">
            <FlatButton shape="circle" className="text-[#AFAFAF]">
              <LuCalendarDays size={20}/>
            </FlatButton>
            <span className="text-sm text-gray-400">{t("joinDate")}</span>
            <span className="font-semibold">
            {dayjs(driver?.userInfo?.createdAt).format("DD MMMM YYYY")}
            </span>
          </div>
          <div className="h-1 w-full border-t border-[#EFEFEF] border-solid my-2"></div>
          <div className="flex justify-between">
            <IconText
                icon={<BiPhoneCall size={20}/>}
                text={driver?.userInfo?.phoneNumber}
            />
            <IconText
                icon={<MdOutlineEmail size={20}/>}
                text={driver?.userInfo?.email}
            />
            <IconText
                icon={<MdOutlineBadge size={20}/>}
                text={driver?.userInfo?.identityId}
            />
          </div>
        </section>
        <div className="w-full border border-[#EFEFEF] border-solid my-4 rounded-xl py-2">
          <ComplexTable
              hasAdd={false}
              tableTitle={t("trips")}
              hasSearch={false}
              hasStatusFilter={false}
              data={driverTrips?.data?.items ?? []}
              columns={[
                  {
                      title: t("requestNumber"),
                      dataIndex: ["requestNumber"],
                      key: "requestNumber",
                      render: (value) => value?.split("-")[0],
                  },
                  {
                      title: t("requestDate"),
                      dataIndex: ["createdAt"],
                      key: "createdAt",
                  },
                  {
                      title: t("clientName"),
                      dataIndex: ["createdAt"],
                      key: "createdAt",
                  },
                  {
                      title: t("pointFrom"),
                      dataIndex: ["originBuildingInfo", "name"],
                      key: "originBuildingInfo",
                  },
                  {
                      title: t("pointTo"),
                      dataIndex: ["destinationBuildingInfo", "name"],
                      key: "destinationBuildingInfo",
                  },
                  {
                      title: t("status"),
                      dataIndex: ["status"],
                      key: "status",
                  },
              ]}
          />
        </div>
      </>
  )
}