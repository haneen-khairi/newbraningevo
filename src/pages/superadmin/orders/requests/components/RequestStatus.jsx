import colorjs from "color";
import { useTranslation } from "react-i18next";
const statusText = (status) => {
  const stringStatus = String(status);
  switch (stringStatus) {
    case "1":
      return "incoming";
    case "2":
      return "current";
    case "3":
      return "current";
    case "4":
      return "current";
    case "5":
      return "completed";
    case "8":
      return "awaitingDriver";
    case "12":
      return "cancelRequest";
    default:
      return "canceled";
  }
};

const statusColor = (status) => {
  const stringStatus = String(status);
  switch (stringStatus) {
    case "1":
      return "#38ACB1";
    case "2":
      return "#E38200";
    case "3":
      return "#E38200";
    case "4":
      return "#E38200";
    case "5":
      return "#219653";
    case "8":
      return "#F30000";
    default:
      return "#4F4F4F";
  }
};
export default function RequestStatus({ status }) {
  const { t } = useTranslation();
  return (
    <div
      className="flex items-center gap-2 py-3 px-4 rounded-full justify-center font-bold"
      style={{
        backgroundColor: colorjs(statusColor(status)).alpha(0.1),
        color: statusColor(status),
      }}
    >
      {t(statusText(status))}
    </div>
  );
}
