import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Flex } from "antd";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Restaurant() {
  const { ability } = useSelector((state) => state.ability);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("");
  function buildTabsFromAbility() {
    let options = [];
    if (
      ["Administrator", "Restaurant"].some((role) =>
        ability.can("manage", role)
      )
    ) {
      options.push({ label: t("orders"), value: "orders" });
      options.push({ label: t("categories"), value: "categories" });
      options.push({ label: t("products"), value: "products" });
    }
    options.push({ label: t("myOrders"), value: "my-orders" });
    options.push({ label: t("newOrder"), value: "new-order" });
    return options;
  }
  useEffect(() => {
    let currentLocation = location.pathname.split("/").at(-1);
    if (currentLocation == "restaurant") {
      navigate("new-order");
    }
    setCurrentTab(currentLocation);
  }, [location]);
  return (
    <CustomCard className="md:w-10/12 w-11/12 mx-auto">
      <Flex vertical gap={12}>
        <ButtonGroup
          value={currentTab}
          options={buildTabsFromAbility()}
          onChange={(e) => {
            navigate(e.target.value);
          }}
        />

        <Outlet />
      </Flex>
    </CustomCard>
  );
}
