import { Modal, QRCode, Typography } from "antd";

import { useTranslation } from "react-i18next";

export default function WhatsappBotModal({ isOpen, onClose, Qr, Status }) {
  const { t } = useTranslation();
  const isLoading = Status == "1" || !Qr;
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <div className="flex items-center justify-center flex-col gap-2">
        <QRCode
          value={Qr || "https://google.com"}
          size={300}
          status={isLoading ? "loading" : "active"}
        />
        <Typography className="text-2xl">
          {isLoading ? t("Loading") : t("pleaseScanThisCode")}
        </Typography>
      </div>
    </Modal>
  );
}
