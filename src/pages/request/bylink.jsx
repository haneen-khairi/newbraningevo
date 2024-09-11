import {
  Flex,
  Form,
  Radio,
  Spin,
  Button,
  Image,
  Modal,
  Typography,
  Dropdown,
} from "antd";
import usaFlag from "@/assets/usa_flag.svg";
import ksaFlag from "@/assets/ksa_flag.svg";
import { MdLanguage } from "react-icons/md";

import logo from "@/assets/logo.png";
import header from "@/assets/header.png";
import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormButton from "@/components/forms/FormButton";
import FormRadioButton from "@/components/forms/FormRadioButton";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  addGuestRequest,
  fetchOneRequest,
  closeAddGuests,
} from "@/services/requests";

import { createGuest, addGuestCar } from "@/services/guests";
import SuccessModalImage from "@/assets/success-modal.png";
import PhoneInput from "@/components/forms/PhoneInput";
import CountrySelector from "@/components/forms/CountrySelector";
import * as _ from "lodash";
import ColorInput from "@/components/forms/ColorInput";
import { useQuery } from "@tanstack/react-query";

export default function PublicInvite() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  let emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const phone = searchParams.get("mobile");
  const [form] = Form.useForm();
  const guests = Form.useWatch("guests", form);
  const [photoModal, setPhotoModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isPending, error } = useQuery({
    queryKey: ["request", id],
    queryFn: () => fetchOneRequest(id),
  });

  async function handleSubmit(values) {
    setIsSubmitting(true);
    try {
      for (let [index, singleGuest] of values.guests.entries()) {
        let phone = singleGuest?.phoneNumber;
        if (phone && phone.valid()) {
          singleGuest.phoneNumber = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`;
        } else {
          singleGuest.phoneNumber = null;
        }
        singleGuest.isCompanion = index > 0;
        let guest = await createGuest(singleGuest);
        const guestObj = {
          guestId: guest?.data.id,
          requestId: id,
        };
        if (singleGuest.hasCar == "1") {
          let car = await addGuestCar(
            guest?.data.id,
            singleGuest.carNumber,
            singleGuest.carModel,
            singleGuest.carColor
          );
          guestObj.guestVehicleId = car.data.id;
        }
        let request = await addGuestRequest(guestObj);
      }
      await closeAddGuests(id);
      setSuccessModal(true);
    } catch (e) {
      console.log(e);
    }
    setIsSubmitting(false);
  }
  function returnLabel(inputLabel, identityType) {
    switch (form.getFieldValue(["guests", inputLabel, "identityType"])) {
      case "0":
        return t(`identity${identityType}`);
      case "1":
        return t(`iqama${identityType}`);
      case "2":
        return t(`passport${identityType}`);
    }
  }
  function returnRegex(inputLabel) {
    switch (form.getFieldValue(["guests", inputLabel, "identityType"])) {
      case "0":
        return /^[0-9]*$/;
      case "1":
        return /^[0-9]*$/;
      case "2":
        return /^[a-zA-Z0-9]*$/;
    }
  }

  return (
    <div className="w-full" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Flex
        style={{
          width: "100%",
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          paddingBottom: "5vh",
        }}
        vertical
        id="container"
      >
        <div
          id="logo"
          style={{
            width: "90%",
            margin: "4vh auto",
          }}
        >
          <img src={logo}></img>
        </div>
      </Flex>
      <div className="w-10/12 mx-auto h-12 relative -top-8 rounded-lg ">
        <CustomCard
          titleSlot={
            <div className="flex justify-between w-full items-center">
              <Typography>{t("inviteDetails")}</Typography>
              <div id="buttons">
                <Dropdown
                  placement="bottomLeft"
                  menu={{
                    items: [
                      {
                        label: (
                          <img src={usaFlag} width={"20px"} height={"20px"} />
                        ),
                        key: "en",
                      },
                      {
                        label: (
                          <img src={ksaFlag} width={"20px"} height={"20px"} />
                        ),
                        key: "ar",
                      },
                    ],
                    onClick: ({ key }) => {
                      i18n.changeLanguage(key);
                      localStorage.setItem("lang", key);
                    },
                  }}
                >
                  <Button icon={<MdLanguage size={22} />} />
                </Dropdown>
              </div>
            </div>
          }
        >
          <Spin spinning={isPending}>
            {id && !error && data?.data?.isAllowGuestEdits && (
              <Form onFinish={handleSubmit} form={form} layout="vertical">
                <Form.List name="guests" initialValue={[]}>
                  {(fields, { add, remove }) => (
                    <>
                      {guests &&
                        fields.length <= 0 &&
                        add({
                          firstName: "",
                          email: email,
                          phoneNumber: phone,
                        })}

                      {fields.length > 0 &&
                        fields.map(({ key, name, ...rest }) => {
                          return (
                            <>
                              <Flex className="flex gap-4 flex-wrap">
                                <Form.Item
                                  className="grow"
                                  label={t("firstName")}
                                  name={[name, "firstName"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                  ]}
                                >
                                  <FormInput size="large" />
                                </Form.Item>
                                <Form.Item
                                  className="grow"
                                  label={t("lastName")}
                                  name={[name, "lastName"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                  ]}
                                >
                                  <FormInput size="large" />
                                </Form.Item>
                                <Form.Item
                                  className="grow"
                                  label={t("email")}
                                  name={[name, "email"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                    {
                                      pattern: emailRegex,
                                      message: t("emailPattern"),
                                    },
                                  ]}
                                  style={{
                                    visibility: email ? "hidden" : "visible",
                                  }}
                                >
                                  <FormInput size="large" />
                                </Form.Item>
                              </Flex>
                              <div className="grid md:grid-cols-3 gap-4 ">
                                <Form.Item
                                  className="basis-1/3"
                                  label={t("phoneNumber")}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                  ]}
                                  name={[name, "phoneNumber"]}
                                  style={{
                                    visibility: phone ? "hidden" : "visible",
                                  }}
                                >
                                  <PhoneInput size="large" />
                                </Form.Item>
                                <Form.Item
                                  className="basis-1/3"
                                  name={[name, "gender"]}
                                  label={t("guestSex")}
                                  initialValue={0}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                  ]}
                                >
                                  <FormSelect
                                    size="large"
                                    options={[
                                      {
                                        label: t("male"),
                                        value: 0,
                                      },
                                      {
                                        label: t("female"),
                                        value: 1,
                                      },
                                    ]}
                                  />
                                </Form.Item>
                                <Form.Item
                                  className="basis-1/3"
                                  label={t("nationality")}
                                  initialValue={"SA"}
                                  name={[name, "nationalityCode"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("requiredField"),
                                    },
                                  ]}
                                >
                                  <CountrySelector size="large" />
                                </Form.Item>
                              </div>
                              <Form.Item
                                name={[name, "identityType"]}
                                label={t("identityType")}
                              >
                                <Radio.Group>
                                  <Radio value={"0"}>
                                    {t("nationalityCard")}
                                  </Radio>
                                  <Radio value={"1"}>{t("iqama")}</Radio>
                                  <Radio value={"2"}>{t("passport")}</Radio>
                                </Radio.Group>
                              </Form.Item>
                              {guests?.[name]?.identityType && (
                                <div className="grid md:grid-cols-2 gap-4">
                                  <Form.Item
                                    name={[name, "identityId"]}
                                    label={returnLabel(name, "Number")}
                                    className="col-span-1"
                                    dependencies={[
                                      ["guests", name, "identityType"],
                                    ]}
                                    rules={[
                                      {
                                        min: 10,
                                        message:
                                          guests[name].identityType != 2
                                            ? t("identityNumberLength")
                                            : t("passportInputLength"),
                                      },
                                      {
                                        max: 10,
                                        message:
                                          guests[name].identityType != 2
                                            ? t("identityNumberLength")
                                            : t("passportInputLength"),
                                      },
                                      {
                                        pattern: returnRegex(name),
                                        message:
                                          guests[name].identityType != 2
                                            ? t("identityNumberPattern")
                                            : t("passportInputPattern"),
                                      },
                                    ]}
                                  >
                                    <FormInput size="large" />
                                  </Form.Item>

                                  <Form.Item
                                    name={[name, "attachmentName"]}
                                    label={returnLabel(name, "Photo")}
                                    className="col-span-1"
                                  >
                                    <FormInput
                                      size="large"
                                      readOnly
                                      suffix={
                                        <Flex gap={4}>
                                          {guests[name]?.attachments && (
                                            <Button
                                              size="small"
                                              className="border-none"
                                              type="outline"
                                              onClick={() => {
                                                setPhotoModal(true);
                                              }}
                                            >
                                              <FaEye />
                                            </Button>
                                          )}
                                          <Button
                                            type="primary"
                                            className=" border-none"
                                            size="small"
                                            onClick={() => {
                                              document
                                                .querySelector(
                                                  `#attachment-${name}`
                                                )
                                                .click();
                                            }}
                                          >
                                            <CiImageOn />
                                          </Button>
                                        </Flex>
                                      }
                                    />
                                  </Form.Item>
                                  <input
                                    style={{
                                      display: "none",
                                    }}
                                    type="file"
                                    id={`attachment-${name}`}
                                    onChange={(e) => {
                                      form.setFieldValue(
                                        ["guests", name, "attachments"],
                                        e.target.files[0]
                                      );
                                      form.setFieldValue(
                                        ["guests", name, "attachmentName"],
                                        e.target.files[0].name
                                      );
                                    }}
                                  ></input>
                                  <Image
                                    style={{
                                      display: "none",
                                    }}
                                    src={ImageToUrl(
                                      guests?.[name]?.attachments
                                    )}
                                    preview={{
                                      visible: photoModal,
                                      onVisibleChange: (visible) => {
                                        setPhotoModal(visible);
                                      },
                                    }}
                                  ></Image>
                                </div>
                              )}
                              {data?.data?.isAllowGuestVehicle && (
                                <div className="grid md:grid-cols-4 gap-4">
                                  <Form.Item
                                    name={[name, "hasCar"]}
                                    label={t("hasCar")}
                                    className={`basis-2/6`}
                                    initialValue={"0"}
                                  >
                                    <Radio.Group
                                      buttonStyle="solid"
                                      className="w-full flex gap-4"
                                    >
                                      <FormRadioButton
                                        value={"0"}
                                        className="w-1/2"
                                      >
                                        {t("no")}
                                      </FormRadioButton>
                                      <FormRadioButton
                                        value={"1"}
                                        className="w-1/2"
                                      >
                                        {t("yes")}
                                      </FormRadioButton>
                                    </Radio.Group>
                                  </Form.Item>
                                  {guests?.[name]?.hasCar === "1" && (
                                    <>
                                      <Form.Item
                                        label={t("carType")}
                                        name={[name, "carModel"]}
                                        className="basis-2/6"
                                        rules={[
                                          {
                                            required: true,
                                            message: t("requiredField"),
                                          },
                                        ]}
                                      >
                                        <FormInput size="large" />
                                      </Form.Item>
                                      <Form.Item
                                        label={t("carNumber")}
                                        name={[name, "carNumber"]}
                                        className="basis-2/6"
                                        rules={[
                                          {
                                            required: true,
                                            message: t("requiredField"),
                                          },
                                        ]}
                                      >
                                        <FormInput size="large" />
                                      </Form.Item>
                                      <Form.Item
                                        label={t("carColor")}
                                        name={[name, "carColor"]}
                                        className="basis-2/6"
                                        rules={[
                                          {
                                            required: true,
                                            message: t("requiredField"),
                                          },
                                        ]}
                                        normalize={(value) =>
                                          value.toHexString()
                                        }
                                      >
                                        <ColorInput
                                          className="border-none w-full"
                                          size="large"
                                          showText
                                        />
                                      </Form.Item>
                                    </>
                                  )}
                                </div>
                              )}
                              {key > 0 && (
                                <Button
                                  className="w-1/4 block mx-auto border-red-500 text-red-400 bg-white"
                                  onClick={() => remove(name)}
                                >
                                  {t("delete")}
                                </Button>
                              )}
                            </>
                          );
                        })}

                      <Form.Item>
                        <Button
                          className="w-full border-dotted  height-36 border-2 border-[#38ACB1] mt-2"
                          onClick={() =>
                            add({
                              identityType: "0",
                            })
                          }
                          size="large"
                        >
                          {!guests || guests?.length <= 0
                            ? t("addGuest")
                            : t("addCompanion")}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <div className="flex justify-center">
                  <FormButton
                    htmlType="submit"
                    className="w-full md:w-1/2"
                    loading={isSubmitting}
                    type="primary"
                  >
                    {t("saveAndSubmit")}
                  </FormButton>
                </div>
              </Form>
            )}
            {(!id || error || !data?.data?.isAllowGuestEdits) && !isPending && (
              <div className="flex justify-center">
                <h1 className="text-2xl text-center">{t("inviteNotFound")}</h1>
              </div>
            )}
          </Spin>
        </CustomCard>
      </div>
      <Modal open={successModal} footer={null} width={"40vw"} closable={false}>
        <div className="flex items-center justify-center my-16">
          <img src={SuccessModalImage}></img>
        </div>
      </Modal>
    </div>
  );
}

function ImageToUrl(image) {
  if (image) {
    return URL.createObjectURL(image);
  }
  return null;
}
