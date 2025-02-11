import EyeIcon from "@/assets/icons/eye.svg?react";
import ComplexTable from "@/components/ComplexTable";
import ActionButton from "@/pages/organization/actionsButton";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { GetBusEvents } from "@/services/bus_events";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import CreateServicesProvider from "./create";
import StatusIndicator from "./StatusIndicator";
import { fetchAllServiceProviders } from "../../../../services/serviceprovider";
import UserStatus from "../../../../components/userStatue";
import Permissions from "../../../../components/permissions";
import { fetchAllUsers } from "../../../../services/users";

export default function ServicesProvider() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", filterOptions],
    queryFn: () => fetchAllServiceProviders(),
  });

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers", filterOptions],
    queryFn: () => fetchAllUsers(),
  });

  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const columns = [
    {
      title: t("userName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("IdentificationNumber"),
      dataIndex: "identityId",
      key: "phoneNumber",
    },
    {
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("bloodType"),
      dataIndex: "bloodType",
      key: "bloodType",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("permissions"),
      dataIndex: "type",
      key: "permissions",
      render: (v) => <Permissions v={v} />,
    },
    {
      title: t("lastLogin"),
      dataIndex: "lastTimeLogin",
      key: "lastLogin",
    },
    {
      title: t("lastUpdate"),
      dataIndex: "updatedAt",
      key: "lastUpdate",
      render: (value) => {
        return dayjs(value).format("DD MMMM YY");
      },
    },
    {
      title: t("accountStatus"),
      dataIndex: "status",
      key: "accountStatus",
      render: (v, r) => {
        return <UserStatus v={v} />;
      },
    },
    {
      title: t("actions"),
      dataIndex: "action",
      key: "action",
      render: (v, r) => {
        return (
          <div className="flex items-center gap-2">
            {/* <ActionButton onClick={() => {}}>
              <EyeIcon width={18} />
            </ActionButton> */}
            <ActionButton onClick={() => setIsAddOpen(r)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.511 8.83333C16.7685 8.83333 17.0118 8.71417 17.1693 8.51083C17.3268 8.3075 17.3818 8.0425 17.3185 7.79333C17.0593 6.77917 16.531 5.8525 15.791 5.1125L12.8868 2.20833C11.7852 1.10667 10.3202 0.5 8.76183 0.5H4.99933C2.70266 0.5 0.833496 2.36917 0.833496 4.66667V16.3333C0.833496 18.6308 2.70266 20.5 5.00016 20.5H7.50016C7.96016 20.5 8.3335 20.1267 8.3335 19.6667C8.3335 19.2067 7.96016 18.8333 7.50016 18.8333H5.00016C3.62183 18.8333 2.50016 17.7117 2.50016 16.3333V4.66667C2.50016 3.28833 3.62183 2.16667 5.00016 2.16667H8.76266C8.8985 2.16667 9.0335 2.17333 9.16683 2.18583V6.33333C9.16683 7.71167 10.2885 8.83333 11.6668 8.83333H16.511ZM10.8335 6.33333V2.71583C11.1493 2.8975 11.4435 3.1225 11.7085 3.3875L14.6127 6.29167C14.8743 6.55333 15.0985 6.84833 15.2818 7.16667H11.6668C11.2077 7.16667 10.8335 6.7925 10.8335 6.33333ZM20.1018 10.3992C19.1568 9.45417 17.5102 9.45417 16.566 10.3992L10.9768 15.9883C10.3477 16.6175 10.0002 17.455 10.0002 18.3458V19.6675C10.0002 20.1275 10.3735 20.5008 10.8335 20.5008H12.1552C13.046 20.5008 13.8827 20.1533 14.5118 19.5242L20.101 13.935C20.5735 13.4625 20.8335 12.835 20.8335 12.1667C20.8335 11.4983 20.5735 10.8708 20.1018 10.3992ZM18.9227 12.7558L13.3327 18.345C13.0185 18.66 12.6002 18.8333 12.1543 18.8333H11.666V18.345C11.666 17.9 11.8393 17.4817 12.1543 17.1667L17.7443 11.5775C18.0585 11.2625 18.6077 11.2625 18.9227 11.5775C19.0802 11.7342 19.1668 11.9433 19.1668 12.1667C19.1668 12.39 19.0802 12.5983 18.9227 12.7558Z"
                  fill="#0A0F1A"
                />
              </svg>
            </ActionButton>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-2 rounded-xl w-full bg-white">
      <ComplexTable
        hasSearch={true}
        hasAdd={true}
        hasDownload={true}
        downloadFunction={() => {}}
        hasFilter={true}
        loading={isPending}
        tableTitle={t("serviceProvider")}
        columns={columns}
        hasStatusFilter={true}
        addText={t("AddNewServiceProvider")}
        addFunction={() => setIsAddOpen(true)}
        data={users ? users?.data : []}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: filterOptions.page,
          pageSize: filterOptions.pageSize,
          total: users?.data?.totalCount ?? 0,
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

      <CreateServicesProvider
        isOpen={isAddOpen}
        allUsers={allUsers}
        onClose={() => setIsAddOpen(false)}
        setIsAddOpen={setIsAddOpen}
        refetch={refetch}
      />
    </div>
  );
}

{
  /* <EventDetails
        isOpen={Boolean(isDetailsOpen)}
        onClose={() => setIsDetailsOpen(false)}
        data={isDetailsOpen}
        onEdit={(data) => {
          setIsDetailsOpen(false);
          setIsEdit(data);
        }}
      /> */
}
