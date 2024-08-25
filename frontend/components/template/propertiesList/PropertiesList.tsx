"use client";
import { PaginationProperty } from "@/components/atoms/propertiesList/PaginationProperty";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { useState } from "react";

function useLocalStorage(key: string, initialValue: number) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue = (value: number | ((prev: number) => number)) => {
    const setToValue =
      typeof value === "function"
        ? (value as (prev: number) => number)(storedValue)
        : value;

    setStoredValue(setToValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(setToValue));
    }
  };

  return [storedValue, setValue];
}

const PropertiesList = () => {
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 1);
  const { properties } = useFetchPropertyData();
  const totalPages = Math.ceil(properties.length / 20);

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
