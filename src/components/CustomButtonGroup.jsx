import { Radio } from "antd";
import styled from "styled-components";

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

export const StyledRadioButton = styled(Radio.Button)`
  border: 1px solid #eaeaea;
  border-radius: 10px;
  font-weight: 700;
  padding: 0px 40px;
  height: 40px;
  font-size: 16px;
  background-color: #fafafa;
  display: flex;
  justify-content:center;
  align-items:center;
  &::before {
    display: none !important;
  }
  &.ant-radio-button-wrapper-checked {
    border-inline-start: none;
    color: #38ACB1;
    background-color: #f3f5f9;
    border: 1px solid #b6bed0 !important;
  }
`;

export default function ButtonGroup({ options, radioButtonProps, ...rest }) {
  return (
    <StyledRadioGroup {...rest}>
      {options.map((option, index) => (
        <StyledRadioButton
          size="large"
          type="primary"
          {...radioButtonProps}
          key={index}
          value={option.value}
        >
          {option.label}
        </StyledRadioButton>
      ))}
    </StyledRadioGroup>
  );
}
