export default function TripPath({ paths }) {
  return (
    <div className="flex flex-col gap-1">
      {paths.map((path, index) => (
        <>
          <TripPathItem path={path} isLast={index === paths.length - 1} />
          {index !== paths.length - 1 && <TripSeperator />}
        </>
      ))}
    </div>
  );
}

function TripPathItem({ path, isLast }) {
  return (
    <div className="flex gap-4 items-center">
      <TripIcon isLast={isLast} />
      <div className="flex flex-col">
        <div className="text-sm font-su text-[#767676]">{path.name}</div>
        <div className="text-sm font-su font-semibold">{path.distance}</div>
      </div>
    </div>
  );
}

function TripIcon({ isLast }) {
  return (
    <div
      className="w-6 h-6 flex items-center justify-center rounded-full"
      style={{
        border: !isLast ? "1px solid #EFEFEF" : "none",
        backgroundColor: isLast ? "#E6FAF8" : "none",
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{
          background: isLast
            ? "linear-gradient(180deg, #2CCBB3 0%, rgba(81, 167, 154, 0) 125.04%)"
            : "#CBCBCB",
        }}
      ></div>
    </div>
  );
}

function TripSeperator() {
  return (
    <div className="w-1 h-6 pr-2 border-l border-dashed border-black my-2"></div>
  );
}
