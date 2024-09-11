

import React from "react";
import Wizard from "../wizard";
 
export default function VisitInformation() {
  return (
    <>
      <Wizard />
    </>
  );
}



// import { Button, Form } from "antd";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Item from "./items";
// import Empty from "../../pages/vip/myOrders/emptyCard";

// export default function BasketForm({ openAddOffice, building ,openEditOrder }) {
//   const [form] = Form.useForm();
//   const { t, i18n } = useTranslation();
//   const [order, setOrder] = useState(
//     JSON.parse(localStorage.getItem("orders")) || []
//   );

//   useEffect(() => {
//     form.setFieldsValue(order || []);
//   }, [form, order]);
//   return (
//     <Form form={form} layout="vertical" id="cart-form">
//       <div className="shadow-md rounded-xl p-2">
//         <p className="bg-gray-50 rounded-xl py-4 px-2 mb-2">
//           {t("ordersList")}
//         </p>

//         <div className="border-[.3px] border-solid border-gray-300 rounded-xl p-2">
//           {order.length !== 0 ? (
//             order?.map((el,idx) => <Item key={idx} openEditOrder={openEditOrder} data={{ ...el }} />)
//           ) : (
//             <Empty />
//           )}
//         </div>
//       </div>
//       <div className="my-10">
//         <p className="my-2">{t("deliverOrderTo")}</p>

//         <div className="border-[.3px] border-solid flex items-center justify-between border-gray-300 rounded-xl p-2 my-1">
//           <div className="flex items-center">
//             <svg
//               width="53"
//               height="53"
//               viewBox="0 0 53 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 width="53"
//                 height="53"
//                 rx="8"
//                 transform="matrix(-1 0 0 1 53 0)"
//                 fill="#F9F9F9"
//               />
//               <g clip-path="url(#clip0_1091_10976)">
//                 <path
//                   d="M38 26C38 23.794 36.206 22 34 22V20C34 17.243 31.757 15 29 15H25C22.243 15 20 17.243 20 20V22C17.794 22 16 23.794 16 26V31C16 31.017 16 31.035 16.001 31.052C16.029 32.682 17.363 34 19 34H26V37H22C21.448 37 21 37.447 21 38C21 38.553 21.448 39 22 39H32C32.552 39 33 38.553 33 38C33 37.447 32.552 37 32 37H28V34H35C36.637 34 37.971 32.682 37.999 31.052C37.999 31.035 38 31.018 38 31V26ZM36 26V28.172C35.687 28.061 35.351 28 35 28H34V24C35.103 24 36 24.897 36 26ZM22 20C22 18.346 23.346 17 25 17H29C30.654 17 32 18.346 32 20V28H22V20ZM20 24V28H19C18.649 28 18.313 28.061 18 28.172V26C18 24.897 18.897 24 20 24ZM35 32H19C18.449 32 18 31.552 18 31C18 30.448 18.449 30 19 30H35C35.551 30 36 30.448 36 31C36 31.552 35.551 32 35 32Z"
//                   fill="#A9A9A9"
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_1091_10976">
//                   <rect
//                     width="24"
//                     height="24"
//                     fill="white"
//                     transform="translate(15 15)"
//                   />
//                 </clipPath>
//               </defs>
//             </svg>
//             <div className="data mx-2">
//               <p>{t("myOffice")}</p>
//               <span className="text-gray-500">
//                 {building?.floorId ? (
//                   <>
//                     {i18n.language == "ar"
//                       ? building?.buildingId?.split(",")[1]
//                       : building?.buildingId?.split(",")[2]}
//                     ,
//                     {i18n.language == "ar"
//                       ? building?.floorId?.split(",")[1]
//                       : building?.floorId?.split(",")[2]}
//                     ,
//                     {i18n.language == "ar"
//                       ? building?.sideId?.split(",")[1]
//                       : building?.sideId?.split(",")[2]}
//                     ,
//                     {i18n.language == "ar"
//                       ? building?.roomId?.split(",")[1]
//                       : building?.roomId?.split(",")[2]}
//                   </>
//                 ) : (
//                   t("noData")
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="btn">
//             <Button
//               onClick={openAddOffice}
//               className="border-none  bg-[#f5f6fa]  text-[#38ACB1]"
//             >
//               {building?.floorId ? t("edit") : t("add")}
//             </Button>
//           </div>
//         </div>

//         <div className="border-[.3px] border-solid flex items-center justify-between border-gray-300 rounded-xl p-2 my-1">
//           <div className="flex items-center">
//             <svg
//               width="53"
//               height="53"
//               viewBox="0 0 53 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 width="53"
//                 height="53"
//                 rx="8"
//                 transform="matrix(-1 0 0 1 53 0)"
//                 fill="#F9F9F9"
//               />
//               <g clip-path="url(#clip0_1091_10986)">
//                 <path
//                   d="M29.428 23H29.5C31.154 23 32.5 21.654 32.5 20V17C32.5 15.346 31.154 14 29.5 14H23.5C21.846 14 20.5 15.346 20.5 17V20C20.5 21.654 21.846 23 23.5 23H23.702L25.536 24.617C25.826 24.873 26.189 25.001 26.552 25.001C26.91 25.001 27.268 24.875 27.55 24.625L29.428 23.001V23ZM26.551 22.844L24.741 21.25C24.558 21.089 24.323 21 24.08 21H23.5C22.948 21 22.5 20.551 22.5 20V17C22.5 16.449 22.948 16 23.5 16H29.5C30.052 16 30.5 16.449 30.5 17V20C30.5 20.551 30.052 21 29.5 21H29.056C28.816 21 28.583 21.086 28.402 21.244L26.551 22.845V22.844ZM20 32C21.93 32 23.5 30.43 23.5 28.5C23.5 26.57 21.93 25 20 25C18.07 25 16.5 26.57 16.5 28.5C16.5 30.43 18.07 32 20 32ZM20 27C20.827 27 21.5 27.673 21.5 28.5C21.5 29.327 20.827 30 20 30C19.173 30 18.5 29.327 18.5 28.5C18.5 27.673 19.173 27 20 27ZM29.5 28.5C29.5 30.43 31.07 32 33 32C34.93 32 36.5 30.43 36.5 28.5C36.5 26.57 34.93 25 33 25C31.07 25 29.5 26.57 29.5 28.5ZM33 27C33.827 27 34.5 27.673 34.5 28.5C34.5 29.327 33.827 30 33 30C32.173 30 31.5 29.327 31.5 28.5C31.5 27.673 32.173 27 33 27ZM25.437 36.649C25.63 37.166 25.369 37.743 24.852 37.937C24.736 37.98 24.618 38.001 24.5 38.001C24.096 38.001 23.714 37.753 23.563 37.352C23.036 35.946 21.604 35.001 20 35.001C18.396 35.001 16.964 35.946 16.437 37.352C16.243 37.87 15.666 38.128 15.149 37.937C14.632 37.743 14.371 37.166 14.564 36.649C15.382 34.466 17.567 33 20.001 33C22.435 33 24.618 34.466 25.437 36.649ZM37.852 37.937C37.736 37.98 37.618 38.001 37.5 38.001C37.096 38.001 36.714 37.753 36.563 37.352C36.036 35.946 34.604 35.001 33 35.001C31.396 35.001 29.964 35.946 29.437 37.352C29.243 37.87 28.666 38.128 28.149 37.937C27.632 37.743 27.371 37.166 27.564 36.649C28.382 34.466 30.567 33 33.001 33C35.435 33 37.619 34.466 38.438 36.649C38.631 37.166 38.37 37.743 37.853 37.937H37.852Z"
//                   fill="#A9A9A9"
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_1091_10986">
//                   <rect
//                     width="24"
//                     height="24"
//                     fill="white"
//                     transform="translate(14.5 14)"
//                   />
//                 </clipPath>
//               </defs>
//             </svg>

