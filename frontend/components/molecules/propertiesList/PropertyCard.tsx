import Tag from "@/components/atoms/propertiesList/Tag";
import { BadgeCheck, CalendarIcon, HouseIcon, MapIcon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

type PropertyCardProps = {
  title: string | null;
  status: string | null;
  startDate: string | null;
  rent: number | string;
  imgUrl: string | null;
  area: string | null;
};

const PropertyCard: FC<PropertyCardProps> = ({
  title,
  status,
  startDate,
  rent,
  imgUrl,
  area,
}) => {
  return (
    <div className="relative shadow-md border border-gray-200 rounded-lg">
      {/* image */}
      <div className="z-0 min-w-full h-64 sm:h-48 xl:h-56 bg-slate-300 relative">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title ?? "物件画像"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            画像がありません
          </div>
        )}
      </div>
      <Tag rent={rent} />
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
          <span>{area}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
