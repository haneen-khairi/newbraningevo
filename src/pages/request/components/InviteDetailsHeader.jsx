import AcceptOrRejectButtons from "./AcceptOrReject";
import { t } from "i18next";
import { IoCalendarOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import SubtitleText from "@/components/Subtitle";
import dayjs from "dayjs";
import { inviteTypes } from "@/enums/invite";
import useTheme from "@/hooks/useTheme";
import { statusEnum } from "@/components/InviteStatus";
export default function InviteDetailsHeader({ invite, refetch }) {
  const { token } = useTheme();
  return (
    <>
      <div className="rounded-xl border border-gray-200 border-solid">
        <div className="block py-3 px-2 font-semibold border-b border-b-gray-200 border-solid flex justify-between items-center">
          <span className="text-xl">{invite.subject}</span>
          {invite.canEditStatus && (
            <div>
              <AcceptOrRejectButtons
                id={invite.id}
                refetch={refetch}
                invite={invite}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-between py-2 px-2 ">
          <p className="flex gap-2 items-center">
            <IoCalendarOutline
              className="text-gray-400"
              size={18}
            ></IoCalendarOutline>
            <div className="flex gap-3">
              {dayjs(invite.validTo) &&
              dayjs(invite.validFrom).isSame(dayjs(invite.validTo), "day") ? (
                <div>
                  {dayjs(invite.validFrom).format("DD MMMM YYYY , HH:mm")} -{" "}
                  {dayjs(invite.validTo).format("HH:mm")}
                </div>
              ) : (
                <>
                  <div>{t("from")}</div>
                  <div className="font-semibold">
                    {dayjs(invite.validFrom).format("DD MMMM YYYY , HH:mm")}
                  </div>
                  {invite.validTo && (
                    <>
                      <div>{t("to")}</div>
                      <div className="font-semibold">
                        {dayjs(invite.validTo).format("DD MMMM YYYY , HH:mm")}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </p>
          <div className="flex gap-8 font-semibold">
            <p className="flex gap-2">
              <SubtitleText>{t("invited")}</SubtitleText>
              {invite?.attendants?.total}
            </p>
            <p className="flex gap-2">
              <FaCircle className="text-green-500" />
              <SubtitleText>{t("attended")}</SubtitleText>
              {invite?.attendants?.attended}
            </p>
            <p className="flex gap-2">
              <FaCircle className="text-orange-500" />
              <SubtitleText>{t("notAttended")}</SubtitleText>
              {invite?.attendants?.absent}
            </p>
          </div>
        </div>
        <div className="flex justify-between py-2 px-2 font-semibold">
          <div className="flex gap-2">
            <SubtitleText>{t("inviteType")}</SubtitleText>
            {t(inviteTypes[invite.type])}
          </div>
          <div className="flex gap-2">
            <SubtitleText>{t("inviteStatus")}</SubtitleText>
            {t(statusEnum[invite.status])}
          </div>
        </div>
      </div>
      <div
        className="flex rounded-lg px-1 py-5 gap-5"
        style={{
          backgroundColor: token.colorSecondary,
        }}
      >
        <p className="font-semibold">
          <SubtitleText className="m-2">{t("buildingName")}</SubtitleText>
          {invite?.room?.building?.name ?? "-"}
        </p>
        <p className="font-semibold">
          <SubtitleText className="m-2">{t("floor")}</SubtitleText>
          {invite?.room?.floor?.name ?? "-"}
        </p>
        <p className="font-semibold">
          <SubtitleText className="m-2">{t("room")}</SubtitleText>
          {invite.room?.name}
        </p>
      </div>
      <div
        className="rounded-lg py-3 px-2 flex flex-col gap-2 font-semibold"
        style={{
          backgroundColor: token.colorSecondary,
        }}
      >
        <p>
          <SubtitleText>{t("hoster")}</SubtitleText>
        </p>
        <p>
          {invite?.requester?.name} {invite?.party ? `(${invite?.party})` : ""}
        </p>
      </div>
      <div className="rounded-lg py-3 px-2 border border-gray-200 border-solid flex flex-col gap-2">
        <p>
          <SubtitleText>{t("notes")}</SubtitleText>
        </p>
        <p>{invite.notes ?? t("noNotes")}</p>
      </div>
    </>
  );
}
