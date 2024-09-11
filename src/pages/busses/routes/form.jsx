import { Button, Form, Typography } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useBuildings } from "@/services/buildingsv2";
import { useEffect } from "react";

export default function RoutesForm({ initialValues, onSubmit }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const routes = Form.useWatch("buildings", form);
  const parkings = Form.useWatch("parkings", form);

  useEffect(() => {
    if (initialValues) {
      const tempValues = { ...initialValues };
      tempValues.parkings = initialValues.buildings
        .filter((b) => b.isStopPoint)
        .map((b) => b.buildingId);
      tempValues.buildings = initialValues.buildings.sort((a,b)=>a.orderId - b.orderId).map((b) => b.buildingId);
      form.setFieldsValue(tempValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const onEdit = (index, route) => {
    const newRoutes = [...routes];
    newRoutes[index] = route;
    form.setFieldsValue({ buildings: newRoutes });
  };
  const { data: buildings } = useBuildings();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newRoutes = [...routes];
    const [removed] = newRoutes.splice(sourceIndex, 1);
    newRoutes.splice(destinationIndex, 0, removed);

    form.setFieldsValue({ buildings: newRoutes });
  };

  return (
    <>
      <Form
        onFinish={onSubmit}
        form={form}
        id="bus-route-form"
        initialValues={{
          routeName: "",
          buildings: [],
          parkings: [],
        }}
        layout="vertical"
      >
        <Form.Item hidden name="id"></Form.Item>

        <Form.Item hidden name="parkings"></Form.Item>
        <Form.Item
          name="name"
          label={t("routeNameInAr")}
          rules={[{ required: true }]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          name="nameEn"
          label={t("routeNameInEn")}
          rules={[{ required: true }]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item name={"isActive"} label={t("isActive")}>
          <FormSelect
            options={[
              {
                label: t("active"),
                value: true,
              },
              {
                label: t("inActive"),
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item name={"buildings"} label={t("buildings")}>
          <FormSelect
            options={buildings?.data ?? []}
            mode="multiple"
            fieldNames={{ label: "name", value: "id" }}
          />
        </Form.Item>
      </Form>
      <Typography>{t("routeOrder")}</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2"
            >
              {routes?.map((route, index) => (
                <Draggable key={route} draggableId={route} index={index}>
                  {(provided, snapshot) => {
                    const isParking = parkings.includes(route);
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=" flex items-center gap-2  "
                        style={{
                          cursor: "move",
                          userSelect: "none",

                          ...provided.draggableProps.style,
                        }}
                      >
                        <div
                          id="info-part"
                          className="flex items-center gap-2 bg-[#fafafa] border border-solid border-[#efefef] rounded-xl p-3 grow"
                        >
                          <DNDIcon />
                          {buildings?.data?.find((b) => b.id === route)?.name}
                        </div>
                        <Button
                          shape="circle"
                          size="small"
                          type={isParking ? "primary" : "default"}
                          onClick={() =>
                            //if is in parkings, remove it
                            isParking
                              ? form.setFieldsValue({
                                  parkings: parkings.filter((p) => p !== route),
                                })
                              : form.setFieldsValue({
                                  parkings: [...parkings, route],
                                })
                          }
                        >
                          P
                        </Button>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
function RouteEntry({ route, onEdit }) {
  return (
    <div className="rounded-md p-2 flex items-center w-full ">{route}</div>
  );
}

export function DNDIcon() {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 11C2.55228 11 3 10.5523 3 10C3 9.44772 2.55228 9 2 9C1.44772 9 1 9.44772 1 10C1 10.5523 1.44772 11 2 11Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 19C2.55228 19 3 18.5523 3 18C3 17.4477 2.55228 17 2 17C1.44772 17 1 17.4477 1 18C1 18.5523 1.44772 19 2 19Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
