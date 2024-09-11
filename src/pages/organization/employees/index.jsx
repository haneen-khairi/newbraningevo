import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { Dropdown, Avatar, Popconfirm } from "antd";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import { FaEye } from "react-icons/fa";
import { BiDotsVertical } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmployeeDrawer from "./drawer";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers, deleteUser, updateUser } from "@/services/users";
import serializeAndDownload from "@/utils/exportCSV";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "@/hooks/useResultModal";
import { ACCOUNT_TYPES } from "../../../enums/accountType";
export default function EmployeesComponent() {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["employees", filterOptions],
    queryFn: () => fetchAllUsers(filterOptions),
  });

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <ComplexTable
        columns={[
          {
            title: t("photo"),
            dataIndex: "picture",
            key: "photo",
            width: 1,
            render: (value) => {
              return <Avatar size={"large"} src={value} alt="" />;
            },
          },
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("email"),
            dataIndex: "email",
            key: "email",
          },
          {
            title: t("phone"),
            dataIndex: "phoneNumber",
            key: "phone",
            render: (value) => {
              return (
                <a href={"tel:" + value} dir="ltr">
                  {value}
                </a>
              );
            },
          },
          {
            title: t("accountType"),
            dataIndex: "type",
            key: "accountType",
            render: (value) => t(ACCOUNT_TYPES[value]),
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
            render: (value, row) => {
              return (
                <div className="inline-flex gap-2 h-full">
                  <ActionButton
                    onClick={() => {
                      setDrawerData(row);
                      setIsDrawerVisible(true);
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
                            navigate("/create-employee?userId=" + row.id);
                          },
                        },
                        {
                          label: row.isActive ? t("deactivate") : t("activate"),
                          onClick: async () => {
                            await updateUser({
                              id: row.id,
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
                                title: t("areYouSure"),
                                subtitle: t("deleteEmployee"),
                              })
                              .then(async () => {
                                await deleteUser(row.id);
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
              );
            },
          },
        ]}
        data={data?.data}
        tableTitle={t("employees")}
        addText={t("addEmployee")}
        addFunction={() => {
          navigate("/create-employee");
        }}
        loading={isPending}
        searchFunction={(e) =>
          dispatch({ type: "search", payload: e.target.value })
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
        downloadFunction={() => {
          serializeAndDownload(
            data?.data.map((employee) => ({
              [t("name")]: employee.name,
              [t("email")]: employee.email,
              [t("phone")]: employee.phoneNumber || "-",
              [t("date")]: employee.date || "-",
              [t("status")]: employee.isActive ? t("active") : t("inActive"),
            })),
            "employees"
          );
        }}
        paginationConfig={{
          pageSize: data?.pagination.pageSize,
          current: data?.pagination.current,
          total: data?.pagination.total,
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
      <EmployeeDrawer
        isOpen={isDrawerVisible}
        setIsOpen={setIsDrawerVisible}
        data={drawerData}
      />
    </div>
  );
}
