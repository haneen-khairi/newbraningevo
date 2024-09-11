import { Button, Checkbox, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Visitor({ openAddOffice, building }) {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [foodValue, setFoodValue] = useState(false);
  const [beverageValue, setBeverageValue] = useState(false);
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const changeFoodBox = (value) => setFoodValue(value);
  const changeBeverageBox = (value) => setBeverageValue(value);

  useEffect(() => {
    form.setFieldsValue(order || []);
  }, [form, order, foodValue]);
  return (
    <Form form={form} layout="vertical" id="visit-form">
      <div>
        <p className="my-2">{t("deliverOrderTo")}</p>

        <div className="border-[.3px] border-solid flex items-center justify-between border-gray-300 rounded-xl p-2 my-1">
          <div className="flex items-center">
            <svg
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="53"
                height="53"
                rx="8"
                transform="matrix(-1 0 0 1 53 0)"
                fill="#F9F9F9"
              />
              <g clip-path="url(#clip0_1091_10976)">
                <path
                  d="M38 26C38 23.794 36.206 22 34 22V20C34 17.243 31.757 15 29 15H25C22.243 15 20 17.243 20 20V22C17.794 22 16 23.794 16 26V31C16 31.017 16 31.035 16.001 31.052C16.029 32.682 17.363 34 19 34H26V37H22C21.448 37 21 37.447 21 38C21 38.553 21.448 39 22 39H32C32.552 39 33 38.553 33 38C33 37.447 32.552 37 32 37H28V34H35C36.637 34 37.971 32.682 37.999 31.052C37.999 31.035 38 31.018 38 31V26ZM36 26V28.172C35.687 28.061 35.351 28 35 28H34V24C35.103 24 36 24.897 36 26ZM22 20C22 18.346 23.346 17 25 17H29C30.654 17 32 18.346 32 20V28H22V20ZM20 24V28H19C18.649 28 18.313 28.061 18 28.172V26C18 24.897 18.897 24 20 24ZM35 32H19C18.449 32 18 31.552 18 31C18 30.448 18.449 30 19 30H35C35.551 30 36 30.448 36 31C36 31.552 35.551 32 35 32Z"
                  fill="#A9A9A9"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_10976">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(15 15)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="data mx-2">
              <p>{t("myOffice")}</p>
              <span className="text-gray-500">
                {building?.floorId ? (
                  <>
                    {i18n.language == "ar"
                      ? building?.buildingId?.split(",")[1]
                      : building?.buildingId?.split(",")[2]}
                    ,
                    {i18n.language == "ar"
                      ? building?.floorId?.split(",")[1]
                      : building?.floorId?.split(",")[2]}
                    ,
                    {i18n.language == "ar"
                      ? building?.sideId?.split(",")[1]
                      : building?.sideId?.split(",")[2]}
                    ,
                    {i18n.language == "ar"
                      ? building?.roomId?.split(",")[1]
                      : building?.roomId?.split(",")[2]}
                  </>
                ) : (
                  t("noData")
                )}
              </span>
            </div>
          </div>
          <div className="btn">
            <Button
              onClick={openAddOffice}
              className="border-none  bg-[#f5f6fa]  text-[#38ACB1]"
            >
              {building?.floorId ? t("edit") : t("add")}
            </Button>
          </div>
        </div>

        <div className="border-[.3px] border-solid flex items-center justify-between border-gray-300 rounded-xl p-2 my-1">
          <div className="flex items-center">
            <svg
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="53"
                height="53"
                rx="8"
                transform="matrix(-1 0 0 1 53 0)"
                fill="#F9F9F9"
              />
              <g clip-path="url(#clip0_1091_10986)">
                <path
                  d="M29.428 23H29.5C31.154 23 32.5 21.654 32.5 20V17C32.5 15.346 31.154 14 29.5 14H23.5C21.846 14 20.5 15.346 20.5 17V20C20.5 21.654 21.846 23 23.5 23H23.702L25.536 24.617C25.826 24.873 26.189 25.001 26.552 25.001C26.91 25.001 27.268 24.875 27.55 24.625L29.428 23.001V23ZM26.551 22.844L24.741 21.25C24.558 21.089 24.323 21 24.08 21H23.5C22.948 21 22.5 20.551 22.5 20V17C22.5 16.449 22.948 16 23.5 16H29.5C30.052 16 30.5 16.449 30.5 17V20C30.5 20.551 30.052 21 29.5 21H29.056C28.816 21 28.583 21.086 28.402 21.244L26.551 22.845V22.844ZM20 32C21.93 32 23.5 30.43 23.5 28.5C23.5 26.57 21.93 25 20 25C18.07 25 16.5 26.57 16.5 28.5C16.5 30.43 18.07 32 20 32ZM20 27C20.827 27 21.5 27.673 21.5 28.5C21.5 29.327 20.827 30 20 30C19.173 30 18.5 29.327 18.5 28.5C18.5 27.673 19.173 27 20 27ZM29.5 28.5C29.5 30.43 31.07 32 33 32C34.93 32 36.5 30.43 36.5 28.5C36.5 26.57 34.93 25 33 25C31.07 25 29.5 26.57 29.5 28.5ZM33 27C33.827 27 34.5 27.673 34.5 28.5C34.5 29.327 33.827 30 33 30C32.173 30 31.5 29.327 31.5 28.5C31.5 27.673 32.173 27 33 27ZM25.437 36.649C25.63 37.166 25.369 37.743 24.852 37.937C24.736 37.98 24.618 38.001 24.5 38.001C24.096 38.001 23.714 37.753 23.563 37.352C23.036 35.946 21.604 35.001 20 35.001C18.396 35.001 16.964 35.946 16.437 37.352C16.243 37.87 15.666 38.128 15.149 37.937C14.632 37.743 14.371 37.166 14.564 36.649C15.382 34.466 17.567 33 20.001 33C22.435 33 24.618 34.466 25.437 36.649ZM37.852 37.937C37.736 37.98 37.618 38.001 37.5 38.001C37.096 38.001 36.714 37.753 36.563 37.352C36.036 35.946 34.604 35.001 33 35.001C31.396 35.001 29.964 35.946 29.437 37.352C29.243 37.87 28.666 38.128 28.149 37.937C27.632 37.743 27.371 37.166 27.564 36.649C28.382 34.466 30.567 33 33.001 33C35.435 33 37.619 34.466 38.438 36.649C38.631 37.166 38.37 37.743 37.853 37.937H37.852Z"
                  fill="#A9A9A9"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_10986">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(14.5 14)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="data mx-2">
              <p>{t("myRoom")}</p>
              <span className="text-gray-500">
                {building?.floorId ? t("displayedRoom") : t("noData")}
              </span>
            </div>
          </div>
          <div className="btn">
            <Button
              disabled={true}
              className="border-none  bg-[#f5f6fa]  text-[#38ACB1]"
            >
              {building?.floorId ? t("edit") : t("add")}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
