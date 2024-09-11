import EyeIcon from "@/assets/icons/eye.svg?react";
import ComplexTable from "@/components/ComplexTable";
import ActionButton from "@/pages/organization/actionsButton";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { GetBusEvents } from "@/services/bus_events";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import EditStatusAndPermissions from "./create";
import StatusIndicator from "./StatusIndicator";
import { fetchAllUsers } from "../../../../services/users";
import Permissions from "../../../../components/permissions";
import UserStatus from "../../../../components/userStatue";

export default function Users() {
  const { t } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data: users, isPending } = useQuery({
    queryKey: ["allUsers", filterOptions],
    queryFn: () => fetchAllUsers({ ...filterOptions }), // getUsers
  });

  // const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  console.log(users);
  

  const columns = [
    {
      title: t("userName"),
      dataIndex: "name",
      key: "userName",
      render:(v)=>v?.includes("@")?v.split("@")[0]:v
      
    },
    {
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      render:(v)=><Permissions v={Number(v)}/>
      
    },
    // {
    //   title: t("lastLogin"),
    //   dataIndex: "updatedAt",
    //   key: "lastLogin",
    //   render: (value) => {
    //     return dayjs(value).format("DD MMMM YY");
    //   },
    // },
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
        return <UserStatus v={v+1} />;
      },
    },
    {
      title: t("viewOrEdit"),
      dataIndex: "action",
      key: "action",
      render: (v, r) => {
        return (
          <div className="flex items-center gap-2">
            <ActionButton onClick={() => {}}>
              <EyeIcon width={18} />
            </ActionButton>

            <ActionButton onClick={() => setIsEdit(r)}>
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

            {/* <ActionButton onClick={() => setIsEdit(r)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_199_2465)">
                  <path
                    d="M10 0.5C7.53792 0.501755 5.16344 1.41385 3.33333 3.06083V1.33333C3.33333 1.11232 3.24554 0.900358 3.08926 0.744078C2.93298 0.587797 2.72101 0.5 2.5 0.5C2.27899 0.5 2.06702 0.587797 1.91074 0.744078C1.75446 0.900358 1.66667 1.11232 1.66667 1.33333V3.83333C1.66667 4.49638 1.93006 5.13226 2.3989 5.6011C2.86774 6.06994 3.50363 6.33333 4.16667 6.33333H6.66667C6.88768 6.33333 7.09964 6.24554 7.25592 6.08926C7.4122 5.93298 7.5 5.72101 7.5 5.5C7.5 5.27899 7.4122 5.06703 7.25592 4.91075C7.09964 4.75446 6.88768 4.66667 6.66667 4.66667H4.16667C4.13857 4.6625 4.11074 4.65666 4.08333 4.64917C5.44127 3.28152 7.23177 2.42756 9.14922 2.23305C11.0667 2.03855 12.9922 2.51555 14.5971 3.58263C16.202 4.64972 17.3868 6.24075 17.9493 8.08413C18.5118 9.92751 18.4171 11.909 17.6813 13.6903C16.9455 15.4716 15.6144 16.9423 13.915 17.8515C12.2156 18.7606 10.2533 19.0517 8.36318 18.6752C6.47303 18.2986 4.77216 17.2778 3.55088 15.7868C2.32961 14.2959 1.66364 12.4273 1.66667 10.5C1.66667 10.279 1.57887 10.067 1.42259 9.91075C1.26631 9.75447 1.05435 9.66667 0.833333 9.66667C0.61232 9.66667 0.400358 9.75447 0.244078 9.91075C0.0877974 10.067 0 10.279 0 10.5C0 12.4778 0.58649 14.4112 1.6853 16.0557C2.78412 17.7002 4.34591 18.9819 6.17317 19.7388C8.00043 20.4957 10.0111 20.6937 11.9509 20.3079C13.8907 19.922 15.6725 18.9696 17.0711 17.5711C18.4696 16.1725 19.422 14.3907 19.8079 12.4509C20.1937 10.5111 19.9957 8.50043 19.2388 6.67317C18.4819 4.84591 17.2002 3.28412 15.5557 2.1853C13.9112 1.08649 11.9778 0.5 10 0.5Z"
                    fill="black"
                  />
                  <path
                    d="M9.99984 5.5C9.77882 5.5 9.56686 5.5878 9.41058 5.74408C9.2543 5.90036 9.1665 6.11232 9.1665 6.33333V10.5C9.16655 10.721 9.25438 10.9329 9.41067 11.0892L11.9107 13.5892C12.0678 13.741 12.2783 13.825 12.4968 13.8231C12.7153 13.8212 12.9243 13.7335 13.0789 13.579C13.2334 13.4245 13.321 13.2155 13.3229 12.997C13.3248 12.7785 13.2408 12.568 13.089 12.4108L10.8332 10.155V6.33333C10.8332 6.11232 10.7454 5.90036 10.5891 5.74408C10.4328 5.5878 10.2209 5.5 9.99984 5.5Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_199_2465">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </ActionButton> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-2 rounded-xl w-full bg-white">
      <ComplexTable
        hasSearch={true}
        hasAdd={false}
        hasDownload={true}
        downloadFunction={()=>{}}
        hasFilter={true}
        loading={isPending}
        tableTitle={t("systemUsers")}
        columns={columns}
        hasStatusFilter={true}
        data={users?.data ?? []}
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
      {/* <EventDetails
        isOpen={Boolean(isDetailsOpen)}
        onClose={() => setIsDetailsOpen(false)}
        data={isDetailsOpen}
        onEdit={(data) => {
          setIsDetailsOpen(false);
          setIsEdit(data);
        }}
      /> */}
      <EditStatusAndPermissions
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
      />
    </div>
  );
}
