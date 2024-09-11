import ComplexTable from "@/components/ComplexTable";
import useResultModal from "@/hooks/useResultModal";
import ActionButton from "@/pages/organization/actionsButton";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import serializeAndDownload from "@/utils/exportCSV";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import MapDrawer from "../../../../components/MapDrawer";
import {
  createDriverReason,
  fetchDriverReasons,
  updateDriverReason,
} from "../../../../services/driverreasons";
import {
  createRiderReason,
  fetchRiderReasons,
  updateRiderReason,
} from "../../../../services/riderReasons";
import ReasonDrawer from "./form";
export default function ReasonsForCancelation() {
  const globalModal = useResultModal();
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const {
    data: driverReasons,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["driverReasons"],
    queryFn: () => fetchDriverReasons(),
  });
  const {
    data: riderReasons,
    isPending: riderIsPending,
    error: riderError,
    refetch: refetchRiderData,
  } = useQuery({
    queryKey: ["RiderReasons"],
    queryFn: () => fetchRiderReasons(),
  });

  const dispalyedData = [
    {
      type: t("driver"),
      count: driverReasons?.data?.totalCount,
      lastUpdate: driverReasons?.data?.items[0]?.updatedAt,
      data: driverReasons?.data,
    },
    {
      type: t("user"),
      count: riderReasons?.data?.totalCount,
      lastUpdate: riderReasons?.data?.items[0]?.updatedAt,
      data: riderReasons?.data,
    },
  ];

  const columns = [
    {
      title: t("type"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("count"),
      dataIndex: "count",
      key: "count",
    },
    {
      title: t("lastUpdate"),
      dataIndex: "updatedAt",
      key: "lastUpdate",
      render: (v) => {
        return dayjs(v).locale(i18n.language).format("HH:MM / DD MMMM YY");
      },
    },
    {
      title: t("action"),
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => (
        <ActionButton
          onClick={() => {
            record.type == t("user") ? (record.type = 1) : (record.type = 2);
            return setMapDrawerOpen(record);
          }}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6775 8.83333C15.935 8.83333 16.1783 8.71417 16.3358 8.51083C16.4933 8.3075 16.5483 8.0425 16.485 7.79333C16.2258 6.77917 15.6975 5.8525 14.9575 5.1125L12.0533 2.20833C10.9517 1.10667 9.48667 0.5 7.92833 0.5H4.16583C1.86917 0.5 0 2.36917 0 4.66667V16.3333C0 18.6308 1.86917 20.5 4.16667 20.5H6.66667C7.12667 20.5 7.5 20.1267 7.5 19.6667C7.5 19.2067 7.12667 18.8333 6.66667 18.8333H4.16667C2.78833 18.8333 1.66667 17.7117 1.66667 16.3333V4.66667C1.66667 3.28833 2.78833 2.16667 4.16667 2.16667H7.92917C8.065 2.16667 8.2 2.17333 8.33333 2.18583V6.33333C8.33333 7.71167 9.455 8.83333 10.8333 8.83333H15.6775ZM10 6.33333V2.71583C10.3158 2.8975 10.61 3.1225 10.875 3.3875L13.7792 6.29167C14.0408 6.55333 14.265 6.84833 14.4483 7.16667H10.8333C10.3742 7.16667 10 6.7925 10 6.33333ZM19.2683 10.3992C18.3233 9.45417 16.6767 9.45417 15.7325 10.3992L10.1433 15.9883C9.51417 16.6175 9.16667 17.455 9.16667 18.3458V19.6675C9.16667 20.1275 9.54 20.5008 10 20.5008H11.3217C12.2125 20.5008 13.0492 20.1533 13.6783 19.5242L19.2675 13.935C19.74 13.4625 20 12.835 20 12.1667C20 11.4983 19.74 10.8708 19.2683 10.3992ZM18.0892 12.7558L12.4992 18.345C12.185 18.66 11.7667 18.8333 11.3208 18.8333H10.8325V18.345C10.8325 17.9 11.0058 17.4817 11.3208 17.1667L16.9108 11.5775C17.225 11.2625 17.7742 11.2625 18.0892 11.5775C18.2467 11.7342 18.3333 11.9433 18.3333 12.1667C18.3333 12.39 18.2467 12.5983 18.0892 12.7558Z"
              fill="#0A0F1A"
            />
          </svg>
        </ActionButton>
      ),
    },
  ];

  //create and update

  const [mode, setMode] = useState("create");
  const driverMutation = useMutation({
    mutationFn: (values) =>
      mode == "create"
        ? createDriverReason(values)
        : updateDriverReason(values),
    onSuccess: () => {
      setMapDrawerOpen(false);
      setMode("create");
      refetch();
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create"
            ? t("eventCreatedSuccessfully")
            : t("eventUpdatedSuccessfully"),
      });
    },

    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  const riderMutation = useMutation({
    mutationFn: (values) =>
      mode == "create" ? createRiderReason(values) : updateRiderReason(values),
    onSuccess: () => {
      setMapDrawerOpen(false);
      setMode("create");
      refetchRiderData();
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create"
            ? t("eventCreatedSuccessfully")
            : t("eventUpdatedSuccessfully"),
      });
    },

    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  function convertValuesToArray(input) {
    const result = [];
    const isActive = input.isActive;

    for (let i = 1; i <= Object.keys(input).length / 3; i++) {
      if (
        input[`nameAr-${i}`] &&
        input[`nameEn-${i}`] &&
        input[`orderId-${i}`]
      ) {
        mode == "update"
          ? result.push({
              id: input[`id-${i}`],
              nameAr: input[`nameAr-${i}`],
              nameEn: input[`nameEn-${i}`],
              isActive: isActive,
              orderId: input[`orderId-${i}`] - 1,
            })
          : result.push({
              nameAr: input[`nameAr-${i}`],
              nameEn: input[`nameEn-${i}`],
              isActive: isActive,
              orderId: input[`orderId-${i}`] - 1,
            });
      }
    }
    return result;
  }

  const onSubmit = (values) => {
    setMode(values.mode);
    if (mode == "create") {
      delete values.id;
    }
    values.isActive = true;
    delete values.mode;

    if (values.type) {
      let value = convertValuesToArray(values);
      values.type == 1
        ? riderMutation.mutate(value)
        : driverMutation.mutate(value);
    }
  };

  return (
    <>
      <ComplexTable
        tableTitle={t("reasonForCancelation")}
        addText={t("add")}
        columns={columns}
        data={dispalyedData}
        loading={isPending || riderIsPending}
        hasSearch={false}
        error={error || riderError}
        hasStatusFilter={false}
        addFunction={() => {
          setMapDrawerOpen(true);
        }}
      />

      <MapDrawer
        open={mapDrawerOpen}
        title={t("add")}
        onClose={() => {
          setMapDrawerOpen(false);
        }}
        footer={
          <Button
            type="primary"
            htmlType="submit"
            form="Reason-form"
            className="w-full rounded-xl"
          >
            {t("save")}
          </Button>
        }
        drawerContent={
          <ReasonDrawer mapDrawerOpen={mapDrawerOpen} onSubmit={onSubmit} />
        }
      ></MapDrawer>
    </>
  );
}