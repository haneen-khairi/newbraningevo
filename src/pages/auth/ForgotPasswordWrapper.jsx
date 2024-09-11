import ForgotPasswordEmail from "./ForgotPasswordEmail";
import ForgotPasswordOTP from "./ForgotPasswordOTP";
import { useState } from "react";
export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  if (currentStep == 0) {
    return (
      <ForgotPasswordEmail
        stepController={{
          current: currentStep,
          setCurrent: setCurrentStep,
        }}
        setEmail={setEmail}
      />
    );
  }
  if (currentStep == 1) {
    return (
      <ForgotPasswordOTP
        stepController={{
          current: currentStep,
          setCurrent: setCurrentStep,
        }}
        email={email}
      />
    );
  }
}
