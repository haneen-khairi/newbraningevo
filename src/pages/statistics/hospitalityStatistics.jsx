import StatusButton from "@/components/restaurant/StatusButton";
import { useTranslation } from "react-i18next";
import CardWithHeader from "@/components/CardWithHeader";
import { fetchAllUsers } from "@/services/users";
import { Avatar, Button, Input, Select } from "antd";
import ApexCharts from "react-apexcharts";
import colorjs from "color";
import { useQuery } from "@tanstack/react-query";
import {
  fetchRestaurantTopItems,
  fetchTeaboysStatistics,
  fetchOrdersCount,
  fetchBuildingsOrders,
} from "@/services/statistics";
import BuildingsImage from "@/assets/buildings.png";
import UserIcon from "@/assets/icons/user.svg?react";
import CountCard from "./hospitality/CountCard";
import CountEntry from "./hospitality/CountEntry";
import { useState } from "react";
import useBuildings from "../../hooks/useBuildings";
import {fetchAllCounters, fetchAllStatistics, fetchRestaurantStatistics} from "../../services/statistics.js";
import PlaceholderImage from "@/assets/placeholder.webp";
import {fetchAllItems} from "../../services/restaurantItems.js";

export default function HospitalityStatistics() {
  const { t, i18n } = useTranslation();
  const [selectedTeaBoy, setSelectedTeaBoy] = useState(null);

const {data: counters} = useQuery({
    queryKey: ["counters"],
    queryFn: () => fetchAllCounters(),
    staleTime: 1000 * 60 * 15,
  });

  //get statistics
  const { data: restaurantStatistics } = useQuery({
    queryKey: ["restaurantStatistics"],
    queryFn: () => fetchRestaurantTopItems(),
    staleTime: 1000 * 60 * 15,
  });

  const { data: teaBoys, isPending: teaBoysPending } = useQuery({
    queryKey: ["Teaboys"],
    queryFn: () =>
      fetchAllUsers({
        isActive: true,
        isGetAll: true,
        type: 6,
      }),
    staleTime: 1000 * 60 * 15,
  });

  const {data: items} = useQuery({
      queryKey: ["items"],
      queryFn: () => fetchAllItems({
          limit: 5,
          sortType: "desc",
          sortField: "rate",
      }),
  })

  const { data: topTeaBoys, error } = useQuery({
    queryKey: ["topTeaBoysStatistics", selectedTeaBoy],
    queryFn: () =>
      fetchTeaboysStatistics({
        waiterId: selectedTeaBoy ?? teaBoys[0]?.id,
        year: 2024,
      }),
    staleTime: 1000 * 60 * 15,
    enabled: !teaBoysPending,
  });

  const { data: buildings, isPending: isBuildingsPending } = useBuildings();
  
  const { data: buildingsOrders } = useQuery({
    queryKey: ["buildingsOrders"],
    queryFn: () =>
      fetchBuildingsOrders({
        buildingId: buildings?.data?.[0]?.id,
        year: 2024,
      }),
    staleTime: 1000 * 60 * 15,
    enabled: !isBuildingsPending,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-4 gap-3">
        <StatusButton
          bgcolor={"white"}
          count={counters?.data?.items ?? 0}
          color={"#0070DF"}
          text={t("products")}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C15.309 12 18 9.309 18 6C18 2.691 15.309 0 12 0C8.69096 0 5.99996 2.691 5.99996 6C5.99996 9.309 8.69096 12 12 12ZM12 3C13.654 3 15 4.346 15 6C15 7.654 13.654 9 12 9C10.346 9 8.99996 7.654 8.99996 6C8.99996 4.346 10.346 3 12 3ZM16.934 22.286C17.053 23.106 16.577 24 15.448 24C14.715 24 14.073 23.461 13.966 22.714C13.824 21.736 12.98 21 12.001 21C11.022 21 10.177 21.737 10.036 22.714C9.91796 23.534 9.15796 24.103 8.33696 23.984C7.51696 23.866 6.94796 23.105 7.06696 22.285C7.41996 19.842 9.54096 17.999 12.001 17.999C14.461 17.999 16.583 19.841 16.935 22.285L16.934 22.286ZM21.972 22.413C22.02 23.24 21.389 23.95 20.562 23.998C20.532 23.999 20.502 24 20.473 24C19.684 24 19.023 23.385 18.977 22.587C18.762 18.893 15.697 16 12 16C8.30296 16 5.23796 18.894 5.02296 22.587C4.97496 23.414 4.26296 24.04 3.43796 23.997C2.61096 23.949 1.97996 23.239 2.02796 22.412C2.33596 17.134 6.71596 12.999 12 12.999C17.284 12.999 21.664 17.134 21.972 22.413Z"
                fill="#0070DF"
              />
            </svg>
          }
        />
        <StatusButton
          bgcolor={"white"}
          count={counters?.data?.waiters ?? 0}
          color={"#FE8800"}
          text={t("teaBoys")}
          icon={
            <svg
              width="19"
              height="24"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4971 24H4.50205C3.92377 23.9997 3.35238 23.8744 2.827 23.6328C2.30161 23.3912 1.83464 23.0389 1.45805 22.6C1.08676 22.1707 0.812604 21.6663 0.654335 21.1212C0.496065 20.5762 0.457423 20.0034 0.541053 19.442C1.07796 16.5175 2.63802 13.8795 4.94205 12C2.63799 10.1199 1.07826 7.48109 0.542054 4.556C0.458587 3.99502 0.497218 3.42262 0.655307 2.87794C0.813396 2.33326 1.08722 1.82913 1.45805 1.4C1.83464 0.961146 2.30161 0.608844 2.827 0.36721C3.35238 0.125575 3.92377 0.000313842 4.50205 0L14.4971 0C15.0753 0.000512143 15.6466 0.125862 16.172 0.367483C16.6973 0.609104 17.1643 0.9613 17.5411 1.4C17.9119 1.82895 18.1859 2.33285 18.3444 2.87732C18.5028 3.42179 18.5419 3.99403 18.4591 4.555C17.9174 7.48095 16.3541 10.1194 14.0481 12C16.3528 13.8822 17.9143 16.5217 18.4541 19.448C18.537 20.0091 18.4979 20.5815 18.3395 21.1262C18.1811 21.6708 17.907 22.1749 17.5361 22.604C17.1595 23.0413 16.6932 23.3924 16.1687 23.6333C15.6443 23.8742 15.0742 23.9993 14.4971 24ZM14.4971 2H4.50205C4.21199 1.99982 3.9253 2.06227 3.66159 2.18308C3.39787 2.30389 3.16335 2.48022 2.97405 2.7C2.78921 2.91043 2.65261 3.15874 2.57384 3.42753C2.49507 3.69632 2.47603 3.97908 2.51805 4.256C2.89405 6.756 4.44205 9.096 7.11805 11.213C7.2363 11.3066 7.33183 11.4258 7.3975 11.5615C7.46318 11.6973 7.49729 11.8462 7.49729 11.997C7.49729 12.1478 7.46318 12.2967 7.3975 12.4325C7.33183 12.5682 7.2363 12.6874 7.11805 12.781C4.44205 14.9 2.89705 17.242 2.51805 19.741C2.47558 20.0184 2.49439 20.3017 2.57317 20.5711C2.65195 20.8404 2.78879 21.0892 2.97405 21.3C3.16335 21.5198 3.39787 21.6961 3.66159 21.8169C3.9253 21.9377 4.21199 22.0002 4.50205 22H14.4971C14.7871 22.0002 15.0738 21.9378 15.3376 21.817C15.6013 21.6962 15.8358 21.5198 16.0251 21.3C16.2099 21.0899 16.3464 20.842 16.4252 20.5735C16.504 20.3051 16.5231 20.0226 16.4811 19.746C16.1081 17.259 14.5611 14.917 11.8811 12.784C11.7635 12.6903 11.6686 12.5714 11.6034 12.436C11.5382 12.3006 11.5043 12.1523 11.5043 12.002C11.5043 11.8517 11.5382 11.7034 11.6034 11.568C11.6686 11.4326 11.7635 11.3137 11.8811 11.22C14.5621 9.087 16.1091 6.745 16.4811 4.257C16.5229 3.97955 16.5033 3.69629 16.4237 3.42725C16.344 3.1582 16.2062 2.90994 16.0201 2.7C15.8313 2.4808 15.5976 2.30482 15.3348 2.18403C15.072 2.06324 14.7863 2.00047 14.4971 2ZM13.1781 20H5.81505C5.65143 19.9999 5.49033 19.9597 5.34587 19.8829C5.20141 19.806 5.07802 19.6949 4.98651 19.5593C4.895 19.4236 4.83817 19.2676 4.821 19.1049C4.80383 18.9422 4.82686 18.7777 4.88805 18.626C5.67113 16.9351 6.86426 15.4666 8.35905 14.354L8.87705 13.942C9.05401 13.8012 9.27344 13.7246 9.49955 13.7246C9.72566 13.7246 9.9451 13.8012 10.1221 13.942L10.6311 14.348C12.1237 15.465 13.3169 16.934 14.1041 18.624C14.1656 18.7758 14.189 18.9403 14.1721 19.1033C14.1552 19.2662 14.0985 19.4224 14.0071 19.5583C13.9156 19.6942 13.7922 19.8055 13.6476 19.8826C13.5031 19.9596 13.3418 19.9999 13.1781 20ZM7.53105 18H11.4591C10.8885 17.2563 10.2297 16.5847 9.49705 16C8.76121 16.5824 8.1008 17.2543 7.53105 18Z"
                fill="#FE8800"
              />
            </svg>
          }
        />
        <StatusButton
          bgcolor={"white"}
          count={counters?.data?.previousOrders ?? 0}
          color={"#E98484"}
          text={t("previousRequests")}
          icon={
              <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      d="M19.75 2H18.75V1C18.75 0.448 18.303 0 17.75 0C17.197 0 16.75 0.448 16.75 1V2H8.75V1C8.75 0.448 8.303 0 7.75 0C7.197 0 6.75 0.448 6.75 1V2H5.75C2.993 2 0.75 4.243 0.75 7V19C0.75 21.757 2.993 24 5.75 24H19.75C22.507 24 24.75 21.757 24.75 19V7C24.75 4.243 22.507 2 19.75 2ZM5.75 4H19.75C21.404 4 22.75 5.346 22.75 7V8H2.75V7C2.75 5.346 4.096 4 5.75 4ZM19.75 22H5.75C4.096 22 2.75 20.654 2.75 19V10H22.75V19C22.75 20.654 21.404 22 19.75 22ZM19.75 14C19.75 14.552 19.303 15 18.75 15H6.75C6.197 15 5.75 14.552 5.75 14C5.75 13.448 6.197 13 6.75 13H18.75C19.303 13 19.75 13.448 19.75 14ZM12.75 18C12.75 18.552 12.303 19 11.75 19H6.75C6.197 19 5.75 18.552 5.75 18C5.75 17.448 6.197 17 6.75 17H11.75C12.303 17 12.75 17.448 12.75 18Z"
                      fill="#E98484"
                  />
              </svg>
          }
        />

          <StatusButton
              bgcolor={"white"}
              count={counters?.data?.currentOrders ?? 0}
              color={"#219653"}
              text={t("currentRequests")}
              icon={
                  <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                          d="M19.75 2H18.75V1C18.75 0.448 18.303 0 17.75 0C17.197 0 16.75 0.448 16.75 1V2H8.75V1C8.75 0.448 8.303 0 7.75 0C7.197 0 6.75 0.448 6.75 1V2H5.75C2.993 2 0.75 4.243 0.75 7V19C0.75 21.757 2.993 24 5.75 24H19.75C22.507 24 24.75 21.757 24.75 19V7C24.75 4.243 22.507 2 19.75 2ZM5.75 4H19.75C21.404 4 22.75 5.346 22.75 7V8H2.75V7C2.75 5.346 4.096 4 5.75 4ZM19.75 22H5.75C4.096 22 2.75 20.654 2.75 19V10H22.75V19C22.75 20.654 21.404 22 19.75 22ZM19.75 14C19.75 14.552 19.303 15 18.75 15H6.75C6.197 15 5.75 14.552 5.75 14C5.75 13.448 6.197 13 6.75 13H18.75C19.303 13 19.75 13.448 19.75 14ZM12.75 18C12.75 18.552 12.303 19 11.75 19H6.75C6.197 19 5.75 18.552 5.75 18C5.75 17.448 6.197 17 6.75 17H11.75C12.303 17 12.75 17.448 12.75 18Z"
                fill="#219653"
              />
            </svg>
          }
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <OrdersDateChart
          teaboys={teaBoys?.data ?? []}
          onTeaboyChange={(option) => {
            setSelectedTeaBoy(option);
          }}
          chartData={topTeaBoys?.data}
        />
        <OrdersChart />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <CountCard
          Render={CountEntry}
          renderProps={{ countElProps: { order: 1, text: t("order") } }}
          text={t("mostOrdered")}
          items={
            restaurantStatistics?.data?.map((item) => ({
              name:
                i18n.language === "ar"
                  ? item?.item?.nameAr
                  : item?.item?.nameEn,
              count: item?.count,
              image: item?.item?.image ?? PlaceholderImage,
            })) ?? []
          }
        />
        <CountCard
          Render={CountEntry}
          renderProps={{
            countElProps: {
              order: 2,
              bgColor: "#FFF8E5",
              text: (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.22139 3.29748L7.16535 0.0078125L4.6981 4.1199L0.586013 4.53111L0.174805 5.35352L2.64206 7.82077L3.05326 9.0544L2.23085 12.3441L3.05326 13.1665L6.16504 11.9998L7.57656 11.5217L10.8662 13.1665L11.6886 12.7553L10.8662 8.23198L12.0999 7.40957L13.7447 6.17594V4.94232L13.3335 4.53111L10.455 4.1199L9.22139 3.29748Z"
                    fill="#FCA71B"
                  />
                </svg>
              ),
            },
          }}
          text={t("itemsRating")}
          items={items?.data?.map((item) => ({
              name: i18n.language === "ar" ? item.nameAr : item.nameEn,
              count: item?.rate ?? '-',
              image: item?.image ?? PlaceholderImage,
          })) ?? []}
        />
        <CountCard
          Render={CountEntry}
          renderProps={{ countElProps: { order: 1, text: t("order") } }}
          text={t("buildingsOrders")}
          items={
            buildingsOrders?.data?.map((item) => ({
              name: i18n.language === "ar" ? item.nameAr : item.nameEn,
              count: item.ordersCount,
              image: BuildingsImage,
            })) ?? []
          }
        />
      </div>
    </div>
  );
}

