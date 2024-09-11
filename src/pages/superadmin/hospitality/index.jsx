import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import Requests from "../../vip/requests";
import VipCars from "../../vip/cars";
import Drivers from "../../vip/drivers";
import VipStatistics from "../../statistics/vipStatistics";
import ReasonsForCancelation from "./reasonsForCancelation";
import HospitalityStatistics from "../../statistics/hospitalityStatistics";
import TeaboyOrders from "../../restaurant/waiter/orders";
import Orders from "../../restaurant/orders";
import Categories from "../../restaurant/categories";
import Products from "../../restaurant/products";
import Waiters from "../../restaurant/waiters";
import MyOrders from "../../restaurant/myOrders";


export default function Hospitality() {

  const { t } = useTranslation();
  const { ability } = useSelector((state) => state.ability);
  
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  const buildOptionsFromAbility = useCallback(() => {
    let options = [];
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "1", label: t("statistics") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "2", label: t("orders") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "3", label: t("categories") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "4", label: t("products") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "5", label: t("teaBoy") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "6", label: t("myOrders") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "7", label: t("reasonForCancelation") });
    }
    return options;
  });

  return (
    <div className="w-full">
      <CustomCard>
        <ButtonGroup
          defaultValue="1"
          onChange={(e) => {
            setActiveTab(e.target.value);
            localStorage.setItem("activeTab", e.target.value);
          }}
          value={activeTab}
          options={buildOptionsFromAbility()}
        />
        <div className="w-full my-1">
          {activeTab === "1" && <HospitalityStatistics />}
          {activeTab === "2" && <Orders />}
          {activeTab === "3" && <Categories />}
          {activeTab === "4" && <Products />}
          {activeTab === "5" && <Waiters />}
          {activeTab === "6" && <MyOrders />}
          {activeTab === "7" && <ReasonsForCancelation />}
        </div>
      </CustomCard>
    </div>
  );
}
