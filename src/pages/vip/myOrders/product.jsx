import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toggleOrder } from "../../../services/restaurantOrders";
import useResultModal from "../../../hooks/useResultModal";
export default function Product({ data, setOrder }) {
  const globalModal = useResultModal();
  const addProductTocart = (data) => {
    let orders = localStorage.getItem("orders");
    orders = orders ? JSON.parse(orders) : [];
    const isExist = orders.some((el) => el.id === data.id);

    if (!isExist) {
      orders = [...orders, data];
      setOrder(orders);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  };
  const [fav, setFav] = useState(
    data?.isFavorite == null || data?.isFavorite == false ? false : true
  );

  const mutation = useMutation({
    mutationFn: (values) => toggleOrder(values),
    onSuccess: () => {
      refetch();
    },

    onError: (error) => {
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  const addFav = (data) => {
    let orders = localStorage.getItem("fav");
    orders = orders ? JSON.parse(orders) : [];

    const isExist = orders.some((el) => el.id === data.id);

    if (isExist) {
      orders = orders.filter((el) => el.id !== data.id);
    } else {
      orders = [...orders, data];
    }
    localStorage.setItem("fav", JSON.stringify(orders));
  };

  const toggleFavourit = (v) => {
    mutation.mutate(v);
    setFav(!fav);
    addFav(data);
  };

  return (
    <div className=" shadow-md p-1 rounded-lg border-t-[.3px] border-solid border-gray-200 w-full">
      <div className="rounded-lg relative w-full">
        <img className="w-full h-40 rounded-lg" src={`${data.image}`} alt="" />
        <button
          onClick={() => {
            const item = {
              itemId: data?.id,
              isFavorite:
                data?.isFavorite == null
                  ? true
                  : data?.isFavorite
                  ? false
                  : true,
            };
            toggleFavourit(item);
          }}
          type="button"
          className="border-none p-2 flex items-center justify-center rounded-full absolute top-3 cursor-pointer right-2"
        >
          {!fav ? (
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.007 21.5L11.4017 21.1153C7.14367 18.4013 0 12.9803 0 7.14622C0 3.47763 2.94895 0.5 6.56654 0.5C8.65687 0.5 10.6979 1.48304 12 2.99322C13.302 1.48304 15.343 0.5 17.4334 0.5C21.058 0.5 24 3.48475 24 7.14622C24 12.9803 16.8562 18.4013 12.5982 21.1153L11.9929 21.5H12.007ZM6.57359 2.78665C4.20174 2.78665 2.2733 4.73847 2.2733 7.13909C2.2733 10.4871 5.81345 14.7113 12.007 18.7788C18.2076 14.7113 21.7407 10.4871 21.7407 7.13909C21.7407 4.73847 19.8123 2.78665 17.4404 2.78665C15.5542 2.78665 13.668 3.97624 13.0627 5.55765L12.007 8.29309L10.9513 5.55765C10.339 3.97624 8.45981 2.78665 6.57359 2.78665Z"
                fill="#2D2E80"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1091_18713)">
                <path
                  d="M17.5 1.91699C16.3739 1.93451 15.2724 2.24885 14.3067 2.82826C13.341 3.40768 12.5453 4.23166 12 5.21699C11.4546 4.23166 10.6589 3.40768 9.6932 2.82826C8.7275 2.24885 7.62601 1.93451 6.49996 1.91699C4.7049 1.99498 3.01366 2.78025 1.79574 4.10122C0.577818 5.4222 -0.0677922 7.17152 -4.17093e-05 8.96699C-4.17093e-05 13.514 4.78596 18.48 8.79996 21.847C9.69618 22.6001 10.8293 23.013 12 23.013C13.1706 23.013 14.3037 22.6001 15.2 21.847C19.214 18.48 24 13.514 24 8.96699C24.0677 7.17152 23.4221 5.4222 22.2042 4.10122C20.9863 2.78025 19.295 1.99498 17.5 1.91699Z"
                  fill="#2D2E80"
                />
              </g>
              <defs>
                <clipPath id="clip0_1091_18713">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p>{data.name}</p>
          <br />
          <div className="flex items-center">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3767 5.75914C11.899 4.73314 11.2316 3.73239 10.3933 2.78474C10.2176 2.58608 9.91443 2.57405 9.72315 2.75261L7.51737 4.81133V0.499955C7.51737 0.139049 7.08222 -0.130608 6.75634 0.0665173C4.96487 1.15014 2.78878 3.32377 1.67434 5.64474C1.04121 6.96327 0.720215 8.3298 0.720215 9.70639C0.720184 13.1767 3.53665 16 6.99856 16C11.3483 16 15.0513 11.5028 12.3767 5.75914ZM5.55012 13.6083C5.55012 12.3956 6.52643 11.5055 6.99931 11.1456C7.47009 11.528 8.44697 12.4598 8.44697 13.6083C8.44697 14.4089 7.79722 15.0602 6.99853 15.0602C6.19984 15.0602 5.55012 14.4089 5.55012 13.6083ZM9.17006 14.5973C9.88675 13.0224 8.70081 11.1189 7.26747 10.1737C7.11734 10.0748 6.92409 10.0705 6.76968 10.1628C5.27628 11.056 4.1089 13.0192 4.82703 14.5973C2.96125 13.7616 1.65768 11.8838 1.65768 9.70642C1.65768 6.29902 3.87675 3.33149 6.57987 1.32733V5.89092C6.57987 6.30042 7.06869 6.51417 7.36806 6.23483L10.0045 3.77417C11.5543 5.65367 12.3394 7.64733 12.3394 9.70646C12.3394 11.8838 11.0358 13.7616 9.17006 14.5973Z"
                fill="#666666"
              />
            </svg>
            <span className="px-2">{data.calories}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addProductTocart(data)}
          className="p-3 flex items-center justify-center border-none cursor-pointer rounded-full"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1091_12463)">
              <path
                d="M10.5 0.5C8.52219 0.5 6.58879 1.08649 4.9443 2.1853C3.29981 3.28412 2.01809 4.8459 1.26121 6.67317C0.504333 8.50043 0.306299 10.5111 0.692152 12.4509C1.078 14.3907 2.03041 16.1725 3.42894 17.5711C4.82746 18.9696 6.60929 19.922 8.5491 20.3079C10.4889 20.6937 12.4996 20.4957 14.3268 19.7388C16.1541 18.9819 17.7159 17.7002 18.8147 16.0557C19.9135 14.4112 20.5 12.4778 20.5 10.5C20.4971 7.84872 19.4426 5.30684 17.5679 3.4321C15.6932 1.55736 13.1513 0.502868 10.5 0.5ZM10.5 18.8333C8.85183 18.8333 7.24066 18.3446 5.87025 17.4289C4.49984 16.5132 3.43174 15.2117 2.80101 13.689C2.17028 12.1663 2.00525 10.4908 2.32679 8.87425C2.64834 7.25774 3.44201 5.77288 4.60745 4.60744C5.77289 3.44201 7.25774 2.64833 8.87425 2.32679C10.4908 2.00525 12.1663 2.17027 13.689 2.801C15.2118 3.43173 16.5132 4.49984 17.4289 5.87025C18.3446 7.24066 18.8333 8.85182 18.8333 10.5C18.8309 12.7094 17.9522 14.8276 16.3899 16.3899C14.8276 17.9522 12.7094 18.8309 10.5 18.8333ZM14.6667 10.5C14.6667 10.721 14.5789 10.933 14.4226 11.0893C14.2663 11.2455 14.0544 11.3333 13.8333 11.3333H11.3333V13.8333C11.3333 14.0543 11.2455 14.2663 11.0893 14.4226C10.933 14.5789 10.721 14.6667 10.5 14.6667C10.279 14.6667 10.067 14.5789 9.91075 14.4226C9.75447 14.2663 9.66667 14.0543 9.66667 13.8333V11.3333H7.16667C6.94566 11.3333 6.7337 11.2455 6.57742 11.0893C6.42113 10.933 6.33334 10.721 6.33334 10.5C6.33334 10.279 6.42113 10.067 6.57742 9.91074C6.7337 9.75447 6.94566 9.66667 7.16667 9.66667H9.66667V7.16667C9.66667 6.94565 9.75447 6.73369 9.91075 6.57741C10.067 6.42113 10.279 6.33333 10.5 6.33333C10.721 6.33333 10.933 6.42113 11.0893 6.57741C11.2455 6.73369 11.3333 6.94565 11.3333 7.16667V9.66667H13.8333C14.0544 9.66667 14.2663 9.75447 14.4226 9.91074C14.5789 10.067 14.6667 10.279 14.6667 10.5Z"
                fill="#38ACB1"
              />
            </g>
            <defs>
              <clipPath id="clip0_1091_12463">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}
