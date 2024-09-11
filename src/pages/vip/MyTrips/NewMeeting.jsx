import { Form, Radio, Slider, Switch } from "antd";
import { useTranslation } from "react-i18next";
import FormDatepicker from "../../../components/forms/FormDatepicker.jsx";
import FormTimepicker from "../../../components/forms/FormTimepicker.jsx";
import FormSelect from "../../../components/forms/FormSelect.jsx";
import LocationChooser from "./components/LocationChooser.jsx";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateVipTrip } from "../../../services/vip_trips.js";
import useResultModal from "../../../hooks/useResultModal.js";
import dayjs from "dayjs";
import errorNormalizer from "../../../utils/errorNormalizer.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { DistanceMatrixService } from "@react-google-maps/api";
import { useLoading } from "./components/LoadingContext.jsx";

export default function NewMeeting({
  selectedCoords,
  setSelectedCoords,
  onClose,
}) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const isTwoWay = Form.useWatch("isTwoWay", form);
  const { setLoading } = useLoading();

  const [selectedField, setSelectedField] = useState(null);
  const globalModal = useResultModal();
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [estimatedHour, setEstimatedHour] = useState(0);
  const client = useQueryClient();
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
  const requestTripMutation = useMutation({
    mutationFn: (v) => CreateVipTrip(v),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderPlacedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipTrips"] });
      onClose();
    },
    onError: (e) => {
      const errorMsg = errorNormalizer(e);
      globalModal.error(t("error"), errorMsg);
    },
  });
  const goDate = Form.useWatch("startDate", form);
  const goTime = Form.useWatch("startTime", form);
  const goPoint = Form.useWatch("pickup-label", form);
  const goCoords = Form.useWatch("pickup-coordinates", form);
  const arrivePoint = Form.useWatch("arrive-label", form);
  const arriveCoords = Form.useWatch("arrive-coordinates", form);
  useEffect(() => {
    if (goTime && estimatedDistance > 0) {
      const remainder = estimatedDistance / 60;
      const timeToAdd = Math.ceil(remainder / 30) * 30;
      const finalTime = dayjs()
        .set("hour", goTime.hour())
        .add(timeToAdd, "minutes");
      setEstimatedHour(finalTime);
      form.setFieldsValue({
        returnTime: goTime.add(timeToAdd, "minutes"),
      });
    }
  }, [arrivePoint, estimatedDistance]);

  useEffect(() => {
    setLoading(requestTripMutation.isPending);
  }, [requestTripMutation]);

  return (
    <Form
      className={"flex flex-col gap-1"}
      id={"meetingForm"}
      form={form}
      layout={"vertical"}
      onFinish={(v) => {
        const finalValues = {
          isReturn: isTwoWay ? true : false,
          pickupLatitude: v["pickup-coordinates"].lat,
          pickupLongitude: v["pickup-coordinates"].lng,
          pickupName: v["pickup-label"],
          dropOffLatitude: v["arrive-coordinates"].lat,
          dropOffLongitude: v["arrive-coordinates"].lng,
          dropOffName: v["arrive-label"],
        };
        const requestTime = v.startDate
          .set("hour", v.startTime.hour())
          .set("minute", v.startTime.minute());
        //2024-07-26T15:19:56.133Z
        finalValues.requestTime = requestTime.format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ",
        );
        if (isTwoWay) {
          finalValues.returnLatitude = v["endPoint-coordinates"].lat;
          finalValues.returnLongitude = v["endPoint-coordinates"].lng;
          finalValues.returnName = v["endPoint-label"];
          const returnTime = v.startDate
            .set("hour", v.returnTime.hour())
            .set("minute", v.returnTime.minute());
          finalValues.returnRequestTime = returnTime.format(
            "YYYY-MM-DDTHH:mm:ss.SSSZ",
          );
        }
        requestTripMutation.mutate(finalValues);
      }}
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
      {goCoords && arriveCoords && (
        <DistanceMatrixService
          options={{
            origins: [goCoords],
            destinations: [arriveCoords],
            travelMode: "DRIVING",
          }}
          callback={(response) => {
            const firstResult = response.rows[0].elements[0]?.duration;
            if (firstResult) {
              setEstimatedDistance(firstResult.value);
            }
          }}
        />
      )}
      <Form.Item name={"isTwoWay"} hidden />
      <Form.Item
        name={"startDate"}
        label={t("goDate")}
        rules={[{ required: true }]}
      >
        <FormDatepicker />
      </Form.Item>
      <Form.Item
        name={"startTime"}
        label={t("goTime")}
        rules={[{ required: true }]}
      >
        <FormTimepicker format="HH:mm" minuteStep={[30]} />
      </Form.Item>
      <LocationChooser
        form={form}
        name="pickup"
        label={t("pickupPoint")}
        onChooseFromMap={() => {
          setSelectedField("pickup");
          setSelectedCoords(null);
        }}
      />
      <LocationChooser
        form={form}
        name="arrive"
        label={t("arrivePoint")}
        onChooseFromMap={() => setSelectedField("arrive")}
      />
      {isTwoWay && (
        <>
          <LocationChooser
            form={form}
            name="endPoint"
            label={t("returnPoint")}
            onChooseFromMap={() => setSelectedField("endPoint")}
          />
          <Form.Item
            name={"returnTime"}
            label={t("returnTime")}
            rules={[{ required: true }]}
          >
            <FormTimepicker
              disabled={!goPoint || !arrivePoint || !goDate || !goTime}
              format="HH:mm"
              minuteStep={[30]}
              disabledHours={() => {
                if (!estimatedHour) return [];
                // prevent hours before goTime
                return [...Array(24).keys()].slice(0, estimatedHour.hour());
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
