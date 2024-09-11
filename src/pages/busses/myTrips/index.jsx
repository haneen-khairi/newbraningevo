import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/assets/icons/eye.svg?react";
import ActionButton from "@/pages/organization/actionsButton";
import { useState, useReducer } from "react";
import AddDrawer from "./drawer";
import DetailsDrawer from "./DetailsDrawer";
import { MyOrders } from "@/services/bus_trips";
import { useQuery } from "@tanstack/react-query";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import DriverRating from "./DriverRating";
import StatusIndicator from "../TripStatusIndicator";
import styled from "styled-components";
import dayjs from "dayjs";

export default function MyTrips() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [mode, setMode] = useState("trips"); //trips, events
  const [customFilter, setCustomFilter] = useState({});
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const { data: myOrders, isPending } = useQuery({
    queryKey: ["myOrders", filterOptions, customFilter],
    queryFn: () => MyOrders({ ...filterOptions, ...customFilter }),
  });
  const ordersItems = myOrders?.data?.items ?? [];
  //requestDate, requestNumber, pointFrom, pointTo, driverName, bus, status, actions
  const columns = [
    {
      title: t("requestNumber"),
      dataIndex: "id",
      key: "requestNumber",
      render: (value) => (
        <div className="flex items-center gap-2">{value.split("-")[0]}</div>
      ),
    },
    {
      title: t("requestDate"),
      dataIndex: "createdAt",
      key: "requestDate",
      render: (value) => dayjs(value).format("DD MMMM YYYY"),
    },
    {
      title: t("pointFrom"),
      dataIndex: ["originBuildingInfo", "name"],
      key: "pointFrom",
    },
    {
      title: t("pointTo"),
      dataIndex: ["destinationBuildingInfo", "name"],
      key: "pointTo",
    },
    {
      title: t("driverName"),
      dataIndex: ["driverInfo"],
      key: "driverName",
      render: (value) => value.name,
    },
    {
      title: t("bus"),
      dataIndex: ["busInfo"],
      key: "bus",
      render: (value) => (
        <div className="flex flex-col gap-2">
          <p>{i18n.language == "ar" ? value.nameAr : value.nameEn}</p>
          <p className="text-[#828282]">
            {i18n.language == "ar" ? value.plateNumber : value.plateNumberEn}
          </p>
        </div>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value) => <StatusIndicator v={value} />,
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => setDetailsDrawerVisible(row)}>
            <EyeIcon width={17} />
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl p-3">
      <CustomNarrowTable
        loading={isPending}
        tableTitle={t("myTrips")}
        addFunction={() => setAddDrawerVisible(true)}
        columns={columns}
        statusList={[
          { label: t("all"), value: null },
          { label: t("current"), value: 2 },
          { label: t("Completed"), value: 3 },
          { label: t("Canceled"), value: 4 },
        ]}
        statusFilter={(e) => {
          setCustomFilter({
            ...customFilter,
            status: e,
          });
        }}
        data={ordersItems}
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
          total: myOrders?.data?.totalCount ?? 0,
        }}
      />
      <AddDrawer
        isOpen={addDrawerVisible}
        onClose={() => setAddDrawerVisible(false)}
      />
      <DetailsDrawer
        isOpen={detailsDrawerVisible}
        onClose={() => setDetailsDrawerVisible(false)}
        onEditPath={(data) => {
          setDetailsDrawerVisible(false);
          setAddDrawerVisible(data);
        }}
      />
      <DriverRating />
    </div>
  );
}

const CustomNarrowTable = styled(ComplexTable)`
  & tbody .ant-table-cell {
    padding: 0px !important;
    vertical-align: middle !important;
  }
`;
