import { Button, Checkbox, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeatingForm({
  data: orders,
  onSubmit,
  openAddOffice,
  building,
}) {
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

  const options = orders?.data?.map((el) => {
    return { label: el.orderNumber, value: el.id };
  });

  return (
    <Form
      onFinish={(v) => {
        const values = { reheatingType: "", id:v.id};
        if (foodValue == true && beverageValue == true) {
          values.reheatingType = "FoodAndBeverage";
        } else if (foodValue == true) {
          values.reheatingType = "Food";
        } else if (beverageValue == true) {
          values.reheatingType = "Beverage";
        }
        onSubmit(values);
      }}
      form={form}
      layout="vertical"
      id="heating-form"
    >
      <div className="shadow-sm p-2 rounded-xl">
        <p className="font-semibold">
          {t("selectRequest")}{" "}
          <span className="font-light mx-1 text-gray-500">
            {t("chooseType")}
          </span>
        </p>

        <div className="grid grid-cols-2 gap-4 mt-2 w-full">
          <Form.Item
            onClick={() => changeFoodBox(!foodValue)}
            className={`m-0 p-1 border-[1px] ${
              foodValue ? "border-[#38ACB1]" : "border-gray-300"
            } rounded-xl border-solid cursor-pointer `}
            name="food"
          >
            <Checkbox
              onChange={(value) => setFoodValue(value)}
              checked={foodValue}
              className="px-2 pt-1"
            ></Checkbox>

            <div className="w-[100%] flex flex-col text-[#38ACB1] items-center justify-center pt-5 pb-10">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1091_4831)">
                  <path
                    d="M24.7501 14.006C24.7489 13.5866 24.6592 13.1722 24.4869 12.7898C24.3146 12.4074 24.0635 12.0657 23.7501 11.787V10C23.7472 7.34873 22.6927 4.80688 20.8179 2.93215C18.9432 1.05742 16.4014 0.0029116 13.7501 0L11.7501 0C9.09881 0.0029116 6.55697 1.05742 4.68223 2.93215C2.8075 4.80688 1.753 7.34873 1.75009 10V11.837C1.43935 12.1302 1.19179 12.4839 1.02259 12.8762C0.85339 13.2685 0.766113 13.6912 0.766113 14.1185C0.766113 14.5458 0.85339 14.9685 1.02259 15.3608C1.19179 15.7531 1.43935 16.1068 1.75009 16.4V17C1.7522 18.8559 2.49038 20.6351 3.80268 21.9474C5.11497 23.2597 6.89422 23.9979 8.75009 24H16.7501C18.606 23.9979 20.3852 23.2597 21.6975 21.9474C23.0098 20.6351 23.748 18.8559 23.7501 17V16.226C24.0636 15.9472 24.3148 15.6053 24.4871 15.2228C24.6594 14.8402 24.749 14.4256 24.7501 14.006ZM3.56209 15.158C3.31274 15.0824 3.09835 14.9207 2.95709 14.7017C2.81583 14.4828 2.75687 14.2208 2.79073 13.9624C2.82458 13.7041 2.94905 13.4661 3.14195 13.291C3.33486 13.1158 3.58367 13.0148 3.84409 13.006H21.7501C22.0153 13.006 22.2697 13.1114 22.4572 13.2989C22.6447 13.4864 22.7501 13.7408 22.7501 14.006C22.7501 14.2712 22.6447 14.5256 22.4572 14.7131C22.2697 14.9006 22.0153 15.006 21.7501 15.006H17.7501C15.7941 15.006 13.7711 15.794 11.3861 17.487C10.9059 17.8205 10.3352 17.9993 9.75059 17.9993C9.16594 17.9993 8.59527 17.8205 8.11509 17.487C7.88709 17.325 7.66809 17.156 7.44809 16.987C6.35875 16.0115 5.00802 15.3758 3.56209 15.158ZM3.75009 10C3.75247 7.879 4.59609 5.84555 6.09586 4.34578C7.59564 2.846 9.62909 2.00238 11.7501 2H13.7501C15.8711 2.00238 17.9045 2.846 19.4043 4.34578C20.9041 5.84555 21.7477 7.879 21.7501 10V11.006L3.75009 11.016V10ZM16.7501 22H8.75009C7.46927 21.9966 6.23872 21.5012 5.3128 20.6162C4.38688 19.7313 3.83638 18.5244 3.77509 17.245C4.68275 17.4965 5.52172 17.9501 6.22909 18.572C6.46809 18.757 6.70809 18.941 6.95809 19.118C7.77775 19.6875 8.75198 19.9928 9.75009 19.9928C10.7482 19.9928 11.7224 19.6875 12.5421 19.118C14.0216 17.8985 15.8391 17.1615 17.7501 17.006H21.7501C21.7485 18.331 21.221 19.6013 20.2835 20.5377C19.346 21.474 18.0751 22 16.7501 22ZM9.75009 5C9.75009 4.73478 9.85544 4.48043 10.043 4.29289C10.2305 4.10536 10.4849 4 10.7501 4C11.0153 4 11.2697 4.10536 11.4572 4.29289C11.6447 4.48043 11.7501 4.73478 11.7501 5C11.7501 5.26522 11.6447 5.51957 11.4572 5.70711C11.2697 5.89464 11.0153 6 10.7501 6C10.4849 6 10.2305 5.89464 10.043 5.70711C9.85544 5.51957 9.75009 5.26522 9.75009 5ZM6.75009 8C6.75009 7.73478 6.85544 7.48043 7.04298 7.29289C7.23052 7.10536 7.48487 7 7.75009 7C8.0153 7 8.26966 7.10536 8.45719 7.29289C8.64473 7.48043 8.75009 7.73478 8.75009 8C8.75009 8.26522 8.64473 8.51957 8.45719 8.70711C8.26966 8.89464 8.0153 9 7.75009 9C7.48487 9 7.23052 8.89464 7.04298 8.70711C6.85544 8.51957 6.75009 8.26522 6.75009 8Z"
                    fill="#38ACB1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1091_4831">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.75)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="py-1">{t("food")}</span>
            </div>
          </Form.Item>

          <Form.Item
            onClick={() => changeBeverageBox(!beverageValue)}
            className={`m-0 p-1 border-[1px] ${
              beverageValue ? "border-[#38ACB1]" : "border-gray-300"
            } rounded-xl border-solid cursor-pointer `}
            name="beverage"
          >
            <Checkbox
              onChange={(value) => setBeverageValue(value)}
              checked={beverageValue}
              className="px-2 pt-1"
            ></Checkbox>

            <div className="w-[100%] flex flex-col text-[#38ACB1] items-center justify-center pt-5 pb-10">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1091_4826)">
                  <path
                    d="M19.75 10H19.25V9C19.25 8.20435 18.9339 7.44129 18.3713 6.87868C17.8087 6.31607 17.0456 6 16.25 6H4.25C3.45435 6 2.69129 6.31607 2.12868 6.87868C1.56607 7.44129 1.25 8.20435 1.25 9V19C1.25159 20.3256 1.77888 21.5964 2.71622 22.5338C3.65356 23.4711 4.92441 23.9984 6.25 24H14.25C15.4022 23.9985 16.5187 23.5999 17.4113 22.8713C18.3038 22.1427 18.9179 21.1286 19.15 20C19.6546 20.0709 20.1685 20.0338 20.6578 19.8912C21.147 19.7487 21.6004 19.5039 21.9879 19.173C22.3755 18.8422 22.6884 18.4328 22.906 17.972C23.1235 17.5112 23.2408 17.0095 23.25 16.5V13.5C23.25 12.5717 22.8813 11.6815 22.2249 11.0251C21.5685 10.3687 20.6783 10 19.75 10ZM14.25 22H6.25C5.45435 22 4.69129 21.6839 4.12868 21.1213C3.56607 20.5587 3.25 19.7956 3.25 19V9C3.25 8.73478 3.35536 8.48043 3.54289 8.29289C3.73043 8.10536 3.98478 8 4.25 8H16.25C16.5152 8 16.7696 8.10536 16.9571 8.29289C17.1446 8.48043 17.25 8.73478 17.25 9V19C17.25 19.7956 16.9339 20.5587 16.3713 21.1213C15.8087 21.6839 15.0456 22 14.25 22ZM21.25 16.5C21.2389 16.7386 21.1751 16.9718 21.0633 17.1829C20.9515 17.394 20.7945 17.5778 20.6034 17.7212C20.4123 17.8645 20.1918 17.9638 19.9579 18.012C19.7239 18.0602 19.4822 18.0561 19.25 18V12C19.4822 11.9439 19.7239 11.9398 19.9579 11.988C20.1918 12.0362 20.4123 12.1355 20.6034 12.2788C20.7945 12.4222 20.9515 12.606 21.0633 12.8171C21.1751 13.0282 21.2389 13.2614 21.25 13.5V16.5ZM9.25 3V1C9.25 0.734784 9.35536 0.48043 9.54289 0.292893C9.73043 0.105357 9.98478 0 10.25 0C10.5152 0 10.7696 0.105357 10.9571 0.292893C11.1446 0.48043 11.25 0.734784 11.25 1V3C11.25 3.26522 11.1446 3.51957 10.9571 3.70711C10.7696 3.89464 10.5152 4 10.25 4C9.98478 4 9.73043 3.89464 9.54289 3.70711C9.35536 3.51957 9.25 3.26522 9.25 3ZM13.25 3V1C13.25 0.734784 13.3554 0.48043 13.5429 0.292893C13.7304 0.105357 13.9848 0 14.25 0C14.5152 0 14.7696 0.105357 14.9571 0.292893C15.1446 0.48043 15.25 0.734784 15.25 1V3C15.25 3.26522 15.1446 3.51957 14.9571 3.70711C14.7696 3.89464 14.5152 4 14.25 4C13.9848 4 13.7304 3.89464 13.5429 3.70711C13.3554 3.51957 13.25 3.26522 13.25 3ZM5.25 3V1C5.25 0.734784 5.35536 0.48043 5.54289 0.292893C5.73043 0.105357 5.98478 0 6.25 0C6.51522 0 6.76957 0.105357 6.95711 0.292893C7.14464 0.48043 7.25 0.734784 7.25 1V3C7.25 3.26522 7.14464 3.51957 6.95711 3.70711C6.76957 3.89464 6.51522 4 6.25 4C5.98478 4 5.73043 3.89464 5.54289 3.70711C5.35536 3.51957 5.25 3.26522 5.25 3Z"
                    fill="#38ACB1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1091_4826">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.25)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="py-1">{t("Beverage")}</span>
            </div>
          </Form.Item>
        </div>
      </div>

      <Form.Item className="mt-2" label={t("orderNumber")} name="id">
        <Select placeholder={t("orderNumber")} options={options} />
      </Form.Item>

      <div className="my-10">
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
