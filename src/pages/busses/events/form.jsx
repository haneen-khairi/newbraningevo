import FormSelect from "@/components/forms/FormSelect";
import { useBuildings } from "@/services/buildingsv2";
import { useQuery } from "@tanstack/react-query";
import { Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EventStatus from "../../../components/EventStatus.jsx";
import AppearancePossibility from "../../../components/appearancePossibility.jsx";
import { GetBusDrivers } from "../../../services/bus_drivers.js";
import LocationChooser from "../../vip/MyTrips/components/LocationChooser.jsx";

export default function EventForm({
  initialValues,
  onSubmit,
  mode,
  currentCoordinates,
}) {

  const { t, i18n } = useTranslation();
  const { data: drivers } = useQuery({
    queryKey: ["busDrivers"],
    queryFn: () => GetBusDrivers(),
  });
  const [form] = Form.useForm();
  const { data: buildings } = useBuildings();

  useEffect(() => {
    if (initialValues && mode === "edit") {
      const eventDate = initialValues.eventDate
        ? dayjs(initialValues.eventDate)
        : null;
      const toDate = initialValues.toDate ? dayjs(initialValues.toDate) : null;

      form.setFieldsValue({
        name: initialValues.name,
        nameEn: initialValues.nameEn,
        originBuildingId: initialValues.originBuildingInfo?.id,
        destinationBuildingId: initialValues.destinationBuildingInfo?.id,

        eventDate: eventDate
          ? [eventDate.startOf("day"), eventDate.endOf("day")]
          : [],
        eventTime: eventDate ? eventDate : null,
        toDate: toDate ? [toDate.startOf("day"), toDate.endOf("day")] : [],
        toTime: toDate ? toDate : null,
        drivers: initialValues?.drivers
          ? initialValues.drivers.map((el) => el.id)
          : [],
      });
    }
  }, [initialValues]);

  const [selectedField, setSelectedField] = useState(null);

  const destinationBuilding = `${initialValues?.destinationLatitude},${initialValues?.destinationLongitude}`;
  const [locationName, setLocationName] = useState();
  useEffect(() => {
    if (destinationBuilding&& window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      const splitBuilding = destinationBuilding.split(",");
      geocoder.geocode(
        {
          location: {
            lat: Number(splitBuilding[0]),
            lng: Number(splitBuilding[1]),
          },
          language: i18n.language == "ar" ? "ar" : "en",
        },

        (result) => {
          const seperator = i18n.language == "ar" ? "،" : ",";
          const needed_result = result?.find(
            (route) =>
              route.types.includes("route") ||
              route.types.includes("sublocality_level_1")
          );

          if (needed_result) {
            setLocationName(
              needed_result.formatted_address.split(seperator).at(0)
            );
          }
        }
      );
    }
  }, [destinationBuilding]);

  useEffect(() => {
    if (selectedField != null) {
      form.setFieldValue(selectedField, currentCoordinates);
    }
  }, [currentCoordinates]);

  //eventName, driver, date, time, start point, end point

  return (
    <Form
      form={form}
      layout="vertical"
      id="event-form"
      onFinish={(values) => {
        onSubmit(values, mode);
      }}
    >
      <div className="details rounded-lg shadow-md shadow-gray-100 p-2 mb-3">
        <div className="flex justify-end items-center pb-2 border-b border-solid border-gray-200">
          <span className="mx-6 text-gray-400">
            #{initialValues?.id?.split("-")[0]}
          </span>
          <EventStatus v={initialValues?.status} />
        </div>

        <div className="eventName flex items-center mt-1 py-2">
          <div className="bg-gray-50 px-4 py-3 rounded-lg">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1216_11041)">
                <path
                  d="M10.6667 16H8C6.52933 16 5.33333 17.196 5.33333 18.6667V21.3333C5.33333 22.804 6.52933 24 8 24H10.6667C12.1373 24 13.3333 22.804 13.3333 21.3333V18.6667C13.3333 17.196 12.1373 16 10.6667 16ZM8 21.3333V18.6667H10.6667V21.3333H8ZM25.3333 2.66667H24V1.33333C24 0.597333 23.404 0 22.6667 0C21.9293 0 21.3333 0.597333 21.3333 1.33333V2.66667H10.6667V1.33333C10.6667 0.597333 10.0707 0 9.33333 0C8.596 0 8 0.597333 8 1.33333V2.66667H6.66667C2.99067 2.66667 0 5.65733 0 9.33333V25.3333C0 29.0093 2.99067 32 6.66667 32H25.3333C29.0093 32 32 29.0093 32 25.3333V9.33333C32 5.65733 29.0093 2.66667 25.3333 2.66667ZM6.66667 5.33333H25.3333C27.5387 5.33333 29.3333 7.128 29.3333 9.33333V10.6667H2.66667V9.33333C2.66667 7.128 4.46133 5.33333 6.66667 5.33333ZM25.3333 29.3333H6.66667C4.46133 29.3333 2.66667 27.5387 2.66667 25.3333V13.3333H29.3333V25.3333C29.3333 27.5387 27.5387 29.3333 25.3333 29.3333Z"
                  fill="#0070DF"
                />
              </g>
              <defs>
                <clipPath id="clip0_1216_11041">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col mx-3">
            <h2>
              {i18n.language == "ar"
                ? initialValues?.name
                : initialValues?.nameEn}
            </h2>
            <span className="text-gray-400 mt-2 text-[13px]">
              <AppearancePossibility v={initialValues?.status} />
            </span>
          </div>
        </div>

        <div className="dateAndLocation mt-2 border border-solid border-gray-200 p-2 rounded-lg">
          <div className="eventDate flex items-center border-b border-gray-200 border-solid pb-2">
            <div className="p-3 flex items-center bg-gray-50 rounded-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1216_11058)">
                  <path
                    d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z"
                    fill="#767676"
                  />
                  <path
                    d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
                    fill="#767676"
                  />
                  <path
                    d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z"
                    fill="#767676"
                  />
                  <path
                    d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1216_11058">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col mx-3">
              <p>{t("eventDate")}</p>
              <span className=" mt-2">
                {`${dayjs(initialValues?.eventDate)
                  .locale(i18n?.language)
                  .format("DD MMMM YY")} , ${dayjs(initialValues?.toDate)
                  .locale(i18n?.language)
                  .format("DD MMMM YY")}`}
              </span>
            </div>
          </div>

          <div className="eventTime flex items-center border-b border-gray-200 border-solid pb-2">
            <div className="p-3 flex items-center bg-gray-50 rounded-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1216_11078)">
                  <path
                    d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z"
                    fill="#767676"
                  />
                  <path
                    d="M12.0004 6C11.7352 6 11.4809 6.10536 11.2933 6.29289C11.1058 6.48043 11.0004 6.73478 11.0004 7V11.325L7.62943 13.437C7.404 13.5778 7.24374 13.8024 7.18392 14.0614C7.1241 14.3204 7.1696 14.5926 7.31043 14.818C7.45126 15.0434 7.67588 15.2037 7.93487 15.2635C8.19386 15.3233 8.466 15.2778 8.69143 15.137L12.5314 12.737C12.6765 12.6461 12.7958 12.5195 12.878 12.3692C12.9601 12.219 13.0022 12.0502 13.0004 11.879V7C13.0004 6.73478 12.8951 6.48043 12.7075 6.29289C12.52 6.10536 12.2657 6 12.0004 6Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1216_11078">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col mx-3 pt-2">
              <p>{t("displayEventTime")}</p>
              <span className=" mt-2">
                {`${dayjs(initialValues?.eventDate)
                  .locale(i18n.language)
                  .format("HH:mm A")} : ${dayjs(initialValues?.toDate)
                  .locale(i18n.language)
                  .format("HH:mm A")}`}
              </span>
            </div>
          </div>

          {locationName &&          <div className="eventTime flex items-center ">
            <div className="p-3 flex items-center bg-gray-50 rounded-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0009 13.4304C13.724 13.4304 15.1209 12.0336 15.1209 10.3104C15.1209 8.5873 13.724 7.19043 12.0009 7.19043C10.2777 7.19043 8.88086 8.5873 8.88086 10.3104C8.88086 12.0336 10.2777 13.4304 12.0009 13.4304Z"
                  stroke="#767676"
                  stroke-width="1.5"
                />
                <path
                  d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                  stroke="#767676"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div className="flex flex-col mx-3 pt-2">
              <p>{t("eventLocationOnMap")}</p>
              <span className=" mt-2">{locationName}</span>
            </div>
          </div>}


        </div>
      </div>

      <Form.Item label={t("selectDrivers")} name="drivers">
        <FormSelect
          placeholder={t("selectDrivers")}
          options={drivers?.data?.items ?? []}
          fieldNames={{ value: "id" }}
          tagRender={(option) => {
            if (!option.value) return null;
            //find driver in drivers
            option = drivers?.data?.items.find((d) => d.id === option.value);
            return (
              <p className="text-xs p-2 bg-slate-100 rounded-xl">
                {option?.userInfo?.fullName}
              </p>
            );
          }}
          mode="multiple"
          optionRender={(option) => {
            option = option.data;
            return (
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C15.309 12 18 9.309 18 6C18 2.691 15.309 0 12 0C8.69096 0 5.99996 2.691 5.99996 6C5.99996 9.309 8.69096 12 12 12ZM12 3C13.654 3 15 4.346 15 6C15 7.654 13.654 9 12 9C10.346 9 8.99996 7.654 8.99996 6C8.99996 4.346 10.346 3 12 3ZM16.934 22.286C17.053 23.106 16.577 24 15.448 24C14.715 24 14.073 23.461 13.966 22.714C13.824 21.736 12.98 21 12.001 21C11.022 21 10.177 21.737 10.036 22.714C9.91796 23.534 9.15796 24.103 8.33696 23.984C7.51696 23.866 6.94796 23.105 7.06696 22.285C7.41996 19.842 9.54096 17.999 12.001 17.999C14.461 17.999 16.583 19.841 16.935 22.285L16.934 22.286ZM21.972 22.413C22.02 23.24 21.389 23.95 20.562 23.998C20.532 23.999 20.502 24 20.473 24C19.684 24 19.023 23.385 18.977 22.587C18.762 18.893 15.697 16 12 16C8.30296 16 5.23796 18.894 5.02296 22.587C4.97496 23.414 4.26296 24.04 3.43796 23.997C2.61096 23.949 1.97996 23.239 2.02796 22.412C2.33596 17.134 6.71596 12.999 12 12.999C17.284 12.999 21.664 17.134 21.972 22.413Z"
                      fill="#E30101"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    {option?.userInfo?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {option?.busInfo?.nameAr}
                  </p>
                </div>
              </div>
            );
          }}
          suffixIcon={<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.76938 5.51665C8.66867 5.61819 8.54885 5.69879 8.41683 5.75379C8.28482 5.80879 8.14322 5.8371 8.00021 5.8371C7.8572 5.8371 7.7156 5.80879 7.58358 5.75379C7.45157 5.69879 7.33175 5.61819 7.23104 5.51665L2.26937 0.544156C2.16866 0.442617 2.04885 0.362022 1.91683 0.307023C1.78482 0.252023 1.64322 0.223708 1.50021 0.223708C1.35719 0.223708 1.2156 0.252023 1.08358 0.307023C0.951568 0.362022 0.83175 0.442617 0.731041 0.544156C0.529269 0.747132 0.416015 1.0217 0.416015 1.30791C0.416015 1.59411 0.529269 1.86868 0.731041 2.07166L5.70354 7.04416C6.31292 7.65277 7.13896 7.99463 8.00021 7.99463C8.86146 7.99463 9.6875 7.65277 10.2969 7.04416L15.2694 2.07166C15.4695 1.86987 15.5823 1.59752 15.5835 1.31332C15.5844 1.17075 15.557 1.02941 15.5031 0.897423C15.4492 0.765432 15.3698 0.645382 15.2694 0.544155C15.1687 0.442616 15.0488 0.362022 14.9168 0.307022C14.7848 0.252023 14.6432 0.223707 14.5002 0.223707C14.3572 0.223707 14.2156 0.252023 14.0836 0.307022C13.9516 0.362022 13.8318 0.442616 13.731 0.544155L8.76938 5.51665Z" fill="#38ACB1"/>
            </svg>
            }
        />
      </Form.Item>

      <LocationChooser
        name="originBuildingId"
        form={form}
        label={t("startPointFrom")}
        disabled={false}
        multiSelect={true}
      />

      <Form.Item label={t("departureTime")} name="eventTime">
        <TimePicker
          use12Hours
          format="h:mm a"
          className="w-full"
          suffixIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1216_11120)">
                <path
                  d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333ZM11.6667 10C11.668 10.2929 11.5921 10.5809 11.4467 10.8351C11.3012 11.0894 11.0914 11.3008 10.8382 11.4481C10.5851 11.5954 10.2976 11.6734 10.0047 11.6742C9.71186 11.675 9.42393 11.5987 9.16996 11.4528C8.91599 11.3069 8.70494 11.0967 8.55807 10.8433C8.41119 10.5899 8.33369 10.3023 8.33336 10.0094C8.33302 9.71655 8.40987 9.42876 8.55617 9.17503C8.70246 8.9213 8.91303 8.71061 9.16667 8.56417V5.83333C9.16667 5.61232 9.25447 5.40036 9.41075 5.24408C9.56703 5.0878 9.77899 5 10 5C10.221 5 10.433 5.0878 10.5893 5.24408C10.7455 5.40036 10.8333 5.61232 10.8333 5.83333V8.56417C11.0859 8.70942 11.2959 8.91854 11.4422 9.17056C11.5884 9.42257 11.6659 9.70862 11.6667 10Z"
                  fill="#38ACB1"
                />
              </g>
              <defs>
                <clipPath id="clip0_1216_11120">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      </Form.Item>
    </Form>
  );
}
