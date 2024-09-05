"use client";
import PropertyImage from "@/components/atoms/propertyPage/PropertyImage";
import { useFetchPropertyData } from "@/hooks/useFetchPropertyData";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyTitle from "@/components/atoms/propertyPage/PropertyTitle";
import CommentAndInquirySection from "@/components/molecules/propertyPage/CommentAndInquirySection";
import { PropertyTabs } from "@/components/organisms/propertyPage/PropertyTabs";
import { NotionPage } from "@/types/notionTypes";
import PropertyPageSkeleton from "@/components/molecules/propertyPage/SkeltonPropertyPage";

const PropertyPage = () => {
  const { properties } = useFetchPropertyData();
  const [loading, setLoading] = useState(true);
  const [filteredProperty, setFilteredProperty] = useState<NotionPage | null>(
    null
  );
  const params = useParams();

  useEffect(() => {
    if (properties.length > 0) {
      const property = properties.find((p) => p.id === params.propertyId);
      if (property) {
        setFilteredProperty(property);
        setLoading(false);
      }
    }
  }, [properties, params.propertyId]);

  if (loading) {
    return <PropertyPageSkeleton />;
  }

  if (!filteredProperty) {
    return <div>Property not found.</div>;
  }

  const { id, properties: propertyData } = filteredProperty;

  const imgUrl = getPropertyValue(propertyData.サムネイル, "file");
  const title = getPropertyValue(propertyData.タイトル, "title");
  const imgLink = getPropertyValue(propertyData.物件写真, "url");
  const rent = getPropertyValue(propertyData.家賃, "number");
  const comment = getPropertyValue(
    propertyData.スタッフからのコメント,
    "rich_text"
  );
  const inquiryForm = getPropertyValue(
    propertyData.お問い合わせフォーム,
    "url"
  );

  return (
    <div key={id}>
      <PropertyImage imgUrl={imgUrl} title={title} imgLink={imgLink} />
      <div className="max-w-[1200px] lg:h-[60lvh] flex flex-col lg:flex-row mx-auto">
        <div className="w-full lg:w-[60%] py-8 lg:pr-2">
          <PropertyTitle title={title} rent={rent} />
          <PropertyTabs propertyData={propertyData} />
        </div>
        <div className="w-full lg:w-[40%] py-8 lg:pl-2">
          <div className="flex flex-col justify-around items-center bg-slate-200 rounded-lg p-2 lg:h-full h-[50lvh]">
            <div className="font-bold sm:py-1">スタッフからのコメント</div>
            <CommentAndInquirySection
              comment={comment}
              inquiryForm={inquiryForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
