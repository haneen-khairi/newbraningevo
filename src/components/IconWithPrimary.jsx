import FlatButton from "@/components/FlatButton";
import { Typography } from "antd";
export function IconWithPrimaryText({ icon, main, secondary }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-[#FAFAFA] text-[#AFAFAF]">{icon}</div>
      <div className="flex flex-col justify-between ">
        <Typography
          className="text-xs font-su"
          style={{
            color: "#767676",
          }}
        >
          {main}
        </Typography>
        <Typography className="text-md font-su">{secondary}</Typography>
      </div>
    </div>
  );
}
