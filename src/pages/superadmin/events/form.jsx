import FormInput from "@/components/forms/FormInput";
import FormTimepicker from "@/components/forms/FormTimepicker";
import { Col, DatePicker, Form, Row, Select, Switch } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LocationChooser from "../../vip/MyTrips/components/LocationChooser";

export default function EventForm({
  initialValues,
  onSubmit,
  mode,
  currentCoordinates,
}) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [selectFromMap, setSelectFromMap] = useState();

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
        eventType: initialValues.eventType,
        isActive: initialValues.isActive,

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

  const destinationBuilding = Form.useWatch("destinationBuildingId", form);

  useEffect(() => {
    if (destinationBuilding) {
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
            form.setFieldValue(
              "endpoint-name",
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

  const options = [
    {
      value: 1,
      label: t("busShuttle"),
    },
    {
      value: 2,
      label: t("vip"),
    },
    {
      value: 3,
      label: t("both"),
    },
  ];

  const statusOptions = [
    {
      value: true,
      label: t("active"),
    },
    {
      value: false,
      label: t("inactive"),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      id="event-form"
      onFinish={(values) => {
        onSubmit(values, mode);
      }}
    >
      <Form.Item label={t("appearancePossibility")} name="eventType">
        <Select
          suffixIcon={
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
                fill="#999"
              />
            </svg>
          }
          showSearch
          style={{ width: "100%" }}
          placeholder={t("appearancePossibility")}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
        />
      </Form.Item>

      <Form.Item label={t("eventStatus")} name="isActive">
        <Select
          suffixIcon={
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
                fill="#999"
              />
            </svg>
          }
          showSearch
          style={{ width: "100%" }}
          placeholder={t("eventStatus")}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={statusOptions}
        />
      </Form.Item>

      <Form.Item label={t("eventNameAr")} name="name">
        <FormInput />
      </Form.Item>

      <Form.Item label={t("eventNameEn")} name="nameEn">
        <FormInput />
      </Form.Item>

      <Form.Item label={t("eventDate")} name="eventDate">
        <DatePicker.RangePicker
          className="w-full"
          suffixIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10_20775)">
                <path
                  d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
                  fill="#999"
                />
                <path
                  d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z"
                  fill="#999"
                />
                <path
                  d="M5.8335 13.75C6.52385 13.75 7.0835 13.1904 7.0835 12.5C7.0835 11.8096 6.52385 11.25 5.8335 11.25C5.14314 11.25 4.5835 11.8096 4.5835 12.5C4.5835 13.1904 5.14314 13.75 5.8335 13.75Z"
                  fill="#999"
                />
                <path
                  d="M14.1665 13.75C14.8569 13.75 15.4165 13.1904 15.4165 12.5C15.4165 11.8096 14.8569 11.25 14.1665 11.25C13.4761 11.25 12.9165 11.8096 12.9165 12.5C12.9165 13.1904 13.4761 13.75 14.1665 13.75Z"
                  fill="#999"
                />
              </g>
              <defs>
                <clipPath id="clip0_10_20775">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
          placeholder={[t("pleaseSelectDate"), ""]}
        />
      </Form.Item>

      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label={t("eventTime")} name="eventTime">
            <FormTimepicker
              suffixIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_10_20786)">
                    <path
                      d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333ZM11.6667 10C11.668 10.2929 11.5921 10.5809 11.4467 10.8351C11.3012 11.0894 11.0914 11.3008 10.8382 11.4481C10.5851 11.5954 10.2976 11.6734 10.0047 11.6742C9.71186 11.675 9.42393 11.5987 9.16996 11.4528C8.91599 11.3069 8.70494 11.0967 8.55807 10.8433C8.41119 10.5899 8.33369 10.3023 8.33336 10.0094C8.33302 9.71655 8.40987 9.42876 8.55617 9.17503C8.70246 8.9213 8.91303 8.71061 9.16667 8.56417V5.83333C9.16667 5.61232 9.25447 5.40036 9.41075 5.24408C9.56703 5.0878 9.77899 5 10 5C10.221 5 10.433 5.0878 10.5893 5.24408C10.7455 5.40036 10.8333 5.61232 10.8333 5.83333V8.56417C11.0859 8.70942 11.2959 8.91854 11.4422 9.17056C11.5884 9.42257 11.6659 9.70862 11.6667 10Z"
                      fill="#999"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_20786">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              format="HH:mm"
              placeholder={t("eventTime")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t("toTime")} name="toTime">
            <FormTimepicker
              suffixIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_10_20786)">
                    <path
                      d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333ZM11.6667 10C11.668 10.2929 11.5921 10.5809 11.4467 10.8351C11.3012 11.0894 11.0914 11.3008 10.8382 11.4481C10.5851 11.5954 10.2976 11.6734 10.0047 11.6742C9.71186 11.675 9.42393 11.5987 9.16996 11.4528C8.91599 11.3069 8.70494 11.0967 8.55807 10.8433C8.41119 10.5899 8.33369 10.3023 8.33336 10.0094C8.33302 9.71655 8.40987 9.42876 8.55617 9.17503C8.70246 8.9213 8.91303 8.71061 9.16667 8.56417V5.83333C9.16667 5.61232 9.25447 5.40036 9.41075 5.24408C9.56703 5.0878 9.77899 5 10 5C10.221 5 10.433 5.0878 10.5893 5.24408C10.7455 5.40036 10.8333 5.61232 10.8333 5.83333V8.56417C11.0859 8.70942 11.2959 8.91854 11.4422 9.17056C11.5884 9.42257 11.6659 9.70862 11.6667 10Z"
                      fill="#999"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_20786">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              format="HH:mm"
              placeholder={t("toTime")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={t("eventLocationOnMap")}
        name="destinationBuildingId"
        hidden
      ></Form.Item>

      <div className="flex justify-between my-2">
        <label htmlFor="endpoint-name">{t("eventLocationOnMap")}</label>
        <div className="flex justify-end">
          <label className="mx-2">{t("selectFromMap")}</label>
          <Switch
            defaultChecked
            onChange={(e) => {
              setSelectFromMap(e);
            }}
          />
        </div>
      </div>
      {selectFromMap ? (
        <Form.Item
          name="endpoint-name"
          onClick={() => setSelectedField("destinationBuildingId")}
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
        >
          <FormInput
            className="mb-1"
            placeholder={t("eventLocationOnMap")}
            readOnly
          />
        </Form.Item>
      ) : (
        <LocationChooser
          name="originBuildingId"
          form={form}
          disabled={false}
          multiSelect={false}
          isSure={false}
        />
      )}
    </Form>
  );
}
