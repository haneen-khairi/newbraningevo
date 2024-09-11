import ComplexTable from "../../../components/ComplexTable";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import { BiDotsVertical } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms, deleteRoom, updateRoom } from "@/services/rooms";
import serializeAndDownload from "@/utils/exportCSV";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useReducer } from "react";
import useResultModal from "../../../hooks/useResultModal";
export default function RoomsComponent() {
  const { t } = useTranslation();
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["rooms", filterOptions],
    queryFn: () => fetchAllRooms(filterOptions),
  });

  console.log(data);
  
  return (
    <div className="w-full">
      <ComplexTable
        downloadFunction={() => {
          serializeAndDownload(
            data?.data.map((room) => ({
              [t("name")]: room.name,
              [t("roomNo")]: room.roomNo,
              [t("buildingName")]: room.buildingName,
              [t("status")]: room.isActive ? t("active") : t("inActive"),
            })),
            "rooms"
          );
        }}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("roomNo"),
            dataIndex: "number",
            key: "roomNo",
            render: (value) => (value ? value : "-"),
          },
          {
            title: t("buildingName"),
            dataIndex: ["building", "name"],
            key: "buildingName",
            render: (value) => (value ? value : "-"),
          },
          {
            title: t("floorName"),
            dataIndex: ["floor", "name"],
            key: "floorName",
            render: (value) => (value ? value : "-"),
          },
          {
            title: t("status"),
            dataIndex: "isActive",
            key: "status",
            render: (value) => {
              return <StatusComponent text={value} />;
            },
          },
          {
            title: t("action"),
            dataIndex: "actions",
            key: "actions",
            render: (value, row) => {
              return (
                <div className="inline-flex gap-2 h-full">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: t("edit"),
                          onClick: () => {
                            navigate(`/create-room?roomId=${row.id}`);
                          },
                        },
                        {
                          label: row.isActive ? t("deactivate") : t("activate"),
                          onClick: async () => {
                            await updateRoom({
                              id: row.id,
                              isActive: !row.isActive,
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
                                title: t("areYouSure"),
                                subtitle: t("deleteRoom"),
                              })
                              .then(async () => {
                                await deleteRoom(row.id);
                                refetch();
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
                </div>
              );
            },
          },
        ]}
        data={data?.data}
        loading={isPending}
        tableTitle={t("rooms")}
        addText={t("addRoom")}
        addFunction={() => {
          navigate("/create-room");
        }}
        searchFunction={(e) =>
          dispatch({ type: "search", payload: e.target.value })
        }
        onChange={(pagination, filters, sorter, { action }) => {
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
        paginationConfig={{
          pageSize: data?.pagination.pageSize,
          current: data?.pagination.current,
          total: data?.pagination.total,
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inActive"), value: false },
        ]}
        statusFilter={(e) => {
          dispatch({ type: "status", payload: e });
        }}
      />
    </div>
  );
}
