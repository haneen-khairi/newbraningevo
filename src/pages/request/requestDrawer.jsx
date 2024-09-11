import { Drawer, Button } from "antd";
import { useTranslation } from "react-i18next";
import { FaIdBadge, FaEye } from "react-icons/fa";
import ComplexTable from "@/components/ComplexTable";
import { useQuery } from "@tanstack/react-query";
import { fetchOneRequest } from "@/services/requests";
import { IoQrCodeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import serializeAndDownload from "@/utils/exportCSV";
import InviteDetailsHeader from "./components/InviteDetailsHeader";
export default function RequestDrawer({
  drawerVisible,
  closeDrawer,
  invite,
  ...props
}) {
  const { t } = useTranslation();
  const guests = useQuery({
    queryKey: ["guests", invite.id],
    queryFn: () => fetchOneRequest(invite.id),
    enabled: drawerVisible,
  });
  const navigate = useNavigate();
  const { token } = useTheme();
  return (
    <Drawer
      title={t("inviteDetails")}
      open={drawerVisible}
      onClose={closeDrawer}
      placement="left"
      width={"80vw"}
      extra={
        <Button
          onClick={() => {
            navigate(`/request/${invite.id}`);
            closeDrawer();
          }}
          shape="circle"
          className="flex items-center justify-center"
        >
          <FaEye />
        </Button>
      }
    >
      <div
        className="flex flex-col gap-2"
        style={{
          color: token.primaryTextColor,
        }}
      >
        <InviteDetailsHeader
          invite={guests?.data?.data ?? {}}
          refetch={guests.refetch}
        />
        <ComplexTable
          hasAdd={false}
          hasStatusFilter={false}
          hasFilter={false}
          tableTitle={t("guests")}
          columns={[
            {
              title: t("guestName"),
              dataIndex: ["guest", "name"],
              key: "name",
            },
            {
              title: t("guestEmail"),
              dataIndex: ["guest", "email"],
              key: "email",
            },
            {
              title: t("guestPhone"),
              dataIndex: ["guest", "phoneNumber"],
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
              title: t("guestNationality"),
              dataIndex: ["guest", "nationality", "name"],
              key: "nationality",
            },
            {
              title: t("guestIdType"),
              dataIndex: ["guest", "identityType"],
              key: "idType",
              render: (id, row) => {
                if (!row.guest.identityId) return null;

                switch (id) {
                  case 0:
                    return t("nationalityCard");
                  case 1:
                    return t("iqama");
                  case 2:
                    return t("passport");
                  default:
                    return id;
                }
              },
            },
            {
              title: t("guestIdNumber"),
              dataIndex: ["guest", "identityId"],
              key: "idNumber",
            },
            {
              title: t("guestCarType"),
              dataIndex: ["guestVehicle", "model"],
              key: "carType",
            },
            {
              title: t("guestCarNumber"),
              dataIndex: ["guestVehicle", "number"],
              key: "carNumber",
            },
            {
              title: t("guestCarColor"),
              dataIndex: ["guestVehicle", "color"],
              key: "carColor",
              render: (text) => (
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: text,
                  }}
                ></div>
              ),
            },
            {
              title: t("actions"),
              dataIndex: "id",
              key: "id",
              render: (value, row) => {
                return (
                  <div className="flex items-center gap-3">
                    <Button
                      shape="circle"
                      onClick={() => {
                        navigator.clipboard.writeText(row.code);
                      }}
                    >
                      <IoQrCodeOutline />
                    </Button>
                    <Button
                      shape="circle"
                      onClick={() => {
                        navigate(`/badge/${row.requestId}`);
                      }}
                    >
                      <FaIdBadge />
                    </Button>
                  </div>
                );
              },
            },
          ]}
          loading={guests?.isPending}
          data={guests?.data ? guests?.data.data?.requestGuests : []}
          downloadFunction={() => {
            serializeAndDownload(
              guests?.data.data?.requestGuests.map((guest) => ({
                [t("guestName")]: guest.guest.name,
                [t("guestEmail")]: guest.guest.email,
                [t("guestPhone")]: guest.guest.phoneNumber,
                [t("guestNationality")]: guest.guest.nationalityCode,
                [t("guestIdType")]: guest.guest.identityType ?? "-",
                [t("guestIdNumber")]: guest.guest.identityId ?? "-",
                [t("guestCarType")]: guest.guestVehicle?.model ?? "-",
                [t("guestCarNumber")]: guest.guestVehicle?.number ?? "-",
                [t("guestCarColor")]: guest.guestVehicle?.color ?? "-",
              })),
              "request-guests"
            );
          }}
        />
      </div>
    </Drawer>
  );
}
