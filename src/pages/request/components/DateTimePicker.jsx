import FormDatePicker from "@/components/forms/FormDatepicker";
import dayjs from "dayjs";
import { useState } from "react";
export default function RequestDateTimePicker(props) {
  return (
    <FormDatePicker
      className="w-full"
      format="YYYY-MM-DD  h:mm a"
      showSecond={false}
      use12Hours={true}
      minuteStep={5}
      inputReadOnly
      showTime={{
        format: "h:mm a",
      }}

      disabledDate={(current) => {
        //allow only current and future dates
        return current && current < dayjs().subtract(1, "day");
      }}
      changeOnBlur
      {...props}
    />
  );
}
