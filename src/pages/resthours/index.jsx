import { t } from "i18next";
import ComplexTable from "@/components/ComplexTable";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllRestHours,
  updateRestHours,
  deleteRestHours,
} from "@/services/resthours";
import { useReducer, useState } from "react";
import RestHoursModal from "./RestHoursModal";
import { Dropdown } from "antd";
import ActionButton from "@/pages/organization/actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusComponent from "@/components/statusComponent";
import useResultModal from "@/hooks/useResultModal";
import serializeAndDownload from "@/utils/exportCSV";
export default function RestHours() {
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const {
    data: restHours,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["restHours", filterOptions],
    queryFn: () =>
      fetchAllRestHours({
        isActive: true,
        ...filterOptions,
      }),
  });
  const [modalData, setModalData] = useState(null);

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "day",
    },
    {
      title: t("day"),
      dataIndex: ["workHour", "name"],
      key: "day",
    },
    {
      title: t("startTime"),
      dataIndex: "start",
      key: "start",
    },
    {
      title: t("endTime"),
      dataIndex: "end",
      key: "end",
    },
    {
      title: t("status"),
      dataIndex: "isActive",
      key: "day",
      render: (value) => {
        return <StatusComponent text={value} />;
      },
    },
    {
      title: t("actions"),
      dataIndex: "type",
      key: "type",
      render: (value, row) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  label: t("edit"),
                  onClick: () => {
                    setModalData(row);
                  },
                },
                {
                  label: row.isActive ? t("deactivate") : t("activate"),
                  onClick: async () => {
                    await updateRestHours({
                      ...row,
                      isActive: !row.isActive,
                    });
                    refetch();
                  },
                },
                {
                  label: t("delete"),
                  danger: true,
                  onClick: () => {
                    globalModal
                      .confirm({
                        title: t("delete"),
                        subtitle: t("areYouSure"),
                      })
                      .then(async () => {
                        await deleteRestHours(row.id);
                        refetch();
                      });
                  },
                },
              ],
            }}
          >
            <ActionButton>
              <BiDotsVertical className="align-middle" size={20} />
            </ActionButton>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <>
      <ComplexTable
        title={t("daysOff")}
        columns={columns}
        data={restHours ? restHours.data : []}
        loading={isPending}
        error={error}
        hasStatusFilter={false}
        addFunction={() => {
          setModalData({});
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: restHours?.pagination.current,
          pageSize: restHours?.pagination.pageSize,
          total: restHours?.pagination.total,
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          switch (action) {
            case "paginate":
              dispatch({ type: "paginate", payload: pagination });
              break;
            case "sort":
              dispatch({ type: "sort", payload: sorter });
              break;
          }
        }}
        downloadFunction={() =>
          serializeAndDownload(
            restHours?.data.map((dayOff) => ({
              [t("date")]: new Date(dayOff.date).toLocaleDateString(),
              [t("reason")]: dayOff.name,
              [t("status")]: t(dayOff.isActive ? t("active") : t("inActive")),
            })),
            "daysOff"
          )
        }
      />
      <RestHoursModal
        isOpen={Boolean(modalData)}
        data={modalData}
        onSuccessSubmit={() => refetch()}
        onClose={() => {
          setModalData(null);
          refetch();
        }}
      />
    </>
  );
}
