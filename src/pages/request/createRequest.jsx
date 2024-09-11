import { useTranslation } from "react-i18next";
import { Form, Input, Radio, TimePicker } from "antd";
import FormSelect from "@/components/forms/FormSelect";
import CustomCard from "@/components/CardWithHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/services/users";
import { createGuest, addGuestCar } from "@/services/guests";
import {
  createRequest,
  inviteByEmail,
  updateRequest,
} from "@/services/requests";
import BgSelect from "@/components/forms/FormSelect";
import BgInput from "@/components/forms/FormInput";
import BgButton from "@/components/forms/FormButton";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import useResultModal from "@/hooks/useResultModal";
import { useSelector } from "react-redux";
import { ByGuest } from "./ByGuest";
import { ByLink } from "./AddByLink";
import RoomSelector from "../../components/forms/RoomSelector";
import MultipleTimes from "./components/multipleTimes";
// import OneTime from "./components/oneTime";
import BuildingSelector from "../../components/forms/BuildingSelector";
import trimInputs from "@/utils/trimInputs";
import { fetchOneRequest, inviteByWhatsapp } from "../../services/requests";
import { inviteTypesByName } from "../../enums/invite";
import useFloors from "../../hooks/useFloors";
function Home() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [addonType, setAddonType] = useState("guest"); // ENUM: [email,link]]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const type = Form.useWatch("type", form);
  const building = Form.useWatch("building", form);
  const floorId = Form.useWatch("floorId", form);
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const { ability } = useSelector((state) => state.ability);
  const { data: inviteDetails } = useQuery({
    queryKey: ["invite", id],
    queryFn: () => fetchOneRequest(id),
    enabled: isEdit,
  });
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetchAllUsers({
        isGetAll: true,
      });
    },
  });
  const { data: floors } = useFloors({
    buildingId: building,
  });
  useEffect(() => {
    if (isEdit && inviteDetails) {
      let inviteDetailsData = inviteDetails.data;
      form.setFieldsValue({
        subject: inviteDetailsData.subject,
        party: inviteDetailsData.party,
        requesterId: inviteDetailsData.requester.id,
        notes: inviteDetailsData.notes,
        type: inviteDetailsData.type.toString(),
        building: inviteDetailsData.room.building.id,
        floorId: inviteDetailsData.room.floorId,
        roomId: inviteDetailsData.room.id,
      });
      if (inviteDetailsData.type == inviteTypesByName.oneTime) {
        form.setFieldsValue({
          inviteDate: dayjs(inviteDetailsData.validFrom),
          inviteFromHour: dayjs(inviteDetailsData.validFrom),
        });
      }
      if (inviteDetailsData.type == inviteTypesByName.multipleTimes) {
        form.setFieldsValue({
          startDate: dayjs(inviteDetailsData.validFrom),
          endDate: dayjs(inviteDetailsData.validTo),
          startTime: dayjs(inviteDetailsData.validFrom),
          endTime: dayjs(inviteDetailsData.validTo),
        });
      }
    }
  }, [isEdit, inviteDetails]);
  async function handleSubmit(values) {
    let validFrom;
    let validTo;
    switch (parseInt(type)) {
      case inviteTypesByName.multipleTimes:
        validFrom = dayjs(values.startDate)
          .set("hour", values.startTime.hour())
          .set("minute", values.startTime.minute())
          .format();
        validTo = dayjs(values.endDate)
          .set("hour", values.endTime.hour())
          .set("minute", values.endTime.minute())
          .format();
        break;
      case inviteTypesByName.oneTime:
        validFrom = `${values.inviteDate?.format(
          "YYYY-MM-DD"
        )}T${values.inviteFromHour?.format("HH:mm:ssZ")}`;
        validTo = null;
        break;
      default:
        validFrom = null;
        validTo = null;
    }
    let formattedValues = trimInputs({
      ...values,
      validFrom,
      validTo,
      isQuick: type == inviteTypesByName.quick,
      type: type == inviteTypesByName.quick ? null : type,
    });

    setIsSubmitting(true);
    try {
      if (isEdit) {
        //compare request with values and only send changed values
        let request = inviteDetails.data;
        let changedValues = {};
        for (let key in formattedValues) {
          if (
            request[key] !== formattedValues[key] &&
            formattedValues[key] !== null
          )
            changedValues[key] = formattedValues[key];
        }
        if (Object.keys(changedValues).length === 0) {
          setIsSubmitting(false);
          return;
        }
        await updateRequest({
          ...changedValues,
          id,
        });
      } else {
        if (addonType === "guest") {
          await addByGuest(formattedValues);
        }
        if (addonType === "email" && values.byEmail == "email") {
          await addByEmail(formattedValues);
        }
        if (addonType === "email" && values.byEmail == "whats") {
          await addByWhatsapp(formattedValues);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setIsSubmitting(false);
  }
  async function addByGuest(values) {
    let addedGuests = [];
    try {
      if (values.guests.length > 0) {
        for (let [index, guest] of values.guests.entries()) {
          //if not first guest set is
          //convert guest object to formdata

          let phone = guest?.phoneNumber;
          if (phone && phone.valid()) {
            guest.phoneNumber = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`;
          } else {
            guest.phoneNumber = null;
          }
          let guestFormData = new FormData();
          guest.attachments = guest?.attachments ?? [];

          for (let key in guest) {
            if (key === "attachments") {
              for (let file of guest[key]) {
                guestFormData.append("attachments", file);
              }
            } else {
              //only not null values
              if (guest[key] != null && guest[key] != undefined) {
                guestFormData.append(key, guest[key]);
              }
            }
          }

          let createdGuest = await createGuest(guestFormData);
          let guestObject = {
            guestId: createdGuest.data.id,
            carId: null,
          };
          if (guest.hasCar == 1) {
            let carId = await addGuestCar(
              createdGuest.data.id,
              guest.carNumber,
              guest.carModel,
              guest.carColor
            );
            guestObject = {
              ...guestObject,
              carId: carId.data.id,
            };
          }
          addedGuests.push(guestObject);
        }
      }

      await createRequest({
        ...values,
        requestGuests: addedGuests.map(({ guestId, carId }, index) => ({
          guestId,
          guestVehicleId: carId,
          isCompanion: index > 0,
        })),
      });
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("requestCreated"),
      });

      navigate("/requests", { replace: true });
    } catch (e) {
      console.log(e);
      globalModal.error(
        t("somethingWentWrong"),
        t("requestNotCreated"),
        e?.response?.data?.errors.map((e) => <div>{e}</div>) ?? e.message
      );
    }
  }
  async function addByEmail(values) {
    try {
      if (!values.isAllowGuestVehicle) {
        values.isAllowGuestVehicle = false;
      }
      values.status = 0;
      let inviteId = (await createRequest(values)).data;

      await inviteByEmail(inviteId.id, values.email);
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("requestCreated"),
      });
      navigate("/requests", { replace: true });
    } catch (e) {
      globalModal.error(t("somethingWentWrong"), t("requestNotCreated"));
      return;
    }
  }
  async function addByWhatsapp(values) {
    try {
      if (!values.isAllowGuestVehicle) {
        values.isAllowGuestVehicle = false;
      }
      let phone = values?.phoneNumber;
      if (phone && phone.valid()) {
        values.phoneNumber = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`;
      } else {
        values.phoneNumber = null;
      }
      values.status = 0;
      let inviteId = (await createRequest(values)).data;
      await inviteByWhatsapp(inviteId.id, values.phoneNumber.replace("+", ""));
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("requestCreated"),
      });
      navigate("/requests", { replace: true });
    } catch (e) {
      console.log(e);
      globalModal.error(t("somethingWentWrong"), t("requestNotCreated"));
    }
  }
  return (
    <div className="w-10/12 mx-auto">
      <CustomCard>
        <h1 className="text-2xl font-bold mb-4">{t("inviteDetails")}</h1>
        <Form
          initialValues={{
            type: "0",
            startTime: dayjs(),
            endTime: dayjs(),
            startDate: dayjs(),
          }}
          layout="vertical"
          form={form}
          onFinishFailed={(e) => console.error(e)}
          onFinish={handleSubmit}
          validateMessages={{
            required: t("requiredField"),
          }}
          scrollToFirstError={true}
        >
          <Form.Item
            name={"subject"}
            label={t("inviteTopic")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <BgInput size="large" />
          </Form.Item>
          <div className="flex gap-4">
            {ability.can("manage", "Administrator") && (
              <Form.Item
                name={"requesterId"}
                label={t("inviteHoster")}
                style={{ width: "50%" }}
              >
                <BgSelect
                  size="large"
                  loading={users.isPending}
                  options={
                    users.isPending
                      ? []
                      : users?.data?.data?.map((user) => ({
                          value: user.id,
                          label: user.name,
                        }))
                  }
                />
              </Form.Item>
            )}
            <Form.Item
              name={"party"}
              label={t("inviteCompany")}
              style={{ width: "50%" }}
            >
              <BgInput size="large" />
            </Form.Item>
          </div>

          <Form.Item name="notes" label={t("inviteNotes")}>
            <Input.TextArea />
          </Form.Item>
          <div className="p-3 bg-[#38ACB10A] font-bold my-2">
            {t("inviteType")}
          </div>
          <Form.Item name={"type"}>
            <Radio.Group
              onChange={() => {
                setAddonType("guest");
              }}
            >
              <Radio value="0"> {t("multipleTimes")} </Radio>
              <Radio value="2"> {t("oneTime")} </Radio>
              <Radio value="3"> {t("quickVisit")} </Radio>
            </Radio.Group>
          </Form.Item>

          <div className="flex gap-4">
            {type == inviteTypesByName.multipleTimes && <MultipleTimes />}
            {type == inviteTypesByName.oneTime && <OneTime />}
          </div>
          <div className="flex gap-4">
            <Form.Item
              name={"building"}
              label={t("inviteBuilding")}
              style={{ width: "50%" }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <BuildingSelector
                size="large"
                onChange={() => {
                  form.resetFields(["floorId"]);
                }}
              />
            </Form.Item>
            <Form.Item
              name={"floorId"}
              label={t("inviteFloor")}
              style={{ width: "50%" }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <FormSelect
                size="large"
                options={floors?.data ?? []}
                fieldNames={{
                  label: "name",
                  value: "id",
                }}
                disabled={!building}
                onChange={() => {
                  form.resetFields(["roomId"]);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name={"roomId"}
              label={t("inviteRoom")}
              style={{ width: "50%" }}
            >
              <RoomSelector
                floorId={floorId}
                size="large"
                disabled={!floorId}
              />
            </Form.Item>
          </div>
          {!isEdit && (
            <>
              <div className="p-3 bg-[#38ACB10A] font-bold my-2">
                {t("inviteAddonType")}
              </div>
              <div className="flex gap-4 mb-3">
                {type != 3 && (
                  <>
                    <BgButton
                      type={addonType === "guest" ? "primary" : "default"}
                      style={{
                        width: "50%",
                      }}
                      onClick={() => setAddonType("guest")}
                    >
                      {t("inviteAddGuest")}
                    </BgButton>
                    <BgButton
                      type={addonType === "email" ? "primary" : "default"}
                      style={{
                        width: "50%",
                      }}
                      onClick={() => {
                        setAddonType("email");
                        form.resetFields(["guests"]);
                      }}
                    >
                      {t("inviteSendLink")}
                    </BgButton>
                  </>
                )}
              </div>
            </>
          )}
          {!isEdit && (addonType === "guest" ? <ByGuest /> : <ByLink />)}
          <div className="flex justify-center">
            <BgButton
              loading={isSubmitting}
              htmlType="submit"
              className="w-1/4"
              type="primary"
            >
              {t("saveAndSubmit")}
            </BgButton>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
}
Home.hasSidebar = false;
export default Home;
