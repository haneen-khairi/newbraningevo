import { Modal, Form, Button } from "antd";
import { InputOTP } from "antd-input-otp";
import { t } from "i18next";
import { useEffect } from "react";
import ResendCodeComponent from "./ResendCode";
export default function OTPModal({
  isOpen,
  onClose,
  handleSubmit,
  error,
  isLoading,
}) {
  const [form] = Form.useForm();
  //   useEffect(() => {
  //     isOpen && document.getElementById("OTP")?.setAttribute("dir", "ltr");
  //   }, [isOpen]);

  return (
    <Modal open={isOpen} onCancel={onClose} onOk={handleSubmit} footer={null}>
      <h1 className="text-2xl font-bold text-center ">{t("enterOTP")}</h1>
      <h3 className="text-center mb-4 text-slate-400">
        {t("pleaseEnter6DigitsCode")}
      </h3>
      <Form
        onFinish={(values) => {
          handleSubmit(values, form);
        }}
        form={form}
      >
        <div dir="ltr">
          <Form.Item name={"OTP"}>
            <InputOTP autoFocus={false} />
          </Form.Item>
        </div>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <Form.Item>
          <Button
            type="primary"
            className="w-full"
            size="large"
            htmlType="submit"
            loading={isLoading}
          >
            {t("verify")}
          </Button>
        </Form.Item>
        {/* <ResendCodeComponent /> */}
      </Form>
    </Modal>
  );
}
