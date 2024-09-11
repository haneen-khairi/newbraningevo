import { Flex, Skeleton } from "antd";
import PublicTableBG from "@/assets/publictable.png";
import Logo from "@/assets/logo.png";
import dayjs from "dayjs";
import { BiBuildingHouse } from "react-icons/bi";
import { SlFrame } from "react-icons/sl";
import { BsFullscreen } from "react-icons/bs";

import { fetchAllRequests } from "@/services/requests";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import createSignalRConnection from "../../services/signalr";
export default function PublicTable() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["requests", "1"],
    queryFn: () =>
      fetchAllRequests({
        isToday: true,
        isUpcoming: true,
        isRequesterOnly: false,
        isGuestInPlace: false,
        isAttended: false,
        status: 1,
      }),
  });
  const [connection, setConnection] = useState(null);
  const [isFullScreen, setFullScreen] = useState(false);
  function toggleFullScreen() {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.getElementById("bg-image-container").requestFullscreen();
    }
    setFullScreen(!isFullScreen);
  }
  useEffect(() => {
    let connection = createSignalRConnection();
    connection.start();
    connection?.on("CRUD", (page, action) => {
      if (
        (page == "RequestsScreens" && action == "Update") ||
        page == "Requests"
      ) {
        refetch();
      }
    });
    return () => {
      connection?.stop();
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${PublicTableBG})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        minWidth: "100%",
      }}
      id="bg-image-container"
    >
      <BsFullscreen
        size={36}
        onClick={toggleFullScreen}
        className="cursor-pointer fixed top-10 left-24 text-white opacity-10 hover:opacity-80 transition-all "
      />
      <Flex
        vertical
        gap={24}
        style={{
          width: "90%",
          margin: "0 auto",
          paddingTop: "3rem",
        }}
      >
        <img src={Logo} width={128}></img>
        <Flex
          justify="space-between"
          className="text-white p-8 rounded-2xl"
          style={{
            background:
              "linear-gradient(89.98deg, #2DA1A6 0.01%, #1D9EA4 100.52%)",
          }}
        >
          <Flex vertical gap={6}>
            <h1 className="text-4xl">نحن سعداء برؤيتكم</h1>
            <h3 className="text-2xl">نتمنى لكم يوما سعيدا</h3>
          </Flex>
          <Flex vertical gap={6}>
            <h1 className="text-4xl">{dayjs().format("DD MMMM YYYY")}</h1>
            <h3 className="text-2xl">{dayjs().format("hh:mm A")}</h3>
          </Flex>
        </Flex>
        {isPending && <Skeleton />}
        {data?.data.map((invite) => (
          <Flex
            id="invite-entry"
            justify="space-between"
            className="p-4 rounded-xl bg-[#1A1B24] text-white"
          >
            <Flex className="gap-4">
              <div
                id="time"
                className="flex flex-col items-center justify-center p-4 bg-[#FFFFFF12] rounded-lg"
              >
                <h1 className="text-4xl text-cyan-200">
                  {dayjs(invite.createdAt).format("hh:mm")}
                </h1>
                <h3 className="text-2xl">
                  {dayjs(invite.createdAt).format("a") == "م"
                    ? "مساءا"
                    : "صباحا"}
                </h3>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <h1 className="text-4xl">{invite.subject}</h1>
                <h3 className="text-2xl">{invite.party}</h3>
              </div>
            </Flex>
            <Flex gap={12} align="center" className="text-cyan-200">
              <BiBuildingHouse size={24} />
              <h1 className="text-3xl ">{invite.room.name}</h1>
            </Flex>
          </Flex>
        ))}
        <div
          style={{
            marginBottom: "3rem",
          }}
        ></div>
      </Flex>
    </div>
  );
}
