import { Flex } from "antd";
import ButtonGroup from "@/components/CustomButtonGroup";
import CustomCard from "@/components/CardWithHeader";
import { useEffect, useState } from "react";
import { GeneralSettings } from "./GeneralSettings";
import { SocialSettings } from "./SocialSettings";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSettings } from "@/services/settings";
import CountriesComponent from "@/pages/organization/countries";
import WorkHours from "../workhours";
import DaysOff from "../daysoff";
import RestHours from "../resthours";
import { useTranslation } from "react-i18next";
import createSignalRConnection from "@/services/signalr";

export default function Settings() {
  const [tab, setTab] = useState("general");
  const { t } = useTranslation();
  const {
    data: settings,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      fetchAllSettings({
        isGetAll: true,
      }),
  });
  useEffect(() => {
    const connection = createSignalRConnection();
    connection.start();
    connection.on("CRUD", (page, action) => {
      if (page == "Settings" && action == "Update") {
        refetch();
      }
    });
    return () => {
      connection.stop();
    };
  }, []);
  return (
    <CustomCard className="w-10/12 mx-auto">
      <Flex vertical className="gap-4">
        <ButtonGroup
          value={tab}
          options={[
            { label: t("generalSettings"), value: "general" },
            { label: t("socialMedia"), value: "social" },
            { label: t("countries"), value: "countries" },
            { label: t("workhours"), value: "workhours" },
            { label: t("daysoff"), value: "daysoff" },
            { label: t("resthours"), value: "resthours" },
          ]}
          onChange={(e) => {
            setTab(e.target.value);
          }}
        />
        {tab === "general" && (
          <GeneralSettings settings={settings?.data} refetch={refetch} />
        )}
        {tab === "social" && (
          <SocialSettings settings={settings?.data} refetch={refetch} />
        )}
        {tab === "countries" && <CountriesComponent />}
        {tab === "workhours" && <WorkHours />}
        {tab === "resthours" && <RestHours />}
        {tab === "daysoff" && <DaysOff />}
      </Flex>
    </CustomCard>
  );
}
