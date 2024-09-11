import { Tag } from "antd";
import styled from "styled-components";
export const DayTag = styled(Tag.CheckableTag)`
  width: 150px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  border-right: 2px solid ${(props) => (props.$active ? "green" : "red")};
  height: 40px;
  line-height: 40px;
  &:not(.ant-tag-checkable-checked) {
    background-color: ${(props) => props.theme.token.colorSecondary};
  }
`;
