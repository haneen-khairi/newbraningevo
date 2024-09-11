import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "antd";
import FlatButton from "@/components/FlatButton";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import DrawerForm from "./form";
export default function DrawerPage({ isOpen, onClose, initialValues }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <Drawer
        title={t("addDriver")}
        placement="left"
        closable={false}
        onClose={onClose}
        open={isOpen}
        width={"30%"}
        footer={
          <Button
            htmlType="submit"
            form="vip-driver-form"
            type="primary"
            className="w-full rounded-xl"
            loading={isSubmitting}
          >
            {t("submit")}
          </Button>
        }
        headerStyle={{
          borderBottom: "none",
          backgroundColor: "#FAFAFA",
        }}
        extra={
          <FlatButton
            shape="circle"
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <IoClose size={20} />
          </FlatButton>
        }
      >
        <DrawerForm initialValues={initialValues} onClose={onClose} setIsLoading={setIsSubmitting} />
      </Drawer>
    </>
  );
}
