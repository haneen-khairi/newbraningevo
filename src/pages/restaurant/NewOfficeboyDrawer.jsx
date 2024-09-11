import {
  Avatar,
  Drawer,
  Typography,
  Button,
  Form,
  Radio,
  ConfigProvider,
} from "antd";
import FlatButton from "@/components/FlatButton";
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useResultModal from "@/hooks/useResultModal";
import { fetchAllWaiters } from "../../services/waiters";
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
import { fetchAllFloors } from "../../services/floors";
export default function NewOfficeboyDrawer({ visible, onClose }) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const client = useQueryClient();
  const globalModal = useResultModal();
  const editOrder = useMutation({
    mutationFn: (values) => updateOrder({ ...values }),
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("orderUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["restaurantOrders"] });
      onClose();
    },
    onError: (error) => {
      globalModal.error(t("error"), t("errorWhileUpdatingOrder"));
    },
  });
  const { data: users } = useQuery({
    queryKey: ["users", filterOptions],
    queryFn: () =>
        fetchAllWaiters({
        isActive: true,
        ...filterOptions,
      }),
  });
  const {data: floors} = useQuery({
      queryKey: ["floors"],
      queryFn: () => fetchAllFloors({}),
  })
    const floorsArr = floors?.data ?? [];
  return (
    <Drawer
      title={t("assignNewOfficeBoy")}
      placement="left"
      closable={false}
      onClose={()=>{
          setSelectedUser(null);
          onClose()
      }}
      width={600}
      open={visible}
      headerStyle={{
        borderBottom: "none",
        backgroundColor: "#FAFAFA",
      }}

      footer={
        <Button
          type="primary"
          className="w-full rounded-xl"
          onClick={() => {
            editOrder.mutate({
              id: visible.id,
              waiterId: selectedUser?.waiter?.id,
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
        <FormSelect
          className="w-[40%]"
          
          onChange={(e) => {
            setFilterOptions({
              ...filterOptions,
              floorId: e,
            });
          }}

          options={[
              { name: t("all"), id: '' },
              ...floorsArr
          ]}
          fieldNames={{
              label: "name",
              value: "id",
          }}
        ></FormSelect>
      </div>
      <div className="rounded-lg p-4 border border-solid border-[#f4f4f4] mt-4 flex flex-col gap-3">
        {users?.data?.map((user) => (
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
  const { t ,i18n} = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <Avatar shape="square" src={user?.waiter?.picture} />
      <div className="flex flex-col gap-1 grow">
        <Typography>{i18n.language == "ar" ? user?.waiter?.fullName ?? '-' : user?.waiter?.fullNameEn ?? '-'}</Typography>
        <Typography
          style={{
            color: "#767676",
          }}
        >
          {user?.location?.floor?.name ?? '-'}
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
          checked={selectedUser?.waiter?.id == user?.waiter?.id}
          onChange={() => {
            setSelectedUser(user);
          }}
        ></Radio>
      </ConfigProvider>
    </div>
  );
}
