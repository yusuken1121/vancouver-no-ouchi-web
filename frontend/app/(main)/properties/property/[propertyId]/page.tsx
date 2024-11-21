import PropertyPage from "@/components/template/propertyPage/PropertyPage";
import { apiClient, apiClientFetch } from "@/config/apiClient";
import { getPropertyValue } from "@/utlis/getPropertyValue";
import axios from "axios";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ propertyId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const propertyId = (await params).propertyId;

    // fetch data
    const { data: property } = await apiClient.get(`/properties/${propertyId}`);

    const previousImage = getPropertyValue(
      property.properties.サムネイル,
      "file"
    );

    return {
      title: getPropertyValue(property.properties.タイトル, "title"),
      openGraph: {
        images: [previousImage],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Default Title",
    };
  }
}

const PropertyDetailPage = async ({
  params,
}: {
  params: { propertyId: string };
}) => {
  const { propertyId } = params;
  try {
    // const property = await apiClientFetch(`/properties/${propertyId}`, {
    //   method: "GET",
    //   next: {
    //     revalidate: 300,
    //   },
    // });

    // // just in case using axios
    const { data: property } = await apiClient.get(`/properties/${propertyId}`);
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