//             <div className="data mx-2">
//               <p>{t("myRoom")}</p>
//               <span className="text-gray-500">{building?.floorId? t("displayedRoom"):t("noData")}</span>
//             </div>
//           </div>
//           <div className="btn">
//             <Button disabled={true} className="border-none  bg-[#f5f6fa]  text-[#38ACB1]">
//             {building?.floorId ? t("edit") : t("add")}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Form>
//   );
// }

///---------------------------------------------------------------Inviataion-form---------------------------------------------------------
// import React from "react";
// import UserData from "../UserData";
// import InvitationData from "../InvitationData";
// import { Button } from "antd";
// export default function Invitation() {
//   return (
//     <>
//       <div className="invitation  border-[0.5px] border-solid border-gray-100 rounded-xl p-3">
//         <div className="invitation-header flex flex-col lg:flex-row justify-between items-center p-2 rounded-xl">
//           <div>
//             <p className="font-bold text-[#191919] text-center sm:text-left   text-sm sd:text-xs">
//               سبب الزيارة هنا ,سبب الزيارة هنا
//             </p>
//           </div>
//           <div className="bg-[#FCEEDA] text-[#E38200] p-3 px-5 rounded-2xl mt-2 sm:mt-0">
//             قيد الانتظار
//           </div>
//         </div>
//         <div className="contact-info bg-[#F5F6F9] p-3  rounded-lg flex  flex-col">
//         <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//           <p className="text-center sm:text-left text-[#212936]">محمد احمد ابراهيم</p>
//           <span className="text-[#767676]">#456786</span>
//         </div>
//         <UserData data={{phone:"+96645678765",email:"moha@gmail.com",address:"المملكة العربية السعودية",id:"980877777"}}/>
//         <Button className="w-full rounded-lg h-10 text-[#212936]"> +12 مرافق</Button>
//       </div>
//       </div>
//       <InvitationData data={{date:" 05:30 م , 06:30 م-12  ديسمبر 2023 ",name:"انس عاصم ابراهيم",companyName:"عمل المستقبل",typeOfVisit:"متعدد الزيارات",addressOfVisit:"مبني الاجتماعات ، الطابق 3 , الجهة , المكتب"}} />
//     </>
//   );
// }
///---------------------------------------------------------------Create-Report---------------------------------------------------------
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   Select,
//   Switch,
// } from "antd";
// import React, { useState } from "react";

// export default function ReportForm() {
//   return (
//     <>
//       <Form layout="vertical">
//         <Form.Item className="font-semibold flex items-center justify-end ">
//           <div className="rounded-full bg=[##FFFFFF]  shadow-md p-3 px-5 ">
//             <Switch className="p-1  bg-[#E5E8F3]" />
//             <span className="ms-3 text-[#0B101B]">اظهار المرافقين</span>
//           </div>
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B] " label="رقم الزيارة">
//           <Input className="w-full rounded-xl border border-slate border-gray-200" />
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B]" label="السنة">
//           <DatePicker
//             placeholder=""
//             suffixIcon={
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_397_7628)">
//                   <path
//                     d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M5.8335 13.75C6.52385 13.75 7.0835 13.1904 7.0835 12.5C7.0835 11.8096 6.52385 11.25 5.8335 11.25C5.14314 11.25 4.5835 11.8096 4.5835 12.5C4.5835 13.1904 5.14314 13.75 5.8335 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M14.1665 13.75C14.8569 13.75 15.4165 13.1904 15.4165 12.5C15.4165 11.8096 14.8569 11.25 14.1665 11.25C13.4761 11.25 12.9165 11.8096 12.9165 12.5C12.9165 13.1904 13.4761 13.75 14.1665 13.75Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_7628">
//                     <rect width="20" height="20" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>
//             }
//             className="w-full rounded-xl border border-slate border-gray-200"
//             picker="year"
//           />
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B]" label="الشهر">
//           <DatePicker
//             placeholder=""
//             suffixIcon={
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_397_7628)">
//                   <path
//                     d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M5.8335 13.75C6.52385 13.75 7.0835 13.1904 7.0835 12.5C7.0835 11.8096 6.52385 11.25 5.8335 11.25C5.14314 11.25 4.5835 11.8096 4.5835 12.5C4.5835 13.1904 5.14314 13.75 5.8335 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M14.1665 13.75C14.8569 13.75 15.4165 13.1904 15.4165 12.5C15.4165 11.8096 14.8569 11.25 14.1665 11.25C13.4761 11.25 12.9165 11.8096 12.9165 12.5C12.9165 13.1904 13.4761 13.75 14.1665 13.75Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_7628">
//                     <rect width="20" height="20" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>
//             }
//             className="w-full rounded-xl border border-slate border-gray-200"
//             picker="month"
//           />
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B]" label="الشركة">
//           <Select
//             className="w-full rounded-xl border border-slate border-gray-200"
//             suffixIcon={
//               <svg
//                 width="26"
//                 height="26"
//                 viewBox="0 0 26 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                   fill="#38ACB1"
//                 />
//               </svg>
//             }
//           >
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B]" label="المستضيف">
//           <Select
//             className="w-full rounded-xl border border-slate border-gray-200"
//             suffixIcon={
//               <svg
//                 width="26"
//                 height="26"
//                 viewBox="0 0 26 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                   fill="#38ACB1"
//                 />
//               </svg>
//             }
//           >
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B] " label="المبني">
//           <Select
//             className="w-full rounded-xl border border-slate border-gray-200"
//             suffixIcon={
//               <svg
//                 width="26"
//                 height="26"
//                 viewBox="0 0 26 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                   fill="#38ACB1"
//                 />
//               </svg>
//             }
//           >
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B] " label="الطابق">
//           <Select
//             className="w-full rounded-xl border border-slate border-gray-200"
//             suffixIcon={
//               <svg
//                 width="26"
//                 height="26"
//                 viewBox="0 0 26 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                   fill="#38ACB1"
//                 />
//               </svg>
//             }
//           >
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }


