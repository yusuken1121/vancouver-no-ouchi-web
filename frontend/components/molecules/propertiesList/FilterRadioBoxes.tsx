"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  OptionStationType,
  optionType,
  stationOptions,
} from "@/config/commonOptions";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import FilterSelectButtons from "./FilterSelectButtons";

export function FilterRadioBoxes() {
  type railwayType = OptionStationType["railway"][number];
  const railwayArray: railwayType[] = ["expo", "canada", "millennium"];
  const [selectedRailway, setSelectedRailway] = useState<railwayType>("expo");

  const selectedRailwayArray: optionType[] = stationOptions
    .filter((o) => o.railway.includes(selectedRailway))
    .map((o) => ({
      label: o.label,
      value: o.value,
    }));

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        defaultValue={railwayArray[0]}
        className="flex items-center gap-2 max-w-full"
        onValueChange={(value: railwayType) => {
          setSelectedRailway(value);
        }}
      >
        {railwayArray.map((rail) => (
          <div
            key={rail}
            className={cn(
              "flex flex-1 items-center justify-center text-center px-2 py-1 rounded-lg box-border",
              rail === "expo" && "bg-blue-600 text-white",
              rail === "canada" && "bg-sky-400 text-white",
              rail === "millennium" && "bg-yellow-300 text-black"
            )}
          >
            <RadioGroupItem
              value={rail}
              id={rail}
              className="bg-white text-center"
            />
            <Label
              htmlFor={rail}
              className="text-center px-1 font-bold rounded-lg cursor-pointer"
            >
              {rail.charAt(0).toUpperCase() + rail.slice(1)}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <FilterSelectButtons options={selectedRailwayArray} queryKey="station" />
    </div>
  );
}
