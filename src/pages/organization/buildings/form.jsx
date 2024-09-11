import { Form, Select } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import FormSelect from "@/components/forms/FormSelect";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
export default function BuildingsForm({setPolygonVisability,mapDrawerOpen, polygonPath, onSubmit }) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const mode =mapDrawerOpen.id? "edit":"create";

  if (polygonPath?.length>0) {
    form.setFieldValue("polygons",polygonPath)
  }

  useEffect(() => {
    if (mode =="edit") {
      form.setFieldValue("nameAr",mapDrawerOpen.nameAr)
      form.setFieldValue("nameEn",mapDrawerOpen.nameEn)
      form.setFieldValue("polygons",polygonPath)
      
      const fixPolygonFormat = JSON.parse(polygonPath).map((el) => {
        return { lat: el[0], lng: el[1]};
      });
      setPolygonVisability(fixPolygonFormat);
    }
  }, [])
  

  return (
    <Form
    id="building-form"
      onFinish={(values) => 
      {
        mapDrawerOpen.id?values.id =mapDrawerOpen.id:""
        onSubmit(values)
      }
      }
      form={form}
      className="flex flex-col"
      layout="vertical"
    >
      <Form.Item label={t("buidingNameInAr")} name={"nameAr"}>
        <FormInput></FormInput>
      </Form.Item>
      <Form.Item label={t("buidingNameInEn")} name={"nameEn"}>
        <FormInput></FormInput>
      </Form.Item>

      <Form.Item
        label={t("builtOnMap")}
        name="polygons"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >

        <FormInput
          className="mb-1"
          suffix={<MdOutlineMyLocation className="text-2xl" />}
          readOnly
        />

      </Form.Item>


    </Form>
  );
}

