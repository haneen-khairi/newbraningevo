import FlatButton from "@/components/FlatButton";
import { useMutation } from "@tanstack/react-query";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { updateOrder } from "../../../services/restaurantOrders";
import HeatingForm from "./heatingForm";
import AddMyOfficeData from "./myRoomForm";
import OrdersItemsForm from "./ordersItemsForm";
import Visitor from "./visitor";
import useResultModal from "../../../hooks/useResultModal";
export default function OrderDrawer({data, onClose, isOpen, setIsOpen ,refetch}) {
  const { t } = useTranslation();
  const building = JSON.parse(localStorage.getItem("myRoom")) || [];
  const [prevForm, setPrevForm] = useState("");
  const globalModal = useResultModal();
  const openAddOffice = () => {
    setPrevForm(isOpen);
    setIsOpen("building");
  };

  const closeAll = () => {
    onClose();
  };

  const mutation = useMutation({
    mutationFn: (values) =>
      updateOrder(values),
    onSuccess: () => {
      closeAll();
      refetch();
      globalModal.success({
        title:t("heatingCompleted"),
      });
    },

    onError: (error) => {
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  

  const handelReheating=(values)=>{
mutation.mutate(values);
  }

  const handelRequestVisitor =(v)=>{console.log(v);
  }

  return (
    <>
      <Drawer
        title={
          isOpen == "order"
            ? t("orders")
            : isOpen == "heating"
            ? t("heating")
            : t("visitorRequest")
        }
        placement="left"
        closable={false}
        onClose={closeAll}
        open={
          isOpen == "heating" ||
          isOpen == "order" ||
          isOpen == "visitor" ||
          isOpen == "building"
        }
        width={isOpen == "order" ? "80%" : "40%"}
        footer={
          isOpen == "building" ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setIsOpen(prevForm)}
                htmlType="submit"
                form="room-form"
                type="primary"
                className="w-full rounded-xl"
              >
                {t("save")}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                className="w-full rounded-xl border-none hover:bg-[#ced0da] bg-[#ced0da] text-[#38ACB1]"
              >
                {t("cancel")}
              </Button>
            </div>
          ) : isOpen == "heating" ? (
            <Button
            disabled={mutation.isPending}
              htmlType="submit"
              form="heating-form"
              type="primary"
              className="w-full rounded-xl"
            >
              {t("sendOrder")}
            </Button>
          ) : isOpen=="visitor"&& (
            <Button
              form="visit-form"
              htmlType="submit"
              type="primary"
              className="w-full rounded-xl"
            >
              {t("sendOrder")}
            </Button>
          )
        }
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
        {isOpen == "order" && <OrdersItemsForm />}
        {isOpen == "heating" && (
          <HeatingForm data={data} onSubmit={handelReheating} building={building} openAddOffice={openAddOffice} />
        )}
        {isOpen == "visitor" && (
          <Visitor building={building} onSubmit={handelRequestVisitor} openAddOffice={openAddOffice} />
        )}
        {isOpen == "building" && <AddMyOfficeData onClose={onClose} />}
      </Drawer>
    </>
  );
}
