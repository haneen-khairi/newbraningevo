//components
import { Avatar, Drawer, Button } from "antd";
import SubtitleText from "@/components/Subtitle";
import FormButtom from "@/components/forms/FormButton";
import CustomCard from "@/components/CardWithHeader";
import AvatarImage from "@/assets/avatar-image.webp";
import FlatButton from "@/components/FlatButton";
//icons
import { LuPhoneCall } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { VscEye } from "react-icons/vsc";

//hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { ACCOUNT_TYPES } from "../../../enums/accountType";
export default function EmployeeDrawer({ isOpen, setIsOpen, data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useTheme();
  return (
    <Drawer
      size="large"
      title={t("employeeDetails")}
      placement="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{
        backgroundColor: token.secondaryColor,
      }}
      closeIcon={false}
      footer={
        <div id="bottom-buttons">
          <FormButtom
            htmlType="submit"
            type="primary"
            className="w-full"
            size="large"
            onClick={() => {
              setIsOpen(false);
              navigate("/create-employee?userId=" + data.id);
            }}
          >
            {t("editDetails")}
          </FormButtom>
        </div>
      }
      extra={
        <FlatButton
          shape="circle"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <IoMdClose className="align-middle" size={21} />
        </FlatButton>
      }
    >
      <div className="h-full flex flex-col justify-between">
        <CustomCard className="drop-shadow-lg">
          <div className="flex gap-4 border-b border-solid border-b-gray-100 pb-4">
            <Avatar size={64} src={AvatarImage} />
            <div className="grow flex flex-col gap-4">
              <div className="flex justify-between font-semibold">
                <p>{data?.name}</p>
                <div
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: token.geekblue1,
                    color: token.primaryTextColor,
                  }}
                >
                  {data?.jobTitle}
                </div>
              </div>
              <div className="flex gap-4 justify-between font-semibold">
                <p className="flex gap-2 items-center">
                  <SubtitleText>
                    <LuPhoneCall size={20} className="align-middle" />
                  </SubtitleText>
                  {data?.phoneNumber}
                </p>
                <p className="flex gap-2 items-center">
                  <SubtitleText>
                    <IoCalendarOutline size={20} className="align-middle" />
                  </SubtitleText>
                  12 ديسمبر 2023
                </p>
                <p className="flex gap-2 items-center">
                  <SubtitleText>
                    <CiGlobe size={20} className="align-middle" />
                  </SubtitleText>
                  {data?.nationality?.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 font-semibold">
            <div className="flex gap-4">
              <SubtitleText>{t("email")}</SubtitleText>
              <a href={`mailto:${data?.email}`}>{data?.email}</a>
            </div>
            <div className="flex gap-4">
              <SubtitleText>{t("accountType")}</SubtitleText>
              <p>{t(ACCOUNT_TYPES[data?.type])}</p>
            </div>
          </div>
        </CustomCard>
      </div>
    </Drawer>
  );
}
