import { Drawer } from "antd";
import React from "react";
import FlatButton from "@/components/FlatButton";
import { IoCloseOutline } from "react-icons/io5";

export default function MapDrawer({
  open,
  onClose,
  children,
  drawerContent,
  title,
  footer,
}) {
  if (!open) return null;
  return (
    <div className="w-screen h-screen fixed top-0 right-0 z-10">
      {children}

      <Drawer
        title={title}
        placement="left"
        onClose={onClose}
        open={open}
        closeIcon={false}
        size="large"
        footer={footer}
        styles={{
          footer: {
            minHeight: "72px",
          },
        }}
        extra={
          <FlatButton
              onClick={onClose}
              className="bg-white text-gray-500 px-4 py-2 rounded-lg"
              shape="circle"
          >
            <IoCloseOutline size={24} />
          </FlatButton>
        }
        mask={false}
        headerStyle={{
          backgroundColor: "#FAFAFA",
          border: "none",
        }}
      >
        <div className="w-full h-full bg-white">{drawerContent}</div>
      </Drawer>
    </div>
  );
}
