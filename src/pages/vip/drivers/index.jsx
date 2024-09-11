import ComplexTable from "@/components/ComplexTable";
import DriverDrawer from "./drawer";
import { useState, useReducer } from "react";
import { Button } from "antd";
import { FaEye } from "react-icons/fa";
import DriverDetailsDrawer from "./detailsDrawer";
import ActionButton from "@/pages/organization/actionsButton";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { GetVipDrivers } from "../../../services/vip_drivers.js";
import DocumentEditIcon from "@/assets/icons/file-edit.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusComponent from "@/components/statusComponent";

export default function Drivers() {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [apiOptions, setApiOptions] = useState({});
  const { data: drivers, isPending } = GetVipDrivers({
    ...filterOptions,
    ...apiOptions,
  });
  const handleDrawerOpen = (id) => {
    setDrawerOpen(id ? id : true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedDriver(null);
  };
  return (
    <div className="w-full p-2 rounded-xl bg-white">
      <ComplexTable
        loading={isPending}
        addFunction={handleDrawerOpen}
        tableTitle={t("drivers")}
        columns={[
          {
            title: t("name"),
            dataIndex: ["userInfo"],
            render: (value) =>
              i18n.language == "ar" ? value.fullName : value.fullNameEn,
          },
          {
            title: t("bloodType"),
            dataIndex: ["userInfo", "bloodGroup"],
          },
          {
            title: t("identityNumber"),
            dataIndex: ["userInfo", "identityId"],
          },
          {
            title: t("phoneNumber"),
            dataIndex: ["userInfo", "phoneNumber"],
          },
          {
            title: t("email"),
            dataIndex: ["userInfo", "email"],
          },
          {
            title: t("carResponsible"),
            dataIndex: ["carInfo"],
            render: (value) => {
              let localizedName =
                i18n.language == "ar" ? value?.nameAr : value?.nameEn;
              let localizedPlateNumber =
                i18n.language == "ar"
                  ? value?.plateNumber
                  : value?.plateNumberEn;
              return (
                <div className={"flex flex-col gap-2"}>
                  <p>{localizedName ?? "-"}</p>
                  <p>{localizedPlateNumber ?? "-"}</p>
                </div>
              );
            },
          },
          {
            title: t("joinDate"),
            dataIndex: "createdAt",
            render: (text) => (
              <div className="flex items-center gap-2">
                {dayjs(text).format("DD MMMM YYYY")}
              </div>
            ),
          },
          {
            title: t("lastUpdate"),
            dataIndex: "updatedAt",
            render: (text) => (
              <div className="flex items-center gap-2">
                {dayjs(text).format("DD MMMM YYYY")}
              </div>
            ),
          },
          {
            title: t("status"),
            dataIndex: ["userInfo", "isActive"],
            key: "status",
            render: (value) => <StatusComponent text={value} />,
          },
          {
            title: t("action"),
            dataIndex: "action",
            render: (text, record) => (
              <div className="flex gap-2 items-center">
                <ActionButton onClick={() => setDetailsDrawerOpen(record)}>
                  <EyeIcon color="black" size={20} />
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setSelectedDriver(record);
                    setDrawerOpen(true);
                  }}
                >
                  <DocumentEditIcon fill="black" size={20} />
                </ActionButton>
              </div>
            ),
          },
        ]}
        dataSource={drivers?.data?.items ?? []}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inactive"), value: false },
        ]}
        statusFilter={(e) => {
          setApiOptions({ ...apiOptions, isActive: e });
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
          total: drivers?.data?.totalCount ?? 0,
        }}
      />
      <DriverDrawer
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        initialValues={selectedDriver}
      />
      <DriverDetailsDrawer
        isOpen={detailsDrawerOpen}
        onClose={() => {
          setDetailsDrawerOpen(false);
        }}
        onEdit={(driver) => {
          setDetailsDrawerOpen(false);
          setSelectedDriver(driver);
          setDrawerOpen(true);
        }}
      />
    </div>
  );
}
