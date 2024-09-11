import TimePicker from "@/components/forms/FormTimepicker";
import FormButton from "@/components/forms/FormButton";
import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchAllWorkHours, updateWorkHour } from "../../services/workhours";
import DaysButtons from "./DaysButtons";
import { Typography } from "antd";
import { Suspense, useState } from "react";
import dayjs from "dayjs";
import customparser from "dayjs/plugin/customParseFormat";
import useResultModal from "@/hooks/useResultModal";
export default function WorkHours() {
  const globalModal = useResultModal();
  const [isUpdating, setIsUpdating] = useState(false);
  dayjs.extend(customparser);
  const [selectedDay, setSelectedDay] = useState(null);
  const {
    data: days,
    isPending,
    refetch,
  } = useQuery({
    queryKey: "workhours",
    queryFn: () => fetchAllWorkHours(),
  });
  const selectedDayFromBackend = fetchCurrentDay(selectedDay, days);
  function handleDayChange(day) {
    setSelectedDay(day);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-fit mx-auto flex flex-col gap-2">
        <DaysButtons
          days={days?.data ?? []}
          selectedDay={selectedDay ?? null}
          onDayChange={handleDayChange}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Typography>{t("from")}</Typography>
            <TimePicker
              format={"h:mm a"}
              changeOnBlur
              use12Hours
              disabled={!selectedDay}
              inputReadOnly
              value={
                selectedDay
                  ? dayjs(selectedDayFromBackend?.start, "HH:mm:ss")
                  : null
              }
              onChange={async (e) => {
                await updateWorkHour({
                  ...selectedDay,
                  start: e.format("HH:mm:ss"),
                  id: selectedDay.id,
                });
                refetch();
              }}
            />
          </div>
          <div>
            <Typography>{t("to")}</Typography>
            <TimePicker
              format={"h:mm a"}
              changeOnBlur
              use12Hours
              disabled={!selectedDay}
              inputReadOnly
              value={
                selectedDay
                  ? dayjs(selectedDayFromBackend?.end, "HH:mm:ss")
                  : null
              }
              onChange={async (e) => {
                await updateWorkHour({
                  ...selectedDayFromBackend,
                  end: e.format("HH:mm:ss"),
                  id: selectedDay.id,
                });
                refetch();
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormButton
            type="primary"
            danger={selectedDayFromBackend?.isActive}
            disabled={!selectedDay}
            onClick={async () => {
              await updateWorkHour({
                ...selectedDayFromBackend,
                isActive: !selectedDayFromBackend?.isActive,
              });
              refetch();
            }}
          >
            {selectedDayFromBackend.isActive ? t("deactivate") : t("activate")}
          </FormButton>
          <FormButton
            type="default"
            disabled={!selectedDay}
            loading={isUpdating}
            onClick={async () => {
              setIsUpdating(true);
              for (let day of days.data) {
                let updatedDay = {
                  ...day,
                  start: selectedDayFromBackend?.start,
                  end: selectedDayFromBackend?.end,
                };
                await updateWorkHour(updatedDay);
              }
              setIsUpdating(false);
              globalModal.success({
                title: t("success"),
                subtitle: t("workHoursUpdated"),
              });
              refetch();
            }}
          >
            {t("applyAll")}
          </FormButton>
        </div>
      </div>
    </Suspense>
  );
}

function fetchCurrentDay(selectedDay, days) {
  if (!days || !selectedDay)
    return {
      start: "00:00:00",
      end: "00:00:00",
      id: 0,
      isActive: false,
    };
  return days.data.find((day) => day.id === selectedDay.id);
}
