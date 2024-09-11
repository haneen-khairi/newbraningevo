import GuestForm from "./form";
import { createGuest } from "@/services/guests";
import { useMutation } from "@tanstack/react-query";
import useResultModal from "@/hooks/useResultModal";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
export default function CreateGuest() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const createGuestMutation = useMutation({
    mutationKey: "createGuest",
    mutationFn: (values) => createGuest(values),
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("guestCreatedSuccessfully"),
      });
      navigate("/organization");
    },
    onError: (error) => {
      globalModal.error(error.message, t("error"));
    },
  });
  return (
    <GuestForm
      form={form}
      loading={createGuestMutation.isPending}
      onSubmit={createGuestMutation.mutate}
    />
  );
}
