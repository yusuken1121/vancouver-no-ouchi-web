import React, { FC } from "react";

type PropertyTitleProps = {
  title: string | null;
  rent: number | null;
};
const PropertyTitle: FC<PropertyTitleProps> = ({ title, rent }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl">{title}</h1>
      {/* <p className="text-2xl">${rent}/月</p> */}
    </div>
  );
};

export default PropertyTitle;