function OrdersChart() {
  const { t } = useTranslation();
  const { data: ordersCount } = useQuery({
    queryKey: ["ordersCount"],
    queryFn: () =>
        fetchRestaurantStatistics({
        year: 2024,
      }),
    staleTime: 1000 * 60 * 15,
  });
  let ordersCountData = ordersCount?.data ?? {};
  return (
    <CardWithHeader
      titleSlot={
        <div className="flex gap-2 items-center font-su">
          <StatisticsIcon />
          {t("orders")}
        </div>
      }
      className="col-span-1"
      contentProps={{
        style: {
          height: "85%",
        },
      }}
    >
      <div className="flex gap-2 items-center justify-center h-full">
        <div className="flex flex-col gap-4 w-1/3">
          <OrdersChartEntry
            color={"#FE8800"}
            text={t("pending")}
            count={ordersCountData?.pending ?? 0}
          />
          <OrdersChartEntry
            color={"#219653"}
            text={t("accepted")}
            count={ordersCountData?.accepted ?? 0}
          />
          <OrdersChartEntry
            color={"#0070DF"}
            text={t("preparing")}
            count={ordersCountData?.preparing ?? 0}
          />
          <OrdersChartEntry
            color={"#BB6BD9"}
            text={t("delivered")}
            count={ordersCountData?.completed ?? 0}
          />
          <OrdersChartEntry
            color={"#757575"}
            text={t("cancelled")}
            count={ordersCountData?.canceled ?? 0}
          />
          <OrdersChartEntry
            color={"#F30000"}
            text={t("rejected")}
            count={ordersCountData?.rejected ?? 0}
          />
        </div>
        <ApexCharts
          type="donut"
          height={300}
          series={[
            ordersCountData?.pending ?? 0,
            ordersCountData?.accepted ?? 0,
            ordersCountData?.preparing ?? 0,
            ordersCountData?.delivered ?? 0,
            ordersCountData?.cancelled ?? 0,
            ordersCountData?.rejected ?? 0,
            ordersCountData?.completed ?? 0,
          ]}
          options={{
            labels: ["الموظفين", "الطلبات"],
            series: [
              ordersCountData?.pending ?? 0,
              ordersCountData?.accepted ?? 0,
              ordersCountData?.preparing ?? 0,
              ordersCountData?.delivered ?? 0,
              ordersCountData?.cancelled ?? 0,
              ordersCountData?.rejected ?? 0,
              ordersCountData?.completed ?? 0,
            ],
            chart: {
              type: "donut",
              parentHeightOffset: 0,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "70%",
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
          }}
          className="w-2/3"
        />
      </div>
    </CardWithHeader>
  );
}
function OrdersChartEntry({ color, text, count }) {
  return (
    <div className="flex justify-between items-center">
      <div
        className="flex items-center justify-center py-1 px-3 rounded-xl w-8 font-bold"
        style={{
          backgroundColor: colorjs(color).alpha(0.1),
          color: colorjs(color).alpha(0.8),
        }}
      >
        {count}
      </div>
      {text}
    </div>
  );
}

function OrdersDateChart({ teaboys, onTeaboyChange, chartData }) {
  const { t, i18n } = useTranslation();
  const categories = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];
  //simple donut chart
  return (
    <CardWithHeader
      titleSlot={
        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <StatisticsIcon />
            {t("ordersStatistics")}
          </div>
          <div className="flex gap-2 items-center">
            <Button className="border-none w-fit">
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6758 14.1064V13.7643C10.6758 9.67277 10.6749 5.58142 10.673 1.49024C10.673 1.04727 10.7701 0.654041 11.1135 0.353724C11.5185 -8.66821e-05 11.983 -0.0967506 12.484 0.101271C12.9851 0.299292 13.2695 0.673749 13.3234 1.21338C13.3366 1.34477 13.3342 1.4785 13.3342 1.61083C13.3342 5.66323 13.3342 9.71547 13.3342 13.7676C13.3342 13.8586 13.3136 13.9553 13.3605 14.0543C13.4515 14.0322 13.4956 13.9543 13.5519 13.898C14.4903 12.9595 15.4287 12.021 16.3671 11.0825C16.7424 10.7071 17.1924 10.587 17.6986 10.7269C18.2049 10.8667 18.5141 11.2069 18.6286 11.7123C18.7318 12.1674 18.622 12.5818 18.2936 12.9206C17.8713 13.3574 17.4368 13.7859 17.0061 14.2166C15.682 15.5424 14.3572 16.8672 13.0316 18.1911C12.531 18.6899 11.9525 18.8011 11.3941 18.5196C11.2558 18.4465 11.1303 18.3514 11.0225 18.2381C9.27088 16.4887 7.52143 14.7381 5.77416 12.9863C5.08211 12.2894 5.24539 11.2191 6.08852 10.8047C6.61308 10.5471 7.20848 10.6569 7.65562 11.1022C8.58524 12.0276 9.51298 12.9548 10.4389 13.8839C10.5013 13.9431 10.5641 14.0003 10.6758 14.1064Z"
                  fill="#38ACB1"
                />
                <path
                  d="M11.9985 23.998C9.78866 23.998 7.57893 23.998 5.36936 23.998C2.90236 23.998 0.811177 22.3843 0.177771 19.9977C0.0411791 19.4601 -0.014952 18.9052 0.0112086 18.3511C0.0266918 17.9152 -0.0441559 17.475 0.0496821 17.0443C0.190439 16.3991 0.796632 15.9453 1.41502 16.0007C2.12772 16.0649 2.65744 16.6046 2.67527 17.3019C2.68747 17.7711 2.67527 18.2404 2.67996 18.7096C2.69169 20.1352 3.8642 21.3261 5.28725 21.328C9.76895 21.3349 14.2508 21.3349 18.7328 21.328C20.1404 21.3257 21.3134 20.1338 21.3293 18.7223C21.334 18.277 21.3293 17.8307 21.3293 17.3868C21.334 16.6046 21.9299 15.9908 22.6735 15.9988C23.4172 16.0068 24.0018 16.6088 23.9948 17.3802C23.9877 18.1437 24.0356 18.9076 23.907 19.6692C23.5566 21.7419 21.7258 23.5724 19.6501 23.9093C19.2729 23.9713 18.8913 24.0027 18.509 24.0032C16.3395 23.9978 14.1693 23.9961 11.9985 23.998Z"
                  fill="#38ACB1"
                />
              </svg>
            </Button>
            <Select
              className="h-full border border-solid border-[#F5F5F5] bg-white rounded-lg"
              labelRender={(label) => (
                <div className="flex gap-2 items-center min-w-fit">
                  <UserIcon />
                  {label.label}
                </div>
              )}
              variant="borderless"
              onChange={onTeaboyChange}
              defaultValue={null}
              fieldNames={{
                label: "name",
                value: "id",
              }}
              options={[
                {
                  name: t("SelectTeaBoy"),
                  id: null,
                },
                ...teaboys,
              ]}
            ></Select>
          </div>
        </div>
      }
      className="col-span-2"
    >
      <div className="w-full">
        <ApexCharts
          series={[
            {
              name: "Orders",
              data: chartData ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ]}
          type="bar"
          height={400}
          options={{
            chart: {
              type: "bar",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            series: [
              {
                name: "Trips",
                data: [10, 20, 30, 40, 50],
              },
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "10px",
                borderRadiusApplication: "around",
                borderRadius: 5,
                colors: {
                  backgroundBarColors: ["#F8FAFB"],
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            colors: ["#829FE4"],
            xaxis: {
              categories:
                i18n.language === "en" ? categories : categories.reverse(),
            },
            yaxis: {
              show: true,
              opposite: true,
            },
          }}
        />
      </div>
    </CardWithHeader>
  );
}

function StatisticsIcon() {
  return (
    <div className="rounded-full px-2 py-1 bg-white">
      <svg
        width="19"
        height="12"
        viewBox="0 0 19 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_544)">
          <path
            d="M3.197 4.86187C3.29858 5.0141 3.41041 5.15942 3.53175 5.29685C4.97589 6.7288 6.42432 8.15758 7.87705 9.58318C8.73324 10.427 9.54597 10.3404 10.2219 9.33791C10.7256 8.59098 11.2406 7.85198 11.7283 7.09552C11.894 6.83914 11.9898 6.86136 12.1902 7.06139C13.534 8.40391 14.8861 9.73929 16.2466 11.0675C16.8042 11.612 17.5558 11.6398 18.0788 11.1596C18.6421 10.6381 18.6421 9.85624 18.0523 9.26727C17.102 8.31951 16.1428 7.38049 15.1868 6.43749C14.3821 5.64373 13.5774 4.84996 12.7728 4.0562C12.0043 3.30212 11.1594 3.38308 10.555 4.26813C10.0215 5.05555 9.48964 5.84931 8.95211 6.63673C8.88211 6.73833 8.83382 6.94312 8.63667 6.74865C7.41838 5.54609 6.19687 4.34592 4.93512 3.10209C5.17089 3.06082 5.34873 3.04018 5.52174 2.9989C6.12686 2.85443 6.56783 2.25832 6.49943 1.67728C6.4254 1.02242 5.93615 0.541403 5.28516 0.528703C4.12159 0.50489 2.95747 0.495894 1.79283 0.501715C1.02274 0.505684 0.505331 1.05259 0.505331 1.81698C0.505331 2.87534 0.505331 3.93157 0.505331 4.98569C0.505331 5.83899 1.00665 6.40495 1.76467 6.41447C2.52268 6.424 3.04653 5.88503 3.0763 5.03491C3.07875 5.00824 3.08278 4.98173 3.08837 4.95553L3.197 4.86187Z"
            fill="#2F307F"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_544">
            <rect
              width="18"
              height="11"
              fill="white"
              transform="matrix(-1 0 0 1 18.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
