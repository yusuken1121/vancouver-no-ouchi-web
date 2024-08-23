"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";
import apiClient from "@/config/apiClient";
import { NotionPage } from "@/types/notionTypes";
import React, { useEffect, useState } from "react";

const PropertyCards = () => {
  const [properties, setProperties] = useState<NotionPage[]>([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiClient.get("/properties");
        const data = response.data;
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch the properties: ", error);
      }
    };
    fetchProperties();
  }, []);
  console.log(properties);
  console.log(
    properties.map((p) => {
      return p.properties.エリア.select?.name;
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {properties.map((p) => {
        const {
          id,
          properties: {
            物件名,
            ステータス,
            入居可能日,
            退去予定日,
            家賃,
            部屋写真,
            エリア,
          },
        } = p;

        const title = 物件名.title[0]?.plain_text || null;
        const status = ステータス.status?.name || null;
        const startDate =
          status === "要確認"
            ? `${退去予定日.date?.start} (入居予定日)` || null
            : `${入居可能日.date?.start} (入居可能日)` || null;
        const rent = `$${家賃.number}` || "確認中";
        const imgUrl = 部屋写真.files[0].file.url || null;
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