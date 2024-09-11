import MapDrawer from "@/components/MapDrawer";
import GoogleMapComponent from "@/components/GoogleMap";
import FormInput from "@/components/forms/FormInput";
import { MarkerF, PolylineF } from "@react-google-maps/api";
import { Button, Form, Modal, Switch } from "antd";
import BuildingIcon from "@/assets/icons/building.svg?react";
import { useTranslation } from "react-i18next";
import StatusModal from "./modal";
import { useEffect, useState } from "react";
import { getAvailableBuildings } from "@/services/buildingsv2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetBusEvents, RequestBusEvent } from "../../../services/bus_events.js";
import useResultModal from "@/hooks/useResultModal";
import { useBuildings } from "@/services/buildingsv2";
import { RequestBusTrip, ChangeTripPath } from "@/services/bus_trips";
import { AxiosError } from "axios";
import MarkerIcon from "@/assets/markerIcon.png";
import { GetOnlineBusses } from "@/services/busses";
import { BusIcon } from "@/assets/icons/bus";
import createSignalRConnection from "@/services/signalr";
export default function AddDrawer({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState("trips"); //trips, events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBuildings, setSelectedBuildings] = useState({
    originBuildingId: null,
    destinationBuildingId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: buildings } = useBuildings();
  const { data: onlineBusses, refetch } = useQuery({
    queryKey: ["onlineBusses", mode],
    queryFn: () =>
      GetOnlineBusses({
        isEvent: mode == "events",
      }),
  });
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection?.on("ReceiveMessage", (page, action) => {
      if (page.messageResource == "DRIVER_UPDATE_GEOLOCATION") {
        refetch();
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  const firstBuilding = buildings?.data?.[0] ?? {
    center: [0, 0],
  };
  const isEdit = isOpen && isOpen?.id;
  function isValid(mode) {
    if (mode == "events") {
      return selectedEvent != "";
    }
    if (mode == "trips") {
      return (
        !!selectedBuildings.originBuildingId &&
        !!selectedBuildings.destinationBuildingId &&
        selectedBuildings?.originBuildingId?.id?.includes("-") &&
        selectedBuildings?.destinationBuildingId?.id?.includes("-") &&
        selectedBuildings.originBuildingId !=
          selectedBuildings.destinationBuildingId
      );
    }
  }

  return (
    <MapDrawer
      open={isOpen}
      onClose={() => {
        onClose();
      }}
      title={t("shuttle-transport")}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          disabled={!isValid(mode)}
          htmlType="submit"
          form={mode === "trips" ? "trips-form" : "events-form"}
          loading={isLoading}
        >
          {t("save")}
        </Button>
      }
      drawerContent={
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-end justify-end">
            <div
              className="flex gap-2 items-center py-2 px-3  rounded-full"
              style={{
                boxShadow: "0px 4px 75px 0px #0000001A",
              }}
            >
              <Switch
                onChange={(checked) => {
                  setMode(checked ? "events" : "trips");
                  setSelectedEvent("");
                }}
                disabled={isEdit}
              />
              {t("events")}
            </div>
          </div>
          {mode === "trips" ? (
            <SelectTrip
              setSelectedBuildings={setSelectedBuildings}
              setIsLoading={setIsLoading}
              initialValues={isOpen}
            />
          ) : (
            <SelectEvents
              setSelectedEvent={setSelectedEvent}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      }
    >
      <GoogleMapComponent
        center={{
          lat: firstBuilding["center"][0][0],
          lng: firstBuilding["center"][0][1],
        }}
        zoom={16}
      >
        {buildings?.data?.map((building) => (
          <MarkerF
            key={building.id}
            position={{
              lat: building["center"][0][0],
              lng: building["center"][0][1],
            }}
            className="text-blue-400"
            icon={{
              url: MarkerIcon,
              scaledSize: { width: 62, height: 32 },
            }}
            label={{
              text: building.nameAr,
              color: "#fff",
            }}
          />
        ))}
        {onlineBusses?.data?.map((bus) => (
          <MarkerF
            key={bus.id}
            position={{
              lat: bus.coordinate.latitude,
              lng: bus.coordinate.longitude,
            }}
            className="text-blue-400"
            icon={{
              url: BusIcon(bus.routeColor),
            }}
            label={{
              text: bus.name,
              color: "#fff",
            }}
          />
        ))}
      </GoogleMapComponent>
    </MapDrawer>
  );
}
function SelectTrip({ setSelectedBuildings, setIsLoading, initialValues }) {
  const [activeField, setActiveField] = useState("OriginBuildingId");
  const [searchKeyword, setSearchKeyword] = useState("");
  const isEdit = initialValues && initialValues?.id;
  const [form] = Form.useForm();
  const { i18n, t } = useTranslation();
  const selectedOriginBuilding = Form.useWatch("OriginBuildingId", form);
  const selectedDestinationBuilding = Form.useWatch(
    "DestinationBuildingId",
    form
  );
  const [modalOptions, setModalOptions] = useState({
    status: null,
    isOpen: false,
    error: null,
    success: null,
  });
  useEffect(() => {
    setSelectedBuildings({
      originBuildingId: selectedOriginBuilding,
      destinationBuildingId: selectedDestinationBuilding,
    });
  }, [selectedOriginBuilding, selectedDestinationBuilding]);
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        OriginBuildingId: initialValues.originBuildingInfo,
        DestinationBuildingId: initialValues.destinationBuildingInfo,
      });
    }
  }, [isEdit]);
  const { data: buildings } = useBuildings();
  const { data: availableBuildings } = useQuery({
    queryKey: ["availableBuildings", selectedOriginBuilding, searchKeyword],
    queryFn: () =>
      getAvailableBuildings({
        Name: searchKeyword,
        FromBuildingId: selectedOriginBuilding?.id,
      }),
    retry: (failureCount, err) => {
      if (err.response.status == 400) {
        return false;
      }
      return true;
    },
  });
  const requestTrip = useMutation({
    mutationFn: (data) => RequestBusTrip(data),
    onError: (error) => {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.validationErrors
          ?.map((e) => e.errorMessage)
          .join(", ");
      } else {
        errorMessage = error.message;
      }

      setModalOptions({
        status: "error",
        isOpen: true,
        error: errorMessage,
      });
      setIsLoading(false);
    },
    onSuccess: (d) => {
      setModalOptions({
        status: "success",
        isOpen: true,
        success: {
          name: d.data.driverInfo.name,
          estimatedDelivery: d.data.estimateTime,
          nameAr: d.data.busInfo.nameAr,
          nameEn: d.data.busInfo.nameEn,
          PlateNumber:
            i18n.language == "ar"
              ? d.data.busInfo.plateNumber
              : d.data.busInfo.plateNumberEn,
          startPoint: d.data.originBuildingInfo.name,
          endPoint: d.data.destinationBuildingInfo.name,
        },
      });
      setIsLoading(false);
    },
  });
  const editTrip = useMutation({
    mutationFn: (data) => ChangeTripPath(initialValues.id, data),
    onError: (error) => {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.validationErrors
          ?.map((e) => e.errorMessage)
          .join(", ");
      } else {
        errorMessage = error.message;
      }

      setModalOptions({
        status: "error",
        isOpen: true,
        error: errorMessage,
      });
      setIsLoading(false);
    },
    onSuccess: (d) => {
      setModalOptions({
        status: "success",
        isOpen: true,
        success: {
          name: d.data.driverInfo.name,
          estimatedDelivery: d.data.estimateTime,
          nameAr: d.data.busInfo.nameAr,
          nameEn: d.data.busInfo.nameEn,
          PlateNumber:
            i18n.language == "ar"
              ? d.data.busInfo.plateNumber
              : d.data.busInfo.plateNumberEn,
          startPoint: d.data.originBuildingInfo.name,
          endPoint: d.data.destinationBuildingInfo.name,
        },
      });
      setIsLoading(false);
    },
  });
  return (
    <Form
      form={form}
      layout="vertical"
      id="trips-form"
      onFinish={(v) => {
        setIsLoading(true);
        if (isEdit) {
          editTrip.mutate({
            id: initialValues.id,
            originBuildingId: v.OriginBuildingId.id,
            destinationBuildingId: v.DestinationBuildingId.id,
          });
        } else {
          requestTrip.mutate({
            originBuildingId: v.OriginBuildingId.id,
            destinationBuildingId: v.DestinationBuildingId.id,
          });
        }
      }}
    >
      <div className="flex items-center gap-3">
        <LocationDot isActive={activeField == "OriginBuildingId"} />
        <Form.Item
          name="OriginBuildingId"
          className="w-full"
          getValueProps={(v) => {
            return { value: i18n.language == "ar" ? v?.nameAr : v?.nameEn };
          }}
        >
          <FormInput
            onFocus={() => {
              setActiveField("OriginBuildingId");
              setSearchKeyword("");
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Form.Item>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative ">
          <div className="h-full w-1 absolute -top-7 left-1/2 -translate-x-1/2 border-l border-black border-dashed"></div>
          <LocationDot isActive={activeField == "DestinationBuildingId"} />
        </div>
        <Form.Item
          name="DestinationBuildingId"
          className="w-full"
          getValueProps={(v) => {
            return { value: i18n.language == "ar" ? v?.nameAr : v?.nameEn };
          }}
        >
          <FormInput
            disabled={!selectedOriginBuilding}
            onFocus={() => {
              setActiveField("DestinationBuildingId");
              setSearchKeyword("");
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Form.Item>
      </div>
      <div className="flex items-center gap-3 mt-2">
        {!selectedOriginBuilding && !searchKeyword
          ? buildings?.data?.map((building) => (
              <BuildingEntry
                building={building}
                key={building.id}
                isActive={
                  selectedOriginBuilding?.id == building.id ||
                  selectedDestinationBuilding?.id == building.id
                }
                onClick={() => {
                  form.setFieldValue(activeField, building);
                }}
              />
            ))
          : availableBuildings?.data?.map((building) => (
              <BuildingEntry
                building={building}
                key={building.id}
                isActive={
                  selectedOriginBuilding?.id == building.id ||
                  selectedDestinationBuilding?.id == building.id
                }
                onClick={() => {
                  form.setFieldValue(activeField, building);
                }}
              />
            ))}
      </div>
      <StatusModal
        isOpen={modalOptions.isOpen}
        status={modalOptions.status}
        error={modalOptions.error}
        success={modalOptions.success}
        onClose={() => setModalOptions({})}
      />
    </Form>
  );
}

function LocationDot({ isActive }) {
  return (
    <div
      className="flex items-center justify-center w-5 h-5 rounded-full"
      style={{
        border: !isActive ? "1px solid #CBCBCB" : "none",
        background: isActive ? "#E6FAF8" : "none",
      }}
    >
      <div
        className="flex items-center justify-center w-3 h-3 rounded-full"
        style={{
          background: isActive
            ? "linear-gradient(180deg, #2CCBB3 0%, rgba(81, 167, 154, 0) 125.04%)"
            : "#CBCBCB",
        }}
      ></div>
    </div>
  );
}

function BuildingEntry({ building, isActive, onClick }) {
  const { t, i18n } = useTranslation();
  return (
    <div
      className="p-6 flex flex-col gap-4 rounded-xl items-center"
      style={{
        backgroundColor: isActive ? "#f5f6fa" : "#F6F6F6",
        border: isActive ? "1px solid #708AC0" : "none",
        cursor: building.isOutOfWork ? "not-allowed" : "pointer",
      }}
      onClick={!building.isOutOfWork && onClick}
    >
      <BuildingIcon
        style={{
          fill: isActive || !building.isOutOfWork ? "#38ACB1" : "#909090",
        }}
      />
      {i18n.language == "ar" ? building.nameAr : building.nameEn}
    </div>
  );
}

function SelectEvents({ setSelectedEvent, setIsLoading }) {
  const { i18n } = useTranslation();
  const [form] = Form.useForm();
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      GetBusEvents({
        IsToDay: true,
      }),
  });

  const selectedEvent = Form.useWatch("event", form);
  const [modalOptions, setModalOptions] = useState({
    status: null,
    isOpen: false,
    error: null,
    success: null,
  });
  const globalModal = useResultModal();
  useEffect(() => {
    if (selectedEvent) {
      setSelectedEvent(selectedEvent);
    }
  }, [selectedEvent]);
  const createEvent = useMutation({
    mutationFn: (data) => RequestBusEvent(data),
    onSuccess: (d) => {
      setIsLoading(false);
      setModalOptions({
        status: "success",
        isOpen: true,
        success: {
          name: d.data.driverInfo.name,
          estimatedDelivery: d.data.estimateTime,
          nameAr: d.data.busInfo.nameAr,
          nameEn: d.data.busInfo.nameEn,
          PlateNumber:
            i18n.language == "ar"
              ? d.data.busInfo.plateNumber
              : d.data.busInfo.plateNumberEn,
          startPoint: d.data.originBuildingInfo.name,
          endPoint: d.data.destinationBuildingInfo.name,
        },
      });
    },
    onError: (error) => {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.validationErrors
          ?.map((e) => e.errorMessage)
          .join(", ");
      } else {
        errorMessage = error.message;
      }
      setModalOptions({
        status: "error",
        isOpen: true,
        error: errorMessage,
      });
      setIsLoading(false);
    },
  });
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(v) => {
        setIsLoading(true);
        createEvent.mutate(v.event);
      }}
      id={"events-form"}
    >
      <Form.Item name={"event"} hidden />
      {events?.data?.items?.map((event) => (
        <EventEntry
          isActive={selectedEvent && selectedEvent.id == event.id}
          paths={[
            { name: event.originBuildingInfo.nameAr },
            { name: event.destinationBuildingInfo.nameAr },
          ]}
          key={event.name}
          onClick={() => form.setFieldValue("event", event)}
          event={event}
        />
      ))}
      <StatusModal
        isOpen={modalOptions.isOpen}
        status={modalOptions.status}
        error={modalOptions.error}
        onClose={() =>
          setModalOptions({
            status: null,
            isOpen: false,
            error: null,
            success: null,
          })
        }
        success={modalOptions.success}
      />
    </Form>
  );
}

function EventEntry({ isActive, paths, event, ...rest }) {
  return (
    <div
      className="flex flex-col gap-2 py-2 px-2 rounded-xl bg-white "
      style={{
        boxShadow: " 0px 4px 75px 0px #0000000D",
        border: isActive ? "1px solid #022271" : "none",
      }}
      {...rest}
    >
      <div className=" p-3 rounded-lg bg-[#FFF7EE]">{event.name}</div>
      <div className="flex items-start gap-1">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <>
              <div className="flex flex-col gap-2">
                <LocationDot isActive={isLast} />
                {path.name}
              </div>
              {!isLast && (
                <div className="w-full border-t border-solid border-[#ECECEC] mt-2"></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
