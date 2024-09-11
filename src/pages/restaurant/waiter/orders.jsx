import { useEffect, useState } from "react";
import CancelOrder from "./CancelOrder.jsx";
import OrderCard from "./OrderCard.jsx";
import OrderDetails from "./OrderDetails.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@/services/restaurantOrders";
import Cart from "./Cart.jsx";
import { GridLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import EmptyImage from "@/assets/icons/empty.svg";
import createSignalRConnection from "../../../services/signalr.js";

export default function TeaboyOrders({ status }) {
  const [orderForDrawer, setOrderForDrawer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useTranslation();
  const columns = 4;
  const {
    data: orders,
    isPending,
    error,
    refetch,
  } = useQuery({
    querykey: ["teaboyOrders", status],
    queryFn: () =>
      fetchAllOrders({
        status,
          isMyOrdersOnly: true,
      }),
  });
  useEffect(() => {
    refetch();
  }, [status]);
    useEffect(() => {
    const connection = createSignalRConnection();
    connection.start();
    connection.on("ReceiveMessage", (page, action) => {
        if(page && page.notificationType == 26){
            refetch();
        }
    });
    return () => {
        connection.stop();
    };
    }, []);
    
  if (isPending || error || (orders?.data && orders?.data?.length == 0))
    return (
      <div className="w-full mx-auto bg-white rounded-xl">
        <div className="flex items-center justify-center py-12">
          {isPending && <GridLoader color="#012070" />}
          {error && <div className="text-red-500">{error.message}</div>}
          {orders?.data && orders?.data?.length == 0 && (
            <div className="flex items-center justify-center flex-col gap-2">
                <img src={EmptyImage} alt="empty" className="w-24 h-24 object-cover rounded-xl" />
                <p>
                    {t("noOrders")}
                </p>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div className={`grid grid-cols-${columns} gap-2 w-full`}>
      {orders?.data.map((order, index) => (
        <div
          style={{
            opacity: index >= columns ? 0.5 : 1,
          }}
        >
          <OrderCard
            order={order}
            setOrderForDrawer={setOrderForDrawer}
            setIsDetailsOpen={setIsDetailsOpen}
            setIsCartOpen={setIsCartOpen}
          />
        </div>
      ))}

      <OrderDetails
        orderForDrawer={orderForDrawer}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(!isDetailsOpen);
        }}
        setIsCancelOpen={setIsCancelOpen}
        setIsCartOpen={(v) => {
          setIsDetailsOpen(false);
          setIsCartOpen(v);
        }}
      />
      <CancelOrder
        orderId={orderForDrawer?.id}
        isOpen={isCancelOpen}
        onClose={() => {
          setIsCancelOpen(false);
          setIsDetailsOpen(false);
        }}
        orderForDrawer={orderForDrawer}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(!isCartOpen);
        }}
        orderForDrawer={orderForDrawer}
      />
    </div>
  );
}
