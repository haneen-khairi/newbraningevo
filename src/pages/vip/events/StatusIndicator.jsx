import colorjs from "color";
import { useTranslation } from "react-i18next";
function getColor(status) {
  switch (status) {
    case "1":
      return "#E38200";
    case "2":
      return "#E38200";
    case "3":
      return "#219653";
  }
}

export default function StatusIndicator({ v }) {
  const { t } = useTranslation();
  function getText(status) {
    switch (status) {
      case "1":
        return t("current");
      case "2":
        return t("current");
      case "3":
        return t("expired");
    }
  }

  return (
    <div
      className="px-3 py-2 rounded-full w-fit font-su"
      style={{
        color: getColor(String(v)),
        backgroundColor: colorjs(getColor(String(v))).alpha(0.1),
      }}
    >
      {getText(String(v))}
    </div>
  );
}
