import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ActionButton from "@/pages/organization/actionsButton";
import { useState, useReducer, useEffect } from "react";
import RequestStatus from "./components/RequestStatus";
import RequestDetails from "./RequestDetails.jsx";
import NewDriverDrawer from "./components/NewDriverDrawer.jsx";
import { GetVipTrips } from "@/services/vip_trips.js";
import EyeIcon from "@/assets/icons/eye.svg?react";
import dayjs from "dayjs";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import createSignalRConnection from "../../../services/signalr.js";
export default function Requests() {
  const { t, i18n } = useTranslation();
  const [apiOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [filterOptions, setFilterOptions] = useState({});
  const {
    data: vipTrips,
    isPending,
    refetch,
  } = GetVipTrips({
    ...filterOptions,
    ...apiOptions,
  });
  const [requestDrawerVisible, setRequestDrawerVisible] = useState(false);
  const [requestDrawerId, setRequestDrawerId] = useState(null);
  const [assignNewDriverData, setAssignNewDriverData] = useState(null);
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection.on("ReceiveMessage", (page, action) => {
      if (page && page.notificationType == 36) {
        refetch();
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  console.log(vipTrips);
  
  const columns = [
    {
      title: t("requestNumber"),
      dataIndex: "tripOrderNo",
      key: "requestNumber",
      sorter: true,
    },
    {
      title: t("orderType"),
      dataIndex: "eventInfo",
      key: "orderType",
      render: (value) => (value ? t("event") : t("meeting")),
    },
    {
      title: t("customer"),
      dataIndex: "userInfo",
      key: "userInfo",
      render: (value) =>
        i18n.language == "ar" ? value?.fullName : value?.fullNameEn,
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
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <ActionButton
            onClick={() => {
              setRequestDrawerVisible(row);
              setRequestDrawerId(row);
            }}
          >
            <EyeIcon fill="#000" />
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-2 rounded-xl bg-white">
      <ComplexTable
        columns={columns}
        hasAdd={false}
        loading={isPending}
        data={vipTrips?.data?.items ?? []}
        statusList={[
          { label: t("all"), value: null },
          { label: t("current"), value: 2 },
          { label: t("Completed"), value: 5 },
          { label: t("Canceled"), value: 6 },
          { label: t("awaitingDriver"), value: 8 },
          { label: t("incoming"), value: 1 },
        ]}
        statusFilter={(e) => {
          setFilterOptions({ ...filterOptions, TripStatus: e });
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          if (action == "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action == "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: 10,
          total: vipTrips?.data?.totalCount ?? 0,
        }}
      ></ComplexTable>
      <RequestDetails
        isOpen={requestDrawerVisible}
        data={requestDrawerId}
        onClose={() => setRequestDrawerVisible(false)}
        onAssignNewDriver={() => {
          setAssignNewDriverData(requestDrawerId);
          setRequestDrawerVisible(false);
        }}
      />
      <NewDriverDrawer
        visible={Boolean(assignNewDriverData)}
        onClose={() => setAssignNewDriverData(null)}
        tripId={assignNewDriverData?.id}
      />
    </div>
  );
}
