import { MdOutlineFastfood } from "react-icons/md";

export default function CategoriesBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-6 flex-wrap">
      {categories?.map((category) => (
        <CategoryTag
          key={category.id}
          id={category.id}
          name={category.name}
          icon={category.image}
          isActive={selectedCategory === category.id}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}

function CategoryTag({
  name,
  icon,
  isActive = false,
  setSelectedCategory,
  id,
}) {
  return (
    <div
      className="flex gap-2 items-center px-3 rounded-full min-h-input min-w-[200px] text-xl"
      style={{
        border: !isActive ? "1px solid #F2F1F1" : "none",
        color: isActive ? "#38ACB1" : "#828282",
        backgroundColor: isActive ? "#F5F6FA" : "transparent",
      }}
      onClick={() => {
        if (isActive) setSelectedCategory(null);
        else setSelectedCategory(id);
      }}
    >
        {
            icon ? <img src={icon} alt={name} className="w-12 h-12 rounded-full" /> : <MdOutlineFastfood />
        }
      <p>{name}</p>
    </div>
  );
}
