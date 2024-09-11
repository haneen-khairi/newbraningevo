import Drawer from "@/components/Drawer";
import FormButton from "@/components/forms/FormButton";
import useResultModal from "@/hooks/useResultModal";
import { updateOrder } from "@/services/restaurantOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Steps } from "antd";
import { useTranslation } from "react-i18next";
import Item from "../../../components/user/items";
import dayjs from "dayjs";
import { cancelOrder } from "../../../services/restaurantOrders";
export default function RateOrderDrawer({ isOpen, onClose,refetch }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const globalModal = useResultModal();
  // const client = useQueryClient();
  // const orderHasRating = order?.waiterRate != null && order?.rate != null;
  // const rateOrderMutation = useMutation({
  //   mutationFn: (data) => updateOrder(data),
  //   onSuccess: () => {
  //     onClose();
  //     globalModal.success({
  //       title: t("success"),
  //       subtitle: t("orderUpdatedSuccessfully"),
  //     });
  //     client.invalidateQueries({
  //       queryKey: ["restaurantOrders"],
  //     });
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     globalModal.error(t("error"), t("errorWhileUpdatingOrder"));
  //   },
  // });

  const getSummationDate = (estimatedTime, updatedAt) => {
    const timeParts = estimatedTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    const updatedDate = dayjs(updatedAt);

    const newDate = updatedDate
      .add(hours, "hour")
      .add(minutes, "minute")
      .add(seconds, "second");

    return newDate.format("HH:mm:ss A");
  };

  const customDot = (dot, { status, index }) => {
    let icon;
    if (status === "process") {
      icon = (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11.5"
            cy="12"
            r="11.5"
            fill="url(#paint0_linear_1091_13796)"
          />
          <g clip-path="url(#clip0_1091_13796)">
            <g filter="url(#filter0_f_1091_13796)">
              <path
                d="M3.52327 10.2378C3.57045 7.60608 3.59404 6.2902 3.91269 5.85308C4.23134 5.41596 5.47621 5.01462 7.96595 4.21193L7.96596 4.21193L8.4403 4.059C9.73814 3.64058 10.3871 3.43137 11.0549 3.44335C11.7227 3.45532 12.3637 3.68765 13.6457 4.15233L14.1143 4.32216C16.5736 5.21357 17.8033 5.65928 18.1061 6.10754C18.4089 6.5558 18.3853 7.87168 18.3381 10.5034L18.3149 11.7995C18.2317 16.4399 14.7024 18.6292 12.4963 19.5462C11.8979 19.7949 11.5987 19.9193 10.7598 19.9043C9.92087 19.8892 9.6263 19.7542 9.03716 19.4842C6.86533 18.4887 3.41684 16.1743 3.50003 11.5339L3.52327 10.2378Z"
                fill="#EAB958"
                fill-opacity="0.3"
              />
            </g>
            <g clip-path="url(#clip1_1091_13796)">
              <rect
                x="4.9834"
                y="5.29102"
                width="12.8417"
                height="12.8417"
                rx="6.42083"
                fill="url(#paint1_linear_1091_13796)"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_1091_13796"
              x="-20.5015"
              y="-20.5566"
              width="62.8677"
              height="64.4629"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="12"
                result="effect1_foregroundBlur_1091_13796"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1091_13796"
              x1="12.9375"
              y1="-111.214"
              x2="11.5"
              y2="20.8714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E3A01E" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1091_13796"
              x1="11.4042"
              y1="3.77029"
              x2="11.4042"
              y2="18.7072"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E3A01E" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
            <clipPath id="clip0_1091_13796">
              <rect
                width="18.7286"
                height="18.7286"
                fill="white"
                transform="translate(2.13574 2.63477)"
              />
            </clipPath>
            <clipPath id="clip1_1091_13796">
              <rect
                x="4.9834"
                y="5.29102"
                width="12.8417"
                height="12.8417"
                rx="6.42083"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      );
    } else if (status === "finish") {
      icon = (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1091_14300)">
        <path d="M11.5 0C5.15871 0 0 5.383 0 12C0 18.617 5.15871 24 11.5 24C17.8413 24 23 18.617 23 12C23 5.383 17.8413 0 11.5 0ZM17.4417 10.512L13.2001 14.857C12.4497 15.625 11.4837 16.008 10.5167 16.008C9.56033 16.008 8.60392 15.632 7.85642 14.879L6.03654 13.012C5.65896 12.625 5.65417 11.992 6.02504 11.598C6.39496 11.203 7.0035 11.198 7.38013 11.586L9.19425 13.447C9.93792 14.197 11.1119 14.193 11.8594 13.429L16.1 9.085C16.4766 8.697 17.0813 8.704 17.4551 9.098C17.826 9.492 17.8202 10.125 17.4417 10.512Z" fill="url(#paint0_linear_1091_14300)"/>
        <path d="M17.5674 8.91045C17.95 9.32153 17.944 9.98198 17.5535 10.3858L13.1778 14.9191C12.4037 15.7204 11.4071 16.12 10.4096 16.12C9.42293 16.12 8.43627 15.7277 7.66513 14.9421L5.7877 12.9942C5.39818 12.5904 5.39323 11.9299 5.77584 11.5188C6.15745 11.1067 6.78524 11.1015 7.17378 11.5063L9.04527 13.448C9.81246 14.2305 11.0235 14.2264 11.7947 13.4292L16.1694 8.89689C16.5579 8.49207 17.1818 8.49937 17.5674 8.91045Z" fill="white"/>
        </g>
        <defs>
        <linearGradient id="paint0_linear_1091_14300" x1="11.5" y1="0" x2="11.5" y2="30.01" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2CCBB3"/>
        <stop offset="1" stop-color="#51A79A" stop-opacity="0"/>
        </linearGradient>
        <clipPath id="clip0_1091_14300">
        <rect width="23" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        
      );
    } else {
      icon = (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="23"
            width="22"
            height="22"
            rx="11"
            transform="rotate(-90 0.5 23)"
            stroke="#E9E9E9"
          />
          <rect
            x="4"
            y="19.5"
            width="15"
            height="15"
            rx="7.5"
            transform="rotate(-90 4 19.5)"
            fill="#CBCBCB"
          />
        </svg>
      );
    }
    return icon;
  };

  const mutation = useMutation({
    mutationFn: (values) => cancelOrder(values),
    onSuccess: () => {
      refetch();
      onClose();
      globalModal.success({
        title: t("orderCanceledSuccessfully"),
      });
    },
    onError: (error) => {
      console.error(error);
      globalModal.error({
        title: t("somethingWentWrong"),
        content: t("errorWhileCancelOrder"),
      });
    },
  });

  const handleCancelOrder = () => {
    const canceledOrder = {
      orderId: isOpen?.id,
    };
    console.log(canceledOrder);
    
    mutation.mutate(canceledOrder);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={<span className="font-bold">{t("orderDetails")}</span>}
      width={"40%"}
      className="flex flex-col gap-2"
      footer={
        <Button
          className="w-full rounded-xl bg-red-50 text-red-600 font-bold"
          htmlType="submit"
          onClick={()=>handleCancelOrder()}
        >
          {t("cancelOrder")}
        </Button>
      }
    >
      <div>
        {isOpen && (
          <div className="shadow-md rounded-xl p-4 border-t-[.5px] border-solid border-gray-100">
            <p className="flex items-center justify-between ">
              <span className="font-bold">{t("orderList")} </span>
              <span className="text-gray-500">{isOpen?.serialNo}</span>
            </p>
            <p className="flex items-center my-4 py-4 px-2 bg-gray-100 rounded-xl">
              <svg
                width="18"
                height="24"
                viewBox="0 0 18 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 21.5V24.5H16V21.5C16 19.846 14.654 18.5 13 18.5H8V24.5H6V18.5H5C3.346 18.5 2 19.846 2 21.5V24.5H0V21.5C0 18.743 2.243 16.5 5 16.5H13C15.757 16.5 18 18.743 18 21.5ZM11.5 20.5C10.672 20.5 10 21.172 10 22C10 22.828 10.672 23.5 11.5 23.5C12.328 23.5 13 22.828 13 22C13 21.172 12.328 20.5 11.5 20.5ZM1 3.5C1 1.846 2.346 0.5 4 0.5C4.64 0.5 5.407 0.706 6.095 1.053C6.714 0.833 7.842 0.5 9 0.5C10.158 0.5 11.286 0.833 11.904 1.053C12.592 0.706 13.359 0.5 14 0.5C15.654 0.5 17 1.846 17 3.5C17 4.805 16.163 5.917 14.999 6.329C14.999 6.876 14.999 7.498 14.999 7.499V9.5C14.999 12.814 12.313 15.5 8.999 15.5C5.685 15.5 2.999 12.814 2.999 9.5V7.499C2.999 7.499 2.999 6.876 3 6.329C1.835 5.917 1 4.805 1 3.5ZM13 8.5H5V9.5C5 10.625 5.478 11.703 6.31 12.461C7.153 13.229 8.249 13.589 9.396 13.482C11.417 13.289 13 11.446 13 9.286V8.501V8.5ZM3 3.5C3 4.052 3.449 4.5 4 4.5H4.415L4.708 4.793C4.956 5.041 4.996 5.082 5 6.5H13C13.004 5.082 13.045 5.041 13.292 4.793L13.585 4.5H14C14.552 4.5 15 4.052 15 3.5C15 2.948 14.552 2.5 14 2.5C13.655 2.5 13.037 2.672 12.521 3L12.072 3.286L11.582 3.071C11.568 3.065 10.261 2.5 9 2.5C7.739 2.5 6.431 3.065 6.418 3.071L5.93 3.285L5.479 3C4.963 2.672 4.344 2.5 4 2.5C3.449 2.5 3 2.948 3 3.5Z"
                  fill="#38ACB1"
                />
              </svg>
              {isOpen?.waiter ? (
                <span className="mx-2">{isOpen?.waiter?.name}</span>
              ) : (
                <span className="mx-2">{t("providerHasProvided")}</span>
              )}
            </p>

            <p>
              <Steps
                current={isOpen?.status}
                progressDot={customDot}
                items={[
                  {
                    title: t("Pending"),
                  },
                  {
                    title: t("Preparing"),
                  },
                  {
                    title: t("Delivered"),
                  },
                ]}
              />
            </p>
          </div>
        )}

        {isOpen?.items?.length && (
          <div className="border-[.3px] border-solid my-5 p-5 rounded-xl border-gray-300">
            {isOpen?.items?.map((el) => {
              el.item.count = el.count;
              el.item.sugarSpoons = el.sugarSpoons;
              return (
                <Item
                  data={el.item}
                  openEditOrder={() => true}
                  isbutton={false}
                />
              );
            })}
          </div>
        )}

        <div>
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
                <p className="my-2">{t("expectedDate")}</p>
                <span className="text-gray-500">
                  {isOpen.status == 0 ? (
                    <>
                      {getSummationDate(
                        isOpen?.estimatedTime,
                        isOpen?.updatedAt
                      )}
                    </>
                  ) : (
                    t("waitingForAccepting")
                  )}
                </span>
              </div>
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
                <p className="my-2">{t("deliveredTo")}</p>
                <span className="text-gray-500">
                  {isOpen &&
                    `${isOpen.floor.building.nameAr} ، ${isOpen.floor.nameAr} , ${isOpen.room.direction} , ${isOpen.room.nameAr}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

// function RateComponent({ ...rest }) {
//   return (
//     <Rate
//       {...rest}
//       className="text-[#FFC75B]"
//       character={
//         <svg
//           width="47"
//           height="45"
//           viewBox="0 0 47 45"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M21.7139 6.94461L22.6068 7.39499L21.7139 6.94461L17.2683 15.7578L7.36148 17.1659C5.70737 17.401 5.05359 19.4405 6.26275 20.5935L13.4024 27.4013L11.713 37.036C11.4276 38.664 13.1279 39.9159 14.5976 39.16L23.4996 34.582L32.4016 39.16C33.8714 39.9159 35.5717 38.664 35.2862 37.036L33.5969 27.4013L40.7365 20.5935C41.9457 19.4405 41.2919 17.401 39.6378 17.1659L29.731 15.7578L25.2853 6.94461L24.3925 7.39499L25.2853 6.94461C24.546 5.47894 22.4533 5.47895 21.7139 6.94461Z"
//             fill="currentColor"
//             stroke="currentColor"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//           />
//         </svg>
//       }
//     />
//   );
// }

//rate component
{
  /* <div
className="p-3 bg-white rounded-xl flex justify-between"
style={{
  boxShadow: "0px 4px 75px 0px #0000000D",
}}
>
<p>{t("orderDetails")}</p>
<p className="text-[#767676]">#{order?.orderNumber ?? "-"}</p>
</div>
<div className="p-3 rounded-xl border border-slate-100 border-solid my-3 flex flex-col gap-3">
{order?.items?.map((item, index) => (
  <>
    <OrderHistoryItem order={item} />
    {index < order?.items.length - 1 && (
      <div className="border-t border-slate-100 border-solid" />
    )}
  </>
))}
</div>
<Form
className="flex flex-col gap-4 items-center justify-center"
layout="vertical"
id="rate-order"
initialValues={{
  rate: order?.rate,
  rateComment: order?.rateComment,
  waiterRate: order?.waiterRate,
}}
onFinish={(v) =>
  rateOrderMutation.mutate({
    id: order.id,
    rate: v.rate,
    rateComment: v.rateComment,
    waiterRate: v.waiterRate,
  })
}
form={form}
>
<p className="text-xl font-bold text-center">{t("order")}</p>
<Form.Item name="rate">
  <RateComponent disabled={orderHasRating} />
</Form.Item>
<p className="text-xl font-bold text-center">{t("teaBoy")}</p>
<Form.Item name="waiterRate">
  <RateComponent disabled={orderHasRating} />
</Form.Item>
<Form.Item name="rateComment" className="w-full">
  <FormInput.TextArea
    rows={3}
    placeholder={t("writeAnyNotes")}
    readOnly={orderHasRating}
  />
</Form.Item>
</Form> */
}
