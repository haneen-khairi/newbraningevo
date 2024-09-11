import { Button, Modal, Radio, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import CustomDrawer from "@/components/Drawer";
import CustomRadio from "@/components/CustomRadio";
import { useState } from "react";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import ProcessIcon from "@/assets/icons/process.svg?react";
import CompleteIcon from "@/assets/icons/completed.svg?react";
import instance from "@/api/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, updateOrder } from "@/services/restaurantOrders";
import useResultModal from "@/hooks/useResultModal";

export default function ChangeStatusDrawer({ visible, onClose }) {
  const { t } = useTranslation();
  const client = useQueryClient();
  const globalModal = useResultModal();
  const [selectedOption, setSelectedOption] = useState(0);
  const [reason, setReason] = useState(0);
  const { data: reasons } = useQuery({
    queryKey: ["changeStatusReasons"],
    queryFn: () =>
      instance.get("hospitality/reject-orders-reasons").then((res) => res.data),
  });
  const cancelOrderMutation = useMutation({
    mutationFn: (values) =>
      selectedOption == 2 ? cancelOrder(values) : updateOrder(values),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderCancelledSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["restaurantOrders"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileCancellingOrder"));
    },
  });
  const options = [
    {
      label: t("acceptOrder"),
      value: 0,
      icon: <CompleteIcon fill="#219653" />,
      apiValue: "Approved",
    },
    {
      label: t("deliverOrder"),
      value: 1,
      icon: <ProcessIcon fill="#0070DF" />,
      apiValue: "delivered",
    },

    { label: t("cancelOrder"), value: 2, icon: <CancelIcon fill="#F30000" /> },
  ];
  return (
    <CustomDrawer
      open={visible}
      onClose={()=>{
          onClose()
        setSelectedOption(0)
        setReason(0)
      }}
      title={t("changeStatus")}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          onClick={() => {
            try {
              cancelOrderMutation.mutate({
                id: visible.id,
                orderId: visible.id,
                reasonId: reason,
                status: options.find((option) => option.value == selectedOption)
                  .apiValue,
              });
            } catch (e) {
              console.log(e);
            }
          }}
          loading={cancelOrderMutation.isPending}
        >
          {t("save")}
        </Button>
      }
    >
      <div className="border border-solid border-slate-100 flex flex-col gap-4 rounded-xl p-3 mb-4">
        {options.map((option) => (
          <>
            <OptionEntry
              key={option.value}
              icon={option.icon}
              name={option.label}
              value={selectedOption == option.value}
              onChange={(e) => {
                setSelectedOption(option.value);
              }}
              isLast={options.length - 1 == option.value}
            />
          </>
        ))}
      </div>
      {selectedOption == 2 && (
        <ReasonsChoose
          onChange={setReason}
          selectedOption={reason}
          reasons={reasons?.data}
        />
      )}
    </CustomDrawer>
  );
}

function OptionEntry({ name, icon, value, onChange, isLast }) {
  return (
    <div
      className="flex items-center gap-3 pb-3"
      style={{
        borderBottom: isLast ? "none" : "1px solid #EFEFEF",
      }}
      onClick={onChange}
    >
      {icon}
      <Typography className="grow">{name}</Typography>

      <CustomRadio checked={value}></CustomRadio>
    </div>
  );
}

function ReasonsChoose({ onChange, selectedOption, reasons }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border border-solid border-[#EFEFEF]">
      {reasons.map((reason, index) => (
        <>
          <ReasonEntry
            key={reason.id}
            reason={reason.reason}
            isChecked={reason.id == selectedOption}
            onChange={(e) => {
              onChange(reason.id);
            }}
          />
          {reasons.length - 1 != index && (
            <div className="border-t border-solid w-full border-[#EFEFEF]"></div>
          )}
        </>
      ))}
    </div>
  );
}

function ReasonEntry({ reason, isChecked, onChange, isLast }) {
  return (
    <div className="flex items-center justify-between">
      <Typography
        className="grow text-xl"
        style={{
          color: "#767676",
        }}
      >
        {reason}
      </Typography>
      <CustomRadio checked={isChecked} onChange={onChange}></CustomRadio>
    </div>
  );
}
