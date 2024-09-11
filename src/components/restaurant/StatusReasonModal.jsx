import { Modal, Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { updateOrder } from "@/services/restaurantOrders";
import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
export default function StatusReasonModal({ id, onClose, statusToSet }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const isOpen = Boolean(id);
  async function handleSubmitStatus(values) {
    setIsSubmitting(true);
    await updateOrder({
      id,
      status: statusToSet,
      statusReason: values.statusReason,
    });
    form.resetFields();
    setIsSubmitting(false);
    onClose();
  }
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Form onFinish={handleSubmitStatus} layout="vertical" form={form}>
        <Form.Item name={"statusReason"} label={t("statusReason")}>
          <FormInput.TextArea />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
          }}
        >
          {t("submit")}
        </Button>
      </Form>
    </Modal>
  );
}
