import React, { FC } from "react";

type PropertyTitleProps = {
  title: string | null;
};
const PropertyTitle: FC<PropertyTitleProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default PropertyTitle;
