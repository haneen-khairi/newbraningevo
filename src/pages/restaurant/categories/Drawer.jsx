import Drawer from "@/components/Drawer";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import AddCategory from "./CAdd";
import EditCategory from "./CEdit";

export default function CategoryDrawer({ isOpen, onClose, id = null }) {
  const { t } = useTranslation();
  const mode = isOpen && id ? "edit" : "create";
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width="30vw"
      title={mode === "edit" ? t("editCategory") : t("addCategory")}
      closeIcon={false}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          form="categoryForm"
          htmlType="submit"
        >
          {t("save")}
        </Button>
      }
    >
      {mode === "edit" ? <EditCategory id={id} onClose={onClose} /> : <AddCategory onClose={onClose} />}
    </Drawer>
  );
}
