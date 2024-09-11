import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ResendCodeComponent = () => {
  const time = 60;
  const [timer, setTimer] = useState(time);
  const [isDisabled, setIsDisabled] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    // Your code to resend the verification code goes here
    // For example, you can make an API call to request a new code

    // Disable the button and start the timer
    setIsDisabled(true);
    setTimer(time);
  };

  return (
    <div className="text-center">
      <a onClick={!isDisabled && handleResendCode} disabled={isDisabled}>
        {t("resendCode")} ({timer}s)
      </a>
    </div>
  );
};

export default ResendCodeComponent;
