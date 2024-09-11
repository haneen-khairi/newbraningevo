import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import RoutesDrawer from "./drawer";
import { useReducer, useState } from "react";
import { GetBusRoutes } from "@/services/bus_routes";
import ActionButton from "@/pages/organization/actionsButton";
import FileEdit from "@/assets/icons/file-edit.svg?react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import dayjs from "dayjs";
export default function Routes() {
  const { t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [choosenId, setChoosenId] = useState(null);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const columns = [
    {
      title: t("routeName"),
      dataIndex: "name",
      key: "routeName",
    },
    {
      title: t("route"),
      dataIndex: ["buildings"],
      key: "route",
      render: (value) => {
        if (!value) return null;
        return (
            <div className="flex gap-2">
              {value.sort((a, b) => a.orderId - b.orderId).map((item, index) => {
                return (
                    <>
                      <p>{item.buildingInfo.name}</p>
                      {index < value.length - 1 && <>-</>}
                    </>
                );
              })}
              {value.length === 0 && "-"}
            </div>
        )
      },
    },
    {
      title: t("routeDriver"),
      dataIndex: ["drivers", 0, "name"],
      key: "routeDriver",
    },
    {
      title: t("dateAdded"),
      dataIndex: "createdAt",
      key: "dateAdded",
      render: (value) => dayjs(value).format("DD MMMM YYYY") || "-",
    },
    {
      title: t("lastUpdate"),
      dataIndex: "updatedAt",
      key: "lastUpdate",
      render: (value) => dayjs(value).format("DD MMMM YYYY") || "-",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          <ActionButton
            onClick={() => {
              setChoosenId(record);
              setDrawerVisible(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FileEdit fill="#000" />
          </ActionButton>
        </div>
      ),
    },
  ];
  const { data, isPending } = GetBusRoutes({
    ...filterOptions,
  });
  return (
    <div className="p-4 rounded-xl w-full bg-white">
      <ComplexTable
        columns={columns}
        loading={isPending}
        data={data?.data?.items ?? []}
        tableTitle={t("allRoutes")}
        addFunction={() => setDrawerVisible(true)}
        hasStatusFilter={false}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: filterOptions.pageSize,
          total: data?.data?.totalCount ?? 0,
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
      <RoutesDrawer
        isOpen={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setChoosenId(null);
        }}
        id={choosenId}
      />
    </div>
  );
}
