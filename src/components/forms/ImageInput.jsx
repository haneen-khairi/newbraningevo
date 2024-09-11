import { Form, Input } from "antd";
import { useEffect, useRef } from "react";
import PictureIcon from "@/assets/icons/picture.png";
import { useTranslation } from "react-i18next";
export default function ImageInput({ formItemProps, containerProps }) {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  return (
    <>
      <Form.Item {...formItemProps} hidden valuePropName="files">
        <Input type="file" ref={inputRef}></Input>
      </Form.Item>
      <div
        className="w-full flex-col flex items-center justify-center py-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23E8E8E8FF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`,
          borderRadius: "6px",
        }}
        role="button"
        onClick={() => inputRef.current.input.click()}
        {...containerProps}
      >
        <img src={PictureIcon} alt="picture" />
        <p>{t("uploadImage")}</p>
        <p className="text-slate-400">
          {t("allowedExtensions")}: png, jpg, jpeg
        </p>
      </div>
    </>
  );
}
