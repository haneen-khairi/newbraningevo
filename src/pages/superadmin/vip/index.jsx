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


export default function Vip() {

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
      options.push({ value: "2", label: t("trips") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "3", label: t("cars") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "4", label: t("drivers") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "5", label: t("reasonForCancelation") });
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
          {activeTab === "2" && <Requests />}
          {activeTab === "3" && <VipCars />}
          {activeTab === "4" && <Drivers />}
          {activeTab === "5" && <ReasonsForCancelation />}
        </div>
      </CustomCard>
    </div>
  );
}
