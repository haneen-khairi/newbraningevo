import { t } from "i18next";
import { Modal, Form } from "antd";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import FormDatePicker from "@/components/forms/FormDatepicker";
import { useMutation } from "@tanstack/react-query";
import { createDayOff, updateDayOff } from "@/services/workhours";
import dayjs from "dayjs";
export default function DaysOffModal({
  isOpen,
  onClose,
  data,
  onSuccessSubmit,
}) {
  const [form] = Form.useForm();
  const mode = isOpen && (Object.keys(data).length ? "edit" : "create");
  const createMutation = useMutation({
    mutationFn: createDayOff,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  const editMutation = useMutation({
    mutationFn: updateDayOff,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });

  function handleSubmit(values) {
    values.date = values.date.format("YYYY-MM-DD");
    if (mode === "create") {
      createMutation.mutate(values);
    }
    if (mode === "edit") {
      editMutation.mutate({ ...data, ...values });
    }
    onClose();
  }
  if (mode === "edit") {
    data.date = dayjs(data.date);
    form.setFieldsValue(data);
  } else {
    form.resetFields();
  }
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label={t("date")} name={"date"}>
          <FormDatePicker name="date" size="large" />
        </Form.Item>
        <Form.Item label={t("reasonAR")} name={"nameAr"}>
          <FormInput name="nameAr" size="large" />
        </Form.Item>
        <Form.Item label={t("reasonEn")} name={"nameEn"}>
          <FormInput name="nameEn" size="large" />
        </Form.Item>
        <FormButton className="w-full" type="primary" htmlType="submit">
          {t("saveAndSubmit")}
        </FormButton>
      </Form>
    </Modal>
  );
}
