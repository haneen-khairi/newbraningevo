import { useState } from "react";
import { Card, Flex, Badge } from "antd";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { t } from "i18next";
import tinycolor from "tinycolor2";
import CustomCard from "../CardWithHeader";
export default function StatsCard({
  title,
  value,
  percentage,
  color,
  icon = <CiUser />,
}) {
  let processedColor = tinycolor(color);
  return (
    <CustomCard className={"grow"}>
      <Flex className="justify-between">
        <div id="card-text">
          <h1>{title}</h1>
          <h1
            className="text-2xl font-bold my-3"
            style={{
              color,
            }}
          >
            {value}
          </h1>
        </div>
        <div
          id="user-icon"
          className="p-4 rounded-2xl text-3xl font-bold h-fit"
          style={{
            color,
            backgroundColor: processedColor.lighten(45),
          }}
        >
          {icon}
        </div>
      </Flex>
      <Flex id="trend" align="center" gap={5}>
        <div
          className={`rounded-3xl py-1 px-2 flex gap-2 font-bold items-center ${
            parseInt(percentage) > 0
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }`}
        >
          {parseInt(percentage) > 0 ? (
            <FaArrowTrendUp className="-scale-x-100" />
          ) : (
            <FaArrowTrendDown className="-scale-x-100" />
          )}
          {percentage}
        </div>

        <h3 className="text-slate-400">{t("thanLastMonth")}</h3>
      </Flex>
    </CustomCard>
  );
}
