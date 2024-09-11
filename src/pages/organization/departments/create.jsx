import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import { Form, Modal } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createDepartment,
  updateDepartment,
  fetchOneDepartment,
} from "@/services/departments";

//Custom Form components
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormButton from "@/components/forms/FormButton";
//Toast
import { toast } from "react-toastify";
import { useEffect } from "react";
import useResultModal from "@/hooks/useResultModal";
export default function CreateDepartment() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const depId = searchParams.get("depId");
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const createDepartmentMutation = useMutation({
    mutationFn: (values) => {
      createDepartment(values);
    },
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("departmentCreatedSuccessfully"),
      });
      navigate("/organization/");
    },
    onError: () => {
      globalModal.error(t("somethingWentWrong"), t("departmentNotCreated"));
    },
  });
  const updateDepartmentMutation = useMutation({
    mutationFn: (values) => {
      updateDepartment(values);
    },
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("departmentUpdatedSuccessfully"),
      });
      navigate("/organization/");
    },
    onError: () => {
      globalModal.error(t("somethingWentWrong"), t("departmentNotCreated"));
    },
  });
  const getExistingDepartment = useQuery({
    queryKey: ["department", depId],
    queryFn: () => fetchOneDepartment(depId),
    enabled: !!depId,
  });
  useEffect(() => {
    if (getExistingDepartment.isSuccess) {
      form.setFieldsValue({
        ...getExistingDepartment.data?.data,
        isActive: getExistingDepartment.data?.data?.isActive?.toString(),
      });
    }
  }, [getExistingDepartment.isPending]);

  function handleSubmit(values) {
    if (depId) {
      updateDepartmentMutation.mutate({
        ...values,
        id: depId,
      });
    } else {
      createDepartmentMutation.mutate(values);
    }
  }
  return (
    <div className="w-10/12 mx-auto">
      <CustomCard titleSlot={t("departmentInfo")}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          name="create-department"
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
          <div className="flex items-center justify-center">
            <FormButton
              htmlType="submit"
              className="w-1/2 mx-auto"
              type="primary"
              loading={createDepartmentMutation.isPending}
            >
              {t("saveAndSubmit")}
            </FormButton>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
}
