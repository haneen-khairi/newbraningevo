import { Input, ConfigProvider } from "antd";
import { forwardRef } from "react";
import styled from "styled-components";

function NativePhoneInput(props, ref) {
  return (
    <ConfigProvider direction={"ltr"}>
      <Input
        addonBefore={"+966"}
        ref={ref}
        type={"number"}
        dir={"ltr"}
        {...props}
      ></Input>
    </ConfigProvider>
  );
}

export default forwardRef(NativePhoneInput);
