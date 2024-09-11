import LTRPhone from "@/components/LTRPhone";
import useCountries from "@/hooks/useCountries";
import React from "react";

export default function PhoneInput(props) {
  const { data, isPending } = useCountries({
    isActive: true,
    isGetAll: true,
  });
  return (
    <LTRPhone
      showSearch={true}
      onlyCountries={data?.data?.map((country) => country.code.toLowerCase())}
      country="sa"
      loading={isPending}
      {...props}
    ></LTRPhone>
  );
}
