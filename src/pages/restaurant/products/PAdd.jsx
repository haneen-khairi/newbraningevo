import {useMutation, useQueryClient} from "@tanstack/react-query";
import { createItem } from "../../../services/restaurantItems.js";
import { t } from "i18next";
import useResultModal from "@/hooks/useResultModal";
import { useEffect, useState } from "react";
import ProductsForm from "./PForm.jsx";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function AddProduct({ setIsSubmitting, onClose }) {
  const globalModal = useResultModal();
  const navigate = useNavigate();
  const client = useQueryClient()
  const [image, setImage] = useState();
  const [form] = Form.useForm();

  const createProductMutation = useMutation({
    mutationFn: (values) => createItem(values),
    mutationKey: ["createProduct"],
    onSuccess: () => {
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: t("productCreatedSuccessfully"),
      });
      onClose();
      client.invalidateQueries({ queryKey: ["restaurantProducts"] });
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingProduct"));
    },
  });

  useEffect(() => {
    if (createProductMutation.isPending) {
      setIsSubmitting(true);
    }
  }, [createProductMutation.isPending]);
  function handleAddProduct(values) {
    if(values.allowedSizes){
      for (let allowedSize of values?.allowedSizes) {
        values[allowedSize] = true;
      }
      delete values.allowedSizes;
    }
    if(values.preperationTime){
      let estimatedTime = dayjs('2018-04-13 00:00').add(values?.preperationTime ?? 0, "minute").format("HH:mm:ss"); ;
      values.estimatedTime = estimatedTime;
    }
    createProductMutation.mutate({
      ...values,
      image,
    });
  }
  
  return (
    <ProductsForm
      form={form}
      image={image}
      setImage={setImage}
      onFinish={handleAddProduct}
      loading={createProductMutation.isPending}
    />
  );
}