///---------------------------------------------------------------Notes---------------------------------------------------------

// import React from "react";
// import { Input} from "antd";

// export default function AddNotes() {
//   const { TextArea } = Input;
//   return (
//     <>
//       <div className="my-2">
//         <p className="my-4 text-[#0B101B]">ملاحظات الدخول</p>
//         <TextArea
//       rows={6}
//       placeholder="Type your message here..."
//       className="border border-gray-200 rounded-lg p-3  resize-none"
//     />
//       </div>

//       <div>
//         <p className="my-4 text-[#0B101B]">ملاحظات الخروج </p>
//         <TextArea
//           rows={6}
//           placeholder="Type your message here..."
//           className="border border-slate border-gray-200 rounded-lg p-3 resize-none "
//         />
//       </div>
//     </>
//   );
// }

///---------------------------------------------------------------Almurafiqin---------------------------------------------------------

// import { Progress } from "antd";
// import React from "react";
// import AttendanceTime from "../AttendanceTime";
// import AttendenceData from "../AttendenceData";

// export default function Attendants() {
//   return (
//     <>
//       <div className="attendence-group">
//         <div className="Progresss border-[0.5px] border-solid border-gray-100 rounded-lg p-2">
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
//             <div className="flex items-center">
//               <p className="me-2 text-[#212936] ">تم الحضور</p>
//               <Progress
//                 size="small"
//                 type="circle"
//                 percent={8}
//                 format={(percent) => `${percent}`}
//                 strokeColor={"#03A78E"}
//               />
//             </div>
//             <div className="flex  items-center">
//               <p className="me-2 text-[#212936]">لم يحضر</p>
//               <Progress
//                 size="small"
//                 type="circle"
//                 percent={4}
//                 format={(percent) => `${percent}`}
//                 strokeColor={"#8B673C"}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-3">
//             <p className="text-center sm:text-lef text-[#212936]">محمداحمد يوسف</p>
//             <div className="bg-[#E7FAF7] text-[#03A78E] p-2 rounded-2xl mt-2 sm:mt-0">
//               تم الحضور
//             </div>
//           </div>
//           <AttendenceData
//             data={{
//               phone: "+96645678765",
//               email: "moha@gmail.com",
//               address: "المملكة العربية السعودية",
//               id: "980877777",
//             }}
//           />
//           <AttendanceTime data={{ attendence: "05:30", departure: " 06:30" }} />
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left">محمداحمد يوسف</p>
//             <div className="bg-[#E7FAF7] text-[#03A78E] p-2 rounded-2xl mt-2 sm:mt-0">
//               تم الحضور
//             </div>
//           </div>
//           <AttendenceData
//             data={{
//               phone: "+96645678765",
//               email: "moha@gmail.com",
//               address: "المملكة العربية السعودية",
//               id: "980877777",
//             }}
//           />
//           <AttendanceTime data={{ attendence: "05:30", departure: " 06:30" }} />
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left">محمداحمد يوسف</p>
//             <div className="bg-[#F6F4F1] text-[#8B673C] p-2 rounded-2xl mt-2 sm:mt-0">
//               لم يحضر
//             </div>
//           </div>
//           <AttendenceData
//             data={{
//               phone: "+96645678765",
//               email: "moha@gmail.com",
//               address: "المملكة العربية السعودية",
//               id: "980877777",
//             }}
//           />
//           <AttendanceTime data={{ attendence: "05:30", departure: " 06:30" }} />
//         </div>
//       </div>
//     </>
//   );
// }

///---------------------------------------------------------------Attendence-Details---------------------------------------------------------

// import React from "react";
// import AttendenceData from "../AttendenceData";
// import AttendanceTime from "../AttendanceTime";

