import { Form, Input, Popover } from "antd";
import { createContext, useEffect, useRef, useState } from "react";
import { useBuildings } from "../../../../services/buildingsv2.js";
import { useTranslation } from "react-i18next";
import BuildingIcon from "@/assets/icons/building.svg?react";
import FormInput from "../../../../components/forms/FormInput.jsx";
import Button from "../../../../components/Button.jsx";

export default function LocationChooser({
  name,
  form,
  label,
  onChooseFromMap,
  disabled = false,
  multiSelect = false,
  isSure=true
}) {
  const [selected, setSelected] = useState(multiSelect ? [] : {});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (form) {
      if (multiSelect) {
        form.setFieldValue(
          name + "-coordinates",
          selected.map((s) => ({ lat: s.value[0], lng: s.value[1] }))
        );
        form.setFieldValue(
          name + "-label",
          selected.map((s) => s.label).join(", ")
        );
      } else if (selected && Object.keys(selected).length > 0) {
        form.setFieldValue(name + "-coordinates", {
          lat: selected.value.building[0],
          lng: selected.value.building[1],
          id:selected?.value.id
        });
        form.setFieldValue(name + "-label", selected.label);
      }
    }
  }, [selected]);

  const handleSelectBuilding = (building) => {
    if (multiSelect) {
      setSelected((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (item) => item.label === building.name
        );
        if (isAlreadySelected) {
          return prevSelected.filter((item) => item.label !== building.name);
        }
        return [
          ...prevSelected,
          {
            label: building.name,
            value: multiSelect
              ? [building?.center?.[0], building?.id]
              : building?.center?.[0],
          },
        ];
      });
    } else {
      setSelected({
        label: building.name,
        value: {building:building?.center?.[0],id:building?.id},
      });
    }
  };

  if (multiSelect) {
    onChooseFromMap = () => true;
  }

  return (
    <Popover
      open={isOpen}
      content={
        <PopoverContent
        isSure={isSure}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onChooseFromMap={onChooseFromMap}
          onChooseBuilding={handleSelectBuilding}
          selected={selected}
          multiSelect={multiSelect}
        />
      }
      trigger={"click"}
      placement={"bottom"}
      arrow={false}
    >
      <Form.Item name={name + "-coordinates"} hidden />

      <Form.Item
        name={name + "-label"}
        label={label}
        rules={[{ required: true }]}
      >
        <FormInput
          onClick={() => setIsOpen(true)}
          disabled={disabled}
        ></FormInput>
      </Form.Item>
    </Popover>
  );
}

function PopoverContent({
  onChooseBuilding,
  onChooseFromMap,
  isSure,
  onClose,
  isOpen,
  selected,
  multiSelect,
}) {
  const buildings = useBuildings();
  const { t } = useTranslation();

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"grid grid-cols-4 gap-2"}>
        {buildings?.data?.data?.map((item) => (
          <BuildingEntry
            key={item?.id}
            building={item}
            isActive={
              multiSelect
                ? selected?.some((s) => s?.label === item?.name)
                : selected?.label === item.name
            }
            onClick={() => {
              onChooseBuilding(item);
              multiSelect ? "" : onClose();
            }}
          />
        ))}
      </div>
      {isSure ? (
        <>
          <div className={"border-t border-solid border-slate-100"} />
          <Button
            onClick={() => {
              onChooseFromMap();
              onClose();
            }}
            className={`bg-[#FAFAFA] text-black`}
          >
            {multiSelect ? t("confirm") : t("chooseFromMap")}
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function BuildingEntry({ building, isActive, onClick }) {
  const { t, i18n } = useTranslation();
  return (
    <div
      className="p-6 flex flex-col gap-4 rounded-xl items-center"
      style={{
        backgroundColor: isActive ? "#f5f6fa" : "#F6F6F6",
        border: isActive ? "1px solid #708AC0" : "none",
        cursor: building?.isOutOfWork ? "not-allowed" : "pointer",
      }}
      onClick={!building?.isOutOfWork && onClick}
    >
      <BuildingIcon
        style={{
          fill: isActive || !building?.isOutOfWork ? "#38ACB1" : "#909090",
        }}
      />
      {i18n.language == "ar" ? building?.nameAr : building?.nameEn}
    </div>
  );
}
