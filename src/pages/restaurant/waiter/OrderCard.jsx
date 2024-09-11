import { useTranslation } from "react-i18next";
import SandClock from "@/assets/icons/sand-clock.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { updateOrder } from "@/services/restaurantOrders";
import { Button } from "antd";
import { orderTypes } from "./OrderTypes";
import clsx from "clsx";
import { reheatTypes } from "./ReheatTypes";

export default function OrderCard({
  order,
  setOrderForDrawer,
  setIsDetailsOpen,
  setIsCartOpen,
}) {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const client = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: (values) => updateOrder(values),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["teaboyOrders"] });
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingOrder"));
    },
  });

  const handleAcceptOrder = () => {
    if (order?.status == 0) {
      if (order?.orderType == 1) {
        setIsCartOpen(true);
        setOrderForDrawer(order);
      } else {
        cancelOrderMutation.mutate({
          id: order?.id,
          status: order?.status == 0 ? "Approved" : "Delivered",
        });
      }
    } else {
      cancelOrderMutation.mutate({
        id: order?.id,
        status: order?.status == 0 ? "Approved" : "Delivered",
      });
    }
  };

  const handleDetailsButton = () => {
    setOrderForDrawer(order);
    setIsDetailsOpen(true);
  };
  const isLate = false;
  return (
    <div className="bg-white p-3 rounded-xl flex flex-col gap-2">
      <div
        className="flex gap-2 items-center justify-center p-2 rounded-xl"
        aria-label="order-card-title"
        style={{
          backgroundColor: "#F8FAFB",
        }}
      >
        <div className="flex items-center justify-center p-2 rounded-lg bg-white">
          {order?.orderType == 0 ? (
            <MenuOrderIcon />
          ) : order?.orderType == 1 ? (
            <GuestOrderIcon />
          ) : (
            <ReheatOrderIcon />
          )}
        </div>

        <div className="grow">
          <p>{t(orderTypes[order?.orderType])}</p>
          <p className={"text-[#767676] mt-2"}>#{order?.orderNumber}</p>
        </div>
        {isLate && (
          <div className="p-2 flex items-center justify-center rounded-lg bg-red-600 text-white">
            {t("late")}
          </div>
        )}
        <div className="flex items-center justify-center w-12 h-12 bg-[#EBEDF5] rounded-full ">
          <SandClock
            style={{
              fill: "#2F307F",
            }}
          />
        </div>
      </div>

      <div className={"grow font-su my-3"}>
        {}
        {orderTypes[order?.orderType] == "Guest" && order?.items?.length <= 0
          ? t("awaitingItems")
          : orderTypes[order?.orderType] == "Reheat"
          ? t(reheatTypes[order?.reheatingType])
          : order?.items && order?.items.length > 0
          ? order?.items.map((item) => item.item.name).join(", ")
          : "-"}
      </div>
      <div className={"border-t-2 border-solid border-[#F2F2F2]"} />
      <div className={"flex flex-col gap-2"}>
        <IconWithText
          icon={<UserIcon />}
          text={`${order?.requester.firstName} ${order?.requester.lastName}`}
        />
        <IconWithText
          icon={<LocationIcon />}
          text={
            <p>
              {order?.floor?.building?.name}, {order?.floor?.name},{" "}
              {order?.room?.direction == 1 ? t("left") : t("right")},{" "}
              {order?.room?.name}
            </p>
          }
        />
        <IconWithText icon={<ClockIcon />} text={"-"} />
      </div>
      <div
        className={clsx({
          "grid gap-3 items-center": true,
          "grid-cols-2": order.status <= 2,
        })}
      >
        {order.status <= 2 && (
          <AcceptButton
            handleAcceptOrder={handleAcceptOrder}
            status={order?.status}
          />
        )}
        <DetailsButton handleDetailsButton={handleDetailsButton} />
      </div>
    </div>
  );
}

