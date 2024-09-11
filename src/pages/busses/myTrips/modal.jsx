import { Modal, Result } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SuccessImage from "@/assets/success.png";
import LocationDot from "@/components/LocationDot";
export default function StatusModal({
  isOpen,
  onClose,
  status,
  error,
  success,
}) {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [status]);
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      {status == "success" ? (
        <Success success={success} />
      ) : (
        <Error error={error} />
      )}
    </Modal>
  );
}

function Success({ success }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <img src={SuccessImage} alt="success" />
      <p className="font-semibold text-xl mt-2">
        {t("orderPlacedSuccessfully")}
      </p>
      <p>{t("pleaseWaitAtTheLocation")}</p>
      <div
        className="border-solid border-slate-100 border p-2 rounded-xl  w-full"
        style={{
          boxShadow: "0px 4px 75px 0px #0000000F",
        }}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div />
            <div className="flex flex-col gap-2">
              <p>{success.name}</p>
              <p>{success.estimatedDelivery}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>{i18n.language == "ar" ? success.nameAr : success.nameEn}</p>
            <p>{success.PlateNumber}</p>
          </div>
        </div>
        <div className="flex w-full items-center mt-2">
          <div className="flex flex-col gap-2 items-center">
            <LocationDot isActive={false} />
            <p>{success.startPoint}</p>
          </div>
          <div className="border-t border-solid border-[#EFEFEF] w-full mb-6"></div>
          <div className="flex flex-col gap-2 items-center">
            <LocationDot isActive={true} />
            <p>{success.endPoint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Error({ error }) {
  return <Result status={"error"} extra={error} />;
}
