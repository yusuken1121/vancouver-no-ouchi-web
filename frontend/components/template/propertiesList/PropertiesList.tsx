import { FilterDialog } from "@/components/organisms/propertiesList/FilterDialog";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { NotionPage } from "@/types/notionTypes";
import SortSelect from "@/components/organisms/propertiesList/SortSelect";
import { FC } from "react";

interface PropertiesPageProps {
  properties: NotionPage[];
  filteredProperties: NotionPage[];
}

const PropertiesList: FC<PropertiesPageProps> = async ({
  properties,
  filteredProperties,
}) => {
  return (
    <>
      <div className="flex justify-between items-center my-2">
        <p>
          {properties.length || 0} 件中 {filteredProperties.length || 0} 件表示
        </p>
        <div className="flex flex-col sm:flex-row gap-2 ">
          <SortSelect />
          <FilterDialog />
        </div>
      </div>
      <div className="flex flex-col gap-8 mb-2">
        <PropertyCards filteredProperties={filteredProperties} />
      </div>
    </>
  );
};

export default PropertiesList;
