import { Divider, Drawer, Flex, Typography } from "antd";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import flattenNestedArray from "../utils/flattenArray";
import { useContext } from "react";
import RoutesContext from "../contexts/routesContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slices/AuthSlice";
import { setTheme } from "@/slices/themeSlice";

import MobileMenuItem from "./MobileMenuItem";
import { IoCloseOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

import { t } from "i18next";
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { routes } = useContext(RoutesContext);
  const { ability } = useSelector((state) => state.ability);
  const dispatch = useDispatch();

  return (
    <>
      <GiHamburgerMenu
        color="white"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={"100%"}
        headerStyle={{
          display: "none",
        }}
      >
        <IoCloseOutline size={36} onClick={() => setIsOpen(false)} />

        <Flex
          vertical
          style={{
            backgroundCOl: "#F2F2F2",
          }}
          justify="center"
          className="mt-[20vh] text-2xl gap-6"
        >
          {flattenNestedArray(routes).map(
            (route, index) =>
              !!route.inNavbar &&
              route?.permissions &&
              route?.permissions.some((permission) =>
                ability.can("manage", permission)
              ) && (
                <MobileMenuItem
                  route={route}
                  onChange={() => setIsOpen(false)}
                />
              )
          )}
        </Flex>
        <Divider />

        <Flex vertical className="text-xl">
          <MobileMenuItem
            route={{
              name: t("profile"),
              path: "/profile",
              icon: <CiUser />,
            }}
            fontSize={16}
            onChange={() => setIsOpen(false)}
          />
          <MobileMenuItem
            route={{
              name: t("logout"),
              path: "/logout",
              icon: <IoIosLogOut />,
            }}
            danger={true}
            fontSize={16}
            onChange={() => {
              setIsOpen(false);
              dispatch(logout());
              dispatch(setTheme("light"));
            }}
          />
        </Flex>
      </Drawer>
    </>
  );
}
