import ComplexTable from "@/components/ComplexTable";
import { statuses } from "@/components/restaurant/StatusSelect";
import useResultModal from "@/hooks/useResultModal";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { fetchSelfOrders } from "@/services/restaurantOrders";
import createSignalRConnection from "@/services/signalr";
import { useQuery } from "@tanstack/react-query";
import { Button, Select } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useReducer, useState } from "react";
import OrderDrawer from "../vip/myOrders/orderDrawer";
import RateOrderDrawer from "./myOrders/RateOrderDrawer";
import StatusIndicator from "./StatusIndicator";
export default function MyOrders() {
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const globalModal = useResultModal();
  const [apiOptions, setApiOptions] = useState({
    isReheating: "",
  });
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [orderModalId, setOrderModalId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["selfOrders", filterOptions, apiOptions],
    queryFn: () => fetchSelfOrders({ ...filterOptions, ...apiOptions }),
  });

  useEffect(() => {
    const connection = createSignalRConnection();
    connection.start();
    connection?.on("CRUD", (page, action) => {
      if (page == "Me.RestaurantOrders") {
        refetch();
      }
    });
  }, []);

  const items = [
    {
      label: (
        <p className="flex items-center border-b-[.5px] border-gray-300 border-solid p-3">
          <span className="me-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1091_3996)">
                <path
                  d="M15.8331 9.99974H13.6548L14.1048 6.39057C14.1834 6.02549 14.1797 5.64748 14.0939 5.28402C14.0082 4.92055 13.8425 4.58075 13.609 4.2893C13.3755 3.99786 13.08 3.7621 12.744 3.59914C12.408 3.43619 12.0399 3.35014 11.6664 3.34724H9.69228C9.78311 2.70474 9.72811 1.67474 10.6373 1.67057H13.3331C13.5541 1.67057 13.7661 1.58278 13.9224 1.4265C14.0786 1.27022 14.1664 1.05825 14.1664 0.83724C14.1664 0.616226 14.0786 0.404264 13.9224 0.247984C13.7661 0.0917036 13.5541 0.00390625 13.3331 0.00390625H10.6373C10.0282 0.00428119 9.44019 0.227004 8.9837 0.630249C8.52721 1.03349 8.23364 1.58952 8.15811 2.19391L8.01394 3.34724H2.49978C2.13378 3.35117 1.77303 3.43485 1.44269 3.59247C1.11234 3.75009 0.820337 3.97784 0.587023 4.25986C0.35371 4.54189 0.184699 4.87139 0.0917693 5.22542C-0.00116069 5.57945 -0.0157748 5.94949 0.0489452 6.30974L1.30978 16.3581C1.43727 17.3645 1.92722 18.29 2.68788 18.9612C3.44855 19.6325 4.42779 20.0035 5.44228 20.0047L15.8331 19.9947C16.3803 19.9947 16.9221 19.887 17.4276 19.6776C17.9331 19.4682 18.3925 19.1613 18.7794 18.7744C19.1663 18.3874 19.4732 17.9281 19.6826 17.4226C19.892 16.9171 19.9998 16.3752 19.9998 15.8281V14.1664C19.9998 13.6192 19.892 13.0774 19.6826 12.5719C19.4732 12.0664 19.1663 11.607 18.7794 11.2201C18.3925 10.8332 17.9331 10.5263 17.4276 10.3169C16.9221 10.1075 16.3803 9.99974 15.8331 9.99974ZM18.3331 14.1664H8.33311C8.33311 13.5034 8.5965 12.8675 9.06534 12.3986C9.53419 11.9298 10.1701 11.6664 10.8331 11.6664H15.8331C16.4962 11.6664 17.132 11.9298 17.6009 12.3986C18.0697 12.8675 18.3331 13.5034 18.3331 14.1664ZM11.6664 5.01307C11.7981 5.01378 11.9278 5.04534 12.045 5.10521C12.1623 5.16507 12.2639 5.25159 12.3416 5.35781C12.4194 5.46403 12.4712 5.587 12.4929 5.71686C12.5146 5.84672 12.5055 5.97985 12.4664 6.10557L12.3939 6.66641H9.27728L9.48394 5.01141L11.6664 5.01307ZM1.85311 5.32474C1.93086 5.22788 2.02928 5.14963 2.14117 5.09571C2.25305 5.04178 2.37558 5.01355 2.49978 5.01307H7.80561L7.59811 6.66641H1.76978L1.68645 6.02474C1.65973 5.90304 1.66085 5.77688 1.68971 5.65568C1.71857 5.53447 1.77442 5.42134 1.85311 5.32474ZM2.96311 16.1514L1.97978 8.33307H12.1856L11.9764 9.99974H10.8331C9.72804 9.99974 8.66823 10.4387 7.88683 11.2201C7.10543 12.0015 6.66644 13.0613 6.66644 14.1664C6.63144 15.5281 6.58311 17.2831 7.52978 18.3414H5.44228C4.83319 18.341 4.24519 18.1183 3.7887 17.7151C3.33221 17.3118 3.03864 16.7558 2.96311 16.1514ZM15.8331 18.3331H10.8331C10.1701 18.3331 9.53419 18.0697 9.06534 17.6008C8.5965 17.132 8.33311 16.4961 8.33311 15.8331H11.4164C11.7389 15.9881 13.8123 17.5922 14.1664 17.4997C14.5131 17.5981 16.6081 15.9806 16.9164 15.8331H18.3331C18.3331 16.4961 18.0697 17.132 17.6009 17.6008C17.132 18.0697 16.4962 18.3331 15.8331 18.3331Z"
                  fill="#2D2E80"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_3996">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          {t("orderList")}
        </p>
      ),
      key: 1,
      onClick: () => setIsOpen("order"),
    },
    {
      label: (
        <p className="flex items-center border-b-[.5px] border-gray-300 border-solid p-3">
          <span className="me-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 1.66602H4.16667C1.86917 1.66602 0 3.53518 0 5.83268V13.3327C0 15.0368 1.03083 16.501 2.5 17.146V18.3327C2.5 18.7935 2.87333 19.166 3.33333 19.166C3.79333 19.166 4.16667 18.7935 4.16667 18.3327V17.4993H15.8333V18.3327C15.8333 18.7935 16.2067 19.166 16.6667 19.166C17.1267 19.166 17.5 18.7935 17.5 18.3327V17.146C18.9692 16.501 20 15.0368 20 13.3327V5.83268C20 3.53518 18.1308 1.66602 15.8333 1.66602ZM18.3333 13.3327C18.3333 14.711 17.2117 15.8327 15.8333 15.8327H4.16667C2.78833 15.8327 1.66667 14.711 1.66667 13.3327V5.83268C1.66667 4.45435 2.78833 3.33268 4.16667 3.33268H15.8333C17.2117 3.33268 18.3333 4.45435 18.3333 5.83268V13.3327ZM11.6667 4.99935H5C4.08083 4.99935 3.33333 5.74685 3.33333 6.66602V12.4993C3.33333 13.4185 4.08083 14.166 5 14.166H11.6667C12.5858 14.166 13.3333 13.4185 13.3333 12.4993V6.66602C13.3333 5.74685 12.5858 4.99935 11.6667 4.99935ZM5 12.4993V6.66602H11.6667V12.4993H5ZM16.6667 5.83268V13.3327C16.6667 13.7935 16.2933 14.166 15.8333 14.166C15.3733 14.166 15 13.7935 15 13.3327V5.83268C15 5.37268 15.3733 4.99935 15.8333 4.99935C16.2933 4.99935 16.6667 5.37268 16.6667 5.83268Z"
                fill="#2D2E80"
              />
            </svg>
          </span>
          {t("heating")}
        </p>
      ),
      key: 2,
      onClick: () => setIsOpen("heating"),
    },
    {
      label: (
        <p className="flex items-center border-b-[.5px] border-gray-300 border-solid p-3">
          <span className="me-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1091_4006)">
                <path
                  d="M17.5 9.16667H13.3333C11.955 9.16667 10.8333 10.2883 10.8333 11.6667V17.5C10.8333 18.8783 11.955 20 13.3333 20H17.5C18.8783 20 20 18.8783 20 17.5V11.6667C20 10.2883 18.8783 9.16667 17.5 9.16667ZM18.3333 17.5C18.3333 17.9592 17.96 18.3333 17.5 18.3333H13.3333C12.8733 18.3333 12.5 17.9592 12.5 17.5V11.6667C12.5 11.2075 12.8733 10.8333 13.3333 10.8333H17.5C17.96 10.8333 18.3333 11.2075 18.3333 11.6667V17.5ZM17.5 13.3308C17.5 13.7908 17.1275 14.1642 16.6667 14.1642H14.1667C13.7058 14.1642 13.3333 13.7908 13.3333 13.3308C13.3333 12.8708 13.7058 12.4975 14.1667 12.4975H16.6667C17.1275 12.4975 17.5 12.8708 17.5 13.3308ZM17.5 15.8333C17.5 16.2933 17.1275 16.6667 16.6667 16.6667H14.1667C13.7058 16.6667 13.3333 16.2933 13.3333 15.8333C13.3333 15.3733 13.7058 15 14.1667 15H16.6667C17.1275 15 17.5 15.3733 17.5 15.8333ZM7.5 10C10.2575 10 12.5 7.7575 12.5 5C12.5 2.2425 10.2575 0 7.5 0C4.7425 0 2.5 2.2425 2.5 5C2.5 7.7575 4.7425 10 7.5 10ZM7.5 1.66667C9.33833 1.66667 10.8333 3.16167 10.8333 5C10.8333 6.83833 9.33833 8.33333 7.5 8.33333C5.66167 8.33333 4.16667 6.83833 4.16667 5C4.16667 3.16167 5.66167 1.66667 7.5 1.66667ZM9.16667 12.5C9.16667 12.96 8.79417 13.3333 8.33333 13.3333H7.5C4.28417 13.3333 1.66667 15.95 1.66667 19.1667C1.66667 19.6267 1.29417 20 0.833333 20C0.3725 20 0 19.6267 0 19.1667C0 15.0317 3.36417 11.6667 7.5 11.6667H8.33333C8.79417 11.6667 9.16667 12.04 9.16667 12.5Z"
                  fill="#2D2E80"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_4006">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          {t("visitorRequest")}
        </p>
      ),
      key: 3,
      onClick: () => setIsOpen("visitor"),
    },
  ];
  const tableColumns = [
    { title: t("orderNumber"), dataIndex: "orderNumber" },
    {
      title: t("orderType"),
      dataIndex: "orderType",
      render: (value) => {
        switch (String(value)) {
          case "1":
            return t("normalOrders");
          case "0":
            return t("menuOrders");
          case "2":
            return t("reheatingOrders");
          default:
            return t("normalOrders");
        }
      },
    },
    { title: t("building"), dataIndex: ["room", "building", "name"] },
    { title: t("floor"), dataIndex: ["room", "floor", "name"] },
    {
      title: t("direction"),
      dataIndex: ["room", "direction"],
      render: (v) => (v == 1 ? t("left") : t("right")),
    },
    { title: t("office"), dataIndex: ["room", "name"] },
    {
      title: t("orderFrom"),
      dataIndex: "createdAt",
      render: (value) => (
        <div className="flex items-center gap-1">
          {dayjs(value).format("YYYY/MM/DD - h:mm a") ?? "-"} |
          {/* <CountDownIcon />
          <span
            style={{
              color: "red",
            }}
          >
            10 m
          </span> */}
        </div>
      ),
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
      dataIndex: "",
      render: (value, record) => (
          <Button onClick={()=>{setOrderModalVisible(record)}} size="small" className="">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1091_15718)">
                <path
                  d="M19.3923 8.34956C18.0998 6.24456 15.1598 2.71289 9.9998 2.71289C4.8398 2.71289 1.8998 6.24456 0.607299 8.34956C0.207739 8.99581 -0.00390625 9.74059 -0.00390625 10.5004C-0.00390625 11.2602 0.207739 12.005 0.607299 12.6512C1.8998 14.7562 4.8398 18.2879 9.9998 18.2879C15.1598 18.2879 18.0998 14.7562 19.3923 12.6512C19.7919 12.005 20.0035 11.2602 20.0035 10.5004C20.0035 9.74059 19.7919 8.99581 19.3923 8.34956ZM17.9715 11.7787C16.8615 13.5837 14.349 16.6212 9.9998 16.6212C5.65063 16.6212 3.13813 13.5837 2.02813 11.7787C1.79074 11.3946 1.66501 10.952 1.66501 10.5004C1.66501 10.0488 1.79074 9.60619 2.02813 9.22206C3.13813 7.41706 5.65063 4.37956 9.9998 4.37956C14.349 4.37956 16.8615 7.41372 17.9715 9.22206C18.2089 9.60619 18.3346 10.0488 18.3346 10.5004C18.3346 10.952 18.2089 11.3946 17.9715 11.7787Z"
                  fill="black"
                />
                <path
                  d="M10.0002 6.33398C9.17608 6.33398 8.37049 6.57836 7.68529 7.03619C7.00008 7.49403 6.46603 8.14478 6.15067 8.90614C5.8353 9.6675 5.75279 10.5053 5.91356 11.3135C6.07433 12.1218 6.47117 12.8642 7.05389 13.4469C7.63661 14.0296 8.37903 14.4265 9.18729 14.5873C9.99554 14.748 10.8333 14.6655 11.5947 14.3502C12.356 14.0348 13.0068 13.5007 13.4646 12.8155C13.9225 12.1303 14.1668 11.3247 14.1668 10.5007C14.1655 9.39599 13.7261 8.33695 12.945 7.55583C12.1639 6.77472 11.1048 6.33531 10.0002 6.33398ZM10.0002 13.0007C9.50571 13.0007 9.02236 12.854 8.61124 12.5793C8.20012 12.3046 7.87968 11.9142 7.69047 11.4574C7.50125 11.0005 7.45174 10.4979 7.5482 10.0129C7.64466 9.52797 7.88277 9.08252 8.2324 8.73288C8.58203 8.38325 9.02749 8.14515 9.51244 8.04869C9.99739 7.95222 10.5001 8.00173 10.9569 8.19095C11.4137 8.38017 11.8041 8.7006 12.0788 9.11173C12.3535 9.52285 12.5002 10.0062 12.5002 10.5007C12.5002 11.1637 12.2368 11.7996 11.7679 12.2684C11.2991 12.7373 10.6632 13.0007 10.0002 13.0007Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_15718">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Button>
      ),
    },
  ];

  return (
    <div className="p-2 rounded-xl bg-white w-full">
      <ComplexTable
        tableTitle={t("myOrders")}
        loading={isPending}
        data={data?.data}
        hasAdd={false}
        hasFilter={true}
        hasStatusFilter={false}
        items={items}
        hasMultiAdd={true}
        hasDownload={false}
        filterMenu={{
          items: [
            {
              value: "",
              label: (
                <Select
                  style={{
                    minWidth: 200,
                  }}
                  defaultValue={""}
                  onChange={(value) =>
                    setApiOptions({ ...apiOptions, orderType: value })
                  }
                >
                  <Select.Option value="">{t("all")}</Select.Option>
                  <Select.Option value="0">{t("menuOrders")}</Select.Option>
                  <Select.Option value="1">{t("normalOrders")}</Select.Option>
                  <Select.Option value="2">
                    {t("reheatingOrders")}
                  </Select.Option>
                </Select>
              ),
            },
          ],
        }}
        rowKey={(record) => record.id}
        columns={tableColumns}
        paginationConfig={{
          total: data?.pagination.total,
          pageSize: data?.pagination.pageSize,
          current: data?.pagination.current,
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
        searchFunction={(e) =>
          dispatch({
            type: "search",
            payload: e.target.value,
          })
        }
      />

      <OrderDrawer
      refetch={refetch}
      data={data}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />

      <RateOrderDrawer
      refetch={refetch}
        isOpen={orderModalVisible}
        onClose={() => {
          setOrderModalVisible(false);
        }}
      />
    </div>
  );
}

// {
//     label: t("reorder"),
//     value: "",
//     onClick: () => {
//       globalModal
//         .confirm({
//           title: t("areYouSure"),
//           subtitle: t("reorder"),
//         })
//         .then(async () => {
//           await reOrder(record.id);
//           refetch();
//         });
//     },
//   },
