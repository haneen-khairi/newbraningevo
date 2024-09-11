import styled from "styled-components";
import { DatePicker } from "antd";

const BgDatePicker = styled(DatePicker)`
  & {
    border: 1px solid #efefef !important;
    background-color: none !important;
      min-height: 56px !important;
    border-radius: 10px !important;
  }

  width: 100%;
`;
export default BgDatePicker;
