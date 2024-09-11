import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { t } from "i18next";
import useTheme from "../../hooks/useTheme";
export default function FullImageCard({ actionsMenu, image, children }) {
  const { token } = useTheme();
  return (
    <div
      className="p-4 flex flex-col justify-between rounded-xl min-h-[35vh] basis-1/4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Dropdown menu={actionsMenu}>
        <div
          id="actions-menu"
          className="py-2 px-2 w-fit rounded-lg self-end"
          style={{
            visibility: !actionsMenu ? "hidden" : "visible",
            backgroundColor: token.colorBgContainer,
          }}
        >
          <BsThreeDotsVertical size={18} />
        </div>
      </Dropdown>

      {children}
    </div>
  );
}
FullImageCard.Footer = function FullImageCardFooter({ children, ...props }) {
  const { token } = useTheme();

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-4 font-semibold"
      style={{
        backgroundColor: token.colorBgContainer,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
