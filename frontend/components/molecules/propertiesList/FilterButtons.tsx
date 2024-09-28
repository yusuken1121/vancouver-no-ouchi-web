import FilterButton from "@/components/atoms/propertiesList/FilterButton";
import { optionType, zoneOptions } from "@/utlis/commonOptions";
import React, { FC } from "react";

type FilterButtons = {
  options: optionType[];
  queryKey: string;
};

const FilterButtons: FC<FilterButtons> = ({ options, queryKey }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        return (
          <FilterButton key={o.value} queryKey={queryKey} queryValue={o.value}>
            {o.label}
          </FilterButton>
        );
      })}
    </div>
  );
};

export default FilterButtons;
