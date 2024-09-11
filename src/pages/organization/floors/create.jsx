import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import { Form, Modal } from "antd";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createFloor, updateFloor, fetchFloor } from "@/services/floors";

//Custom Form components
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormButton from "@/components/forms/FormButton";
//Toast
import { useEffect } from "react";
import useResultModal from "@/hooks/useResultModal";
import useBuildings from "@/hooks/useBuildings";
export default function CreateFloor() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { floorId } = useParams();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const { data: buildings } = useBuildings();
  const createFloorMutation = useMutation({
    mutationFn: (values) => {
      createFloor(values);
    },
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("floorCreatedSuccessfully"),
      });
      navigate("/organization/");
    },
    onError: () => {
      globalModal.error(t("somethingWentWrong"), t("floorNotCreated"));
    },
  });
  const getExistingFloor = useQuery({
    queryKey: ["floor", floorId],
    queryFn: () => fetchFloor(floorId),
    enabled: floorId ? true : false,
    staleTime: 0,
  });
  const updateFloorMutation = useMutation({
    mutationFn: (values) => {
      updateFloor(values);
    },
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("floorUpdatedSuccessfully"),
      });
      navigate("/organization/");
      getExistingFloor.refetch();
    },
    onError: () => {
      globalModal.error(t("somethingWentWrong"), t("floorNotCreated"));
    },
  });

  useEffect(() => {

    if (getExistingFloor.isSuccess) {
      form.setFieldsValue({
        ...getExistingFloor.data?.data,
        isActive: getExistingFloor.data?.data?.isActive?.toString(),
      });
    }
  }, [getExistingFloor.isPending]);

  function handleSubmit(values) {
    if (floorId) {
      updateFloorMutation.mutate({
        ...values,
        id: floorId,
      });
    } else {
      createFloorMutation.mutate(values);
    }
  }
  return (
    <div className="w-10/12 mx-auto">
      <CustomCard titleSlot={t("floorInfo")}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          name="create-floor"
        >
          <div className="flex gap-4">
            <Form.Item
              className="grow"
              name="nameAr"
              label={t("nameInAr")}
              rules={[{ required: true }]}
            >
              <FormInput size="large" placeholder={t("nameInAr")} />
            </Form.Item>

            <Form.Item
              className="grow"
              name="nameEn"
              label={t("nameInEn")}
              rules={[{ required: true }]}
            >
              <FormInput size="large" placeholder={t("nameInEn")} />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item
              className="grow"
              name={"buildingId"}
              label={t("building")}
            >
              <FormSelect
                size="large"
                placeholder={t("building")}
                options={buildings?.data}
                fieldNames={{
                  label: "name",
                  value: "id",
                }}
              />
            </Form.Item>
            <Form.Item className="grow" name={"isActive"} label={t("status")}>
              <FormSelect
                size="large"
                placeholder={t("status")}
                options={[
                  { value: "true", label: t("active") },
                  { value: "false", label: t("inActive") },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center">
            <FormButton
              htmlType="submit"
              className="w-1/2 mx-auto"
              type="primary"
              loading={createFloorMutation.isPending}
            >
              {t("saveAndSubmit")}
            </FormButton>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
}
