import Tag from "@/components/atoms/propertiesList/Tag";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  CalendarIcon,
  HouseIcon,
  MapIcon,
  TrainIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type PropertyCardProps = {
  id: string | null;
  title: string | null;
  status: string | null;
  startDate: string | JSX.Element | null;
  rent: number | string;
  imgUrl: string | null;
  area: string | null;
  zone: string | null;
};

const PropertyCard: FC<PropertyCardProps> = ({
  id,
  title,
  status,
  startDate,
  rent,
  imgUrl,
  area,
  zone,
}) => {
  return (
    <Link
      href={`/properties/property/${id}`}
      className="relative shadow-md border border-gray-200 rounded-lg sm:hover:scale-105"
    >
      {/* image */}
      <div className="z-0 min-w-full h-64 sm:h-48 xl:h-56 bg-slate-300 relative">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title ?? "物件画像"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            画像がありません
          </div>
        )}
      </div>
      <Tag rent={rent} />
      {/* detail */}
      <div className="flex flex-col gap-1 w-full p-2 pb-5">
        <div className="flex items-center">
          <HouseIcon className="iconLabelItem" />
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <BadgeCheck className="iconLabelItem" />
          <span
            className={cn(
              "text-white bg-slate-400  rounded-lg px-2 font-semibold",
              status === "即入居可能" && "bg-red-400",
              status === "入居者募集中" && "bg-orange-400",
              status === "入居中" && "bg-yellow-400",
              status === "成約済み" && "bg-slate-400",
              status === "休止中" && "bg-slate-400"
            )}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="iconLabelItem" />
          <span>{startDate}</span>
        </div>
        <div className="flex items-center">
          <MapIcon className="iconLabelItem" />
          <span>{area}</span>
        </div>
        <div className="flex items-center">
          <TrainIcon className="iconLabelItem" />
          <span>{zone}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
