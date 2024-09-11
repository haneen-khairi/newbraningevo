import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import BuildingsForm from "./form";
import { createBuilding } from "@/services/buildings";
import { useMutation } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
export default function CreateBuilding() {
  const globalModal = useResultModal();
  let createBuildingMutation = useMutation({
    mutationFn: createBuilding,
    mutationKey: ["createBuilding"],
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("buildingSuccessfullyCreated"),
      });
    },
    onError: (e) => {
      globalModal.error(
        t("somethingWentWrong"),
        t("failedToCreateBuilding"),
        e.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <div className="w-10/12 mx-auto">
      <CustomCard titleSlot={t("buildingInfo")}>
        <BuildingsForm
          form={form}
          onSubmit={createBuildingMutation.mutate}
          loading={createBuildingMutation.isPending}
        />
      </CustomCard>
    </div>
  );
}
