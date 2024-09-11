import { Flex } from "antd";
import { LuClock2 } from "react-icons/lu";
import bell from "@/assets/bell.png";
import dayjs from "dayjs";
import { readNotification } from "@/services/notifications";
import useTheme from "../../hooks/useTheme";
export default function NotificationItem({
  item,
  refetch,
  onClick = () => {},
}) {
  const { token } = useTheme();
  return (
    <Flex
      onClick={async (e) => {
        await readNotification(item.id);
        refetch();
        onClick();
      }}
      gap="middle"
      style={{
        padding: "10px",
        wordBreak: "break-word",
        alignItems: "center",
      }}
    >
      <img src={bell} width={"23px"} height={"26px"} />
      <div className="flex flex-col gap-2">
        <p>{item.body}</p>
        <div
          id="time"
          style={{
            color: "#a9a9a9",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LuClock2
            style={{
              color: token.colorPrimary,
              marginLeft: "5px",
            }}
            size={"18px"}
          />
          <span>{dayjs(item.createdAt).format("DD MMMM YYYY, h:mm a")}</span>
          {/* <span>11 سبتمبر 2023 , 02:30 مساء</span> */}
        </div>
      </div>
    </Flex>
  );
}
