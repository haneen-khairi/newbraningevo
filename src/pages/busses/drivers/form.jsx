import { Form, Select, TimePicker, Input, Avatar } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormTimePicker from "@/components/forms/FormTimepicker";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import { CreateBusDriver } from "@/services/bus_drivers";
import { GetBusses } from "@/services/busses";
import { GetBusRoutes } from "@/services/bus_routes";
import NativePhoneInput from "@/components/forms/NativePhoneInput.jsx";
export default function DriverForm({ initialValues, onSubmit, mode }) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const fileInput = useRef(null);
  const picture = Form.useWatch("picture", form);
  const { data: busses, error } = GetBusses({});
  const { data: routes } = GetBusRoutes();
  useEffect(() => {
    if (initialValues && mode === "edit") {
      let routes = [];
      if (initialValues?.routes) {
        for (let route of initialValues.routes) {
          routes.push(route.id);
        }
      }
      let phoneNumber = initialValues.userInfo.phoneNumber;
      if (phoneNumber) {
        phoneNumber = phoneNumber.replace("+966", "");
      }

      form.setFieldsValue({
        phoneNumber: phoneNumber,
        FullName: initialValues.userInfo.fullName,
        FullNameEn: initialValues.userInfo.fullNameEn,
        IdentityId: initialValues.userInfo.identityId,
        BusId: initialValues.busInfo?.id,
        status: initialValues.userInfo.isActive ? 1 : 2,
        Email: initialValues.userInfo.email,
        Routes: routes,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  return (
    <Form form={form} layout="vertical" id="driver-form" onFinish={onSubmit}>
      <Form.Item label={t("status")} name="status" rules={[{ required: true }]}>
        <FormSelect
          options={[
            { label: t("active"), value: 1 },
            { label: t("inactive"), value: 2 },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={t("driverNameInEnglish")}
        name="FullNameEn"
        rules={[{ required: true }]}
      >
        <FormInput />
      </Form.Item>
      <Form.Item
        label={t("driverNameInArabic")}
        name="FullName"
        rules={[{ required: true }]}
      >
        <FormInput />
      </Form.Item>
      <Form.Item
        label={t("phone")}
        name="phoneNumber"
        rules={[{ required: true }]}
        id={"phoneNumber"}
      >
        <NativePhoneInput />
      </Form.Item>
      <Form.Item label={t("email")} name="Email" rules={[{ required: true }]}>
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
      <Form.Item
        label={t("busResponsible")}
        name="BusId"
        rules={[{ required: true }]}
      >
        <FormSelect
          options={busses?.data?.items ?? []}
          fieldNames={{
            label: i18n.language == "ar" ? "nameAr" : "nameEn",
            value: "id",
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("pathResponsible")}
        name="Routes"
        rules={[{ required: true }]}
      >
        <FormSelect
          mode="multiple"
          options={routes?.data?.items ?? []}
          fieldNames={{ label: "name", value: "id" }}
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
