import Tag from "@/components/atoms/propertiesList/Tag";
import { BadgeCheck, CalendarIcon, HouseIcon, MapIcon } from "lucide-react";
import React from "react";

const PropertyCard = () => {
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
          <span>物件名</span>
        </div>
        <div className="flex items-center">
          <BadgeCheck className="iconLabelItem" />
          <span>ステータス</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="iconLabelItem" />
          <span>入居可能日</span>
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
