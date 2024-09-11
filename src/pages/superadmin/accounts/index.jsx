import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import ServicesProvider from "./servicesProvider/index.jsx";
import Users from "./users/index.jsx";
export default function Accounts() {

  const { t } = useTranslation();
  const { ability } = useSelector((state) => state.ability);
  
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  const buildOptionsFromAbility = useCallback(() => {
    let options = [];
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "1", label: t("systemUsers") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "2", label: t("servicesProvider") });
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
          {activeTab === "1" &&<Users /> }
          {activeTab === "2" && <ServicesProvider />}
        </div>
      </CustomCard>
    </div>
  );
}
