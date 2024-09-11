// Wizard.js
import React, { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import { useForm } from "antd/es/form/Form";
import FormSelect from "@/components/forms/FormSelect";

import {
  Button,
  Radio,
  Form,
  Select,
  Steps,
  Popover,
  Input,
  DatePicker,
  TimePicker
} from "antd";
const { RangePicker } = DatePicker;

import { createNewAdminOrder } from "../services/invitation";
import { t } from "i18next";
import BuildingSelector from "./forms/BuildingSelector";
import useFloors from "../hooks/useFloors";
import RoomSelector from "./forms/RoomSelector";
import {
  useAuthorities,
  useCompanies,
  useRooms,
} from "../services/headquarter";
import { useBuildings } from "../services/buildingsv2";
import { useTranslation } from "react-i18next";
import useResultModal from "../hooks/useResultModal";
import { GetAllVisitReasons } from "../services/vip_trips";
 

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  ></Popover>
);

const StepOne = ({ nextStep, formDataCollector }) => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const handleFinish = (values) => {
    console.log("🚀 ~ handleFinish step 1 ~ values:", values);
    formDataCollector(values); // Collect data from the form
    nextStep(); // Proceed to the next step
  };
  const [addonType, setAddonType] = useState("guest"); // ENUM: [email,link]]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const type = Form.useWatch("type", form);
  const { data: buildings } = useBuildings();

  const building = Form.useWatch("building", form);
  const floorId = Form.useWatch("floorId", form);
  const { data: floors } = useFloors({
    buildingId: building,
  });
  const buildingOptions = buildings?.data?.map((el) => {
    return {
      value: el.id,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const floorsOptions = floors?.data?.map((el) => {
    return {
      value: el.id,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const { data: companies } = useCompanies();
  const companiesOptions = companies?.data?.map((el) => {
    return {
      value: el.id,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });

  const { data: authorities } = useAuthorities();
  const authoritiesOptions = authorities?.data?.map((el) => {
    return {
      value: el.id,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });

  const { data: rooms } = useRooms();
  console.log("🚀 ~ StepOne ~ rooms:", rooms)
  const roomsOptions = rooms?.data?.map((el) => {
    return {
      value: el.id,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="flex flex-row items-center pb-4">
          <span>
            <svg
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
              <g clipPath="url(#clip0_397_15813)">
                <path
                  d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_397_15813">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(13.5 13.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <div className="mx-2">
            <p className="text-[#191919] font-bold pb-2">معلومات الزيارة</p>
            <p className="text-[#939393] pb-2">
              من فضلك قم بكتابة معلومات الزيارة
            </p>
          </div>
        </div>

        {/* Step progress */}
        <div className="stepper overflow-hidden">
          <Steps
            current={1}
            progressDot
            items={[
              { title: ""},
              { title: ""},
              { title: ""},
              { title: ""},
              { title: ""},
            ]}
          />
        </div>

        {/* Form fields */}
        {/* <Form.Item label="المبني" name="building" rules={[{ required: true }]}>
          <Select placeholder="اختر المبنى">
      <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo1">Demo2</Select.Option>
            <Select.Option value="demo2">Demo3</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          name={"building"}
          label={t("inviteBuilding")}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <BuildingSelector
            placeholder="اختر المبنى"
            size="medium"
            onChange={() => {
              form.resetFields(["floorId"]);
            }}
          />
        </Form.Item>
        {/* <Form.Item label="الطابق" name="floor" rules={[{ required: true }]}>
          <Select placeholder="اختر الطابق">
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo1">Demo2</Select.Option>
            <Select.Option value="demo2">Demo3</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          name={"floorId"}
          label={t("inviteFloor")}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <FormSelect
            size="medium"
            placeholder="اختر الطابق"
            options={floors?.data ?? []}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            // disabled={!building}
            onChange={() => {
              form.resetFields(["roomId"]);
            }}
          />
        </Form.Item>
        {/* <Form.Item label="الشركة" name="company" rules={[{ required: true }]}>
          <Select placeholder="اختر الشركة">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="الجهة" name="department" rules={[{ required: true }]}>
          <Select placeholder="اختر الجهة">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item label={t("company")} name={"companyId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#38ACB1"
                />
              </svg>
            }
            options={companiesOptions}
            placeholder={t("company")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("authority")} name={"sideId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#38ACB1"
                />
              </svg>
            }
            options={authoritiesOptions}
            placeholder={t("authority")}
          ></Select>
        </Form.Item>
        <Form.Item label={t("office_rooms")} name={"roomId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#38ACB1"
                />
              </svg>
            }
            options={roomsOptions}
            placeholder={t("office_rooms")}
          ></Select>
        </Form.Item>
        {/* <Form.Item label="المكتب" name="office" rules={[{ required: true }]}>
          <Select placeholder="اختر المكتب">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item> */}
        {/* Submit button */}
        <Button type="primary" htmlType="submit"    style={{
              width:'100%', 
            }}>
        {t("next")}

        </Button>
      </Form>
    </div>
  );
};

const StepTwo = ({ previousStep, nextStep, formDataCollector }) => {
  const [form] = Form.useForm();
  const {i18n} = useTranslation()
  const { data: visitReasons = [] } = GetAllVisitReasons({});

//   const [selectedValue, setSelectedValue] = useState('multiTime');

// const handleChange = (e) => {
//   setSelectedValue(e.target.value);
// };
  const handleFinish = (values) => {
    console.log("🚀 ~ handleFinish step 2 ~ values:", values);
    if (values.visitDate && values.visitDate.toISOString) {
      values.visitDate = values.visitDate.toISOString(); // Convert visitDate to ISO string
    }
    if (values.startTime && values.startTime.toISOString) {
      values.startTime = values.startTime.toISOString(); // Convert startTime to ISO string
    }
    if (values.endTime && values.endTime.toISOString) {
      values.endTime = values.endTime.toISOString(); // Convert endTime to ISO string
    }

    formDataCollector(values); // Collect data from the form
    nextStep(); // Proceed to the next step
  };
  const [selectedValue, setSelectedValue] = useState("multiTime");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  console.log("🚀 ~ StepTwo ~ visitReasons:", visitReasons)
  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <div className="flex flex-row items-center pb-4">
        <span>{/* SVG Icon */}</span>
        <div className="mx-2">
          <p className="text-[#191919] font-bold pb-2">تفاصيل الزيارة</p>
          <p className="text-[#939393] pb-2">
            من فضلك قم بكتابة تفاصيل الزيارة
          </p>
        </div>
      </div>
      <div className="stepper overflow-hidden">
        <Steps
          current={2}
          progressDot={customDot}
          items={[
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
          ]}
        />
      </div>
      <p className="font-semibold text-[#0B101B]">نوع الزيارة</p>

      <Form.Item name="invitationKind" rules={[{ required: true , message: "من فضلك حدد نوع الزيارة" }]}>
      <Radio.Group
        className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-2"
        onChange={handleChange}
        defaultValue={'multiTime'}
        value={selectedValue}
      >
        <Radio.Button
          value="multiTime"
          className="w-full text-center rounded-xl text-[#0B101B]"
          style={
            {
              border:'1px solid ',
              borderRadius:'10px',
              
            }
          
          }
        >
          متعددة الزيارات
        </Radio.Button>
        <Radio.Button
          className="w-full text-center rounded-xl text-[#0B101B]"
          value="oneTime"
          style={
            {
              border:'1px solid ',
              borderRadius:'10px',
              
            }
          
          }
        >
          مرة واحدة
        </Radio.Button>
      </Radio.Group>

      </Form.Item>
      <Form.Item
        className="font-semibold text-[#0B101B]"
        label="تاريخ الزيارة"
        name="visitDate"
        rules={[{ required: true, message: "من فضلك حدد تاريخ الزيارة" }]}
      >
       {selectedValue === 'multiTime' && (
       <RangePicker
          placeholder="من فضلك حدد تاريخ الزيارة ..."
          suffixIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          }
          className="w-full rounded-xl border border-slate border-gray-200"
          onChange={(date, dateString) => {
            form.setFieldsValue({ visitDate: date });
          }}
        />
      )}

      {selectedValue === 'oneTime' && (
        <DatePicker
          placeholder="من فضلك حدد تاريخ الزيارة ..."
          suffixIcon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          }
          className="w-full rounded-xl border border-slate border-gray-200"
          onChange={(date, dateString) => {
            form.setFieldsValue({ visitDate: date });
          }}
        />
      )}
      
      </Form.Item>

      <Form.Item
        className="font-semibold text-[#0B101B]"
        label="من الساعة"
        name="startTime"
        rules={[{ required: true, message: "من فضلك حدد وقت البداية" }]}
      >
        <TimePicker
          use12Hours
          format="h:mm a"
          placeholder="من الساعة ..."
          suffixIcon={
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          }
          className="w-full rounded-xl border border-slate border-gray-200"
          onChange={(time, timeString) =>
            form.setFieldsValue({ startTime: time })
          }
        />
      </Form.Item>

      <Form.Item
        className="font-semibold text-[#0B101B]"
        label="الى الساعة"
        name="endTime"
        rules={[{ required: true, message: "من فضلك حدد وقت النهاية" }]}
      >
        <TimePicker
          use12Hours
          format="h:mm a"
          placeholder="الى الساعة..."
          suffixIcon={
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
          }
          className="w-full rounded-xl border border-slate border-gray-200"
          onChange={(time, timeString) =>
            form.setFieldsValue({ endTime: time })
          }
        />
      </Form.Item>
      <Form.Item
        className="font-semibold text-[#0B101B]"
        label="سبب الزيارة"
        name="invitationReason"
        rules={[{ required: true }]}
      >
        <Select
          className="w-full rounded-xl border border-slate border-gray-200"
          placeholder={t("selectReason")}
          suffixIcon={
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
                fill="#38ACB1"
              />
            </svg>
          }
        >
          {visitReasons.data?.length ? visitReasons?.data?.map((reason) => <Select.Option key={reason.id} value={reason.id}>{
            i18n.language === "ar" ? reason.nameAr || "null" : reason.nameEn || "null"}
          </Select.Option>): ""}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          onClick={previousStep}
          htmlType="submit"
          form="cart-form"
          className="w-full rounded-xl font-bold bg-[#fad7d7] text-[#F30000]"
          style={{
              width:'47%',
              margin:'0px 5px'
            }}
        >
          السابق
        </Button>

        <Button type="primary" htmlType="submit" className="w-full rounded-xl"
           style={{
              width:'47%',
              margin:'0px 5px'
            }}>
          التالي
        </Button>
      </Form.Item>
    </Form>
  );
};

const StepThree = ({ previousStep, nextStep, formDataCollector }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("🚀 ~ handleFinish step 3 ~ values:", values);
    formDataCollector(values); // Collect data from the third form
    nextStep()
    // submitForm(values); // Trigger the final submission
  };
  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <div className="flex flex-row items-center  pb-4 ">
        <span>
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
            <g clip-path="url(#clip0_397_15813)">
              <path
                d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_397_15813">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(13.5 13.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <div className="mx-2">
          <p className="text-[#191919] font-bold pb-2">بيانات الضيف </p>
          <p className="text-[#939393] pb-2">من فضلك قم بادخال بيانات الضيف</p>
        </div>
      </div>
      <div className="stepper overflow-hidden">
        <Steps
          current={4}
          progressDot={customDot}
          items={[
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "",
            },
            {
              title: "",
            },
          ]}
        />
      </div>

      <Form.Item
        className="font-semibold text-[#0B101B]"
        name={"guestName"}
        label="اسم الضيف"
      >
        <Input
          placeholder="اسم الضيف ..."
          type="text"
          className="w-full rounded-xl border border-slate border-gray-200"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="البريد الالكتروني  "
        rules={[
          {
            type: "email",
            message: "The input is not a valid email!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        className="font-semibold text-[#0B101B]"
      >
        <Input
          placeholder="البريد الالكتروني  ..."
          className="w-full rounded-xl border border-slate border-gray-200"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="رقم الجوال "
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          {
            pattern: /^\d{10}$/,
            message: "Please enter a valid phone number!",
          },
        ]}
        className="font-semibold text-[#0B101B]"
      >
        <Input
          placeholder="رقم الجوال ..."
          type="tel"
          className="w-full rounded-xl border border-slate border-gray-200"
        />
      </Form.Item>

      <Form.Item
        name="identityNumber"
        label="رقم الهوية / الاقامة"
        rules={[
          {
            required: true,
            message: "Please input your identity number!",
          },
          {
            pattern: /^\d{9}$/,
            message: "Identity number must be exactly 9 digits!",
          },
        ]}
        className="font-semibold text-[#0B101B]"
      >
        <Input
          placeholder="رقم الهوية / الاقامة ..."
          type="number"
          className="w-full rounded-xl border border-slate border-gray-200"
        />
      </Form.Item>
      {/* <Form.Item label="المكتب" name="office" rules={[{ required: true }]}>
    <Select placeholder="اختر المكتب">
      <Select.Option value="demo">Demo</Select.Option>
    </Select>
  </Form.Item> */}
      {/* Submit button */}
      <Form.Item name="hasVehicles"  
        label="  هل لديك سيارة  " rules={[{ required: true }]}>
        <Radio.Group className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-2">
          <Radio.Button
            value="no"
            className="  text-center rounded-xl text-[#0B101B] "
            style={
            { 
              borderRadius:'10px', 
            }
          
          }
          >
            لا
          </Radio.Button>
          <Radio.Button
            className="w-full text-center rounded-xl text-[#0B101B]"
            value="yes"
            style={
            { 
              borderRadius:'10px', 
            }
          
          }
          >
            نعم{" "}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Button
        onClick={previousStep}
        htmlType="submit"
        form="cart-form"
        className="w-full rounded-xl font-bold bg-[#fad7d7] text-[#F30000]"
        style={{
              width:'47%',
              margin:'0px 5px'
            }}
      >
        السابق
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full rounded-xl font-bold"
        style={{
              width:'47%',
              margin:'0px 5px'
            }}
      >
        {t("next")}
      </Button>
    </Form>
  );
};

const StepFour = ({ previousStep, formDataCollector, submitForm }) => {
  const [form] = Form.useForm();
  const [accompanyingGuests, setAccompanyingGuests] = useState([]);

  const addGuest = () => {
    const newGuest = {
      key: Date.now().toString(), // Use Date.now() for a unique key
      name: "",
      email: "",
      phoneNumber: "",
      identityId: "",
    };
    setAccompanyingGuests([...accompanyingGuests, newGuest]);
    form.resetFields(); // Reset form fields after adding a new guest
  };

  const handleGuestChange = (value, key, field) => {
    setAccompanyingGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.key === key ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleFinish = () => {
    console.log("Collected Guests Data:", accompanyingGuests);
    formDataCollector(accompanyingGuests); // Collect all guests data
    submitForm(accompanyingGuests); // Trigger the final submission
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <div className="flex flex-row items-center pb-4">
        <span> {/* SVG and Title Section */} </span>
        <div className="mx-2">
          <p className="text-[#191919] font-bold pb-2">بيانات الضيف </p>
          <p className="text-[#939393] pb-2">من فضلك قم بادخال بيانات الضيف</p>
        </div>
      </div>

      <div className="stepper overflow-hidden">
        <Steps
          current={3}
          progressDot={customDot}
          items={[
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
          ]}
        />
      </div>

      <Button type="primary" htmlType="button" onClick={addGuest}>
        +
      </Button>

      {accompanyingGuests.length > 0 &&
        accompanyingGuests.map((guest) => (
          <div className="guests__card" key={guest.key}>
            <Form.Item
              className="font-semibold text-[#0B101B]"
              label="اسم الضيف"
            >
              <Input
                value={guest.name}
                onChange={(e) =>
                  handleGuestChange(e.target.value, guest.key, "name")
                }
                placeholder="اسم الضيف ..."
                type="text"
                className="w-full rounded-xl border border-slate border-gray-200"
              />
            </Form.Item>

            <Form.Item
              label="البريد الالكتروني  "
              rules={[
                { type: "email", message: "The input is not a valid email!" },
                { required: true, message: "Please input your email!" },
              ]}
              className="font-semibold text-[#0B101B]"
            >
              <Input
                value={guest.email}
                onChange={(e) =>
                  handleGuestChange(e.target.value, guest.key, "email")
                }
                placeholder="البريد الالكتروني  ..."
                className="w-full rounded-xl border border-slate border-gray-200"
              />
            </Form.Item>

            <Form.Item
              label="رقم الجوال"
              rules={[
                { required: true, message: "Please input your phone number!" },
                { pattern: /^\d{10}$/, message: "Enter a valid phone number!" },
              ]}
              className="font-semibold text-[#0B101B]"
            >
              <Input
                value={guest.phoneNumber}
                onChange={(e) =>
                  handleGuestChange(e.target.value, guest.key, "phoneNumber")
                }
                placeholder="رقم الجوال ..."
                type="tel"
                className="w-full rounded-xl border border-slate border-gray-200"
              />
            </Form.Item>

            <Form.Item
              label="رقم الهوية / الاقامة"
              rules={[
                {
                  required: true,
                  message: "Please input your identity number!",
                },
                { pattern: /^\d{9}$/, message: "Identity must be 9 digits!" },
              ]}
              className="font-semibold text-[#0B101B]"
            >
              <Input
                value={guest.identityId}
                onChange={(e) =>
                  handleGuestChange(e.target.value, guest.key, "identityId")
                }
                placeholder="رقم الهوية / الاقامة ..."
                type="number"
                className="w-full rounded-xl border border-slate border-gray-200"
              />
            </Form.Item>
          </div>
        ))}

      <Button
        onClick={previousStep}
        htmlType="submit"
        form="cart-form"
        className="w-full rounded-xl font-bold bg-[#fad7d7] text-[#F30000]"
        style={{ width: "47%", margin: "0px 5px" }}
      >
        السابق
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full rounded-xl font-bold"
        style={{ width: "47%", margin: "0px 5px" }}
      >
        {t("sendOrder")}
      </Button>
    </Form>
  );
};
function Wizard() { 
  const globalModal = useResultModal()
  const [formData, setFormData] = useState({});
  const formDataCollector = (newData) => {
    console.log("🚀 ~ formDataCollector ~ newData:", newData);
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  // Final submission function after Step 3
  const submitForm = async (step4Values) => {
    console.log("🚀 ~ submitForm ~ values:",step4Values);
    try {
      // Log the final form data (you can replace this with an API call)
      console.log("Final Form Data:", formData);
      const formSchema = {
        requesterId: formData.requesterId || "string", // Add default or placeholder values if necessary
        buildingId: formData.building || "string",
        floorId: formData.floorId || "string",
        companyId: formData.companyId || "string",
        sideId: formData.sideId || "string",
        roomId: formData.roomId || "string",
        type: "formData.invitationKind" || "Temporary", // Update to match the type in your request
        date: formData.visitDate || "2024-09-10", // Use formData or a default value
        validFrom: formData.startTime || "2024-09-10T22:44:44.360Z",
        validTo: formData.endTime || "2024-09-10T22:44:44.360Z",
        visitReasonId: formData.invitationReason || "string",
        otherVisitReason: formData.invitationReason || "string",
        guest: {
          name: formData.guestName || "string",
          email: formData.email || "string",
          phoneNumber: formData.phone || "string",
          identityId: formData.identityNumber || "string",
          hasVehicles: formData.hasVehicles === "yes" ? true : false,
          carModel: formData.carModel || "string", // Assuming formData has carModel
          carNumber: formData.carNumber || "string", // Assuming formData has carNumber
          companionCount: formData.companionCount || 0,
        },
        accompanyingGuests: formData.accompanyingGuests?.map(guest => ({
          name: guest.name || "string",
          email: guest.email || "string",
          phoneNumber: guest.phoneNumber || "string",
          identityId: guest.identityId || "string",
          // If `key` is required, include it as well
          key: guest.key || undefined, // Only include if present, or provide a default
        })) || []
      };
      console.log("🚀 ~ submitForm ~ formSchema:", formSchema);
      createNewAdminOrder(formSchema);
      
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
      // You can make an API call here to submit the formData
      // await yourApiCall(formData);

      // Handle success (e.g., navigate to another page or show success message)
      console.log("Form successfully submitted!");
    } catch (error) {
      // Handle errors
      console.error("Form submission error:", error);
    }
  };
  return (
    <div className="Wizard">
      <StepWizard>
        <StepOne
          nextStep={(e) => console.log("Step 1 data:", e)}
          formDataCollector={formDataCollector}
        />
        <StepTwo
          nextStep={(e) => console.log("Step 2 data:", e)}
          formDataCollector={formDataCollector}
        />
        <StepThree
          formDataCollector={formDataCollector}
          formData={formData}
          submitForm={submitForm}
        />
        <StepFour
          formDataCollector={formDataCollector}
          formData={formData}
          submitForm={submitForm}
        />
      </StepWizard>
    </div>
  );
}

export default Wizard;
