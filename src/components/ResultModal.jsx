import { Modal, Result } from "antd";
import SuccessImage from "@/assets/success.png";
export default function ResultModal({
  status,
  title,
  subtitle,
  content,
  close,
  closable = true,
}) {
  const isVisible = Boolean(status);
  const resultProps = {
    status,
    title,
    subTitle: subtitle,
  };
  if (status == "success") {
    resultProps.icon = <img src={SuccessImage} />;
  }
  return (
    <Modal
      open={isVisible}
      footer={null}
      centered
      onCancel={closable ? close : null}
      closeIcon={closable}
    >
      <Result {...resultProps}>{content}</Result>
    </Modal>
  );
}
