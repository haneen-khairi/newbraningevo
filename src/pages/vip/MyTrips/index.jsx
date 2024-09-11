import CustomTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useReducer } from "react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useQuery } from "@tanstack/react-query";
import { fetchSelfOrders } from "@/services/restaurantOrders";
import { serializeAndDownload } from "@/utils/exportCSV";
import ActionButton from "@/pages/organization/actionsButton";
import FileEditIcon from "@/assets/icons/file-edit.svg?react";
import { GetVipTrips } from "@/services/vip_trips.js";
import NewTripDrawer from "./NewTrip.jsx";
import TripDetails from "./TripDetails.jsx";
import dayjs from "dayjs";
import RequestStatus from "../requests/components/RequestStatus.jsx";
import EyesIcon from "@/assets/icons/eyes.svg?react";
import CancelTripModal from "./components/CancelTripModal.jsx";
export default function MyTrips() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [customFilterOptions, setCustomFilterOptions] = useState({});
  const [isNewTripDrawerOpen, setIsNewTripDrawerOpen] = useState(false);
  const [isTripDetailOpen, setIsTripDetailOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [cancelTripId, setCancelTripId] = useState(null);
  const {
    data: vipTrips,
    error,
    isPending,
  } = GetVipTrips({ ...filterOptions, ...customFilterOptions });

  return (
    <div className="w-full p-2 rounded-xl bg-white">
      <CustomTable
        title={t("myTrips")}
        loading={isPending}
        columns={[
          {
            title: t("requestNumber"),
            dataIndex: "id",
            key: "requestNumber",
            render: (value) => value?.split("-")[0],
          },
          {
            title: t("orderType"),
            dataIndex: "eventInfo",
            key: "orderType",
            render: (value) => (!value ? t("meeting") : t("event")),
          },

          {
            title: t("startDate"),
            dataIndex: "tripRequestTime",
            key: "startDate",
            render: (value) => dayjs(value).format("DD MMM YYYY , h:mm A"),
          },
          {
            title: t("startPoint"),
            dataIndex: "pickupName",
            key: "startPoint",
          },

          {
            title: t("endPoint"),
            dataIndex: "dropOffName",
            key: "endPoint",
          },
          {
            title: t("returnPoint"),
            dataIndex: "returnName",
            key: "returnPoint",
            render: (value, row) => {
              if (!row.returnLatitude) return "-";
              else return value;
            },
          },
          {
            title: t("driver"),
            dataIndex: "driverInfo",
            render: (value) =>
              i18n.language == "ar" ? value?.fullName : value?.fullNameEn,
          },
          {
            title: t("car"),
            dataIndex: "carInfo",
            render: (value) => (
              <div>
                <p>{i18n.language == "ar" ? value?.nameAr : value?.nameEn}</p>
                <p>{value?.plateNumber}</p>
              </div>
            ),
          },
          {
            title: t("status"),
            dataIndex: "tripStatus",
            key: "status",
            render: (value) => <RequestStatus status={String(value)} />,
          },
          {
            title: t("actions"),
            dataIndex: "actions",
            key: "actions",
            render: (value, row) => (
              <ActionButton
                onClick={() => {
                  setIsTripDetailOpen(true);
                  setSelectedTrip(row);
                }}
              >
                <EyesIcon />
              </ActionButton>
            ),
          },
        ]}
        dataSource={vipTrips?.data?.items ?? []}
        paginationConfig={{
          total: vipTrips?.data?.totalCount ?? 0,
          pageSize: 10,
          current: filterOptions.page,
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("current"), value: 2 },
          { label: t("Completed"), value: 5 },
          { label: t("Canceled"), value: 6 },
          { label: t("awaitingDriver"), value: 8 },
          { label: t("incoming"), value: 1 },
        ]}
        statusFilter={(e) => {
          setCustomFilterOptions({ ...customFilterOptions, TripStatus: e });
        }}
        onChange={(pagination, _filter, sorter, { action }) => {
          if (action == "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action == "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
        searchFunction={(e) => {
          setCustomFilterOptions({
            ...customFilterOptions,
            searchKeyword: e.target.value,
          });
        }}
        downloadFunction={() => {
          serializeAndDownload(
            vipTrips?.data?.items?.map((item) => ({
              [t("requestNumber")]: item.id?.split("-")[0],
              [t("requestDate")]: new Date(item.createdAt).toLocaleDateString(),
              [t("pointFrom")]: item.pickupName,
              [t("pointTo")]: item.dropOffName,
              [t("driver")]:
                i18n.language == "ar"
                  ? item.driverInfo.fullName
                  : item.driverInfo.fullNameEn,
              [t("bus")]:
                i18n.language == "ar"
                  ? item.carInfo.nameAr
                  : item.carInfo.nameEn,
            })),
            "my-orders",
          );
        }}
        addFunction={(e) => {
          setIsNewTripDrawerOpen(true);
        }}
      />
      <NewTripDrawer
        isOpen={isNewTripDrawerOpen}
        onClose={() => setIsNewTripDrawerOpen(false)}
      />
      <TripDetails
        isOpen={isTripDetailOpen}
        onClose={() => setIsTripDetailOpen(false)}
        details={selectedTrip}
        onCancel={(id) => {
          setCancelTripId(id);
          setIsTripDetailOpen(false);
        }}
      />
      <CancelTripModal
        isOpen={Boolean(cancelTripId)}
        onClose={() => setCancelTripId(null)}
        tripId={cancelTripId}
      />
    </div>
  );
}
