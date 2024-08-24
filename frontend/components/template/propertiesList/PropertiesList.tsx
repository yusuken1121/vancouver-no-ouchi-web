"use client";
import { PaginationProperty } from "@/components/atoms/propertiesList/PaginationProperty";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { useEffect, useState } from "react";

const PropertiesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { properties } = useFetchPropertyData();
  const totalPages = Math.ceil(properties.length / 20);

  return (
    <div className="flex flex-col gap-8">
      <PropertyCards />
      <PaginationProperty
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PropertiesList;
