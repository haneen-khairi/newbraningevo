import { Card } from "antd";
import useTheme from "../hooks/useTheme";
export default function CustomCard({
  titleSlot,
  children,
  className = "",
    contentProps,
  ...props
}) {
  const { token } = useTheme();
  return (
    <div
      className={"rounded-2xl p-2 " + className}
      style={{
        backgroundColor: token.cardColor,
        color: token.primaryTextColor,
        boxShadow: token.cardShadow,
      }}
      {...props}
    >
      {titleSlot && (
        <div
          id="title"
          className="flex items-center px-3 py-3 mb-1 rounded-xl text-lg font-semibold"
          style={{
            backgroundColor: token.cardHeaderColor,
          }}
        >
          {titleSlot}
        </div>
      )}
      <div id="content" className="px-1 py-1" {...contentProps}>
        {children}
      </div>
    </div>
  );
}
