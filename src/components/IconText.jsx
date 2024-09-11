import FlatButton from "@/components/FlatButton";
function IconText({ icon, text }) {
  return (
    <div className="flex gap-2 items-center">
      <FlatButton
        shape="circle"
        className="text-[#AFAFAF] flex items-center justify-center"
      >
        {icon}
      </FlatButton>
      <span className="font-semibold">{text}</span>
    </div>
  );
}

export default IconText;
