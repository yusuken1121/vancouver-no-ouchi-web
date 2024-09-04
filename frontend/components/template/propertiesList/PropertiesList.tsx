"use client";
import { PrimarySelect } from "@/components/atoms/common/PrimarySelect";
import { FilterDialog } from "@/components/organisms/propertiesList/FilterDialog";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { sortOptions } from "@/utlis/commonOptions";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import { createQueryString } from "@/utlis/queryStringHelper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SetStateAction, useEffect, useState } from "react";

const PropertiesList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { properties, loading, error } = useFetchPropertyData();
  const [filteredProperties, setFilteredProperties] =
    useState<NotionPage[]>(properties);

  // Sort
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Query
  const querySort = searchParams.get("sort");
  const queryMinPrice = searchParams.get("minPrice");
  const queryMaxPrice = searchParams.get("maxPrice");
  const queryZone = searchParams.get("zone");
  const queryArea = searchParams.get("area");

  useEffect(() => {
    switch (querySort) {
      case "price-asc":
        setSelectedOption(sortOptions[0].value);
        break;
      case "price-dec":
        setSelectedOption(sortOptions[1].value);
        break;
      default:
        setSelectedOption(sortOptions[0].value);
    }
  }, [querySort]);

  useEffect(() => {
    // filter
    if (!loading) {
      let filteredData = properties.filter((p) => {
        const matchesZone = queryZone
          ? p.properties.ゾーン.select?.name === `${queryZone}`
          : true;
        const rent = p.properties.家賃.number || 0;
        const matchedMinPrice = queryMinPrice
          ? rent >= parseFloat(queryMinPrice)
          : true;
        const matchedMaxPrice = queryMaxPrice
          ? rent <= parseFloat(queryMaxPrice)
          : true;
        const matchedArea = queryArea
          ? p.properties.エリア.select?.name === queryArea
          : true;
        return matchesZone && matchedMinPrice && matchedMaxPrice && matchedArea;
      });

      // Sort
      switch (selectedOption) {
        case sortOptions[0].value:
          filteredData = filteredData.sort((a, b) => {
            const rentA = a.properties.家賃.number ?? 0;
            const rentB = b.properties.家賃.number ?? 0;
            return rentB - rentA;
          });
          break;
        case sortOptions[1].value:
          filteredData = filteredData.sort((a, b) => {
            const rentA = a.properties.家賃.number ?? 0;
            const rentB = b.properties.家賃.number ?? 0;
            return rentA - rentB;
          });
      }
      setFilteredProperties(filteredData);
    } else {
      setFilteredProperties(properties);
    }
  }, [
    properties,
    selectedOption,
    queryZone,
    queryArea,
    queryMinPrice,
    queryMaxPrice,
  ]);

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
    <>
      <div className="flex justify-between items-center my-2">
        <p>
          {properties.length || 0} 件中 {filteredProperties.length || 0} 件表示
        </p>
        <div className="flex flex-col sm:flex-row gap-2 ">
          <PrimarySelect
            selectItems={sortOptions}
            handleChange={handleChangeSort}
            labelName="表示順"
            placeholder="表示順"
          />
          <FilterDialog />
        </div>
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
