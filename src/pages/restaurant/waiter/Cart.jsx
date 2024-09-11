import CustomDrawer from "@/components/Drawer";
import { useTranslation } from "react-i18next";
import SearchBar from "./components/SearchBar";
import CategoriesBar from "./components/CategoriesBar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductsList from "./components/ProductsList";
import OrderItems from "./components/OrderItems";
import { fetchAllCategories } from "@/services/restaurantCategories";
import { fetchAllItems } from "@/services/restaurantItems";
import { useEffect, useState } from "react";

import { Button } from "antd";

export default function Cart({ isOpen, onClose, orderForDrawer }) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: categories } = useQuery({
    queryKey: ["FetchAllCategories"],
    queryFn: () => fetchAllCategories(),
  });
  const { data: items } = useQuery({
    queryKey: ["FetchAllItems", selectedCategory, searchKeyword],
    queryFn: () =>
      fetchAllItems({
        categoryId: selectedCategory,
        searchKeyword,
      }),
  });
  useEffect(() => {
    if (!isOpen) setSelectedItems([]);
  }, [isOpen]);
  function changeItem(item) {
    //find selected item using item.randomId
    const index = selectedItems.findIndex((i) => i.randomId === item.randomId);
    //if not found, add it to the array
    if (index === -1) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      //if found, replace it with the new item or delete it if count is 0
      if (item.count <= 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          item,
          ...selectedItems.slice(index + 1),
        ]);
      }

    }
  }

  return (
    <CustomDrawer
      title={t("ordersList")}
      open={isOpen}
      onClose={onClose}
      width={"80vw"}
    >
      <div className="flex gap-2 h-[99%]">
        <div className="flex flex-col gap-2 w-[75%]">
          <SearchBar onChange={(e) => setSearchKeyword(e.target.value)} />
          <CategoriesBar
            categories={categories?.data}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductsList
            items={items?.data.map((item) => ({
              ...item,
              randomId: Math.floor(Math.random() * 1000),
            }))}
            selectedCategory={selectedCategory}
            setSelectedItems={setSelectedItems}
          />
        </div>
        <div className="flex flex-col gap-2 w-[25%]">
          <OrderItems
            items={selectedItems}
            orderForDrawer={orderForDrawer}
            changeItem={changeItem}
            onClose={onClose}
          />
        </div>
      </div>
    </CustomDrawer>
  );
}
