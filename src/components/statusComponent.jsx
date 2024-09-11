import SubtitleText from "@/components/Subtitle";
import { useTranslation } from "react-i18next";
import colorjs from "color";
export default function RowStatus({ text }) {
  const { t } = useTranslation();
  const color = text == "1" ? "#219653" : "#F30000";
  return (
    <div
      className="flex flex-row items-center gap-2 py-2 px-4 rounded-full justify-center font-su w-fit"
      style={{
        backgroundColor: colorjs(color).alpha(0.1),
        color: colorjs(color).alpha(0.8),
      }}
    >
      {text == "1" ? t("Active") : t("Inactive")}
    </div>
  );
}
