import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { Divider } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";

export default function SideBarItem({ request, token, building, onSelect }) {
  return (
    <div
      className="p-3 rounded-xl  border-solid border-r border-r-[#38ACB1]"
      style={{
        color: token.primaryTextColor,
      }}
      onClick={() => {
        onSelect(request);
      }}
    >
      <h1 className="font-bold">{request.subject}</h1>
      <Divider className="my-4" />
      <div className="flex gap-2 items-center">
        <IoCalendarOutline className="text-xl text-gray-500" />
        {dayjs(request.validFrom).format("DD MMMM YYYY")}
      </div>
      <div className="flex gap-6 mt-3 ">
        <h3>
          <span className="text-gray-400">المبنى</span>{" "}
          {request.room?.building?.name}
        </h3>
        <h3>
          <span className="text-gray-400">الطابق</span>{" "}
          {request.room?.floor?.name}
        </h3>
        <h3>
          <span className="text-gray-400">{t("room")}</span> {request.room.name}
        </h3>
      </div>
    </div>
  );
}
