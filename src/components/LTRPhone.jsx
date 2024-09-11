import styled from "styled-components";
import PhoneInput from "antd-phone-input";
const LTRPhone = styled(PhoneInput)`
  & > .ant-input-wrapper {
    direction: ltr !important;
  }
`;
export default LTRPhone;
