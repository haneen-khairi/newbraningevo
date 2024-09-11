import FullImageOrderCard from "@/components/restaurant/FullImageOrderCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllItems } from "@/services/restaurantItems";
import { fetchAllCategories } from "@/services/restaurantCategories";
import { favouriteItem } from "@/services/restaurantItems";
import { useState } from "react";
import { Button, Pagination, Spin } from "antd";
import { t } from "i18next";
import styled from "styled-components";
import { BsCart } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { CartDrawer } from "./CartDrawer";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import ReheatModal from "./ReheatModal";
const ChipButton = styled(Button)`
  border-radius: 20px !important;
  border: none;
  font-weight: semibold;
  width: fit-content;
  min-width: 100px;
`;
export default function NewOrder() {
  const [cart, setCart] = useState([]); // [{id, name, count}]
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReheatOpen, setIsReheatOpen] = useState(false);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [favouriteOnly, setFavouriteOnly] = useState(false);
  const { data, isPending, refetch } = useQuery({
    queryKey: [
      "restaurantItems",
      { categoryId: selectedCategoryId },
      filterOptions,
      favouriteOnly,
    ],
    queryFn: () =>
      fetchAllItems({
        categoryId: selectedCategoryId,
        isActive: true,
        isFavoriteOnly: favouriteOnly,
        ...filterOptions,
      }),
  });
  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ["restaurantCategories"],
    queryFn: () => fetchAllCategories(),
  });

  return (
    <div className="flex flex-col gap-4 w-full bg-white p-2 rounded-xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 flex-wrap">
          <ChipButton
            type={selectedCategoryId === null ? "primary" : "default"}
            onClick={() => setSelectedCategoryId(null)}
          >
            {t("all")}
          </ChipButton>
          {isCategoriesPending ? (
            <Spin />
          ) : (
            categoriesData?.data.map((item) => (
              <ChipButton
                key={item.id}
                type={selectedCategoryId === item.id ? "primary" : "default"}
                onClick={() => setSelectedCategoryId(item.id)}
              >
                {item.name}
              </ChipButton>
            ))
          )}
        </div>
        <div id="buttons" className="flex gap-1 items-center flex-wrap">
          <Button
            className="border-none font-semibold flex justify-center items-center"
            type="default"
            shape="circle"
            onClick={() => setFavouriteOnly(!favouriteOnly)}
          >
            {favouriteOnly ? (
              <FaHeart color="red" size={16} />
            ) : (
              <FaRegHeart size={16} />
            )}
          </Button>
          <Button
            className="border-none font-semibold flex justify-center items-center"
            shape="rounded"
            onClick={() => setIsReheatOpen(true)}
          >
            <GiChickenOven size={24} color="red" />
          </Button>
          <Button
            className="border-none font-semibold flex justify-center items-center"
            type="primary"
            shape="rounded"
            onClick={() => setIsDrawerOpen(true)}
          >
            <BsCart size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? "Loading..."
          : data?.data.map((item) => (
              <FullImageOrderCard
                key={item.id}
                id={item.id}
                {...item}
                name={item.name}
                favourite={item.isFavorite}
                image={
                  item.image ??
                  "https://static.vecteezy.com/system/resources/previews/004/640/269/original/coffee-cup-icon-on-white-bcakground-vector.jpg"
                }
                handleSubmit={(data) => {
                  setCart([...cart, data]);
                  setIsDrawerOpen(true);
                }}
                actionsMenu={{
                  items: [
                    {
                      key: "1",
                      label: item.isFavorite
                        ? t("unfavourite")
                        : t("favourite"),
                      onClick: async () => {
                        await favouriteItem(item.id, item.isFavorite);
                        refetch();
                      },
                    },
                  ],
                }}
              />
            ))}
      </div>
      <div className="flex items-center justify-center ">
        {!isPending && (
          <Pagination
            current={data?.pagination.current}
            total={data?.pagination.total}
            pageSize={data?.pagination.pageSize}
            onChange={(current, pageSize) =>
              dispatch({ type: "paginate", payload: { current, pageSize } })
            }
          />
        )}
      </div>
      <CartDrawer
        type="new"
        cart={cart}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDeleteItem={(id) => {
          setCart(cart.filter((item) => item.local_id !== id));
        }}
        onSuccess={() => {
          setCart([]);
        }}
      />
      <CartDrawer
        type="reheat"
        cart={[]}
        open={isReheatOpen}
        onClose={() => setIsReheatOpen(false)}
        // onDeleteItem={(id) => {
        //   setCart(cart.filter((item) => item.local_id !== id));
        // }}
      />
      {/* <ReheatModal
        isOpen={isReheatOpen}
        onClose={() => setIsReheatOpen(false)}
      /> */}
    </div>
  );
}
