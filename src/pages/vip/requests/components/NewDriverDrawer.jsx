import { Avatar, Typography, Button, Form, Radio, ConfigProvider } from "antd";
import Drawer from "@/components/Drawer";
import FlatButton from "@/components/FlatButton";
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useResultModal from "@/hooks/useResultModal";
import { fetchAllUsers } from "@/services/users";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { updateOrder } from "@/services/restaurantOrders";
import { GetVipDrivers } from "../../../../services/vip_drivers.js";
import { ChangeTripDriver } from "../../../../services/vip_trips.js";
export default function NewDriverDrawer({ visible, onClose, tripId }) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const client = useQueryClient();
  const globalModal = useResultModal();

  const editOrder = useMutation({
    mutationFn: (values) => ChangeTripDriver({ ...values }),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["vipTrips"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingOrder"));
    },
  });
  const { data: users, isPending } = GetVipDrivers();
  return (
    <Drawer
      title={t("assignNewDriver")}
      onClose={onClose}
      width={600}
      open={visible}
      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          onClick={() => {
            editOrder.mutate({
              tripId: tripId,
              driverId: selectedUser.id,
            });
            setIsOpen(false);
          }}
          loading={editOrder.isPending}
        >
          {t("save")}
        </Button>
      }
    >
      <div className="flex gap-3">
        <FormInput
          size="large"
          placeholder={t("search")}
          onChange={(e) => {
            setFilterOptions({
              ...filterOptions,
              searchKeyword: e.target.value,
            });
          }}
          prefix={
            <FaMagnifyingGlass
              style={{
                color: "#b9b9b9",
              }}
            />
          }
        ></FormInput>
      </div>
      <div className="rounded-lg p-4 border border-solid border-[#f4f4f4] mt-4 flex flex-col gap-3">
        {users?.data?.items?.map((user) => (
          <UserEntry
            key={user.id}
            user={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </Drawer>
  );
}

function UserEntry({ user, selectedUser, setSelectedUser }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <Avatar shape="square" src={user?.userInfo?.profilePictureUrl} />
      <div className="flex flex-col gap-1 grow">
        <Typography>
          {i18n.language == "ar"
            ? user?.userInfo?.fullName
            : user?.userInfo?.fullNameEn}
        </Typography>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              radioSize: 24,
            },
          },
          token: {
            colorBorder: "#38ACB1",
          },
        }}
      >
        <Radio
          checked={selectedUser?.id == user.id}
          onChange={() => {
            setSelectedUser(user);
          }}
        ></Radio>
      </ConfigProvider>
    </div>
  );
}
