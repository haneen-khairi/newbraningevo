import { useTranslation } from "react-i18next";
import CustomCard from "@/components/CardWithHeader";
import ComplexTable from "@/components/ComplexTable";
import { useEffect, useReducer, useState } from "react";
import { Button, Checkbox, Typography } from "antd";
import { FaCircle, FaEye, FaPen } from "react-icons/fa";
import RequestDrawer from "./requestDrawer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRequests } from "@/services/requests";
import { statusEnum } from "../../components/InviteStatus";
import { useSelector } from "react-redux";
import serializeAndDownload from "@/utils/exportCSV";
import RoomSelector from "@/components/forms/RoomSelector";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { acceptInvite } from "./actions";
import { inviteTypes } from "@/enums/invite";
import useResultModal from "@/hooks/useResultModal";
export default function Requests() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalModal = useResultModal();
  const { ability } = useSelector((state) => state.ability);
  const [viewedInvite, setInvite] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const [apiOptions, setApiOptions] = useState({
    isRequesterOnly: ability.can("manage", "Administrator") ? false : true,
    isWithGuestOnly: true,
  });
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["requests", apiOptions, filterOptions],
    queryFn: () =>
      fetchAllRequests({
        ...apiOptions,
        ...filterOptions,
      }),
  });
  function openDrawer(invite) {
    setInvite(invite);
    setDrawerVisible(true);
  }
  function closeDrawer() {
    setDrawerVisible(false);
  }
  function buildFilterMenu() {
    let items = [
      {
        value: "",
        label: (
          <div>
            <Typography>{t("room")}</Typography>
            <RoomSelector
              allowClear
              className="w-full"
              onChange={(v) => {
                // TODO: refacter thos
                setApiOptions({
                  ...apiOptions,
                  roomId: v,
                });
              }}
            />
          </div>
        ),
      },
      {
        value: "",
        label: (
          <Checkbox
            onClick={() => {
              setApiOptions({
                ...apiOptions,
                isToday: !apiOptions.isToday,
              });
            }}
          >
            {t("todayOnly")}
          </Checkbox>
        ),
      },
      {
        value: "",
        label: (
          <Checkbox
            onClick={() => {
              setApiOptions({
                ...apiOptions,
                isUpcoming: !apiOptions.isUpcoming,
              });
            }}
          >
            {t("upcomingOnly")}
          </Checkbox>
        ),
      },
      {
        value: "",
        label: (
          <Checkbox
            onClick={() => {
              setApiOptions({
                ...apiOptions,
                isGuestInPlace: !apiOptions.isGuestInPlace,
              });
            }}
          >
            {t("isGuestInPlace")}
          </Checkbox>
        ),
      },
      {
        value: "",
        label: (
          <Checkbox
            defaultChecked
            onClick={() => {
              setApiOptions({
                ...apiOptions,
                isWithGuestOnly: !apiOptions.isWithGuestOnly,
              });
            }}
          >
            {t("withGuestsOnly")}
          </Checkbox>
        ),
      },
    ];
    if (ability.can("manage", "Administrator")) {
      items.push({
        value: "",
        label: (
          <Checkbox
            onClick={() => {
              setApiOptions({
                ...apiOptions,
                isRequesterOnly: !apiOptions.isRequesterOnly,
              });
            }}
          >
            {t("mineOnly")}
          </Checkbox>
        ),
      });
    }
    return { items };
  }

  return (
    <div className="w-full">
      <CustomCard>
        <div>
          <ComplexTable
            tableTitle={t("requests")}
            loading={isPending}
            hasFilter={true}
            filterMenu={buildFilterMenu()}
            addTitle={t("addInvite")}
            addFunction={() => navigate("/create-invite")}
            searchFunction={(e) => {
              dispatch({
                type: "search",
                payload: e.target.value,
              });
            }}
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
                  <div className="flex gap-2">
                    <Button size="small" onClick={(e) => openDrawer(record)}>
                      <FaEye size={"12px"} />
                    </Button>
                    <Button
                      size="small"
                      onClick={(e) => navigate("/edit-invite/" + record.id)}
                    >
                      <FaPen size={"12px"} />
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
            onChange={(pagination, _filter, sorter, { action }) => {
              if (action == "paginate") {
                dispatch({
                  type: "paginate",
                  payload: pagination,
                });
              }
              if (action == "sort") {
                dispatch({
                  type: "sort",
                  payload: sorter,
                });
              }
            }}
            downloadFunction={() => {
              let flatData = data.data;
              let normalizedData = flatData.map((item) => {
                return {
                  [t("inviteTitle")]: item.subject,
                  [t("inviteHoster")]: item.requester.name,
                  [t("inviteAttendee")]: item.guest.name,
                  [t("inviteDate")]: new Date(
                    item.createdAt
                  ).toLocaleDateString(),
                  [t("inviteRoom")]: item.room.name,
                  [t("inviteStatus")]: t(statusEnum[item.status]),
                };
              });
              serializeAndDownload(normalizedData, "requests");
            }}
          />
          <RequestDrawer
            invite={viewedInvite}
            drawerVisible={drawerVisible}
            closeDrawer={closeDrawer}
          />
        </div>
      </CustomCard>
    </div>
  );
}
