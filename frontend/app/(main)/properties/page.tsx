import PropertiesList from "@/components/template/propertiesList/PropertiesList"; // 修正ポイント
import {
  fetchAndFilterProperties,
  SearchParams,
} from "@/utlis/filterSort/propertyService";
interface PropertiesPageProps {
  searchParams: SearchParams;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  try {
    const {
      filteredPropertiesNumber,
      paginatedProperties,
      currentPage,
      totalPage,
      itemsPerPage,
    } = await fetchAndFilterProperties(searchParams);
    return (
      <PropertiesList
        filteredPropertiesNumber={filteredPropertiesNumber}
        paginatedProperties={paginatedProperties}
        currentPage={currentPage}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
      />
    );
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return (
      <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-red-500 text-xl">
        データの取得中にエラーが発生しました。もう一度お試しください。
      </div>
    );
  }
};

export default PropertiesPage;
