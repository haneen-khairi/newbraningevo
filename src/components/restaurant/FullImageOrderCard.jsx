import FullImageCard from "./FullImageCard";
import NumberInput from "../NumberInput";
import { Button, Flex, Dropdown } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { notTranslatedSizes } from "./sizesEnum";
import generateRandomId from "@/utils/randomId";
import { GrCubes } from "react-icons/gr";
import useTheme from "../../hooks/useTheme";
export default function FullImageOrderCard({
  name,
  id,
  image,
  handleSubmit,
  favourite,
  actionsMenu,
  ...props
}) {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isAddSugar, setIsAddSugar] = useState(false);
  const { token } = useTheme();
  return (
    <FullImageCard image={image} actionsMenu={actionsMenu}>
      <FullImageCard.Footer
        style={{
          borderWidth: 1,
          borderColor: favourite ? token["red-4"] : token.colorBorder,
          borderStyle: "solid",
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Flex justify="space-between">
          <div className="flex flex-col justify-between">
            <h1 className="text-lg">{name}</h1>
            <NumberInput
              min={1}
              positive={true}
              max={10}
              onChange={(count) => setCount(count)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              {/* sugar button */}
              <Button
                size="small"
                className={{
                  border: true,
                  "border-green-500": isAddSugar,
                  "border-red-500": !isAddSugar,
                }}
                danger={!isAddSugar}
                onClick={() => setIsAddSugar(!isAddSugar)}
                style={{
                  visibility: props.allowSugar ? "visible" : "hidden",
                }}
              >
                <GrCubes />
              </Button>
              <div id="sizes-choice" className="flex justify-end gap-1">
                {props.allowSizes &&
                  Object.keys(notTranslatedSizes).map((size, index) => {
                    if (!props.allowSizeLarge && size === 1) return;
                    if (!props.allowSizeMedium && size === 2) return;
                    if (!props.allowSizeSmall && size === 3) return;
                    return (
                      <Button
                        key={index}
                        size="small"
                        type={selectedSize === index ? "primary" : "default"}
                        onClick={() => setSelectedSize(index)}
                        className="border-none"
                      >
                        {notTranslatedSizes[size][0].toUpperCase()}
                      </Button>
                    );
                  })}
              </div>
            </div>
            <Button
              type="primary"
              onClick={() => {
                handleSubmit({
                  name: name,
                  count: count,
                  id: id,
                  image: image,
                  local_id: generateRandomId(6),
                  isAddSugar: isAddSugar,
                  size: selectedSize,
                });
              }}
            >
              {t("addToCart")}
            </Button>
          </div>
        </Flex>
      </FullImageCard.Footer>
    </FullImageCard>
  );
}
