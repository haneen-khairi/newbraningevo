import { Form } from "antd";
import React, { useEffect } from "react";
import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";

export default function AuthorityDrawer({ mapDrawerOpen,onSubmit }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const mode =mapDrawerOpen?.id?"update":"create"

  useEffect(() => {
    if (mode=="update") {
      form.setFieldValue("nameAr",mapDrawerOpen.nameAr)
      form.setFieldValue("nameEn",mapDrawerOpen.nameEn)
    }
  }, [])
  
  return (
    <>
      <Form
        form={form}
        onFinish={(values) => {
          values.mode=mode;
          values.id=mapDrawerOpen?.id
          onSubmit(values);
        }}
        id="authority-form"
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item label={t("authorityNameInAr")} name={"nameAr"}>
          <FormInput></FormInput>
        </Form.Item>
        <Form.Item label={t("authorityNameInEn")} name={"nameEn"}>
          <FormInput></FormInput>
        </Form.Item>
      </Form>
    </>
  );
}