function IconWithText({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 p-2 justify-center rounded-full bg-[#F8FAFB] text-[#767676]">
        {icon}
      </div>
      <p className={"font-su text-[#212936]"}>{text}</p>
    </div>
  );
}

export function AcceptButton({ handleAcceptOrder, status }) {
  const { t } = useTranslation();
  return (
    <Button
      className={
        "min-h-input rounded-2xl border-none bg-[#E7FAF7] text-[#03A78E] font-su font-semibold"
      }
      onClick={handleAcceptOrder}
    >
      {status == 0 ? t("acceptOrder") : t("deliverOrder")}
    </Button>
  );
}

function DetailsButton({ handleDetailsButton }) {
  const { t } = useTranslation();
  return (
    <Button
      className={
        "min-h-input rounded-2xl bg-[#F3F5F9] text-[#38ACB1] font-su font-semibold border border-solid border-[#E4E9F3]"
      }
      onClick={handleDetailsButton}
    >
      {t("displayDetails")}
    </Button>
  );
}

function MenuOrderIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.3338 15.9933H21.8484L22.5684 10.2187C22.6942 9.63454 22.6883 9.02973 22.5511 8.44817C22.4139 7.86662 22.1488 7.32294 21.7752 6.85663C21.4016 6.39033 20.9288 6.0131 20.3912 5.75238C19.8536 5.49165 19.2646 5.35397 18.6671 5.34933H15.5084C15.6538 4.32133 15.5658 2.67333 17.0204 2.66667H21.3338C21.6874 2.66667 22.0265 2.52619 22.2766 2.27614C22.5266 2.02609 22.6671 1.68696 22.6671 1.33333C22.6671 0.979711 22.5266 0.640573 22.2766 0.390524C22.0265 0.140476 21.6874 0 21.3338 0H17.0204C16.0459 0.000599903 15.1051 0.356956 14.3747 1.00215C13.6443 1.64734 13.1746 2.53698 13.0538 3.504L12.8231 5.34933H4.00043C3.41483 5.35561 2.83764 5.48951 2.30908 5.7417C1.78053 5.99389 1.31332 6.3583 0.940018 6.80953C0.566717 7.26077 0.2963 7.78798 0.147612 8.35443C-0.00107585 8.92087 -0.0244585 9.51293 0.0790936 10.0893L2.09643 26.1667C2.30042 27.777 3.08433 29.2577 4.3014 30.3317C5.51847 31.4057 7.08525 31.9993 8.70843 32.0013L25.3338 31.9853C26.2092 31.9853 27.0761 31.8129 27.885 31.4779C28.6938 31.1428 29.4287 30.6518 30.0478 30.0327C30.6669 29.4137 31.1579 28.6787 31.493 27.8699C31.828 27.0611 32.0004 26.1941 32.0004 25.3187V22.66C32.0004 21.7845 31.828 20.9176 31.493 20.1088C31.1579 19.2999 30.6669 18.565 30.0478 17.946C29.4287 17.3269 28.6938 16.8358 27.885 16.5008C27.0761 16.1658 26.2092 15.9933 25.3338 15.9933ZM29.3338 22.66H13.3338C13.3338 21.5991 13.7552 20.5817 14.5053 19.8316C15.2555 19.0814 16.2729 18.66 17.3338 18.66H25.3338C26.3946 18.66 27.412 19.0814 28.1622 19.8316C28.9123 20.5817 29.3338 21.5991 29.3338 22.66ZM18.6671 8.01467C18.8777 8.0158 19.0852 8.06629 19.2728 8.16208C19.4604 8.25787 19.623 8.39629 19.7474 8.56624C19.8719 8.7362 19.9547 8.93295 19.9894 9.14073C20.0241 9.3485 20.0096 9.56151 19.9471 9.76267L19.8311 10.66H14.8444L15.1751 8.012L18.6671 8.01467ZM2.96576 8.51333C3.09016 8.35836 3.24763 8.23316 3.42665 8.14688C3.60566 8.0606 3.8017 8.01543 4.00043 8.01467H12.4898L12.1578 10.66H2.83243L2.69909 9.63333C2.65636 9.43862 2.65814 9.23676 2.70432 9.04283C2.75049 8.8489 2.83986 8.6679 2.96576 8.51333ZM4.74176 25.836L3.16843 13.3267H19.4978L19.1631 15.9933H17.3338C15.5657 15.9933 13.87 16.6957 12.6197 17.946C11.3695 19.1962 10.6671 20.8919 10.6671 22.66C10.6111 24.8387 10.5338 27.6467 12.0484 29.34H8.70843C7.73389 29.3394 6.79309 28.983 6.0627 28.3379C5.33232 27.6927 4.8626 26.803 4.74176 25.836ZM25.3338 29.3267H17.3338C16.2729 29.3267 15.2555 28.9052 14.5053 28.1551C13.7552 27.405 13.3338 26.3875 13.3338 25.3267H18.2671C18.7831 25.5747 22.1004 28.1413 22.6671 27.9933C23.2218 28.1507 26.5738 25.5627 27.0671 25.3267H29.3338C29.3338 26.3875 28.9123 27.405 28.1622 28.1551C27.412 28.9052 26.3946 29.3267 25.3338 29.3267Z"
        fill="#4D649C"
      />
    </svg>
  );
}

