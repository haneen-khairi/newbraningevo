import { Pagination } from "antd";
import TableTopbar from "@/components/TableTopbar";
import { t } from "i18next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCategories,
  updateCategory,
  deleteCategory,
} from "@/services/restaurantCategories";
import StatusComponent from "@/components/statusComponent";
import { useNavigate } from "react-router-dom";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "@/hooks/useResultModal";
import ComplexTable from "@/components/ComplexTable";
import FileEditIcon from "@/assets/icons/file-edit.svg?react";
import ActionButton from "@/pages/organization/actionsButton";
import CategoryDrawer from "./categories/Drawer";
export default function Categories() {
  //this is broken, items count - who can see - date added - last update
  const [customFilterOptions, setCustomFilterOptions] = useState({});
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categoryModalId, setCategoryModalId] = useState(null);
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["restaurantCategories", filterOptions, customFilterOptions],
    queryFn: () =>
      fetchAllCategories({ ...filterOptions, ...customFilterOptions }),
  });
  const navigate = useNavigate();
  return (
    //Name, Who can see, Items count, Date added, Last update, Status, Actions
    <div className="p-2 rounded-xl bg-white w-full">
      <ComplexTable
        addFunction={() => {
          setCategoryModalVisible(true);
        }}
        loading={isPending}
        tableTitle={t("categories")}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },

          {
            title: t("itemsCount"),
            dataIndex: "items",
            key: "itemsCount",
            render: (value) => value?.length ?? 0,
          },
          {
            title: t("dateAdded"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value) => new Date().toLocaleDateString(),
          },
          {
            title: t("lastUpdate"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (value) => new Date().toLocaleDateString(),
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (value) => <StatusComponent text={value} />,
          },
          {
            title: t("actions"),
            dataIndex: "actions",
            key: "actions",
            render: (value, row) => (
              <ActionButton
                onClick={() => {
                  setCategoryModalVisible(true);
                  setCategoryModalId(row.id);
                }}
              >
                <FileEditIcon fill="#000" />
              </ActionButton>
            ),
          },
        ]}
        data={data?.data}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inactive"), value: false },
        ]}
        statusFilter={(e) => {
          setCustomFilterOptions({
            ...customFilterOptions,
            isActive: e,
          });
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: 10,
          total: data?.pagination?.total ?? 0,
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
      <CategoryDrawer
        isOpen={categoryModalVisible}
        onClose={() => {
          setCategoryModalVisible(false);
          setCategoryModalId(null);
        }}
        id={categoryModalId}
      />
    </div>
  );
}
