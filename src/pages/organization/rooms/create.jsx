import CustomCard from "@/components/CardWithHeader";
import { useTranslation } from "react-i18next";
import { Form, Modal } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormButton from "@/components/forms/FormButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoom, fetchOneRoom, updateRoom } from "@/services/rooms";
import { useEffect } from "react";
import useResultModal from "@/hooks/useResultModal";
import useFloors from "@/hooks/useFloors";
import BuildingSelector from "../../../components/forms/BuildingSelector";
export default function CreateRoom() {
  const navigate = useNavigate();
  const Modal = useResultModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const buildingId = Form.useWatch("buildingId", form);
  const { data: floors, isPending } = useFloors({ buildingId });

  const createRoomMutation = useMutation({
    mutationFn: (values) => createRoom(values),
    mutationKey: "createRoom",
    onSuccess: () => {
      form.resetFields();
      Modal.success({
        title: t("success"),
        subtitle: t("roomCreatedSuccessfully"),
      });
      navigate("/organization");
    },
    onError: (error) => {
      Modal.error(t("error"), error.message);
    },
  });
  const updateRoomMutation = useMutation({
    mutationFn: (values) => updateRoom(values),
    mutationKey: "updateRoom",
    onSuccess: () => {
      form.resetFields();
      Modal.success({
        title: t("success"),
        subtitle: t("roomUpdatedSuccessfully"),
      });
      navigate("/organization");
    },
    onError: (error) => {
      console.log(error);
      Modal.error(t("error"), error.message);
    },
  });
  const getExistingRoom = useQuery({
    queryFn: () => fetchOneRoom(roomId),
    queryKey: ["getExistingRoom"],
    enabled: !!roomId,
  });
  useEffect(() => {
    if (getExistingRoom.data && !!roomId) {
      form.setFieldsValue({
        ...getExistingRoom.data?.data,
        isActive: getExistingRoom.data?.data?.isActive.toString(),
      });
    }
  }, [getExistingRoom.data]);
  function handleSubmit(values) {
    if (!!roomId) {
      updateRoomMutation.mutate({ ...values, id: roomId });
    } else {
      createRoomMutation.mutate(values);
    }
  }

  return (
    <div className="w-10/12 mx-auto">
      <CustomCard titleSlot={t("roomInfo")}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          name="create-room"
        >
          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              className="grow"
              name="nameAr"
              label={t("nameInAr")}
              rules={[{ required: true }]}
            >
              <FormInput size="large" placeholder={t("nameInAr")} />
            </Form.Item>
            <Form.Item
              className="grow"
              name="nameEn"
              label={t("nameInEn")}
              rules={[{ required: true }]}
            >
              <FormInput size="large" placeholder={t("nameInEn")} />
            </Form.Item>
            <Form.Item className="grow" name="roomType" label={t("roomType")}>
              <FormSelect
                size="large"
                placeholder={t("roomType")}
                options={[
                  { label: t("office"), value: "office" },
                  { label: t("normalRoom"), value: "normalRoom" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex gap-4">
            <Form.Item className="basis-1/2" name="number" label={t("roomNo")}>
              <FormInput
                size="large"
                placeholder={t("roomNo")}
                htmlType="number"
              ></FormInput>
            </Form.Item>
            <Form.Item
              className="basis-1/2"
              name={"buildingId"}
              label={t("building")}
              rules={[{ required: true }]}
            >
              <BuildingSelector size={"large"} />
            </Form.Item>
            <Form.Item
              className="basis-1/2"
              name="floorId"
              label={t("floor")}
              rules={[{ required: true }]}
            >
              <FormSelect
                disabled={!buildingId}
                size="large"
                options={floors?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Form.Item>
          </div>

          <Form.Item
            className="basis-1/2"
            name={"isActive"}
            label={t("status")}
          >
            <FormSelect
              size="large"
              placeholder={t("status")}
              options={[
                { value: "true", label: t("active") },
                { value: "false", label: t("inActive") },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center">
            <FormButton
              htmlType="submit"
              className="w-1/2 mx-auto"
              type="primary"
            >
              {t("saveAndSubmit")}
            </FormButton>
          </div>
        </Form>
      </CustomCard>
    </div>
  );
}
