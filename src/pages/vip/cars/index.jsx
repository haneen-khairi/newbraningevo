import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import CarDrawer from "./drawer";
import { useState, useReducer } from "react";
import { useVipCars } from "../../../hooks/useVipCars";
import { useUserLanguage } from "../../../hooks/useUserLanguage";
import { Button } from "antd";
import dayjs from "dayjs";
import DocumentEditIcon from "@/assets/icons/file-edit.svg?react";
import ActionButton from "@/pages/organization/actionsButton";
import StatusComponent from "@/components/statusComponent";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";

export default function VipCars() {
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [choosenCar, setChoosenCar] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [apiOptions, dispatch] = useReducer(ApiOptions);
  const { data: cars, isPending } = useVipCars({
    ...filterOptions,
    ...apiOptions,
  });
  const userLanguage = useUserLanguage();
  return (
    <div className="w-full p-2 rounded-xl bg-white">
      <ComplexTable
        tableTitle={t("cars")}
        addText={t("addNewCar")}
        loading={isPending}
        addFunction={() => {
          setChoosenCar(null);
          setIsDrawerOpen(true);
        }}
        data={cars?.data?.items}
        columns={[
          {
            title: t("carType"),
            dataIndex: userLanguage == "ar" ? "nameAr" : "nameEn",
            key: "name",
          },
          {
            title: t("plateNumber"),
            dataIndex: "plateNumber",
            key: "plateNumber",
          },
          {
            title: t("carColor"),
            dataIndex: "color",
            key: "carColor",
          },
          {
            title: t("dateAdded"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => (
              <div className="flex items-center gap-2">
                {dayjs(text).format("DD MMMM YYYY")}
              </div>
            ),
          },
          {
            title: t("lastUpdate"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => (
              <div className="flex items-center gap-2">
                {dayjs(text).format("DD MMMM YYYY")}
              </div>
            ),
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (text) => <StatusComponent text={text} />,
          },
          {
            title: t("actions"),
            key: "actions",
            render: (text, record) => (
              <div className="flex">
                <ActionButton
                  onClick={() => {
                    setChoosenCar(record);
                    setIsDrawerOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <DocumentEditIcon fontSize="small" fill="#000" />
                </ActionButton>
              </div>
            ),
          },
        ]}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inactive"), value: false },
        ]}
        statusFilter={(e) => {
          setFilterOptions({ ...filterOptions, isActive: e });
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
          total: cars?.data?.totalCount ?? 0,
        }}
      ></ComplexTable>
      <CarDrawer
        isOpen={isDrawerOpen}
        id={choosenCar}
        onClose={() => {
          setIsDrawerOpen(false);
          setChoosenCar(null);
        }}
      />
    </div>
  );
}
