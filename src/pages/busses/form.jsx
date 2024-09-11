import { Form, ColorPicker, Button } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllVipBranches } from "@/services/vip_branches";
import { ImagePicker } from "@/components/forms/ImagePicker";
import ImageInput from "@/components/forms/ImageInput";
import colorjs from "color";

export default function BusForm({ inital_values, onSubmit, isLoading }) {
  const { t } = useTranslation();
  const { data: branches } = useQuery({
    queryKey: ["vip_branches"],
    queryFn: async () => {
      return fetchAllVipBranches();
    },
  });
  const [form] = Form.useForm();
  const image = Form.useWatch("UploadFiles", form);
  const busColor = inital_values?.busColor
    ? colorjs(inital_values?.busColor)
    : Form.useWatch("color", form);
  const busColorMap = inital_values?.busColorMap
    ? colorjs(inital_values?.busColorMap)
    : Form.useWatch("routeColor", form);
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
      id="busForm"
    >
      <Form.Item name="id" hidden></Form.Item>
      <Form.Item label={t("nameInAr")} name="nameAr">
        <FormInput
          required
          
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("nameInEn")} name="nameEn">
        <FormInput
          required
          
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>

      <Form.Item label={t("busNumberAr")} name="plateNumber">
        <FormInput
          required
          
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("busNumberEn")} name="plateNumberEn">
        <FormInput
          required
          
          rules={[
            {
              required: true,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label={t("busColor")} name="color">
        <ColorPicker>
          <FormInput
            required
            
            value={getColor(busColor)}
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ColorPicker>
      </Form.Item>
      <Form.Item label={t("busColorMap")} name="routeColor">
        <ColorPicker>
          <FormInput
            required
            
            value={getColor(busColorMap)}
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ColorPicker>
      </Form.Item>
      <Form.Item label={t("branch")} name="branchId">
        <FormSelect
          required
          
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
      <Form.Item label={t("capacity")} name="capacity">
        <FormInput
          required
          
          type="number"
          min={1}
          max={100}
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
