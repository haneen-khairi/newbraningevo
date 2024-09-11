import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { Drawer, Modal, Dropdown } from "antd";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import { FaEye } from "react-icons/fa";
import { BiDotsVertical } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DepartmentDrawer from "./drawer";
import {
  fetchAllDepartments,
  deleteDepartment,
  updateDepartment,
} from "@/services/departments";
import { useQuery } from "@tanstack/react-query";
import serializeAndDownload from "@/utils/exportCSV";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "@/hooks/useResultModal";
export default function DepartmentsComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const globalModal = useResultModal();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["departments", filterOptions],
    queryFn: () => fetchAllDepartments(filterOptions),
  });

  return (
    <div className="w-full">
      <ComplexTable
        tableTitle={t("departments")}
        addText={t("addDepartment")}
        addFunction={() => {
          navigate("/create-department");
        }}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("employeesNo"),
            dataIndex: "usersCount",
            key: "employeesNo",
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (value) => {
              return <StatusComponent text={value} />;
            },
          },
          {
            title: t("action"),
            dataIndex: "actions",
            key: "actions",
            render: (value, record) => (
              <div className="inline-flex gap-2 h-full">
                <ActionButton
                  onClick={() => {
                    setIsDrawerVisible(true);
                    setDrawerData(record);
                  }}
                >
                  <FaEye className="align-middle" size={20} />
                </ActionButton>
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: t("edit"),
                        onClick: () => {
                          navigate(`/create-department?depId=${record.id}`);
                        },
                      },
                      {
                        label: record.isActive
                          ? t("deactivate")
                          : t("activate"),
                        onClick: async () => {
                          await updateDepartment({
                            id: record.id,
                            isActive: !record.isActive,
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
                              title: t("areYouSure"),
                              subtitle: t("deleteDepartment"),
                            })
                            .then(async () => {
                              await deleteDepartment(record.id);
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
              </div>
            ),
          },
        ]}
        data={data?.data}
        loading={isPending}
        searchFunction={(e) =>
          dispatch({
            type: "search",
            payload: e.target.value,
          })
        }
        onChange={(pagination, filters, sorter, { action }) => {
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
        paginationConfig={{
          total: data?.pagination.total,
          current: data?.pagination.current,
          pageSize: data?.pagination.pageSize,
        }}
        downloadFunction={() => {
          serializeAndDownload(
            data?.data.map((department) => ({
              [t("name")]: department.name,
              [t("employeesNo")]: department.employeesNo || 0,
              [t("status")]: department.isActive ? t("active") : t("inActive"),
            })),
            "departments"
          );
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inActive"), value: false },
        ]}
        statusFilter={(e) => {
          dispatch({ type: "status", payload: e });
        }}
      />
      <DepartmentDrawer
        isOpen={isDrawerVisible}
        setIsOpen={setIsDrawerVisible}
        data={drawerData}
      />
    </div>
  );
}
