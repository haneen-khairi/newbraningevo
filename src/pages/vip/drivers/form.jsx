import { Form, Select, TimePicker, Input, Avatar } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormTimePicker from "@/components/forms/FormTimepicker";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllVipCars } from "@/services/vip_cars";
import { CreateVipDriver, UpdateVipDriver } from "@/services/vip_drivers";
import useResultModal from "@/hooks/useResultModal";
import Normalize from "@/utils/errorNormalizer";
import PhoneInput from "@/components/forms/PhoneInput";
import NativePhoneInput from "@/components/forms/NativePhoneInput.jsx";
export default function DriverForm({ initialValues, onClose, setIsLoading }) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const mode = initialValues?.id ? "edit" : "create";
  const globalModal = useResultModal();
  const client = useQueryClient();
  const { data: cars } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchAllVipCars(),
  });
  const createMutation = useMutation({
    mutationFn: (values) => CreateVipDriver(values),
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("driverCreatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipDrivers"] });
      onClose();
    },
    onError: (e) => {
      const error = Normalize(e);
      globalModal.error(t("error"), error);
    },
  });
  const editMutation = UpdateVipDriver({
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("driverUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipDrivers"] });
      onClose();
    },
  });
  useEffect(() => {
    setIsLoading(createMutation.isPending || editMutation.isPending);
  }, [editMutation.isPending, createMutation.isPending]);

  useEffect(() => {
    if (mode == "edit") {
      form.setFieldsValue({
        fullName: initialValues.userInfo.fullName,
        fullNameEn: initialValues.userInfo.fullNameEn,
        phoneNumber: initialValues.userInfo.phoneNumber.replace("+966", ""),
        email: initialValues.userInfo.email,
        bloodGroup: initialValues.userInfo.bloodGroup,
        IdentityId: initialValues.userInfo.identityId,
        carId: initialValues.carInfo.id,
        password: initialValues.userInfo.password,
        confirmPassword: initialValues.userInfo.password,
        isActive: initialValues.userInfo.isActive,
      });
    } else {
      form.resetFields();
    }
  }, [mode]);
  function handleSubmit(values) {
    if (mode == "edit") {
      editMutation.mutate({
        ...values,
        id: initialValues.id,
        CategoryId: 1,
        status: 3,
        phoneNumber: "+966" + values.phoneNumber,
      });
    } else {
      createMutation.mutate({
        ...values,
        CategoryId: 1,
        status: 3,
        phoneNumber: "+966" + values.phoneNumber,
      });
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      id="vip-driver-form"
      onFinish={handleSubmit}
    >
      <Form.Item label={t("status")} name="isActive">
        <FormSelect
          options={[
            { label: t("active"), value: true },
            { label: t("inactive"), value: false },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("name")} name="fullName">
        <FormInput />
      </Form.Item>
      <Form.Item label={t("name") + " (EN)"} name="fullNameEn">
        <FormInput />
      </Form.Item>
      <Form.Item label={t("phone")} name="phoneNumber">
        <NativePhoneInput />
      </Form.Item>
      <Form.Item label={t("email")} name="email">
        <FormInput />
      </Form.Item>
      <Form.Item
        label={t("identity")}
        name="IdentityId"
        rules={[
          {
            required: true,
            min: 10,
            max: 10,
            message: t("identityNumberLength"),
          },
          {
            pattern: /^[0-9]+$/,
            message: t("identityNumbersOnly"),
          },
        ]}
      >
        <FormInput />
      </Form.Item>
      <Form.Item label={t("bloodType")} name="bloodGroup">
        <FormSelect
          options={[
            { label: "A+", value: "A+" },
            { label: "A-", value: "A-" },
            { label: "B+", value: "B+" },
            { label: "B-", value: "B-" },
            { label: "AB+", value: "AB+" },
            { label: "AB-", value: "AB-" },
            { label: "O+", value: "O+" },
            { label: "O-", value: "O-" },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("car")} name="carId">
        <FormSelect
          options={cars?.data?.items ?? []}
          fieldNames={{
            label: i18n.language == "ar" ? "nameAr" : "nameEn",
            value: "id",
          }}
        />
      </Form.Item>
      <Form.Item name="password" label={t("password")}>
        <FormInput type="password" />
      </Form.Item>
      <Form.Item name="confirmPassword" label={t("confirmPassword")}>
        <FormInput type="password" />
      </Form.Item>
    </Form>
  );
}
