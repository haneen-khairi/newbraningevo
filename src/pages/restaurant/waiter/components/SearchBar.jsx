import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";
import SearchIcons from "@/assets/icons/search.svg?react";
import * as _ from "lodash";
export default function SearchBar({ onChange }) {
  const { t } = useTranslation();
  const debouncedSearch = _.debounce(onChange, 500);
  return (
    <FormInput
      placeholder={t("search")}
      className="w-full bg-[#FAFAFA] min-h-input"
      prefix={<SearchIcons />}
      onChange={debouncedSearch}
    />
  );
}
