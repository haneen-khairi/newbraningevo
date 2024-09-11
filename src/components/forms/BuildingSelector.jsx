import FormSelect from "./FormSelect";
import useBuildings from "../../hooks/useBuildings";
export default function BuildingSelector(props) {
  const { data, isPending } = useBuildings({
    isActive: true,
    isGetAll: true,
  });
  return (
    <FormSelect
      showSearch
      options={data?.data?.map((building) => ({
        label: building.name,
        value: building.id,
      }))}
      loading={isPending}
      optionFilterProp="label"
      {...props}
    ></FormSelect>
  );
}
