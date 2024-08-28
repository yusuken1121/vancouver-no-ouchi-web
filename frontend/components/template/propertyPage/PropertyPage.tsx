"use client";
import PropertyImage from "@/components/atoms/propertyPage/PropertyImage";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import React from "react";
import { useSearchParams, usePathname, useParams } from "next/navigation";
const PropertyPage = () => {
  const { properties } = useFetchPropertyData();
  const searchParams = useSearchParams();
  const params = useParams();
  console.log("name::::", params.propertyId);

  return (
    <div>
      {properties
        .filter((p) => p.id === params.propertyId)
        .map((p) => {
          const {
            id,
            properties: { サムネイル, タイトル },
          } = p;

          const imgUrl = getPropertyValue(サムネイル, "file");
          const title = getPropertyValue(タイトル, "title");

          return <PropertyImage key={id} imgUrl={imgUrl} title={title} />;
        })}
    </div>
  );
};

export default PropertyPage;
