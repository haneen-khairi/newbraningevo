export default function LocationDot({ isActive }) {
  return (
    <div
      className="flex items-center justify-center w-5 h-5 rounded-full"
      style={{
        border: !isActive ? "1px solid #CBCBCB" : "none",
        background: isActive ? "#E6FAF8" : "none",
      }}
    >
      <div
        className="flex items-center justify-center w-3 h-3 rounded-full"
        style={{
          background: isActive
            ? "linear-gradient(180deg, #2CCBB3 0%, rgba(81, 167, 154, 0) 125.04%)"
            : "#CBCBCB",
        }}
      ></div>
    </div>
  );
}
