import { t } from "i18next";
import { Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { fetchOneGuest, updateGuest } from "@/services/guests";
import { useEffect } from "react";
import GuestForm from "./form";
export default function EditGuest() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const updateGuestMutation = useMutation({
    mutationKey: "updateGuest",
    mutationFn: (values) => {
      if (typeof values.phoneNumber == "object") {
        delete values.phoneNumber;
      }
      return updateGuest({ id, ...values });
    },
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("guestUpdatedSuccessfully"),
      });
      navigate("/organization");
    },
    onError: (error) => {
      globalModal.error(
        t("error"),
        error.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });
  const { data, isPending, error } = useQuery({
    queryKey: ["guest", id],
    queryFn: () => fetchOneGuest(id),
  });
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue(data?.data);
    }
  }, [data]);

  return (
    <>
      <GuestForm
        form={form}
        initialValues={data?.data}
        image={data?.data?.picture}
        isFetching={isPending}
        loading={updateGuestMutation.isPending}
        onSubmit={updateGuestMutation.mutate}
      />
    </>
  );
}
