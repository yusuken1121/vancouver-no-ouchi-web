"use client";
import { PrimarySelect } from "@/components/atoms/common/PrimarySelect";
import { FilterDialog } from "@/components/organisms/propertiesList/FilterDialog";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { sortOptions } from "@/utlis/commonOptions";
import { createQueryString } from "@/utlis/queryStringHelper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SetStateAction, useCallback, useEffect, useState } from "react";

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
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const zone = searchParams.get("zone");
  const area = searchParams.get("area");

  useEffect(() => {
    switch (sort) {
      case "price-asc":
        setSelectedOption(sortOptions[0].value);
        break;
      case "price-dec":
        setSelectedOption(sortOptions[1].value);
        break;
      default:
        setSelectedOption(sortOptions[0].value);
    }
  }, [sort]);

  useEffect(() => {
    // filter
    if (!loading) {
      let filteredData = properties.filter((p) => {
        const matchesZone = zone
          ? p.properties.ゾーン.select?.name === `${zone}`
          : true;
        const rent = p.properties.家賃.number || 0;
        const matchedMinPrice = minPrice ? rent >= parseFloat(minPrice) : true;
        const matchedMaxPrice = maxPrice ? rent <= parseFloat(maxPrice) : true;
        const matchedArea = area
          ? p.properties.エリア.select?.name === area
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
  }, [properties, selectedOption, zone, area, minPrice, maxPrice]);

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
