import ComplexTable from "../../../components/ComplexTable";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries, toggleCountry } from "@/services/countries";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";

export default function CountriesComponent() {
  const { t } = useTranslation();

  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["countries", filterOptions],
    queryFn: () => fetchAllCountries(filterOptions),
  });

  return (
    <div className="w-full">
      <ComplexTable
        columns={[
          {
            title: t("code"),
            dataIndex: "code",
            key: "code",
            sorter: true,
          },
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
          },

          {
            title: t("totalVisitors"),
            dataIndex: "totalVisitors",
            key: "totalVisitors",
          },

          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            sorter: true,
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
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: row.isActive ? t("deactivate") : t("activate"),
                          onClick: async () => {
                            await toggleCountry(row.code, row.isActive);
                            refetch();
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
        tableTitle={t("countries")}
        addText={t("addCountry")}
        hasAdd={false}
        loading={isPending}
        paginationConfig={{
          pageSize: data?.pagination.pageSize,
          current: data?.pagination.current,
          total: data?.pagination.total,
        }}
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
        searchFunction={(e) =>
          dispatch({
            type: "search",
            payload: e.target.value,
          })
        }
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inActive"), value: false },
        ]}
        statusFilter={(e) => {
          dispatch({ type: "status", payload: e });
        }}
      />
    </div>
  );
}
