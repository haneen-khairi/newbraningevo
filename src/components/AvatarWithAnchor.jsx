import { Avatar, Button, Dropdown } from "antd";
import { FaPlus } from "react-icons/fa";
import { t } from "i18next";
import PlaceHolderImage from "@/assets/avatar-image.webp";
export default function AvatarWithAnchor({ children, avatarProps }) {
  return (
    <div className="relative rounded-full">
      <Avatar
        {...avatarProps}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div id="anchor" className="absolute bottom-0 right-4">
        {children}
      </div>
    </div>
  );
}
