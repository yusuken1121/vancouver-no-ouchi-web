import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { BadgeCheck, CalendarIcon, HouseIcon, MapIcon } from "lucide-react";

export const SkeletonPropertyCard = () => {
  return (
    <div className="relative shadow-md border border-gray-100 rounded-lg">
      {/* image skeleton */}
      <div className="z-0 min-w-full h-64 sm:h-48 xl:h-56 bg-slate-300 relative">
        <Skeleton className="w-full h-full" />
      </div>
      {/* detail skeleton */}
      <div className="flex flex-col gap-1 w-full h-full p-2 pb-5">
        <div className="flex items-center">
          {/* <HouseIcon className="iconLabelItem" /> */}
          <Skeleton className="w-32 h-4 rounded" />
        </div>
        <div className="flex items-center">
          {/* <BadgeCheck className="iconLabelItem" /> */}
          <Skeleton className="w-20 h-4 rounded" />
        </div>
        <div className="flex items-center">
          {/* <CalendarIcon className="iconLabelItem" /> */}
          <Skeleton className="w-24 h-4 rounded" />
        </div>
        <div className="flex items-center">
          {/* <MapIcon className="iconLabelItem" /> */}
          <Skeleton className="w-28 h-4 rounded" />
        </div>
      </div>
    </div>
  );
};
