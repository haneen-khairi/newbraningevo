import CustomDrawer from "@/components/Drawer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "antd";
import { OrderHistory, OrderInfo } from "../OrderDetailsDrawer";
import { AcceptButton } from "./OrderCard";
import clsx from "clsx";
import { reheatTypes } from "./ReheatTypes";
import hamburger from "@/assets/hamburger.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/services/restaurantOrders";
import useResultModal from "@/hooks/useResultModal";
export default function OrderDetails({
  isOpen,
  onClose,
  orderForDrawer,
  setIsCancelOpen,
  setIsCartOpen,
}) {
  const { t } = useTranslation();
  const client = useQueryClient();
  const globalModal = useResultModal();
  const cancelOrderMutation = useMutation({
    mutationFn: (values) => updateOrder(values),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["teaboyOrders"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingOrder"));
    },
  });
  const handleAcceptOrder = () => {
    if (orderForDrawer?.status == 0) {
      if (orderForDrawer?.orderType == 1) {
        setIsCartOpen(true);
      } else {
        cancelOrderMutation.mutate({
          id: orderForDrawer?.id,
          status: orderForDrawer?.status == 0 ? "Approved" : "Delivered",
        });
      }
    } else {
      cancelOrderMutation.mutate({
        id: orderForDrawer?.id,
        status: orderForDrawer?.status == 0 ? "Approved" : "Delivered",
      });
    }
  };
  return (
    <CustomDrawer
      title={t("orderDetails")}
      open={isOpen}
      onClose={onClose}
      width={"30vw"}
      footer={
        <div
          className={clsx({
            "grid gap-3": true,
            "grid-cols-2": orderForDrawer?.status <= 2,
          })}
        >
          {orderForDrawer?.status <= 2 && (
            <>
              <AcceptButton
                handleAcceptOrder={handleAcceptOrder}
                status={orderForDrawer?.status}
              />
              <CancelOrderButton
                handleCancelButton={() => setIsCancelOpen(true)}
              />
            </>
          )}
        </div>
      }
    >
      <div className="flex justify-end p-3 bg-[#F8FAFB] rounded-xl">
        #{orderForDrawer?.orderNumber}
      </div>
      <OrderHistory
        order={
          orderForDrawer?.orderType == 2
            ? [
                {
                  item: {
                    name: t(reheatTypes[orderForDrawer?.reheatingType]),
                    image: hamburger,
                  },
                  count: 0,
                  type: "Reheat",
                },
              ]
            : orderForDrawer?.items
        }
      />
      <OrderInfo
        hasEstimateTime={false}
        order={{
          name: orderForDrawer?.requester?.name ?? "-",
          orderPlace: (
            <p>
              {orderForDrawer?.floor?.building?.name},{" "}
              {orderForDrawer?.floor?.name},{" "}
              {orderForDrawer?.room?.direction == 1 ? t("left") : t("right")} ,{" "}
              {orderForDrawer?.room?.name}
            </p>
          ),
          estimatedDelivery: orderForDrawer?.estimatedTime ?? "-",
        }}
      />
    </CustomDrawer>
  );
}

function CancelOrderButton({ handleCancelButton }) {
  const { t } = useTranslation();

  return (
    <Button
      className="min-h-input rounded-2xl border-none bg-[#FF00000A] text-[#F30000] font-su font-semibold"
      onClick={handleCancelButton}
    >
      {t("cancelOrder")}
    </Button>
  );
}