function GuestOrderIcon() {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_7909)">
        <path
          d="M28.25 14.6667H21.5833C19.378 14.6667 17.5833 16.4613 17.5833 18.6667V28C17.5833 30.2053 19.378 32 21.5833 32H28.25C30.4553 32 32.25 30.2053 32.25 28V18.6667C32.25 16.4613 30.4553 14.6667 28.25 14.6667ZM29.5833 28C29.5833 28.7347 28.986 29.3333 28.25 29.3333H21.5833C20.8473 29.3333 20.25 28.7347 20.25 28V18.6667C20.25 17.932 20.8473 17.3333 21.5833 17.3333H28.25C28.986 17.3333 29.5833 17.932 29.5833 18.6667V28ZM28.25 21.3293C28.25 22.0653 27.654 22.6627 26.9167 22.6627H22.9167C22.1793 22.6627 21.5833 22.0653 21.5833 21.3293C21.5833 20.5933 22.1793 19.996 22.9167 19.996H26.9167C27.654 19.996 28.25 20.5933 28.25 21.3293ZM28.25 25.3333C28.25 26.0693 27.654 26.6667 26.9167 26.6667H22.9167C22.1793 26.6667 21.5833 26.0693 21.5833 25.3333C21.5833 24.5973 22.1793 24 22.9167 24H26.9167C27.654 24 28.25 24.5973 28.25 25.3333ZM12.25 16C16.662 16 20.25 12.412 20.25 8C20.25 3.588 16.662 0 12.25 0C7.838 0 4.25 3.588 4.25 8C4.25 12.412 7.838 16 12.25 16ZM12.25 2.66667C15.1913 2.66667 17.5833 5.05867 17.5833 8C17.5833 10.9413 15.1913 13.3333 12.25 13.3333C9.30867 13.3333 6.91667 10.9413 6.91667 8C6.91667 5.05867 9.30867 2.66667 12.25 2.66667ZM14.9167 20C14.9167 20.736 14.3207 21.3333 13.5833 21.3333H12.25C7.10467 21.3333 2.91667 25.52 2.91667 30.6667C2.91667 31.4027 2.32067 32 1.58333 32C0.846 32 0.25 31.4027 0.25 30.6667C0.25 24.0507 5.63267 18.6667 12.25 18.6667H13.5833C14.3207 18.6667 14.9167 19.264 14.9167 20Z"
          fill="#4D649C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_7909">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function ReheatOrderIcon() {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_7853)">
        <path
          d="M25.8333 2.66663H7.16667C3.49067 2.66663 0.5 5.65729 0.5 9.33329V21.3333C0.5 24.06 2.14933 26.4026 4.5 27.4346V29.3333C4.5 30.0706 5.09733 30.6666 5.83333 30.6666C6.56933 30.6666 7.16667 30.0706 7.16667 29.3333V28H25.8333V29.3333C25.8333 30.0706 26.4307 30.6666 27.1667 30.6666C27.9027 30.6666 28.5 30.0706 28.5 29.3333V27.4346C30.8507 26.4026 32.5 24.06 32.5 21.3333V9.33329C32.5 5.65729 29.5093 2.66663 25.8333 2.66663ZM29.8333 21.3333C29.8333 23.5386 28.0387 25.3333 25.8333 25.3333H7.16667C4.96133 25.3333 3.16667 23.5386 3.16667 21.3333V9.33329C3.16667 7.12796 4.96133 5.33329 7.16667 5.33329H25.8333C28.0387 5.33329 29.8333 7.12796 29.8333 9.33329V21.3333ZM19.1667 7.99996H8.5C7.02933 7.99996 5.83333 9.19596 5.83333 10.6666V20C5.83333 21.4706 7.02933 22.6666 8.5 22.6666H19.1667C20.6373 22.6666 21.8333 21.4706 21.8333 20V10.6666C21.8333 9.19596 20.6373 7.99996 19.1667 7.99996ZM8.5 20V10.6666H19.1667V20H8.5ZM27.1667 9.33329V21.3333C27.1667 22.0706 26.5693 22.6666 25.8333 22.6666C25.0973 22.6666 24.5 22.0706 24.5 21.3333V9.33329C24.5 8.59729 25.0973 7.99996 25.8333 7.99996C26.5693 7.99996 27.1667 8.59729 27.1667 9.33329Z"
          fill="#4D649C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_7853">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
