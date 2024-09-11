import { t } from "i18next";
import { Modal, Form } from "antd";
import FormButton from "@/components/forms/FormButton";

import FormSelect from "@/components/forms/FormSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllWaiters,
  updateWaiters,
  deleteWaiters,
  createWaiters,
} from "@/services/waiters";
import { fetchAllFloors } from "@/services/floors";
import { fetchAllBuildings } from "@/services/buildings";
import { fetchAllUsers } from "@/services/users";
import { useEffect, useState } from "react";
export default function WaitersModal({
  isOpen,
  onClose,
  data,
  onSuccessSubmit,
}) {
  const [form] = Form.useForm();
  const mode = isOpen && (Object.keys(data).length ? "edit" : "create");
  const { data: buildings } = useQuery({
    queryKey: ["buildings"],
    queryFn: () => fetchAllBuildings(),
  });
  const building = Form.useWatch("buildingId", form);
  const { data: floors } = useQuery({
    queryKey: ["floors"],
    queryFn: () => fetchAllFloors({}),
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUsers(),
  });
  const createMutation = useMutation({
    mutationFn: createWaiters,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  const editMutation = useMutation({
    mutationFn: updateWaiters,
    onSuccess: () => {
      onSuccessSubmit();
    },
  });
  function handleSubmit(values) {
    if (mode === "create") {
      createMutation.mutate(values);
    }
    if (mode === "edit") {
      editMutation.mutate({ ...data, ...values });
    }
    onClose();
  }
  useEffect(() => {
    if (mode === "edit") {
      data.buildingId = data?.floor?.buildingId;
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [isOpen, mode]);
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name={"waiterId"} label={t("waiter")}>
          <FormSelect
            options={users?.data ?? []}
            fieldNames={{
              label: "name",
              value: "id",
            }}
          ></FormSelect>
        </Form.Item>
        <Form.Item name={"buildingId"} label={t("building")}>
          <FormSelect
            options={buildings?.data ?? []}
            fieldNames={{
              label: "name",
              value: "id",
            }}
          ></FormSelect>
        </Form.Item>
        <Form.Item name={"floorId"} label={t("floor")}>
          <FormSelect
            options={floors?.data ?? []}
            disabled={!building}
            fieldNames={{
              label: "name",
              value: "id",
            }}
          ></FormSelect>
        </Form.Item>
        <FormButton className="w-full" type="primary" htmlType="submit">
          {t("saveAndSubmit")}
        </FormButton>
      </Form>
    </Modal>
  );
}
