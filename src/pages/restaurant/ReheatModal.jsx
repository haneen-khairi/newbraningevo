import { Flex, Form, Modal, Radio, Typography } from "antd";
import { useTranslation } from "react-i18next";
import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";
import useTheme from "@/hooks/useTheme";
import CardCheckbox from "@/components/restaurant/CardCheckbox";
import OfficeIcon from "@/assets/icons/office.svg?react";
import UsersIcon from "@/assets/icons/users.svg?react";
import { useMutation, useQuery } from "@tanstack/react-query";
import BuildingSelector from "../../components/forms/BuildingSelector";
import RoomSelector from "@/components/forms/RoomSelector";
import { getSelf, editSelf } from "@/services/users";

export default function ReheatModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { token } = useTheme();
  const orderPlace = Form.useWatch("orderPlace", form);
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
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <Typography
        style={{
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {t("reheatRequest")}
      </Typography>
      <Form form={form} layout="vertical">
        <Typography style={{ fontSize: 14, color: "gray", marginTop: 10 }}>
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
        <Form.Item name={"instructions"} label={t("notes")}>
          <FormInput.TextArea rows={3}></FormInput.TextArea>
        </Form.Item>
        <Typography
          className="px-3 py-4 rounded-xl"
          style={{
            backgroundColor: token.geekblue1,
          }}
        >
          {t("deliverTo")}
        </Typography>
        <Flex
          vertical
          gap={4}
          style={{
            marginBottom: 20,
          }}
        >
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
            {selfData.data.roomId != null && <FormInput />}
            {selfData.data.roomId == null && (
              <Typography
                style={{
                  color: "red",
                }}
              >
                {t("youMustSelectOfficeFirst")}
              </Typography>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
}
