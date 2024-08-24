"use client";
import { PaginationProperty } from "@/components/atoms/propertiesList/PaginationProperty";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { useEffect, useState } from "react";

const PropertiesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = Number(localStorage.getItem("currentPage"));
    return savedPage ? Number(savedPage) : 1;
  });
  const { properties } = useFetchPropertyData();
  const totalPages = Math.ceil(properties.length / 20);

  useEffect(() => {
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage]);
  return (
    <div className="flex flex-col gap-8 mb-2">
      <PropertyCards currentPage={currentPage} />
      <PaginationProperty
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PropertiesList;
