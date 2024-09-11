import styled from "styled-components";
import { TimePicker } from "antd";
const BgTimePicker = styled(TimePicker)`
  & {
    border: 1px solid #efefef !important;
      min-height: 56px !important;
    border-radius: 10px !important;
  }
  width: 100%;
  background-color: none;
`;
export default BgTimePicker;
