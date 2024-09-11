import ComplexTable from "@/components/ComplexTable";
import useResultModal from "@/hooks/useResultModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createUserPermissions,
  fetchAllUserPermissions,
  updateUserPermissions,
} from "../../../services/useradministratorpermission.js";
import { fetchEventsSettings, updateEventSetting } from "../../../services/eventSettings.js";
import { Checkbox } from "antd";

export default function EventPowers() {
  const globalModal = useResultModal();
  const { t, i18n } = useTranslation();

  const {
    data: events,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      fetchEventsSettings(),
  });

  const Mutation = useMutation({
    mutationFn: (values) =>
      updateEventSetting(values),
    onSuccess: () => {
      refetch();
      globalModal.success({
        title:t("updatedSuccessfully"),
        subtitle:t("eventUpdatedSuccessfully"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });
  
  const columns = [
    {
      title: t("displayEvents"),
      dataIndex: "vipSetting",
      key: "displayEvents",
      render: (v, record) => {
        const handleCheckboxChange = (e) => {
          const newValue = e.target.checked;
          Mutation.mutate({vipSetting: newValue,busSetting:record.busSetting });
        };
    
        return <Checkbox checked={v} onChange={handleCheckboxChange}></Checkbox>;
      }
    },
    {
      title: t("displayBus"),
      dataIndex: "busSetting",
      key: "displayBus",
      render: (v, record) => {
        const handleCheckboxChange = (e) => {
          const newValue = e.target.checked;
          Mutation.mutate({busSetting: newValue,vipSetting:record.vipSetting });
        };
    
        return <Checkbox checked={v} onChange={handleCheckboxChange}></Checkbox>;
      }
    },
    {
      title: t("lastUpdate"),
      dataIndex: "updatedAt",
      key: "lastUpdate",
      render: (v, record) => {
        return dayjs(v).locale(i18n.language).format("HH:MM / DD MMMM YY");
      },
    },
  ];

  return (
    <>
      <ComplexTable
        tableTitle={t("eventPowers")}
        columns={columns}
        data={ events?[events.data]:[] }
        loading={isPending}
        error={error}
        hasStatusFilter={false}
        hasAdd={false}
        hasFilter={false}
        hasSearch={false}

      />
    </>
  );
}
