import { useTranslation } from "react-i18next";
import Drawer from "@/components/Drawer";
import Form from "./form";
import { Button } from "antd";
import { EditBusRoute, CreateBusRoute } from "@/services/bus_routes";
import { useQueryClient } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
export default function RoutesDrawer({ isOpen, onClose, id = null }) {
  const { t } = useTranslation();
  const client = useQueryClient();
  const globalModal = useResultModal();

  const type = id ? "edit" : "create";

  const successFunction = () => {
    client.invalidateQueries({ queryKey: ["busRoutes"] });
    onClose();
    globalModal.success({
      title: t("success"),
      subtitle:
        type == "create"
          ? t("routeCreatedSuccessfully")
          : t("routeUpdatedSuccessfully"),
    });
  };
  const errorFunction = () => {
    globalModal.error(
      t("somethingWentWrong"),
      type == "create"
        ? t("errorWhileCreatingRoute")
        : t("errorWhileUpdatingRoute")
    );
  };
  const mutate = id
    ? EditBusRoute({ onSuccess: successFunction, onError: errorFunction })
    : CreateBusRoute({ onSuccess: successFunction, onError: errorFunction });
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={t("addRoute")}
      width="500px"
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          htmlType="submit"
          form="bus-route-form"
        >
          {t("save")}
        </Button>
      }
    >
      <div className="w-full">
        <Form
          onSubmit={(v) => {
            const tempBuildings = [];
            for (let building of v.buildings) {
              if (v.parkings.includes(building)) {
                tempBuildings.push({
                  id: building,
                  isStopPoint: true,
                });
              } else {
                tempBuildings.push({
                  id: building,
                  isStopPoint: false,
                });
              }
            }
            v.description = "test";
            v.descriptionEn = "test";
            v.buildings = tempBuildings;
            mutate.mutate(v);
          }}
          initialValues={id}
        />
      </div>
    </Drawer>
  );
}
