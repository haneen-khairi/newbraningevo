import { Typography, Input, Form, Flex } from "antd";
import { t } from "i18next";
import { InputOTP } from "antd-input-otp";
import styled from "styled-components";
import FormButton from "@/components/forms/FormButton.jsx";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useResultModal from "@/hooks/useResultModal";
import { confirmForgotOTP } from "@/services/auth.js";
import { useState } from "react";
const CustomOTP = styled(InputOTP)`
  & {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #bdbdbd;
    max-width: 90px;
    aspect-ratio: 1/1;
  }
`;
export default function EnterOTP({ stepController, email }) {
  const [code, setCode] = useState("");
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const verifyOTPMutation = useMutation({
    mutationFn: (values) => {
      return confirmForgotOTP({ email, otp: values });
    },
    mutationKey: "verifyOTP",
    onError: (error) => {
      console.log(error);
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        error.response.data?.title
      );
    },
    onSuccess: (res) => {
      navigate("/auth/reset-password?email=" + email + "&token=" + code);
    },
  });
  function handleOTPVerification(values) {
    setCode(values.OTP.join(""));
    verifyOTPMutation.mutate(values.OTP.join(""));
    //   stepController.setCurrent(2);
  }
  return (
    <Flex vertical gap={12} className="w-10/12">
      <div id="otp-header">
        <Typography
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {t("enterOTP")}
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            color: "#828282",
          }}
        >
          {t("pleaseEnterOTP")} <br />
        </Typography>
      </div>
      <div id="main-form">
        <Form onFinish={handleOTPVerification} dir="ltr">
          <Form.Item name={"OTP"}>
            <CustomOTP />
          </Form.Item>
          <div className="grid place-items-center">
            <Form.Item className="w-10/12">
              <FormButton htmlType="submit" type="primary" className="w-full">
                {t("verify")}
              </FormButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Flex>
  );
}
