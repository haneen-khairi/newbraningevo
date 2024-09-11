import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DNDIcon } from "../../../busses/routes/form";

export default function ReasonDrawer({ mapDrawerOpen, onSubmit }) {
  const [form] = Form.useForm();
  const [arr, setArr] = useState([1]);
  const { t } = useTranslation();
  const [arrayLength, setArrayLength] = useState([]);
  const types = [
    {
      label: t("user"),
      value: 1,
    },
    {
      label: t("driver"),
      value: 2,
    },
  ];
  const [userType, setUserType] = useState(0);
  const mode = mapDrawerOpen?.data ? "update" : "create";

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedItems = Array.from(arrayLength);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);
    setArrayLength(updatedItems);
  };

  useEffect(() => {
    if (mode === "update") {
      setArrayLength(
        Array.from({ length: mapDrawerOpen.data.items.length }, (_, i) => i)
      );

      form.setFieldsValue({
        type: mapDrawerOpen.type,
        ...mapDrawerOpen.data.items.reduce((acc, element, idx) => {
          acc[`id-${idx}`] = element.id;
          acc[`orderId-${idx}`] = idx;
          acc[`nameAr-${idx}`] = element.nameAr;
          acc[`nameEn-${idx}`] = element.nameEn;
          return acc;
        }, {}),
      });
    }
  }, [mapDrawerOpen, mode, form]);

  return (
    <Form
      form={form}
      onFinish={(values) => {
        values.mode = mode;
        values.id = mapDrawerOpen?.id;
        onSubmit(values);
      }}
      id="Reason-form"
      className="flex flex-col"
      layout="vertical"
    >
      <Form.Item label={t("selectType")} name="type">
        <Select
          disabled={mode === "update"}
          defaultValue={t("selectType")}
          onChange={(value) => setUserType(value)}
          options={types}
          placeholder={t("selectType")}
          suffixIcon={
            <svg
              width="15"
              height="7"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.76938 5.51665C8.66867 5.61819 8.54885 5.69879 8.41683 5.75379C8.28482 5.80879 8.14322 5.8371 8.00021 5.8371C7.8572 5.8371 7.7156 5.80879 7.58358 5.75379C7.45157 5.69879 7.33175 5.61819 7.23104 5.51665L2.26937 0.544156C2.16866 0.442617 2.04885 0.362022 1.91683 0.307023C1.78482 0.252023 1.64322 0.223708 1.50021 0.223708C1.35719 0.223708 1.2156 0.252023 1.08358 0.307023C0.951568 0.362022 0.83175 0.442617 0.731041 0.544156C0.529269 0.747132 0.416015 1.0217 0.416015 1.30791C0.416015 1.59411 0.529269 1.86868 0.731041 2.07166L5.70354 7.04416C6.31292 7.65277 7.13896 7.99463 8.00021 7.99463C8.86146 7.99463 9.6875 7.65277 10.2969 7.04416L15.2694 2.07166C15.4695 1.86987 15.5823 1.59752 15.5835 1.31332C15.5844 1.17075 15.557 1.02941 15.5031 0.897423C15.4492 0.765432 15.3698 0.645382 15.2694 0.544155C15.1687 0.442616 15.0488 0.362022 14.9168 0.307022C14.7848 0.252023 14.6432 0.223707 14.5002 0.223707C14.3572 0.223707 14.2156 0.252023 14.0836 0.307022C13.9516 0.362022 13.8318 0.442616 13.731 0.544155L8.76938 5.51665Z"
                fill="#38ACB1"
              />
            </svg>
          }
        />
      </Form.Item>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-container"
              style={{ overflow: "auto", maxHeight: "400px" }}
            >
              {mode === "update"
                ? arrayLength.map((id, index) => (
                    <Draggable
                      key={id}
                      draggableId={`input-${id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2"
                          style={{
                            cursor: "move",
                            userSelect: "none",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            id="info-part"
                            className="flex items-center bg-gray-50 justify-end rounded-xl grow relative my-1"
                          >
                            <div className="absolute start-4">
                              <DNDIcon />
                            </div>
                            <div className="flex w-[95%] m-0 p-0">
                              <Form.Item
                                className="w-[50%] p-0 m-0 ms-2"
                                name={`nameAr-${id}`}
                              >
                                <FormInput
                                  placeholder={`${t("reasonForCancelAr")}...`}
                                />
                              </Form.Item>

                              <Form.Item
                                className="w-[50%] p-0 m-0 ms-2"
                                name={`nameEn-${id}`}
                              >
                                <FormInput
                                  placeholder={`${t("reasonForCancelEn")}...`}
                                />
                              </Form.Item>
                              <Form.Item
                                initialValue={id}
                                className="hidden p-0 m-0 ms-2"
                                name={`orderId-${id}`}
                              >
                                <FormInput
                                  placeholder={`${t("reasonForCancelEn")}...`}
                                />
                              </Form.Item>

                              {mode == "update" && (
                                <Form.Item
                                  className="hidden p-0 m-0 ms-2"
                                  name={`id-${id}`}
                                >
                                  <FormInput
                                    placeholder={`${t("reasonForCancelEn")}...`}
                                  />
                                </Form.Item>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                : arr.map((id, index) => (
                    <>
                      <Draggable
                        key={id}
                        draggableId={`input-${id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center gap-2"
                            style={{
                              cursor: "move",
                              userSelect: "none",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div
                              id="info-part"
                              className="flex items-center bg-gray-50 justify-end rounded-xl grow relative my-1"
                            >
                              <div className="absolute start-4">
                                <DNDIcon />
                              </div>
                              <div className="flex w-[95%] m-0 p-0">
                                <Form.Item
                                  className="w-[50%] p-0 m-0 ms-2"
                                  name={`nameAr-${id}`}
                                >
                                  <FormInput
                                    placeholder={`${t("reasonForCancelAr")}...`}
                                  />
                                </Form.Item>

                                <Form.Item
                                  className="w-[50%] p-0 m-0 ms-2"
                                  name={`nameEn-${id}`}
                                >
                                  <FormInput
                                    placeholder={`${t("reasonForCancelEn")}...`}
                                  />
                                </Form.Item>

                                <button className="bg-red-300 hover:bg-red-500 text-white text-lg ms-1 border-none rounded-e-xl duration-300 cursor-pointer px-3"
                                  onClick={() => {
                                    setArr((prevArr) =>
                                      prevArr.filter((el) => el !== id)
                                    );
                                  }}
                                >
                                  x
                                </button>
                                <Form.Item
                                  initialValue={id}
                                  className="hidden p-0 m-0 ms-2"
                                  name={`orderId-${id}`}
                                >
                                  <FormInput
                                    placeholder={`${t("reasonForCancelEn")}...`}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </>
                  ))}
              {provided.placeholder}
              {mode == "create" && (
                <Button
                  onClick={() => {
                    setArr([...arr, arr.length + 1]);
                  }}
                  className="w-full font-bold bg-[#fbfcff] rounded-2xl my-1"
                >
                  {t("addAnotherReason")}
                </Button>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Form>
  );
}
