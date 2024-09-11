import { t } from "i18next";
import { Modal, Form } from "antd";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormTimePicker from "@/components/forms/FormTimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllRestHours,
  updateRestHours,
  deleteRestHours,
  createRestHours,
} from "@/services/resthours";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { fetchAllWorkHours } from "../../services/workhours";

export default function RestHoursModal({
  isOpen,
  onClose,
  data,
  onSuccessSubmit,
}) {
  dayjs.extend(CustomParseFormat);
  const [form] = Form.useForm();
  const mode = isOpen && (Object.keys(data).length ? "edit" : "create");
  const createMutation = useMutation({
    mutationFn: createRestHours,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  const editMutation = useMutation({
    mutationFn: updateRestHours,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  const { data: workdays } = useQuery({
    queryKey: ["workdays"],
    queryFn: () => fetchAllWorkHours(),
  });

  function handleSubmit(values) {
    values.start = values.start.format("HH:mm:ss");
    values.end = values.end.format("HH:mm:ss");
    if (mode === "create") {
      createMutation.mutate(values);
    }
    if (mode === "edit") {
      editMutation.mutate({ ...data, ...values });
    }
    onClose();
  }
  if (mode === "edit") {
    data.start = dayjs(data.start, "HH:mm:ss");
    data.end = dayjs(data.end, "HH:mm:ss");
    form.setFieldsValue(data);
  } else {
    form.resetFields();
  }
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label={t("nameInAr")} name={"nameAr"}>
          <FormInput name="nameAr" size="large" />
        </Form.Item>
        <Form.Item label={t("nameInEn")} name={"nameEn"}>
          <FormInput name="nameEn" size="large" />
        </Form.Item>
        <Form.Item label={t("day")} name={"workHourId"}>
          <FormSelect
            name="workHourId"
            size="large"
            options={workdays?.data ?? []}
            fieldNames={{
              label: "name",
              value: "id",
            }}
          />
        </Form.Item>
        <Form.Item label={t("startTime")} name={"start"}>
          <FormTimePicker changeOnBlur size="large" format="HH:mm" />
        </Form.Item>
        <Form.Item label={t("endTime")} name={"end"}>
          <FormTimePicker changeOnBlur size="large" format="HH:mm" />
        </Form.Item>
        <FormButton className="w-full" type="primary" htmlType="submit">
          {t("saveAndSubmit")}
        </FormButton>
      </Form>
    </Modal>
  );
}
