import { Form } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormDatepicker from "@/components/forms/FormDatepicker";
import FormTimepicker from "@/components/forms/FormTimepicker";
import { useTranslation } from "react-i18next";
import { useBuildings } from "@/services/buildingsv2";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { GetBusDrivers } from "../../../services/bus_drivers.js";
export default function EventForm({
  initialValues,
  onSubmit,
  mode,
  currentCoordinates,
}) {
  const { t, i18n } = useTranslation();
  const [selectedField, setSelectedField] = useState(null);
  const { data: drivers } = useQuery({
    queryKey: ["busDrivers"],
    queryFn: () => GetBusDrivers(),
  });
  const [form] = Form.useForm();
  const { data: buildings } = useBuildings();
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
          const needed_result = result.find(
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
      form.setFieldValue("endpoint-name", destinationBuilding.name);
    }
  }, [destinationBuilding]);

  useEffect(() => {
    if (selectedField != null) {
      form.setFieldValue(selectedField, currentCoordinates);
    }
  }, [currentCoordinates]);
  
  useEffect(() => {
    if (initialValues && mode === "edit") {
      let originCoordinates;
      let destinationCoordinates;
      if (initialValues?.originLatitude && initialValues?.originLongitude) {
        originCoordinates =
          initialValues.originLatitude + "," + initialValues.originLongitude;
      }
      if (
        initialValues?.destinationLatitude &&
        initialValues?.destinationLongitude
      ) {
        destinationCoordinates =
          initialValues.destinationLatitude +
          "," +
          initialValues.destinationLongitude;
      }
      form.setFieldsValue({
        name: initialValues.name,
        nameEn: initialValues.nameEn,
        eventDate: dayjs(initialValues.eventDate),
        originBuildingId: originCoordinates ?? 0,
        destinationBuildingId: destinationCoordinates ?? 0,
        eventTime: dayjs(initialValues.eventDate),
        drivers: initialValues.drivers,
      });
    }
  }, [initialValues]);

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
      <Form.Item
        label={t("eventName")}
        onClick={() => setSelectedField(null)}
        name="name"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormInput />
      </Form.Item>
      <Form.Item
        label={t("eventName") + " (EN)"}
        onClick={() => setSelectedField(null)}
        name="nameEn"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormInput />
      </Form.Item>
      <Form.Item
        label={t("eventDate")}
        onClick={() => setSelectedField(null)}
        name="eventDate"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormDatepicker />
      </Form.Item>
      <Form.Item
        label={t("eventTime")}
        onClick={() => setSelectedField(null)}
        name="eventTime"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormTimepicker format="HH:mm" />
      </Form.Item>
      
      <Form.Item
        label={t("endPoint")}
        name="destinationBuildingId"
        hidden
      ></Form.Item>

      <Form.Item
        label={t("endPoint")}
        name="endpoint-name"
        onClick={() => setSelectedField("destinationBuildingId")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormInput readOnly />
      </Form.Item>
    </Form>
  );
}