// export default function AttendenceDetails() {
//   return (
//     <>
//       <div className="AttendenceDetails">
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left text-[#212936]">محمداحمد يوسف</p>
//             <span>
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect width="40" height="40" rx="20" fill="#E7FAF7" />
//                 <g clip-path="url(#clip0_397_13475)">
//                   <path
//                     d="M30 20C30 20.46 29.6267 20.8333 29.1667 20.8333H17.47L20.1725 23.5358C20.4983 23.8617 20.4983 24.3883 20.1725 24.7142C20.01 24.8767 19.7967 24.9583 19.5833 24.9583C19.37 24.9583 19.1567 24.8767 18.9942 24.7142L15.4583 21.1783C14.8083 20.5283 14.8083 19.4717 15.4583 18.8217L18.9942 15.2858C19.32 14.96 19.8467 14.96 20.1725 15.2858C20.4983 15.6117 20.4983 16.1383 20.1725 16.4642L17.47 19.1667H29.1667C29.6267 19.1667 30 19.54 30 20ZM28.845 22.5567C28.415 22.3892 27.9325 22.6017 27.7658 23.03C26.5075 26.2517 23.46 28.3333 20.0008 28.3333C15.4058 28.3333 11.6675 24.595 11.6675 20C11.6675 15.405 15.405 11.6667 20 11.6667C23.4592 11.6667 26.5075 13.7483 27.765 16.97C27.9325 17.3983 28.4133 17.61 28.8442 17.4433C29.2733 17.2758 29.485 16.7925 29.3175 16.3642C27.8083 12.4983 24.1508 10 20 10C14.4858 10 10 14.4858 10 20C10 25.5142 14.4858 30 20 30C24.1508 30 27.8083 27.5017 29.3183 23.6367C29.4858 23.2075 29.2742 22.725 28.845 22.5575V22.5567Z"
//                     fill="#03A78E"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_13475">
//                     <rect
//                       width="20"
//                       height="20"
//                       fill="white"
//                       transform="translate(10 10)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </div>
//            <AttendenceData data={{phone:"+96645678765",email:"moha@gmail.com",address:"المملكة العربية السعودية",id:"980877777"}} />
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left text-[#212936]">محمداحمد يوسف</p>
//             <span>
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect width="40" height="40" rx="20" fill="#E7FAF7" />
//                 <g clip-path="url(#clip0_397_13475)">
//                   <path
//                     d="M30 20C30 20.46 29.6267 20.8333 29.1667 20.8333H17.47L20.1725 23.5358C20.4983 23.8617 20.4983 24.3883 20.1725 24.7142C20.01 24.8767 19.7967 24.9583 19.5833 24.9583C19.37 24.9583 19.1567 24.8767 18.9942 24.7142L15.4583 21.1783C14.8083 20.5283 14.8083 19.4717 15.4583 18.8217L18.9942 15.2858C19.32 14.96 19.8467 14.96 20.1725 15.2858C20.4983 15.6117 20.4983 16.1383 20.1725 16.4642L17.47 19.1667H29.1667C29.6267 19.1667 30 19.54 30 20ZM28.845 22.5567C28.415 22.3892 27.9325 22.6017 27.7658 23.03C26.5075 26.2517 23.46 28.3333 20.0008 28.3333C15.4058 28.3333 11.6675 24.595 11.6675 20C11.6675 15.405 15.405 11.6667 20 11.6667C23.4592 11.6667 26.5075 13.7483 27.765 16.97C27.9325 17.3983 28.4133 17.61 28.8442 17.4433C29.2733 17.2758 29.485 16.7925 29.3175 16.3642C27.8083 12.4983 24.1508 10 20 10C14.4858 10 10 14.4858 10 20C10 25.5142 14.4858 30 20 30C24.1508 30 27.8083 27.5017 29.3183 23.6367C29.4858 23.2075 29.2742 22.725 28.845 22.5575V22.5567Z"
//                     fill="#03A78E"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_13475">
//                     <rect
//                       width="20"
//                       height="20"
//                       fill="white"
//                       transform="translate(10 10)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </div>
//            <AttendenceData data={{phone:"+96645678765",email:"moha@gmail.com",address:"المملكة العربية السعودية",id:"980877777"}} />
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left text-[#212936]">محمداحمد يوسف</p>
//             <span>
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   width="40"
//                   height="40"
//                   rx="20"
//                   transform="matrix(-1 0 0 1 40 0)"
//                   fill="#F6F4F1"
//                 />
//                 <g clip-path="url(#clip0_397_13585)">
//                   <path
//                     d="M10 20C10 20.46 10.3733 20.8333 10.8333 20.8333H22.53L19.8275 23.5358C19.5017 23.8617 19.5017 24.3883 19.8275 24.7142C19.99 24.8767 20.2033 24.9583 20.4167 24.9583C20.63 24.9583 20.8433 24.8767 21.0058 24.7142L24.5417 21.1783C25.1917 20.5283 25.1917 19.4717 24.5417 18.8217L21.0058 15.2858C20.68 14.96 20.1533 14.96 19.8275 15.2858C19.5017 15.6117 19.5017 16.1383 19.8275 16.4642L22.53 19.1667H10.8333C10.3733 19.1667 10 19.54 10 20ZM11.155 22.5567C11.585 22.3892 12.0675 22.6017 12.2342 23.03C13.4925 26.2517 16.54 28.3333 19.9992 28.3333C24.5942 28.3333 28.3325 24.595 28.3325 20C28.3325 15.405 24.595 11.6667 20 11.6667C16.5408 11.6667 13.4925 13.7483 12.235 16.97C12.0675 17.3983 11.5867 17.61 11.1558 17.4433C10.7267 17.2758 10.515 16.7925 10.6825 16.3642C12.1917 12.4983 15.8492 10 20 10C25.5142 10 30 14.4858 30 20C30 25.5142 25.5142 30 20 30C15.8492 30 12.1917 27.5017 10.6817 23.6367C10.5142 23.2075 10.7258 22.725 11.155 22.5575V22.5567Z"
//                     fill="#8B673C"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_13585">
//                     <rect
//                       width="20"
//                       height="20"
//                       fill="white"
//                       transform="matrix(-1 0 0 1 30 10)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </div>
//            <AttendenceData data={{phone:"+96645678765",email:"moha@gmail.com",address:"المملكة العربية السعودية",id:"980877777"}} />
//             <AttendanceTime data={{ attendence: "05:30"}} />
//         </div>
//         <div className="contact-info  border-[0.5px] border-solid border-gray-100 rounded-lg p-2 my-4 flex  flex-col">
//           <div className="flex flex-col sm:flex-row justify-between items-center border-solid border-gray-200 border-b-[1px] pb-4">
//             <p className="text-center sm:text-left text-[#212936]">محمداحمد يوسف</p>
//             <span>
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   width="40"
//                   height="40"
//                   rx="20"
//                   transform="matrix(-1 0 0 1 40 0)"
//                   fill="#F3F5F9"
//                 />
//                 <g clip-path="url(#clip0_397_13663)">
//                   <path
//                     d="M27.3062 20C26.9689 19.9956 26.6835 20.2481 26.6468 20.5833C26.3356 24.2632 23.1002 26.9939 19.4204 26.6827C15.7406 26.3715 13.0099 23.1361 13.3211 19.4562C13.6324 15.7764 16.8677 13.0457 20.5475 13.3569C22.1407 13.4917 23.6329 14.1928 24.7535 15.3333H22.6722C22.304 15.3333 22.0055 15.6318 22.0055 16C22.0055 16.3682 22.304 16.6666 22.6722 16.6666H25.4342C26.1177 16.6662 26.6718 16.1122 26.6722 15.4286V12.6667C26.6722 12.2985 26.3737 12 26.0055 12C25.6373 12 25.3389 12.2985 25.3389 12.6667V14.052C22.0484 11.1117 16.9974 11.3956 14.0571 14.6861C11.1168 17.9765 11.4007 23.0275 14.6911 25.9678C17.9816 28.9081 23.0326 28.6242 25.9729 25.3337C27.1159 24.0547 27.8169 22.4417 27.9722 20.7333C28.0064 20.3641 27.7349 20.0371 27.3657 20.0028C27.3459 20.001 27.3261 20.0001 27.3062 20Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_13663">
//                     <rect
//                       width="16"
//                       height="16"
//                       fill="white"
//                       transform="translate(12 12)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//           </div>
//            <AttendenceData data={{phone:"+96645678765",email:"moha@gmail.com",address:"المملكة العربية السعودية",id:"980877777"}} />
//             <AttendanceTime data={{ attendence: "05:30", departure: " 06:30" }} />
//         </div>
//       </div>
//     </>
//   );
// }

///---------------------------------------------------------------VisitInformation---------------------------------------------------------

// import { Form, Select } from "antd";
// import { Popover, Steps } from "antd";
// import React from "react";
// const customDot = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   ></Popover>
// );
// export default function VisitInformation() {
//   return (
//     <>
//       <div>
//         <Form layout="vertical">
//           <div className="flex flex-row items-center  pb-4 ">
//             <span>
//               <svg
//                 width="51"
//                 height="51"
//                 viewBox="0 0 51 51"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
//                 <g clip-path="url(#clip0_397_15813)">
//                   <path
//                     d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
//                     fill="black"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_15813">
//                     <rect
//                       width="24"
//                       height="24"
//                       fill="white"
//                       transform="translate(13.5 13.5)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//             <div className="mx-2">
//               <p className="text-[#191919] font-bold pb-2">معلومات الزيارة </p>
//               <p className="text-[#939393] pb-2">
//                 من فضلك قم بكتابة معلومات الزيارة
//               </p>
//             </div>
//           </div>
//           <div className="stepper overflow-hidden">
//             <Steps
//               current={3}
//               progressDot={customDot}
//               items={[
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//               ]}
//             />
//           </div>
//           <Form.Item className="font-semibold text-[#0B101B]" label="المبني">
//             <Select
//               className="w-full rounded-xl border border-slate border-gray-200"
//               suffixIcon={
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 26 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                     fill="#38ACB1"
//                   />
//                 </svg>
//               }
//             >
//               <Select.Option value="demo">Demo</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item className="font-semibold text-[#0B101B] " label="الطابق">
//             <Select
//               className="w-full rounded-xl border border-slate border-gray-200"
//               suffixIcon={
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 26 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                     fill="#38ACB1"
//                   />
//                 </svg>
//               }
//             >
//               <Select.Option value="demo">Demo</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item className="font-semibold text-[#0B101B] " label="الشركة">
//             <Select
//               className="w-full rounded-xl border border-slate border-gray-200"
//               suffixIcon={
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 26 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                     fill="#38ACB1"
//                   />
//                 </svg>
//               }
//             >
//               <Select.Option value="demo">Demo</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item className="font-semibold text-[#0B101B] " label="الجهة">
//             <Select
//               className="w-full rounded-xl border border-slate border-gray-200"
//               suffixIcon={
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 26 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                     fill="#38ACB1"
//                   />
//                 </svg>
//               }
//             >
//               <Select.Option value="demo">Demo</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item className="font-semibold text-[#0B101B] " label="المكتب">
//             <Select
//               className="w-full rounded-xl border border-slate border-gray-200"
//               suffixIcon={
//                 <svg
//                   width="26"
//                   height="26"
//                   viewBox="0 0 26 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                     fill="#38ACB1"
//                   />
//                 </svg>
//               }
//             >
//               <Select.Option value="demo">Demo</Select.Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// }

///---------------------------------------------------------------VisitDetails---------------------------------------------------------

// import {
//   Button,
//   Form,
//   Select,
//   Steps,
//   Popover,
//   DatePicker,
//   TimePicker,
// } from "antd";
// import React from "react";
// const customDot = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   ></Popover>
// );
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };
// const onChangeTime = (time, timeString) => {
//   console.log(time, timeString);
// };
// export default function VisitDetails() {
//   return (
//     <div>
//       <Form layout="vertical">
//         <div className="flex flex-row items-center  pb-4 ">
//           <span>
//             <svg
//               width="51"
//               height="51"
//               viewBox="0 0 51 51"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
//               <g clip-path="url(#clip0_397_15813)">
//                 <path
//                   d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
//                   fill="black"
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_397_15813">
//                   <rect
//                     width="24"
//                     height="24"
//                     fill="white"
//                     transform="translate(13.5 13.5)"
//                   />
//                 </clipPath>
//               </defs>
//             </svg>
//           </span>
//           <div className="mx-2">
//             <p className="text-[#191919] font-bold pb-2"> تفاصيل الزيارة </p>
//             <p className="text-[#939393] pb-2">
              
//               من فضلك قم بكتابة تفاصيل الزيارة
//             </p>
//           </div>
//         </div>
//         <div className="stepper overflow-hidden">
//           <Steps
//             current={3}
//             progressDot={customDot}
//             items={[
//               {
//                 title: "",
//               },
//               {
//                 title: "",
//               },
//               {
//                 title: "",
//               },
//               {
//                 title: "",
//               },
//               {
//                 title: "",
//               },
//             ]}
//           />
//         </div>
//         <p className="font-semibold text-[#0B101B] ">نوع الزيارة</p>
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-2">
//           <div>
//             <Button className="w-full rounded-xl text-[#0B101B]">متعددة الزيارات</Button>
//           </div>
//           <div>
//             <Button className="w-full rounded-xl text-[#0B101B]">مرة واحدة</Button>
//           </div>
//         </div>
//         <Form.Item className="font-semibold text-[#0B101B]" label="تاريخ الزيارة">
//           <DatePicker
//             placeholder="من فضلك حدد تاريخ الزيارة ..."
//             suffixIcon={
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_397_7628)">
//                   <path
//                     d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M5.8335 13.75C6.52385 13.75 7.0835 13.1904 7.0835 12.5C7.0835 11.8096 6.52385 11.25 5.8335 11.25C5.14314 11.25 4.5835 11.8096 4.5835 12.5C4.5835 13.1904 5.14314 13.75 5.8335 13.75Z"
//                     fill="#38ACB1"
//                   />
//                   <path
//                     d="M14.1665 13.75C14.8569 13.75 15.4165 13.1904 15.4165 12.5C15.4165 11.8096 14.8569 11.25 14.1665 11.25C13.4761 11.25 12.9165 11.8096 12.9165 12.5C12.9165 13.1904 13.4761 13.75 14.1665 13.75Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_7628">
//                     <rect width="20" height="20" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>
//             }
//             className="w-full rounded-xl border border-slate border-gray-200"
//             onChange={onChange}
//           />
//         </Form.Item>

//         <Form.Item className="font-semibold text-[#0B101B]" label=" من الساعة">
//           <TimePicker
//             use12Hours
//             format="h:mm a"
//             placeholder="من الساعة ..."
//             suffixIcon={
//               <svg
//                 width="20"
//                 height="21"
//                 viewBox="0 0 20 21"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_397_16476)">
//                   <path
//                     d="M10 0.216797C8.02219 0.216797 6.08879 0.803287 4.4443 1.9021C2.79981 3.00092 1.51809 4.5627 0.761209 6.38996C0.00433286 8.21722 -0.193701 10.2279 0.192152 12.1677C0.578004 14.1075 1.53041 15.8893 2.92894 17.2879C4.32746 18.6864 6.10929 19.6388 8.0491 20.0247C9.98891 20.4105 11.9996 20.2125 13.8268 19.4556C15.6541 18.6987 17.2159 17.417 18.3147 15.7725C19.4135 14.128 20 12.1946 20 10.2168C19.9971 7.56551 18.9426 5.02364 17.0679 3.1489C15.1932 1.27415 12.6513 0.219664 10 0.216797ZM10 18.5501C8.35183 18.5501 6.74066 18.0614 5.37025 17.1457C3.99984 16.23 2.93174 14.9285 2.30101 13.4058C1.67028 11.8831 1.50525 10.2076 1.82679 8.59104C2.14834 6.97454 2.94201 5.48968 4.10745 4.32424C5.27289 3.1588 6.75774 2.36513 8.37425 2.04359C9.99076 1.72204 11.6663 1.88707 13.189 2.5178C14.7118 3.14853 16.0132 4.21664 16.9289 5.58705C17.8446 6.95746 18.3333 8.56862 18.3333 10.2168C18.3309 12.4262 17.4522 14.5444 15.8899 16.1067C14.3276 17.669 12.2094 18.5477 10 18.5501ZM11.6667 10.2168C11.668 10.5097 11.5921 10.7977 11.4467 11.0519C11.3012 11.3062 11.0914 11.5176 10.8382 11.6649C10.5851 11.8122 10.2976 11.8902 10.0047 11.891C9.71186 11.8918 9.42393 11.8155 9.16996 11.6696C8.91599 11.5237 8.70494 11.3135 8.55807 11.0601C8.41119 10.8067 8.33369 10.5191 8.33336 10.2262C8.33302 9.93335 8.40987 9.64555 8.55617 9.39183C8.70246 9.1381 8.91303 8.92741 9.16667 8.78096V6.05013C9.16667 5.82912 9.25447 5.61716 9.41075 5.46088C9.56703 5.30459 9.77899 5.2168 10 5.2168C10.221 5.2168 10.433 5.30459 10.5893 5.46088C10.7455 5.61716 10.8333 5.82912 10.8333 6.05013V8.78096C11.0859 8.92622 11.2959 9.13534 11.4422 9.38735C11.5884 9.63937 11.6659 9.92541 11.6667 10.2168Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_16476">
//                     <rect
//                       width="20"
//                       height="20"
//                       fill="white"
//                       transform="translate(0 0.216797)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             }
//             className="w-full rounded-xl border border-slate border-gray-200"
//             onChange={onChangeTime}
//           />
//         </Form.Item>
//         <Form.Item className="font-semibold text-[#0B101B]" label=" الى الساعة ">
//           <TimePicker
//             use12Hours
//             format="h:mm a"
//             placeholder="الى الساعة..."
//             suffixIcon={
//               <svg
//                 width="20"
//                 height="21"
//                 viewBox="0 0 20 21"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_397_16476)">
//                   <path
//                     d="M10 0.216797C8.02219 0.216797 6.08879 0.803287 4.4443 1.9021C2.79981 3.00092 1.51809 4.5627 0.761209 6.38996C0.00433286 8.21722 -0.193701 10.2279 0.192152 12.1677C0.578004 14.1075 1.53041 15.8893 2.92894 17.2879C4.32746 18.6864 6.10929 19.6388 8.0491 20.0247C9.98891 20.4105 11.9996 20.2125 13.8268 19.4556C15.6541 18.6987 17.2159 17.417 18.3147 15.7725C19.4135 14.128 20 12.1946 20 10.2168C19.9971 7.56551 18.9426 5.02364 17.0679 3.1489C15.1932 1.27415 12.6513 0.219664 10 0.216797ZM10 18.5501C8.35183 18.5501 6.74066 18.0614 5.37025 17.1457C3.99984 16.23 2.93174 14.9285 2.30101 13.4058C1.67028 11.8831 1.50525 10.2076 1.82679 8.59104C2.14834 6.97454 2.94201 5.48968 4.10745 4.32424C5.27289 3.1588 6.75774 2.36513 8.37425 2.04359C9.99076 1.72204 11.6663 1.88707 13.189 2.5178C14.7118 3.14853 16.0132 4.21664 16.9289 5.58705C17.8446 6.95746 18.3333 8.56862 18.3333 10.2168C18.3309 12.4262 17.4522 14.5444 15.8899 16.1067C14.3276 17.669 12.2094 18.5477 10 18.5501ZM11.6667 10.2168C11.668 10.5097 11.5921 10.7977 11.4467 11.0519C11.3012 11.3062 11.0914 11.5176 10.8382 11.6649C10.5851 11.8122 10.2976 11.8902 10.0047 11.891C9.71186 11.8918 9.42393 11.8155 9.16996 11.6696C8.91599 11.5237 8.70494 11.3135 8.55807 11.0601C8.41119 10.8067 8.33369 10.5191 8.33336 10.2262C8.33302 9.93335 8.40987 9.64555 8.55617 9.39183C8.70246 9.1381 8.91303 8.92741 9.16667 8.78096V6.05013C9.16667 5.82912 9.25447 5.61716 9.41075 5.46088C9.56703 5.30459 9.77899 5.2168 10 5.2168C10.221 5.2168 10.433 5.30459 10.5893 5.46088C10.7455 5.61716 10.8333 5.82912 10.8333 6.05013V8.78096C11.0859 8.92622 11.2959 9.13534 11.4422 9.38735C11.5884 9.63937 11.6659 9.92541 11.6667 10.2168Z"
//                     fill="#38ACB1"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_16476">
//                     <rect
//                       width="20"
//                       height="20"
//                       fill="white"
//                       transform="translate(0 0.216797)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             }
//             className="w-full rounded-xl border border-slate border-gray-200"
//             onChange={onChangeTime}
//           />
//         </Form.Item>
//         <Form.Item className="font-semibold text-[#0B101B]" label="سبب الزيارة">
//           <Select
//             className="w-full rounded-xl border border-slate border-gray-200"
//             suffixIcon={
//               <svg
//                 width="26"
//                 height="26"
//                 viewBox="0 0 26 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.7694 14.5167C13.6687 14.6182 13.5488 14.6988 13.4168 14.7538C13.2848 14.8088 13.1432 14.8371 13.0002 14.8371C12.8572 14.8371 12.7156 14.8088 12.5836 14.7538C12.4516 14.6988 12.3318 14.6182 12.231 14.5167L7.26937 9.54416C7.16866 9.44262 7.04885 9.36202 6.91683 9.30702C6.78482 9.25202 6.64322 9.22371 6.50021 9.22371C6.35719 9.22371 6.2156 9.25202 6.08358 9.30702C5.95157 9.36202 5.83175 9.44262 5.73104 9.54416C5.52927 9.74713 5.41602 10.0217 5.41602 10.3079C5.41602 10.5941 5.52927 10.8687 5.73104 11.0717L10.7035 16.0442C11.3129 16.6528 12.139 16.9946 13.0002 16.9946C13.8615 16.9946 14.6875 16.6528 15.2969 16.0442L20.2694 11.0717C20.4695 10.8699 20.5823 10.5975 20.5835 10.3133C20.5844 10.1707 20.557 10.0294 20.5031 9.89742C20.4492 9.76543 20.3698 9.64538 20.2694 9.54416C20.1687 9.44262 20.0488 9.36202 19.9168 9.30702C19.7848 9.25202 19.6432 9.22371 19.5002 9.22371C19.3572 9.22371 19.2156 9.25202 19.0836 9.30702C18.9516 9.36202 18.8318 9.44262 18.731 9.54416L13.7694 14.5167Z"
//                   fill="#38ACB1"
//                 />
//               </svg>
//             }
//           >
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

///---------------------------------------------------------------Guest data---------------------------------------------------------

// import React from "react";
// import { Button, Form, Steps, Popover, Input } from "antd";
// const customDot = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   ></Popover>
// );
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };

