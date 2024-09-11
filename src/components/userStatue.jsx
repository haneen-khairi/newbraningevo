import colorjs from "color";
import { useTranslation } from "react-i18next";
function getColor(status) {
  switch (status) {
    case "1":
      return "#219653";
    case "2":
      return "#F30000";
    case "3":
      return "#4F4F4F";
  }
}

export default function UserStatus({ v }) {
  const { t } = useTranslation();

  function getText(status) {
    switch (status) {
      case "1":
        return t("active");
      case "2":
        return t("inActive");
      case "3":
        return t("blocked");
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
      {v==1?<span className="px-3">{getText(String(v))}</span>:<span>{getText(String(v))}</span>}
    </div>
  );
}
