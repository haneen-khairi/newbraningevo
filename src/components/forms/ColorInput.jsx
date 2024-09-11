import { ColorPicker } from "antd";
import styled from "styled-components";
const FormColorPicker = styled(ColorPicker)`
  & {
    border: none !important;
    background-color: ${(props) => props.theme.token.colorSecondary} !important;
    border-radius: 12px;
  }
`;
export default FormColorPicker;
