import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Drawer from "@/components/Drawer";

import FlatButton from "@/components/FlatButton";
import { IoClose } from "react-icons/io5";
import DriverForm from "./form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { CreateBusDriver, EditBusDriver } from "@/services/bus_drivers";
import errorNormalizer from "@/utils/errorNormalizer";
export default function DrawerPage({ isOpen, onClose }) {
  const { t } = useTranslation();
  const mode = isOpen && isOpen?.id ? "edit" : "create";
  const globalModal = useResultModal();
  const client = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (values) =>
      mode == "create"
        ? CreateBusDriver({
            ...values,
            isActive: values.status == 1 ? true : false,
            phoneNumber: "+966" + values.phoneNumber,
          })
        : EditBusDriver({
            ...values,
            id: isOpen.userInfo.id,
            isActive: values.status == 1 ? true : false,
            phoneNumber: "+966" + values.phoneNumber,
          }),
    onSuccess: () => {
      onClose();
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create"
            ? t("driverCreatedSuccessfully")
            : t("driverUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["busDrivers"] });
    },
    onError: (error) => {
      let message = errorNormalizer(error);
      globalModal.error(t("somethingWentWrong"), message);
    },
  });

  const onSubmit = (values) => {
    createMutation.mutate(values);
  };
  return (
    <>
      <Drawer
        title={t("addDriver")}
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={"30%"}
        footer={
          <Button
            htmlType="submit"
            type="primary"
            className="w-full rounded-xl h-full"
            form="driver-form"
            loading={createMutation.isPending}
          >
            {t("save")}
          </Button>
        }
      >
        <DriverForm onSubmit={onSubmit} initialValues={isOpen} mode={mode} />
      </Drawer>
    </>
  );
}
