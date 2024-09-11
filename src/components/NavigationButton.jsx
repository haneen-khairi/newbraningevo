import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export default function NavigationButton({ icon, title, path }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <NavLink
      to={path ?? "/"}
      className={({ isActive }) => {
        setIsActive(isActive);
      }}
    >
      <Button
        style={{
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          color: "white",
          fontSize: "16px",
          padding: "20px",
          backgroundColor: isActive ? "#329B9F" : "#329B9F",

        }}
        icon={icon}
        type={isActive ? "primary" : "text"}
        className={'hover:!bg-[#CCCCFE] hover:!text-black'}
      >
        {title}
      </Button>
    </NavLink>
  );
}
