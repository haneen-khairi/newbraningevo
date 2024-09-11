import { Flex, Typography, Divider, Form, Checkbox, Button } from "antd";
import { useTranslation } from "react-i18next";
import { CiMail, CiLock } from "react-icons/ci";
import CustomButton from "../../components/Button.jsx";
import CustomTypograhy from "../../components/Typography.jsx";
import { Link, useLocation } from "react-router-dom";
import InputField from "../../components/InputField.jsx";
//hooks
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
//toast
import loginFunction from "@/services/login.js";
import useResultModal from "../../hooks/useResultModal.js";
import OTPModal from "./OTPModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "@/slices/AuthSlice.js";
import getUserHome from "../../utils/getUserHome.js";
import { loginOTP } from "../../services/auth.js";
import LoginButton from "./LoginButton.jsx";
import axios from "axios";
import { setIsSamlLoading } from "../../slices/samlLoading.js";

export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const globalModal = useResultModal();
  const [needsOTP, setNeedsOTP] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [samlLogin, setsamlLogin] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      let result = await loginFunction({ ...values });
      if (result.message && result.message.toLowerCase().includes("otp"))
        setNeedsOTP(true);
      else {
        dispatch(login(result.data));
        globalModal.success({
          title: t("loginSuccess"),
          subtitle: t("loginSuccessDesc"),
          closable: false,
        });
        let from = searchParams.get("from");
        if (from) {
          navigate(from);
        } else {
          navigate(getUserHome(result.data));
        }
      }
      setData(values);
      //Todo OTP
      //if otp do the OTP Flow else login normally
    } catch (err) {
      globalModal.error(
        t("loginError"),
        t("loginErrorDesc"),
        err?.response?.data?.validationErrors?.map((e) => (
          <p>{e.errorMessage}</p>
        ))
      );
    }
    setIsLoading(false);
  };
  const samlDispatch =useDispatch();
  const getUser = () => {
    const extractedToken = location.href?.split("token=")[1];

    if (extractedToken) {
      samlDispatch(setIsSamlLoading(true))
      return axios
        .get(
          import.meta.env.VITE_GET_TOKEN,
          {
            headers: { Authorization: `Bearer ${extractedToken}` },
          }
        )
        .then((res) => {
          dispatch(login(res.data.data));
          globalModal.success({
            title: t("loginSuccess"),
            subtitle: t("loginSuccessDesc"),
            closable: false,
          });
          navigate(getUserHome(res.data));
        })
        .catch((err) => {
          globalModal.error(
            t("loginError"),
            t("loginErrorDesc"),
            err?.response?.data?.validationErrors?.map((e) => (
              <p>{e.errorMessage}</p>
            ))
          );
        }).finally(samlDispatch(setIsSamlLoading(false)))
    }else if(samlLogin){
      return (window.location.href = import.meta.env.VITE_SAML_WEB);
    }
  };

  useEffect(() => {
    getUser();
    samlDispatch(setIsSamlLoading(false))
    if (location.href?.split("token=")[1]) {
      samlDispatch(setIsSamlLoading(true))
    }
  }, [samlLogin]);

  return (
    <Flex vertical gap={"large"} style={{ width: "80%" }} className="relative">
      <div id="login-header">
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          <span className="ml-1">{t("welcomeBback")}</span>
          <svg
            width="18"
            height="20"
            viewBox="0 0 19 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1384_1340"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="19"
              height="22"
            >
              <path
                d="M19.0004 0.787109H0.0556641V21.5003H19.0004V0.787109Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_1384_1340)">
              <path
                d="M18.4001 4.57911C17.374 4.03738 16.032 5.06506 15.7478 7.59844C15.5742 9.0882 15.5584 9.68571 14.9585 10.2513L9.6224 2.81847C9.40213 2.52191 9.07552 2.32419 8.71259 2.26761C8.34965 2.21102 7.97921 2.30007 7.68054 2.51574C7.43167 2.69877 7.25008 2.96007 7.16435 3.25857C7.07863 3.55707 7.09359 3.87585 7.2069 4.16483L6.71749 3.47971C6.60824 3.32422 6.4697 3.19197 6.30976 3.09057C6.14981 2.98918 5.97165 2.92065 5.78542 2.88883C5.5992 2.85701 5.40857 2.86256 5.22448 2.90517C5.04038 2.94778 4.8664 3.02662 4.71253 3.13716C4.40256 3.36264 4.1931 3.7023 4.12956 4.08256C4.06603 4.46282 4.15354 4.85303 4.37311 5.16863L4.82305 5.80595C4.57802 5.55032 4.25529 5.38479 3.90625 5.33571C3.55721 5.28662 3.20194 5.35678 2.897 5.53507C2.58881 5.7603 2.38112 6.09916 2.31904 6.47804C2.25697 6.85692 2.34553 7.24525 2.56548 7.55862L3.48112 8.85718C3.27794 8.5809 2.975 8.39664 2.63804 8.34444C2.30108 8.29223 1.95728 8.37627 1.68135 8.57832C1.39903 8.78562 1.20975 9.09749 1.15499 9.44549C1.10024 9.79348 1.18449 10.1492 1.38929 10.4346L3.20486 12.9759C4.29418 14.4896 5.34667 16.0218 6.36232 17.5727C7.18892 18.917 8.28942 20.0684 9.59079 20.9505C12.8903 22.9023 19.1184 19.0704 18.2738 12.6493C17.8081 8.95279 19.5052 5.20847 18.4001 4.57911Z"
                fill="url(#paint0_linear_1384_1340)"
              />
              <path
                d="M5.62068 18.3134C5.45567 18.3052 5.2918 18.2811 5.13128 18.2417C4.95762 18.1939 4.81552 18.1779 4.67344 18.1301C4.35891 18.0338 4.05683 17.9001 3.77355 17.7318C3.17971 17.42 2.66614 16.9726 2.27374 16.4253C1.87206 15.8943 1.60147 15.2744 1.48437 14.6169C1.42085 14.2942 1.38913 13.966 1.38965 13.637C1.38965 13.4697 1.38965 13.3263 1.38965 13.159C1.38965 12.9917 1.45283 12.8403 1.46072 12.665L1.55544 13.1351C1.58464 13.2933 1.62959 13.4481 1.68962 13.5972C1.76532 13.8874 1.86029 14.1722 1.97383 14.4496C2.17498 15.0006 2.4599 15.5167 2.8184 15.9792C3.18164 16.456 3.60339 16.8842 4.07351 17.2538C4.30243 17.4291 4.56292 17.6044 4.86288 17.7717C4.99307 17.8671 5.1303 17.9523 5.27336 18.0266L5.65224 18.3214"
                fill="#F7931E"
              />
              <path
                d="M3.89183 19.0619C3.76101 19.0819 3.62796 19.0819 3.49714 19.0619C3.3713 19.0772 3.24406 19.0772 3.11822 19.0619C2.84899 19.0411 2.58361 18.9848 2.32885 18.8945C1.83434 18.725 1.38008 18.4538 0.994825 18.0979C0.598823 17.748 0.308785 17.2924 0.158101 16.7834C0.0698554 16.5415 0.00896728 16.2903 -0.0234375 16.0346C-0.0234375 15.931 -0.0234375 15.7876 -0.0234375 15.6521C-0.0234375 15.5167 -0.0234317 15.445 0.0318238 15.3096C0.102867 15.437 0.142344 15.5486 0.189706 15.6362C0.237068 15.7239 0.300227 15.8752 0.347589 15.9628C0.394951 16.0505 0.560704 16.3532 0.679108 16.5364C0.914154 16.9177 1.19816 17.266 1.52373 17.5721C1.84744 17.8712 2.19899 18.138 2.57355 18.3688C2.75511 18.4883 2.96825 18.5839 3.18138 18.7113C3.26821 18.7671 3.40241 18.8069 3.48924 18.8627C3.57607 18.9185 3.74183 18.9679 3.87199 18.9875L3.89183 19.0619Z"
                fill="#F7931E"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1384_1340"
                x1="17.9393"
                y1="11.0113"
                x2="0.0556641"
                y2="11.0113"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F7931E" />
                <stop offset="1" stopColor="#F7931E" />
              </linearGradient>
            </defs>
          </svg>
        </Typography>
      </div>

      <Flex id="login-form" vertical gap={"large"}>
        <Form name="login" onFinish={handleLogin}>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"}>
              {t("emailAddress")}
            </CustomTypograhy>
            <Form.Item
              name="email"
              rules={[{ required: true, message: t("noEmailError") }]}
            >
              <InputField
                type="text"
                style={{ height: "56px", padding: "0 15px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6394 16.1104H3.14374C1.84063 16.1104 0.783203 15.0529 0.783203 13.7498V3.25022C0.783203 1.94711 1.84063 0.889648 3.14374 0.889648H16.6394C17.9425 0.889648 19 1.94711 19 3.25022V13.7498C19 15.0529 17.9425 16.1104 16.6394 16.1104ZM3.14374 2.61468C2.79126 2.61468 2.50286 2.90308 2.50286 3.25556V13.7552C2.50286 14.1076 2.79126 14.396 3.14374 14.396H16.6394C16.9919 14.396 17.2803 14.1076 17.2803 13.7552V3.25556C17.2803 2.90308 16.9919 2.61468 16.6394 2.61468H3.14374Z"
                        fill="#BDBDBD"
                      />
                      <path
                        d="M9.88899 10.3151L1.13574 3.94912L2.14512 2.56055L9.88899 8.18956L17.6329 2.56055L18.6422 3.94912L9.88899 10.3151Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </div>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex gap="small" vertical>
            <CustomTypograhy variant={"primary"}>
              {t("password")}
            </CustomTypograhy>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("noPasswordError") }]}
            >
              <InputField
                type={viewPassword ? "text" : "password"}
                style={{ height: "56px", padding: "0 15px" }}
                prefix={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width="16"
                      height="19"
                      viewBox="0 0 16 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1286 18.8771H2.62137C1.59188 18.8771 0.75 18.0545 0.75 17.0442V8.31278C0.75 7.26405 1.57264 6.44141 2.62137 6.44141H14.1286C15.1774 6.44141 16 7.26405 16 8.31278V17.0442C16 18.0545 15.1629 18.8771 14.1286 18.8771ZM2.62137 8.17327C2.53478 8.17327 2.48185 8.231 2.48185 8.31278V17.0442C2.48185 17.0827 2.52997 17.1452 2.62137 17.1452H14.1286C14.2152 17.1452 14.2681 17.0875 14.2681 17.0442V8.31278C14.2681 8.22619 14.2104 8.17327 14.1286 8.17327H2.62137Z"
                        fill="#BDBDBD"
                      />
                      <path
                        d="M12.5996 8.17235C12.1233 8.17235 11.7336 7.7875 11.7336 7.30643V2.7603C11.7336 2.26961 11.32 1.85588 10.8293 1.85588H5.91751C5.42682 1.85588 5.0131 2.26961 5.0131 2.7603V7.30643C5.0131 7.78269 4.62827 8.17235 4.1472 8.17235C3.66613 8.17235 3.28125 7.7875 3.28125 7.30643V2.7603C3.28125 1.30746 4.46468 0.124023 5.91751 0.124023H10.8293C12.2821 0.124023 13.4656 1.30746 13.4656 2.7603V7.30643C13.4656 7.78269 13.0807 8.17235 12.5996 8.17235Z"
                        fill="#BDBDBD"
                      />
                      <path
                        d="M8.37566 14.4133C7.8994 14.4133 7.50977 14.0285 7.50977 13.5474V11.7771C7.50977 11.3008 7.89459 10.9111 8.37566 10.9111C8.85673 10.9111 9.24161 11.296 9.24161 11.7771V13.5474C9.24161 14.0237 8.85673 14.4133 8.37566 14.4133Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </div>
                }
                suffix={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    <g clip-path="url(#clip0_1123_919)">
                      <path
                        d="M19.3923 8.34956C18.0998 6.24456 15.1598 2.71289 9.9998 2.71289C4.8398 2.71289 1.8998 6.24456 0.607299 8.34956C0.207739 8.99581 -0.00390625 9.74059 -0.00390625 10.5004C-0.00390625 11.2602 0.207739 12.005 0.607299 12.6512C1.8998 14.7562 4.8398 18.2879 9.9998 18.2879C15.1598 18.2879 18.0998 14.7562 19.3923 12.6512C19.7919 12.005 20.0035 11.2602 20.0035 10.5004C20.0035 9.74059 19.7919 8.99581 19.3923 8.34956ZM17.9715 11.7787C16.8615 13.5837 14.349 16.6212 9.9998 16.6212C5.65063 16.6212 3.13813 13.5837 2.02813 11.7787C1.79074 11.3946 1.66501 10.952 1.66501 10.5004C1.66501 10.0488 1.79074 9.60619 2.02813 9.22206C3.13813 7.41706 5.65063 4.37956 9.9998 4.37956C14.349 4.37956 16.8615 7.41372 17.9715 9.22206C18.2089 9.60619 18.3346 10.0488 18.3346 10.5004C18.3346 10.952 18.2089 11.3946 17.9715 11.7787Z"
                        fill="#38ACB1"
                      />
                      <path
                        d="M9.99968 6.33301C9.17559 6.33301 8.37001 6.57738 7.6848 7.03522C6.9996 7.49306 6.46554 8.1438 6.15018 8.90516C5.83481 9.66652 5.7523 10.5043 5.91307 11.3126C6.07384 12.1208 6.47068 12.8632 7.0534 13.446C7.63612 14.0287 8.37855 14.4255 9.1868 14.5863C9.99505 14.7471 10.8328 14.6645 11.5942 14.3492C12.3555 14.0338 13.0063 13.4998 13.4641 12.8146C13.922 12.1293 14.1663 11.3238 14.1663 10.4997C14.165 9.39501 13.7256 8.33597 12.9445 7.55486C12.1634 6.77374 11.1043 6.33433 9.99968 6.33301ZM9.99968 12.9997C9.50522 12.9997 9.02187 12.8531 8.61075 12.5783C8.19963 12.3036 7.8792 11.9132 7.68998 11.4564C7.50076 10.9996 7.45125 10.4969 7.54771 10.0119C7.64418 9.527 7.88228 9.08154 8.23191 8.73191C8.58154 8.38228 9.027 8.14417 9.51195 8.04771C9.9969 7.95125 10.4996 8.00076 10.9564 8.18998C11.4132 8.37919 11.8036 8.69963 12.0784 9.11075C12.3531 9.52187 12.4997 10.0052 12.4997 10.4997C12.4997 11.1627 12.2363 11.7986 11.7674 12.2674C11.2986 12.7363 10.6627 12.9997 9.99968 12.9997Z"
                        fill="#38ACB1"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1123_919">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              ></InputField>
            </Form.Item>
          </Flex>
          <Flex justify="space-between" className={"items-center"}>
            <Form.Item name={"rememberMe"} valuePropName="checked">
              <Checkbox id={"rememberMe"} className={"flex items-center"}>
                <CustomTypograhy variant={"primary"}>
                  {t("rememberMe")}
                </CustomTypograhy>
              </Checkbox>
            </Form.Item>
            <Form.Item name={"rememberMe"} valuePropName="checked">
              <Link to="/auth/forgot-password">
                <CustomTypograhy variant={"primary"}>
                  {t("forgotPassword")}
                </CustomTypograhy>
              </Link>
            </Form.Item>
          </Flex>

          <Form.Item>
            <CustomButton
              style={{
                width: "100%",
                minHeight: "56px",
                fontSize: "20px",
                borderRadius: "16px",
              }}
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {t("login")}
            </CustomButton>
          </Form.Item>

          <div className="w-full text-center">
            {t("dontHaveAccount?")}{" "}
            <Link to="/auth/register">{t("register")}</Link>
          </div>
        </Form>
      </Flex>

      <button
        disabled={isLoading}
        className={`rounded-lg ${
          isLoading ? "bg-gray-300 cursor-default" : "bg-blue-950"
        } text-base border-0 py-4 text-white flex items-center justify-center cursor-pointer`}
        onClick={() => {
          setsamlLogin(true);
          return getUser();
        }}
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

      {/* <LoginButton t={t} /> */}

      {/* <OTPModal
          isOpen={needsOTP}
          onClose={() => {
            setNeedsOTP(false);
          }}
          handleSubmit={handleOTPLogin}
          error={error}
          isLoading={isLoading}
          data={data}
      /> */}
    </Flex>
  );
}

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useResultModal from "../../hooks/useResultModal";
// import { useDispatch } from "react-redux";
// import { loginByMicrosoftAccount } from "../../services/login";
// import { useTranslation } from "react-i18next";
// import { login } from "../../slices/AuthSlice";
// import axios from "axios";
// import Cookies from 'js-cookie';
// import getUserHome from "../../utils/getUserHome";

