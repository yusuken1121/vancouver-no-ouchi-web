"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";
import { SkeletonPropertyCard } from "@/components/molecules/propertiesList/SkeletonCard";
import apiClient from "@/config/apiClient";
import { NotionPage } from "@/types/notionTypes";
import React, { useEffect, useState } from "react";

const PropertyCards = () => {
  const [properties, setProperties] = useState<NotionPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiClient.get("/properties");
        const data = response.data;
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch the properties: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  console.log(properties);
  console.log(
    properties.map((p) => {
      return p.properties.タイトル.title[0].plain_text;
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {loading
        ? [...Array(30)].map((_, i) => <SkeletonPropertyCard key={i} />)
        : properties.map((p: NotionPage) => {
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

            const rent = 家賃.number || "確認中";
            const imgUrl = サムネイル.files[0].file.url || null;
            const area = エリア.select?.name || null;
            return (
              <PropertyCard
                key={id}
                title={title}
                status={status}
                startDate={startDate}
                rent={rent}
                imgUrl={imgUrl}
                area={area}
              />
            );
          })}
    </div>
  );
};

export default PropertyCards;
