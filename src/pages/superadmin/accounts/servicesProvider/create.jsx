import MapDrawer from "@/components/MapDrawer";
import useResultModal from "@/hooks/useResultModal";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { createServiceProvider, updateServiceProvider } from "../../../../services/serviceprovider";
import ServicesProviderForm from "./form";
export default function CreateServicesProvider({ setIsAddOpen,isOpen, onClose, allUsers,refetch }) {
  const { t,i18n } = useTranslation();
  const globalModal = useResultModal();
  const daysOfWeek = [
    { value: "Sunday",label: t ("Sunday") },
    { value: "Monday", label: t("Monday") },
    { value: "Tuesday", label: t("Tuesday") },
    {
      value: "Wednesday",
      label: t("Wednesday"),
    },
    { value: "Thursday", label:t("Thursday") },
    { value: "Friday", label:t("Friday") },
    { value: "Saturday", label:t( "Saturday") },
  ];



  const mode =isOpen?.id?"update":"create"
  console.log(mode);
  
  const Mutation = useMutation({
    mutationFn: (values) =>
      mode == "create" ? createServiceProvider(values) : updateServiceProvider(values),
    onSuccess: () => {
      setIsAddOpen(false);
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

  const onSubmit = (values) => {
    // Format rest hour start and end times
    values.restHourStart = dayjs(values.restHourStart).format("HH:mm:ss");
    values.restHourEnd = dayjs(values.restHourEnd).format("HH:mm:ss");
    
    // Format start and end times for the work hours
    values.startTime = dayjs(values.startTime).format("HH:mm:ss");
    values.endTime = dayjs(values.endTime).format("HH:mm:ss");
  
    // Format start and end dates to ISO string
    values.startDate = dayjs(values.startDate).toISOString();
    values.endDate = dayjs(values.endDate).toISOString();
  
    // Map work days to work hours with the appropriate names in Arabic and English
    values.workHour = values.workDays?.map((day) => {
      const selectedDay = daysOfWeek.find(d => d.value === day);
      return {
        nameAr: i18n.language === "ar" ? selectedDay.label : day,
        nameEn: i18n.language === "en" ? selectedDay.label : day,
        startDate: values.startDate,
        endDate: values.endDate,
        startTime: values.startTime,
        endTime: values.endTime,
        isActive: true,
      };
    });
  
    // Clean up unnecessary properties
    delete values.endDate;
    delete values.startDate;
    delete values.startTime;
    delete values.endTime;
    delete values.workDays;
    if (mode=="create") {
      delete values.id;
    }
  
    console.log(values);
  
    // Trigger the mutation function
    Mutation.mutate(values);
  };
  
  

  return (
    <MapDrawer
      open={isOpen}
      onClose={onClose}
      title={t("AddNewServiceProvider")}
      drawerContent={
        <ServicesProviderForm
          allUsers={allUsers}
          onSubmit={onSubmit}
          initialValues={isOpen}
        />
      }
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl h-full"
          htmlType="submit"
          form="user-form"
          loading={Mutation.isPending}
        >
          {t("save")}
        </Button>
      }
    ></MapDrawer>
  );
}
