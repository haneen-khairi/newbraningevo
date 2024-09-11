import { t } from "i18next";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { cloneElement, useState } from "react";
import clsx from "clsx";
import { Typography } from "antd";
import { useTheme } from "styled-components";
export default function MobileMenuItem({
  route,
  onChange,
  danger = false,
  fontSize = 24,
}) {
  const [isActive, setIsActive] = useState(false);
  const { token } = useTheme();
  return (
    <NavLink
      className={({ isActive }) => {
        setIsActive(isActive);
      }}
      to={route.path}
      key={route.key}
      onClick={onChange}
    >
      <div
        className={clsx({
          "flex gap-4 items-center p-2 rounded-lg ": true,
          "bg-[#f2f2f2] text-black": isActive,
        })}
      >
        {cloneElement(route?.icon ?? <RxDashboard />, {
          color: danger && "red",
        })}
        <Typography
          style={{
            fontSize: fontSize,
          }}
          className={clsx({
            "text-black": isActive,
          })}
        >
          {t(route.name)}
        </Typography>
      </div>
    </NavLink>
  );
}
