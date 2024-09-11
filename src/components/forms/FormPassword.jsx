import FormInput from "./FormInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "antd";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function FormPassword({ ...props }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormInput
      {...props}
      type={showPassword ? "text" : "password"}
      suffix={
        <div
          role="button"
          className="cursor-pointer flex items-center justify-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
        </div>
      }
    />
  );
}
