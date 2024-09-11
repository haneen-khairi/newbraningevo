import { Button } from "antd";
import { forwardRef } from "react";
const CustomButton = forwardRef((props, ref) => {
    const { style, variant = 'default', ...rest } = props;
    let localStyle = style ?? {};
    if (variant == 'success'){
        localStyle.backgroundColor = '#E7FAF7';
        localStyle.color = '#03A78E';
    }
    if (variant == 'error'){
        localStyle.backgroundColor = '#FF00000A';
        localStyle.color = '#F30000';
    }
    return (
        <Button  style={{
            borderRadius: "12px",
            boxShadow: "none",
            border: "none",
            minHeight: "56px",
            ...localStyle,
        }} {...rest}>
            {props.children}
        </Button>
    );
})
export default CustomButton;