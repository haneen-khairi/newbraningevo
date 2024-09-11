import { useTranslation } from "react-i18next";

export default function Permissions({ v }) {
  const { t } = useTranslation();

  function getText(status) {
    switch (status) {
      case "0":
        return t("administrator");
      case "1":
        return t("employeee");
      case "2":
        return t("restaurant");
      case "3":
        return t("reception");
      case "4":
        return t("security");
      case "5":
        return t("restaurantAdministrator");
      case "6":
        return t("restaurantWaiter");
      case "7":
        return t("busDriver");
      case "8":
        return t("vipDriver");
    }
  }

  return (
    <div
      className="px-3 py-2 rounded-full w-fit font-su"
    >
      {<span>{getText(String(v))}</span>}
    </div>
  );
}
