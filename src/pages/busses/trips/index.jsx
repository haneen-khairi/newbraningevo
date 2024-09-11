import ComplexTable from "@/components/ComplexTable";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/assets/icons/eye.svg?react";
import TripsDrawer from "./drawer";
import ActionButton from "@/pages/organization/actionsButton";
import { useQuery } from "@tanstack/react-query";
import { GetBusTrips } from "@/services/bus_trips";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusIndicator from "../TripStatusIndicator";
import dayjs from "dayjs";
import AddDrawer from './addDrawer'

export default function Trips() {
  const { t, i18n } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [otherFilters, setOtherFilters] = useState({});
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const { data: trips, isPending } = useQuery({
    queryKey: ["busTrips", filterOptions],
    queryFn: () => GetBusTrips({ ...filterOptions, ...otherFilters }),
  });
  const tripItems = trips?.data?.items ?? [];
  
  const columns = [
    {
      title: t("requestNumber"),
      dataIndex: "tripOrderNo",
      key: "requestNumber",
      // render: (value) => value.split("-")[0],
    },
    {
      title: t("requestDate"),
      dataIndex: "createdAt",
      key: "requestDate",
      render: (value) => dayjs(value).format("DD MMMM YYYY"),
      sorter: true,
    },
    {
      title: t("requestType"),
      dataIndex: "orderType",
      key: "requestNumber",
      render: (value) => t(value),
    },
    {
      title: t("requester"),
      dataIndex: ["userInfo", "name"],
      key: "requester",
    },
    {
      title: t("startingPoint"),
      dataIndex: ["originBuildingInfo", "name"],
      key: "startingPoint",
    },
    {
      title: t("destination"),
      dataIndex: ["destinationBuildingInfo", "name"],
      key: "destination",
    },
    {
      title: t("driver"),
      dataIndex: ["driverInfo", "name"],
      key: "driver",
    },
    {
      title: t("bus"),
      dataIndex: ["tripInfo", "busInfo"],
      key: "driver",
      render: (value) => {
        return (
          <div className="flex flex-col gap-1">
            <p>{i18n.language == "ar" ? value.nameAr : value.nameEn}</p>
            <p className="text-[#828282]">{value.plateNumber}</p>
          </div>
        );
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusIndicator v={status} />,
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <ActionButton size="small" onClick={(e) => setDrawerVisible(record)}>
            <EyeIcon size={"12px"} color="black" />
          </ActionButton>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4 rounded-xl w-full bg-white">
      <ComplexTable
        loading={isPending}
        tableTitle={t("allTrips")}
        addFunction={() => setAddDrawerVisible(true)}
        columns={columns}
        data={tripItems}
        statusList={[
          { label: t("all"), value: null },
          { label: t("current"), value: 2 },
          { label: t("Completed"), value: 3 },
          { label: t("Canceled"), value: 4 },
        ]}
        statusFilter={(status) => {
          setOtherFilters({ ...otherFilters, status: status });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: 10,
          total: trips?.data?.totalCount ?? 0,
        }}
        searchFunction={(e) => {
          dispatch({
            type: "search",
            payload: e.target.value,
          });
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          if (action == "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action == "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
      />
            <AddDrawer
        isOpen={addDrawerVisible}
        onClose={() => setAddDrawerVisible(false)}
      />
      <TripsDrawer
        isOpen={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
}
