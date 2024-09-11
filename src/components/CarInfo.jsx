import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export default function CarInfo({
  image = "https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png",
  type = "mercedes",
  name = "mercedes",
  number = "123456",
  color = "#38ACB1",
}) {
  const { t } = useTranslation();
  return (
    <div
      className="my-4 p-4 rounded-xl flex gap-3"
      id="car-details"
      style={{
        background:
          "linear-gradient(180deg, #F8F8F8 0%, rgba(240, 240, 240, 0) 125.04%)",
      }}
    >
      <img className="w-24 h-12 object-contain" src={image}></img>
      <div className="flex flex-col gap-2">
        <div className="text-md">{name}</div>
        <div className="text-xs">{type}</div>
      </div>
      <Flex
        style={{
          marginRight: "auto",
        }}
        className="flex items-center gap-3 font-su"
      >
        {number}
      </Flex>
    </div>
  );
}
