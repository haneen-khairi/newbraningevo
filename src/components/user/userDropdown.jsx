import { Flex, Avatar, Dropdown, Divider } from "antd";
import useTheme from "../../hooks/useTheme";
import CustomTypograhy from "../Typography";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, toggleStatus } from "@/slices/AuthSlice";
import { setTheme } from "@/slices/themeSlice";
import { t } from "i18next";
import { editSelf, getSelf } from "@/services/users";
import createSignalRConnection from "@/services/signalr";
import { useEffect } from "react";

export default function UserDropdown(props) {
  const { token } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection.on("CRUD", (page, action) => {
      if (page == "Users" && action == "Update") {
        getSelf().then((res) => {
          dispatch(
            toggleStatus({
              user: res.data,
            })
          );
        });
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);
  const splitName = user?.fullName?.includes("@")?user?.fullName?.split("@"):user?.fullName?.split(" ");
  return (
    <Dropdown
      menu={{
        items: [
          {
            label: t("profile"),
            onClick: () => {
              navigate("/profile");
            },
          },

          {
            label: user.status == 1 ? t("goOffline") : t("goOnline"),
            onClick: async () => {
              const result = await editSelf({
                status: user.status == 1 ? "offline" : "online",
              });
              dispatch(toggleStatus(result?.data));
            },
          },

          {
            label: t("logout"),
            danger: true,
            onClick: () => {
              dispatch(logout());
              dispatch(setTheme("light"));
            },
          },
        ],
        style: {
          padding: "10px",
        },
      }}
    >
      <Flex gap={"small"} align="center">
        <div className="relative">
          <Avatar
            style={{
              border: "1px solid " + token.colorPrimary,
            }}
            src={user.imageProfile}
          >
            {user.fullName?.[0] ?? user.userName}
          </Avatar>
          <div
            className="w-3 h-3 z-10 absolute bottom-0 left-0"
            style={{
              backgroundColor: user.status == 1 ? "green" : "red",
              borderRadius: "50%",
            }}
          ></div>
        </div>

        <Flex vertical>
          <CustomTypograhy
            style={{
              color: "White",
            }}
          >
            {splitName &&splitName.length > 1 ? splitName[0] : user.fullName}
          </CustomTypograhy>
          <CustomTypograhy
            style={{
              fontSize: "12px",
            }}
          >
            {user.jobTitle ?? "-"}
          </CustomTypograhy>
        </Flex>
        <IoIosArrowDown color="white" />
      </Flex>
    </Dropdown>
  );
}
