import { Button, Input, Modal, Avatar } from "antd";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import { checkCode } from "@/services/requests";
import { CiUser } from "react-icons/ci";
import SubtitleText from "@/components/Subtitle";
import { FaEye } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import useResultModal from "@/hooks/useResultModal";
import { inviteTypes } from "@/enums/invite";

export default function ValidateRequest() {
  const [state, setState] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState(null);
  const globalModal = useResultModal();
  function validateCode() {
    if (state) {
      setState(null);
      setCode(null);
    } else {
      setIsSubmitting(true);
      checkCode(code)
        .then((res) => {
          setState(res.data);
          setModalOpen(true);
        })
        .catch((err) => {
          globalModal.error(
            t("invalidCode"),
            t("invalidCodeDesc"),
            err.response.data.errors.map((err) => <div>{err}</div>)
          );
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }
  return (
    <>
      {state && (
        <>
          <h1
            className="my-2 font-semibold"
            style={{
              color: state.invitation.isValid ? "green" : "red",
            }}
          >
            {state.invitation.title}
          </h1>
          <p
            style={{
              color: state.invitation.isValid ? "green" : "red",
              marginTop: "0.5rem",
            }}
            className="mb-3"
          >
            {state.invitation.description}
          </p>
        </>
      )}

      <Input
        className="rounded-lg inherit-input-bg"
        placeholder={t("enterCode")}
        onChange={(e) => setCode(e.target.value.trim().replace(/\s/g, ""))}
        value={code}
        suffix={
          <Button
            type={state != null ? "default" : "primary"}
            onClick={validateCode}
            disabled={code == null || code.length == 0}
            danger={state != null}
            className="font-semibold"
            loading={isSubmitting}
          >
            {state != null ? t("delete") : t("verify")}
          </Button>
        }
        prefix={
          state &&
          (state.invitation.isValid ? (
            <CiCircleCheck size={18} color="green" strokeWidth={1} />
          ) : (
            <CiCircleRemove size={18} strokeWidth={1} color="red" />
          ))
        }
      />

      {state && (
        <div className="mt-2 rounded-lg px-2 py-3 bg-[#38ACB10A] flex items-center justify-between font-bold">
          <div className="flex gap-2 items-center">
            <CiUser size={18} />
            <p>{state.requestGuest.guest.name}</p>
          </div>

          <div className="flex gap-2 items-center">
            <SubtitleText>
              <IoCalendarOutline size={18} />
            </SubtitleText>
            <p>
              {dayjs(state.request.validFrom).format("DD MMM YYYY - HH:mm a")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <SubtitleText>{t("hoster")}</SubtitleText>
            <p>
              {state.request?.requester?.name}{" "}
              {state.request?.party ? `(${state.request?.party})` : ""}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <SubtitleText>{t("building")}</SubtitleText>
            <p>{state.request?.room?.building?.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <SubtitleText>{t("inviteType")}</SubtitleText>
            <p>{t(inviteTypes[state.request?.type])}</p>
          </div>

          <div className="flex gap-2 items-center">
            <SubtitleText>{t("room")}</SubtitleText>
            <p>{state.request?.room?.name ?? "-"}</p>
          </div>
          <Link to={`/request/${state.request.id}`}>
            <Button
              className="bg-transparent"
              style={{
                borderRadius: "11px",
              }}
            >
              <FaEye className="align-middle " size={14} color="black" />
            </Button>
          </Link>
        </div>
      )}
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={false}
      >
        {state && (
          <div className="flex flex-col gap-1 items-center">
            {state.invitation.isValid && (
              <FaRegCircleCheck size={48} color="green" />
            )}
            {!state.invitation.isValid && (
              <FaRegCircleXmark size={48} color="red" />
            )}
            <h1
              className="font-semibold text-xl"
              style={{
                color: state?.invitation?.isValid ? "green" : "red",
              }}
            >
              {state?.invitation?.title ?? "الدعوة"}
            </h1>
            <p>{state?.invitation?.description ?? "الوصف"}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
