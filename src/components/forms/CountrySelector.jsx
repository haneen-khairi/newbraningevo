import FormSelect from "./FormSelect";
import useCountries from "../../hooks/useCountries";
export default function CountrySelector(props) {
  const { data, isPending } = useCountries({
    isActive: true,
    isGetAll: true,
  });
  return (
    <FormSelect
      showSearch
      options={data?.data?.map((country) => ({
        label: country.name,
        value: country.code,
      }))}
      loading={isPending}
      optionFilterProp="label"
      {...props}
    ></FormSelect>
  );
}
