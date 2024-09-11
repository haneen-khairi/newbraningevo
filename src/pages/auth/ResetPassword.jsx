import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Input, Form, Flex, Typography } from "antd";
import FormButton from "@/components/forms/FormButton.jsx";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/auth.js";
import useResultModal from "@/hooks/useResultModal.js";
export default function ResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const [form] = Form.useForm();
  const resetPasswordMutation = useMutation({
    mutationFn: (values) => {
      return resetPassword({ email, otp: token, password: values.password });
    },
    mutationKey: "resetPassword",
    onError: (error) => {
      console.log(error);
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        error.response.data?.errors.map((error) => <div>{error}</div>)
      );
    },
    onSuccess: (res) => {
      globalModal.success({
        title: t("passwordChanged"),
        subtitle: t("passwordChangedSuccessfully"),
      });
      setTimeout(() => navigate("/auth/login"), 2000);
    },
  });
  useEffect(() => {
    if (!searchParams.has("token") || !searchParams.has("email")) {
      navigate("/auth/forgot-password");
    }
  }, []);
  function handleResetPassword(values) {
    resetPasswordMutation.mutate(values);
  }
  return (
    <Flex vertical gap={12} className="w-10/12">
      <Typography
        style={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        {t("createNewPassword")}
      </Typography>
      <Form onFinish={handleResetPassword} form={form}>
        <Flex gap={"small"} vertical>
          <Typography>{t("password")}</Typography>
          <Form.Item
            name={"password"}
            rules={[
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                message: t("passwordValidation"),
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
        </Flex>
        <Flex vertical gap={"small"}>
          <Typography>{t("confirmPassword")}</Typography>
          <Form.Item
            name={"confirmPassword"}
            dependencies={["password"]}
            rules={[
              {
                validator: (rule, value) => {
                  if (value !== form.getFieldValue("password")) {
                    return Promise.reject(t("passwordsDoNotMatch"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
        </Flex>
        <div className="grid place-items-center">
          <FormButton htmlType="submit" type="primary" className="w-full">
            {t("resetPassword")}
          </FormButton>
        </div>
      </Form>
    </Flex>
  );
}