// export default function GuestData() {
//   return (
//     <>
//       <div>
//         <Form layout="vertical">
//           <div className="flex flex-row items-center  pb-4 ">
//             <span>
//               <svg
//                 width="51"
//                 height="51"
//                 viewBox="0 0 51 51"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
//                 <g clip-path="url(#clip0_397_15813)">
//                   <path
//                     d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
//                     fill="black"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_397_15813">
//                     <rect
//                       width="24"
//                       height="24"
//                       fill="white"
//                       transform="translate(13.5 13.5)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </span>
//             <div className="mx-2">
//               <p className="text-[#191919] font-bold pb-2">بيانات الضيف </p>
//               <p className="text-[#939393] pb-2">
//                 من فضلك قم بادخال بيانات الضيف
//               </p>
//             </div>
//           </div>
//           <div className="stepper overflow-hidden">
//             <Steps
//               current={3}
//               progressDot={customDot}
//               items={[
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//               ]}
//             />
//           </div>

//           <Form.Item className="font-semibold text-[#0B101B]" label="اسم الضيف">
//             <Input
//               placeholder="اسم الضيف ..."
//               type="text"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//            name="email"
//            label="البريد الالكتروني  "
//            rules={[
//              {
//                type: 'email',
//                message: 'The input is not a valid email!',
//              },
//              {
//                required: true,
//                message: 'Please input your email!',
//              },
//            ]}

