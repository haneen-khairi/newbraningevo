import { Form, InputNumber } from "antd";
import { t } from "i18next";
import FormInput from "@/components/forms/FormInput.jsx";
import FormSelect from "@/components/forms/FormSelect.jsx";
import FormButton from "@/components/forms/FormButton.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/services/restaurantCategories.js";
import { ImagePicker } from "@/components/forms/ImagePicker";
export default function ProductsForm({
  onFinish,
  form,
  loading,
  image,
  setImage,
}) {
  
  const { data: categories, isPending: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetchAllCategories({
        isActive: true,
      }),
  });

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} id="productForm">
      <Form.Item
        name="isActive"
        label={t("isActive")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormSelect
          options={[
            {
              label: t("active"),
              value: true,
            },
            {
              label: t("inactive"),
              value: false,
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="nameAr"
        label={t("nameInAr")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormInput  />
      </Form.Item>
      <Form.Item
        name="nameEn"
        label={t("nameInEn")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormInput  />
      </Form.Item>
      <Form.Item
        label={t("category")}
        name="categoryId"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormSelect
          options={categories?.data?.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          loading={categoriesLoading}
        />
      </Form.Item>
      <Form.Item label={t("allowedSizes")} name="allowedSizes">
        <FormSelect
          mode="multiple"
          allowClear
          options={[
            { label: t("small"), value: "allowSizeSmall" },
            { label: t("medium"), value: "allowSizeMedium" },
            { label: t("large"), value: "allowSizeLarge" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label={t("allowSugar")}
        name={"allowSugar"}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <FormSelect
          options={[
            { label: t("yes"), value: true },
            { label: t("no"), value: false },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="preperationTime"
        label={t("preperationTime(minutes)")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <InputNumber
          type="number"
          min={0}
          max={100}
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        name="calories"
        label={t("calories")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <InputNumber  type="number" min={0} className="w-full" />
      </Form.Item>

      <input
        type="file"
        id="productImage"
        accept="image/*"
        hidden
        style={{
          display: "none",
        }}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <Form.Item label={t("image")}>
        <ImagePicker
          onClick={() => {
            document.getElementById("productImage").click();
          }}
          image={image}
        />
      </Form.Item>
    </Form>
  );
}
