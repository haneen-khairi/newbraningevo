import { Form } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { createCategory } from "@/services/restaurantCategories.js";
import useResultModal from "@/hooks/useResultModal";
import CategoriesForm from "./CForm.jsx";
import { useNavigate } from "react-router-dom";
export default function AddCategory({ onClose }) {
  const [form] = Form.useForm();
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const client = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (values) => createCategory(values),
    mutationKey: ["createCategory"],
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("categoryCreatedSuccessfully"),
      });
      client.invalidateQueries({ queryKey: ["restaurantCategories"] });
      onClose();
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingCategory"));
    },
  });

  function handleAddCategory(values) {
    const formValues =new FormData();
    
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
        createCategoryMutation.mutate(formValues);
  }

  return (
    <CategoriesForm
      onFinish={handleAddCategory}
      loading={createCategoryMutation.isPending}
      image={image}
      setImage={setImage}
      form={form}
    />
  );
}
