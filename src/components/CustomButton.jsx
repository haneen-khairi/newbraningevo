import { Button } from "antd";
import { forwardRef } from "react";
const CustomButton = forwardRef((props, ref) => {
    const { style, variant = 'default', ...rest } = props;
    if (variant == 'success'){
        style.backgroundColor = '#E7FAF7';
        style.color = '#03A78E';
    }
    if (variant == 'error'){
        style.backgroundColor = '#FF00000A';
        style.color = '#F30000';
    }
    return (
        <Button type="primary" style={{
            borderRadius: "20px",
            ...style,
        }} {...rest}>
            {props.children}
        </Button>
    );
})