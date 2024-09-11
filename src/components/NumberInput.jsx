import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

const StyledIncDecButton = styled(Button)`
  border-radius: 15px !important;
  border: none;

  scale: 1.2;
  font-weight: bold;
  width: 30px;
`;

const NumberInput = ({ positive, max, onChange, min = 0 }) => {
  const [count, setCount] = useState(min);

  const increment = () => {
    if (max && count >= max) return;
    setCount(count + 1);
    onChange(count + 1);
  };

  const decrement = () => {
    if (positive && count <= min) return;
    setCount(count - 1);
    onChange(count - 1);
  };

  return (
    <div>
      <StyledIncDecButton
        size="small"
        onClick={decrement}
        disabled={positive && count <= min}
        type="primary"
      >
        -
      </StyledIncDecButton>
      <span className="px-3 text-gray-500">{count}</span>
      <StyledIncDecButton
        size="small"
        onClick={increment}
        disabled={max && count >= max}
        type="primary"
      >
        +
      </StyledIncDecButton>
    </div>
  );
};

export default NumberInput;
