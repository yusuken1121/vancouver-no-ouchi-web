import PropertyImage from "@/components/atoms/propertyPage/PropertyImage";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import React, { FC } from "react";
import PropertyTitle from "@/components/atoms/propertyPage/PropertyTitle";
import CommentAndInquirySection from "@/components/molecules/propertyPage/CommentAndInquirySection";
import { PropertyTabs } from "@/components/organisms/propertyPage/PropertyTabs";
import { NotionPage } from "@/types/notionTypes";

interface PropertyPageProps {
  property: NotionPage;
}

const PropertyPage: FC<PropertyPageProps> = ({ property }) => {
  const { id, properties: propertyData } = property;

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
          <div className="flex flex-col justify-around gap-5 items-center bg-slate-200 rounded-lg p-5 lg:h-full h-[50lvh]">
            {/* TODO: padding issue btw platforms workaround pt-4 for now */}
            <div className="font-bold">スタッフからのコメント</div>
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
