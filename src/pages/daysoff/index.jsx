import { t } from "i18next";
import ComplexTable from "@/components/ComplexTable";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllDaysOff,
  updateDayOff,
  deleteDayOff,
} from "@/services/workhours";
import { useReducer, useState } from "react";
import DaysOffModal from "./DaysOffModal";
import { Dropdown } from "antd";
import ActionButton from "@/pages/organization/actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusComponent from "@/components/statusComponent";
import useResultModal from "@/hooks/useResultModal";
import serializeAndDownload from "@/utils/exportCSV";
export default function DaysOff() {
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const {
    data: daysOff,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["daysOff", filterOptions],
    queryFn: () =>
      fetchAllDaysOff({
        isActive: true,
        ...filterOptions,
      }),
  });
  const [modalData, setModalData] = useState(null);

  const columns = [
    {
      title: t("date"),
      dataIndex: "date",
      key: "date",
      render: (text) => {
        return new Date(text).toLocaleDateString();
      },
    },
    {
      title: t("reason"),
      dataIndex: "name",
      key: "day",
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
                    await updateDayOff({
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
                        await deleteDayOff(row.id);
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
        data={daysOff ? daysOff.data : []}
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
          current: daysOff?.pagination.current,
          pageSize: daysOff?.pagination.pageSize,
          total: daysOff?.pagination.total,
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
            daysOff?.data.map((dayOff) => ({
              [t("date")]: new Date(dayOff.date).toLocaleDateString(),
              [t("reason")]: dayOff.name,
              [t("status")]: t(dayOff.isActive ? t("active") : t("inActive")),
            })),
            "daysOff"
          )
        }
      />
      <DaysOffModal
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
