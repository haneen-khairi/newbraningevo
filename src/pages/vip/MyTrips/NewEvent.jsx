import { Form, Radio, Slider, Switch } from "antd";
import { useTranslation } from "react-i18next";
import FormDatepicker from "../../../components/forms/FormDatepicker.jsx";
import FormTimepicker from "../../../components/forms/FormTimepicker.jsx";
import FormSelect from "../../../components/forms/FormSelect.jsx";
import LocationChooser from "./components/LocationChooser.jsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetVipEvents, ReserveVipEvent } from "../../../services/vip_events.js";
import useResultModal from "../../../hooks/useResultModal.js";
import errorNormalizer from "../../../utils/errorNormalizer.jsx";
import dayjs from "dayjs";
import { useLoading } from "./components/LoadingContext.jsx";

export default function NewEvent({
  selectedCoords,
  setSelectedCoords,
  onClose,
}) {
  const [selectedField, setSelectedField] = useState(null);

  const { t, i18n } = useTranslation();
  const { setLoading } = useLoading();
  const [form] = Form.useForm();
  const [estimatedTime, setEstimatedTime] = useState(0);
  const isTwoWay = Form.useWatch("isTwoWay", form);
  const { data: events } = GetVipEvents({
    isToDay: true,
  });
  const event = Form.useWatch("eventId", form);
  const goTime = Form.useWatch("startTime", form);
  const pickupCoords = Form.useWatch("pickup-coordinates", form);
  const globalModal = useResultModal();

  useEffect(() => {
    if (!event || !goTime || !pickupCoords || !events.data) return;
    //get estimated time from google maps distance matrix api
    const choosenEvent = events.data.find((e) => e.id === event);
    const distanceMatrixService =
      new window.google.maps.DistanceMatrixService();
    distanceMatrixService.getDistanceMatrix(
      {
        origins: [pickupCoords],
        destinations: [
          {
            lat: choosenEvent.destinationLatitude,
            lng: choosenEvent.destinationLongitude,
          },
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status == window.google.maps.DistanceMatrixStatus.OK) {
          const distance = response.rows[0].elements[0].duration.value;
          const time = distance / 60;
          const timeToAdd = Math.ceil(time / 30) * 30;
          const estTime = dayjs(goTime).add(timeToAdd, "minutes");
          form.setFieldValue("returnTime", estTime);
          setEstimatedTime(estTime);
        }
      },
    );
  }, [event, goTime, pickupCoords]);

  useEffect(() => {
    if (selectedField && selectedCoords) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          location: selectedCoords,
          language: i18n.language == "ar" ? "ar" : "en",
        },
        (result) => {
          const seperator = i18n.language == "ar" ? "،" : ",";
          const needed_result = result.find((route) =>
            route.types.includes("route"),
          );
          form.setFieldValue(
            selectedField + "-label",
            needed_result.formatted_address.split(seperator).at(0),
          );
          form.setFieldValue(selectedField + "-coordinates", selectedCoords);
        },
      );
    } else {
      setSelectedCoords(null);
    }
  }, [selectedField, selectedCoords]);
  const reserveMutation = ReserveVipEvent({
    onSuccess: () => {
      onClose();
      globalModal.success({
        title: t("success"),
        subtitle: t("orderPlacedSuccessfully"),
      });
    },
    onError: (e) => {
      const errorMsg = errorNormalizer(e);
      globalModal.error(t("error"), errorMsg);
    },
  });
  useEffect(() => {
    setLoading(reserveMutation.isPending);
  }, [reserveMutation]);

  function handleSubmit(v) {
    const finalValues = {
      pickupLatitude: v["pickup-coordinates"].lat,
      pickupLongitude: v["pickup-coordinates"].lng,
      pickupName: v["pickup-label"],
      eventId: v["eventId"],
    };
    if (isTwoWay) {
      finalValues.returnLatitude = v["endPoint-coordinates"].lat;
      finalValues.returnLongitude = v["endPoint-coordinates"].lng;
      finalValues.returnName = v["endPoint-label"];
    }
    reserveMutation.mutate(finalValues);
  }

  return (
    <Form
      className={"flex flex-col gap-1"}
      id={"eventForm"}
      form={form}
      layout={"vertical"}
      onFinish={handleSubmit}
    >
      <div
        className={"flex gap-2 items-center self-end px-4 py-3 rounded-full"}
        style={{
          boxShadow: "0px 4px 75px 0px #0000001A",
        }}
      >
        <Switch
          onChange={(checked) => {
            form.setFieldValue("isTwoWay", checked);
          }}
        />
        {t("twoWay")}
      </div>
      <Form.Item
        name={"eventId"}
        label={t("event")}
        rules={[{ required: true }]}
      >
        <FormSelect
          options={events?.data ?? []}
          fieldNames={{
            label: "name",
            value: "id",
          }}
        />
      </Form.Item>
      <Form.Item
        name={"startTime"}
        label={t("goTime")}
        rules={[{ required: true }]}
      >
        <FormTimepicker format="HH:mm" minuteStep={[30]} />
      </Form.Item>
      <Form.Item name={"isTwoWay"} hidden />

      <LocationChooser
        form={form}
        name="pickup"
        label={t("pickupPoint")}
        onChooseFromMap={() => {
          setSelectedField("pickup");
          setSelectedCoords(null);
        }}
      />

      {isTwoWay && (
        <>
          <Form.Item
            name={"returnTime"}
            label={t("returnTime")}
            rules={[{ required: true }]}
          >
            <FormTimepicker
              format="HH:mm"
              minuteStep={[30]}
              disabled={!event || !goTime || !pickupCoords}
              disabledHours={() => {
                if (!estimatedTime) return [];
                // prevent hours before goTime
                return [...Array(24).keys()].slice(0, estimatedTime.hour());
              }}
            />
          </Form.Item>
          <LocationChooser
            form={form}
            name="endPoint"
            label={t("returnPoint")}
            onChooseFromMap={() => {
              setSelectedField("endPoint");
              setSelectedCoords(null);
            }}
          />
        </>
      )}
    </Form>
  );
}
