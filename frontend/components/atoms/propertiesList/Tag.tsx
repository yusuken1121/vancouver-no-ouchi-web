import { cn } from "@/lib/utils";
import React from "react";

type TagProps = {
  rent: number | string;
  type?: "number" | "string";
};
const Tag = ({ rent }: TagProps) => {
  let message;
  if (typeof rent === "number") {
    message = `$${rent}`;
  }
  if (typeof rent === "string") {
    message = rent;
  }

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-20 rounded-lg font-semibold leading-8",
        typeof rent === "number" &&
          rent < 800 &&
          "bg-red-500 border border-white text-white",
        typeof rent === "number" &&
          rent >= 800 &&
          rent < 1000 &&
          "bg-orange-500 border border-white text-white",
        typeof rent === "number" &&
          rent >= 1000 &&
          rent < 1400 &&
          "bg-yellow-500 border border-white text-white",
        typeof rent === "number" &&
          rent >= 1400 &&
          rent < 2000 &&
          "bg-green-500 border border-white text-white",
        typeof rent === "number" &&
          rent >= 2000 &&
          "bg-blue-500 border border-white text-white",
        typeof rent === "string" && "bg-white border border-black text-black"
      )}
    >
      <div className="flex items-center justify-center">{message}</div>
    </div>
  );
};

export default Tag;
