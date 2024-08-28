import Image from "next/image";
import React, { FC } from "react";

type PropertyImageProps = {
  imgUrl: string;
  title: string;
};
const PropertyImage: FC<PropertyImageProps> = ({ imgUrl, title }) => {
  return (
    <div className="z-0 w-full max-w-[800px] h-[300px] sm:h-[450px] xl:h-[400px] bg-slate-300 relative mx-auto">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={title ?? "物件画像"}
          className="rounded-t-lg object-cover"
          fill
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
