import { Form, Input, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormButton from "@/components/forms/FormButton";
import CustomCard from "@/components/CardWithHeader";
import AvatarImage from "@/assets/avatar-image.webp";
import { useEffect, useState } from "react";
import { fetchAllDepartments } from "@/services/departments";
import { fetchAllBuildings } from "@/services/buildings";
import { createUser, fetchOneUser, updateUser } from "@/services/users";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useCountries from "@/hooks/useCountries";
import useRooms from "@/hooks/useRooms";
import useFloors from "@/hooks/useFloors";
import useBuildings from "@/hooks/useBuildings";
import useResultModal from "@/hooks/useResultModal";
import AvatarWithAnchor from "@/components/AvatarWithAnchor";
import CountrySelector from "@/components/forms/CountrySelector";
import PhoneInput from "@/components/forms/PhoneInput";
import useTheme from "@/hooks/useTheme";
import RoomSelector from "@/components/forms/RoomSelector";
export default function CreateEmployee() {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const { token } = useTheme();
  const globalModal = useResultModal();
  let [searchParams, setSearchParams] = useSearchParams();
  let userId = searchParams.get("userId");
  const createEmployeeMutation = useMutation({
    mutationFn: (values) => createUser(values),
    onSuccess: () => {
      form.resetFields();
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("employeeCreatedSuccessfully"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(
        t("somethingWentWrong"),
        t("employeeNotCreated"),
        error?.response?.data?.errors.join("\n")
      );
    },
  });
  const updateEmployeeMutation = useMutation({
    mutationFn: (values) => updateUser(values),
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("employeeUpdatedSuccessfully"),
      });
    },
    onError: (error) => {
      console.log(error);
      globalModal.error(
        t("somethingWentWrong"),
        t("employeeNotUpdated"),
        error?.response?.data?.errors.join("\n")
      );
    },
  });
  const existingUser = useQuery({
    queryKey: ["existingUser", userId],
    queryFn: () => fetchOneUser(userId),
    enabled: !!userId,
  });

  const { data: departments, isPending: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      fetchAllDepartments({
        isActive: true,
        isGetAll: true,
      }),
  });
  const {
    data: buildings,
    isPending: buildingsLoading,
    error,
  } = useBuildings();
  const buildingId = Form.useWatch("buildingId", form);
  const floorId = Form.useWatch("floorId", form);
  const { data: floors, isPending: floorsLoading } = useFloors({ buildingId });
  const { data: rooms, isPending: roomsLoading } = useRooms({
    floorId,
  });
  const onFinish = (values) => {
    values.photo = file;
    if (typeof values.phoneNumber == "object") {
      delete values.phoneNumber;
    }
    if (!!userId) {
      updateEmployeeMutation.mutate({ ...values, id: userId });
    } else {
      createEmployeeMutation.mutate(values);
    }
  };
  useEffect(() => {
    if (existingUser?.data) {
      let flattenedData = existingUser?.data?.data;
      form.setFieldsValue({
        ...existingUser?.data.data,
        phoneNumber: flattenedData?.phoneNumber?.replace("+", ""),
        nationalityCode: flattenedData?.nationality?.code,
        isActive: flattenedData?.isActive?.toString(),
        floorId: flattenedData?.room?.floorId,
        buildingId: flattenedData?.room?.buildingId,
      });
    }
  }, [existingUser.isPending]);
  return (
    <div className="w-full">
      <CustomCard titleSlot={t("mainInformation")}>
        <Form
          form={form}
          name="add-employee"
          layout="vertical"
          onFinish={onFinish}
          initialValues={existingUser?.data?.data || { isActive: "true" }}
        >
          <Form.Item
            name={"picture"}
            hidden
            getValueFromEvent={(e) => {
              setFile(e.currentTarget.files[0]);
              return e.currentTarget.value;
            }}
          >
            <Input type={"file"} id="user-photo-input" />
          </Form.Item>
          <div className="flex items-center justify-center">
            <AvatarWithAnchor
              avatarProps={{
                onClick: () => {
                  document.getElementById("user-photo-input").click();
                },
                size: 180,
                src: file ? URL.createObjectURL(file) : AvatarImage,
              }}
            >
              <Dropdown
                trigger={"click"}
                placement="bottomCenter"
                menu={{
                  items: [
                    file && {
                      label: t("remove"),
                      onClick: () => {
                        setFile(undefined);
                      },
                    },

                    {
                      label: t("change"),
                      onClick: () => {
                        document.getElementById("user-photo-input").click();
                      },
                    },
                  ],
                }}
              >
                <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  icon={<FaPlus />}
                />
              </Dropdown>
            </AvatarWithAnchor>
          </div>
          <div className="flex gap-4">
            <Form.Item
              name="userName"
              className="basis-1/3"
              label={t("username")}
              rules={[{ required: true }]}
            >
              <FormInput name={"username"} />
            </Form.Item>
            <Form.Item
              name={"firstName"}
              label={t("firstName")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormInput size="large" name={"firstName"} />
            </Form.Item>
            <Form.Item
              name={"lastName"}
              label={t("lastName")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormInput size="large" name={"lastName"} />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"gender"}
              label={t("sex")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormSelect
                size="large"
                options={[
                  { value: 1, label: t("male") },
                  { value: 2, label: t("female") },
                ]}
              />
            </Form.Item>
            <Form.Item
              name={"nationalityCode"}
              label={t("nationality")}
              initialValue={"SA"}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <CountrySelector size="large" />
            </Form.Item>
            <Form.Item
              name={"phoneNumber"}
              label={t("phoneNumber")}
              className="basis-1/3"
              normalize={(value) => {
                if (!value.valid()) return null;
                return `+${value.countryCode}${value.areaCode}${value.phoneNumber}`;
              }}
            >
              <PhoneInput size="large" />
            </Form.Item>
            {/* <Form.Item
              name="empDate"
              className="basis-1/3"
              label={t("empDate")}
            >
              <FormDatePicker size="large" />
            </Form.Item> */}
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"jobTitle"}
              label={t("jobTitle")}
              className="basis-1/3"
            >
              <FormInput size="large" />
            </Form.Item>
            <Form.Item
              name={"companyEmplyeeId"}
              label={t("companyEmplyeeId")}
              className="basis-1/3"
            >
              <FormSelect size="large" />
            </Form.Item>
            <Form.Item
              name={"departmentId"}
              label={t("department")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormSelect
                size="large"
                options={departments?.data.map((department) => ({
                  label: department.name,
                  value: department.id,
                }))}
              />
            </Form.Item>
          </div>
          <div
            className="px-3 py-3 font-semibold text-lg rounded-xl mb-4"
            style={{
              backgroundColor: token.geekblue1,
            }}
          >
            {t("accountType")}
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"type"}
              label={t("accountType")}
              className="basis-1/3"
            >
              <FormSelect
                size="large"
                options={[
                  { label: t("admin"), value: 0 },
                  { label: t("employee"), value: 1 },
                  { label: t("restaurant"), value: 2 },
                  { label: t("reception"), value: 3 },
                  { label: t("security"), value: 4 },
                  {
                    label: t("restaurantAdmin"),
                    value: 5,
                  },
                  {
                    label: t("waiter"),
                    value: 6,
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div
            className="px-3 py-3 font-semibold text-lg rounded-xl mb-4"
            style={{
              backgroundColor: token.geekblue1,
            }}
          >
            {t("accountInfo")}
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"email"}
              label={t("email")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormInput size="large" />
            </Form.Item>
            <Form.Item
              name={"password"}
              label={t("password")}
              rules={[
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  message: t("passwordValidation"),
                },
                {
                  required: !userId,
                },
              ]}
              className="basis-1/3"
            >
              <FormInput size="large" />
            </Form.Item>
            <Form.Item
              name="isActive"
              className="basis-1/3"
              label={t("status")}
            >
              <FormSelect
                size="large"
                options={[
                  {
                    label: t("active"),
                    value: "true",
                  },
                  {
                    label: t("inActive"),
                    value: "false",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div
            className="px-3 py-3 font-semibold text-lg rounded-xl mb-4"
            style={{
              backgroundColor: token.geekblue1,
            }}
          >
            {t("officeDetails")}
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"buildingId"}
              label={t("building")}
              className="basis-1/3"
              rules={[{ required: true }]}
            >
              <FormSelect
                size="large"
                options={buildings?.data?.map((building) => ({
                  label: building.name,
                  value: building.id,
                }))}
                loading={buildings?.isPending}
              />
            </Form.Item>
            <Form.Item
              name={"floorId"}
              label={t("floor")}
              rules={[
                {
                  required: true,
                },
              ]}
              className="basis-1/3"
            >
              <FormSelect
                size="large"
                disabled={!buildingId}
                options={floors?.data}
                fieldNames={{
                  label: "name",
                  value: "id",
                }}
              />
            </Form.Item>
            <Form.Item name="roomId" className="basis-1/3" label={t("office")}>
              <FormSelect
                size="large"
                disabled={!floorId}
                options={rooms?.data}
                loading={roomsLoading}
                fieldNames={{
                  label: "name",
                  value: "id",
                }}
              />
            </Form.Item>
          </div>
          <div className="w-full flex justify-center">
            <FormButton
              className="w-1/3 text-lg"
              type="primary"
              htmlType="submit"
              loading={createEmployeeMutation.isPending}
            >
              {t("saveAndSubmit")}
            </FormButton>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
}
