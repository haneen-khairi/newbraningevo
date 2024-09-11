import FormInput from "@/components/forms/FormInput";
import FormTimepicker from "@/components/forms/FormTimepicker";
import { useBuildings } from "@/services/buildingsv2";
import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

export default function ServicesProviderForm({
  initialValues,
  onSubmit,
  allUsers,
}) {
  const { t, i18n } = useTranslation();

  const [form] = Form.useForm();

  const statusOptions = [
    {
      value: "Online",
      label: t("active"),
    },
    {
      value: "Offline",
      label: t("inactive"),
    },
  ];

  const usersOptions = allUsers?.data
    ?.map((el) => {
      return {
        value: i18n.language == "ar" ? el.fullName : el.fullNameEn, //endPoint take name not id
        label: i18n.language == "ar" ? el.fullName : el.fullNameEn,
      };
    })
    ?.filter((el) => el.label !== null);

  const permissionsOptions = [
    {
      value: 0,
      label: t("administrator"),
    },
    {
      value: 1,
      label: t("employeee"),
    },
    {
      value: 2,
      label: t("restaurant"),
    },
    {
      value: 3,
      label: t("reception"),
    },
    {
      value: 4,
      label: t("security"),
    },
    {
      value: 5,
      label: t("restaurantAdministrator"),
    },
    {
      value: 6,
      label: t("restaurantWaiter"),
    },
    {
      value: 7,
      label: t("busDriver"),
    },
    {
      value: 8,
      label: t("vipDriver"),
    },
  ];

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

  useEffect(() => {
    if (initialValues?.id) {
      form.setFieldValue("name",initialValues.name)
      form.setFieldValue("status",initialValues.status==1?"Online":"Offline")
      form.setFieldValue("bloodType",initialValues.bloodType)
      form.setFieldValue("identityId",initialValues.identityId)
      form.setFieldValue("type",initialValues.type)
    }
  }, [])
  

  return (
    <Form
      form={form}
      layout="vertical"
      id="user-form"
      onFinish={(values) => {
        values.id=initialValues?.id;
        onSubmit(values);
      }}
    >
      <Form.Item label={t("userName")} name="name">
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder={t("userName")}
          optionFilterProp="label"
          options={usersOptions}
          suffixIcon={
            <svg
              width="11"
              height="6"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59168 4.16711C6.51421 4.24522 6.42204 4.30721 6.32049 4.34952C6.21894 4.39183 6.11002 4.41361 6.00001 4.41361C5.89 4.41361 5.78108 4.39183 5.67953 4.34952C5.57798 4.30721 5.48581 4.24522 5.40834 4.16711L1.59168 0.342109C1.51421 0.264002 1.42204 0.202006 1.32049 0.159699C1.21894 0.117392 1.11002 0.0956106 1.00001 0.0956106C0.889999 0.0956106 0.781078 0.117392 0.679528 0.159699C0.577979 0.202006 0.485812 0.264002 0.408342 0.342109C0.253133 0.498244 0.166015 0.709454 0.166015 0.929609C0.166015 1.14976 0.253133 1.36097 0.408342 1.51711L4.23334 5.34211C4.70209 5.81028 5.33751 6.07324 6.00001 6.07324C6.66251 6.07324 7.29792 5.81028 7.76668 5.34211L11.5917 1.51711C11.7456 1.36189 11.8324 1.15239 11.8333 0.933775C11.834 0.824103 11.813 0.715384 11.7715 0.613852C11.73 0.512321 11.6689 0.419975 11.5917 0.342109C11.5142 0.264001 11.422 0.202006 11.3205 0.159698C11.2189 0.117391 11.11 0.0956101 11 0.0956101C10.89 0.0956101 10.7811 0.117391 10.6795 0.159699C10.578 0.202006 10.4858 0.264001 10.4083 0.342109L6.59168 4.16711Z"
                fill="#38ACB1"
              />
            </svg>
          }
        />
      </Form.Item>

      <Form.Item label={t("accountType")} name="type">
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder={t("accountType")}
          optionFilterProp="label"
          options={permissionsOptions}
          suffixIcon={
            <svg
              width="11"
              height="6"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59168 4.16711C6.51421 4.24522 6.42204 4.30721 6.32049 4.34952C6.21894 4.39183 6.11002 4.41361 6.00001 4.41361C5.89 4.41361 5.78108 4.39183 5.67953 4.34952C5.57798 4.30721 5.48581 4.24522 5.40834 4.16711L1.59168 0.342109C1.51421 0.264002 1.42204 0.202006 1.32049 0.159699C1.21894 0.117392 1.11002 0.0956106 1.00001 0.0956106C0.889999 0.0956106 0.781078 0.117392 0.679528 0.159699C0.577979 0.202006 0.485812 0.264002 0.408342 0.342109C0.253133 0.498244 0.166015 0.709454 0.166015 0.929609C0.166015 1.14976 0.253133 1.36097 0.408342 1.51711L4.23334 5.34211C4.70209 5.81028 5.33751 6.07324 6.00001 6.07324C6.66251 6.07324 7.29792 5.81028 7.76668 5.34211L11.5917 1.51711C11.7456 1.36189 11.8324 1.15239 11.8333 0.933775C11.834 0.824103 11.813 0.715384 11.7715 0.613852C11.73 0.512321 11.6689 0.419975 11.5917 0.342109C11.5142 0.264001 11.422 0.202006 11.3205 0.159698C11.2189 0.117391 11.11 0.0956101 11 0.0956101C10.89 0.0956101 10.7811 0.117391 10.6795 0.159699C10.578 0.202006 10.4858 0.264001 10.4083 0.342109L6.59168 4.16711Z"
                fill="#38ACB1"
              />
            </svg>
          }
        />
      </Form.Item>

      <Form.Item label={t("editAccountStatus")} name="status">
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder={t("editAccountStatus")}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={statusOptions}
          suffixIcon={
            <svg
              width="11"
              height="6"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59168 4.16711C6.51421 4.24522 6.42204 4.30721 6.32049 4.34952C6.21894 4.39183 6.11002 4.41361 6.00001 4.41361C5.89 4.41361 5.78108 4.39183 5.67953 4.34952C5.57798 4.30721 5.48581 4.24522 5.40834 4.16711L1.59168 0.342109C1.51421 0.264002 1.42204 0.202006 1.32049 0.159699C1.21894 0.117392 1.11002 0.0956106 1.00001 0.0956106C0.889999 0.0956106 0.781078 0.117392 0.679528 0.159699C0.577979 0.202006 0.485812 0.264002 0.408342 0.342109C0.253133 0.498244 0.166015 0.709454 0.166015 0.929609C0.166015 1.14976 0.253133 1.36097 0.408342 1.51711L4.23334 5.34211C4.70209 5.81028 5.33751 6.07324 6.00001 6.07324C6.66251 6.07324 7.29792 5.81028 7.76668 5.34211L11.5917 1.51711C11.7456 1.36189 11.8324 1.15239 11.8333 0.933775C11.834 0.824103 11.813 0.715384 11.7715 0.613852C11.73 0.512321 11.6689 0.419975 11.5917 0.342109C11.5142 0.264001 11.422 0.202006 11.3205 0.159698C11.2189 0.117391 11.11 0.0956101 11 0.0956101C10.89 0.0956101 10.7811 0.117391 10.6795 0.159699C10.578 0.202006 10.4858 0.264001 10.4083 0.342109L6.59168 4.16711Z"
                fill="#38ACB1"
              />
            </svg>
          }
        />
      </Form.Item>

      <Form.Item label={t("workDays")} name="workDays">
        <Select
          showSearch
          mode="multiple"
          style={{ width: "100%" }}
          placeholder={t("workDays")}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={daysOfWeek}
          suffixIcon={
            <svg
              width="11"
              height="6"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59168 4.16711C6.51421 4.24522 6.42204 4.30721 6.32049 4.34952C6.21894 4.39183 6.11002 4.41361 6.00001 4.41361C5.89 4.41361 5.78108 4.39183 5.67953 4.34952C5.57798 4.30721 5.48581 4.24522 5.40834 4.16711L1.59168 0.342109C1.51421 0.264002 1.42204 0.202006 1.32049 0.159699C1.21894 0.117392 1.11002 0.0956106 1.00001 0.0956106C0.889999 0.0956106 0.781078 0.117392 0.679528 0.159699C0.577979 0.202006 0.485812 0.264002 0.408342 0.342109C0.253133 0.498244 0.166015 0.709454 0.166015 0.929609C0.166015 1.14976 0.253133 1.36097 0.408342 1.51711L4.23334 5.34211C4.70209 5.81028 5.33751 6.07324 6.00001 6.07324C6.66251 6.07324 7.29792 5.81028 7.76668 5.34211L11.5917 1.51711C11.7456 1.36189 11.8324 1.15239 11.8333 0.933775C11.834 0.824103 11.813 0.715384 11.7715 0.613852C11.73 0.512321 11.6689 0.419975 11.5917 0.342109C11.5142 0.264001 11.422 0.202006 11.3205 0.159698C11.2189 0.117391 11.11 0.0956101 11 0.0956101C10.89 0.0956101 10.7811 0.117391 10.6795 0.159699C10.578 0.202006 10.4858 0.264001 10.4083 0.342109L6.59168 4.16711Z"
                fill="#38ACB1"
              />
            </svg>
          }
        />
      </Form.Item>

      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label={t("WorkingHoursFrom")} name="startDate">
            <FormTimepicker
              suffixIcon={<IoMdTime className="text-2xl" />}
              format="HH:mm"
              placeholder={t("WorkingHoursFrom")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t("WorkingHoursTo")} name="endDate">
            <FormTimepicker
              suffixIcon={<IoMdTime className="text-2xl" />}
              format="HH:mm"
              placeholder={t("WorkingHoursTo")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={12}>
          <Form.Item label={t("BreakTimeFrom")} name="restHourStart">
            <FormTimepicker
              suffixIcon={<IoMdTime className="text-2xl" />}
              format="HH:mm"
              placeholder={t("BreakTimeFrom")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t("BreakTimeTo")} name="restHourEnd">
            <FormTimepicker
              suffixIcon={<IoMdTime className="text-2xl" />}
              format="HH:mm"
              placeholder={t("BreakTimeTo")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label={t("IdentificationNumber")} name="identityId">
        <FormInput placeholder={t("IdentificationNumber")} />
      </Form.Item>

      <Form.Item label={t("bloodType")} name="bloodType">
        <FormInput placeholder={t("bloodType")} />
      </Form.Item>
    </Form>
  );
}
