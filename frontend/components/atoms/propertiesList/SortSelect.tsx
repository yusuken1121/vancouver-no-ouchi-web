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
import { ArrowDownWideNarrow } from "lucide-react";
type PrimarySelectType = {
  placeholder: string;
  labelName: string;
  selectItems: { label: string; value: string }[];
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
      <SelectTrigger className="w-12 h-12 rounded-full font-medium flex items-center justify-center hover:bg-grayThemeColor">
        <ArrowDownWideNarrow className="w-8 h-8 text-themeColor" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        <SelectGroup className="w-[200px]">
          {/* <SelectLabel>{labelName}</SelectLabel> */}
          {selectItems.map((item, index) => {
            return (
              <SelectItem value={item.value} key={index}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
