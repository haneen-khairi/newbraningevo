import { Button } from "antd";
import Drawer from "@/components/Drawer";

import BusForm from "./form";
import FlatButton from "@/components/FlatButton";
import { IoClose } from "react-icons/io5";
import FormButton from "@/components/forms/FormButton";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { EditBus, CreateBus } from "@/services/busses";
import useResultModal from "@/hooks/useResultModal";
export default function BusDrawer({ isOpen, onClose, id = null }) {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const client = useQueryClient();
  const mutate = id
    ? EditBus(
        () => {
          globalModal.success({
            title: t("updatedSuccessfully"),
            subtitle: t("busUpdatedSuccessfully"),
          });
          client.invalidateQueries({ queryKey: ["busses"] });
          onClose();
        },
        () => {
          globalModal.error(t("error"), t("errorWhileUpdatingBus"));
        }
      )
    : CreateBus(
        () => {
          globalModal.success({ title: t("createdSuccessfully") });
          client.invalidateQueries({ queryKey: ["busses"] });
          onClose();
        },
        () => {
          globalModal.error(t("error"), t("errorWhileCreatingBus"));
        }
      );
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={null}
      placement="left"
      size="large"
      title={id ? t("editBus") : t("addBus")}
      headerStyle={{
        backgroundColor: "#fafafa",
        borderBottom: "none",
      }}
      footer={
        <FormButton
          className="w-full rounded-2xl"
          type="primary"
          htmlType="submit"
          form="busForm"
          loading={mutate.isPending}
        >
          {t("save")}
        </FormButton>
      }

    >
      <BusForm
        inital_values={id}
        onSubmit={(values) => {
            try {
                values.color = values.color.toHexString();
            }catch (e) {
                values.color = values.color;
            }
            try {
                values.routeColor = values.routeColor.toHexString();
            }catch (e) {
                values.routeColor = values.routeColor
            }
            if(values.UploadFiles && values.UploadFiles.length > 0){
                values.UploadFile = values.UploadFiles[0]
            }
          values.StatusId = values.isActive ? 1 : 2;
          mutate.mutate(values);
        }}
        isLoading={mutate.isPending}
      />
    </Drawer>
  );
}
