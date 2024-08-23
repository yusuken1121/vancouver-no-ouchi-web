import Tag from "@/components/atoms/propertiesList/Tag";
import { BadgeCheck, CalendarIcon, HouseIcon, MapIcon } from "lucide-react";
import React, { FC } from "react";

type PropertyCardProps = {
  title: string | null;
  status: string | null;
  startDate: string | null;
};

const PropertyCard: FC<PropertyCardProps> = ({ title, status, startDate }) => {
  return (
    <div className="relative shadow-md border border-gray-200 rounded-lg">
      <Tag />
      {/* image */}
      <div className="min-w-full h-64 sm:h-48 xl:h-56 bg-slate-300">
        ここにIMG
      </div>
      {/* detail */}
      <div className="flex flex-col gap-1 w-full h-full p-2 pb-5">
        <div className="flex items-center">
          <HouseIcon className="iconLabelItem" />
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <BadgeCheck className="iconLabelItem" />
          <span>{status}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="iconLabelItem" />
          <span>{startDate}</span>
        </div>
        <div className="flex items-center">
          <MapIcon className="iconLabelItem" />
          <span>エリア</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
