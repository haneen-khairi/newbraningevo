import { Form } from "antd";
import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
export default function CategoryForm({ inital_values, onSubmit }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (inital_values) {
      form.setFieldsValue(inital_values);
    } else {
      form.resetFields();
    }
  }, [inital_values]);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={inital_values}
      id="categoryForm"
    >
      <Form.Item name="id" hidden></Form.Item>
      <Form.Item label={t("nameInAr")} name="nameAr">
        <FormInput
          required
          size="large"
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("nameInEn")} name="nameEn">
        <FormInput
          label="Name"
          required
          size="large"
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
}
