import { Form } from "antd";
import FormDatepicker from "@/components/forms/FormDatepicker";
import BgTimePicker from "@/components/forms/FormTimepicker";
import { t } from "i18next";
import dayjs from "dayjs";
export default function MultipleTimes() {
  const form = Form.useFormInstance();
  const startDate = Form.useWatch("startDate", form);
  const startTime = Form.useWatch("startTime", form);
  const endDate = Form.useWatch("endDate", form);
  const endTime = Form.useWatch("endTime", form);
  function getDisabledTime(field, now) {
    switch (field) {
      case "startTime":
        return {
          disabledHours: () => {
            if (startDate.isSame(now, "day")) {
              return [...Array(24).keys()].slice(0, dayjs().hour());
            }
          },
          disabledMinutes: () => {
            if (startDate.isSame(now, "day")) {
              return [...Array(60).keys()].slice(0, dayjs().minute());
            }
          },
        };
      case "endTime":
        return {
          disabledHours: () => {
            if (endDate.isSame(startDate, "day")) {
              //disabled past hours and hours before start time
              return [...Array(24).keys()].slice(0, startTime.hour());
            }
          },
          disabledMinutes: () => {
            if (endDate.isSame(startDate, "day")) {
              //previous minutes and 10 minutes after start time
              return [...Array(60).keys()].slice(0, startTime.minute());
            }
          },
        };
    }
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full gap-4">
      <Form.Item
        label={t("startDate")}
        name={"startDate"}
        rules={[{ required: true }]}
      >
        <FormDatepicker
          inputReadOnly
          size="large"
          changeOnBlur
          disabledDate={(day) => {
            return day.isBefore(dayjs(), "day");
          }}
          onChange={(date) => {
            form.setFieldValue("endDate", date);
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("startTime")}
        name={"startTime"}
        rules={[{ required: true }]}
      >
        <BgTimePicker
          size="large"
          changeOnBlur
          inputReadOnly
          disabled={!startDate}
          format="H:mm"
          disabledTime={(now) => getDisabledTime("startTime", now)}
        />
      </Form.Item>
      <Form.Item
        label={t("endDate")}
        name={"endDate"}
        rules={[
          { required: true },
          {
            validator: (rule, value) => {
              if (value.isBefore(startDate, "day")) {
                return Promise.reject(t("endDateBeforeStartDate"));
              }
              return Promise.resolve();
            },
          },
        ]}
        dependencies={["startDate"]}
      >
        <FormDatepicker
          inputReadOnly
          disabled={!startTime}
          size="large"
          changeOnBlur
          disabledDate={(day) => {
            return day.isBefore(startDate, "day");
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("endTime")}
        name={"endTime"}
        rules={[{ required: true }]}
      >
        <BgTimePicker
          changeOnBlur
          disabled={!endDate}
          inputReadOnly
          size="large"
          disabledTime={(now) => getDisabledTime("endTime", now)}
          format="H:mm"
        />
      </Form.Item>
    </div>
  );
}
