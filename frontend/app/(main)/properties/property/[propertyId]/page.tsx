import PropertyPage from "@/components/template/propertyPage/PropertyPage";
import { apiClient, apiClientFetch } from "@/config/apiClient";

const PropertyDetailPage = async ({
  params,
}: {
  params: { propertyId: string };
}) => {
  const { propertyId } = params;
  try {
    const property = await apiClientFetch(`/properties/${propertyId}`, {
      method: "GET",
      next: {
        revalidate: 300,
      },
    });

    // // just in case using axios
    // const { data: property } = await apiClient.get(`/properties/${propertyId}`);
    return (
      <div>
        <PropertyPage property={property} />
      </div>
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

export default PropertyDetailPage;
