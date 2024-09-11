import { Avatar, Button, Modal } from "antd";
import CustomCard from "@/components/CardWithHeader";
import ComplexTable from "@/components/ComplexTable";
import { t } from "i18next";
import { fetchAllAuditLogs } from "../../services/auditlog";
import { useQuery } from "@tanstack/react-query";
import { useState, useReducer } from "react";
import { FiEye } from "react-icons/fi";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import serializeAndDownload from "@/utils/exportCSV";
export const auditActions = {
  0: "Inquiry",
  1: "Store",
  2: "Update",
  3: "Delete",
  4: "Login",
};
export default function AuditLog() {
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data, isPending } = useQuery({
    queryKey: ["auditlog", filterOptions],
    queryFn: () => fetchAllAuditLogs({ ...filterOptions }),
  });
  
  const [ModalOptions, setModalOptions] = useState({
    isOpen: false,
    data: null,
  });
  return (
    <div className="w-full">
      <CustomCard>
        <ComplexTable
          tableTitle={t("auditLog")}
          hasStatusFilter={false}
          hasAdd={false}
          columns={[
            {
              title: t("photo"),
              dataIndex: ["user", "picture"],
              width: 1,
              render: (value) => {
                return <Avatar size={"large"} src={value} alt="" />;
              },
            },
            { title: t("name"), dataIndex: ["user", "name"] },
            { title: t("jobTitle"), dataIndex: ["user", "jobTitle"] },
            {
              title: t("action"),
              dataIndex: "action",
              render: (value) => t(auditActions[value]),
            },
            {
              title: t("date"),
              dataIndex: "createdAt",
              render: (value) => {
                return new Date(value).toLocaleString();
              },
            },
            {
              title: t("actions"),
              dataIndex: "data",
              render: (value) => {
                return (
                  <Button
                    shape="rounded"
                    className="border-none"
                    onClick={() => {
                      setModalOptions({
                        isOpen: true,
                        data: value,
                      });
                    }}
                  >
                    <FiEye size={20} />
                  </Button>
                );
              },
            },
          ]}
          data={data?.data}
          loading={isPending}
          paginationConfig={{
            pageSize: data?.pagination.pageSize,
            current: data?.pagination.current,
            total: data?.pagination.total,
            showTotal: (total) => `${t("total")} ${total} ${t("items")}`,
          }}
          onChange={(pagination, filter, sorter, { action }) => {
            if (action == "paginate") {
              dispatch({
                type: "paginate",
                payload: pagination,
              });
            }
            if (action == "sort") {
              dispatch({
                type: "sort",
                payload: sorter,
              });
            }
          }}
          searchFunction={(e) => {
            dispatch({
              type: "search",
              payload: e.target.value,
            });
          }}
          downloadFunction={() => {
            serializeAndDownload(
              data?.data.map((item) => ({
                [t("name")]: item.user.name,
                [t("jobTitle")]: item.user.jobTitle,
                [t("action")]: t(auditActions[item.action]),
                [t("date")]: new Date(item.createdAt).toLocaleString(),
              })),
              "auditlog"
            );
          }}
        />
      </CustomCard>
      <Modal
        footer={null}
        open={ModalOptions.isOpen}
        onCancel={() => {
          setModalOptions({
            isOpen: false,
            data: null,
          });
        }}
      >
        <div className="text-center text-3xl m-2">Details</div>
        <div
          style={{
            direction: "ltr",
          }}
        >
          <JsonView
            data={ModalOptions.data ? JSON.parse(ModalOptions.data) : {}}
            styles={defaultStyles}
            theme="dark"
            collapsed={allExpanded}
            enableClipboard={false}
          />
        </div>
      </Modal>
    </div>
  );
}
