import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import SystemAdministrators from "./systemAdministrators";
import EventPowers from "./eventPowers";

export default function Permissions() {

  const { t } = useTranslation();
  const { ability } = useSelector((state) => state.ability);
  
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  const buildOptionsFromAbility = useCallback(() => {
    let options = [];
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "1", label: t("systemAdministrators") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "2", label: t("eventPowers") });
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
          {activeTab === "1" && <SystemAdministrators />}
          {activeTab === "2" && <EventPowers />}
        </div>
      </CustomCard>
    </div>
  );
}
