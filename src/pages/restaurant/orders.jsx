import StatusSelect from "@/components/restaurant/StatusSelect";
import { Table, Button, Typography, Switch, Dropdown } from "antd";
import { t } from "i18next";
import { fetchAllOrders, updateOrder } from "@/services/restaurantOrders";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { statuses } from "@/components/restaurant/StatusSelect";
import { Select } from "antd";
import createSignalRConnection from "@/services/signalr";
import NewOrderSound from "@/assets/audio/a1.mp3";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import StatusIndicator from "./StatusIndicator";
import serializeAndDownload from "@/utils/exportCSV";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import NewOfficeboyDrawer from "./NewOfficeboyDrawer";
import ChangeStatusDrawer from "./ChangeStatusDrawer";
import ComplexTable from "@/components/ComplexTable";
import ActionButton from "@/pages/organization/actionsButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import EyesIcon from "@/assets/icons/eyes.svg?react";

export default function Orders() {
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const [NewOfficeboyDrawerVisible, setNewOfficeboyDrawerVisible] =
    useState(false);
  const [ChangeStatusDrawerVisible, setChangeStatusDrawerVisible] =
    useState(false);
  const [OrderDetailsDrawerVisible, setOrderDetailsDrawerVisible] =
    useState(false);
  const [customFilterOptions, setCustomFilterOptions] = useState({});
  const [status, setStatus] = useState("all");
  const { data, isPending, refetch } = useQuery({
    queryKey: ["restaurantOrders", filterOptions, status, customFilterOptions],
    queryFn: () =>
      fetchAllOrders({
        ...filterOptions,
        status: status == "all" ? undefined : status,
        ...customFilterOptions,
          isToday: false,
      }),
  });
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection?.on("ReceiveMessage", (page, action) => {
      if (page == "RestaurantOrders") {
        refetch();
        if (action == "Create") {
          new Audio(NewOrderSound).play();
        }
      }
    if(page && page.notificationType == 26){
        refetch();
    }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <div className="flex flex-col w-full  p-2 rounded-xl">
      <div className="grid grid-cols-5 gap-3 h-fit mb-4">
        <StatusSelect
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
      </div>

      <div className="p-2 rounded-xl bg-white w-full">
        <ComplexTable
          tableTitle={t("orders")}
          downloadFunction={() => {
            serializeAndDownload(
              data?.data?.map((item) => ({
                [t("name")]: item.requester.name,
                [t("building")]: item.room.building.name,
                [t("room")]: item.room.name,
                [t("orderFrom")]: dayjs(item.createdAt).format(
                  "YYYY/MM/DD - h:mm a"
                ),
                [t("notes")]: item.instructions,
              })),
              t("orders")
            );
          }}
          filterMenu={{
            items: [
              {
                value: "",
                label: (
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={""}
                      style={{
                        minWidth: 200,
                      }}
                      onChange={(value) =>
                        setCustomFilterOptions({
                          ...customFilterOptions,
                          orderType: value,
                        })
                      }
                    >
                      <Select.Option value="">{t("all")}</Select.Option>
                      <Select.Option value="0">{t("menuOrders")}</Select.Option>
                      <Select.Option value="1">
                        {t("normalOrders")}
                      </Select.Option>
                      <Select.Option value="2">
                        {t("reheatingOrders")}
                      </Select.Option>
                    </Select>
                  </div>
                ),
              },
              {
                value: "",
                label: (
                  <div className="flex items-center gap-2 justify-between">
                    <Typography>{t("mineOnly")}</Typography>
                    <Switch
                      defaultChecked={false}
                      onChange={(checked) =>
                        setCustomFilterOptions({
                          ...customFilterOptions,
                          isMyOrdersOnly: checked,
                        })
                      }
                    />
                  </div>
                ),
              },
            ],
          }}
          columns={[
            {
              title: t("orderNumber"),
              dataIndex: "orderNumber",
            },
            {
              title: t("orderType"),
              dataIndex: "orderType",
              render: (value) => {
                switch (String(value)) {
                  case "1":
                    return t("Guest");
                  case "0":
                    return t("menuOrders");
                  case "2":
                    return t("reheatingOrders");
                  default:
                    return t("normalOrders");
                }
              },
            },
            { title: t("name"), dataIndex: ["requester", "name"], key: "name" },

            { title: t("building"), dataIndex: ["room", "building", "name"] },
            { title: t("floor"), dataIndex: ["room", "floor", "name"] },
              { title: t("direction"), dataIndex: ["room", "direction"], render: (v)=>{
                  return v == 1 ? t('left') : t('right')
                  } },
            { title: t("office"), dataIndex: ["room", "name"] },
            {
              title: t("orderFrom"),
              dataIndex: "createdAt",
              render: (value) =>
                dayjs(value).format("YYYY/MM/DD - h:mm a") ?? "-",
            },
            {
              title: t("teaBoy"),
              dataIndex: ["waiter", "name"],
            },
            {
              title: t("status"),
              dataIndex: "status",
              render: (value) => (
                <StatusIndicator status={t(statuses[value])} id={value} />
              ),
            },

            {
              title: t("actions"),
              dataIndex: "status",
              render: (value, row) => (
                <div className="flex gap-2 items-center">
                  <ActionButton
                    onClick={() => setOrderDetailsDrawerVisible(row)}
                  >
                    <EyesIcon className="align-middle" size={20} />
                  </ActionButton>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: t("assignNewOfficeBoy"),
                          value: "",
                          onClick: () => {
                            setNewOfficeboyDrawerVisible(row);
                          },
                        },
                        {
                          label: t("changeStatus"),
                          value: "",
                          onClick: () => {
                            setChangeStatusDrawerVisible(row);
                          },
                        },
                      ],
                    }}
                  >
                    <ActionButton>
                      <BsThreeDotsVertical className="align-middle" size={20} />
                    </ActionButton>
                  </Dropdown>
                </div>
              ),
              width: 200,
            },
          ]}
          statusList={[
            { label: t("all"), value: null },
            { label: t("pending"), value: "0" },
            { label: t("accepted"), value: "1" },
            { label: t("completed"), value: "5" },
            { label: t("canceled"), value: "7" },
          ]}
          statusFilter={(e) => {
            setCustomFilterOptions({
              ...customFilterOptions,
              status: e,
            });
          }}
          dataSource={data?.data}
          loading={isPending}
          rowKey={(record) => record.id}
          searchFunction={(e) => {
            dispatch({
              type: "search",
              payload: e.target.value,
            });
          }}
          pagination={{
            current: data?.pagination.current,
            pageSize: data?.pagination.pageSize,
            total: data?.pagination.total,
          }}
          onChange={(pagination, filters, sorter, { action }) => {
            if (action == "paginate") {
              dispatch({
                type: "paginate",
                payload: pagination,
              });
            }
            if (action == "sort") {
              dispatch({
                type: "sort",
                payload: sorter,
              });
            }
          }}
          hasAdd={false}
        ></ComplexTable>
      </div>

      <OrderDetailsDrawer
        isOpen={OrderDetailsDrawerVisible}
        onClose={() => setOrderDetailsDrawerVisible(false)}
        onEditTeaboy={(isOpen)=>{
            setNewOfficeboyDrawerVisible(OrderDetailsDrawerVisible)
            setOrderDetailsDrawerVisible(false)
        }}
      />

      <NewOfficeboyDrawer
        visible={NewOfficeboyDrawerVisible}
        onClose={() => setNewOfficeboyDrawerVisible(false)}
      />
      <ChangeStatusDrawer
        visible={ChangeStatusDrawerVisible}
        onClose={() => setChangeStatusDrawerVisible(false)}
      />
    </div>
  );
}
