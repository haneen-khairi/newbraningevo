import { Form, Dropdown, Button } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import CountrySelector from "@/components/forms/CountrySelector";
import PhoneInput from "@/components/forms/PhoneInput";
import FormButton from "@/components/forms/FormButton";
import AvatarWithAnchor from "@/components/AvatarWithAnchor";
import { t } from "i18next";
import CustomCard from "@/components/CardWithHeader";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AvatarImage from "@/assets/avatar-image.webp";
export default function GuestForm({
  form,
  loading,
  onSubmit,
  image,
  initialValues = {},
  isFetching,
}) {
  const [file, setFile] = useState();
  if (isFetching) return null;
  return (
    <CustomCard className="w-8/12 mx-auto">
      <Form
        form={form}
        onFinish={(values) => {
          onSubmit({ ...values, picture: file });
        }}
        layout="vertical"
        initialValues={initialValues}
      >
        <div className="flex items-center justify-center mb-2">
          <input
            type="file"
            id="user-photo-input"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />
          <AvatarWithAnchor
            avatarProps={{
              size: 180,
              src:
                file instanceof File
                  ? URL.createObjectURL(file)
                  : image || AvatarImage,
            }}
          >
            <Dropdown
              trigger={"click"}
              placement="bottomCenter"
              menu={{
                items: [
                  file && {
                    label: t("remove"),
                    onClick: () => {
                      setFile(undefined);
                    },
                  },

                  {
                    label: t("change"),
                    onClick: () => {
                      document.getElementById("user-photo-input").click();
                    },
                  },
                ],
              }}
            >
              <Button
                shape="circle"
                type="primary"
                size="large"
                icon={<FaPlus />}
              />
            </Dropdown>
          </AvatarWithAnchor>
        </div>
        <div className="flex gap-2">
          <Form.Item
            name={"firstName"}
            label={t("firstName")}
            className="basis-1/2"
            rules={[{ required: true }]}
          >
            <FormInput size="large" />
          </Form.Item>
          <Form.Item
            name={"lastName"}
            label={t("lastName")}
            className="basis-1/2"
            rules={[{ required: true }]}
          >
            <FormInput size="large" />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            name={"email"}
            label={t("email")}
            className="basis-1/2"
            rules={[{ required: true }]}
          >
            <FormInput size="large" />
          </Form.Item>
          <Form.Item
            name={"phoneNumber"}
            label={t("phone")}
            className="basis-1/2"
            value=""
            normalize={(value) => {
              if (!value.valid()) return null;
              return `+${value.countryCode}${value.areaCode}${value.phoneNumber}`;
            }}
          >
            <PhoneInput size="large" />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            name={"nationalityCode"}
            label={t("country")}
            className="basis-1/2"
            initialValue={"SA"}
            rules={[{ required: true }]}
          >
            <CountrySelector size="large" />
          </Form.Item>
          <Form.Item
            name={"gender"}
            label={t("guestSex")}
            className="basis-1/2"
            rules={[{ required: true }]}
          >
            <FormSelect
              size="large"
              options={[
                { label: t("male"), value: 0 },
                { label: t("female"), value: 1 },
              ]}
            />
          </Form.Item>
        </div>
        <FormButton
          loading={loading}
          htmlType="submit"
          className={"w-full"}
          type="primary"
        >
          {t("saveAndSubmit")}
        </FormButton>
      </Form>
    </CustomCard>
  );
}
