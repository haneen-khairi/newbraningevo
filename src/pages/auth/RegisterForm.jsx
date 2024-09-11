import { Flex, Typography, Divider, Form, Checkbox, Button } from "antd";
import { useTranslation } from "react-i18next";
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import CustomButton from "../../components/Button.jsx";
import CustomTypograhy from "../../components/Typography.jsx";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField.jsx";
//hooks
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
//toast
import { register } from "../../services/auth.js";
import useResultModal from "../../hooks/useResultModal.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import getUserHome from "../../utils/getUserHome.js";

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const globalModal = useResultModal();
  const [viewPassword, setViewPassword] = useState(false); // [error, setError
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false); // [error, setError

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      let result = await register(values);
      globalModal.success({
        title: t("registerSuccess"),
        subtitle: result.data.user.isActive ? "" : t("waitAdmin"),
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      globalModal.error(
        t("registerError"),
        t("registerErrorDesc"),
        err.response.data.errors.map((e) => <p>{e}</p>)
      );
    }
    setIsLoading(false);
  };

  return (
    <Flex vertical gap={"large"} style={{ width: "80%" }} className="relative">
      <div id="login-header">
        <Typography
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {t("welcomeNew")}
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            color: "#828282",
          }}
        >
          {t("registerToContinue")}
        </Typography>
      </div>
      <Flex id="login-form" vertical gap={"large"}>
        <Form name="login" onFinish={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Flex gap="small" vertical>
              <CustomTypograhy variant={"primary"} isBold={true}>
                {t("firstName")}
              </CustomTypograhy>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: t("missingFirstName") }]}
              >
                <InputField
                  size="large"
                  type="text"
                  style={{ height: "59px" }}
                ></InputField>
              </Form.Item>
            </Flex>
            <Flex gap="small" vertical>
              <CustomTypograhy variant={"primary"} isBold={true}>
                {t("lastName")}
              </CustomTypograhy>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: t("missingLastName") }]}
              >
                <InputField
                  size="large"
                  type="text"
                  style={{ height: "59px" }}
                ></InputField>
              </Form.Item>
            </Flex>
          </div>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("username")}
            </CustomTypograhy>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: t("noUsernameError") }]}
            >
              <InputField
                size="large"
                type="text"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiUser color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("emailAddress")}
            </CustomTypograhy>
            <Form.Item
              name="email"
              rules={[{ required: true, message: t("noEmailError") }]}
            >
              <InputField
                size="large"
                type="text"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiMail color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          {/* TODO: confirm Paswsord */}
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("password")}
            </CustomTypograhy>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: t("noPasswordError") },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  message: t("passwordValidation"),
                },
              ]}
            >
              <InputField
                type={viewPassword ? "text" : "password"}
                size="large"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiLock color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
                suffix={
                  <Button
                    shape="circle"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"} isBold={true}>
              {t("confirmPassword")}
            </CustomTypograhy>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: t("noPasswordError") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("passwordsDoNotMatch")));
                  },
                }),
              ]}
            >
              <InputField
                type={viewConfirmPassword ? "text" : "password"}
                size="small"
                style={{ height: "59px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiLock color="#38ACB1" size={"1.5rem"} />
                    <Divider type="vertical" style={{ height: "30px" }} />
                  </div>
                }
                suffix={
                  <Button
                    shape="circle"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                  >
                    {viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Form.Item>
            <CustomButton
              style={{
                width: "100%",
                minHeight: "59px",
                fontSize: "20px",
              }}
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {t("register")}
            </CustomButton>
          </Form.Item>
          <div className="w-full text-center">
            {t("alreadyHaveAccount?")}{" "}
            <Link to="/auth/login">{t("login")}</Link>
          </div>
        </Form>
      </Flex>
    </Flex>
  );
}
