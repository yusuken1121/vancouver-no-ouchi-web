"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";
import { SkeletonPropertyCard } from "@/components/molecules/propertiesList/SkeletonCard";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { NotionPage } from "@/types/notionTypes";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type PropertyCardsProps = {
  error: string | null;
  loading: boolean;
  filteredProperties: NotionPage[];
};

const PropertyCards: FC<PropertyCardsProps> = ({
  loading,
  error,
  filteredProperties,
}) => {
  if (error) {
    return (
      <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-red-500 text-xl">
        データの取得中にエラーが発生しました。もう一度お試しください。
      </div>
    );
  }

  if (!loading && filteredProperties.length === 0) {
    return (
      <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
        条件に一致する物件が見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {loading
        ? [...Array(30)].map((_, i) => <SkeletonPropertyCard key={i} />)
        : filteredProperties.map((p: NotionPage) => {
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

            const title = タイトル.title[0]?.plain_text || null;
            const status = ステータス.status?.name || null;
            const startDate = (() => {
              switch (status) {
                case "入居中":
                  return `${退去予定日.date?.start} (退去予定日)` || null;
                case "成約済み":
                  return `${退去予定日.date?.start} (退去予定日)` || null;
                default:
                  return `${入居可能日.date?.start} (入居可能日)` || null;
              }
            })();
            const zone = ゾーン.select?.name || null;

            const rent = 家賃.number || "確認中";
            const imgUrl = サムネイル.files[0]?.file.url || null;
            const area = エリア.select?.name || null;
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
