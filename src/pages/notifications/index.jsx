import NotificationItem from "@/components/user/NotificationItem";
import CustomCard from "@/components/CardWithHeader";
import { Flex, Pagination } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllNotifications,
  readNotifications,
} from "@/services/notifications";
import { useReducer } from "react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { t } from "i18next";
export default function AllNotifications() {
  const queryClient = useQueryClient();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["notifications", filterOptions],
    queryFn: () => fetchAllNotifications({ ...filterOptions }),
  });

  return (
    <CustomCard
      className="mx-auto w-8/12"
      titleSlot={
        <Flex className="w-full justify-between">
          <div className="grow">{t("Allnotifications")}</div>
          <div>
            <a
              onClick={() => {
                readNotifications();
                queryClient.invalidateQueries(["notifications"]);
              }}
            >
              {t("markAllAsRead")}
            </a>
          </div>
        </Flex>
      }
    >
      <Flex vertical gap={12}>
        {data?.data.map((item) => {
          return <NotificationItem item={item} />;
        })}
      </Flex>
      <div className="flex items-center w-full justify-center">
        <Pagination
          current={data?.pagination.current || 1}
          total={data?.pagination.total || 0}
          pageSize={data?.pagination.pageSize || 10}
          onChange={(current, pageSize) => {
            dispatch({ type: "paginate", payload: { current, pageSize } });
          }}
        />
      </div>
    </CustomCard>
  );
}
