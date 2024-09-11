import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ChevronIcon from "@/assets/icons/chevron.svg?react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Input, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { updateOrder } from "@/services/restaurantOrders";
import { set } from "lodash";

export default function OrderItems({
  items,
  orderForDrawer,
  changeItem,
  onClose,
}) {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const client = useQueryClient();

  const confirmOrderMutation = useMutation({
    mutationFn: (values) => updateOrder({
        ...values,
        id: orderForDrawer?.id,
        orderType: "Menu"
    }),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["teaboyOrders"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileCreatingOrder"));
      console.log("error", error);
    },
  });

  const handleConfirmOrder = () => {
    confirmOrderMutation.mutate({
      floorId: orderForDrawer?.floorId,
      roomId: orderForDrawer?.roomId,
      requesterId: orderForDrawer?.requesterId,
      waiterId: orderForDrawer?.waiterId,
      resturantId: orderForDrawer?.resturantId,
      roomNumber: orderForDrawer?.roomNumber,
      status: "Approved",
      items: items.map((item) => ({
        itemId: item.id,
        itemSize: "Small",
        count: item.count,
        sugarSpoons: item.sugarSpoons,
        instructions: item.instructions,
      })),
    });
  };

  return (
    <div className="p-2 rounded-xl border border-solid border-slate-100">
      <p className="py-3 px-2 bg-[#FAFAFA] rounded-lg">{t("addedItems")}</p>
      <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
        {items?.map((item, index) => (
          <>
            <OrderItem
              item={{
                ...item,
              }}
              key={index}
              changeItem={changeItem}
            />
            {index < items.length - 1 && (
              <div className="border-t border-solid border-slate-100"></div>
            )}
          </>
        ))}
      </div>

      <Button
        type="primary"
        className="rounded-xl mt-8 w-full"
        onClick={handleConfirmOrder}
      >
        {t("confirmOrder")}
      </Button>
    </div>
  );
}

function OrderItem({ item, changeItem }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [count, setCount] = useState(1);
  const [sugarSpoons, setSugar] = useState(1);
  const [instructions, setInstructions] = useState("");

  useEffect(
    () =>
      changeItem({
        ...item,
        count,
        sugarSpoons,
        instructions,
      }),
    [count, sugarSpoons, instructions]
  );

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex justify-between items-center">
        <p className="font-semibold font-su">{item.name}</p>
        <ChevronIcon
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
          className="p-1"
        />
      </div>
      <div
        className="flex-col gap-3"
        style={{
          display: isExpanded ? "flex" : "none",
        }}
      >
        <div className="p-2 rounded-xl border-solid border border-[#EDEDED] flex justify-between items-center">
            <p className={'text-[#767676]'}>{t("count")}</p>
          <Counter
            value={count}
            onChange={(e) => {
              setCount(e);
            }}
          />
        </div>
        {item?.allowSugar && (
            <>
                <p className="font-semibold font-su">{t("sugarSpoons")}</p>
                <div className="p-2 rounded-xl border-solid border border-[#EDEDED] flex justify-between items-center">
                    <p className={'text-[#767676]'}>{t("count")}</p>
                    <Counter
                        value={sugarSpoons}
                        onChange={(e) => {
                            setSugar(e);
                        }}
                    />
                </div>
            </>
        )}
          <p className="font-semibold font-su">{t("notes")}</p>
          <Input.TextArea
              rows={2}
              className="rounded-xl "
              onChange={(e) => {
                  setInstructions(e.target.value);
              }}
          />
      </div>
    </div>
  );
}

function Counter({value, onChange, min = 0, max = 10 }) {
  return (
    <div className="flex gap-3 items-center">
      <div
        className="p-1 rounded-full items-center justify-center bg-[#F5F6FA] cursor-pointer"
        role="button"
        onClick={() => onChange(Math.max(value - 1, min))}
      >
        <FiMinus size={20} color="#38ACB1" />
      </div>
      {value}
      <div
        className="p-1 rounded-full items-center justify-center bg-[#F5F6FA] cursor-pointer"
        role="button"
        onClick={() => onChange(
            Math.min(value + 1, max)
        )}
      >
        <FiPlus size={20} color="#38ACB1" />
      </div>
    </div>
  );
}
