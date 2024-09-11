import { Button, Drawer } from "antd";
import CarForm from "./form";
import FlatButton from "@/components/FlatButton";
import { IoClose } from "react-icons/io5";
import FormButton from "@/components/forms/FormButton";
import { useTranslation } from "react-i18next";
import { mutateVipCar } from "../../../hooks/useVipCars";
import { useQueryClient } from "@tanstack/react-query";
import useResultModal from "../../../hooks/useResultModal.js";
import Normalize from "@/utils/errorNormalizer";
export default function CarDrawer({ isOpen, onClose, id = null }) {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const mutate = mutateVipCar({
    id,
    onSuccess: () => {
      onClose();
      client.invalidateQueries({ queryKey: ["vipCars"] });
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("carUpdatedSuccessfully"),
      });
    },
      onError: (e) => {
          const error = Normalize(e);
          globalModal.error(t("error"), error);
      }
  });
  const client = useQueryClient();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      closeIcon={null}
      placement="left"
      size="large"
      title={id ? t("editCar") : t("addCar")}
      headerStyle={{
        backgroundColor: "#fafafa",
        borderBottom: "none",
      }}
      footer={
        <FormButton
          className="w-full rounded-2xl"
          type="primary"
          htmlType="submit"
          form="carForm"
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
      <CarForm
        inital_values={id}
        onSubmit={(values) => {
            try {
                values.color = values.color.toHexString();
            }catch (e) {
                values.color = values.color;
            }
            if(values.UploadFiles && values.UploadFiles.length > 0){
                values.UploadFile = values.UploadFiles[0]
            }
          values.statusId = 1;
          mutate.mutate(values);
        }}
      />
    </Drawer>
  );
}
