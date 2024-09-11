import { useTranslation } from "react-i18next";
export default function CountEntry({ item, countElProps }) {
  const { t } = useTranslation();
  //default options of countProps if not provided
  const countProps = {
    order: 1,
    text: null,
    bgColor: "#F5F5F5",
    ...countElProps,
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 rounded-lg"
        />
        <p>{item.name}</p>
      </div>
      <div
        className="flex gap-2 min-w-[30px] rounded-full py-2 px-3 text-sm"
        style={{
          backgroundColor: countProps.bgColor,
        }}
      >
        {countProps.order == 1 ? (
          <>
            <p>{item.count}</p>
            <p>{countProps.text ?? t("total")}</p>
          </>
        ) : (
          <>
            <p>{countProps.text ?? t("total")}</p>
            <p>{item.count}</p>
          </>
        )}
      </div>
    </div>
  );
}
