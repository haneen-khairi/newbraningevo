import React from "react";
import emptyBasket from "../../../assets/分组 4.png";
import { useTranslation } from "react-i18next";
export default function Empty() {
  const { t } = useTranslation();
  return (
    <div className="mt-10 text-center">
      <img src={emptyBasket} alt="" />
      <p className="font-bold">{t("emptyBasket")}</p>
      <p className="text-gray-500 my-1">{t("noAddedProducts")}</p>
    </div>
  );
}
