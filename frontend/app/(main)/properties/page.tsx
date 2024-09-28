import { NotionPage } from "@/types/notionTypes";
import { apiClient, apiClientFetch } from "@/config/apiClient";
import PropertiesList from "@/components/template/propertiesList/PropertiesList"; // 修正ポイント
import { getPropertyValue, matchParams } from "@/utlis/getPropertyValue";

interface PropertiesPageProps {
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    zone?: string;
    area?: string;
    status?: string;
    minMonth?: string;
    sharePeople?: string;
    bathPeople?: string;
    kitchenPeople?: string;
    page?: string;
  };
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const {
    sort,
    minPrice,
    maxPrice,
    zone,
    area,
    status,
    minMonth,
    sharePeople,
    bathPeople,
    kitchenPeople,
    page,
  } = searchParams;

  try {
    // cache for 5 mins
    const properties = await apiClientFetch("/properties", {
      method: "GET",
      next: {
        revalidate: 300,
      },
    });

    //Filter
    let filteredProperties: NotionPage[] = properties.filter(
      (p: NotionPage) => {
        console.log(getPropertyValue(p.properties.プール, "checkbox"));

        const rent = p.properties.家賃.number || 0;
        const matchedMinPrice = minPrice ? rent >= parseFloat(minPrice) : true;
        const matchedMaxPrice = maxPrice ? rent <= parseFloat(maxPrice) : true;
        const matchedZone = matchParams(zone, p.properties.ゾーン, "select");
        const matchedArea = matchParams(area, p.properties.エリア, "select");
        const matchedStatus = matchParams(
          status,
          p.properties.ステータス,
          "status"
        );
        const matchedMinMonth = matchParams(
          minMonth,
          p.properties.ミニマムステイ,
          "select"
        );
        const matchedSharePeople = matchParams(
          sharePeople,
          p.properties.物件のシェア人数,
          "select"
        );
        const matchedBathPeople = matchParams(
          bathPeople,
          p.properties.物件のシェア人数,
          "select"
        );
        const matchedKitchenPeople = matchParams(
          kitchenPeople,
          p.properties.キッチンのシェア人数,
          "select"
        );
        return (
          matchedZone &&
          matchedMinPrice &&
          matchedMaxPrice &&
          matchedArea &&
          matchedStatus &&
          matchedMinMonth &&
          matchedSharePeople &&
          matchedBathPeople &&
          matchedKitchenPeople
        );
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
