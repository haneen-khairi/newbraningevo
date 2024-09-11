import ComplexTable from "@/components/ComplexTable";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllGuests, updateGuest, deleteGuest } from "@/services/guests";
import { Dropdown } from "antd";
import { useState } from "react";
import ActionButton from "../actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import useResultModal from "@/hooks/useResultModal";
import serializeAndDownload from "@/utils/exportCSV";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
export default function Guests() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [isBlackList, setIsBlackList] = useState(false);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["guests", filterOptions, isBlackList],
    queryFn: () => fetchAllGuests({ isBlackList, ...filterOptions }),
  });
  const toggleGuestMutation = useMutation({
    mutationKey: "toggleGuest",
    mutationFn: (values) => updateGuest(values),
    onSuccess: () => {
      globalModal.success({title: t("guestUpdated"), subtitle: t("success")});
      refetch();
    },
    onError: (error) => {
      globalModal.error(error.message, t("error"));
    },
  });
  function toggleGuest(id, currentState) {
    toggleGuestMutation.mutate({ id, isBlackList: !currentState });
  }
  return (
    <ComplexTable
      title={t("guests")}
      columns={[
        { title: t("firstName"), dataIndex: "firstName", sorter: true },
        { title: t("lastName"), dataIndex: "lastName", sorter: true },
        { title: t("email"), dataIndex: "email", sorter: true },
        {
          title: t("phone"),
          dataIndex: "phoneNumber",
          sorter: true,
          render: (value) => {
            return (
              <a href={"tel:" + value} dir="ltr">
                {value}
              </a>
            );
          },
        },
        {
          title: t("nationality"),
          dataIndex: ["nationality", "nameAr"],
          sorter: true,
        },
        {
          title: t("status"),
          dataIndex: ["isBlackList"],
          sorter: true,
          render: (value) => {
            return value ? t("blacklisted") : t("notBlacklisted");
          },
        },
        {
          title: t("actions"),
          dataIndex: "id",
          render: (id, row) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: row.isBlackList
                        ? t("unblacklist")
                        : t("blacklist"),
                      onClick: () => {
                        toggleGuest(id, row.isBlackList);
                      },
                    },
                    {
                      label: t("edit"),
                      onClick: () => {
                        navigate(`/edit-guest/${id}`);
                      },
                    },
                    {
                      label: t("delete"),
                      
                      onClick: () => {
                        globalModal
                          .confirm({
                            title: t("areYouSure"),
                            subtitle: t("deleteGuest"),
                          })
                          .then(async (e) => {
                            await deleteGuest(id);
                            refetch();
                          });
                      },
                      danger: true,
                    },
                  ],
                }}
              >
                <ActionButton id={id}>
                  <BiDotsVertical className="align-middle" size={20} />
                </ActionButton>
              </Dropdown>
            );
          },
        },
      ]}
      addFunction={() => {
        navigate("/create-guest");
      }}
      data={data?.data}
      loading={isPending}
      downloadFunction={() => {
        serializeAndDownload(
          data?.data.map((guest) => ({
            [t("firstName")]: guest.firstName,
            [t("lastName")]: guest.lastName,
            [t("email")]: guest.email,
            [t("phone")]: guest.phoneNumber,
            [t("nationality")]: guest.nationality?.nameAr || "",
          })),
          "guests"
        );
      }}
      paginationConfig={{
        total: data?.pagination.total,
        current: data?.pagination.current,
        pageSize: data?.pagination.pageSize,
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
        dispatch({ type: "search", payload: e.target.value });
      }}
      statusFilter={async (e) => {
        setIsBlackList(e);
      }}
      statusList={[
        { label: t("blacklisted"), value: "true" },
        { label: t("notBlacklisted"), value: "false" },
      ]}
    />
  );
}
