import { Drawer, Button } from "antd";
import ComplexTable from "@/components/ComplexTable";
import FormButton from "@/components/forms/FormButton";
import FlatButton from "@/components/FlatButton";
import { IoMdClose } from "react-icons/io";
import useTheme from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import StatusComponent from "@/components/statusComponent";
import { fetchAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
export default function DepartmentDrawer({ isOpen, setIsOpen, data }) {
  const { t } = useTranslation();
  const { token } = useTheme();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const navigate = useNavigate();
  const { data: employees, isPending } = useQuery({
    queryKey: ["employees", filterOptions],
    queryFn: () =>
      fetchAllUsers({
        departmentId: data?.id,
        ...filterOptions,
      }),
  });
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      placement="left"
      size="large"
      closeIcon={false}
      title={t("details")}
      footer={
        <div id="bottom-buttons">
          <FormButton
            htmlType="submit"
            type="primary"
            className="w-full"
            size="large"
            onClick={() => {
              setIsOpen(false);
              navigate("/create-department?depId=" + data.id);
            }}
          >
            {t("edit")}
          </FormButton>
        </div>
      }
      extra={
        <FlatButton
          shape="circle"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <IoMdClose className="align-middle" size={21} />
        </FlatButton>
      }
    >
      <div
        className="flex justify-between py-6 px-3 shadow-sm rounded-lg"
        style={{
          color: token.primaryTextColor,
          backgroundColor: token.secondaryColor,
        }}
      >
        <p>{data?.name}</p>
        <StatusComponent text={data?.isActive}></StatusComponent>
      </div>
      <ComplexTable
        tableTitle={t("employees")}
        hasAdd={false}
        hasFilter={false}
        hasStatusFilter={false}
        hasDownload={false}
        loading={isPending}
        paginationConfig={{
          total: employees?.pagination.total,
          current: employees?.pagination.current,
          pageSize: employees?.pagination.pageSize,
        }}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
          },
          {
            title: t("email"),
            dataIndex: "email",
            key: "email",
            sorter: true,
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (value) => {
              return <StatusComponent text={value} />;
            },
          },
        ]}
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
        data={employees?.data}
        searchFunction={(e) =>
          dispatch({
            type: "search",
            payload: e.target.value,
          })
        }
      ></ComplexTable>
    </Drawer>
  );
}
