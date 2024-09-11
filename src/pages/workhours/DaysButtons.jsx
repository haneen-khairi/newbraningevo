import { DayTag } from "./DayToggleButton";
import { useState } from "react";
import { t } from "i18next";
//Constants

export default function DaysButtons({ days, selectedDay, onDayChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {sort_days_by_name(days).map((day) => (
        <DayTag
          key={day.id}
          checked={selectedDay?.id == day.id}
          onChange={(checked) => onDayChange(day)}
          $active={day.isActive}
        >
          {day.name}
        </DayTag>
      ))}
    </div>
  );
}

function sort_days_by_name(days) {
  const sorted_days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  return days.sort(function (a, b) {
    return sorted_days.indexOf(a.nameEn) - sorted_days.indexOf(b.nameEn);
  });
}
