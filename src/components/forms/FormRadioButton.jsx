import { Radio } from "antd";
import styled from "styled-components";
const BgRadioButton = styled(Radio.Button)`
  &.ant-radio-button-wrapper {
    border-radius: 12px;
    height: 42px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border: none !important;
  }
  &:not(.ant-radio-button-wrapper-checked) {
    background-color: ${(props) => props.theme.token.colorSecondary} !important;
  }
  &.ant-radio-button-wrapper::before {
    display: none;
  }
`;
export default BgRadioButton;
