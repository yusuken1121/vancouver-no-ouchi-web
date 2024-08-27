"use client";
import { PrimarySelect } from "@/components/atoms/PrimarySelect";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SetStateAction, useCallback, useEffect, useState } from "react";

const PropertiesList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { properties, loading, error } = useFetchPropertyData();
  const [filteredProperties, setFilteredProperties] =
    useState<NotionPage[]>(properties);
  const searchParams = useSearchParams();

  // Sort
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const sortOptions = ["金額：高い順", "金額：低い順"];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // Query
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const zone = searchParams.get("zone");
  const area = searchParams.get("area");

  useEffect(() => {
    switch (sort) {
      case "price-asc":
        setSelectedOption(sortOptions[0]);
        break;
      case "price-dec":
        setSelectedOption(sortOptions[1]);
        break;
      default:
        setSelectedOption(sortOptions[0]);
    }
  }, [sort]);

  useEffect(() => {
    // filter
    if (!loading) {
      let filteredData = properties.filter((p) => {
        const matchesZone = zone
          ? p.properties.ゾーン.select?.name === `Zone${zone}`
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
        case sortOptions[0]:
          filteredData = filteredData.sort((a, b) => {
            const rentA = a.properties.家賃.number ?? 0;
            const rentB = b.properties.家賃.number ?? 0;
            return rentB - rentA;
          });
          break;
        case sortOptions[1]:
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
  }, [properties, selectedOption, zone, minPrice, maxPrice]);

  const handleChangeSort = (e: SetStateAction<string>) => {
    switch (e) {
      case sortOptions[0]:
        router.push(pathname + "?" + createQueryString("sort", "price-asc"));
        break;
      case sortOptions[1]:
        router.push(pathname + "?" + createQueryString("sort", "price-dec"));
        break;
      default:
        router.push(pathname);
    }

    // setSelectedOption(e);
  };

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <p>
          {properties.length || 0} 件中 {filteredProperties.length || 0} 件表示
        </p>
        <PrimarySelect
          selectItems={sortOptions}
          handleChange={handleChangeSort}
          labelName="表示順"
          placeholder="表示順"
        />
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
