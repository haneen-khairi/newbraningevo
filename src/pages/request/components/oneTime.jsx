import { Form } from "antd";
import BgDatePicker from "@/components/forms/FormDatepicker";
import BgTimePicker from "@/components/forms/FormTimepicker";
import dayjs from "dayjs";
import { t } from "i18next";
export default function OneTime() {
  const form = Form.useFormInstance();
  const date = Form.useWatch("inviteDate", form);
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <Form.Item
        label={t("inviteDate")}
        name="inviteDate"
        rules={[{ required: true }]}
      >
        <BgDatePicker
          inputReadOnly
          size="large"
          changeOnBlur
          disabledDate={(day) => {
            return day.isBefore(dayjs(), "day");
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("inviteTime")}
        name="inviteFromHour"
        rules={[{ required: true }]}
      >
        <BgTimePicker
          disabled={date ? false : true}
          inputReadOnly
          size="large"
          changeOnBlur
          format="HH:mm"
          disabledTime={(now) => {
            return {
              disabledHours: () => {
                if (date.isSame(now, "day")) {
                  return [...Array(24).keys()].slice(0, dayjs().hour());
                }
              },
              disabledMinutes: () => {
                if (date.isSame(now, "day")) {
                  return [...Array(60).keys()].slice(0, dayjs().minute());
                }
              },
            };
          }}
        />
      </Form.Item>
    </div>
  );
}
