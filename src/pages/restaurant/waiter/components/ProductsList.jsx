import { CiCirclePlus } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import FireIcon from "@/assets/icons/fire.svg?react";
import Takamol from '@/assets/auth-bg.png'

export default function ProductsList({ items, setSelectedItems }) {
  const handleAddItems = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };
  return (
    <div className="grid grid-cols-4 gap-3">
      {items?.map((item) => (
        <ProductItem item={item} handleAddItems={handleAddItems} />
      ))}
    </div>
  );
}

export function ProductItem({ item, handleAddItems }) {
  return (
    <div
      className="p-2 bg-white rounded-xl flex flex-col gap-4"
      style={{
        boxShadow: "0px 4px 75px 0px #00000012",
        border: "1px solid #EBEBEB",
      }}
    >
      <img
        src={item?.image ?? Takamol}
        alt="product"
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="flex justify-between mt-3">
        <div className="flex flex-col gap-2">
          <p className="text-[#000727]">{item.name}</p>
          <div className="flex gap-2">
            <FireIcon />
            <p className="text-[#828282]">{item.calories}</p>
          </div>
        </div>
        <div
          className="p-2 flex items-center justify-center bg-blue-100 rounded-full"
          onClick={() => handleAddItems(item)}
        >
          <CiCirclePlus size={20} color="#38ACB1" />
        </div>
      </div>
    </div>
  );
}
