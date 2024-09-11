import { Flex, Avatar, Typography } from "antd";
import useTheme from "@/hooks/useTheme";
import PlaceHolderImage from "@/assets/avatar-image.webp";
export default function UserTotalInvites({ user }) {
  const { token } = useTheme();
  return (
    <Flex justify="space-between" align="center">
      <Flex gap={4}>
        <Avatar src={user.avatar ?? PlaceHolderImage} size={"large"} />
        <Flex className="flex-col items-center justify-center" gap={6}>
          <h2>{user.name}</h2>
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="center"
        className=" py-3 rounded-lg min-w-[100px]"
        style={{
          backgroundColor: token.colorSecondary,
        }}
      >
        <Typography>{user.invites}</Typography>
      </Flex>
    </Flex>
  );
}
