import CustomCard from "@/components/CardWithHeader";
import { useState , useCallback} from "react";
import { useTranslation } from "react-i18next";


// import { useCallback } from "react";
import { useSelector } from "react-redux";
import Requests from "./requests"
import ButtonGroup from "../../../components/CustomButtonGroup";
import VipStatistics from "../../statistics/vipStatistics";
import CancelReasons from "./requests/components/CancelReasons";

export default function Orders() {

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
      options.push({ value: "3", label: t("cancelReasons") });
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
          {activeTab === "3" && <CancelReasons />}
        </div>
      </CustomCard>
    </div>
  );
}
// export default function Orders() {
//     return (
//     <div className="w-full">
//       <CustomCard>
        
//         <div className="w-full ">
//             <Requests />
//         </div>
//       </CustomCard>
//     </div>
//     )
// }