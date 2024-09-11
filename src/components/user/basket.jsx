import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import FlatButton from "../FlatButton";
import HeaderButton from "../HeaderButton";
import BasketForm from "./basketForm";
import AddMyOfficeData from "../../pages/vip/myOrders/myRoomForm";
import OrdersItemsForm from "../../pages/vip/myOrders/ordersItemsForm";
import { useMutation } from "@tanstack/react-query";
import useResultModal from "../../hooks/useResultModal";
import {
  updateOrder,
  createOrder as sendOrder,
} from "../../services/restaurantOrders";
import Item from "./items";
export default function Basket({ shape = "circle", id = "header-button" , children}) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const openAddOffice = () => setIsOpen("addOffice");
  const openBasketForm = () => setIsOpen("basketForm");
  const openEditOrder = () => setIsOpen("editOrder");
  const globalModal = useResultModal();
  const building = JSON.parse(localStorage.getItem("myRoom"));
  const [mode, setMode] = useState("create");
  const [orderDetails, setOrderDetails] = useState(
    JSON.parse(localStorage.getItem("orders"))
  );

  const Mutation = useMutation({
    mutationFn: (values) =>
      // mode == "create" ? sendOrder(values) : updateOrder(values),
      sendOrder(values),
    onSuccess: () => {
      setIsOpen(false);
      localStorage.removeItem("orders");
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create" ? (
            <div className="w-full">
              <p className="flex items-center justify-between py-3 px-2 bg-gray-100 rounded-xl">
                <span>{t("orderDetails")}</span>
                {/* <span>#56757888</span> */}
              </p>

              {/* <div className="border-[.3px] my-3 border-solid border-gray-300 rounded-xl p-2">
                {orderDetails?.map((el, idx) => {
                  <>
                    <div className="flex items-center justify-between my-2">
                      <div className="w-[100%] flex items-center relative">
                        {el.image ? (
                          <img
                            className="w-[15%] rounded-xl"
                            src={el.image}
                            alt=""
                          />
                        ) : (
                          t("noImage")
                        )}
                        <span className="text-[10px] absolute top-[-3px] bg-gray-200 px-2 rounded-full right-[-2px]">
                          {el?.count}
                        </span>

                        <div className="mx-2">
                          {el?.name}
                          <br />
                          {el?.sugarSpoons && (
                            <span className="m-0">
                              {`${t("suger")}`}
                              <span className="mx-1">{el?.sugarSpoons}</span>
                              <br />
                            </span>
                          )}
                          {el?.notes}
                        </div>
                      </div>
                    </div>
                    <div className="py-1 bg-black"></div>
                  </>;
                })}
              </div> */}

              <div className="border-[.3px] border-solid flex items-center justify-between border-gray-300 rounded-xl p-2 my-1">
                <div className="flex items-center">
                  <svg
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="53"
                      height="53"
                      rx="8"
                      transform="matrix(-1 0 0 1 53 0)"
                      fill="#F9F9F9"
                    />
                    <g clip-path="url(#clip0_1091_10976)">
                      <path
                        d="M38 26C38 23.794 36.206 22 34 22V20C34 17.243 31.757 15 29 15H25C22.243 15 20 17.243 20 20V22C17.794 22 16 23.794 16 26V31C16 31.017 16 31.035 16.001 31.052C16.029 32.682 17.363 34 19 34H26V37H22C21.448 37 21 37.447 21 38C21 38.553 21.448 39 22 39H32C32.552 39 33 38.553 33 38C33 37.447 32.552 37 32 37H28V34H35C36.637 34 37.971 32.682 37.999 31.052C37.999 31.035 38 31.018 38 31V26ZM36 26V28.172C35.687 28.061 35.351 28 35 28H34V24C35.103 24 36 24.897 36 26ZM22 20C22 18.346 23.346 17 25 17H29C30.654 17 32 18.346 32 20V28H22V20ZM20 24V28H19C18.649 28 18.313 28.061 18 28.172V26C18 24.897 18.897 24 20 24ZM35 32H19C18.449 32 18 31.552 18 31C18 30.448 18.449 30 19 30H35C35.551 30 36 30.448 36 31C36 31.552 35.551 32 35 32Z"
                        fill="#A9A9A9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1091_10976">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(15 15)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="data mx-2">
                    <p className="my-1">{t("deliveryIn")}</p>
                    <span className="text-gray-500">
                      {building?.floorId ? (
                        <>
                          {i18n.language == "ar"
                            ? building?.buildingId?.split(",")[1]
                            : building?.buildingId?.split(",")[2]}
                          ,
                          {i18n.language == "ar"
                            ? building?.floorId?.split(",")[1]
                            : building?.floorId?.split(",")[2]}
                          ,
                          {i18n.language == "ar"
                            ? building?.sideId?.split(",")[1]
                            : building?.sideId?.split(",")[2]}
                          ,
                          {i18n.language == "ar"
                            ? building?.roomId?.split(",")[1]
                            : building?.roomId?.split(",")[2]}
                        </>
                      ) : (
                        t("noData")
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            t("eventUpdatedSuccessfully")
          ),
      });
    },

    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  function createOrder() {
    const orders = JSON.parse(localStorage.getItem("orders"));

    const order = {
      // restaurantId: "some-restaurant-id",
      // requesterId: "some-requester-id",
      // waiterId: "some-waiter-id",
      // orderType: "Menu",
      // reheatingType: "FoodAndBeverage",
      floorId: building.floorId.split(",")[0],
      roomId: building.roomId.split(",")[0],
      roomNumber: building.roomId.split(",")[1],
      instructions: "Please deliver on time.",
      status: "Pending",
      items: orders.map((order) => ({
        // orderId: "some-order-id",
        itemId: order.id,
        itemSize: "Small",
        sugarSpoons: order.sugarSpoons || 1,
        count: order.count || 1,
        instructions: order.instructions || "",
        estimatedTime: "6",
      })),
    };
    setOrderDetails(order.items);
    Mutation.mutate(order);
  }

  return (
    <>
      <HeaderButton
        shape={shape}
        id={id}
        icon={
          <svg
            width="28"
            height="30"
            viewBox="0 0 28 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 29.9997H0L1.43064 7.41992H26.5783L28 29.9997ZM3.04791 27.1685H24.9521L23.8857 10.2512H4.11425L3.04791 27.1685Z"
              fill="white"
            />
            <path
              d="M21.6627 11.2987H18.8014V6.35721C18.8014 4.414 17.2019 2.8313 15.2381 2.8313H12.7411C10.7772 2.8313 9.17775 4.414 9.17775 6.35721V11.2987H6.31641V6.35721C6.31641 2.85768 9.19552 0 12.7322 0H15.2292C18.7658 0 21.6538 2.84889 21.6538 6.35721V11.2987H21.6627Z"
              fill="white"
            />
            <path
              d="M26.0112 19.7676H1.99219V22.5988H26.0112V19.7676Z"
              fill="white"
            />
          </svg>
        }
        onClick={openBasketForm}
      />
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
          // footer={
          //   <div className="flex gap-4 items-center">
          //     {isOpen == "basketForm" ? (
          //       <>
          //         <Button
          //           onClick={() => {
          //             createOrder();
          //           }}
          //           htmlType="submit"
          //           form="cart-form"
          //           type="primary"
          //           className="w-full rounded-xl font-bold"
          //         >
          //           {t("sendOrder")}
          //         </Button>
          //         <Button
          //           onClick={openEditOrder}
          //           htmlType="submit"
          //           form="cart-form"
          //           // className="w-full rounded-xl border-none hover:bg-[#ced0da] bg-[#ced0da] text-[#38ACB1]"
          //           className="w-full rounded-xl font-bold bg-[#fad7d7] text-[#F30000]"
          //         >
          //           {t("addAnother")}
          //         </Button>
          //       </>
          //     ) : isOpen == "addOffice" ? (
          //       <>
          //         <Button
          //           htmlType="submit"
          //           form="room-form"
          //           type="primary"
          //           className="w-full rounded-xl"
          //         >
          //           {t("save")}
          //         </Button>
          //         <Button
          //           onClick={() => {
          //             onClose();
          //           }}
          //           htmlType="submit"
          //           form="cart-form"
          //           className="w-full rounded-xl border-none hover:bg-[#ced0da] bg-[#ced0da] text-[#38ACB1]"
          //         >
          //           {t("cancel")}
          //         </Button>
          //       </>
          //     ) : (
          //       <>
          //         <Button
          //           htmlType="submit"
          //           form="order-form"
          //           type="primary"
          //           className="w-full rounded-xl"
          //           onClick={onClose}
          //         >
          //           {t("save")}
          //         </Button>
          //         <Button
          //           onClick={() => {
          //             onClose();
          //           }}
          //           htmlType="submit"
          //           form="cart-form"
          //           className="w-full rounded-xl border-none hover:bg-[#ced0da] bg-[#ced0da] text-[#38ACB1]"
          //         >
          //           {t("cancel")}
          //         </Button>
          //       </>
          //     )}
          //   </div>
          // }
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
    </>
  );
}
