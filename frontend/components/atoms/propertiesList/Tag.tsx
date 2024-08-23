import React from "react";

type TagProps = {
  rent: number | string;
};
const Tag = ({ rent }: TagProps) => {
  return (
    <div className="absolute top-0 left-0 w-20 rounded-lg bg-blue-500 border border-white text-white leading-8">
      <div className="flex items-center justify-center">{rent}</div>
    </div>
  );
};

export default Tag;
