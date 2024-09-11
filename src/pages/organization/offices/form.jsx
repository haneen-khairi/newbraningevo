import { Form } from "antd";
import React, { useEffect } from "react";
import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";

export default function OfficeDrawer({ isOpen, onSubmit }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const mode = isOpen?.id ? "edit" : "create";

  useEffect(() => {
    if (mode == "edit") {
      form.setFieldValue("nameAr", isOpen.nameAr);
      form.setFieldValue("nameEn", isOpen.nameEn);
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        onFinish={(values) => {
          if (mode == "edit") {
            values.id = isOpen.id;
          }
          onSubmit(values,mode);
        }}
        id="office-form"
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item label={t("officeNameInAr")} name={"nameAr"}>
          <FormInput placeholder={t("officeNameInAr")}></FormInput>
        </Form.Item>
        <Form.Item label={t("officeNameInEn")} name={"nameEn"}>
          <FormInput placeholder={t("officeNameInEn")}></FormInput>
        </Form.Item>
      </Form>
    </>
  );
}
