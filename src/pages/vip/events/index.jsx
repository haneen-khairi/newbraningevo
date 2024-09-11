import EyeIcon from "@/assets/icons/eye.svg?react";
import ComplexTable from "@/components/ComplexTable";
import ActionButton from "@/pages/organization/actionsButton";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import dayjs from "dayjs";
import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { GetVipEvents } from "../../../services/vip_events.js";
import CreateEvent from "./create";
import EventDetails from "./details";
import StatusIndicator from "./StatusIndicator";

export default function Events() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data: events, isPending } = GetVipEvents();
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const columns = [
    {
      title: t("eventNumber"),
      dataIndex: "id",
      key: "eventNumber",
      render: (v) => v?.split("-")[0],
      sorter: true,
    },
    {
      title: t("eventDate"),
      dataIndex: "eventDate",
      key: "eventDate",
      render: (value) => dayjs(value).format("DD MMMM YYYY"),
    },
    {
      title: t("eventName"),

      key: "eventName",
      render: (value, row) => (i18n.language == "ar" ? row.name : row.nameEn),
    },

    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (v, r) => {
        return <StatusIndicator v={v == 3 ? 3 : 1} />;
      },
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (v, r) => {
        return (
          <div className="flex items-center gap-2">
            <ActionButton onClick={() => setIsDetailsOpen(r)}>
              <EyeIcon width={18} />
            </ActionButton>
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-2 rounded-xl w-full bg-white">
      <ComplexTable
        loading={isPending}
        tableTitle={t("allEvents")}
        columns={columns}
        addFunction={() => setIsCreateOpen(true)}
        hasStatusFilter={false}
        data={events?.data ?? []}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: filterOptions.pageSize,
          total: events?.data?.totalCount ?? 0,
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          if (action == "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action == "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
      />
      <EventDetails
        isOpen={Boolean(isDetailsOpen)}
        onClose={() => setIsDetailsOpen(false)}
        data={isDetailsOpen}
        onEdit={(data) => {
          setIsDetailsOpen(false);
          setIsCreateOpen(data);
        }}
      />
      <CreateEvent
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
