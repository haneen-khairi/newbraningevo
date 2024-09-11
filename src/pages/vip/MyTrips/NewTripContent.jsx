import { useTranslation } from "react-i18next";
import { MdElectricCar } from "react-icons/md";
import { useEffect, useState } from "react";
import NewMeeting from "./NewMeeting.jsx";
import Events from "../events/index.jsx";
import NewEvent from "./NewEvent.jsx";

export default function NewTripContent({
  selectedTab,
  setSelectedTab,
  selectedCoords,
  setSelectedCoords,
  onClose,
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex items-center gap-3"}>
        <TypeChip
          type={t("meeting")}
          isActive={selectedTab == "meeting"}
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6897 8H12.7497C14.128 8 15.2497 6.87833 15.2497 5.5V3C15.2497 1.62167 14.128 0.5 12.7497 0.5H7.74965C6.37132 0.5 5.24965 1.62167 5.24965 3V5.5C5.24965 6.87833 6.37132 8 7.74965 8H7.91798L9.44632 9.3475C9.68799 9.56083 9.99049 9.6675 10.293 9.6675C10.5913 9.6675 10.8897 9.5625 11.1247 9.35417L12.6897 8.00083V8ZM10.2922 7.87L8.78382 6.54167C8.63132 6.4075 8.43548 6.33333 8.23299 6.33333H7.74965C7.28965 6.33333 6.91632 5.95917 6.91632 5.5V3C6.91632 2.54083 7.28965 2.16667 7.74965 2.16667H12.7497C13.2097 2.16667 13.583 2.54083 13.583 3V5.5C13.583 5.95917 13.2097 6.33333 12.7497 6.33333H12.3797C12.1797 6.33333 11.9855 6.405 11.8347 6.53667L10.2922 7.87083V7.87ZM4.83298 15.5C6.44132 15.5 7.74965 14.1917 7.74965 12.5833C7.74965 10.975 6.44132 9.66667 4.83298 9.66667C3.22465 9.66667 1.91632 10.975 1.91632 12.5833C1.91632 14.1917 3.22465 15.5 4.83298 15.5ZM4.83298 11.3333C5.52215 11.3333 6.08298 11.8942 6.08298 12.5833C6.08298 13.2725 5.52215 13.8333 4.83298 13.8333C4.14382 13.8333 3.58298 13.2725 3.58298 12.5833C3.58298 11.8942 4.14382 11.3333 4.83298 11.3333ZM12.7497 12.5833C12.7497 14.1917 14.058 15.5 15.6663 15.5C17.2747 15.5 18.583 14.1917 18.583 12.5833C18.583 10.975 17.2747 9.66667 15.6663 9.66667C14.058 9.66667 12.7497 10.975 12.7497 12.5833ZM15.6663 11.3333C16.3555 11.3333 16.9163 11.8942 16.9163 12.5833C16.9163 13.2725 16.3555 13.8333 15.6663 13.8333C14.9772 13.8333 14.4163 13.2725 14.4163 12.5833C14.4163 11.8942 14.9772 11.3333 15.6663 11.3333ZM9.36382 19.3742C9.52465 19.805 9.30715 20.2858 8.87632 20.4475C8.77965 20.4833 8.68132 20.5008 8.58298 20.5008C8.24632 20.5008 7.92798 20.2942 7.80215 19.96C7.36298 18.7883 6.16965 18.0008 4.83298 18.0008C3.49632 18.0008 2.30298 18.7883 1.86382 19.96C1.70215 20.3917 1.22132 20.6067 0.790485 20.4475C0.359652 20.2858 0.142152 19.805 0.302985 19.3742C0.984652 17.555 2.80549 16.3333 4.83382 16.3333C6.86215 16.3333 8.68132 17.555 9.36382 19.3742ZM19.7097 20.4475C19.613 20.4833 19.5147 20.5008 19.4163 20.5008C19.0797 20.5008 18.7613 20.2942 18.6355 19.96C18.1963 18.7883 17.003 18.0008 15.6663 18.0008C14.3297 18.0008 13.1363 18.7883 12.6972 19.96C12.5355 20.3917 12.0547 20.6067 11.6238 20.4475C11.193 20.2858 10.9755 19.805 11.1363 19.3742C11.818 17.555 13.6388 16.3333 15.6672 16.3333C17.6955 16.3333 19.5155 17.555 20.198 19.3742C20.3588 19.805 20.1413 20.2858 19.7105 20.4475H19.7097Z"
                fill="currentColor"
              />
            </svg>
          }
          onClick={() => setSelectedTab("meeting")}
        />
        <TypeChip
          type={t("events")}
          isActive={selectedTab == "events"}
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5833 2.16667H15.75V1.33333C15.75 0.873333 15.3775 0.5 14.9167 0.5C14.4558 0.5 14.0833 0.873333 14.0833 1.33333V2.16667H7.41667V1.33333C7.41667 0.873333 7.04417 0.5 6.58333 0.5C6.1225 0.5 5.75 0.873333 5.75 1.33333V2.16667H4.91667C2.61917 2.16667 0.75 4.03583 0.75 6.33333V16.3333C0.75 18.6308 2.61917 20.5 4.91667 20.5H16.5833C18.8808 20.5 20.75 18.6308 20.75 16.3333V6.33333C20.75 4.03583 18.8808 2.16667 16.5833 2.16667ZM4.91667 3.83333H16.5833C17.9617 3.83333 19.0833 4.955 19.0833 6.33333V7.16667H2.41667V6.33333C2.41667 4.955 3.53833 3.83333 4.91667 3.83333ZM16.5833 18.8333H4.91667C3.53833 18.8333 2.41667 17.7117 2.41667 16.3333V8.83333H19.0833V16.3333C19.0833 17.7117 17.9617 18.8333 16.5833 18.8333ZM16.5833 12.1667C16.5833 12.6267 16.2108 13 15.75 13H5.75C5.28917 13 4.91667 12.6267 4.91667 12.1667C4.91667 11.7067 5.28917 11.3333 5.75 11.3333H15.75C16.2108 11.3333 16.5833 11.7067 16.5833 12.1667ZM10.75 15.5C10.75 15.96 10.3775 16.3333 9.91667 16.3333H5.75C5.28917 16.3333 4.91667 15.96 4.91667 15.5C4.91667 15.04 5.28917 14.6667 5.75 14.6667H9.91667C10.3775 14.6667 10.75 15.04 10.75 15.5Z"
                fill="currentColor"
              />
            </svg>
          }
          onClick={() => setSelectedTab("events")}
        />
      </div>
      {selectedTab == "meeting" && (
        <NewMeeting
          selectedCoords={selectedCoords}
          setSelectedCoords={setSelectedCoords}
          onClose={onClose}
        />
      )}
      {selectedTab == "events" && (
        <NewEvent
          selectedCoords={selectedCoords}
          setSelectedCoords={setSelectedCoords}
          onClose={onClose}
        />
      )}
    </div>
  );
}

function TypeChip({ type, isActive, icon, ...rest }) {
  const { t, i18n } = useTranslation();
  return (
    <div
      {...rest}
      className={
        "flex items-center justify-center gap-2 w-full rounded-full min-h-input border border-solid text-xl cursor-pointer"
      }
      style={{
        color: isActive ? "#38ACB1" : "#666666",
        borderColor: isActive ? "#38ACB1" : "#F2F2F2",
        backgroundColor: isActive ? "#F5F6FA" : "transparent",
      }}
    >
      {icon}
      <p>{type}</p>
    </div>
  );
}
