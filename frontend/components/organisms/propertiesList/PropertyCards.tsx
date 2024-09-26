"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";

import { FC } from "react";
import { NotionPage } from "@/types/notionTypes";
import { getPropertyValue, getStartDate } from "@/utlis/getPropertyValue";

type PropertyCardsProps = {
  filteredProperties: NotionPage[];
};

const PropertyCards: FC<PropertyCardsProps> = ({ filteredProperties }) => {
  // if (!loading && filteredProperties.length === 0) {
  //   return (
  //     <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
  //       条件に一致する物件が見つかりませんでした。
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {filteredProperties.map((p: NotionPage) => {
        const {
          id,
          properties: {
            タイトル,
            ステータス,
            入居可能日,
            退去予定日,
            家賃,
            サムネイル,
            エリア,
            ゾーン,
          },
        } = p;

        const title = getPropertyValue(タイトル, "title");
        const status = getPropertyValue(ステータス, "status");
        const startDate = getStartDate(status, 退去予定日, 入居可能日);
        const zone = getPropertyValue(ゾーン, "select");
        const rent = getPropertyValue(家賃, "number");
        const imgUrl = getPropertyValue(サムネイル, "file");
        const area = getPropertyValue(エリア, "select");

        return (
          <PropertyCard
            key={id}
            id={id}
            title={title}
            status={status}
            startDate={startDate}
            rent={rent}
            imgUrl={imgUrl}
            area={area}
            zone={zone}
          />
        );
      })}
    </div>
  );
};

export default PropertyCards;
