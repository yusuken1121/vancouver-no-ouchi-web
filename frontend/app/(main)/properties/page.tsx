import { NotionPage } from "@/types/notionTypes";
import apiClient from "@/config/apiClient";
import PropertiesList from "@/components/template/propertiesList/PropertiesList"; // 修正ポイント

interface PropertiesPageProps {
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    zone?: string;
    area?: string;
    page?: string;
  };
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const { sort, minPrice, maxPrice, zone, area, page } = searchParams;

  try {
    const { data: properties } = await apiClient.get("/properties");

    //Filter
    let filteredProperties: NotionPage[] = properties.filter(
      (p: NotionPage) => {
        const matchesZone = zone
          ? p.properties.ゾーン.select?.name === zone
          : true;
        const rent = p.properties.家賃.number || 0;
        const matchedMinPrice = minPrice ? rent >= parseFloat(minPrice) : true;
        const matchedMaxPrice = maxPrice ? rent <= parseFloat(maxPrice) : true;
        const matchedArea = area
          ? p.properties.エリア.select?.name === area
          : true;
        return matchesZone && matchedMinPrice && matchedMaxPrice && matchedArea;
      }
    );

    // Sort
    switch (sort) {
      case "price-dec":
        filteredProperties.sort((a: NotionPage, b: NotionPage) => {
          const rentA = a.properties.家賃.number ?? 0;
          const rentB = b.properties.家賃.number ?? 0;
          return rentA - rentB;
        });
        break;
      case "price-asc":
        filteredProperties.sort((a: NotionPage, b: NotionPage) => {
          const rentA = a.properties.家賃.number ?? 0;
          const rentB = b.properties.家賃.number ?? 0;
          return rentB - rentA;
        });
        break;
      default:
        filteredProperties.sort((a: NotionPage, b: NotionPage) => {
          const rentA = a.properties.家賃.number ?? 0;
          const rentB = b.properties.家賃.number ?? 0;
          return rentA - rentB;
        });
        break;
    }

    if (filteredProperties.length === 0) {
      return (
        <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-gray-500 text-xl">
          条件に一致する物件が見つかりませんでした。
        </div>
      );
    }

    // pagination
    const itemsPerPage: number = 20; // The number of items per page can be adjusted
    const currentPage: number = page ? parseInt(page) : 1;
    const totalPage: number = Math.ceil(filteredProperties.length / 20);
    const paginatedProperties: NotionPage[] = filteredProperties.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // the total number of the properties
    const filteredPropertiesNumber: number = filteredProperties.length;

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
