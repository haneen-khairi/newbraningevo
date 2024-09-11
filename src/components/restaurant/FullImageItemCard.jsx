import FullImageCard from "./FullImageCard";
import SubtitleText from "@/components/Subtitle";
import StatusComponent from "@/components/statusComponent";

export default function FullImageItemCard({
  name,
  count,
  type,
  status,
  image,
  menu,
}) {
  return (
    <FullImageCard image={image} actionsMenu={menu}>
      <FullImageCard.Footer>
        <div>{name}</div>
        <div className="flex justify-between w-full ">
          <div className="flex items-center gap-2">
            <p className="px-3 py-1 bg-green-100 rounded-2xl text-green-500">
              {count}
            </p>
            <SubtitleText>{type}</SubtitleText>
          </div>
          <StatusComponent text={status} />
        </div>
      </FullImageCard.Footer>
    </FullImageCard>
  );
}
