import { t } from "i18next";
import { Modal, Form } from "antd";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import FormTimePicker from "@/components/forms/FormTimepicker";
import { useMutation } from "@tanstack/react-query";
import {
  fetchAllEmailDomains,
  updateEmailDomains,
  deleteEmailDomains,
  createEmailDomains,
} from "@/services/emaildomains";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

export default function EmailDomainsModal({
  isOpen,
  onClose,
  data,
  onSuccessSubmit,
}) {
  dayjs.extend(CustomParseFormat);
  const [form] = Form.useForm();
  const mode = isOpen && (Object.keys(data).length ? "edit" : "create");
  const createMutation = useMutation({
    mutationFn: createEmailDomains,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  const editMutation = useMutation({
    mutationFn: updateEmailDomains,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });

  function handleSubmit(values) {
    if (mode === "create") {
      createMutation.mutate({ ...values, isActive: true });
    }
    if (mode === "edit") {
      editMutation.mutate({ ...data, ...values });
    }
    onClose();
  }
  if (mode === "edit") {
    form.setFieldsValue(data);
  } else {
    form.resetFields();
  }
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={t("domain")}
          name={"domain"}
          required
          rules={[
            {
              pattern: /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
              message: t("invalidDomain"),
            },
          ]}
        >
          <FormInput size="large" />
        </Form.Item>
        <FormButton className="w-full" type="primary" htmlType="submit">
          {t("saveAndSubmit")}
        </FormButton>
      </Form>
    </Modal>
  );
}
