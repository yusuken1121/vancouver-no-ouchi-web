import { FilterDialog } from "@/components/organisms/propertiesList/FilterDialog";
import PropertyCards from "@/components/organisms/propertiesList/PropertyCards";
import { NotionPage } from "@/types/notionTypes";
import SortSelect from "@/components/organisms/propertiesList/SortSelect";
import { FC } from "react";
import PaginationList from "@/components/organisms/propertiesList/PaginationList";
import SearchBar from "@/components/molecules/propertiesList/SearchBar";

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
      <div className="flex flex-col sm:flex-row justify-between items-center my-2 gap-2">
        <p className="text-sm text-left sm:text-base order-2 sm:order-1">
          {filteredPropertiesNumber} 件中（
          {endItem === 0 ? 0 : `${startItem}〜${endItem}`} 件目）
        </p>
        <div className="flex items-center sm:flex-row gap-2 order-1 sm:order-2">
          <SearchBar />
          <SortSelect />
          <FilterDialog filteredPropertiesNumbers={filteredPropertiesNumber} />
        </div>
      </div>

      <>
        {filteredPropertiesNumber <= 0 ? (
          <div className="h-[70vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
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
