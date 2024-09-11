import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import Buses from "../../busses";
import MyTrips from "../../busses/myTrips";
import Trips from "../../busses/trips";
import VipStatistics from "../../statistics/vipStatistics";
import VipCars from "../../vip/cars";
import Drivers from "../../vip/drivers";
import Events from "../../busses/events";
import Routes from "../../busses/routes";
import ReasonsForCancelation from "./reasonsForCancelation";


export default function Bus() {

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
      options.push({ value: "2", label: t("shuttle-transport") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "3", label: t("trips") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "4", label: t("buses") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "5", label: t("drivers") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "6", label: t("events") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "7", label: t("routes") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "8", label: t("reasonForCancelation") });
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
        <div className="w-full ">
          {activeTab === "1" && <VipStatistics />}
          {activeTab === "2" && <MyTrips />}
          {activeTab === "3" && <VipCars />}
          {activeTab === "4" && <Trips />}
          {activeTab === "5" && <Buses />}
          {activeTab === "6" && <Drivers />}
          {activeTab === "7" && <Events />}
          {activeTab === "7" && <Routes />}
          {activeTab === "8" && <ReasonsForCancelation />}
        </div>
      </CustomCard>
    </div>
  );
}
