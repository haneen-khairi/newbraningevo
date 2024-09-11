import ComplexTable from "@/components/ComplexTable";
import DriverDrawer from "./drawer";
import { useReducer, useState } from "react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import FileEditIcon from "@/assets/icons/file-edit.svg?react";
import DriverDetailsDrawer from "./detailsDrawer";
import ActionButton from "@/pages/organization/actionsButton";
import { useTranslation } from "react-i18next";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import useBusDrivers from "@/hooks/useBusDrivers";
import colorjs from "color";
import dayjs from "dayjs";

export default function Drivers() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [otherOptions, setOtherOptions] = useState({});
  const { data: drivers, isPending } = useBusDrivers({
    isActive: true,
    ...filterOptions,
    ...otherOptions,
  });
  const driverItems = drivers?.data?.items ?? [];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const handleDrawerOpen = (id) => {
    setDrawerOpen(id ? id : true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  //name, idNumber, phone, email, bus, createdAt, updatedAt, status, actions
  return (
    <div className="w-full p-2 rounded-xl bg-white">
      <ComplexTable
        addFunction={handleDrawerOpen}
        loading={isPending}
        tableTitle={t("drivers")}
        columns={[
          {
            title: t("name"),
            dataIndex: ["userInfo", "name"],
            sorter: true,
          },
          {
            title: t("idNumber"),
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
            title: t("bus"),
            dataIndex: ["busInfo"],
            render: (value) => {
              if (!value) return null;
              return (
                <div className="flex flex-col gap-1">
                  <p>{i18n.language == "ar" ? value.nameAr : value.nameEn}</p>
                  <p className="text-[#828282]">{value.plateNumber}</p>
                </div>
              );
            },
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
            dataIndex: ["userInfo", "isActive"],
            render: (value) => {
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
            title: t("action"),
            dataIndex: "action",
            render: (text, record) => (
              <div className="flex gap-2 items-center">
                <ActionButton onClick={() => setDetailsDrawerOpen(record)}>
                  <EyeIcon color="black" size={20} />
                </ActionButton>
                <ActionButton onClick={() => handleDrawerOpen(record)}>
                  <FileEditIcon fill="#000" size={20} />
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
          setOtherOptions({ ...otherOptions, isActive: e });
        }}
        dataSource={driverItems}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: 10,
          total: drivers?.data?.totalCount ?? 0,
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
      <DriverDrawer isOpen={drawerOpen} onClose={handleDrawerClose} />
      <DriverDetailsDrawer
        isOpen={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        onEdit={(details) => {
          setDetailsDrawerOpen(false);
          handleDrawerOpen(details);
        }}
      />
    </div>
  );
}
