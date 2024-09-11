import { useTranslation } from "react-i18next";
import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import EmployeesComponent from "./employees";
import DepartmentsComponent from "./departments";
import { useState } from "react";
import BuildingsComponent from "./buildings";
import RoomsComponent from "./rooms";
import GuestsComponent from "./guests";
import Authority from "./authorities/index.jsx";
import Companies from "./companies/index.jsx";
import Office from "./offices/index.jsx";
import AuditLog from "@/pages/auditlog/index.jsx";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import HeadQuarters from "./headquarters/index.jsx";
import Floors from "./floors1/index.jsx";
export default function Organization() {

  const { t } = useTranslation();
  const { ability } = useSelector((state) => state.ability);
  
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );

  const buildOptionsFromAbility = useCallback(() => {
    let options = [];
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "1", label: t("headquarters") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "2", label: t("buildings") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "3", label: t("theAuthorities") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "4", label: t("floors") });
    }

    if (ability.can("manage", "Guests")) {
      options.push({ value: "5", label: t("companies") });
    }

    if (ability.can("manage", "Administrator")) {
      options.push({ value: "6", label: t("Offices") });
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
          {activeTab === "1" && <HeadQuarters />}
          {activeTab === "2" && <BuildingsComponent />}
          {activeTab === "3" && <Authority />}
          {activeTab === "4" && <Floors />}
          {activeTab === "5" && <Companies />}
          {activeTab === "6" && <Office />}
        </div>
      </CustomCard>
    </div>
  );
}
