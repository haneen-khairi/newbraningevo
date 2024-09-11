import { useTranslation } from "react-i18next";
import { Form, Radio, Checkbox } from "antd";
import { useState } from "react";
import BgInput from "@/components/forms/FormInput";
import PhoneInput from "@/components/forms/PhoneInput";

export function ByLink() {
  const [inviteBy, setInviteBy] = useState("email"); // ENUM: [email,whats]
  const { t } = useTranslation();
  return (
    <>
      <Form.Item name={"byEmail"} initialValue={inviteBy}>
        <Radio.Group onChange={(e) => setInviteBy(e.target.value)}>
          <Radio value="email">{t("email")}</Radio>
          <Radio value="whats">{t("whatsapp")}</Radio>
        </Radio.Group>
      </Form.Item>

      {inviteBy === "email" && (
        <Form.Item
          label={t("pleaseEnterEmail")}
          name="email"
          rules={[
            {
              required: true,
            },
            {
              validator: (rule, value) => {
                if (
                  !value.match(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                  )
                ) {
                  return Promise.reject(t("invalidEmail"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <BgInput size="large" />
        </Form.Item>
      )}
      {inviteBy === "whats" && (
        <Form.Item
          label={t("pleaseEnterNumber")}
          name="phoneNumber"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <PhoneInput size="large" />
        </Form.Item>
      )}
      <Form.Item name={"isAllowGuestVehicle"} valuePropName="checked">
        <Checkbox>{t("allowCar")}</Checkbox>
      </Form.Item>
    </>
  );
}
