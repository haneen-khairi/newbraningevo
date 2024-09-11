import colorjs from "color";
import { useTranslation } from "react-i18next";
function getColor(status) {
  switch (status) {
    case "New" || "1":
      return "#E38200";
    case "Pending" || "2" || "5" || "ChangeTrip":
      return "#E38200";
    case "Completed" || "3":
      return "#219653";
    case "Canceled" || "4":
      return "#F30000";
  }
}

// 1 - new - #9B51E0
// 2- pending - #E38200
// 3- completed - #219653
// 4- canceled - #F30000
// 5- pending - #E38200

export default function StatusIndicator({ v }) {
  const { t } = useTranslation();
  return (
    <div
      className="px-3 py-2 rounded-full w-fit font-su text-center min-w-[40px]"
      style={{
        color: getColor(String(v)),
        backgroundColor: colorjs(getColor(String(v))).alpha(0.1),
      }}
    >
      {t(v)}
    </div>
  );
}
