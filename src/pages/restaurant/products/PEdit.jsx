import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { fetchOneItem, updateItem } from "../../../services/restaurantItems.js";
import { Form } from "antd";
import { useEffect, useState } from "react";
import ProductsForm from "./PForm.jsx";
import useResultModal from "@/hooks/useResultModal";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function EditProduct({ id, setIsSubmitting, onClose }) {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const globalModal = useResultModal();
  const client = useQueryClient()
  const navigate = useNavigate();
  const { data: product, isPending: productLoading } = useQuery({
    queryKey: ["fetchProduct", id],
    queryFn: () => fetchOneItem(id),
    enabled: !!id,
  });

  const editProductMutation = useMutation({
    mutationFn: (values) => updateItem(values),
    mutationKey: ["editProduct"],
    onSuccess: () => {
      globalModal.success({
        title: t("success"),
        subtitle: t("productUpdatedSuccessfully"),
      });
      onClose();
      client.invalidateQueries({
        queryKey: ["restaurantProducts"],
      })
    },
    onError: (e) => {
      globalModal.error(
        t("error"),
        t("somethingWentWrong"),
        e.response.data.errors.map((e) => <div>{e}</div>)
      );
    },
  });
  
  useEffect(() => {
    if (editProductMutation.isPending) {
      setIsSubmitting(true);
    }
  }, [editProductMutation.isPending]);
  function handleEditProduct(values) {
    values = {
      allowSizeLarge: false,
      allowSizeMedium: false,
      allowSizeSmall: false,
      ...values,
    };
    for (let allowedSize of values.allowedSizes) {
      values[allowedSize] = true;
    }
    if(values.preperationTime){
      let estimatedTime = dayjs('2018-04-13 00:00').add(values?.preperationTime ?? 0, "minute").format("HH:mm:ss"); ;
      values.estimatedTime = estimatedTime;
    }
    delete values.allowedSizes;
    values.image = image;
    editProductMutation.mutate({ id, ...values });
  }

  useEffect(() => {
    if (!productLoading) {
      let allowedSizes = [];
      if (product?.data?.allowSizeSmall) allowedSizes.push("allowSizeSmall");
      if (product?.data?.allowSizeMedium) allowedSizes.push("allowSizeMedium");
      if (product?.data?.allowSizeLarge) allowedSizes.push("allowSizeLarge");
      const estimatedTimeSplit = product?.data?.estimatedTime?.split(":");
      const valuesObj = {...product?.data, allowedSizes };
      if(estimatedTimeSplit && estimatedTimeSplit.length > 0){
        const calculatedMinutes = parseInt(estimatedTimeSplit?.[1]) + (parseInt(estimatedTimeSplit?.[0]) * 60);
        valuesObj.preperationTime = Number(calculatedMinutes);
      }
      form.setFieldsValue(valuesObj);
      setImage(product?.data.image);
    }
  }, [productLoading]);

  return (
    <ProductsForm
      form={form}
      image={image}
      setImage={setImage}
      loading={editProductMutation.isPending}
      onFinish={handleEditProduct}
    />
  );
}
