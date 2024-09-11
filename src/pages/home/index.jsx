import { useTranslation } from "react-i18next";
import { Button, Input, Flex, Dropdown, Select } from "antd";
import useTheme from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import normSortType from "@/utils/normSort";
import { fetchAllRequests } from "@/services/requests";
import {
  fetchAllStatistics,
  fetchTopInviters,
  fetchMonthlyInvites,
} from "@/services/statistics";
import { acceptInvite } from "@/pages/request/actions";

import { useSelector } from "react-redux";
//charts
import InvitesChart from "@/components/admin/InvitesChart";
//icons
import { IoFastFoodOutline } from "react-icons/io5";
import { FaEye, FaCalendarPlus } from "react-icons/fa";
import { inviteTypes } from "@/enums/invite";
//Custom Component
import StatsCard from "@/components/admin/StatsCard";
import CustomCard from "@/components/CardWithHeader";
import ValidateRequest from "@/pages/request/validateRequest";
import UserTotalInvites from "@/components/admin/UserInvites";
import { statusEnum } from "@/components/InviteStatus";
import ComplexTable from "@/components/ComplexTable";
import RequestDrawer from "@/pages/request/requestDrawer";
import useResultModal from "@/hooks/useResultModal";
// CSV
import serializeAndDownload from "@/utils/exportCSV";
import { usePageInfo } from "../../contexts/PageInfoContext";
import {
  fetchMonthlyOrders,
  fetchRestaurantTopItems,
  fetchRestaurantTopRequesters,
} from "../../services/statistics";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const { ability } = useSelector((state) => state.ability);
  const { setPageInfo, pageInfo } = usePageInfo();
  const [apiOptions, setApiOptions] = useState({
    searchKeyword: null,
    status: null,
    sortField: "createdAt",
    sortType: "desc",
  });
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["requests", apiOptions],
    queryFn: () =>
      fetchAllRequests({
        isToday: true,
        isActive: true,
        ...apiOptions,
      }),
  });
  const stats = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetchAllStatistics(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: chartStats } = useQuery({
    queryKey: ["chartStats"],
    queryFn: () => fetchMonthlyInvites(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: topInviters } = useQuery({
    queryKey: ["topInviters"],
    queryFn: () => fetchTopInviters(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: topRestaurantRequesters } = useQuery({
    queryKey: ["topRestaurantRequesters"],
    queryFn: () => fetchRestaurantTopRequesters(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: monthlyRestaurantOrders } = useQuery({
    queryKey: ["fetchMonthlyOrders"],
    queryFn: () => fetchMonthlyOrders(),
    staleTime: 1000 * 60 * 60,
  });
  const { data: restarurantTopItems } = useQuery({
    queryKey: ["restarurantTopItems"],
    queryFn: () => fetchRestaurantTopItems(),
    staleTime: 1000 * 60 * 60,
  });
  const [viewedInvite, setInvite] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    setPageInfo({
      ...pageInfo,
      hasSideBar: true,
    });

    return () => {
      setPageInfo({
        ...pageInfo,
        hasSideBar: false,
      });
    };
  }, []);
  function openDrawer(invite) {
    setInvite(invite);
    setDrawerVisible(true);
  }
  function closeDrawer() {
    setDrawerVisible(false);
  }
  return (
    <div className="flex gap-4 flex-col w-full">
      {ability.can("manage", "Qr") && (
        <CustomCard
          titleSlot={<h1 className="font-bold">{t("verifyInvite")}</h1>}
        >
          <ValidateRequest />
        </CustomCard>
      )}
      {["Requests", "Administrator"].some((role) =>
        ability.can("manage", role)
      ) && (
        <CustomCard>
          {ability.can("manage", "Administrator") && (
            <div className="flex justify-between gap-4">
              {ability.can("manage", "Users") && (
                <StatsCard
                  title={t("totalUsers")}
                  value={stats?.data?.data.users.total ?? 0}
                  percentage={calculatePercentage(stats.data?.data.users)}
                  color="#FFC107"
                />
              )}
              {ability.can("manage", "Requests") && (
                <StatsCard
                  title={t("totalRequests")}
                  value={stats?.data?.data.requests.total ?? 0}
                  percentage={calculatePercentage(stats.data?.data.requests)}
                  color="#0070DF"
                  icon={<FaCalendarPlus />}
                />
              )}
              {ability.can("manage", "Restaurants") && (
                <StatsCard
                  title={t("totalRestaurantOrders")}
                  value={stats?.data?.data.restaurantOrders.total ?? 0}
                  percentage={calculatePercentage(
                    stats.data?.data.restaurantOrders
                  )}
                  color="#1f1f1f"
                  icon={<IoFastFoodOutline />}
                />
              )}
              {ability.can("manage", "Guests") && (
                <StatsCard
                  title={t("totalGuests")}
                  value={stats?.data?.data.guests.total ?? 0}
                  percentage={calculatePercentage(stats.data?.data.guests)}
                  color="#2DC7B2"
                />
              )}
            </div>
          )}
          {ability.can("manage", "Requests") && (
            <ComplexTable
              loading={isPending}
              addTitle={t("addInvite")}
              addFunction={() => navigate("/create-invite")}
              hasFilter={false}
              tableTitle={t("todayRequests")}
              columns={[
                {
                  title: t("inviteTitle"),
                  dataIndex: "subject",
                  key: "title",
                  sorter: true,
                },
                {
                  title: t("inviteHoster"),
                  dataIndex: ["requester", "name"],
                  key: "hoster",
                  sorter: true,
                },
                {
                  title: t("inviteAttendee"),
                  dataIndex: ["guest", "name"],
                  key: "attendee",
                  sorter: true,
                },
                {
                  title: t("inviteDate"),
                  dataIndex: "createdAt",
                  key: "date",
                  sorter: true,

                  render: (date) => new Date(date).toLocaleDateString(),
                },
                {
                  title: t("inviteType"),
                  dataIndex: "type",
                  key: "type",
                  sorter: true,
                  render: (value) => t(inviteTypes[value]),
                },
                {
                  title: t("inviteRoom"),
                  dataIndex: ["room", "name"],
                  key: "room",
                  sorter: true,
                },
                {
                  title: t("inviteStatus"),
                  dataIndex: "status",
                  key: "status",
                  sorter: true,
                  render: (status, row) => {
                    if (status == 0) {
                      return (
                        <Button
                          size="small"
                          danger
                          onClick={() => {
                            globalModal
                              .confirm({
                                title: t("areYouSure"),
                                subtitle: t("acceptInvite"),
                              })
                              .then(async () => {
                                await acceptInvite(row.id);
                                refetch();
                              });
                          }}
                        >
                          {t("acceptInvite")}
                        </Button>
                      );
                    } else {
                      return t(statusEnum[status]);
                    }
                  },
                },
                {
                  title: t("action"),
                  dataIndex: "action",
                  key: "action",
                  render: (text, record) => (
                    <div>
                      <Button size="small" onClick={(e) => openDrawer(record)}>
                        <FaEye size={"12px"} />
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={isPending ? [] : data.data}
              paginationConfig={{
                total: data?.pagination?.total ?? 0,
                pageSize: data?.pagination?.pageSize ?? 0,
                current: data?.pagination?.current ?? 0,
              }}
              statusList={[
                { value: "", label: t("all") },
                { value: "0", label: t("pending") },
                { value: "1", label: t("approved") },
                { value: "2", label: t("rejected") },
                { value: "3", label: t("canceled") },
                { value: "6", label: t("completed") },
              ]}
              statusFilter={(value) => {
                setApiOptions({
                  ...apiOptions,
                  status: value,
                });
              }}
              onChange={(pagination, _filter, sorter) => {
                setApiOptions({
                  ...apiOptions,
                  sortField: sorter?.column?.dataIndex ?? null,
                  sortType: normSortType(sorter.order),
                  page: pagination.current,
                  pageSize: pagination.pageSize,
                });
              }}
              searchFunction={(e) => {
                setApiOptions({
                  ...apiOptions,
                  searchKeyword: !!e.target.value.trim()
                    ? e.target.value
                    : null,
                });
              }}
              downloadFunction={() => {
                serializeAndDownload(
                  data.data.map((item) => ({
                    [t("inviteTitle")]: item.subject,
                    [t("inviteHoster")]: item.requester.name,
                    [t("inviteAttendee")]: item.guest.name,
                    [t("inviteDate")]: new Date(
                      item.createdAt
                    ).toLocaleDateString(),
                    [t("inviteRoom")]: item.room.name,
                    [t("inviteStatus")]: t(statusEnum[item.status]),
                  })),
                  "requests"
                );
              }}
            />
          )}
        </CustomCard>
      )}
      {["Administrator", "Security", "Reception"].some((role) =>
        ability.can("manage", role)
      ) && (
        <>
          <Flex className="gap-4 w-full">
            {ability.can("manage", "Requests") && (
              <CustomCard
                titleSlot={
                  <Flex>
                    <h1>{t("mostInvited")}</h1>
                  </Flex>
                }
                className="basis-1/4"
              >
                <div className="flex flex-col gap-2">
                  {topInviters?.data?.map((stat, index) => (
                    <UserTotalInvites
                      key={index}
                      user={{
                        name: stat.requester.firstName,
                        email: stat.requester.email,
                        avatar: stat.requester.picture,
                        invites: stat.count,
                      }}
                    />
                  ))}
                </div>
              </CustomCard>
            )}
            {ability.can("manage", "Requests") && (
              <CustomCard
                titleSlot={
                  <Flex justify="space-between" className="w-full">
                    <h1>{t("invitesByMonth")}</h1>
                  </Flex>
                }
                className="basis-3/4"
              >
                <InvitesChart data={chartStats?.data ?? []} />
              </CustomCard>
            )}
          </Flex>
          <Flex className="gap-4 w-full">
            {ability.can("manage", "Restaurants") && (
              <CustomCard
                titleSlot={
                  <Flex>
                    <h1>{t("mostRequesters")}</h1>
                  </Flex>
                }
                className="basis-1/4"
              >
                <div className="flex flex-col gap-2">
                  {topRestaurantRequesters?.data?.map((stat, index) => (
                    <UserTotalInvites
                      key={index}
                      user={{
                        name: stat.requester.firstName,
                        email: stat.requester.email,
                        avatar: stat.requester.picture,
                        invites: stat.count,
                      }}
                    />
                  ))}
                </div>
              </CustomCard>
            )}
            {ability.can("manage", "Restaurants") && (
              <CustomCard
                titleSlot={
                  <Flex justify="space-between" className="w-full">
                    <h1>{t("topRequestedItems")}</h1>
                  </Flex>
                }
                className="basis-1/4"
              >
                <div className="flex flex-col gap-2">
                  {restarurantTopItems?.data?.map((stat, index) => (
                    <UserTotalInvites
                      key={index}
                      user={{
                        name: stat.item.name,
                        email: "",
                        avatar:
                          stat.item.image ??
                          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
                        invites: stat.count,
                      }}
                    />
                  ))}
                </div>
              </CustomCard>
            )}
            {ability.can("manage", "Restaurants") && (
              <CustomCard
                titleSlot={
                  <Flex justify="space-between" className="w-full">
                    <h1>{t("restaurantRequestsByMonth")}</h1>
                  </Flex>
                }
                className="basis-3/4"
              >
                <InvitesChart data={monthlyRestaurantOrders?.data ?? []} />
              </CustomCard>
            )}
          </Flex>
        </>
      )}
      <RequestDrawer
        invite={viewedInvite}
        drawerVisible={drawerVisible}
        closeDrawer={closeDrawer}
      />
    </div>
  );
}
function calculatePercentage(data) {
  if (!data) return 0;
  if (data.lastMonth === 0 && data.increment > 0) return "100%";
  if (data.lastMonth === 0 && data.increment === 0) return "0%";
  let calculationResult = data.increment / data.lastMonth;
  return `${Math.round(calculationResult * 100)}%`;
}