//           className="font-semibold text-[#0B101B]" >
//             <Input
//               placeholder="البريد الالكتروني  ..."
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//            name="phone"
//            label="رقم الجوال "
//            rules={[
//              {
//                required: true,
//                message: 'Please input your phone number!',
//              },
//              {
//                pattern: /^\d{10}$/,
//                message: 'Please enter a valid phone number!',
//              },
//            ]}
//            className="font-semibold text-[#0B101B]" >
//             <Input
//               placeholder="رقم الجوال ..."
//               type="tel"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//            name="identityNumber"
//            label="رقم الهوية / الاقامة"
//            rules={[
//              {
//                required: true,
//                message: 'Please input your identity number!',
//              },
//              {
//                pattern: /^\d{9}$/,
//                message: 'Identity number must be exactly 9 digits!',
//              },
//            ]}
//            className="font-semibold text-[#0B101B]" >
//             <Input
//               placeholder="رقم الهوية / الاقامة ..."
//               type="number"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item className="font-semibold text-[#0B101B]" label="هل لدية سيارة">
//             <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-2">
//               <div>
//                 <Button className="w-full rounded-xl text-[#0B101B]"> نعم</Button>
//               </div>
//               <div>
//                 <Button className="w-full rounded-xl text-[#0B101B]"> لا</Button>
//               </div>
//             </div>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// }

