import { Typography } from "antd";
export default function CustomTypograhy({
  variant,
  isBold = false,
  weight,
  fontSize = 14,
  style,
  ...rest
}) {
  let customStyle = {
    fontSize: fontSize,
    color: variant == "primary" ? "#051A16" : "#828282",
    fontWeight: isBold ? "700" : "400",
  };

  return (
    <Typography
      style={{
        ...customStyle,
        ...style,
      }}
      {...rest}
    />
  );
}
