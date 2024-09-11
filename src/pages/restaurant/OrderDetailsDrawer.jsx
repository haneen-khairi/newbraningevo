import CustomDrawer from "@/components/Drawer";
import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import StatusIndicator from "./StatusIndicator";
import DocumentEditIcon from "@/assets/icons/file-edit.svg?react";
import { IconWithPrimaryText } from "@/components/IconWithPrimary";
import { statuses } from "@/components/restaurant/StatusSelect";
import PlaceholderImage from "@/assets/placeholder.webp";
import dayjs from "dayjs";

export default function OrderDetailsDrawer({ isOpen, onClose, onEditTeaboy }) {
  const { t } = useTranslation();
  return (
    <CustomDrawer
      title={t("orderDetails")}
      open={Boolean(isOpen)}
      onClose={onClose}
      width="30vw"
    >
      <div
        className="p-3 rounded-xl flex flex-col gap-3"
        style={{
          boxShadow: "0px 4px 75px 0px #0000000D",
        }}
      >
        <div className="flex justify-between items-center">
          <Typography className="font-semibold">{t("ordersList")}</Typography>
          <div className="flex items-center gap-2">
            <Typography>#{isOpen?.orderNumber ?? "-"}</Typography>
            <StatusIndicator
              status={t(statuses[isOpen?.status])}
              id={isOpen?.status}
            />
          </div>
        </div>
        <div className="border-t border-slate-100 border-solid" />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_6951)">
                <path
                  d="M21 21.5V24.5H19V21.5C19 19.846 17.654 18.5 16 18.5H11V24.5H9V18.5H8C6.346 18.5 5 19.846 5 21.5V24.5H3V21.5C3 18.743 5.243 16.5 8 16.5H16C18.757 16.5 21 18.743 21 21.5ZM14.5 20.5C13.672 20.5 13 21.172 13 22C13 22.828 13.672 23.5 14.5 23.5C15.328 23.5 16 22.828 16 22C16 21.172 15.328 20.5 14.5 20.5ZM4 3.5C4 1.846 5.346 0.5 7 0.5C7.64 0.5 8.407 0.706 9.095 1.053C9.714 0.833 10.842 0.5 12 0.5C13.158 0.5 14.286 0.833 14.904 1.053C15.592 0.706 16.359 0.5 17 0.5C18.654 0.5 20 1.846 20 3.5C20 4.805 19.163 5.917 17.999 6.329C17.999 6.876 17.999 7.498 17.999 7.499V9.5C17.999 12.814 15.313 15.5 11.999 15.5C8.685 15.5 5.999 12.814 5.999 9.5V7.499C5.999 7.499 5.999 6.876 6 6.329C4.835 5.917 4 4.805 4 3.5ZM16 8.5H8V9.5C8 10.625 8.478 11.703 9.31 12.461C10.153 13.229 11.249 13.589 12.396 13.482C14.417 13.289 16 11.446 16 9.286V8.501V8.5ZM6 3.5C6 4.052 6.449 4.5 7 4.5H7.415L7.708 4.793C7.956 5.041 7.996 5.082 8 6.5H16C16.004 5.082 16.045 5.041 16.292 4.793L16.585 4.5H17C17.552 4.5 18 4.052 18 3.5C18 2.948 17.552 2.5 17 2.5C16.655 2.5 16.037 2.672 15.521 3L15.072 3.286L14.582 3.071C14.568 3.065 13.261 2.5 12 2.5C10.739 2.5 9.431 3.065 9.418 3.071L8.93 3.285L8.479 3C7.963 2.672 7.344 2.5 7 2.5C6.449 2.5 6 2.948 6 3.5Z"
                  fill="#38ACB1"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_6951">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <Typography>{isOpen.waiter?.name ?? "-"}</Typography>
          </div>
          <Button
            className="p-2 rounded-xl h-10"
            onClick={(isOpen) => onEditTeaboy(isOpen)}
          >
            <DocumentEditIcon fill="#38ACB1" /> {t("assignNewOfficeBoy")}
          </Button>
        </div>
      </div>
      <OrderHistory order={isOpen?.items} />
      <OrderInfo
        order={{
          name: isOpen?.requester?.name ?? "-",
          createdAt: dayjs(isOpen?.createdAt),
          orderPlace: (
            <p>
              {isOpen?.floor?.building?.name}, {isOpen?.floor?.name},{" "}
              {isOpen?.room?.direction == 1 ? t("left") : t("right")} ,{" "}
              {isOpen?.room?.name}
            </p>
          ),
          estimatedDelivery: isOpen?.estimatedTime ?? "-",
        }}
      />
    </CustomDrawer>
  );
}

