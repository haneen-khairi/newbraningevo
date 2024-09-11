import { Modal, Form, Button, Space, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import FormInput from "@/components/forms/FormInput";
import { GetAllCancelVisitReasons, RejectRequestVisits } from "../../../../../services/vip_trips";
import { useQueryClient } from "@tanstack/react-query";
import useResultModal from "../../../../../hooks/useResultModal";
export default function ReasonsOfCancellingModal({ data, onClose, statusToSet }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const client = useQueryClient();
  const globalModal = useResultModal();
  const { t, i18n } = useTranslation();
  const isOpen = Boolean(data);
  const { data: visitReasons = [] } = GetAllCancelVisitReasons({});
  const [value, setValue] = useState("");

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const rejectRequest = RejectRequestVisits({
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("requestUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["adminRequests"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingRequest"));
    },
  });
  async function handleSubmitStatus(values) {
        const cancelObject = {
            "requestId": data?.id,
            "reasonId":  value,
            "otherReason": ""
        }
        console.log("🚀 ~ handleSubmitStatus ~ cancelObject:", cancelObject)
    //type = 2 for accept, 3 for reject
    rejectRequest.mutate({
      ...cancelObject
    });
    onClose()
    // setIsSubmitting(true);
    // await updateOrder({
    //   id,
    //   status: statusToSet,
    //   statusReason: values.statusReason,
    // });
    // form.resetFields();
    // setIsSubmitting(false);
    // onClose();
  }
  return (
    <Modal className="z-[9999999]" open={isOpen} onCancel={onClose} footer={null}>
      <Form onFinish={handleSubmitStatus} layout="vertical" form={form}>
      <Radio.Group name="visitReasons" onChange={onChange} value={value}>
      <Space direction="vertical">
      {visitReasons.data?.length ? visitReasons?.data?.map((reason) => <Radio
      style={{
        width: '100%'
      }}
      className="py-[13px] border-b-2" 
       key={reason.id} value={reason.id}>{
            i18n.language === "ar" ? reason.reasonAr || "فارغ" : reason.reasonEn || "null"}</Radio>): ""}
      </Space>
    </Radio.Group>
        <Button
        disabled={value === ""}
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
          }}
        >
          {t("submit")}
        </Button>
      </Form>
    </Modal>
  );
}
