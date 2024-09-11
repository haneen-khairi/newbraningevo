import React from "react";
import styled, { keyframes } from "styled-components";

const RadioWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const StyledRadio = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid #38ACB1;
  border-radius: 50%;
  margin-right: 8px;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #38ACB1;
    transition: all 0.2s ease-in-out;
  }

  ${HiddenRadio}:checked + & {
    border-color: #38ACB1;
    animation: ${pulse} 0.4s linear;
  }

  ${HiddenRadio}:checked + &::after {
    display: block;
    transform: translate(-50%, -50%) scale(1);
  }

  ${RadioWrapper}:hover & {
    background-color: #f1f1f1;
    transform: scale(1.05);
  }
`;

const Label = styled.span`
  font-size: 16px;
  transition: all 0.3s ease;

  ${RadioWrapper}:hover & {
    color: #3498db;
  }
`;

const CustomRadio = ({ label, value, checked, onChange }) => {
  return (
    <RadioWrapper>
      <HiddenRadio value={value} checked={checked} onChange={onChange} />
      <StyledRadio />
      <Label>{label}</Label>
    </RadioWrapper>
  );
};

export default CustomRadio;
