import { FilterDialog } from "@/components/organisms/propertiesList/FilterDialog";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { NotionPage } from "@/types/notionTypes";
import SortSelect from "@/components/organisms/propertiesList/SortSelect";
import { FC } from "react";
import PaginationList from "@/components/organisms/propertiesList/PaginationList";

interface PropertiesPageProps {
  paginatedProperties: NotionPage[];
  filteredPropertiesNumber: number;
  currentPage: number;
  totalPage: number;
  itemsPerPage: number;
}

const PropertiesList: FC<PropertiesPageProps> = ({
  filteredPropertiesNumber,
  paginatedProperties,
  currentPage,
  totalPage,
  itemsPerPage,
}) => {
  const startItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredPropertiesNumber
  );
  return (
    <>
      <div className="flex justify-between items-center my-2">
        <p className="text-sm sm:text-base">
          {filteredPropertiesNumber} 件中（{startItem}〜{endItem}件目）
        </p>
        <div className="flex flex-col sm:flex-row gap-2 ">
          <SortSelect />
          <FilterDialog />
        </div>
      </div>

      <>
        {filteredPropertiesNumber <= 0 ? (
          <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
            条件に一致する物件が見つかりませんでした。
          </div>
        ) : (
          <div className="flex flex-col gap-8 mb-2">
            <PropertyCards paginatedProperties={paginatedProperties} />
            <PaginationList currentPage={currentPage} totalPage={totalPage} />
          </div>
        )}
      </>
    </>
  );
};

export default PropertiesList;
