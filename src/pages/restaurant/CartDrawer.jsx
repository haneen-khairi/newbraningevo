import { Button, Drawer, Flex, Form, Radio, Typography } from "antd";
import FormInput from "@/components/forms/FormInput";
import OfficeIcon from "@/assets/icons/office.svg?react";
import UsersIcon from "@/assets/icons/users.svg?react";
import FormSelect from "@/components/forms/FormSelect";
import { t } from "i18next";
import { HiXMark } from "react-icons/hi2";
import useResultModal from "@/hooks/useResultModal";
import { createOrder } from "@/services/restaurantOrders";
import { useMutation, useQuery } from "@tanstack/react-query";
import RoomSelector from "@/components/forms/RoomSelector";
import { itemSizes } from "../../components/restaurant/sizesEnum";
import useTheme from "@/hooks/useTheme";
import useFloors from "@/hooks/useFloors";
import { fetchAllRestaurants } from "@/services/restaurants";
import BuildingSelector from "../../components/forms/BuildingSelector";
import CardCheckbox from "../../components/restaurant/CardCheckbox";
import { getSelf, editSelf } from "@/services/users";
export function CartDrawer({
  cart,
  open,
  onClose,
  onDeleteItem,
  type,
  onSuccess,
}) {
  const [form] = Form.useForm();
  const {
    data: selfData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getSelf();
    },
  });
  const { token } = useTheme();
  const globalModal = useResultModal();
  const building = Form.useWatch("buildingId", form);
  const floor = Form.useWatch("floorId", form);
  const room = Form.useWatch("roomId", form);

  const { data: floors } = useFloors({
    buildingId: building,
  });
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
    staleTime: 1000 * 60 * 30,
  });
  const placeOrderMutation = useMutation({
    mutationFn: (values) => createOrder(values),
    mutationKey: ["createOrder"],
    onSuccess: () => {
      globalModal.success({
        title: t("placedSuccessfully"),
        subtitle: t("orderPlacedSuccessfully"),
      });
      onSuccess && onSuccess();
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingProduct"));
    },
    onSettled: () => {
      onClose();
    },
  });
  async function handleCreateOrder(values) {
    if (values?.orderPlace == "toMyOffice" && !selfData.data.roomId) {
      await editSelf({
        roomId: values.roomId,
      });
    }
    placeOrderMutation.mutate({
      restaurantId: restaurants.data[0].id,
      items: cart.map((item) => ({
        itemId: item.id,
        count: item.count,
        isAddSugar: item.isAddSugar,
        itemSize: item.size,
      })),
      instructions: values.notes,
      ...values,
    });
  }
  const orderPlace = Form.useWatch("orderPlace", form);
  const reheatingType = Form.useWatch("reheatingType", form);
  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      title={t("cart")}
      
      footer={
        <Button
          type="primary"
          disabled={
            (type == "new" ? cart.length === 0 : !reheatingType) ||
            (orderPlace === "toMyOffice" && !selfData.data.roomId && !room) ||
            !orderPlace ||
            (orderPlace === "toAGuest" && (!building || !floor))
          }
          loading={placeOrderMutation.isPending}
          className="w-full border-none"
          onClick={() => {
            form.submit();
          }}
        >
          {t("placeOrder")}
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        {type == "new" &&
          cart.map((item) => (
            <div className="flex gap-4">
              <img
                src={item.image}
                className="rounded-xl w-32 h-32 object-cover"
              ></img>
              <div className="flex flex-col gap-2 grow">
                <Typography className="text-lg font-semibold">
                  {item.name}
                </Typography>
                <Typography>
                  {t("count")}: {item.count}
                </Typography>
                <Typography>
                  {t("hasSugar")}: {item.isAddSugar ? t("yes") : t("no")}
                </Typography>
                <Typography>
                  {t("size")}: {itemSizes[item.size]}
                </Typography>
              </div>
              <Button
                type="default"
                shape="circle"
                danger
                onClick={() => {
                  onDeleteItem(item.local_id);
                }}
                className="justify-self-end w-8 h-8 flex justify-center items-center"
              >
                <HiXMark />
              </Button>
            </div>
          ))}

        <Form layout="vertical" onFinish={handleCreateOrder} form={form}>
          <Flex
            vertical
            gap={4}
            style={{
              marginBottom: 20,
            }}
          >
            {type == "reheat" && (
              <>
                <Typography style={{ fontSize: 14, color: "gray" }}>
                  {t("reheatType")}
                </Typography>
                <Form.Item name={"reheatingType"}>
                  <Radio.Group>
                    <div className="flex flex-col gap-2 mt-2">
                      <Radio value="food">{t("food")}</Radio>
                      <Radio value="beverage">{t("drinks")}</Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
            <Typography
              className="px-3 py-4 rounded-xl"
              style={{
                backgroundColor: token.geekblue1,
              }}
            >
              {t("orderDetails")} 
            </Typography>
            <Form.Item name={"orderPlace"} hidden></Form.Item>
            <CardCheckbox
              label={t("toMyOffice")}
              icon={<OfficeIcon className="fill-primary" />}
              active={orderPlace == "toMyOffice"}
              onClick={() => {
                form.setFieldValue("orderPlace", "toMyOffice");
              }}
            />
            <CardCheckbox
              label={t("toAGuest")}
              icon={<UsersIcon className="fill-primary" />}
              active={orderPlace === "toAGuest"}
              onClick={() => {
                form.setFieldValue("orderPlace", "toAGuest");
              }}
            />
          </Flex>

          {orderPlace === "toAGuest" && (
            <>
              <Form.Item
                name="buildingId"
                label={t("building")}
                rules={[{ required: true }]}
              >
                <BuildingSelector
                  
                  onChange={() => {
                    form.resetFields(["floorId"]);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="floorId"
                label={t("floor")}
                rules={[{ required: true }]}
              >
                <FormSelect
                  
                  options={floors?.data ?? []}
                  fieldNames={{
                    label: "name",
                    value: "id",
                  }}
                  onChange={() => {
                    form.resetFields(["roomId"]);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="roomId"
                label={t("room")}
                rules={[{ required: true }]}
              >
                <RoomSelector
                  
                  disabled={!building}
                  buildingId={building}
                  floorId={floor}
                />
              </Form.Item>
            </>
          )}
          {orderPlace === "toMyOffice" && (
            <>
              {selfData.data.roomId != null && (
                <>
                  <Form.Item
                    hidden
                    name={"roomId"}
                    label={t("building")}
                    initialValue={selfData.data.roomId}
                  >
                    <FormInput />
                  </Form.Item>
                </>
              )}
              {selfData.data.roomId == null && (
                <>
                  <Typography
                    style={{
                      color: "red",
                    }}
                  >
                    {t("youMustSelectOfficeFirst")}
                  </Typography>
                  <>
                    <Form.Item
                      name="buildingId"
                      label={t("building")}
                      rules={[{ required: true }]}
                    >
                      <BuildingSelector
                        
                        onChange={() => {
                          form.resetFields(["floorId"]);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="floorId"
                      label={t("floor")}
                      rules={[{ required: true }]}
                    >
                      <FormSelect
                        
                        options={floors?.data ?? []}
                        fieldNames={{
                          label: "name",
                          value: "id",
                        }}
                        onChange={() => {
                          form.resetFields(["roomId"]);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="roomId"
                      label={t("room")}
                      rules={[{ required: true }]}
                    >
                      <RoomSelector
                        
                        disabled={!building}
                        buildingId={building}
                        floorId={floor}
                      />
                    </Form.Item>
                  </>
                </>
              )}
            </>
          )}

          <Form.Item name="notes" label={t("notes")}>
            <FormInput.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
