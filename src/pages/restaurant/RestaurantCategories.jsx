import CustomCard from "@/components/CardWithHeader";
import { useParams } from "react-router-dom";
import AddCategory from "./categories/CAdd.jsx";
import EditCategory from "./categories/CEdit.jsx";
export default function RestaurantCategories() {
  const { id } = useParams();

  return (
    <CustomCard className="w-10/12 mx-auto">
        {id ? <EditCategory id={id} /> : <AddCategory />}
    </CustomCard>
  );
}

