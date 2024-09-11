import { Checkbox } from "antd";
import clsx from "clsx";
export default function CardCheckbox({ icon, label, onClick, active }) {
  return (
    <div
      className={clsx({
        "border border-solid rounded-xl p-2 flex items-center gap-3 cursor-pointer": true,
        "border-primary": active,
        "border-slate-100": !active,
      })}
      onClick={onClick}
    >
      <div className="rounded-xl bg-[#F9F9F9] py-2 px-3">{icon}</div>
      <div className="font-semibold">{label}</div>
    </div>
  );
}
