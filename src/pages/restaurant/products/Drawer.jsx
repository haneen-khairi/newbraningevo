import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import PAdd from "./PAdd";
import PEdit from "./PEdit";
import Drawer from "@/components/Drawer";
export default function ProductDrawer({ isOpen, onClose, id }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mode = isOpen && id ? "edit" : "create";

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={t("details")}
      width={"30vw"}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          htmlType="submit"
          form="productForm"
          loading={isSubmitting}
        >
          {t("save")}
        </Button>
      }
    >
      {mode === "create" ? (
        <PAdd setIsSubmitting={setIsSubmitting} onClose={()=>{
            setIsSubmitting(false);
            onClose();
        }} />
      ) : (
        <PEdit id={id} setIsSubmitting={setIsSubmitting} onClose={()=>{
            setIsSubmitting(false);
            onClose();
        }} />
      )}
    </Drawer>
  );
}
