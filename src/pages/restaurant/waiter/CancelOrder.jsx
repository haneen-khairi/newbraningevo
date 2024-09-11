import { Button, Modal, Radio } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/instance";
import useResultModal from "@/hooks/useResultModal";
import { cancelOrder } from "@/services/restaurantOrders";

const reasons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function CancelOrder({ isOpen, onClose, orderForDrawer }) {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const client = useQueryClient();
  const [selectedReason, setSelectedReason] = useState(null);
  const { data } = useQuery({
    queryKey: ["CancelOrderReasons"],
    queryFn: () =>
      instance.get("hospitality/reject-orders-reasons").then((res) => res.data),
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (values) => cancelOrder(values),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderCancelledSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["teaboyOrders"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileCancellingOrder"));
    },
  });

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate({
      orderId: orderForDrawer?.id,
      reasonId: selectedReason,
    });
  };
  const reasons = data?.data;
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={"50vw"}
      styles={{
        header: {
          background: "#FAFAFA",
          padding: "13px",
        },
        content: {
          padding: "0px",
        },
        body: {
          padding: "10px",
        },
      }}
      footer={null}
      title="Cancel Order"
    >
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 border-solid p-3">
        {reasons?.map((reason, index) => (
          <>
            <Radio
              value={reason}
              key={reason.id}
              onClick={() => setSelectedReason(reason.id)}
              checked={selectedReason == reason.id}
            >
              <div className="flex gap-2 items-center">
                <p className="font-su">{reason.reason}</p>
              </div>
            </Radio>
            {index != reasons.length - 1 && (
              <div className="border-t border-slate-100 border-solid" />
            )}
          </>
        ))}
      </div>
      <Button
        className="border-none rounded-2xl min-h-input w-full mt-3"
        type="primary"
        onClick={handleCancelOrder}
      >
        {t("confirm")}
      </Button>
    </Modal>
  );
}
