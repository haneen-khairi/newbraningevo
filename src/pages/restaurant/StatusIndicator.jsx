import colorjs from "color";
export const StatusIdColor = {
  0: "#E38200",
  1: "#219653",
  2: "#0070DF",
  3: "#BB6BD9",
  4: "#757575",
  5: "#219653",
};

export default function StatusIndicator({ status, id }) {
  return (
    <div
      className="w-fit p-2 rounded-full"
      style={{
        backgroundColor: colorjs(StatusIdColor[id]).alpha(0.1),
        color: colorjs(StatusIdColor[id]).alpha(0.8),
      }}
    >
      {status}
    </div>
  );
}
