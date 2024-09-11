import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Rate, Button, Form } from "antd";
import { useMutation } from "@tanstack/react-query";
import { RateTrip } from "@/services/bus_trips";
import useResultModal from "@/hooks/useResultModal";
export default function DriverRating() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const globalModal = useResultModal();
  useEffect(() => {
    const busOrders = JSON.parse(Cookies.get("busOrders") ?? "{}");
    if (busOrders && busOrders?.id) {
      setId(busOrders.id);
      Cookies.remove("busOrders");
      setIsOpen(true);
    }
  }, []);
  const rateTripMutation = useMutation({
    mutationFn: (data) => RateTrip(data),
    onSuccess: () => {
      setIsOpen(false);
      globalModal.success({
        title: t("success"),
        subtitle: t("ratingSubmitted"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(t("error"), t("errorWhileRating"));
    },
  });

  return (
    <Modal
      footer={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      styles={{
        content: {
          padding: "0px",
        },
        header: {
          padding: "12px",
          background: "#FAFAFA",
          textAlign: "center",
        },
      }}
      title={t("driverRating")}
    >
      <Form
        className="flex flex-col gap-4 items-center px-3 pb-4"
        onFinish={(v) => {
          rateTripMutation.mutate({
            ...v,
            id,
          });
        }}
      >
        <p>
          {t("congratulations")}! {t("onYourArrival")}
        </p>
        <Form.Item name="rate" className="w-full flex justify-center">
          <RateComponent />
        </Form.Item>
        <Form.Item name="rateText" className="w-full">
          <Input.TextArea
            rows={4}
            placeholder={t("writeAnyNotes")}
            style={{
              backgroundColor: "#F6F6F6",
              border: "none",
            }}
          />
        </Form.Item>
        <Button
          className="w-full rounded-xl border-none"
          htmlType="submit"
          type="primary"
        >
          {t("submit")}
        </Button>
      </Form>
    </Modal>
  );
}
function RateComponent({ ...rest }) {
  return (
    <Rate
      {...rest}
      className="text-[#FFC75B]"
      character={
        <svg
          width="47"
          height="45"
          viewBox="0 0 47 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.7139 6.94461L22.6068 7.39499L21.7139 6.94461L17.2683 15.7578L7.36148 17.1659C5.70737 17.401 5.05359 19.4405 6.26275 20.5935L13.4024 27.4013L11.713 37.036C11.4276 38.664 13.1279 39.9159 14.5976 39.16L23.4996 34.582L32.4016 39.16C33.8714 39.9159 35.5717 38.664 35.2862 37.036L33.5969 27.4013L40.7365 20.5935C41.9457 19.4405 41.2919 17.401 39.6378 17.1659L29.731 15.7578L25.2853 6.94461L24.3925 7.39499L25.2853 6.94461C24.546 5.47894 22.4533 5.47895 21.7139 6.94461Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
    />
  );
}
