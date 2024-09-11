import { Form } from "antd";
import React, { useEffect } from "react";
import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";
import LocationChooser from "../../vip/MyTrips/components/LocationChooser";

export default function FloorDrawer({isOpen , onSubmit }) {
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
        id="authority-form"
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item label={t("floorNameInAr")} name={"nameAr"}>
          <FormInput placeholder={t("companyNameInAr")}></FormInput>
        </Form.Item>

        <Form.Item label={t("floorNameInEN")} name={"nameEn"}>
          <FormInput placeholder={t("companyNameInEn")}></FormInput>
        </Form.Item>

        <Form.Item label={t("building")} name={"buildingId"}>
        <LocationChooser
          name="originBuildingId"
          form={form}
          disabled={false}
          multiSelect={false}
          isSure={false}
        />
        </Form.Item>

      </Form>
    </>
  );
}
