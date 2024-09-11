import { MdLanguage } from "react-icons/md";
import { Dropdown } from "antd";
import HeaderButton from "../HeaderButton";
import { useTranslation } from "react-i18next";
import usaFlag from "@/assets/usa_flag.svg";
import ksaFlag from "@/assets/ksa_flag.svg";
export default function LanguageDropdown({
  shape = "circle",
  id = "header-button",
}) {
  const { i18n } = useTranslation();
  return (
    <HeaderButton
      shape={shape}
      id={id}
      icon={
        <div className="text-sm">{i18n.language == "ar" ? "ع" : "En"}</div>
      }
      onClick={() => {
          i18n.changeLanguage(i18n.language == "ar" ? "en" : "ar")
          localStorage.setItem("lang", i18n.language)
      }}
    />
  );
}
