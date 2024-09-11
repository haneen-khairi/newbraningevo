import { useReducer } from "react";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { useTranslation } from "react-i18next";
import StatusComponent from "@/components/statusComponent";
import ActionButton from "../actionsButton";
import ComplexTable from "@/components/ComplexTable";
import { BiDotsVertical } from "react-icons/bi";
import { Drawer, Modal, Dropdown } from "antd";
import useResultModal from "@/hooks/useResultModal";
import { useNavigate } from "react-router-dom";
import useFloors from "@/hooks/useFloors";
export default function Floors() {
  const { t } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const { data: floors } = useFloors();
  const globalModal = useResultModal();
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <ComplexTable
        tableTitle={t("floors")}
        addText={t("addFloor")}
        addFunction={() => {
          navigate("/create-floor");
        }}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("building"),
            dataIndex: ["building", "name"],
            key: "buildingId",
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
            render: (value, record) => (
              <div className="inline-flex gap-2 h-full">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: t("edit"),
                        onClick: () => {
                          navigate(`/edit-floor/${record.id}`);
                        },
                      },
                      {
                        key: "delete",
                        label: t("delete"),
                        danger: true,
                        onClick: () => {
                          globalModal
                            .confirm({
                              title: t("delete"),
                              subtitle: t("areYouSure"),
                            })
                            .then(async (e) => {
                              await deleteFloor(record.id);
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
            ),
          },
        ]}
        data={floors?.data}
        isPending={false}
      />
    </div>
  );
}
