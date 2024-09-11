import ComplexTable from "@/components/ComplexTable";
import {  Drawer } from "antd";
import FlatButton from "../../../../components/FlatButton";
import { useTranslation } from "react-i18next";
import ActionButton from "@/pages/organization/actionsButton";
import { useState, useReducer, useEffect } from "react";
import RequestStatus from "./components/RequestStatus.jsx";
import RequestDetails from "./RequestDetails.jsx";
import NewDriverDrawer from "./components/NewDriverDrawer.jsx";
import EyeIcon from "@/assets/icons/eye.svg?react";
import dayjs from "dayjs";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import createSignalRConnection from "../../../../services/signalr.js";
import { GetAllAdminRequests } from "../../../../services/vip_trips.js";
import BasketForm from "../../../../components/user/basketForm";
import { IoClose } from "react-icons/io5";
import ReasonsOfCancellingModal from "./components/ReasonsOfCancelling.jsx";

// import createSignalRConnection from "../../../services/signalr.js";
export default function Requests() {
  const { t, i18n } = useTranslation();
  const [apiOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [filterOptions, setFilterOptions] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false);
  const building = JSON.parse(localStorage.getItem("myRoom"));
  const [cancelIsOpen, setCancelIsOpen] = useState(false)

  const openAddOffice = () => setIsOpen("addOffice");
  const openBasketForm = () => setIsOpen("basketForm");
  const openEditOrder = () => setIsOpen("editOrder");

  const {
    data: adminRequests,
    isPending,
    refetch,
  } = GetAllAdminRequests({
    ...filterOptions,
    ...apiOptions,
  });
    console.log("🚀 ~ Requests ~ adminRequests:", adminRequests)
  const [requestDrawerVisible, setRequestDrawerVisible] = useState(false);
  const [requestDrawerId, setRequestDrawerId] = useState(null);
  const [assignNewDriverData, setAssignNewDriverData] = useState(null);
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection.on("ReceiveMessage", (page, action) => {
      if (page && page.notificationType == 36) {
        refetch();
        getOrders()
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);
  function getCancelModal(id){
    console.log("====== get cancel modal ===");
    
    setCancelIsOpen(true)

  }
  // console.log(vipTrips);
  
  const columns = [
    {
      title: t("requestNumber"),
      dataIndex: "requestNumber",
      key: "requestNumber",
      sorter: true,
    },
    {
      title: t("startDate"),
      dataIndex: "validFrom",
      key: "validFrom",
      render: (value) => dayjs(value).format("DD MMM YYYY , h:mm A"),
    },
    {
      title: t("company"),
      dataIndex: "room",
      key: "room",
      render: (value) =>
        i18n.language == "ar" ? value?.company.nameAr : value?.building?.nameEn,
    },
    {
      title: t("building"),
      dataIndex: "room",
      key: "room",
      render: (value) =>
        i18n.language == "ar" ? value?.building.nameAr : value?.building?.nameEn,
    },

    {
      title: t("floor"),
      dataIndex: "room",
      key: "room",
      render: (value) =>
        i18n.language == "ar" ? value?.floor.nameAr : value?.floor?.nameEn,
    },

    {
      title: t("direction"),
      dataIndex: "direction",
      key: "direction",
      render: (value) => value?.direction,
    },
    {
      title: t("office"),
      dataIndex: "room",
      key: "room",
      render: (value) =>
        i18n.language == "ar" ? value?.nameAr : value?.nameEn,
    },
    {
      title: t("host"),
      dataIndex: "requester",
      render: (value) => value.name || value.firstName,
    },
    {
      title: t("guest"),
      dataIndex: "guest",
      render: (value) => (
        <div>
          <p>{value.fullName || value.firstName}</p>
          {/* <p>{value?.plateNumber}</p> */}
        </div>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value) => <RequestStatus status={String(value)} />,
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (value, row) => {
        console.log("🚀 ~ Requests ~ row:", row)
        return <div className="flex items-center gap-2">
          <ActionButton
            onClick={() => {
              setRequestDrawerVisible(row);
              setRequestDrawerId(row);
            }}
          >
            <EyeIcon fill="#000" />
          </ActionButton>
        </div>
      }
    },
  ];
  
  return (
    <div className="w-full p-2 rounded-xl bg-white">
          {isOpen == "basketForm"  && (
      <>
      <Drawer
        title={
          isOpen == "addOffice"
            ? t("addMyRoom")
            : isOpen == "editOrder"
            ? t("orders")
            : t("orderDetails")
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={
          isOpen == "basketForm" ||
          isOpen == "addOffice" ||
          isOpen == "editOrder"
        }
        width={isOpen == "editOrder" ? "80%" : "45%"}
        headerStyle={{
          borderBottom: "none",
          backgroundColor: "#FAFAFA",
        }}
        extra={
          <FlatButton
            shape="circle"
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <IoClose size={20} />
          </FlatButton>
        }
      >
        {isOpen == "basketForm" && (
          <BasketForm
            openAddOffice={openAddOffice}
            openEditOrder={openEditOrder}
            building={building}
          />
        )}
        {isOpen == "addOffice" && <AddMyOfficeData onClose={onClose} />}
        {isOpen == "editOrder" && <OrdersItemsForm />}
      </Drawer>
    </>
          )}
                {cancelIsOpen && <ReasonsOfCancellingModal
      data={requestDrawerId}
      onClose={() => setCancelIsOpen(false)}
      />}
      <ComplexTable
        tableTitle={t("allOrders")}
        columns={columns}
        hasAdd={true}
        addText={t("newOrder")}
        loading={isPending}
        addFunction={() => openBasketForm()}
        data={adminRequests?.data ?? []}
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
          total: adminRequests?.pagination?.total ?? 0,
        }}
      ></ComplexTable>
      <RequestDetails
        isOpen={requestDrawerVisible}
        data={requestDrawerId}
        onOpenCancelModal={getCancelModal}
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