///---------------------------------------------------------------Escorts---------------------------------------------------------

// import React from "react";
// import { Button, Form, Steps, Popover, Input } from "antd";
// const customDot = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index} status: {status}
//       </span>
//     }
//   ></Popover>
// );
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };

// export default function Escorts() {
//   return (
//     <>
//       <div className="border border-solid border-gray-100 rounded-lg p-4">
//         <Form layout="vertical">
//           <div className="flex justify-between items-center">
//             <div className="flex flex-row items-center  pb-4 ">
//               <span>
//                 <svg
//                   width="51"
//                   height="51"
//                   viewBox="0 0 51 51"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <rect width="51" height="51" rx="25.5" fill="#F8FAFB" />
//                   <g clip-path="url(#clip0_397_15813)">
//                     <path
//                       d="M30.5 27.5C30.5 27.7652 30.3946 28.0196 30.2071 28.2071C30.0196 28.3947 29.7652 28.5 29.5 28.5H21.5C21.2348 28.5 20.9804 28.3947 20.7929 28.2071C20.6054 28.0196 20.5 27.7652 20.5 27.5C20.5 27.2348 20.6054 26.9805 20.7929 26.7929C20.9804 26.6054 21.2348 26.5 21.5 26.5H29.5C29.7652 26.5 30.0196 26.6054 30.2071 26.7929C30.3946 26.9805 30.5 27.2348 30.5 27.5ZM26.5 30.5H21.5C21.2348 30.5 20.9804 30.6054 20.7929 30.7929C20.6054 30.9805 20.5 31.2348 20.5 31.5C20.5 31.7652 20.6054 32.0196 20.7929 32.2071C20.9804 32.3947 21.2348 32.5 21.5 32.5H26.5C26.7652 32.5 27.0196 32.3947 27.2071 32.2071C27.3946 32.0196 27.5 31.7652 27.5 31.5C27.5 31.2348 27.3946 30.9805 27.2071 30.7929C27.0196 30.6054 26.7652 30.5 26.5 30.5ZM35.5 23.985V32.5C35.4984 33.8256 34.9711 35.0965 34.0338 36.0338C33.0964 36.9711 31.8256 37.4984 30.5 37.5H20.5C19.1744 37.4984 17.9036 36.9711 16.9662 36.0338C16.0289 35.0965 15.5016 33.8256 15.5 32.5V18.5C15.5016 17.1744 16.0289 15.9036 16.9662 14.9662C17.9036 14.0289 19.1744 13.5016 20.5 13.5H25.015C25.9346 13.4977 26.8456 13.6776 27.6952 14.0295C28.5449 14.3814 29.3163 14.8982 29.965 15.55L33.449 19.036C34.1012 19.6843 34.6184 20.4555 34.9704 21.305C35.3225 22.1545 35.5025 23.0654 35.5 23.985ZM28.551 16.964C28.2363 16.6592 27.8829 16.3969 27.5 16.184V20.5C27.5 20.7652 27.6054 21.0196 27.7929 21.2071C27.9804 21.3947 28.2348 21.5 28.5 21.5H32.816C32.603 21.1172 32.3404 20.7642 32.035 20.45L28.551 16.964ZM33.5 23.985C33.5 23.82 33.468 23.662 33.453 23.5H28.5C27.7044 23.5 26.9413 23.184 26.3787 22.6213C25.8161 22.0587 25.5 21.2957 25.5 20.5V15.547C25.338 15.532 25.179 15.5 25.015 15.5H20.5C19.7044 15.5 18.9413 15.8161 18.3787 16.3787C17.8161 16.9413 17.5 17.7044 17.5 18.5V32.5C17.5 33.2957 17.8161 34.0587 18.3787 34.6213C18.9413 35.184 19.7044 35.5 20.5 35.5H30.5C31.2956 35.5 32.0587 35.184 32.6213 34.6213C33.1839 34.0587 33.5 33.2957 33.5 32.5V23.985Z"
//                       fill="black"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_397_15813">
//                       <rect
//                         width="24"
//                         height="24"
//                         fill="white"
//                         transform="translate(13.5 13.5)"
//                       />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </span>
//               <div className="mx-2">
//                 <p className="text-[#191919] font-bold pb-2">بيانات الضيف </p>
//                 <p className="text-[#939393] pb-2">
                
