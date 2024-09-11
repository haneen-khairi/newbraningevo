import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
export default function Item({ data, openEditOrder, isbutton = true }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-between my-2">
        <div className="w-[100%] flex items-center relative">
          {data.image ? (
            <img className="w-[15%] rounded-xl" src={data.image} alt="" />
          ) : (
            t("noImage")
          )}
          <span className="text-[10px] absolute top-[-3px] bg-gray-200 px-2 rounded-full right-[-2px]">
            {data?.count}
          </span>

          <div className="mx-2">
            <p className="py-[6px]">{data?.name}</p>
            {data?.sugarSpoons && (
              <span className="">
                {`${t("sugar")}`}
                <span className="mx-1">{data?.sugarSpoons}</span>
                <br />
              </span>
            )}
            {data?.notes}
          </div>
        </div>

        {isbutton && (
          <div className="edit">
            <Button
              onClick={openEditOrder}
              className="border-none  bg-[#f5f6fa]  text-[#38ACB1]"
            >
              {t("edit")}
            </Button>
          </div>
        )}
      </div>
      <div className="border-b-[.3px] border-solid border-gray-300"></div>
    </>
  );
}
