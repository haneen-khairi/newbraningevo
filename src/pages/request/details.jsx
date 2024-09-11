import dayjs from "dayjs";
import CustomCard from "@/components/CardWithHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchOneRequest } from "@/services/requests";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import { Button, Table } from "antd";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaIdBadge } from "react-icons/fa";
import TableTopbar from "@/components/TableTopbar";
import serializeAndDownload from "@/utils/exportCSV";
import InviteDetailsHeader from "./components/InviteDetailsHeader";
export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["request", id],
    queryFn: () => fetchOneRequest(id),
  });
  if (!id) return <div>404</div>;
  if (isPending) return <div>loading</div>;
  return (
    <CustomCard className="w-full">
      <div className="flex flex-col gap-2">
        <InviteDetailsHeader invite={data?.data} refetch={refetch} />

        <TableTopbar
          hasAdd={false}
          hasStatusFilter={false}
          hasFilter={false}
          tableTitle={t("guests")}
          downloadFunction={() => {
            serializeAndDownload(
              data?.data?.requestGuests.map((guest) => ({
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
        <Table
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
          loading={isPending}
          dataSource={data?.data ? data.data?.requestGuests : []}
          expandable={{
            expandedRowRender: mainExpandRowRender,
            rowExpandable: (record) =>
              record.guest.attachments.length > 0 ||
              record.requestGuestVisits?.length > 0,
          }}
        />
      </div>
    </CustomCard>
  );
}

//two tables with exapandables: one for attachments and one for visits
const mainExpandRowRender = (globalRecord) => {
  const columns = [
    {
      title: "",
      dataIndex: "name",
    },
  ];
  const data = [
    {
      name: t("visitLog"),
      key: "visitLog",
      value: globalRecord.requestGuestVisits,
    },
  ];
  if (globalRecord?.guest?.attachments?.length > 0) {
    data.push({
      name: t("attachments"),
      key: "attachments",
      value: globalRecord.guest.attachments,
    });
  }
  return (
    <Table
      columns={columns}
      showHeader={false}
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => {
          if (record.key === "attachments") {
            return attachmentsSubTable(globalRecord);
          }
          if (record.key === "visitLog") {
            return visitLogSubTable(globalRecord);
          }
        },
      }}
    />
  );
};
const visitLogSubTable = (record) => {
  record.requestGuestVisits.sort(
    (a, b) => dayjs(b.checkedInAt).unix() - dayjs(a.checkedInAt).unix()
  );
  const columns = [
    {
      title: t("entryTime"),
      dataIndex: "checkedInAt",
      render: (value) => {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: t("exitTime"),
      dataIndex: "checkedOutAt",
      render: (value) => {
        return dayjs(value).isValid()
          ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={record.requestGuestVisits}
      pagination={false}
    />
  );
};
//expand another table that contains guest attachments
const attachmentsSubTable = (record) => {
  const columns = [
    { title: t("attachmentName"), dataIndex: "name", key: "name" },

    {
      title: t("attachment"),
      dataIndex: "attachment",
      key: "url",
      render: (value) => {
        return (
          <a href={value} target="_blank">
            {t("download")}
          </a>
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={record.guest.attachments}
      pagination={false}
    />
  );
};