//                   من فضلك قم بادخال بيانات الضيف
//                 </p>
//               </div>
//             </div>
//             <div className="trashh">
//               <span>
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clip-path="url(#clip0_397_17921)">
//                     <path
//                       d="M21 4H17.9C17.6679 2.87141 17.0538 1.85735 16.1613 1.12872C15.2687 0.40009 14.1522 0.00145452 13 0L11 0C9.8478 0.00145452 8.73132 0.40009 7.83875 1.12872C6.94618 1.85735 6.3321 2.87141 6.1 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5C2 5.26522 2.10536 5.51957 2.29289 5.70711C2.48043 5.89464 2.73478 6 3 6H4V19C4.00159 20.3256 4.52888 21.5964 5.46622 22.5338C6.40356 23.4711 7.67441 23.9984 9 24H15C16.3256 23.9984 17.5964 23.4711 18.5338 22.5338C19.4711 21.5964 19.9984 20.3256 20 19V6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM11 2H13C13.6203 2.00076 14.2251 2.19338 14.7316 2.55144C15.2381 2.90951 15.6214 3.41549 15.829 4H8.171C8.37858 3.41549 8.7619 2.90951 9.26839 2.55144C9.77487 2.19338 10.3797 2.00076 11 2ZM18 19C18 19.7956 17.6839 20.5587 17.1213 21.1213C16.5587 21.6839 15.7956 22 15 22H9C8.20435 22 7.44129 21.6839 6.87868 21.1213C6.31607 20.5587 6 19.7956 6 19V6H18V19Z"
//                       fill="#0A0F1A"
//                     />
//                     <path
//                       d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18Z"
//                       fill="#0A0F1A"
//                     />
//                     <path
//                       d="M14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z"
//                       fill="#0A0F1A"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_397_17921">
//                       <rect width="24" height="24" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </span>
//             </div>
//           </div>

//           <div className="stepper overflow-hidden">
//             <Steps
//               current={3}
//               progressDot={customDot}
//               items={[
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//                 {
//                   title: "",
//                 },
//               ]}
//             />
//           </div>

//           <div className="counter border border-solid border-gray-100 rounded-lg  my-2">
//             <div className="counter">
//               <div className="buttons rounded-2xl flex items-center justify-between px-1 ">
//                 <div>
//                   <p className="text-[#767676]">عدد المرافقين</p>
//                 </div>
//                 <div className="flex items-center">
//                   <Button className="border-none shadow-none">
//                     <svg
//                       width="32"
//                       height="33"
//                       viewBox="0 0 32 33"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <rect
//                         y="0.716797"
//                         width="32"
//                         height="32"
//                         rx="16"
//                         fill="#F5F6FA"
//                       />
//                       <g clip-path="url(#clip0_397_17704)">
//                         <path
//                           d="M16.7325 13.3831C16.7325 14.1758 16.7385 14.9689 16.7284 15.7615C16.7284 15.9416 16.7743 15.9906 16.9544 15.9879C18.5556 15.9806 20.157 15.9795 21.7585 15.9847C21.9399 15.9822 22.1157 16.047 22.2521 16.1666C22.3884 16.2861 22.4756 16.452 22.4968 16.6321C22.5155 16.8122 22.4673 16.9928 22.3613 17.1396C22.2553 17.2864 22.099 17.3891 21.9221 17.428C21.8321 17.4434 21.7406 17.4489 21.6494 17.4444C20.1091 17.4444 18.5684 17.4499 17.0281 17.4403C16.799 17.4403 16.7238 17.482 16.7261 17.7304C16.739 19.301 16.7321 20.8717 16.733 22.4423C16.733 22.763 16.5928 23.0013 16.3063 23.1401C16.0424 23.2675 15.7848 23.2295 15.5543 23.0526C15.3458 22.8927 15.2674 22.6737 15.2679 22.4111C15.2716 20.8405 15.2679 19.2698 15.2748 17.6992C15.2748 17.488 15.2189 17.4385 15.0126 17.4394C13.4339 17.4481 11.8555 17.4458 10.2768 17.4435C9.71217 17.4435 9.34463 16.9198 9.56461 16.4264C9.70209 16.1162 9.95598 15.9796 10.2979 15.9806C11.861 15.9833 13.4242 15.9773 14.9874 15.987C15.2069 15.987 15.2803 15.9503 15.2784 15.7079C15.2651 14.13 15.2706 12.5515 15.2725 10.9731C15.2725 10.5818 15.5378 10.2716 15.9026 10.2212C16.0823 10.1974 16.2645 10.2409 16.4139 10.3435C16.5634 10.4461 16.6695 10.6003 16.7119 10.7765C16.7295 10.8582 16.7367 10.9418 16.7335 11.0253C16.7338 11.8116 16.7335 12.5975 16.7325 13.3831Z"
//                           fill="#38ACB1"
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_397_17704">
//                           <rect
//                             width="13"
//                             height="13"
//                             fill="white"
//                             transform="translate(9.5 10.2168)"
//                           />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </Button>
//                   2
//                   <Button className="border-none shadow-none">
//                     <svg
//                       width="32"
//                       height="33"
//                       viewBox="0 0 32 33"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <rect
//                         y="0.716797"
//                         width="32"
//                         height="32"
//                         rx="16"
//                         fill="#F5F6FA"
//                       />
//                       <rect
//                         x="9.5"
//                         y="15.7168"
//                         width="13"
//                         height="2"
//                         rx="1"
//                         fill="#38ACB1"
//                       />
//                     </svg>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Form.Item className="font-semibold text-[#0B101B]" label="اسم الضيف">
//             <Input
//               placeholder="اسم الضيف ..."
//               type="text"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="البريد الالكتروني  "
//             rules={[
//               {
//                 type: "email",
//                 message: "The input is not a valid email!",
//               },
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}
//             className="font-semibold text-[#0B101B]"
//           >
//             <Input
//               placeholder="البريد الالكتروني  ..."
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//             name="phone"
//             label="رقم الجوال "
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your phone number!",
//               },
//               {
//                 pattern: /^\d{10}$/,
//                 message: "Please enter a valid phone number!",
//               },
//             ]}
//             className="font-semibold text-[#0B101B]"
//           >
//             <Input
//               placeholder="رقم الجوال ..."
//               type="tel"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>

//           <Form.Item
//             name="identityNumber"
//             label="رقم الهوية / الاقامة"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your identity number!",
//               },
//               {
//                 pattern: /^\d{9}$/,
//                 message: "Identity number must be exactly 9 digits!",
//               },
//             ]}
//             className="font-semibold text-[#0B101B]"
//           >
//             <Input
//               placeholder="رقم الهوية / الاقامة ..."
//               type="number"
//               className="w-full rounded-xl border border-slate border-gray-200"
//             />
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// }

