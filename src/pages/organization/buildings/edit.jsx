import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import BuildingsForm from "./form";
import { updateBuilding, fetchBuilding } from "@/services/buildings";
import { useMutation, useQuery } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function EditBuilding() {
  const { id } = useParams();
  const globalModal = useResultModal();
  let updateBuildingMutation = useMutation({
    mutationFn: (values) => updateBuilding({ id, ...values }),
    mutationKey: ["updateBuilding"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("buildingSuccessfullyUpdated"),
      });
    },
    onError: (e) => {
      globalModal.error(
        t("somethingWentWrong"),
        t("failedToUpdateBuilding"),
        e.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });
  const { data: building, isPending: buildingLoading } = useQuery({
    queryKey: ["building", id],
    queryFn: () => fetchBuilding(id),
  });
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (building?.data) {
      form.setFieldsValue(building?.data);
    }
  }, [building]);
  return (
    <div className="w-10/12 mx-auto">
      <CustomCard titleSlot={t("buildingInfo")}>
        <BuildingsForm
          initialValues={building?.data}
          form={form}
          onSubmit={updateBuildingMutation.mutate}
          loading={updateBuildingMutation.isPending}
        />
      </CustomCard>
    </div>
  );
}
