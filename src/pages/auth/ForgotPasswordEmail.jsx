import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Input, Form, Flex, Divider, Typography } from "antd";
import FormButton from "@/components/forms/FormButton.jsx";
import FormInput from "@/components/forms/FormInput.jsx";
import { t } from "i18next";
import { MdEmail } from "react-icons/md";
import { forgotPassword } from "../../services/auth";
import useResultModal from "../../hooks/useResultModal";
export default function EnterEmail({
  stepController: { current, setCurrent },
  setEmail,
}) {
  const globalModal = useResultModal();
  const forgotPasswordMutation = useMutation({
    mutationFn: (values) => forgotPassword(values),
    mutationKey: "forgotPassword",
    onError: (error) => {
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        error.response.data?.errors.join("\n")
      );
    },
    onSuccess: (res) => {
      setCurrent(1);
    },
  });
  function handleForgotPassword(values) {
    setEmail(values.email);

    forgotPasswordMutation.mutate(values.email);
  }

  return (
    <Flex vertical gap={12} className="w-10/12">
      <div id="forgot-header">
        <Typography
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {t("forgotPassword")}
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            color: "#828282",
          }}
        >
          {t("pleaseEnterRegisteredEmail")}
        </Typography>
      </div>
      <div id="email-input">
        <Form onFinish={handleForgotPassword}>
          <Form.Item
            rules={[{ required: true, message: t("noEmailError") }]}
            name="email"
          >
            <Input
              size="large"
              prefix={<MdEmail color="#38ACB1" size={"1.5rem"} />}
            ></Input>
          </Form.Item>
          <FormButton
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            {t("sendResetLink")}
          </FormButton>
        </Form>
      </div>
    </Flex>
  );
}
