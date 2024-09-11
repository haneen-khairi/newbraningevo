import { forwardRef } from "react";
import { Input } from "antd";
import styled from "styled-components";

// const InputField = forwardRef((props, ref) => {
//   const { style, ...rest } = props;
//   return (
//     <Input
//       style={{ borderRadius: "20px", backgroundColor: "#fafafa", ...style }}
//       {...rest}
//     ></Input>
//   );
// });
const InputField = styled(Input)`
  border-radius: 16px;
  background-color: #FAFAFA;
    border-color: #F4F4F4
`;

export default InputField;
