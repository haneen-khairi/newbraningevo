import { useTranslation } from "react-i18next";
import { Form, Radio, Button, Spin } from "antd";
import { useCallback, useEffect } from "react";
import { fetchAllGuests } from "@/services/guests";
import BgSelect from "@/components/forms/FormSelect";
import BgInput from "@/components/forms/FormInput";
import * as _ from "lodash";
import Dropzone from "react-dropzone";
import BgRadioButton from "@/components/forms/FormRadioButton";
import CountrySelector from "@/components/forms/CountrySelector";
import PhoneInput from "@/components/forms/PhoneInput";
import ColorPicker from "@/components/forms/ColorInput";
import { useState } from "react";

export function ByGuest() {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const [loadingIndex, setLoadingIndex] = useState(null);
  const guests = Form.useWatch("guests");
  let emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
  const throttled = useCallback(
    _.debounce((value, inputName, type = "email") => {
      if (!value.trim()) {
      } else {
        setLoadingIndex(inputName[1]);
        fetchAllGuests({
          activeOnly: true,
          email: type == "email" ? value : null,
          mobile: type == "mobile" ? value : null,
          isBlackList: false,
        })
          .then((res) => {
            if (res.data.length > 0) {
              delete res.data[0].vehicles;
              delete res.data[0].nationality;
              delete res.data[0].attachments;
              //replace current guest with the one from the database

              if (res.data[0]) {
                form.setFieldsValue({
                  [inputName[0]]: {
                    [inputName[1]]: {
                      ...res.data[0],
                      autofilled: true,
                    },
                  },
                });
              }
            } else {
              if (form.getFieldValue(["guests", inputName[1], "autofilled"]))
                form.setFieldsValue({
                  [inputName[0]]: {
                    [inputName[1]]: {
                      autofilled: false,
                      firstName: "",
                      lastName: "",
                      gender: 0,
                      [type == "email" ? "phoneNumber" : "email"]: "",
                    },
                  },
                });
            }
          })
          .finally(() => {
            setLoadingIndex(null);
          });
      }
    }, 300),
    []
  );
  return (
    <Form.List name="guests" initialValue={[]}>
      {(fields, { add, remove }) => (
        <>
          {guests &&
            fields.length <= 0 &&
            add({
              firstName: "",
              autofilled: false,
            })}

          {fields.length > 0 &&
            fields.map(({ key, name, ...rest }) => {
              return (
                <Spin spinning={loadingIndex == name} tip={t("Loading")}>
                  <div className="grid grid-cols-3 gap-4">
                    <Form.Item
                      name={[name, "email"]}
                      label={t("guestEmail")}
                      className="basis-1/2"
                      onChange={(e) => {
                        if (emailRegex.test(e.target.value)) {
                          throttled(e.target.value, ["guests", name], "email");
                        }
                      }}
                      rules={[
                        {
                          required: true,
                        },
                        {
                          validator: (rule, value) => {
                            if (
                              !value.match(
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                              )
                            ) {
                              return Promise.reject(t("invalidEmail"));
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <BgInput size="large" />
                    </Form.Item>

                    <Form.Item
                      name={[name, "phoneNumber"]}
                      label={t("guestPhone")}
                      normalize={(value) => {
                        if (!value.valid()) return value;
                        return `+${value.countryCode}${value.areaCode}${value.phoneNumber}`;
                      }}
                    >
                      {loadingIndex != name && (
                        <PhoneInput
                          size="large"
                          onChange={(v) => {
                            if (v.valid()) {
                              throttled(
                                `+${v.countryCode}${v.areaCode}${v.phoneNumber}`,
                                ["guests", name],
                                "mobile"
                              );
                            }
                          }}
                        />
                      )}
                    </Form.Item>

                    <Form.Item
                      name={[name, "firstName"]}
                      label={t("firstName")}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <BgInput
                        size="large"
                        disabled={
                          !guests[name]?.email || guests[name]?.autofilled
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Form.Item
                      label={t("lastName")}
                      name={[name, "lastName"]}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <BgInput
                        size="large"
                        disabled={
                          !guests[name]?.email || guests[name]?.autofilled
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "gender"]}
                      label={t("guestSex")}
                      className="basis-1/3"
                    >
                      <BgSelect
                        size="large"
                        options={[
                          { value: 0, label: t("male") },
                          { value: 1, label: t("female") },
                        ]}
                        disabled={
                          !guests[name]?.email || guests[name]?.autofilled
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "nationalityCode"]}
                      label={t("guestNationality")}
                      initialValue={"SA"}
                      className="basis-1/3"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <CountrySelector
                        size="large"
                        disabled={
                          !guests[name]?.email || guests[name]?.autofilled
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="flex gap-4 ">
                    <Form.Item
                      label={t("hasCar")}
                      name={[name, "hasCar"]}
                      className={`basis-2/6`}
                      validateTrigger={["onChange", "onBlur"]}
                    >
                      <Radio.Group
                        buttonStyle="solid"
                        className="w-full flex gap-4"
                      >
                        <BgRadioButton className="w-1/2 text-center" value="1">
                          {t("yes")}
                        </BgRadioButton>
                        <BgRadioButton className="w-1/2 text-center" value="0">
                          {t("no")}
                        </BgRadioButton>
                      </Radio.Group>
                    </Form.Item>
                    {guests[name]?.hasCar === "1" && (
                      <>
                        <Form.Item
                          label={t("carType")}
                          name={[name, "carModel"]}
                          className="basis-2/6"
                        >
                          <BgInput size="large" />
                        </Form.Item>
                        <Form.Item
                          label={t("carNumber")}
                          name={[name, "carNumber"]}
                          className="basis-2/6"
                        >
                          <BgInput size="large" />
                        </Form.Item>
                        <Form.Item
                          label={t("carColor")}
                          name={[name, "carColor"]}
                          className="basis-2/6"
                          normalize={(value) => value?.toHexString()}
                        >
                          <ColorPicker
                            className="border-none"
                            size="large"
                            showText
                          />
                        </Form.Item>
                      </>
                    )}
                  </div>
                  <Dropzone
                    onDrop={(e) => {
                      let prevValue =
                        form.getFieldValue(["guests", name, "attachments"]) ||
                        [];
                      form.setFieldValue(
                        ["guests", name, "attachments"],
                        prevValue.concat(Array.from(e))
                      );
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Form.Item
                        name={[name, "attachments"]}
                        label={t("attachments")}
                      >
                        <input
                          type="file"
                          id={["guests", name, "attachments"]}
                          style={{
                            display: "none",
                          }}
                          {...getInputProps()}
                        />

                        <div
                          {...getRootProps({ className: "dropzone" })}
                          onClick={() => {
                            document
                              .getElementById(["guests", name, "attachments"])
                              .click();
                          }}
                          className="w-full border border-solid border-dashed rounded-md border-slate-300 cursor-pointer flex text-center"
                        >
                          <h1 className="w-full my-8">
                            {t("dragAndDropFilesHere")}
                          </h1>
                        </div>
                        <div className="flex gap-2 mt-1">
                          {Array.from(
                            form.getFieldValue([
                              "guests",
                              name,
                              "attachments",
                            ]) ?? []
                          ).map((file, index) => {
                            return (
                              <div
                                key={index}
                                className="rounded p-2 border border-solid border-[#38acb1] hover:bg-red-300 transition"
                                onClick={() => {
                                  let prevValue = form.getFieldValue([
                                    "guests",
                                    name,
                                    "attachments",
                                  ]);
                                  form.setFieldValue(
                                    ["guests", name, "attachments"],
                                    prevValue.filter((f) => f.name != file.name)
                                  );
                                }}
                              >
                                {file.name}
                              </div>
                            );
                          })}
                        </div>
                      </Form.Item>
                    )}
                  </Dropzone>

                  <div className="w-full mb-2">
                    {key != 0 && (
                      <Button
                        className="w-1/4 block mx-auto border-red-500 text-red-400 bg-white"
                        onClick={() => remove(name)}
                      >
                        {t("delete")}
                      </Button>
                    )}
                  </div>
                </Spin>
              );
            })}
          <Form.Item>
            <Button
              className="w-full border-dotted  height-36 border-2 border-[#38ACB1]"
              onClick={() => add({})}
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
  );
}
