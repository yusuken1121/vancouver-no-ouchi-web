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
    minSharePeople?: string;
    maxSharePeople?: string;
    minKitchenPeople?: string;
    maxKitchenPeople?: string;
    minBathPeople?: string;
    maxBathPeople?: string;

    kitchenPeople?: string;
    gym?: string;
    sauna?: string;
    pool?: string;
    couple?: string;
    utilities?: string;
    laundry?: string;
    wifi?: string;
    lock?: string;
    man?: string;
    woman?: string;
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
    minSharePeople,
    maxSharePeople,
    minKitchenPeople,
    maxKitchenPeople,
    minBathPeople,
    maxBathPeople,

    gym,
    sauna,
    pool,
    couple,
    utilities,
    laundry,
    wifi,
    lock,
    man,
    woman,
    page,
  } = searchParams;

  try {
    // cache for 5 mins
    // const properties = await apiClientFetch("/properties", {
    //   method: "GET",
    //   next: {
    //     revalidate: 300,
    //   },
    // });
    const { data: properties } = await apiClient.get(`/properties`);

    //Filter
    let filteredProperties: NotionPage[] = properties.filter(
      (p: NotionPage) => {
        // レンジが決まっているもの
        const rent = p.properties.家賃.number || 0;
        const matchedRent = isWithinRange(rent, minPrice, maxPrice);

        const sharePeople = getPropertyValue(
          p.properties.物件のシェア人数,
          "select"
        );
        const matchedSharePeople = isWithinRange(
          sharePeople,
          minSharePeople,
          maxSharePeople
        );

        const kitchenPeople = getPropertyValue(
          p.properties.キッチンのシェア人数,
          "select"
        );
        const matchedKitchenPeople = isWithinRange(
          kitchenPeople,
          minKitchenPeople,
          maxKitchenPeople
        );

        const bathPeople = getPropertyValue(
          p.properties.バスルームのシェア人数,
          "select"
        );
        const matchedBathPeople = isWithinRange(
          bathPeople,
          minBathPeople,
          maxBathPeople
        );

        // 選択制のもの
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

        // checkbox "true" or "false"
        const matchedGym = matchParams(
          gym,
          p.properties.ジム,
          "checkbox-filter"
        );
        const matchedSauna = matchParams(
          sauna,
          p.properties.サウナ,
          "checkbox-filter"
        );
        const matchedPool = matchParams(
          pool,
          p.properties.プール,
          "checkbox-filter"
        );
        const matchedCouple = matchParams(
          couple,
          p.properties.カップル可,
          "checkbox-filter"
        );
        const matchedUtilities = matchParams(
          utilities,
          p.properties.光熱費込み,
          "checkbox-filter"
        );
        const matchedLaundry = matchParams(
          laundry,
          p.properties.ランドリー無料,
          "checkbox-filter"
        );
        const matchedWifi = matchParams(
          wifi,
          p.properties.Wifi込み,
          "checkbox-filter"
        );
        const matchedLock = matchParams(
          lock,
          p.properties.鍵付き,
          "checkbox-filter"
        );
        const matchedMan = matchParams(
          man,
          p.properties.男性限定,
          "checkbox-filter"
        );
        const matchedWoman = matchParams(
          woman,
          p.properties.女性限定,
          "checkbox-filter"
        );

        return (
          matchedZone &&
          matchedRent &&
          matchedArea &&
          matchedStatus &&
          matchedMinMonth &&
          matchedSharePeople &&
          matchedKitchenPeople &&
          matchedBathPeople &&
          matchedGym &&
          matchedSauna &&
          matchedPool &&
          matchedCouple &&
          matchedUtilities &&
          matchedLaundry &&
          matchedWifi &&
          matchedLock &&
          matchedMan &&
          matchedWoman
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

// 共通のフィルタリング関数　（下限と上限が決まっている項目用）
function isWithinRange(value: number, min?: string, max?: string): boolean {
  const parsedMin = min ? parseFloat(min) : null;
  const parsedMax = max ? parseFloat(max) : null;

  const isAboveMin = parsedMin !== null ? value >= parsedMin : true;
  const isBelowMax = parsedMax !== null ? value <= parsedMax : true;

  return isAboveMin && isBelowMax;
}
