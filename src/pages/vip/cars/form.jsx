import { Form, ColorPicker, Button } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllVipBranches } from "../../../services/vip_branches";
import { ImagePicker } from "../../../components/forms/ImagePicker";
import ImageInput from "../../../components/forms/ImageInput";
import colorjs from "color";
export default function CarForm({ inital_values, onSubmit }) {
  const { t } = useTranslation();
  const { data: branches } = useQuery({
    queryKey: ["vip_branches"],
    queryFn: async () => {
      return fetchAllVipBranches();
    },
  });
  const [form] = Form.useForm();
    const image = Form.useWatch("UploadFiles", form);

    const color = Form.useWatch("color", form);
  useEffect(() => {
    if (inital_values) {
      form.setFieldsValue(inital_values);
    } else {
      form.resetFields();
    }
  }, [inital_values]);
    function getColor(color) {
        if (color && typeof color.toHexString == "function") {
            return color.toHexString();
        } else {
            return color;
        }
    }
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={inital_values}
      id="carForm"
    >
      <Form.Item name="id" hidden></Form.Item>
      <Form.Item label={`${t("carType")} (عربي)`} name="nameAr">
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
      <Form.Item label={`${t("carType")} (EN)`} name="nameEn">
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
      <Form.Item label={t("carColor")} name="color">
        <ColorPicker defaultValue={color}>
          <FormInput
              required

              value={getColor(color)}
              size="large"
              rules={[
                {
                  required: true,
                },
              ]}
          />
        </ColorPicker>
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item label={t("plateNumber")} name="plateNumber">
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
        <Form.Item label={t("plateNumber")+" (EN)"} name="plateNumberEn">
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

      </div>

      <Form.Item label={t("branch")} name="branchId">
        <FormSelect
          required
          size="large"
          options={branches?.data?.map((branch) => ({
            label: branch.name,
            value: branch.id,
          }))}
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("status")} name="isActive">
        <FormSelect
          required
          size="large"
          options={[
            { label: t("active"), value: true },
            { label: t("inActive"), value: false },
          ]}
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <ImageInput
        formItemProps={{
          name: "UploadFiles",
          label: t("image"),
        }}
      />
        {
            image && <div className={'flex gap-2 p-2 rounded-xl border border-solid border-slate-100 mt-2'}>
                {image[0].name}
            </div>
        }
    </Form>
  );
}
