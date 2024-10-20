import FilterSelectButton from "@/components/atoms/propertiesList/FilterSelectButton";
import { optionType } from "@/config/commonOptions";
import React, { FC } from "react";

type FilterButtons = {
  options: optionType[];
  queryKey: string;
};

const FilterSelectButtons: FC<FilterButtons> = ({ options, queryKey }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        return (
          <FilterSelectButton
            key={o.value}
            queryKey={queryKey}
            queryValue={o.value}
          >
            {o.label}
          </FilterSelectButton>
        );
      })}
    </div>
  );
};

export default FilterSelectButtons;
