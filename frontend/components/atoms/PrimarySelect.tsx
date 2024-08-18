import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type PrimarySelectType = {
  placeholder: string;
  labelName: string;
  selectItems: string[];
  handleChange: (e: React.SetStateAction<string>) => void;
};

export function PrimarySelect({
  placeholder,
  labelName,
  selectItems,
  handleChange,
}: PrimarySelectType) {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labelName}</SelectLabel>
          {selectItems.map((item, index) => {
            return (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