export function OrderHistory({ order }) {
  return (
    <div className="flex flex-col gap-3 p-2 rounded-xl border border-solid border-[#EFEFEF] my-3 bg-white">
      {order?.map((item, index) => {
        return (
          <>
            <OrderHistoryItem order={item} key={index} />
            {index < order.length - 1 && (
              <div className="border-t border-slate-100 border-solid" />
            )}
          </>
        );
      })}
    </div>
  );
}
export function OrderHistoryItem({ order }) {
  const { t } = useTranslation();
  if (!order.item) return null;
  return (
    <div className="flex gap-4 items-center">
      <div className="relative">
        <img
          className="rounded-xl"
          src={order.item?.image ?? PlaceholderImage}
          width={64}
          height={64}
          alt="order-image"
        />
        {order.count > 0 && (
          <div className="rounded-full w-6 h-6 flex items-center justify-center bg-[#FFF5E8] absolute top-0">
            {order.count}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="font-su">{order.item.name}</Typography>
        {order?.type && order?.type == "Reheat" ? null : (
          <Typography className="text-xs text-[#767676] font-su">
            {t("hasSugar")}: {order?.sugarSpoons ?? "0"}
          </Typography>
        )}
        <Typography className="text-xs text-[#767676] font-su">
          {order.instructions ?? t("noNotes")}
        </Typography>
      </div>
    </div>
  );
}

export function OrderInfo({ order, hasEstimateTime = true }) {
  const { t } = useTranslation();
  let estimateTime = order.estimatedDelivery;
  if (hasEstimateTime && estimateTime && order.createdAt) {
    let parsedEstimateTime = dayjs(order.estimatedDelivery, "HH:mm:ss");
    estimateTime = dayjs(order.createdAt).add(
      parsedEstimateTime.minute(),
      "minute",
    );
  }
  return (
    <div className="flex flex-col p-3 rounded-xl border border-slate-100 border-solid gap-3">
      <IconWithPrimaryText
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_7009)">
              <path
                d="M12 12C13.1867 12 14.3467 11.6481 15.3334 10.9888C16.3201 10.3295 17.0892 9.39246 17.5433 8.2961C17.9974 7.19975 18.1162 5.99335 17.8847 4.82946C17.6532 3.66558 17.0818 2.59648 16.2426 1.75736C15.4035 0.918247 14.3344 0.346802 13.1705 0.115291C12.0067 -0.11622 10.8003 0.00259972 9.7039 0.456726C8.60754 0.910851 7.67047 1.67989 7.01118 2.66658C6.35189 3.65328 6 4.81331 6 6C6.00159 7.59081 6.63424 9.11602 7.75911 10.2409C8.88399 11.3658 10.4092 11.9984 12 12ZM12 2C12.7911 2 13.5645 2.2346 14.2223 2.67412C14.8801 3.11365 15.3928 3.73836 15.6955 4.46927C15.9983 5.20017 16.0775 6.00444 15.9231 6.78036C15.7688 7.55629 15.3878 8.26902 14.8284 8.82843C14.269 9.38784 13.5563 9.7688 12.7804 9.92314C12.0044 10.0775 11.2002 9.99827 10.4693 9.69552C9.73836 9.39277 9.11365 8.88008 8.67412 8.22228C8.2346 7.56449 8 6.79113 8 6C8 4.93914 8.42143 3.92172 9.17157 3.17158C9.92172 2.42143 10.9391 2 12 2Z"
                fill="#767676"
              />
              <path
                d="M12 14C9.61386 14.0026 7.32622 14.9517 5.63896 16.639C3.95171 18.3262 3.00265 20.6139 3 23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24C4.26522 24 4.51957 23.8946 4.70711 23.7071C4.89464 23.5196 5 23.2652 5 23C5 21.1435 5.7375 19.363 7.05025 18.0503C8.36301 16.7375 10.1435 16 12 16C13.8565 16 15.637 16.7375 16.9497 18.0503C18.2625 19.363 19 21.1435 19 23C19 23.2652 19.1054 23.5196 19.2929 23.7071C19.4804 23.8946 19.7348 24 20 24C20.2652 24 20.5196 23.8946 20.7071 23.7071C20.8946 23.5196 21 23.2652 21 23C20.9974 20.6139 20.0483 18.3262 18.361 16.639C16.6738 14.9517 14.3861 14.0026 12 14Z"
                fill="#767676"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_7009">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
        main={t("customer")}
        secondary={order.name}
      />
      {hasEstimateTime && (
        <>
          <div className="border-t border-slate-100 border-solid" />

          <IconWithPrimaryText
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_7026)">
                  <path
                    d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z"
                    fill="#767676"
                  />
                  <path
                    d="M12.0004 6C11.7352 6 11.4809 6.10536 11.2933 6.29289C11.1058 6.48043 11.0004 6.73478 11.0004 7V11.325L7.62943 13.437C7.404 13.5778 7.24374 13.8024 7.18392 14.0614C7.1241 14.3204 7.1696 14.5926 7.31043 14.818C7.45126 15.0434 7.67588 15.2037 7.93487 15.2635C8.19386 15.3233 8.466 15.2778 8.69143 15.137L12.5314 12.737C12.6765 12.6461 12.7958 12.5195 12.878 12.3692C12.9601 12.219 13.0022 12.0502 13.0004 11.879V7C13.0004 6.73478 12.8951 6.48043 12.7075 6.29289C12.52 6.10536 12.2657 6 12.0004 6Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_7026">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
            main={t("estimatedDelivery")}
            secondary={estimateTime ? estimateTime.format("h:mm a") : "-"}
          />
        </>
      )}
      <div className="border-t border-slate-100 border-solid" />
      <IconWithPrimaryText
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_7039)">
              <path
                d="M12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11993 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z"
                fill="#767676"
              />
              <path
                d="M12.0003 24.0001C11.1583 24.0044 10.3274 23.8069 9.57738 23.4241C8.82733 23.0413 8.17991 22.4844 7.68931 21.8C3.87831 16.543 1.94531 12.591 1.94531 10.053C1.94531 7.3863 3.00468 4.82877 4.89035 2.94309C6.77603 1.05741 9.33356 -0.00195312 12.0003 -0.00195312C14.6671 -0.00195312 17.2246 1.05741 19.1103 2.94309C20.9959 4.82877 22.0553 7.3863 22.0553 10.053C22.0553 12.591 20.1223 16.543 16.3113 21.8C15.8207 22.4844 15.1733 23.0413 14.4232 23.4241C13.6732 23.8069 12.8424 24.0044 12.0003 24.0001ZM12.0003 2.18105C9.91273 2.18343 7.91133 3.01377 6.43518 4.48992C4.95904 5.96606 4.12869 7.96746 4.12631 10.055C4.12631 12.065 6.01931 15.782 9.45531 20.521C9.74701 20.9228 10.1297 21.2498 10.572 21.4753C11.0144 21.7008 11.5038 21.8183 12.0003 21.8183C12.4968 21.8183 12.9863 21.7008 13.4286 21.4753C13.8709 21.2498 14.2536 20.9228 14.5453 20.521C17.9813 15.782 19.8743 12.065 19.8743 10.055C19.8719 7.96746 19.0416 5.96606 17.5654 4.48992C16.0893 3.01377 14.0879 2.18343 12.0003 2.18105Z"
                fill="#767676"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_7039">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
        main={t("deliverTo")}
        secondary={order.orderPlace}
      />
    </div>
  );
}
