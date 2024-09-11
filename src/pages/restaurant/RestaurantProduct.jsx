import CustomCard from "@/components/CardWithHeader";
import { Form } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {createItem, fetchOneItem} from "../../services/restaurantItems";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./products/PAdd.jsx";
import EditProduct from "./products/PEdit.jsx";
export default function RestaurantProduct() {
  const { id } = useParams();


  return (
    <CustomCard className="w-10/12 mx-auto">
      {id ?<EditProduct id={id}></EditProduct>:  <AddProduct/>}
    </CustomCard>
  );
}
