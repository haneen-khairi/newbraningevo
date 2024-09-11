import styled from "styled-components";
import { Select } from "antd";

const BgSelect = styled(Select)`
  & div.ant-select-selector {
    border: 1px solid #efefef !important;
    background-color: none !important;
    min-height: 56px !important;
    border-radius: 10px !important;
  }
`;
export default BgSelect;
