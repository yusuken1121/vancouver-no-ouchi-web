import React, { FC } from "react";

type PropertyTitleProps = {
  title: string | null;
  rent: number | null;
};
const PropertyTitle: FC<PropertyTitleProps> = ({ title, rent }) => {
  return (
    <div className="flex items-center justify-between">
      <h1>{title}</h1>
      <p>${rent}/月</p>
    </div>
  );
};

export default PropertyTitle;
