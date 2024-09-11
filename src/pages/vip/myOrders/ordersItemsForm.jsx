import { useQuery } from "@tanstack/react-query";
import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomCard from "../../../components/CardWithHeader";
import ButtonGroup from "../../../components/CustomButtonGroup";
import FormInput from "../../../components/forms/FormInput";
import { fetchAllCategories } from "../../../services/restaurantCategories";
import Empty from "./emptyCard";
import Product from "./product";

export default function OrdersItemsForm() {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const { data: categories, isPending, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchAllCategories().then((res) => res.data),
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {}, [form, order, refetch]);

  const filterOptions =
    !isPending &&
    categories
      ?.filter((el) => el?.items?.length > 0)
      .map((el) => {
        return {
          label: i18n.language === "ar" ? el.nameAr : el.nameEn,
          value: el.id,
          items: el.items,
        };
      });

  const [activeTab, setActiveTab] = useState(filterOptions[0]?.value || "1");

  const handleIncrement = (index, field) => {
    const newOrder = [...order];
    newOrder[index][field] = (newOrder[index][field] || 1) + 1;
    setOrder(newOrder);
    localStorage.setItem("orders", JSON.stringify(newOrder));
    form.setFieldsValue({ [`${field}_${index}`]: newOrder[index][field] });
  };

  const handleDecrement = (index, field) => {
    const newOrder = [...order];
    if (newOrder[index][field] > 1) {
      newOrder[index][field] = newOrder[index][field] - 1;
      setOrder(newOrder);
      localStorage.setItem("orders", JSON.stringify(newOrder));
      form.setFieldsValue({ [`${field}_${index}`]: newOrder[index][field] });
    }
  };
  const handleRemoveSection = (index) => {
    // Assuming you have a state that holds the form sections
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };
  return !isPending ? (
    <Form
      form={form}
      layout="vertical"
      id="order-form"
      initialValues={order.reduce((acc, item, index) => {
        acc[`count_${index}`] = item.count || 1;
        acc[`sugarSpoons_${index}`] = item.sugarSpoons || 1;
        acc[`instructions_${index}`] = item.instructions || "";
        return acc;
      }, {})}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Form.Item className="m-0" name="identityId">
            <FormInput
              className="bg-gray-50 focus:bg-gray-50 hover:bg-gray-50"
              placeholder={`${t("search")} ..`}
            />
          </Form.Item>

          <CustomCard>
            <ButtonGroup
              defaultValue={filterOptions[0]?.value}
              onChange={(e) => {
                setActiveTab(e.target.value);
              }}
              value={activeTab}
              options={filterOptions}
            />
            <div className="grid lg:grid-cols-4 gap-6 grid-cols-3 my-2">
              {filterOptions?.map((el) => {
                return el.items?.map((el, idx) => {
                  return (
                    <Product
                      setOrder={setOrder}
                      key={idx}
                      data={{
                        isFavorite: el.isFavorite,
                        id: el.id,
                        image: el.image,
                        calories: el.calories,
                        name: i18n.language === "ar" ? el.nameAr : el.nameEn,
                      }}
                    />
                  );
                });
              })}
            </div>
          </CustomCard>
        </div>
        <div >
          <div className="col-span-1 border-[.3px] border-solid border-gray-300 p-2 rounded-xl order-box-style">
            <p className="bg-gray-100 rounded-xl py-3 px-2 font-bold">
              {t("addedRequests")}
            </p>
            {order?.length !== 0 ? (
              order.map((el, index) => (
                <div className="mb-5 order-box1" key={index}>
                  <Form.Item className="my-2 font-bold" name={`count_${index}`}>
                    <div className="flex justify-between mx-2 my-2">
                      <div>{el.name}</div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(index)}
                        className=" text-red-500  border-none px-3 flex items-center justify-center rounded-full cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center justify-between border-[.3px] border-solid border-gray-300 rounded-xl py-3 px-2">
                      <p className="font-normal">{t("requiredNumber")}</p>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleIncrement(index, "count")}
                          type="button"
                          className="text-xl border-none px-3 flex items-center justify-center rounded-full cursor-pointer"
                        >
                          +
                        </button>
                        <span className="mx-3">{el.count || 1}</span>
                        <FormInput
                          value={el.count}
                          size="small"
                          className="hidden"
                        />
                        <button
                          onClick={() => handleDecrement(index, "count")}
                          type="button"
                          className="text-2xl border-none px-3 flex items-center justify-center rounded-full cursor-pointer"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </Form.Item>

                  <Form.Item
                    className="my-2 font-bold"
                    label={t("sugar")}
                    name={`sugarSpoons_${index}`}
                  >
                    <div className="flex items-center justify-between border-[.3px] border-solid border-gray-300 rounded-xl py-3 px-2">
                      <p className="font-normal">{t("count")}</p>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleIncrement(index, "sugarSpoons")}
                          type="button"
                          className="text-xl border-none px-3 flex items-center justify-center rounded-full cursor-pointer"
                        >
                          +
                        </button>
                        <span className="mx-3">{el.sugarSpoons || 1}</span>
                        <FormInput
                          value={el.sugarSpoons}
                          size="small"
                          className="hidden"
                        />
                        <button
                          onClick={() => handleDecrement(index, "sugarSpoons")}
                          type="button"
                          className="text-2xl border-none px-3 flex items-center justify-center rounded-full cursor-pointer"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </Form.Item>

                  <Form.Item
                    className="mt-2 mb-5 font-bold"
                    label={t("notes")}
                    name={`instructions_${index}`}
                  >
                    <FormInput placeholder={t("instructions")} />
                  </Form.Item>

                  {/* <div className="w-full border-b-[.5px] border-solid border-gray-400"></div> */}
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
            <Button
              type="primary"
              htmlType="submit"
              onClick={showModal} 
              style={{
                width: "300px",
                position:'fixed',
                margin:'10px 5px'

              }}
            >
              اضافة الى السلة
            </Button>
        </div>
      </div>
    </Form>
  ) : (
    <></>
  );
}
