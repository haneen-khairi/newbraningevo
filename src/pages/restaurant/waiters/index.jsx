import { t } from "i18next";
import ComplexTable from "@/components/ComplexTable";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllWaiters,
  updateWaiters,
  deleteWaiters,
} from "@/services/waiters";
import { useReducer, useState } from "react";
import WaitersModal from "./WaitersModal";
import { Dropdown } from "antd";
import ActionButton from "@/pages/organization/actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import StatusComponent from "@/components/statusComponent";
import useResultModal from "@/hooks/useResultModal";
import serializeAndDownload from "@/utils/exportCSV";
import WaiterDrawer from "./WaiterDrawer";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
export default function Waiters() {
  
  const globalModal = useResultModal();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { i18n } = useTranslation();
  const {
    data: waiters,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["waiters", filterOptions],
    queryFn: () =>
      fetchAllWaiters({
        ...filterOptions,
        hasFloor: false,
      }),
  });
  const [modalData, setModalData] = useState(null);
  const [waiterModalVisible, setWaiterModalVisible] = useState(false);
  const [waiterModalId, setWaiterModalId] = useState(null);
  //name, id, phone, email, rest, building, floor, averageRating, dateAdded, lastUpdate, status, actions
  const columns = [
    {
      title: t("name"),
      dataIndex: ["waiter"],
      key: "day",
      render: (value) => {
        return i18n.language == "ar" ? value.fullName : value.fullNameEn;
      },
    },
    {
      title: t("identityNumber"),
      dataIndex: ["waiter", "identityId"],
      key: "day",
    },
    {
      title: t("phoneNumber"),
      dataIndex: ["waiter", "phoneNumber"],
      key: "day",
    },
    {
      title: t("email"),
      dataIndex: ["waiter", "email"],
      key: "day",
    },
    {
      title: t("restTime"),
      dataIndex: ["restHour", "start"],
      key: "day",
      render: (value) => {
        return value ? dayjs(value, "HH:mm:ss").format("HH:mm a") : "-";
      },
    },
    {
      title: t("building"),
      dataIndex: ["location", "floor", "building", "name"],
      key: "day",
    },

    {
      title: t("floor"),
      dataIndex: ["location", "floor", "name"],
      key: "day",
    },
    {
      title: t("averageRating"),
      dataIndex: ["rate"],
      key: "day",
      render: (value, row) => {
        //random float from 3 to 5

        return (
          <div className="flex gap-2 rounded-full px-3 py-1 bg-[#fef8e4] w-fit text-black">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.83507 0.498047C8.24755 0.51925 8.6122 0.747105 8.83438 1.19427C9.33802 2.20696 9.84422 3.21964 10.3437 4.23676C10.4113 4.37411 10.4958 4.43772 10.6536 4.45829C11.7922 4.61652 12.9295 4.7833 14.0665 4.95166C14.5447 5.02255 14.8762 5.28806 15.0327 5.73965C15.1921 6.19884 15.091 6.62006 14.7458 6.96058C13.9357 7.75701 13.1188 8.54681 12.2952 9.32995C12.1568 9.46192 12.1138 9.58597 12.1476 9.773C12.3455 10.8759 12.533 11.9807 12.7214 13.0848C12.8052 13.5715 12.6503 13.9757 12.2518 14.2646C11.8534 14.5535 11.4176 14.5744 10.9768 14.3462C10.1129 13.8981 9.25004 13.4482 8.38812 12.9965C8.22873 12.9133 8.06649 12.8354 7.90997 12.7456C7.79618 12.6797 7.69959 12.6861 7.58356 12.7456C6.56353 13.2823 5.54137 13.8155 4.51708 14.3453C3.76258 14.7339 2.90862 14.3162 2.76199 13.4953C2.71832 13.25 2.7827 13.013 2.82351 12.7756C2.99627 11.7644 3.17255 10.7538 3.35233 9.74389C3.38134 9.58217 3.34595 9.47015 3.22483 9.35369C2.4003 8.56443 1.57991 7.77073 0.763672 6.97261C0.354065 6.57323 0.277562 5.98301 0.568591 5.51053C0.765585 5.1909 1.05566 5.00419 1.42925 4.95007C2.57679 4.7833 3.72433 4.61526 4.87378 4.45386C5.00638 4.43519 5.08033 4.37759 5.13707 4.2624C5.64496 3.23283 6.15498 2.20453 6.66712 1.1775C6.88675 0.744572 7.28393 0.498047 7.83507 0.498047ZM4.39468 9.5923C4.39468 9.60781 4.39213 9.6556 4.38448 9.7018C4.26016 10.4385 4.13531 11.175 4.00993 11.9114C3.93471 12.3522 3.85693 12.7924 3.77979 13.2329C3.76544 13.3146 3.7664 13.3911 3.83972 13.4478C3.91303 13.5044 3.98858 13.4848 4.06285 13.4459C4.0909 13.431 4.11831 13.4142 4.14668 13.4006C5.13484 12.8845 6.12746 12.3721 7.11403 11.85C7.54914 11.6202 7.96736 11.6284 8.40119 11.8569C9.40561 12.3895 10.4164 12.9111 11.424 13.4374C11.5024 13.4785 11.5783 13.5108 11.6602 13.4468C11.7338 13.3892 11.7335 13.313 11.7195 13.2317C11.5282 12.1224 11.3421 11.012 11.1403 9.90434C11.0507 9.41191 11.1693 9.00748 11.5349 8.65873C12.3455 7.88529 13.1469 7.10204 13.9518 6.32259C14.0235 6.25328 14.1111 6.18904 14.0691 6.06941C14.0302 5.95928 13.9269 5.95327 13.8335 5.93966C12.7797 5.78776 11.7278 5.61719 10.6704 5.49377C10.0307 5.41876 9.61567 5.12571 9.35364 4.53867C9.03488 3.82283 8.66225 3.1304 8.31257 2.42785C8.18124 2.16392 8.04832 1.90062 7.91699 1.63669C7.88192 1.56612 7.83379 1.51295 7.749 1.51264C7.66421 1.51232 7.61481 1.56422 7.58006 1.63542C7.54532 1.70662 7.50419 1.78574 7.4669 1.86138C6.99099 2.81868 6.51253 3.77441 6.04076 4.73362C5.83867 5.14502 5.51736 5.38585 5.06312 5.45167C3.94108 5.6137 2.81894 5.77521 1.69669 5.93618C1.59436 5.95106 1.47355 5.94536 1.42988 6.06973C1.38621 6.1941 1.48885 6.2596 1.5593 6.33366C1.58097 6.35676 1.60488 6.37765 1.62751 6.3998C2.41379 7.16058 3.20007 7.92116 3.98635 8.68152C4.23849 8.92456 4.38416 9.21002 4.39468 9.5923Z"
                fill="#FCA71B"
              />
              <path
                d="M9.8044 3.79748L7.74836 0.507812L5.28111 4.6199L1.16902 5.03111L0.757812 5.85352L3.22506 8.32077L3.63627 9.5544L2.81386 12.8441L3.63627 13.6665L6.74805 12.4998L8.15957 12.0217L11.4492 13.6665L12.2717 13.2553L11.4492 8.73198L12.6829 7.90957L14.3277 6.67594V5.44232L13.9165 5.03111L11.038 4.6199L9.8044 3.79748Z"
                fill="#FCA71B"
              />
            </svg>
            <p>{value ?? "-"}</p>
          </div>
        );
      },
    },
    {
      title: t("dateAdded"),
      dataIndex: ["waiter", "createdAt"],
      key: "day",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: t("lastUpdate"),
      dataIndex: ["waiter", "updatedAt"],
      key: "day",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: t("status"),
      dataIndex: ["waiter", "isActive"],
      key: "day",
      render: (value) => {
        return <StatusComponent text={value} />;
      },
    },
    {
      title: t("actions"),
      dataIndex: "type",
      key: "type",
      render: (value, row) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  label: t("edit"),
                  onClick: () => {
                    setWaiterModalVisible(true);
                    const finalObject = {
                      ...row.waiter,
                      ...row.location,
                    };
                    if (row.restHour && row.restHour.start) {
                      finalObject.restHourStart = row.restHour.start;
                    }
                    if (row.restHour && row.restHour.end) {
                      finalObject.restHourEnd = row.restHour.end;
                    }
                    finalObject.id = row.waiter.id;
                    setWaiterModalId(finalObject);
                  },
                },
                {
                  label: row.waiter.isActive ? t("deactivate") : t("activate"),
                  onClick: async () => {
                    await updateWaiters({
                      ...row,
                      isActive: !row.waiter.isActive,
                      id: row.waiter.id,
                    });
                    refetch();
                  },
                },
                {
                  label: t("delete"),
                  danger: true,
                  onClick: () => {
                    globalModal
                      .confirm({
                        title: t("delete"),
                        subtitle: t("areYouSure"),
                      })
                      .then(async () => {
                        await deleteWaiters(row?.waiter?.id);
                        await refetch();
                      });
                  },
                },
              ],
            }}
          >
            <ActionButton>
              <BiDotsVertical className="align-middle" size={20} />
            </ActionButton>
          </Dropdown>
        );
      },
    },
  ];
  return (

    <div className="p-2 rounded-xl bg-white w-full">
      <ComplexTable
        tableTitle={t("waiters")}
        columns={columns}
        data={waiters ? waiters.data : []}
        loading={isPending}
        error={error}
        hasStatusFilter={false}
        addFunction={() => {
          setWaiterModalVisible(true);
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        paginationConfig={{
          current: waiters?.pagination.current,
          pageSize: waiters?.pagination.pageSize,
          total: waiters?.pagination.total,
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          switch (action) {
            case "paginate":
              dispatch({ type: "paginate", payload: pagination });
              break;
            case "sort":
              dispatch({ type: "sort", payload: sorter });
              break;
          }
        }}
        downloadFunction={() =>
          serializeAndDownload(
            waiters?.data.map((dayOff) => ({
              [t("name")]: dayOff.waiter.name,
              [t("email")]: dayOff.waiter.email,
              [t("phone")]: dayOff.waiter.phoneNumber,
              [t("restTime")]: dayOff?.restHour?.start ?? "-",
              [t("building")]: dayOff?.location?.floor?.building?.name ?? "-",
              [t("floor")]: dayOff?.location?.floor?.name ?? "-",
              [t("averageRating")]: dayOff?.rate ?? "-",
              [t("addedAt")]: new Date(
                dayOff.waiter.createdAt,
              ).toLocaleDateString(),
              [t("updatedAt")]: new Date(
                dayOff.waiter.updatedAt,
              ).toLocaleDateString(),
            })),
            "waiters",
          )
        }
      />
      <WaiterDrawer
        isOpen={waiterModalVisible}
        onClose={() => {
          setWaiterModalVisible(false);
          setWaiterModalId(null);
        }}
        id={waiterModalId}
      />
    </div>
  );
}
