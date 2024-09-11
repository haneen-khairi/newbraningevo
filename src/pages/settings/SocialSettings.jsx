import { Form, Flex } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import { t } from "i18next";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateSettings } from "@/services/settings";
import useResultModal from "@/hooks/useResultModal";

export function SocialSettings({ settings }) {
  const globalModal = useResultModal();

  const [form] = Form.useForm();
  const editSocialSettings = useMutation({
    mutationFn: (values) => updateSettings(values),
    mutationKey: ["settings"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("settingsUpdatedSuccessfully"),
      });
      window.location.reload();
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
        form.setFieldValue(item.key, item.value);
      }
    }
  }, [settings]);
  function handleEditSocialSettings(values) {
    Object.keys(values).forEach((key) => {
      if (!values[key]) return;
      editSocialSettings.mutate({
        key,
        value: values[key],
      });
    });
  }
  return (
    <Form form={form} layout="vertical" onFinish={handleEditSocialSettings}>
      <Flex gap={12} justify="between" className="w-full">
        <Form.Item
          name="social.facebook"
          label={t("facebook")}
          className="grow"
        >
          <FormInput size="large" />
        </Form.Item>

        <Form.Item
          name="social.linkedin"
          label={t("linkedin")}
          className="grow"
        >
          <FormInput size="large" />
        </Form.Item>
      </Flex>

      <Flex gap={12} justify="between" className="w-full">
        <Form.Item name="social.twitter" label={t("twitter")} className="grow">
          <FormInput size="large" />
        </Form.Item>

        <Form.Item name="social.youtube" label={t("youtube")} className="grow">
          <FormInput size="large" />
        </Form.Item>
      </Flex>

      <Form.Item name="instagram" label={t("instagram")}>
        <FormInput size="large" />
      </Form.Item>

      <FormButton
        type="primary"
        htmlType="submit"
        className="w-full"
        label={t("save")}
        loading={editSocialSettings.isPending}
      >
        {t("saveAndSubmit")}
      </FormButton>
    </Form>
  );
}
