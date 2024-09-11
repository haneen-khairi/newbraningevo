import styled from "styled-components";
import { Button } from "antd";
const BgButton = styled(Button)`
  &.ant-btn-default {
    background-color: ${(props) => props.theme.token.colorSecondary} !important;
    border: 1px solid #e1e1e1 !important;
    border-radius: 12px;
  }
  min-height: 56px !important;
`;
export default BgButton;
