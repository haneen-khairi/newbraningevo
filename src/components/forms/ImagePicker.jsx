import { LuImagePlus } from "react-icons/lu";
import useTheme from "@/hooks/useTheme";
export function ImagePicker({ image, onClick }) {
  const { token } = useTheme();
  return (
    <div
      className="h-48 cursor-pointer rounded-lg grid place-items-center overflow-hidden"
      onClick={onClick}
      style={{
        boxShadow: token.cardShadow,
      }}
    >
      {image ? (
        <img
          src={image instanceof File ? URL.createObjectURL(image) : image}
          alt="category"
          className="w-full h-48 object-cover rounded-lg"
        />
      ) : (
        <LuImagePlus size={32} />
      )}
    </div>
  );
}
