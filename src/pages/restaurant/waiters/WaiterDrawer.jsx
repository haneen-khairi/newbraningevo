import Drawer from "@/components/Drawer";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button, Form } from "antd";

import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";
import FormPassword from "@/components/forms/FormPassword";
import FormTimepicker from "@/components/forms/FormTimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWaiters, updateWaiters } from "@/services/waiters";
import useResultModal from "@/hooks/useResultModal";
import dayjs from "dayjs";
import BuildingSelector from "@/components/forms/BuildingSelector";
import { fetchAllFloors } from "@/services/floors";
import NativePhoneInput from "../../../components/forms/NativePhoneInput.jsx";

export default function WaiterDrawer({ isOpen, onClose, id }) {
  const { t } = useTranslation();
  const mode = isOpen && id ? "edit" : "create";
  const [form] = Form.useForm();
  const client = useQueryClient();
  const globalModal = useResultModal();
  const buildingId = Form.useWatch("building", form);
  const { data: floors } = useQuery({
    queryKey: ["floors", buildingId],
    queryFn: () =>
      fetchAllFloors({
        buildingId,
      }),
    enabled: Boolean(buildingId),
  });
  //create user with waiterRole
  const createUserMutation = useMutation({
    mutationFn: (values) =>
      createWaiters({
        ...values,
        phoneNumber: "+966" + values.phoneNumber,
      }),
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("waiterCreatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["waiters"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        error.response?.data?.errors.map((e) => <div>{e}</div>) ??
          error.message,
      );
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: (values) =>
      updateWaiters({
        ...values,
        phoneNumber: "+966" + values.phoneNumber,
      }),
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("waiterUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["waiters"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        error.response?.data?.errors.map((e) => <div>{e}</div>) ??
          error.message,
      );
    },
  });
  useEffect(() => {
    if (mode == "edit") {
      const values = {
        building: id?.floor?.buildingId,
        ...id,
      };
      const restTime = [];
      if (id?.restHourStart) {
        restTime.push(dayjs(id?.restHourStart, "HH:mm:ss"));
      }
      if (id?.restHourEnd) {
        restTime.push(dayjs(id?.restHourEnd, "HH:mm:ss"));
      }
      values.restTime = restTime;
      if (values.phoneNumber) {
        values.phoneNumber = values.phoneNumber.replace("+966", "");
      }
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [mode]);
  //status, nameAr, nameEn, building, floor, restTime , idNumber, phone, email, password, confirmPassword
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={mode == "add" ? t("addTeaBoy") : t("editTeaBoy")}
      width={"30vw"}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          htmlType="submit"
          form="waiterForm"
          loading={createUserMutation.isPending || updateUserMutation.isPending}
        >
          {t("save")}
        </Button>
      }
    >
      <Form
        layout="vertical"
        form={form}
        id="waiterForm"
        onFinish={async (values) => {
          const mutateFunction =
            mode == "edit" ? updateUserMutation : createUserMutation;
          if (mode == "edit") {
            values.id = id.id;
          }
          if (values?.restTime) {
            values.restHourStart = dayjs(values.restTime[0]).format("HH:mm:00");
            values.restHourEnd = dayjs(values.restTime[1]).format("HH:mm:00");
          }
          const waiterId = await mutateFunction.mutateAsync({
            ...values,
            identityType: 0,
          });
        }}
      >
        <Form.Item
          label={t("status")}
          name="isActive"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormSelect
            options={[
              { label: t("active"), value: true },
              { label: t("inActive"), value: false },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={t("nameInAr")}
          name="fullName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          label={t("nameInEn")}
          name="fullNameEn"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          label={t("building")}
          name="building"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <BuildingSelector allowClear />
        </Form.Item>
        <Form.Item
          label={t("floor")}
          name="floorId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormSelect
            options={floors?.data ?? []}
            fieldNames={{ label: "name", value: "id" }}
            disabled={!buildingId}
            allowClear
          />
        </Form.Item>
        <Form.Item label={t("restTime")} name="restTime">
          <FormTimepicker.RangePicker format="HH:mm" className="w-full" />
        </Form.Item>
        <Form.Item
          label={t("idNumber")}
          name="identityId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          label={t("phone")}
          name="phoneNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <NativePhoneInput />
        </Form.Item>
        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          label={t("password")}
          name="password"
          autocomplete="off"
          rules={[
            {
              required: mode != "edit",
            },
          ]}
        >
          <FormPassword autocomplete="off" />
        </Form.Item>
        <Form.Item
          label={t("confirmPassword")}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              validator: (rule, value) => {
                if (value !== form.getFieldValue("password")) {
                  return Promise.reject(t("passwordsDoNotMatch"));
                }
                return Promise.resolve();
              },
            },
            {
              required: mode != "edit",
            },
          ]}
        >
          <FormPassword />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
