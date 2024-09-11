import { Flex, Button } from "antd";
import NavigationButton from "./NavigationButton";
import { useTranslation } from "react-i18next";
import { RxDashboard } from "react-icons/rx";
import RoutesContext from "../contexts/routesContext";
import { useContext } from "react";
import flattenNestedArray from "../utils/flattenArray";
import { useSelector } from "react-redux";
export default function NavigationBar(props) {
  const { t } = useTranslation();
  const { routes } = useContext(RoutesContext);
  const { ability } = useSelector((state) => state.ability);
  return (
    <Flex
      gap={"small"}
      style={{
        borderRadius: "100px",
        padding: "10px",
      }}
    >
      {flattenNestedArray(routes).map((route, index) => {
        return (
          !!route.inNavbar &&
          route?.permissions &&
          route?.permissions.some((permission) =>
            ability.can("manage", permission) || ability.can("type", permission)
          ) && (
            <NavigationButton
              key={route?.key ?? route?.name ?? index}
              title={t(route.name)}
              icon={route?.icon ?? <RxDashboard />}
              path={route.path}
            />
          )
        );
      })}
    </Flex>
  );
}
