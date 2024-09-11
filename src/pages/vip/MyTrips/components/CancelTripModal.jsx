import { Button, Modal, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { CancelTripDriver, CancelTripUser } from "@/services/vip_trips.js";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/instance";
import useResultModal from "../../../../hooks/useResultModal.js";
export default function CancelTripModal({ isOpen, onClose, tripId }) {
  const { t, i18n } = useTranslation();
  const [selectedReason, setSelectedReason] = useState(null);
  const { data } = useQuery({
    queryKey: ["CancelOrderReasons"],
    queryFn: () =>
      instance.get("vipcar/tripridercancelreasontypes").then((res) => res.data),
  });
  const reasons = data?.data?.items ?? [];
  const globalModal = useResultModal();
  const client = useQueryClient();
  const cancelTripMutation = CancelTripUser({
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderCancelledSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipTrips"] });
      onClose();
    },
    onError: (e) => {
      globalModal.error(t("error"), t("errorWhileCancellingOrder"));
    },
  });
  function handleCancelTrip() {
    cancelTripMutation.mutate({
      tripId,
      reasonId: selectedReason,
    });
  }
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
                <p className="font-su">
                  {i18n.language == "ar" ? reason.nameAr : reason.nameEn}
                </p>
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
        onClick={handleCancelTrip}
        loading={cancelTripMutation.isPending}
      >
        {t("confirm")}
      </Button>
    </Modal>
  );
}
