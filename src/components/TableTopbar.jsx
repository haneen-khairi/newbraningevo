import { Button, Dropdown, Input, Select, Avatar, Space } from "antd";
import { FiDownload } from "react-icons/fi";
import { BsSearch, BsSliders } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";
import debounce from "debounce";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";

export default function TableTopbar({
  title,
  downloadFunction,
  filterMenu,
  searchFunction,
  statusList,
  statusFilter,
  addFunction,
  addText,
  tableTitle,
  hasMultiAdd = false,
  hasSearch = true,
  hasAdd = true,
  hasDownload = true,
  hasFilter = true,
  hasStatusFilter = true,
  items,
  ...props
}) {
  const { token } = useTheme();
  const { t } = useTranslation();
  const debouncedSearch = debounce(searchFunction ?? (() => {}), 500);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      style={{
        backgroundColor: token.cardHeaderColor,
        color: token.primaryTextColor,
      }}
      className="p-5 mt-2 flex items-center justify-between rounded-2xl"
    >
      <div className="flex gap-4 items-center basis-1/4">
        <h1 className="font-semibold">{tableTitle ?? t("thisWeek")}</h1>
      </div>
      {(hasStatusFilter ||
        hasMultiAdd ||
        hasAdd ||
        hasSearch ||
        hasDownload) && (
        <div className="flex gap-3 w-[40%] h-10 items-center justify-end">
          {hasDownload && downloadFunction && (
            <Button
              className=" border-none h-full p-2 rounded-xl"
              onClick={downloadFunction ?? (() => {})}
            >
              <FiDownload size={24} />
            </Button>
          )}
          {hasFilter && filterMenu && (
            <Dropdown
              menu={filterMenu}
              open={menuOpen}
              onOpenChange={(e, i) => {
                if (i.source == "trigger") setMenuOpen(e);
              }}
            >
              <Button className="h-full border-none rounded-xl p-2">
                <BsSliders size={22} />
              </Button>
            </Dropdown>
          )}
          {hasSearch && (
            <Input
              placeholder={t("search")}
              className="rounded-lg border-none"
              onChange={debouncedSearch}
              style={{
                width: "50%",
              }}
              suffix={
                <div
                  className="flex items-center justify-center  rounded"
                  style={{
                    color: token.colorPrimary,
                    backgroundColor: token.colorSecondary,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <BsSearch />
                </div>
              }
            ></Input>
          )}
          {hasStatusFilter && (
            <Select
              style={{
                width: "50%",
                boxShadow: token.cardShadow,
                borderRadius: "10px",
              }}
              bordered={false}
              defaultValue={t("status")}
              options={statusList}
              onChange={statusFilter ?? (() => {})}
              className=" bg-white"
            ></Select>
          )}
          {hasAdd && (
            <Button
              type="primary"
              className="flex items-center rounded-xl shadow-none"
              onClick={addFunction}
            >
              <MdAdd className="text-xl" />
              {addText ?? t("add")}
            </Button>
          )}
          {hasMultiAdd && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                type="primary"
                className="flex items-center rounded-xl shadow-none"
                onClick={addFunction}
              >
                <MdAdd className="text-xl" />
                {t("newOrder")}
              </Button>
            </Dropdown>
          )}
        </div>
      )}
    </div>
  );
}
