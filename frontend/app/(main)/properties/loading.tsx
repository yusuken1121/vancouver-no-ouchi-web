import { SkeletonPropertyCard } from "@/components/molecules/propertiesList/SkeletonCard";
import React from "react";

const PropertiesListLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {[...Array(30)].map((_, i) => (
        <SkeletonPropertyCard key={i} />
      ))}
    </div>
  );
};

export default PropertiesListLoading;
