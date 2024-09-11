import { Form } from "antd";
import { useEffect, useState } from "react";
import CategoriesForm from "./CForm.jsx";
import useResultModal from "@/hooks/useResultModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  fetchOneCategory,
  updateCategory,
} from "../../../services/restaurantCategories.js";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
export default function EditCategory({ id, onClose }) {

  const [form] = Form.useForm();
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const client = useQueryClient();

  const { data: category, isPending: categoryLoading } = useQuery({
    queryKey: ["fetchCategory", id],
    queryFn: () => fetchOneCategory(id),
    staleTime: 0,
  });

  const editCategoryMutation = useMutation({
    mutationFn: (values) => updateCategory(values),
    mutationKey: ["updateCategory"],
    onSuccess: () => {
      globalModal.success({
        title: t("updatedSuccessfully"),
        subtitle: t("categoryUpdatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["restaurantCategories"] });
      onClose();
    },
    onError: (e) => {
      globalModal.error(t("error"), t("somethingWentWrong"));
    },
  });

  useEffect(() => {
    if (!categoryLoading) {
      form.setFieldsValue(category?.data);
      setImage(category?.data.image);
    }
  }, [categoryLoading]);
  
  function handleEditCategory(values) {
    const formValues =new FormData();
    
    values.id = id;
    values.image = image;
    for (const key in values) {
        if (key === "image") {
          if (values[key]) {
            formValues.append(key, values[key]);
          }
        } else {
          formValues.append(key, values[key]);
        }
    }

    editCategoryMutation.mutate(formValues);
  }

  return (
    <CategoriesForm
      form={form}
      loading={true}
      onFinish={handleEditCategory}
      setImage={setImage}
      image={image}
    />
  );
}
