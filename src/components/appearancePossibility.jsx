import { useTranslation } from "react-i18next";

export default function AppearancePossibility({ v }) {
  const { t } = useTranslation();

  function getText(status) {
    switch (status) {
      case "1":
        return t("busShuttle");
      case "2":
        return t("vip");
      case "3":
        return t("both");
    }
  }

  return (
    <span
    >
      {getText(String(v))}
    </span>
  );
}
