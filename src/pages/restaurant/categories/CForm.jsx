import { Form } from "antd";
import { t } from "i18next";
import FormButton from "@/components/forms/FormButton.jsx";
import FormSelect from "@/components/forms/FormSelect.jsx";
import FormInput from "@/components/forms/FormInput.jsx";
import { ImagePicker } from "@/components/forms/ImagePicker";
import { fetchAllRestaurantRoles } from "@/services/restaurant_roles";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesForm({
  onFinish,
  image,
  setImage,
  form,
  isSubmitting,
}) {
  // const { data: restaurantRoles } = useQuery({
  //   queryKey: ["restaurantRoles"],
  //   queryFn: () => fetchAllRestaurantRoles(),
  // });
  
  return (
    <Form layout="vertical" onFinish={onFinish} form={form} id="categoryForm">
      <Form.Item
        className="grow"
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
        className="grow"
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
      <Form.Item label={t("status")} name="isActive">
        <FormSelect
          
          options={[
            {
              label: t("active"),
              value: true,
            },
            {
              label: t("inActive"),
              value: false,
            },
          ]}
        />
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




      {/*<Form.Item label={t("whoCanSee")} name="roleId">*/}
      {/*  <FormSelect*/}
      {/*    */}
      {/*    mode="multiple"*/}
      {/*    options={restaurantRoles?.data}*/}
      {/*    fieldNames={{*/}
      {/*      label: "name",*/}
      {/*      value: "name",*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Form.Item>*/}
    </Form>
  );
}
