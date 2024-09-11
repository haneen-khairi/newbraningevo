import MapDrawer from "@/components/MapDrawer";
import useResultModal from "@/hooks/useResultModal";
import { EditBusEvent } from "@/services/bus_events";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditForm from "./form";
export default function EditStatusAndPermissions({ isOpen, onClose }) {
  const { t } = useTranslation();

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const globalModal = useResultModal();

  const Mutation = useMutation({
    mutationFn: (values) => EditBusEvent(values),
    onSuccess: () => {
      onClose();
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("eventUpdatedSuccessfully"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  const onSubmit = (values) => {
    console.log(values);

    // Mutation.mutate(values);
  };

  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={t("edit")}
      drawerContent={<EditForm onSubmit={onSubmit} initialValues={isOpen} />}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          htmlType="submit"
          form="user-form"
          loading={Mutation.isPending}
        >
          {t("save")}
        </Button>
      }
    ></MapDrawer>
  );
}
