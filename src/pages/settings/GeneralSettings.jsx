import { Form, Flex, Checkbox, Button } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateSettings } from "@/services/settings";
import useResultModal from "@/hooks/useResultModal";
import MapModal from "./MapModal";
import WhatsappBotModal from "./WhatsappBotModal";
import { WHATS_STATUS } from "../../enums/whatsappBotStatus";
export function GeneralSettings({ settings, refetch }) {
  const whatsappStatus = settings?.find(
    (item) => item.key == "social.whatsapp.bot.status"
  ).value;
  const whatsappQr = settings?.find(
    (item) => item.key == "social.whatsapp.bot.qr"
  ).value;
  const globalModal = useResultModal();
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [form] = Form.useForm();

  const editGeneralSettings = useMutation({
    mutationFn: (values) => updateSettings(values),
    mutationKey: ["settings"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("settingsUpdatedSuccessfully"),
      });
      refetch();
    },
    onError: (error) => {
      globalModal.error(
        t("error"),
        error.message ?? error.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });

  useEffect(() => {
    if (settings) {
      for (let item of settings) {
        if (item.key == "general.address.maps") {
          if (!Array.isArray(item.value)) {
            try {
              let query = new URL(item.value).searchParams.get("query");
              if (query) {
                item.value = query.split(",");
              }
            } catch (e) {
              let query = item.value;
              if (query) {
                item.value = query.split(",");
              }
            }
          }
        }
        form.setFieldValue(item.key, item.value);
      }
    }
  }, [settings]);
  function handleEditGeneralSettings(values) {
    if (values["general.address.maps"]) {
      values[
        "general.address.maps"
      ] = `https://www.google.com/maps/search/?api=1&query=${values["general.address.maps"][0]},${values["general.address.maps"][1]}`;
    }
    Object.keys(values).forEach((key) => {
      if (values[key] == undefined || values[key].length == 0) return;
      editGeneralSettings.mutate({
        key,
        value: values[key],
      });
    });
  }
  return (
    <Form form={form} layout="vertical" onFinish={handleEditGeneralSettings}>
      <Form.Item name="branding.name" label={t("companyName")}>
        <FormInput size="large" />
      </Form.Item>

      <Flex gap={12} justify="between" className="w-full">
        <Form.Item name="general.mobile" label={t("phone")} className="grow">
          <FormInput size="large" />
        </Form.Item>

        <Form.Item name="general.email" label={t("email")} className="grow">
          <FormInput size="large" />
        </Form.Item>

        <Form.Item name="general.fax" label={t("fax")} className="grow">
          <FormInput size="large" />
        </Form.Item>
      </Flex>

      <div className="grid grid-cols-2 gap-2">
        <Form.Item name="general.address.ar" label={t("addressInAr")}>
          <FormInput size="large" />
        </Form.Item>
        <Form.Item name="general.address.en" label={t("addressInEn")}>
          <FormInput size="large" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="general.address.maps" label={t("mapAddress")}>
          <FormInput
            size="large"
            readOnly
            onClick={() => setMapModalOpen(true)}
          />
        </Form.Item>
        <Form.Item label={t("whatsappBot")}>
          <div className="flex gap-2">
            <FormInput
              readOnly
              value={t(WHATS_STATUS[whatsappStatus])}
              size="large"
              style={{
                color:
                  whatsappStatus == 2
                    ? "green"
                    : whatsappStatus == 1
                    ? "orange"
                    : "red",
              }}
            />
            {whatsappStatus != 2 && (
              <Button onClick={() => setWhatsappModalOpen(true)}>
                {t("activate")}
              </Button>
            )}
          </div>
        </Form.Item>
      </div>

      <Form.Item name="branding.description" label={t("description")}>
        <FormInput.TextArea size="large" />
      </Form.Item>
      <Form.Item
        name="users.registration.isActive.default"
        valuePropName="checked"
        normalize={(value) => (value ? 1 : 0)}
      >
        <Checkbox size="large">{t("autoActivateOnRegister")}</Checkbox>
      </Form.Item>
      <FormButton
        type="primary"
        htmlType="submit"
        className="w-full"
        label={t("save")}
        loading={editGeneralSettings.isPending}
      >
        {t("saveAndSubmit")}
      </FormButton>
      <MapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        value={form.getFieldValue("general.address.maps")}
        onChange={(value) => {
          form.setFieldValue("general.address.maps", value);
        }}
      />
      {whatsappStatus != 2 && (
        <WhatsappBotModal
          isOpen={whatsappModalOpen}
          onClose={() => {
            setWhatsappModalOpen(false);
          }}
          Qr={whatsappQr}
          Status={whatsappStatus}
        />
      )}
    </Form>
  );
}
