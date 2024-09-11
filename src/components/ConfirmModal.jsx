import { Modal, Button, Result } from "antd";
import { t } from "i18next";
export default function ConfirmModal({ title, subtitle, onOk, onCancel }) {
  const isVisible = Boolean(title);
  return (
    <Modal open={isVisible} centered footer={null} onCancel={onCancel}>
      <Result
        status="warning"
        title={title}
        subTitle={subtitle}
        extra={
          <>
            <Button key="cancel" onClick={onCancel}>
              {t("cancel")}
            </Button>
            ,
            <Button key="ok" type="primary" onClick={onOk} danger>
              {t("confirm")}
            </Button>
            ,
          </>
        }
      />
    </Modal>
  );
}
