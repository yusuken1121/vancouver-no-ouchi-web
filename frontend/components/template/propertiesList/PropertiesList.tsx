"use client";
import { PaginationProperty } from "@/components/atoms/propertiesList/PaginationProperty";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";

const PropertiesList = () => {
  const { properties } = useFetchPropertyData();
  const totalPages = Math.ceil(properties.length / 20);

  return (
    <div className="flex flex-col gap-8 mb-2">
      <PropertyCards />
    </div>
  );
};

export default PropertiesList;
