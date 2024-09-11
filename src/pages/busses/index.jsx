import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import colorjs from "color";
import { Button } from "antd";
import { useReducer, useState } from "react";
import Drawer from "./drawer";
import { GetBusses } from "@/services/busses";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import dayjs from "dayjs";
import ActionButton from "@/pages/organization/actionsButton";
import FileEdit from "@/assets/icons/file-edit.svg?react";
export default function Buses() {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [choosenId, setChoosenId] = useState(null);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [otherFilters, setOtherFilters] = useState({});
  const { data, isPending } = GetBusses({
    params: { ...filterOptions, ...otherFilters },
  });

  const columns = [
    {
      title: t("busType"),
      dataIndex: i18n.language == "ar" ? "nameAr" : "nameEn",
      render: (value, row) => {
        return i18n.language == "ar" ? row.nameAr : row.nameEn;
      },
      sorter: true,
    },
    {
      title: t("busNumber"),
      dataIndex: "plateNumber",
      sorter: true,
      render: (value, row) =>
        i18n.language == "ar" ? value : row.plateNumberEn,
    },
    {
      title: t("color"),
      dataIndex: "color",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{
              background: value,
            }}
          />{" "}
          {value || "-"}
        </div>
      ),
    },
    {
      title: t("busColorMap"),
      dataIndex: "routeColor",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{
              background: value,
            }}
          />{" "}
          {value || "-"}
        </div>
      ),
    },
    {
      title: t("driver"),
      dataIndex: ["driverInfo", "name"],
    },
    {
      title: t("dateAdded"),
      dataIndex: "createdAt",
      render: (value) => dayjs(value).format("DD MMMM YYYY"),
    },
    {
      title: t("lastUpdate"),
      dataIndex: "updatedAt",
      render: (value) => dayjs(value).format("DD MMMM YYYY"),
    },
    {
      title: t("status"),
      dataIndex: "isActive",
      render: (value, row) => {
        const color = value == 1 ? "#219653" : "#F30000";
        return (
          <div
            className="py-1 px-3 rounded-full w-fit flex items-center font-su"
            style={{
              backgroundColor: colorjs(color).alpha(0.1),
              color: colorjs(color).alpha(0.8),
            }}
          >
            {value == "1" ? t("active") : t("inactive")}
          </div>
        );
      },
    },
    {
      title: t("actions"),
      render: (row) => (
        <ActionButton
          onClick={() => {
            setChoosenId(row);
            setDrawerOpen(true);
          }}
          icon={
           <FileEdit fill={'black'} />
          }
        ></ActionButton>
      ),
    },
  ];

  return (
    <div className="w-full p-2 bg-white rounded-xl">
      <ComplexTable
        addFunction={() => setDrawerOpen(true)}
        columns={columns}
        tableTitle={t("buses")}
        data={data?.data?.items ?? []}
        loading={isPending}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inactive"), value: false },
        ]}
        statusFilter={(status) => {
          setOtherFilters({ ...otherFilters, isActive: status });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: filterOptions.pageSize,
          total: data?.data?.totalCount ?? 0,
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
      />
      <Drawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setChoosenId(null);
        }}
        id={choosenId}
      ></Drawer>
    </div>
  );
}