// const MicrosoftLogin = () => {
//   const dispatch = useDispatch();
//   const globalModal = useResultModal();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { t } = useTranslation();

//   const getUser = () => {
//     const extractedToken = new URLSearchParams(location.search).get("token");

//     if (extractedToken) {
//       return axios
//       .get(
//         "https://stage-sv253n6d4bqc7d.iknology.com:253/gateway/saml/ValidateApi/UsingSamlToken",
//         {
//           headers: { Authorization: `Bearer ${extractedToken}` },
//         }
//       )
//       .then((res) => {
//         dispatch(login(res.data.data));
//         globalModal.success({
//           title: t("loginSuccess"),
//           subtitle: t("loginSuccessDesc"),
//           closable: false,
//         });
//         navigate(getUserHome(res.data));
//       })
//       .catch((err) => {
//         globalModal.error(
//           t("loginError"),
//           t("loginErrorDesc"),
//           err?.response?.data?.validationErrors?.map((e) => (
//             <p>{e.errorMessage}</p>
//           ))
//         );
//         console.log(err);
//       });
//     }
//     return window.location.href="https://takamol.web.iknology.com"
//   };

//   useEffect(() => {

//     getUser();
//   }, []);

//   return( <></>)
// };

// export default MicrosoftLogin;

// const handleOTPLogin = async (values, form) => {
//   setIsLoading(true);
//   let otp = values.OTP.join("");
//   try {
//     let result = await loginOTP(otp, data.email, data.password);
//     dispatch(login(result.data));
//     setNeedsOTP(false);
//     globalModal.success({
//       title: t("loginSuccess"),
//       subtitle: t("loginSuccessDesc"),
//       closable: false,
//     });
//     let from = searchParams.get("from");
//     if (from) {
//       navigate(from);
//     } else {
//       navigate(getUserHome(result.data.user));
//     }
//   } catch (e) {
//     setError(t("wrongOTP"));
//     form.resetFields();
//   }

//   setIsLoading(false);
// };
