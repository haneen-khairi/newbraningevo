import { Button } from "antd";
import { forwardRef } from "react";

import "./headerbutton.css";

const HeaderButton = forwardRef((props) => {
  const { icon, ...rest } = props;
  return (
    <Button id={'headerButton'} {...rest} shape="circle" >
      {icon}
    </Button>
  );
});
export default HeaderButton;
