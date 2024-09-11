import { Button, Drawer } from "antd";
import CategoryForm from "./form";
import FlatButton from "@/components/FlatButton";
import { IoClose } from "react-icons/io5";
import FormButton from "@/components/forms/FormButton";
import { useTranslation } from "react-i18next";
import { mutateVipCategory } from "../../../hooks/useVipCategories";
import { useQueryClient } from "@tanstack/react-query";
export default function CategoryDrawer({ isOpen, onClose, id = null }) {
  const { t } = useTranslation();
  const mutate = mutateVipCategory({
    id,
    onSuccess: () => {
      onClose();
      client.invalidateQueries({ queryKey: ["vipCategories"] });
    },
  });
  const client = useQueryClient();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={null}
      placement="left"
      size="large"
      title={id ? t("editCategory") : t("addCategory")}
      headerStyle={{
        backgroundColor: "#fafafa",
        borderBottom: "none",
      }}
      footer={
        <FormButton
          className="w-full rounded-2xl"
          type="primary"
          htmlType="submit"
          form="categoryForm"
          loading={mutate.isPending}
        >
          {t("save")}
        </FormButton>
      }
      extra={
        <FlatButton shape="circle" onClick={onClose}>
          <IoClose color="black" />
        </FlatButton>
      }
    >
      <CategoryForm
        inital_values={id}
        onSubmit={(values) => {
          mutate.mutate(values);
        }}
      />
    </Drawer>
  );
}
