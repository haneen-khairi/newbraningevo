import { Typography } from "antd";
import ColorJS from "color";
import React from "react";
export default function StatusButton({
  color,
  icon,
  count,
  text,
  bgcolor = "",
  ...rest
}) {
  return (
    <div
      className="flex flex-col gap-2 py-3 px-4 border-[#00000008] border-solid border rounded-lg"
      style={{
        boxShadow: "0px 4px 75px 0px #00000008",
        minWidth: "150px",
        backgroundColor: bgcolor,
      }}
    >
      <div className="flex justify-between items-center">
        <div
          className="w-4 h-4 rounded-2xl flex items-center justify-center p-4"
          style={{
            backgroundColor: ColorJS(color).alpha(0.1),
          }}
        >
          {React.cloneElement(icon, {
            style: { color: color, fill: color },
          })}
        </div>
        <Typography.Text
          style={{
            color: color,
            fontSize: "1.5rem",
          }}
        >
          {count}
        </Typography.Text>
      </div>
      <Typography.Text className="font-semibold text-lg font-su">
        {text}
      </Typography.Text>
    </div>
  );
}
