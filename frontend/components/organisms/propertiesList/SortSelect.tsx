"use client";
import { PrimarySelect } from "@/components/atoms/propertiesList/SortSelect";
import { sortOptions } from "@/utlis/commonOptions";
import { createQueryString } from "@/utlis/queryStringHelper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { SetStateAction } from "react";

const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleChangeSort = (e: SetStateAction<string>) => {
    switch (e) {
      case sortOptions[0].value:
        router.push(
          pathname + "?" + createQueryString(searchParams, "sort", "price-asc")
        );
        break;
      case sortOptions[1].value:
        router.push(
          pathname + "?" + createQueryString(searchParams, "sort", "price-dec")
        );
        break;
      default:
        router.push(pathname);
    }
  };

  return (
    <PrimarySelect
      selectItems={sortOptions}
      handleChange={handleChangeSort}
      labelName="表示順"
      placeholder=""
    />
  );
};

export default SortSelect;
