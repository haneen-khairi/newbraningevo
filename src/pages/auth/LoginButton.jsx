import { useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import { loginByMicrosoftAccount } from "../../services/login.js";
import { login } from "@/slices/AuthSlice.js";
import { useDispatch } from "react-redux";
import useResultModal from "../../hooks/useResultModal.js";
import { useNavigate } from "react-router-dom";
import getUserHome from "../../utils/getUserHome.js";
import { Typography } from "antd";

const LoginButton = ({ t }) => {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    instance
      .loginPopup()
      .then(async (res) => {
        try {
          const result = await loginByMicrosoftAccount(res.accessToken);
          dispatch(login(result.data));
          globalModal.success({
            title: t("loginSuccess"),
            subtitle: t("loginSuccessDesc"),
            closable: false,
          });
          navigate(getUserHome(result.data));
        } catch (err) {
          globalModal.error(
            t("loginError"),
            t("loginErrorDesc"),
            err?.response?.data?.validationErrors?.map((e) => (
              <p>{e.errorMessage}</p>
            ))
          );
          console.log(err);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <button
    disabled={isLoading}
      className={`rounded-lg ${isLoading?"bg-gray-300 cursor-default":"bg-blue-950"} text-base border-0 py-4 text-white flex items-center justify-center cursor-pointer`}
      onClick={handleLogin}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1384_1309)">
          <path d="M10.0264 0.5H0.538086V10.0233H10.0264V0.5Z" fill="white" />
          <path d="M20.4614 0.5H11.0322V10.0233H20.4614V0.5Z" fill="white" />
          <path
            d="M10.0264 10.9766H0.538086V20.4999H10.0264V10.9766Z"
            fill="white"
          />
          <path
            d="M20.4614 10.9766H11.0322V20.4999H20.4614V10.9766Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_1384_1309">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>

      <Typography
        className="mx-2 text-white"
        style={{
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {t("welcomeBack")}
      </Typography>
    </button>
  );
};

export default LoginButton;
