import colorjs from "color";
import { useTranslation } from "react-i18next";

function getColor(status) {
  switch (status) {
    case true:
      return "#219653";
    case false:
      return "#F30000";
  }
}

export default function EventStatus({ v }) {
  const { t } = useTranslation();

  function getText(status) {
    switch (status) {
      case true:
        return t("active");
      case false:
        return t("inactive");
    }
  }

  return (
    <div
      className="px-3 py-2 rounded-full w-fit font-su"
      style={{
        color: getColor(Boolean(v)),
        backgroundColor: colorjs(getColor(Boolean(v))).alpha(0.1),
      }}
    >
      {!v?<span>{getText(Boolean(v))}</span>:<span className="px-3">{getText(Boolean(v))}</span>}
    </div>
  );
}
