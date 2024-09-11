import CardWithHeader from "@/components/CardWithHeader";

export default function CountCard({ text, Render, items, renderProps }) {
  return (
    <CardWithHeader
      titleSlot={
        <div className="flex gap-2 items-center font-su">
          <StatisticsIcon />
          {text}
        </div>
      }
    >
      <div className="flex flex-col gap-3 mt-2">
        {items.map((item, index) => (
          <>
            <Render key={index} item={item} {...renderProps} />
            {index < items.length - 1 && (
              <div className="border-t border-slate-100 border-solid" />
            )}
          </>
        ))}
      </div>
    </CardWithHeader>
  );
}

function StatisticsIcon() {
  return (
    <div className="rounded-full px-2 py-1 bg-white">
      <svg
        width="19"
        height="12"
        viewBox="0 0 19 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_544)">
          <path
            d="M3.197 4.86187C3.29858 5.0141 3.41041 5.15942 3.53175 5.29685C4.97589 6.7288 6.42432 8.15758 7.87705 9.58318C8.73324 10.427 9.54597 10.3404 10.2219 9.33791C10.7256 8.59098 11.2406 7.85198 11.7283 7.09552C11.894 6.83914 11.9898 6.86136 12.1902 7.06139C13.534 8.40391 14.8861 9.73929 16.2466 11.0675C16.8042 11.612 17.5558 11.6398 18.0788 11.1596C18.6421 10.6381 18.6421 9.85624 18.0523 9.26727C17.102 8.31951 16.1428 7.38049 15.1868 6.43749C14.3821 5.64373 13.5774 4.84996 12.7728 4.0562C12.0043 3.30212 11.1594 3.38308 10.555 4.26813C10.0215 5.05555 9.48964 5.84931 8.95211 6.63673C8.88211 6.73833 8.83382 6.94312 8.63667 6.74865C7.41838 5.54609 6.19687 4.34592 4.93512 3.10209C5.17089 3.06082 5.34873 3.04018 5.52174 2.9989C6.12686 2.85443 6.56783 2.25832 6.49943 1.67728C6.4254 1.02242 5.93615 0.541403 5.28516 0.528703C4.12159 0.50489 2.95747 0.495894 1.79283 0.501715C1.02274 0.505684 0.505331 1.05259 0.505331 1.81698C0.505331 2.87534 0.505331 3.93157 0.505331 4.98569C0.505331 5.83899 1.00665 6.40495 1.76467 6.41447C2.52268 6.424 3.04653 5.88503 3.0763 5.03491C3.07875 5.00824 3.08278 4.98173 3.08837 4.95553L3.197 4.86187Z"
            fill="#2F307F"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_544">
            <rect
              width="18"
              height="11"
              fill="white"
              transform="matrix(-1 0 0 1 18.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
