import Image from "next/image";
import React, { FC } from "react";

type PropertyImageProps = {
  imgUrl: string;
  title: string;
};
const PropertyImage: FC<PropertyImageProps> = ({ imgUrl, title }) => {
  return (
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
  );
};

export default PropertyImage;
