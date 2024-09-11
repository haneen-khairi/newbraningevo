import Button from "../../../../components/Button.jsx";
import { useLoading } from "./LoadingContext.jsx";
import { useTranslation } from "react-i18next";

export default function SubmitButton({ mode }) {
  const { t } = useTranslation();
  const { loading } = useLoading();
  return (
    <Button
      htmlType={"submit"}
      className={"w-full"}
      type={"primary"}
      loading={loading}
      form={mode == "meeting" ? "meetingForm" : "eventForm"}
    >
      {t("submit")}
    </Button>
  );
}
