"use client";
import { PaginationProperty } from "@/components/atoms/propertiesList/PaginationProperty";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PropertiesList = () => {
  const { properties, loading, error } = useFetchPropertyData();
  const [filteredProperties, setFilteredProperties] =
    useState<NotionPage[]>(properties);
  const searchParams = useSearchParams();

  // Query
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const zone = searchParams.get("zone");
  const area = searchParams.get("area");

  useEffect(() => {
    if (!loading) {
      let filteredData = properties.filter((p) => {
        const matchesZone = zone
          ? p.properties.ゾーン.select?.name === `Zone${zone}`
          : true;
        const rent = p.properties.家賃.number || 0;
        const matchedMinPrice = minPrice ? rent >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? rent <= parseFloat(maxPrice) : true;
        const matchesArea = area
          ? p.properties.エリア.select?.name === area
          : true;
        return matchesZone && matchedMinPrice && matchesMaxPrice && matchesArea;
      });
      setFilteredProperties(filteredData);
    } else {
      setFilteredProperties(properties);
    }
  }, [properties, zone, minPrice, maxPrice]);

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <p>
          {properties.length || 0} 件中 {filteredProperties.length || 0} 件表示
        </p>
      </div>
      <div className="flex flex-col gap-8 mb-2">
        <PropertyCards
          loading={loading}
          error={error}
          filteredProperties={filteredProperties}
        />
      </div>
    </>
  );
};

export default PropertiesList;
